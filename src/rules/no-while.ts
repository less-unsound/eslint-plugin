import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenWhile: "`while` and `do ... while` loops are not allowed."
});

export const noWhileRule = createRule({
  name: "no-while",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow `while` loops and `do ... while` loops."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    DoWhileStatement: (node) => {
      context.report({
        node,
        messageId: "forbiddenWhile"
      });
    },
    WhileStatement: (node) => {
      context.report({
        node,
        messageId: "forbiddenWhile"
      });
    }
  })
});
