import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";
import { isReadonlyType } from "../utils/readonly.js";

const messageIds = Object.freeze({
  missingReadonlyArray: "Array types must use `readonly T[]`."
});

const isArrayReference = (node: {
  readonly typeName: {
    readonly type: string;
    readonly name?: string;
  };
}): boolean => {
  if (node.typeName.type !== AST_NODE_TYPES.Identifier) {
    return false;
  }
  return node.typeName.name === "Array" || node.typeName.name === "ReadonlyArray";
};

export const requireReadonlyArrayRule = createRule({
  name: "require-readonly-array",
  meta: {
    type: "problem",
    docs: {
      description:
        "Require array types to use `readonly T[]` unless mutability is required for performance."
    },
    fixable: "code",
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSArrayType: (node) => {
      if (isReadonlyType(node)) {
        return;
      }
      context.report({
        node,
        messageId: "missingReadonlyArray",
        fix: (fixer) => fixer.insertTextBefore(node, "readonly ")
      });
    },
    TSTypeReference: (node) => {
      if (!isArrayReference(node)) {
        return;
      }
      context.report({
        node,
        messageId: "missingReadonlyArray"
      });
    }
  })
});
