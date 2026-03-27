import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const forbiddenNames = new Set<string>(["Proxy", "Reflect"]);

const messageIds = Object.freeze({
  forbiddenProxyReflect: "Proxy and Reflect are not allowed."
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

export const noProxyReflectRule = createRule({
  name: "no-proxy-reflect",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow the `Proxy` and `Reflect` global objects."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => {
    const reported = new Set<string>();

    return {
      Identifier: (node) => {
        if (!forbiddenNames.has(node.name)) {
          return;
        }
        if (isBindingIdentifier(node)) {
          return;
        }
        const key = node.range.join(":");
        if (reported.has(key)) {
          return;
        }
        reported.add(key);
        context.report({
          node,
          messageId: "forbiddenProxyReflect"
        });
      }
    };
  }
});
