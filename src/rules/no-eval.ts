import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenEval: "`eval` is not allowed."
});

const isEvalIdentifier = (
  node: TSESTree.Expression | TSESTree.PrivateIdentifier,
): boolean =>
  node.type === AST_NODE_TYPES.Identifier &&
  node.name === "eval";

export const noEvalRule = createRule({
  name: "no-eval",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow `eval`."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    CallExpression: (node) => {
      if (!isEvalIdentifier(node.callee)) {
        return;
      }
      context.report({
        node: node.callee,
        messageId: "forbiddenEval"
      });
    }
  })
});
