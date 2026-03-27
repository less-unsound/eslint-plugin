import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenDefaultParameter: "Default parameters are not allowed."
});

export const noDefaultParameterRule = createRule({
  name: "no-default-parameter",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow default parameters."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => {
    const reportDefaultParameters = (node: TSESTree.Node): void => {
      if (node.type === AST_NODE_TYPES.AssignmentPattern) {
        context.report({
          node,
          messageId: "forbiddenDefaultParameter"
        });
        reportDefaultParameters(node.left);
        return;
      }
      if (node.type === AST_NODE_TYPES.TSParameterProperty) {
        reportDefaultParameters(node.parameter);
        return;
      }
      if (node.type === AST_NODE_TYPES.ArrayPattern) {
        for (const element of node.elements) {
          if (element === null) {
            continue;
          }
          reportDefaultParameters(element);
        }
        return;
      }
      if (node.type === AST_NODE_TYPES.ObjectPattern) {
        for (const property of node.properties) {
          if (property.type === AST_NODE_TYPES.RestElement) {
            reportDefaultParameters(property.argument);
            continue;
          }
          reportDefaultParameters(property.value);
        }
      }
    };

    return {
      ArrowFunctionExpression: (node) => {
        for (const param of node.params) {
          reportDefaultParameters(param);
        }
      },
      FunctionDeclaration: (node) => {
        for (const param of node.params) {
          reportDefaultParameters(param);
        }
      },
      FunctionExpression: (node) => {
        for (const param of node.params) {
          reportDefaultParameters(param);
        }
      }
    };
  }
});
