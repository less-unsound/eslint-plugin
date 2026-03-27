import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenBooleanLiteralCompare:
    "Comparisons to boolean literals are not allowed."
});

const equalityOperators = new Set(["==", "!=", "===", "!=="]);

const isBooleanLiteral = (
  node: TSESTree.Node,
): boolean =>
  node.type === AST_NODE_TYPES.Literal &&
  typeof node.value === "boolean";

export const noBooleanLiteralCompareRule = createRule({
  name: "no-boolean-literal-compare",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow equality comparisons to boolean literals."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    BinaryExpression: (node) => {
      if (!equalityOperators.has(node.operator)) {
        return;
      }
      if (!isBooleanLiteral(node.left) && !isBooleanLiteral(node.right)) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenBooleanLiteralCompare"
      });
    }
  })
});
