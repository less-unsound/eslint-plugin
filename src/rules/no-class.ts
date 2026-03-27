import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenClass: "`class` is not allowed."
});

export const noClassRule = createRule({
  name: "no-class",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow `class` declarations and expressions when they are not already covered by `no-inheritance`."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    ClassDeclaration: (node) => {
      if (node.superClass !== null) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenClass"
      });
    },
    ClassExpression: (node) => {
      if (node.superClass !== null) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenClass"
      });
    }
  })
});
