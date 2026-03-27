import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenTypeofOperator: "The runtime `typeof` operator is not allowed."
});

export const noTypeofOperatorRule = createRule({
  name: "no-typeof-operator",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow the runtime `typeof` operator."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    "UnaryExpression[operator='typeof']": (node) => {
      context.report({
        node,
        messageId: "forbiddenTypeofOperator"
      });
    }
  })
});
