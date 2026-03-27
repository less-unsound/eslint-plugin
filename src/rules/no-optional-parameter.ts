import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenOptionalParameter: "Optional parameters are not allowed."
});

const isOptionalIdentifier = (node: TSESTree.Node): node is TSESTree.Identifier =>
  node.type === AST_NODE_TYPES.Identifier && node.optional;

const reportOptionalParameters = (
  report: (node: TSESTree.Identifier) => void,
  params: readonly TSESTree.Parameter[]
): void => {
  params.forEach((param) => {
    if (!isOptionalIdentifier(param)) {
      return;
    }
    report(param);
  });
};

export const noOptionalParameterRule = createRule({
  name: "no-optional-parameter",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow optional parameters marked with `?` in functions and constructor parameter properties."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    ArrowFunctionExpression: (node) => {
      reportOptionalParameters(
        (param) => {
          context.report({
            node: param,
            messageId: "forbiddenOptionalParameter"
          });
        },
        node.params
      );
    },
    FunctionDeclaration: (node) => {
      reportOptionalParameters(
        (param) => {
          context.report({
            node: param,
            messageId: "forbiddenOptionalParameter"
          });
        },
        node.params
      );
    },
    FunctionExpression: (node) => {
      reportOptionalParameters(
        (param) => {
          context.report({
            node: param,
            messageId: "forbiddenOptionalParameter"
          });
        },
        node.params
      );
    },
    TSCallSignatureDeclaration: (node) => {
      reportOptionalParameters(
        (param) => {
          context.report({
            node: param,
            messageId: "forbiddenOptionalParameter"
          });
        },
        node.params
      );
    },
    TSConstructSignatureDeclaration: (node) => {
      reportOptionalParameters(
        (param) => {
          context.report({
            node: param,
            messageId: "forbiddenOptionalParameter"
          });
        },
        node.params
      );
    },
    TSDeclareFunction: (node) => {
      reportOptionalParameters(
        (param) => {
          context.report({
            node: param,
            messageId: "forbiddenOptionalParameter"
          });
        },
        node.params
      );
    },
    TSFunctionType: (node) => {
      reportOptionalParameters(
        (param) => {
          context.report({
            node: param,
            messageId: "forbiddenOptionalParameter"
          });
        },
        node.params
      );
    },
    TSMethodSignature: (node) => {
      reportOptionalParameters(
        (param) => {
          context.report({
            node: param,
            messageId: "forbiddenOptionalParameter"
          });
        },
        node.params
      );
    },
    TSParameterProperty: (node) => {
      if (!isOptionalIdentifier(node.parameter)) {
        return;
      }
      context.report({
        node: node.parameter,
        messageId: "forbiddenOptionalParameter"
      });
    }
  })
});
