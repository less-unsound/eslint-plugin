import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const utilityNames = new Set<string>([
  "Awaited",
  "Capitalize",
  "ConstructorParameters",
  "Exclude",
  "Extract",
  "InstanceType",
  "Lowercase",
  "NonNullable",
  "Omit",
  "OmitThisParameter",
  "Partial",
  "Parameters",
  "Pick",
  "Readonly",
  "Record",
  "Required",
  "ReturnType",
  "ThisParameterType",
  "ThisType",
  "Uncapitalize",
  "Uppercase"
]);

const messageIds = Object.freeze({
  forbiddenUtilityType:
    "Built-in TypeScript utility types are not allowed."
});

export const noUtilityTypeRule = createRule({
  name: "no-utility-type",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow built-in TypeScript utility types."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    TSTypeReference: (node) => {
      if (node.typeName.type !== AST_NODE_TYPES.Identifier) {
        return;
      }
      if (!utilityNames.has(node.typeName.name)) {
        return;
      }
      context.report({
        node,
        messageId: "forbiddenUtilityType"
      });
    }
  })
});
