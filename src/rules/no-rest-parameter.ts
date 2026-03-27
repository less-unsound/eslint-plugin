import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenRestParameter: "Using rest parameters is not allowed."
});

export const noRestParameterRule = createRule({
  name: "no-rest-parameter",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow rest parameters."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => {
    const reportRestParameters = (params: readonly TSESTree.Parameter[]): void => {
      for (const param of params) {
        if (param.type !== AST_NODE_TYPES.RestElement) {
          continue;
        }
        context.report({
          node: param,
          messageId: "forbiddenRestParameter"
        });
      }
    };

    return {
      ArrowFunctionExpression: (node) => reportRestParameters(node.params),
      FunctionDeclaration: (node) => reportRestParameters(node.params),
      FunctionExpression: (node) => reportRestParameters(node.params)
    };
  }
});
