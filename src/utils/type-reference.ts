import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";

const isIdentifierTypeName = (
  typeName: TSESTree.EntityName,
  name: string
): boolean => {
  if (typeName.type !== AST_NODE_TYPES.Identifier) {
    return false;
  }
  return typeName.name === name;
};

const containsTypeReferenceValue = (
  value: unknown,
  name: string,
  seen: WeakSet<object>
): boolean => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const objectValue = value as object;
  if (seen.has(objectValue)) {
    return false;
  }
  seen.add(objectValue);
  const typedValue = value as { readonly type?: string };
  if (typedValue.type === AST_NODE_TYPES.TSTypeReference) {
    const node = value as TSESTree.TSTypeReference;
    if (isIdentifierTypeName(node.typeName, name)) {
      return true;
    }
  }
  return Object.entries(value).some(([key, child]) => {
    if (key === "parent") {
      return false;
    }
    return containsTypeReferenceValue(child, name, seen);
  });
};

export const containsTypeReference = (
  node: TSESTree.Node,
  name: string
): boolean => containsTypeReferenceValue(node, name, new WeakSet<object>());
