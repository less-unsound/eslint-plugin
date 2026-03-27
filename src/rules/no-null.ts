import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenNull: "`null` is not allowed."
});

export const noNullRule = createRule({
  name: "no-null",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow both runtime `null` literals and the `null` type."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    Literal: (node) => {
      if (node.value !== null) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenNull"
      });
    },
    TSNullKeyword: (node) => {
      context.report({
        node,
        messageId: "forbiddenNull"
      });
    }
  })
});
