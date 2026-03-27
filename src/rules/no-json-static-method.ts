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
  forbiddenJsonStaticMethod: "`JSON.parse` and `JSON.stringify` are not allowed."
});

const isBindingIdentifier = (node: TSESTree.Identifier): boolean => {
  const parent = node.parent;
  if (parent === null) {
    return false;
  }
  if (parent.type === AST_NODE_TYPES.VariableDeclarator) {
    return parent.id === node;
  }
  if (
    parent.type === AST_NODE_TYPES.FunctionDeclaration ||
    parent.type === AST_NODE_TYPES.FunctionExpression
  ) {
    return parent.id === node;
  }
  if (
    parent.type === AST_NODE_TYPES.ClassDeclaration ||
    parent.type === AST_NODE_TYPES.ClassExpression ||
    parent.type === AST_NODE_TYPES.TSTypeAliasDeclaration ||
    parent.type === AST_NODE_TYPES.TSInterfaceDeclaration ||
    parent.type === AST_NODE_TYPES.TSEnumDeclaration
  ) {
    return parent.id === node;
  }
  if (parent.type === AST_NODE_TYPES.TSEnumMember) {
    return parent.id === node;
  }
  if (
    parent.type === AST_NODE_TYPES.ImportSpecifier ||
    parent.type === AST_NODE_TYPES.ImportDefaultSpecifier ||
    parent.type === AST_NODE_TYPES.ImportNamespaceSpecifier
  ) {
    return parent.local === node;
  }
  if (parent.type === AST_NODE_TYPES.ExportSpecifier) {
    return parent.local === node || parent.exported === node;
  }
  if (parent.type === AST_NODE_TYPES.CatchClause) {
    return parent.param === node;
  }
  if (parent.type === AST_NODE_TYPES.TSParameterProperty) {
    return parent.parameter === node;
  }
  if (parent.type === AST_NODE_TYPES.MemberExpression) {
    return parent.property === node && parent.computed === false;
  }
  if (parent.type === AST_NODE_TYPES.Property) {
    if (parent.parent?.type === AST_NODE_TYPES.ObjectPattern) {
      return parent.key === node && parent.computed === false;
    }
    if (parent.parent?.type === AST_NODE_TYPES.ObjectExpression) {
      return parent.key === node && parent.computed === false && parent.shorthand === false;
    }
    return false;
  }
  if (parent.type === AST_NODE_TYPES.MethodDefinition) {
    return parent.key === node && parent.computed === false;
  }
  if (parent.type === AST_NODE_TYPES.PropertyDefinition) {
    return parent.key === node && parent.computed === false;
  }
  if (
    parent.type === AST_NODE_TYPES.TSPropertySignature ||
    parent.type === AST_NODE_TYPES.TSMethodSignature
  ) {
    return parent.key === node;
  }
  if (parent.type === AST_NODE_TYPES.LabeledStatement) {
    return parent.label === node;
  }
  if (parent.type === AST_NODE_TYPES.TSQualifiedName) {
    return parent.left === node;
  }
  if (parent.type === AST_NODE_TYPES.TSImportEqualsDeclaration) {
    return parent.id === node;
  }
  return false;
};

const hasDeclaredBinding = (scope: ScopeLike, name: string): boolean => {
  const variable = scope.variables.find((value) => value.name === name);
  if (variable !== undefined && (variable.defs.length > 0 || variable.identifiers.length > 0)) {
    return true;
  }
  if (scope.upper === null) {
    return false;
  }
  return hasDeclaredBinding(scope.upper, name);
};

const isGlobalReference = (context: RuleContext, node: TSESTree.Identifier): boolean => {
  if (isBindingIdentifier(node)) {
    return false;
  }
  const scope = context.sourceCode.getScope(node);
  return hasDeclaredBinding(scope, node.name) === false;
};

const getPropertyName = (node: TSESTree.MemberExpression["property"]): string | undefined => {
  if (node.type === AST_NODE_TYPES.Identifier) {
    return node.name;
  }
  if (node.type === AST_NODE_TYPES.Literal && typeof node.value === "string") {
    return node.value;
  }
  return undefined;
};

const isStaticJsonNamespace = (context: RuleContext, node: TSESTree.Expression): boolean => {
  if (node.type === AST_NODE_TYPES.ChainExpression) {
    return isStaticJsonNamespace(context, node.expression);
  }
  if (node.type === AST_NODE_TYPES.Identifier) {
    if (node.name !== "JSON") {
      return false;
    }
    return isGlobalReference(context, node);
  }
  if (node.type !== AST_NODE_TYPES.MemberExpression) {
    return false;
  }
  const propertyName = getPropertyName(node.property);
  if (propertyName !== "JSON") {
    return false;
  }
  if (node.object.type !== AST_NODE_TYPES.Identifier) {
    return false;
  }
  if (!isGlobalReference(context, node.object)) {
    return false;
  }
  return node.object.name === "globalThis" || node.object.name === "window";
};

const isForbiddenMethod = (node: TSESTree.MemberExpression): boolean => {
  const propertyName = getPropertyName(node.property);
  return propertyName === "parse" || propertyName === "stringify";
};

export const noJsonStaticMethodRule = createRule({
  name: "no-json-static-method",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow `JSON.parse` and `JSON.stringify`, including access through `globalThis.JSON` and `window.JSON`."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context: RuleContext) => ({
    MemberExpression: (node) => {
      if (!isForbiddenMethod(node)) {
        return;
      }
      if (!isStaticJsonNamespace(context, node.object)) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenJsonStaticMethod"
      });
    }
  })
});
