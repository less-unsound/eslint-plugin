import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenForLet: "`for (let ...)` loops are not allowed."
});

export const noForLetRule = createRule({
  name: "no-for-let",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow `for (let ...)` loops unless mutability is required for performance."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    "ForStatement > VariableDeclaration[kind='let'].init": (node) => {
      context.report({
        node,
        messageId: "forbiddenForLet"
      });
    },
    "ForInStatement > VariableDeclaration[kind='let'].left": (node) => {
      context.report({
        node,
        messageId: "forbiddenForLet"
      });
    },
    "ForOfStatement > VariableDeclaration[kind='let'].left": (node) => {
      context.report({
        node,
        messageId: "forbiddenForLet"
      });
    }
  })
});
