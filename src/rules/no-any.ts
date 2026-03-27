import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenAny: "`any` is not allowed."
});

export const noAnyRule = createRule({
  name: "no-any",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow the `any` type."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSAnyKeyword: (node) => {
      context.report({
        node,
        messageId: "forbiddenAny"
      });
    }
  })
});
