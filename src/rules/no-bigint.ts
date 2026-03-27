import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

type ScopeVariableLike = {
  readonly defs: readonly unknown[];
  readonly identifiers: readonly unknown[];
  readonly name: string;
};

type ScopeLike = {
  readonly upper: ScopeLike | null;
  readonly variables: readonly ScopeVariableLike[];
};

type RuleContext = {
  readonly sourceCode: {
    getScope(node: TSESTree.Node): ScopeLike;
  };
  report(descriptor: { readonly messageId: string; readonly node: TSESTree.Node }): void;
};

const messageIds = Object.freeze({
  forbiddenBigInt: "`bigint` is not allowed."
});

const hasDeclaredBinding = (scope: ScopeLike, name: string): boolean => {
  let current: ScopeLike | null = scope;
  while (current !== null) {
    for (const variable of current.variables) {
      if (variable.name !== name) {
        continue;
      }
      if (variable.defs.length > 0 || variable.identifiers.length > 0) {
        return true;
      }
    }
    current = current.upper;
  }
  return false;
};

const isBigIntLiteral = (node: TSESTree.Node): node is TSESTree.BigIntLiteral =>
  node.type === AST_NODE_TYPES.Literal && "bigint" in node && typeof node.bigint === "string";

export const noBigintRule = createRule({
  name: "no-bigint",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow `bigint` types and values."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context: RuleContext) => ({
    Literal: (node) => {
      if (!isBigIntLiteral(node)) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenBigInt"
      });
    },
    TSBigIntKeyword: (node) => {
      context.report({
        node,
        messageId: "forbiddenBigInt"
      });
    },
    Identifier: (node) => {
      if (node.name !== "BigInt") {
        return;
      }
      const parent = node.parent;
      if (parent === null) {
        return;
      }
      const isBigIntCall =
        parent.type === AST_NODE_TYPES.CallExpression && parent.callee === node;
      const isBigIntMember =
        parent.type === AST_NODE_TYPES.MemberExpression && parent.object === node;
      if (!isBigIntCall && !isBigIntMember) {
        return;
      }
      if (hasDeclaredBinding(context.sourceCode.getScope(node), node.name)) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenBigInt"
      });
    }
  })
});
