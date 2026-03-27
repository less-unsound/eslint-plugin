import type { TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";
import { containsTypeReference } from "../utils/type-reference.js";

const messageIds = Object.freeze({
  forbiddenInheritance: "Inheritance is not allowed."
});

const isAllowedRecursiveInterface = (
  node: TSESTree.TSInterfaceDeclaration
): boolean => {
  if (node.extends.length !== 1) {
    return false;
  }
  if (node.body.body.length !== 0) {
    return false;
  }
  const heritage = node.extends[0];
  if (heritage.typeArguments === undefined) {
    return false;
  }
  return heritage.typeArguments.params.some((parameter) =>
    containsTypeReference(parameter, node.id.name)
  );
};

export const noInheritanceRule = createRule({
  name: "no-inheritance",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow `extends` on classes and interfaces, except for the documented recursive-interface workaround."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    ClassDeclaration: (node) => {
      if (node.superClass === null) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenInheritance"
      });
    },
    ClassExpression: (node) => {
      if (node.superClass === null) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenInheritance"
      });
    },
    TSInterfaceDeclaration: (node) => {
      if (node.extends.length === 0) {
        return;
      }
      if (isAllowedRecursiveInterface(node)) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenInheritance"
      });
    }
  })
});
