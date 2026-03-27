import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const broadTypeNames = new Set<string>(["Function", "Object"]);

const messageIds = Object.freeze({
  forbiddenBroadType: "`Object`, `object`, `{}`, and `Function` types are not allowed."
});

export const noBroadTypesRule = createRule({
  name: "no-broad-types",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow `Object`, `object`, `{}`, and `Function` types."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSObjectKeyword: (node) => {
      context.report({
        node,
        messageId: "forbiddenBroadType"
      });
    },
    TSTypeLiteral: (node) => {
      if (node.members.length !== 0) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenBroadType"
      });
    },
    TSTypeReference: (node) => {
      if (node.typeName.type !== AST_NODE_TYPES.Identifier) {
        return;
      }
      if (!broadTypeNames.has(node.typeName.name)) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenBroadType"
      });
    }
  })
});
