import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenFunctionKeyword:
    "Non-generator `function` declarations and expressions are not allowed."
});

export const noFunctionKeywordRule = createRule({
  name: "no-function-keyword",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow non-generator `function` declarations and expressions."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    FunctionDeclaration: (node) => {
      if (node.generator) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenFunctionKeyword"
      });
    },
    FunctionExpression: (node) => {
      if (node.generator) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenFunctionKeyword"
      });
    },
    TSDeclareFunction: (node) => {
      if (node.generator) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenFunctionKeyword"
      });
    }
  })
});
