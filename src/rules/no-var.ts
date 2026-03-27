import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenVar: "`var` is not allowed."
});

export const noVarRule = createRule({
  name: "no-var",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow `var` declarations unless mutability is required for performance."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    "VariableDeclaration[kind='var']": (node) => {
      context.report({
        node,
        messageId: "forbiddenVar"
      });
    }
  })
});
