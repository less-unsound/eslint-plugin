import { createRule } from "../utils/create-rule.js";
import { isReadonlyType } from "../utils/readonly.js";

const messageIds = Object.freeze({
  missingReadonlyTuple: "Tuple types must use `readonly [...]`."
});

export const requireReadonlyTupleRule = createRule({
  name: "require-readonly-tuple",
  meta: {
    type: "problem",
    docs: {
      description:
        "Require tuple types to use `readonly [...]` unless mutability is required for performance."
    },
    fixable: "code",
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSTupleType: (node) => {
      if (isReadonlyType(node)) {
        return;
      }
      context.report({
        node,
        messageId: "missingReadonlyTuple",
        fix: (fixer) => fixer.insertTextBefore(node, "readonly ")
      });
    }
  })
});
