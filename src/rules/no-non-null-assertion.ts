import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenNonNullAssertion: "Non-null assertions are not allowed."
});

export const noNonNullAssertionRule = createRule({
  name: "no-non-null-assertion",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow non-null assertions."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSNonNullExpression: (node) => {
      context.report({
        node,
        messageId: "forbiddenNonNullAssertion"
      });
    }
  })
});
