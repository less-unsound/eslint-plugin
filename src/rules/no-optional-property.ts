import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenOptionalProperty: "Optional object fields are not allowed."
});

export const noOptionalPropertyRule = createRule({
  name: "no-optional-property",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow optional object fields marked with `?`."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSPropertySignature: (node) => {
      if (!node.optional) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenOptionalProperty"
      });
    }
  })
});
