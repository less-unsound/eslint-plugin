import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const defaultTagName = "$";

const messageIds = Object.freeze({
  useConstructor:
    "Do not create tagged objects by supplying `{{tagName}}` directly. Use `{{constructorName}}()` instead.",
  useConstructorGeneric:
    "Do not create tagged objects by supplying `{{tagName}}` directly. Use a constructor instead."
});

const getPropertyName = (node: TSESTree.PropertyName): string | undefined => {
  if (node.type === AST_NODE_TYPES.Identifier) {
    return node.name;
  }
  if (node.type !== AST_NODE_TYPES.Literal) {
    return undefined;
  }
  return typeof node.value === "string" ? node.value : undefined;
};

const buildConstructorName = (tagValue: string): string | undefined => {
  const parts = tagValue.match(/[A-Za-z0-9]+/g);
  if (parts === null || parts.length === 0) {
    return undefined;
  }

  const name = parts
    .map((part) => part[0] === undefined
      ? ""
      : part[0].toUpperCase() + part.slice(1))
    .join("");

  return /^[A-Z][A-Za-z0-9]*$/u.test(name) ? name : undefined;
};

const getTaggedProperty = (
  node: TSESTree.ObjectExpression,
  tagName: string
): TSESTree.Property | undefined =>
  node.properties.find((property): property is TSESTree.Property =>
    property.type === AST_NODE_TYPES.Property &&
    property.kind === "init" &&
    property.computed === false &&
    getPropertyName(property.key) === tagName,
  );

export const noInlineTaggedObjectRule = createRule({
  name: "no-inline-tagged-object",
  meta: {
    type: "problem",
    docs: {
      description:
        "Ban creating tagged objects by supplying the configured tag field directly."
    },
    schema: [
      {
        type: "object",
        properties: {
          tagName: {
            type: "string"
          }
        },
        additionalProperties: false
      }
    ],
    messages: messageIds
  },
  defaultOptions: [{ tagName: defaultTagName }],
  create: (context, [{ tagName }]) => ({
    ObjectExpression: (node) => {
      const property = getTaggedProperty(node, tagName);
      if (property === undefined) {
        return;
      }
      if (
        property.value.type !== AST_NODE_TYPES.Literal ||
        typeof property.value.value !== "string"
      ) {
        context.report({
          node: property,
          messageId: "useConstructorGeneric",
          data: {
            tagName
          }
        });
        return;
      }

      const constructorName = buildConstructorName(property.value.value);
      if (constructorName === undefined) {
        context.report({
          node: property,
          messageId: "useConstructorGeneric",
          data: {
            tagName
          }
        });
        return;
      }

      context.report({
        node: property,
        messageId: "useConstructor",
        data: {
          constructorName,
          tagName
        }
      });
    }
  })
});
