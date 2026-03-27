import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenTryCatch: "`try ... catch` is not allowed."
});

export const noTryCatchRule = createRule({
  name: "no-try-catch",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow `try ... catch`."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TryStatement: (node) => {
      if (node.handler === null) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenTryCatch"
      });
    }
  })
});
