import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenInOperator: "The `in` operator is not allowed."
});

export const noInOperatorRule = createRule({
  name: "no-in-operator",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow the `in` operator."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    "BinaryExpression[operator='in']": (node) => {
      context.report({
        node,
        messageId: "forbiddenInOperator"
      });
    }
  })
});
