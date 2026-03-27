import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

type ScopeLike = {
  readonly upper: ScopeLike | null;
};

type RuleContext = {
  readonly sourceCode: {
    getScope(node: TSESTree.Node): ScopeLike;
  };
  report(descriptor: { node: TSESTree.Node; messageId: string }): void;
};

const messageIds = Object.freeze({
  forbiddenObjectAsMap: "Plain objects are not allowed as dynamic maps."
});

const scopeObjects = new WeakMap<ScopeLike, Map<string, boolean>>();

const getScopeNames = (scope: ScopeLike): Map<string, boolean> => {
  const names = scopeObjects.get(scope);
  if (names !== undefined) {
    return names;
  }
  const created = new Map<string, boolean>();
  scopeObjects.set(scope, created);
  return created;
};

const unwrapExpression = (node: TSESTree.Expression): TSESTree.Expression => {
  if (node.type === AST_NODE_TYPES.TSAsExpression) {
    return unwrapExpression(node.expression);
  }
  if (node.type === AST_NODE_TYPES.TSSatisfiesExpression) {
    return unwrapExpression(node.expression);
  }
  if (node.type === AST_NODE_TYPES.TSNonNullExpression) {
    return unwrapExpression(node.expression);
  }
  return node;
};

const isNullLiteral = (node: TSESTree.Expression): boolean =>
  node.type === AST_NODE_TYPES.Literal && node.value === null;

const isObjectCreateNullCall = (node: TSESTree.CallExpression): boolean => {
  if (node.callee.type !== AST_NODE_TYPES.MemberExpression) {
    return false;
  }
  if (node.callee.computed) {
    return false;
  }
  if (node.callee.object.type !== AST_NODE_TYPES.Identifier) {
    return false;
  }
  if (node.callee.object.name !== "Object") {
    return false;
  }
  if (node.callee.property.type !== AST_NODE_TYPES.Identifier) {
    return false;
  }
  if (node.callee.property.name !== "create") {
    return false;
  }
  if (node.arguments.length !== 1) {
    return false;
  }
  const [argument] = node.arguments;
  if (argument === undefined || argument.type === AST_NODE_TYPES.SpreadElement) {
    return false;
  }
  return isNullLiteral(argument);
};

const isPlainObjectExpression = (node: TSESTree.Expression): boolean => {
  const expression = unwrapExpression(node);
  if (expression.type === AST_NODE_TYPES.ObjectExpression) {
    return true;
  }
  if (expression.type !== AST_NODE_TYPES.CallExpression) {
    return false;
  }
  return isObjectCreateNullCall(expression);
};

const isDynamicKey = (node: TSESTree.MemberExpression): boolean => {
  if (!node.computed) {
    return false;
  }
  return node.property.type !== AST_NODE_TYPES.Literal;
};

const markDeclaredVariable = (
  context: RuleContext,
  node: TSESTree.Node,
  name: string,
  isPlainObject: boolean
): void => {
  const scope = context.sourceCode.getScope(node);
  const names = getScopeNames(scope);
  const current = names.get(name) ?? false;
  names.set(name, current || isPlainObject);
};

const isPlainObjectVariable = (
  context: RuleContext,
  node: TSESTree.Node,
  name: string
): boolean => {
  let scope: ScopeLike | null = context.sourceCode.getScope(node);
  while (scope !== null) {
    const names = scopeObjects.get(scope);
    if (names !== undefined && names.has(name)) {
      return names.get(name) ?? false;
    }
    scope = scope.upper;
  }
  return false;
};

export const noObjectAsMapRule = createRule({
  name: "no-object-as-map",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow using plain objects as dynamic maps."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context: RuleContext) => ({
    VariableDeclarator: (node) => {
      if (node.id.type !== AST_NODE_TYPES.Identifier) {
        return;
      }
      const isPlainObject =
        node.init !== undefined &&
        node.init !== null &&
        isPlainObjectExpression(node.init);
      markDeclaredVariable(context, node, node.id.name, isPlainObject);
    },
    MemberExpression: (node) => {
      if (!isDynamicKey(node)) {
        return;
      }
      const object = unwrapExpression(node.object);
      if (object.type === AST_NODE_TYPES.ObjectExpression) {
        context.report({
          node,
          messageId: "forbiddenObjectAsMap"
        });
        return;
      }
      if (object.type !== AST_NODE_TYPES.Identifier) {
        return;
      }
      if (!isPlainObjectVariable(context, node, object.name)) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenObjectAsMap"
      });
    }
  })
});
