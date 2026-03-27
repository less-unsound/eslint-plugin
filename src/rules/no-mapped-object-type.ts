import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenMappedObjectType: "Mapped object types are not allowed."
});

export const noMappedObjectTypeRule = createRule({
  name: "no-mapped-object-type",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow mapped object types."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSMappedType: (node) => {
      context.report({
        node,
        messageId: "forbiddenMappedObjectType"
      });
    }
  })
});
