import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenConditionalType: "Conditional types are not allowed."
});

export const noConditionalTypeRule = createRule({
  name: "no-conditional-type",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow conditional types."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSConditionalType: (node) => {
      context.report({
        node,
        messageId: "forbiddenConditionalType"
      });
    }
  })
});
