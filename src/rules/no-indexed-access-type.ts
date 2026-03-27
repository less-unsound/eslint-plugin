import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenIndexedAccessType: "Indexed access types are not allowed."
});

export const noIndexedAccessTypeRule = createRule({
  name: "no-indexed-access-type",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow indexed access types such as Foo[\"bar\"]."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSIndexedAccessType: (node) => {
      context.report({
        node,
        messageId: "forbiddenIndexedAccessType"
      });
    }
  })
});
