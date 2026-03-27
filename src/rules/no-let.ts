import type { TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenLet: "`let` is not allowed."
});

const isForLoopDeclaration = (parent: TSESTree.Node | undefined): boolean => {
  if (parent === undefined) {
    return false;
  }
  if (parent.type === "ForStatement") {
    return parent.init !== null && parent.init.type === "VariableDeclaration";
  }
  if (parent.type === "ForInStatement" || parent.type === "ForOfStatement") {
    return parent.left.type === "VariableDeclaration";
  }
  return false;
};

export const noLetRule = createRule({
  name: "no-let",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow `let` declarations unless mutability is required for performance."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    VariableDeclaration: (node) => {
      if (node.kind !== "let") {
        return;
      }
      if (isForLoopDeclaration(node.parent)) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenLet"
      });
    }
  })
});
