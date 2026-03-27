import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenCommaOperator: "The comma operator is not allowed."
});

export const noCommaOperatorRule = createRule({
  name: "no-comma-operator",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow the comma operator."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    SequenceExpression: (node) => {
      context.report({
        node,
        messageId: "forbiddenCommaOperator"
      });
    }
  })
});
