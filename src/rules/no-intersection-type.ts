import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenIntersectionType: "Intersection types are not allowed."
});

export const noIntersectionTypeRule = createRule({
  name: "no-intersection-type",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow intersection types."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSIntersectionType: (node) => {
      context.report({
        node,
        messageId: "forbiddenIntersectionType"
      });
    }
  })
});
