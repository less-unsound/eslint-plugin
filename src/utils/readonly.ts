import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";

export const isReadonlyType = (node: TSESTree.TypeNode): boolean => {
  const parent = node.parent;
  if (parent === undefined) {
    return false;
  }
  if (parent.type !== AST_NODE_TYPES.TSTypeOperator) {
    return false;
  }
  if (parent.operator !== "readonly") {
    return false;
  }
  return parent.typeAnnotation === node;
};
