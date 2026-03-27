import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenTypeGuard: "Type guards are not allowed."
});

export const noTypeGuardRule = createRule({
  name: "no-type-guard",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow TypeScript type guards."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSTypePredicate: (node) => {
      context.report({
        node,
        messageId: "forbiddenTypeGuard"
      });
    }
  })
});
