import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenUntaggedObjectUnion: "Untagged object unions are not allowed."
});

const getPropertyName = (node: TSESTree.PropertyName): string | undefined => {
  if (node.type === AST_NODE_TYPES.Identifier) {
    return `identifier:${node.name}`;
  }
  if (node.type !== AST_NODE_TYPES.Literal) {
    return undefined;
  }
  const { value } = node;
  if (typeof value === "string") {
    return `string:${value}`;
  }
  if (typeof value === "number") {
    return `number:${value}`;
  }
  if (typeof value === "boolean") {
    return `boolean:${value}`;
  }
  if (typeof value === "bigint") {
    return `bigint:${value.toString()}`;
  }
  if (value === null) {
    return "null";
  }
  return undefined;
};

const getLiteralValue = (node: TSESTree.TSLiteralType): string | undefined => {
  if (node.literal.type !== AST_NODE_TYPES.Literal) {
    return undefined;
  }
  const { value } = node.literal;
  if (typeof value === "string") {
    return `string:${value}`;
  }
  if (typeof value === "number") {
    return `number:${value}`;
  }
  if (typeof value === "boolean") {
    return `boolean:${value}`;
  }
  if (typeof value === "bigint") {
    return `bigint:${value.toString()}`;
  }
  if (value === null) {
    return "null";
  }
  return undefined;
};

const getTaggedPropertyValue = (
  node: TSESTree.TSTypeLiteral,
  propertyName: string
): string | undefined => {
  for (const member of node.members) {
    if (member.type !== AST_NODE_TYPES.TSPropertySignature) {
      continue;
    }
    if (member.optional) {
      continue;
    }
    const name = getPropertyName(member.key);
    if (name !== propertyName) {
      continue;
    }
    if (member.typeAnnotation === undefined) {
      return undefined;
    }
    if (member.typeAnnotation.typeAnnotation.type !== AST_NODE_TYPES.TSLiteralType) {
      return undefined;
    }
    return getLiteralValue(member.typeAnnotation.typeAnnotation);
  }
  return undefined;
};

const isTaggedObjectUnion = (node: TSESTree.TSUnionType): boolean => {
  if (node.types.length < 2) {
    return false;
  }
  const first = node.types[0];
  if (first.type !== AST_NODE_TYPES.TSTypeLiteral) {
    return false;
  }
  const candidateNames = new Set<string>();
  for (const member of first.members) {
    if (member.type !== AST_NODE_TYPES.TSPropertySignature) {
      continue;
    }
    if (member.optional) {
      continue;
    }
    if (member.typeAnnotation === undefined) {
      continue;
    }
    if (member.typeAnnotation.typeAnnotation.type !== AST_NODE_TYPES.TSLiteralType) {
      continue;
    }
    const name = getPropertyName(member.key);
    if (name !== undefined) {
      candidateNames.add(name);
    }
  }
  for (const propertyName of candidateNames) {
    const values = new Set<string>();
    let isValid = true;
    for (const branch of node.types) {
      if (branch.type !== AST_NODE_TYPES.TSTypeLiteral) {
        isValid = false;
        break;
      }
      const value = getTaggedPropertyValue(branch, propertyName);
      if (value === undefined) {
        isValid = false;
        break;
      }
      values.add(value);
    }
    if (isValid && values.size === node.types.length) {
      return true;
    }
  }
  return false;
};

export const noUntaggedObjectUnionRule = createRule({
  name: "no-untagged-object-union",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow unions of inline object types unless they share a literal tag field."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSUnionType: (node) => {
      if (isTaggedObjectUnion(node)) {
        return;
      }
      if (
        node.types.every((branch) => branch.type === AST_NODE_TYPES.TSTypeLiteral)
      ) {
        context.report({
          node,
          messageId: "forbiddenUntaggedObjectUnion"
        });
      }
    }
  })
});
