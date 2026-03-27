import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  missingReadonlyCollections: "Collection types must use `ReadonlySet` and `ReadonlyMap` unless mutability is required for performance."
});

const isMutableCollection = (node: {
  readonly typeName: {
    readonly type: string;
    readonly name?: string;
  };
}): boolean => {
  if (node.typeName.type !== AST_NODE_TYPES.Identifier) {
    return false;
  }
  return node.typeName.name === "Set" || node.typeName.name === "Map";
};

export const requireReadonlyCollectionsRule = createRule({
  name: "require-readonly-collections",
  meta: {
    type: "problem",
    docs: {
      description:
        "Require `ReadonlySet` and `ReadonlyMap` in types unless mutability is required for performance."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSTypeReference: (node) => {
      if (!isMutableCollection(node)) {
        return;
      }
      context.report({
        node,
        messageId: "missingReadonlyCollections"
      });
    }
  })
});
