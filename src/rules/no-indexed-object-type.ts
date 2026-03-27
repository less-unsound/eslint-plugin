import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";
import { containsTypeReference } from "../utils/type-reference.js";

const messageIds = Object.freeze({
  forbiddenIndexedObjectType: "Indexed object types are not allowed."
});

const getContainingTypeName = (node: TSESTree.Node): string | undefined => {
  let current = node.parent;
  while (current !== undefined) {
    if (
      current.type === AST_NODE_TYPES.TSTypeAliasDeclaration ||
      current.type === AST_NODE_TYPES.TSInterfaceDeclaration
    ) {
      return current.id.name;
    }
    current = current.parent;
  }
  return undefined;
};

const isAllowedRecursiveIndexSignature = (
  node: TSESTree.TSIndexSignature
): boolean => {
  if (node.typeAnnotation === undefined) {
    return false;
  }
  const typeName = getContainingTypeName(node);
  if (typeName === undefined) {
    return false;
  }
  return containsTypeReference(node.typeAnnotation.typeAnnotation, typeName);
};

export const noIndexedObjectTypeRule = createRule({
  name: "no-indexed-object-type",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow indexed object types such as `{ [key: string]: T }`, except for explicit self-recursive cases."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSIndexSignature: (node) => {
      if (isAllowedRecursiveIndexSignature(node)) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenIndexedObjectType"
      });
    }
  })
});
