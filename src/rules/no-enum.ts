import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenEnum: "`enum` is not allowed."
});

export const noEnumRule = createRule({
  name: "no-enum",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow `enum` and `const enum` declarations."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSEnumDeclaration: (node) => {
      context.report({
        node,
        messageId: "forbiddenEnum"
      });
    }
  })
});
