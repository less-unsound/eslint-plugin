import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenForIn: "`for (... in ...)` is not allowed."
});

export const noForInRule = createRule({
  name: "no-for-in",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow `for (... in ...)` loops."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    ForInStatement: (node) => {
      context.report({
        node,
        messageId: "forbiddenForIn"
      });
    }
  })
});
