import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenSymbolType: "`symbol` and `unique symbol` types are not allowed."
});

export const noSymbolRule = createRule({
  name: "no-symbol",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow `symbol` and `unique symbol` types."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSSymbolKeyword: (node) => {
      context.report({
        node,
        messageId: "forbiddenSymbolType"
      });
    },
    TSUniqueKeyword: (node) => {
      context.report({
        node,
        messageId: "forbiddenSymbolType"
      });
    }
  })
});
