import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenGetterSetter: "Getters and setters are not allowed."
});

export const noGetterSetterRule = createRule({
  name: "no-getter-setter",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow getters and setters in objects, classes, and interfaces."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    MethodDefinition: (node) => {
      if (node.kind !== "get" && node.kind !== "set") {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenGetterSetter"
      });
    },
    Property: (node) => {
      if (node.kind !== "get" && node.kind !== "set") {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenGetterSetter"
      });
    },
    TSMethodSignature: (node) => {
      if (node.kind !== "get" && node.kind !== "set") {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenGetterSetter"
      });
    }
  })
});
