import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenTuple: "Tuple types are not allowed."
});

export const noTupleRule = createRule({
  name: "no-tuple",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow tuple types."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSTupleType: (node) => {
      context.report({
        node,
        messageId: "forbiddenTuple"
      });
    }
  })
});
