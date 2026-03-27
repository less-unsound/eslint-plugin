import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenGenericParameterBounds:
    "Generic parameter bounds with `extends` are not allowed."
});

export const noGenericParameterBoundsRule = createRule({
  name: "no-generic-parameter-bounds",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow generic parameter bounds with `extends`."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSTypeParameter: (node) => {
      if (node.constraint === undefined) {
        return;
      }
      if (node.parent.type === AST_NODE_TYPES.TSInferType) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenGenericParameterBounds"
      });
    }
  })
});
