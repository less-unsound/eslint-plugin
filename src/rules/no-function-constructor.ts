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

const globalNames = new Set<string>(["Function", "globalThis", "window", "self", "global"]);

const messageIds = Object.freeze({
  forbiddenFunctionConstructor: "`Function()` is not allowed."
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

const isGlobalReference = (context: RuleContext, node: TSESTree.Node, name: string): boolean => {
  const scope = context.sourceCode.getScope(node);
  return !hasDeclaredBinding(scope, name);
};

const isFunctionConstructorCall = (
  context: RuleContext,
  node: TSESTree.CallExpression | TSESTree.NewExpression
): boolean => {
  if (node.callee.type === AST_NODE_TYPES.Identifier) {
    return node.callee.name === "Function" && isGlobalReference(context, node.callee, "Function");
  }
  if (node.callee.type !== AST_NODE_TYPES.MemberExpression) {
    return false;
  }
  if (node.callee.object.type !== AST_NODE_TYPES.Identifier) {
    return false;
  }
  if (!globalNames.has(node.callee.object.name) || node.callee.object.name === "Function") {
    return false;
  }
  if (!isGlobalReference(context, node.callee.object, node.callee.object.name)) {
    return false;
  }
  if (node.callee.property.type === AST_NODE_TYPES.Identifier) {
    return node.callee.property.name === "Function";
  }
  if (node.callee.property.type === AST_NODE_TYPES.Literal) {
    return node.callee.property.value === "Function";
  }
  return false;
};

export const noFunctionConstructorRule = createRule({
  name: "no-function-constructor",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow global `Function` constructor usage."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context: RuleContext) => ({
    CallExpression: (node) => {
      if (!isFunctionConstructorCall(context, node)) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenFunctionConstructor"
      });
    },
    NewExpression: (node) => {
      if (!isFunctionConstructorCall(context, node)) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenFunctionConstructor"
      });
    }
  })
});
