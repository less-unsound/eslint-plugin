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

const browserGlobals = new Set<string>([
  "addEventListener",
  "blur",
  "close",
  "closed",
  "confirm",
  "defaultStatus",
  "defaultstatus",
  "event",
  "external",
  "find",
  "focus",
  "frameElement",
  "frames",
  "history",
  "innerHeight",
  "innerWidth",
  "length",
  "location",
  "locationbar",
  "menubar",
  "moveBy",
  "moveTo",
  "name",
  "onblur",
  "onerror",
  "onfocus",
  "onload",
  "onresize",
  "onunload",
  "open",
  "opener",
  "opera",
  "outerHeight",
  "outerWidth",
  "pageXOffset",
  "pageYOffset",
  "parent",
  "print",
  "removeEventListener",
  "resizeBy",
  "resizeTo",
  "screen",
  "screenLeft",
  "screenTop",
  "screenX",
  "screenY",
  "scroll",
  "scrollBy",
  "scrollTo",
  "scrollX",
  "scrollY",
  "scrollbars",
  "status",
  "statusbar",
  "stop",
  "toolbar",
  "top"
]);

const messageIds = Object.freeze({
  forbiddenAmbientDomGlobal: "Ambient DOM globals are not allowed."
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
      return parent.key === node && parent.computed === false;
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

export const noAmbientDomGlobalsRule = createRule({
  name: "no-ambient-dom-globals",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow the confusing ambient browser-global surface."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context: RuleContext) => ({
    Identifier: (node) => {
      if (!browserGlobals.has(node.name)) {
        return;
      }
      if (isBindingIdentifier(node)) {
        return;
      }
      const scope = context.sourceCode.getScope(node);
      if (hasDeclaredBinding(scope, node.name)) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenAmbientDomGlobal"
      });
    }
  })
});
