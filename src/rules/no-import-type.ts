import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenImportType:
    "`import()` types are not allowed. Put type imports in the file header instead."
});

export const noImportTypeRule = createRule({
  name: "no-import-type",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow `import()` types."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSImportType: (node) => {
      context.report({
        node,
        messageId: "forbiddenImportType"
      });
    }
  })
});
