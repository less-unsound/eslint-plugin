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
    ast: TSESTree.Program;
    getScope(node: TSESTree.Node): ScopeLike;
  };
  report(descriptor: { readonly messageId: string; readonly node: TSESTree.Node }): void;
};

const moduleSpecifiers = new Set(["module", "node:module"]);

const messageIds = Object.freeze({
  forbiddenCreateRequire: "`createRequire()` is not allowed. Use ES module imports instead.",
  forbiddenRequire: "`require()` is not allowed. Use ES module imports instead."
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
    parent.type === AST_NODE_TYPES.FunctionExpression ||
    parent.type === AST_NODE_TYPES.ArrowFunctionExpression
  ) {
    return parent.id === node || parent.params.includes(node);
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
  if (parent.type === AST_NODE_TYPES.CatchClause) {
    return parent.param === node;
  }
  if (parent.type === AST_NODE_TYPES.TSParameterProperty) {
    return parent.parameter === node;
  }
  if (parent.type === AST_NODE_TYPES.Property && parent.parent?.type === AST_NODE_TYPES.ObjectPattern) {
    return parent.value === node || (parent.shorthand === true && parent.key === node);
  }
  if (parent.type === AST_NODE_TYPES.RestElement) {
    return parent.argument === node;
  }
  if (parent.type === AST_NODE_TYPES.AssignmentPattern) {
    return parent.left === node;
  }
  if (parent.type === AST_NODE_TYPES.ArrayPattern) {
    return true;
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
  return hasDeclaredBinding(context.sourceCode.getScope(node), node.name) === false;
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

const getImportBindings = (program: TSESTree.Program): {
  readonly createRequireNames: ReadonlySet<string>;
  readonly moduleNamespaces: ReadonlySet<string>;
} => {
  const createRequireNames = new Set<string>();
  const moduleNamespaces = new Set<string>();

  for (const statement of program.body) {
    if (statement.type !== AST_NODE_TYPES.ImportDeclaration) {
      continue;
    }
    if (
      statement.source.type !== AST_NODE_TYPES.Literal ||
      typeof statement.source.value !== "string" ||
      !moduleSpecifiers.has(statement.source.value)
    ) {
      continue;
    }

    for (const specifier of statement.specifiers) {
      if (
        specifier.type === AST_NODE_TYPES.ImportSpecifier &&
        specifier.imported.type === AST_NODE_TYPES.Identifier &&
        specifier.imported.name === "createRequire"
      ) {
        createRequireNames.add(specifier.local.name);
      }
      if (specifier.type === AST_NODE_TYPES.ImportNamespaceSpecifier) {
        moduleNamespaces.add(specifier.local.name);
      }
    }
  }

  return {
    createRequireNames,
    moduleNamespaces
  };
};

export const noRequireRule = createRule({
  name: "no-require",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow `require()` and Node `createRequire()`."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context: RuleContext) => {
    const bindings = getImportBindings(context.sourceCode.ast);

    return {
      CallExpression: (node) => {
        if (node.callee.type === AST_NODE_TYPES.Identifier) {
          if (node.callee.name === "require" && isGlobalReference(context, node.callee)) {
            context.report({
              node: node.callee,
              messageId: "forbiddenRequire"
            });
            return;
          }
          if (bindings.createRequireNames.has(node.callee.name)) {
            context.report({
              node: node.callee,
              messageId: "forbiddenCreateRequire"
            });
          }
          return;
        }

        if (node.callee.type !== AST_NODE_TYPES.MemberExpression) {
          return;
        }
        if (node.callee.object.type !== AST_NODE_TYPES.Identifier) {
          return;
        }
        if (!bindings.moduleNamespaces.has(node.callee.object.name)) {
          return;
        }
        if (getPropertyName(node.callee.property) !== "createRequire") {
          return;
        }
        context.report({
          node: node.callee,
          messageId: "forbiddenCreateRequire"
        });
      }
    };
  }
});
