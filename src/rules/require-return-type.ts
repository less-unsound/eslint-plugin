import { ESLintUtils, type TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import ts from "typescript";
import { createRule } from "../utils/create-rule.js";

type FunctionNode =
  | TSESTree.ArrowFunctionExpression
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression
  | TSESTree.TSDeclareFunction;

const messageIds = Object.freeze({
  forbiddenHigherOrderReturnType:
    "Functions that return functions must not declare an outer return type.",
  missingReturnType:
    "Functions must declare a return type unless they return a function."
});

const isCallableType = (checker: ts.TypeChecker, type: ts.Type): boolean => {
  const constrainedType = checker.getBaseConstraintOfType(type) ?? type;
  if (constrainedType.isUnion()) {
    return constrainedType.types.every((member) => isCallableType(checker, member));
  }
  return (
    checker.getSignaturesOfType(constrainedType, ts.SignatureKind.Call).length > 0 ||
    checker.getSignaturesOfType(constrainedType, ts.SignatureKind.Construct).length > 0
  );
};

const hasNamedBinding = (node: FunctionNode): boolean => {
  if (node.type === AST_NODE_TYPES.FunctionDeclaration) {
    return node.id !== null;
  }

  if (node.type === AST_NODE_TYPES.TSDeclareFunction) {
    return node.id !== null;
  }

  const parent = node.parent;
  return parent !== undefined
    && parent.type === AST_NODE_TYPES.VariableDeclarator
    && parent.id.type === AST_NODE_TYPES.Identifier;
};

export const requireReturnTypeRule = createRule({
  name: "require-return-type",
  meta: {
    type: "problem",
    docs: {
      description:
        "Require functions to declare a return type unless they return a function."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => {
    const services = ESLintUtils.getParserServices(context);
    const checker = services.program.getTypeChecker();
    const checkFunction = (node: FunctionNode): void => {
      if (!hasNamedBinding(node)) {
        return;
      }

      const tsNode = services.esTreeNodeToTSNodeMap.get(node) as ts.SignatureDeclaration;
      const signature = checker.getSignatureFromDeclaration(tsNode);
      if (signature === undefined) {
        return;
      }
      const returnType = checker.getReturnTypeOfSignature(signature);
      const isHigherOrder = isCallableType(checker, returnType);
      if (node.returnType === undefined) {
        if (isHigherOrder) {
          return;
        }
        context.report({
          node,
          messageId: "missingReturnType"
        });
        return;
      }
      if (!isHigherOrder) {
        return;
      }
      context.report({
        node: node.returnType,
        messageId: "forbiddenHigherOrderReturnType"
      });
    };

    return {
      ArrowFunctionExpression: checkFunction,
      FunctionDeclaration: checkFunction,
      FunctionExpression: checkFunction,
      TSDeclareFunction: checkFunction
    };
  }
});
