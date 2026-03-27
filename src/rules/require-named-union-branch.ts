import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  requireNamedUnionBranch: "Object union branches must be named."
});

const isInlineObjectType = (node: TSESTree.TypeNode): boolean =>
  node.type === AST_NODE_TYPES.TSTypeLiteral;

export const requireNamedUnionBranchRule = createRule({
  name: "require-named-union-branch",
  meta: {
    type: "problem",
    docs: {
      description:
        "Require every object-shaped union branch to be defined through its own name."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSUnionType: (node) => {
      for (const branch of node.types) {
        if (!isInlineObjectType(branch)) {
          continue;
        }
        context.report({
          node: branch,
          messageId: "requireNamedUnionBranch"
        });
      }
    }
  })
});
