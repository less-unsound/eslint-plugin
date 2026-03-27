import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import type ts from "typescript";
import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  nonStringTemplateExpression:
    "Template literal expressions must have string type. Got `{{type}}`."
});

const isStringType = (checker: ts.TypeChecker, type: ts.Type): boolean => {
  const constrainedType = checker.getBaseConstraintOfType(type) ?? type;
  if (constrainedType.isUnion()) {
    return constrainedType.types.every((member) => isStringType(checker, member));
  }
  if (constrainedType.isIntersection()) {
    return constrainedType.types.some((member) => isStringType(checker, member));
  }
  const baseType = checker.getBaseTypeOfLiteralType(constrainedType);
  return checker.typeToString(baseType) === "string";
};

export const requireStringTemplateExpressionRule = createRule({
  name: "require-string-template-expression",
  meta: {
    type: "problem",
    docs: {
      description:
        "Require untagged template literal interpolations to have `string` type."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => {
    const services = ESLintUtils.getParserServices(context);
    const checker = services.program.getTypeChecker();
    return {
      TemplateLiteral: (node) => {
        if (node.parent.type === AST_NODE_TYPES.TaggedTemplateExpression) {
          return;
        }
        for (const expression of node.expressions) {
          const expressionType = services.getTypeAtLocation(expression);
          if (isStringType(checker, expressionType)) {
            continue;
          }
          context.report({
            node: expression,
            messageId: "nonStringTemplateExpression",
            data: {
              type: checker.typeToString(expressionType)
            }
          });
        }
      }
    };
  }
});
