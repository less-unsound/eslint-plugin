import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  missingReadonlyObjectField: "Object type fields must be marked `readonly`."
});

export const requireReadonlyObjectFieldsRule = createRule({
  name: "require-readonly-object-fields",
  meta: {
    type: "problem",
    docs: {
      description:
        "Require `readonly` on all object type fields unless mutability is required for performance."
    },
    fixable: "code",
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSPropertySignature: (node) => {
      if (node.readonly) {
        return;
      }
      context.report({
        node,
        messageId: "missingReadonlyObjectField",
        fix: (fixer) => fixer.insertTextBefore(node, "readonly ")
      });
    }
  })
});
