import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenTypeofType: "`typeof` in type context is not allowed."
});

export const noTypeofTypeRule = createRule({
  name: "no-typeof-type",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow `typeof` in type context."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSTypeQuery: (node) => {
      context.report({
        node,
        messageId: "forbiddenTypeofType"
      });
    }
  })
});
