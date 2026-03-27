import {
  AST_NODE_TYPES,
  type TSESLint,
  type TSESTree
} from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const allowedPrefixes = Object.freeze([
  "is",
  "are",
  "was",
  "were",
  "has",
  "have",
  "can",
  "may",
  "should",
  "must",
  "will",
  "would",
  "did",
  "does",
  "do",
  "needs",
  "need",
  "requires",
  "supports",
  "allows",
  "contains",
  "includes",
  "matches",
  "exists"
]);

const comparisonOperators = new Set<string>([
  "!=",
  "!==",
  "<",
  "<=",
  "==",
  "===",
  ">",
  ">=",
  "in",
  "instanceof"
]);

const messageIds = Object.freeze({
  missingBooleanPrefix:
    "Boolean variable and field names must start with an allowed boolean prefix. `{{name}}` should start with one of: {{prefixes}}."
});

const isUppercaseLetter = (value: string): boolean =>
  value.toUpperCase() === value && value.toLowerCase() !== value;

const hasAllowedPrefix = (name: string): boolean =>
  allowedPrefixes.some((prefix) => {
    if (!name.startsWith(prefix)) {
      return false;
    }
    if (name.length === prefix.length) {
      return true;
    }
    const next = name[prefix.length];
    return next !== undefined && isUppercaseLetter(next);
  });

const getName = (
  node: TSESTree.PrivateIdentifier | TSESTree.PropertyName
): string | undefined => {
  if (node.type === AST_NODE_TYPES.Identifier) {
    return node.name;
  }
  if (node.type === AST_NODE_TYPES.PrivateIdentifier) {
    return node.name;
  }
  if (
    node.type === AST_NODE_TYPES.Literal &&
    typeof node.value === "string"
  ) {
    return node.value;
  }
  return undefined;
};

const isBooleanLiteralType = (node: TSESTree.TypeNode): boolean =>
  node.type === AST_NODE_TYPES.TSLiteralType &&
  node.literal.type === AST_NODE_TYPES.Literal &&
  typeof node.literal.value === "boolean";

const isBooleanType = (node: TSESTree.TypeNode): boolean => {
  if (node.type === AST_NODE_TYPES.TSBooleanKeyword) {
    return true;
  }
  if (isBooleanLiteralType(node)) {
    return true;
  }
  if (node.type === AST_NODE_TYPES.TSUnionType) {
    return node.types.length > 0 && node.types.every(isBooleanType);
  }
  return false;
};

const isBooleanAnnotation = (
  annotation: TSESTree.TSTypeAnnotation | undefined
): boolean =>
  annotation !== undefined && isBooleanType(annotation.typeAnnotation);

const isBooleanExpression = (node: TSESTree.Node): boolean => {
  if (
    node.type === AST_NODE_TYPES.Literal &&
    typeof node.value === "boolean"
  ) {
    return true;
  }
  if (node.type === AST_NODE_TYPES.UnaryExpression) {
    return node.operator === "!";
  }
  if (node.type === AST_NODE_TYPES.BinaryExpression) {
    return comparisonOperators.has(node.operator);
  }
  return false;
};

const reportIfNeeded = (
  context: Readonly<TSESLint.RuleContext<"missingBooleanPrefix", readonly []>>,
  node: TSESTree.Node,
  name: string
): void => {
  if (hasAllowedPrefix(name)) {
    return;
  }
  context.report({
    node,
    messageId: "missingBooleanPrefix",
    data: {
      name,
      prefixes: allowedPrefixes.join(", ")
    }
  });
};

export const requireBooleanPrefixRule = createRule({
  name: "require-boolean-prefix",
  meta: {
    type: "problem",
    docs: {
      description:
        "Require boolean variables and fields to start with an allowed boolean prefix."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    VariableDeclarator: (node) => {
      if (node.id.type !== AST_NODE_TYPES.Identifier) {
        return;
      }
      const isBoolean =
        isBooleanAnnotation(node.id.typeAnnotation) ||
        (node.init !== null &&
          node.init !== undefined &&
          isBooleanExpression(node.init));
      if (!isBoolean) {
        return;
      }
      reportIfNeeded(context, node.id, node.id.name);
    },
    Property: (node) => {
      if (node.computed || node.kind !== "init" || node.method) {
        return;
      }
      const name = getName(node.key);
      if (name === undefined) {
        return;
      }
      if (!isBooleanExpression(node.value)) {
        return;
      }
      reportIfNeeded(context, node.key, name);
    },
    PropertyDefinition: (node) => {
      if (node.computed) {
        return;
      }
      const name = getName(node.key);
      if (name === undefined) {
        return;
      }
      const isBoolean =
        isBooleanAnnotation(node.typeAnnotation) ||
        (node.value !== null &&
          node.value !== undefined &&
          isBooleanExpression(node.value));
      if (!isBoolean) {
        return;
      }
      reportIfNeeded(context, node.key, name);
    },
    TSPropertySignature: (node) => {
      if (node.computed || !isBooleanAnnotation(node.typeAnnotation)) {
        return;
      }
      const name = getName(node.key);
      if (name === undefined) {
        return;
      }
      reportIfNeeded(context, node.key, name);
    }
  })
});
