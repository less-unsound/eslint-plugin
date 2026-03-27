import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenExportDefault: "Default exports are not allowed."
});

const isDefaultExportSpecifier = (node: TSESTree.ExportSpecifier): boolean => {
  return node.exported.type === AST_NODE_TYPES.Identifier && node.exported.name === "default";
};

export const noExportDefaultRule = createRule({
  name: "no-export-default",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow default exports."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    ExportDefaultDeclaration: (node) => {
      context.report({
        node,
        messageId: "forbiddenExportDefault"
      });
    },
    ExportNamedDeclaration: (node) => {
      for (const specifier of node.specifiers) {
        if (specifier.type !== AST_NODE_TYPES.ExportSpecifier) {
          continue;
        }
        if (!isDefaultExportSpecifier(specifier)) {
          continue;
        }
        context.report({
          node: specifier,
          messageId: "forbiddenExportDefault"
        });
      }
    }
  })
});
