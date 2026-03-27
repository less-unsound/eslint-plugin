import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenImportRename:
    "Renamed import `{{importedName}} as {{localName}}` is not allowed. Use the exported name directly or prefer `import * as ...` instead."
});

const getImportedName = (node: TSESTree.ImportSpecifier["imported"]): string | undefined => {
  if (node.type === AST_NODE_TYPES.Identifier) {
    return node.name;
  }
  if (node.type === AST_NODE_TYPES.Literal && typeof node.value === "string") {
    return node.value;
  }
  return undefined;
};

export const noImportRenameRule = createRule({
  name: "no-import-rename",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow renamed named imports."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    ImportSpecifier: (node) => {
      const importedName = getImportedName(node.imported);
      if (importedName === undefined || importedName === node.local.name) {
        return;
      }

      context.report({
        node,
        messageId: "forbiddenImportRename",
        data: {
          importedName,
          localName: node.local.name
        }
      });
    }
  })
});
