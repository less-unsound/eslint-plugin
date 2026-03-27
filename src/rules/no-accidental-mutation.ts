import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const freshArrayMethods = new Set<string>([
  "concat",
  "filter",
  "flat",
  "flatMap",
  "map",
  "slice",
  "toReversed",
  "toSorted",
  "toSpliced"
]);

const mutatingMethods = new Set<string>(["reverse", "sort", "splice"]);

const messageIds = Object.freeze({
  forbiddenAccidentalMutation:
    "Accidental array mutation is not allowed on non-fresh arrays unless mutability is required for performance."
});

const getMemberName = (node: TSESTree.MemberExpression): string | undefined => {
  if (node.computed) {
    return undefined;
  }
  if (node.property.type !== AST_NODE_TYPES.Identifier) {
    return undefined;
  }
  return node.property.name;
};

const isArrayFactoryCall = (node: TSESTree.CallExpression): boolean => {
  if (node.callee.type !== AST_NODE_TYPES.MemberExpression) {
    return false;
  }
  const memberName = getMemberName(node.callee);
  if (memberName !== "from" && memberName !== "of") {
    return false;
  }
  if (node.callee.object.type !== AST_NODE_TYPES.Identifier) {
    return false;
  }
  return node.callee.object.name === "Array";
};

const isFreshArrayExpression = (node: TSESTree.Node): boolean => {
  if (node.type === AST_NODE_TYPES.ArrayExpression) {
    return true;
  }
  if (node.type === AST_NODE_TYPES.NewExpression) {
    if (node.callee.type !== AST_NODE_TYPES.Identifier) {
      return false;
    }
    return node.callee.name === "Array";
  }
  if (node.type !== AST_NODE_TYPES.CallExpression) {
    return false;
  }
  if (isArrayFactoryCall(node)) {
    return true;
  }
  if (node.callee.type !== AST_NODE_TYPES.MemberExpression) {
    return false;
  }
  const memberName = getMemberName(node.callee);
  if (memberName === undefined) {
    return false;
  }
  return freshArrayMethods.has(memberName);
};

export const noAccidentalMutationRule = createRule({
  name: "no-accidental-mutation",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow in-place `.sort()`, `.reverse()`, and `.splice()` on non-fresh arrays unless mutability is required for performance."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    CallExpression: (node) => {
      if (node.callee.type !== AST_NODE_TYPES.MemberExpression) {
        return;
      }
      const memberName = getMemberName(node.callee);
      if (memberName === undefined) {
        return;
      }
      if (!mutatingMethods.has(memberName)) {
        return;
      }
      if (isFreshArrayExpression(node.callee.object)) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenAccidentalMutation"
      });
    }
  })
});
