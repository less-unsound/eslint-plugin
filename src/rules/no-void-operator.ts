import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenVoidOperator: "The `void` operator is not allowed."
});

export const noVoidOperatorRule = createRule({
  name: "no-void-operator",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow the runtime `void` operator."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    "UnaryExpression[operator='void']": (node) => {
      context.report({
        node,
        messageId: "forbiddenVoidOperator"
      });
    }
  })
});
