import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenObjectSpread: "Object spread is not allowed."
});

export const noObjectSpreadRule = createRule({
  name: "no-object-spread",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow object spread in object literals."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    "ObjectExpression > SpreadElement": (node) => {
      context.report({
        node,
        messageId: "forbiddenObjectSpread"
      });
    }
  })
});
