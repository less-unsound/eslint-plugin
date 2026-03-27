import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenParamAssign: "Assigning to function parameters is not allowed."
});

const getPatternNames = (node: TSESTree.Node): readonly string[] => {
  if (node.type === AST_NODE_TYPES.Identifier) {
    return [node.name];
  }
  if (node.type === AST_NODE_TYPES.AssignmentPattern) {
    return getPatternNames(node.left);
  }
  if (node.type === AST_NODE_TYPES.RestElement) {
    return getPatternNames(node.argument);
  }
  if (node.type === AST_NODE_TYPES.ArrayPattern) {
    return node.elements.flatMap((element) => {
      if (element === null) {
        return [];
      }
      return getPatternNames(element);
    });
  }
  if (node.type === AST_NODE_TYPES.ObjectPattern) {
    return node.properties.flatMap((property) => {
      if (property.type === AST_NODE_TYPES.RestElement) {
        return getPatternNames(property.argument);
      }
      return getPatternNames(property.value);
    });
  }
  return [];
};

const getParamNames = (params: readonly TSESTree.Parameter[]): ReadonlySet<string> =>
  new Set(params.flatMap((param) => getPatternNames(param)));

const getEnclosingFunction = (
  node: TSESTree.Node
): TSESTree.ArrowFunctionExpression | TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | undefined => {
  let parent = node.parent;
  while (parent !== undefined) {
    if (
      parent.type === AST_NODE_TYPES.ArrowFunctionExpression ||
      parent.type === AST_NODE_TYPES.FunctionDeclaration ||
      parent.type === AST_NODE_TYPES.FunctionExpression
    ) {
      return parent;
    }
    parent = parent.parent;
  }
  return undefined;
};

const isAssignedParam = (node: TSESTree.Identifier): boolean => {
  const fn = getEnclosingFunction(node);
  if (fn === undefined) {
    return false;
  }
  return getParamNames(fn.params).has(node.name);
};

export const noParamAssignRule = createRule({
  name: "no-param-assign",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow assigning to function parameters unless mutability is required for performance."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    AssignmentExpression: (node) => {
      if (node.left.type !== AST_NODE_TYPES.Identifier) {
        return;
      }
      if (!isAssignedParam(node.left)) {
        return;
      }
      context.report({
        node: node.left,
        messageId: "forbiddenParamAssign"
      });
    },
    UpdateExpression: (node) => {
      if (node.argument.type !== AST_NODE_TYPES.Identifier) {
        return;
      }
      if (!isAssignedParam(node.argument)) {
        return;
      }
      context.report({
        node: node.argument,
        messageId: "forbiddenParamAssign"
      });
    }
  })
});
