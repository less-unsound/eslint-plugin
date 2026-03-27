import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenNever: "`never` is not allowed."
});

export const noNeverRule = createRule({
  name: "no-never",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow the `never` type keyword."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSNeverKeyword: (node) => {
      context.report({
        node,
        messageId: "forbiddenNever"
      });
    }
  })
});
