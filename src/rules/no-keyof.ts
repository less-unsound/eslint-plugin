import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenKeyof: "`keyof` is not allowed."
});

export const noKeyofRule = createRule({
  name: "no-keyof",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow the `keyof` type operator."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    "TSTypeOperator[operator='keyof']": (node) => {
      context.report({
        node,
        messageId: "forbiddenKeyof"
      });
    }
  })
});
