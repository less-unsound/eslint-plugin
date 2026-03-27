import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenUnknown: "`unknown` is not allowed."
});

export const noUnknownRule = createRule({
  name: "no-unknown",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow the `unknown` type."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSUnknownKeyword: (node) => {
      context.report({
        node,
        messageId: "forbiddenUnknown"
      });
    }
  })
});
