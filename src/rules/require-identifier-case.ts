import { AST_NODE_TYPES, type TSESLint, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";
import { isCamelCase, isPascalCase } from "../utils/string-case.js";

const messageIds = Object.freeze({
  invalidIdentifierCase:
    "Identifiers must be in camelCase, PascalCase, `_camelCase`, or `$` followed by up to 2 letters. `{{name}}` is not allowed."
});

const isShortDollarName = (name: string): boolean => /^\$[A-Za-z]{0,2}$/u.test(name);

const isUnderscoreCamelCase = (name: string): boolean =>
  name.startsWith("_") && isCamelCase(name.slice(1));

const isAllowedName = (name: string): boolean =>
  isCamelCase(name) ||
  isPascalCase(name) ||
  isUnderscoreCamelCase(name) ||
  isShortDollarName(name);

const reportIfNeeded = (
  context: Readonly<TSESLint.RuleContext<"invalidIdentifierCase", readonly []>>,
  node: TSESTree.Identifier | TSESTree.PrivateIdentifier,
  name: string
): void => {
  if (isAllowedName(name)) {
    return;
  }
  context.report({
    node,
    messageId: "invalidIdentifierCase",
    data: {
      name
    }
  });
};

const reportNameNode = (
  context: Readonly<TSESLint.RuleContext<"invalidIdentifierCase", readonly []>>,
  node: TSESTree.Identifier | TSESTree.PrivateIdentifier
): void => reportIfNeeded(context, node, node.name);

const reportPattern = (
  context: Readonly<TSESLint.RuleContext<"invalidIdentifierCase", readonly []>>,
  node: TSESTree.Node
): void => {
  if (node.type === AST_NODE_TYPES.Identifier) {
    reportNameNode(context, node);
    return;
  }
  if (node.type === AST_NODE_TYPES.RestElement) {
    reportPattern(context, node.argument);
    return;
  }
  if (node.type === AST_NODE_TYPES.AssignmentPattern) {
    reportPattern(context, node.left);
    return;
  }
  if (node.type === AST_NODE_TYPES.ArrayPattern) {
    for (const element of node.elements) {
      if (element === null) {
        continue;
      }
      reportPattern(context, element);
    }
    return;
  }
  if (node.type !== AST_NODE_TYPES.ObjectPattern) {
    return;
  }
  for (const property of node.properties) {
    if (property.type === AST_NODE_TYPES.RestElement) {
      reportPattern(context, property.argument);
      continue;
    }
    reportPattern(context, property.value);
  }
};

const reportPropertyKey = (
  context: Readonly<TSESLint.RuleContext<"invalidIdentifierCase", readonly []>>,
  node: TSESTree.PropertyName | TSESTree.PrivateIdentifier
): void => {
  if (
    node.type !== AST_NODE_TYPES.Identifier &&
    node.type !== AST_NODE_TYPES.PrivateIdentifier
  ) {
    return;
  }
  reportNameNode(context, node);
};

export const requireIdentifierCaseRule = createRule({
  name: "require-identifier-case",
  meta: {
    type: "problem",
    docs: {
      description:
        "Require identifiers to use camelCase, PascalCase, `_camelCase`, or short `$` names."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    ArrowFunctionExpression: (node) => {
      for (const param of node.params) {
        reportPattern(context, param);
      }
    },
    CatchClause: (node) => {
      if (node.param === null) {
        return;
      }
      reportPattern(context, node.param);
    },
    ClassDeclaration: (node) => {
      if (node.id !== null) {
        reportNameNode(context, node.id);
      }
    },
    ClassExpression: (node) => {
      if (node.id !== null) {
        reportNameNode(context, node.id);
      }
    },
    FunctionDeclaration: (node) => {
      if (node.id !== null) {
        reportNameNode(context, node.id);
      }
      for (const param of node.params) {
        reportPattern(context, param);
      }
    },
    FunctionExpression: (node) => {
      if (node.id !== null) {
        reportNameNode(context, node.id);
      }
      for (const param of node.params) {
        reportPattern(context, param);
      }
    },
    ImportDefaultSpecifier: (node) => {
      reportNameNode(context, node.local);
    },
    ImportNamespaceSpecifier: (node) => {
      reportNameNode(context, node.local);
    },
    ImportSpecifier: (node) => {
      reportNameNode(context, node.local);
    },
    MethodDefinition: (node) => {
      if (node.computed) {
        return;
      }
      reportPropertyKey(context, node.key);
    },
    Property: (node) => {
      if (node.parent.type !== AST_NODE_TYPES.ObjectExpression) {
        return;
      }
      if (node.computed || node.shorthand) {
        return;
      }
      reportPropertyKey(context, node.key);
    },
    PropertyDefinition: (node) => {
      if (node.computed) {
        return;
      }
      reportPropertyKey(context, node.key);
    },
    TSEnumDeclaration: (node) => {
      reportNameNode(context, node.id);
    },
    TSEnumMember: (node) => {
      if (node.id.type !== AST_NODE_TYPES.Identifier) {
        return;
      }
      reportNameNode(context, node.id);
    },
    TSInterfaceDeclaration: (node) => {
      reportNameNode(context, node.id);
    },
    TSMethodSignature: (node) => {
      if (node.computed) {
        return;
      }
      reportPropertyKey(context, node.key);
    },
    TSModuleDeclaration: (node) => {
      if (node.id.type !== AST_NODE_TYPES.Identifier) {
        return;
      }
      reportNameNode(context, node.id);
    },
    TSParameterProperty: (node) => {
      if (node.parameter.type === AST_NODE_TYPES.Identifier) {
        reportNameNode(context, node.parameter);
        return;
      }
      if (node.parameter.type === AST_NODE_TYPES.AssignmentPattern) {
        reportPattern(context, node.parameter);
      }
    },
    TSPropertySignature: (node) => {
      if (node.computed) {
        return;
      }
      reportPropertyKey(context, node.key);
    },
    TSTypeAliasDeclaration: (node) => {
      reportNameNode(context, node.id);
    },
    TSTypeParameter: (node) => {
      reportNameNode(context, node.name);
    },
    VariableDeclarator: (node) => {
      reportPattern(context, node.id);
    }
  })
});
