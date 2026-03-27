import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenAsTypeAssertion: "`as` type assertions are not allowed except `as const`."
});

const isConstAssertion = (node: {
  readonly typeAnnotation: {
    readonly type: string;
    readonly typeName?: {
      readonly type: string;
      readonly name?: string;
    };
  };
}): boolean => {
  if (node.typeAnnotation.type !== AST_NODE_TYPES.TSTypeReference) {
    return false;
  }
  const typeName = node.typeAnnotation.typeName;
  if (typeName === undefined) {
    return false;
  }
  if (typeName.type !== AST_NODE_TYPES.Identifier) {
    return false;
  }
  return typeName.name === "const";
};

export const noAsTypeAssertionRule = createRule({
  name: "no-as-type-assertion",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow `as` type assertions except `as const`."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSAsExpression: (node) => {
      if (isConstAssertion(node)) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenAsTypeAssertion"
      });
    }
  })
});
