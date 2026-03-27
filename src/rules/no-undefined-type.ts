import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenUndefinedType:
    "The `undefined` type is not allowed. Use explicit options or tagged unions instead of `T | undefined`."
});

export const noUndefinedTypeRule = createRule({
  name: "no-undefined-type",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow the `undefined` type keyword in type positions."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSUndefinedKeyword: (node) => {
      context.report({
        node,
        messageId: "forbiddenUndefinedType"
      });
    }
  })
});
