import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const forbiddenNames = new Set<string>(["prototype", "__proto__"]);

const messageIds = Object.freeze({
  forbiddenPrototypeAccess:
    "Runtime use of `prototype` and `__proto__` is not allowed."
});

const getStaticPropertyName = (
  node: TSESTree.Node,
  isComputed: boolean
): string | undefined => {
  if (node.type === AST_NODE_TYPES.Identifier) {
    return isComputed ? undefined : node.name;
  }
  if (node.type === AST_NODE_TYPES.Literal) {
    return typeof node.value === "string" ? node.value : undefined;
  }
  if (
    node.type === AST_NODE_TYPES.TemplateLiteral &&
    node.expressions.length === 0
  ) {
    return node.quasis[0]?.value.cooked ?? node.quasis[0]?.value.raw;
  }
  return undefined;
};

export const noPrototypeAccessRule = createRule({
  name: "no-prototype-access",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow runtime access to `prototype` and `__proto__`."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    MemberExpression: (node) => {
      const name = getStaticPropertyName(node.property, node.computed);
      if (name === undefined || !forbiddenNames.has(name)) {
        return;
      }
      context.report({
        node: node.property,
        messageId: "forbiddenPrototypeAccess"
      });
    },
    MethodDefinition: (node) => {
      const name = getStaticPropertyName(node.key, node.computed);
      if (name === undefined || !forbiddenNames.has(name)) {
        return;
      }
      context.report({
        node: node.key,
        messageId: "forbiddenPrototypeAccess"
      });
    },
    Property: (node) => {
      if (node.parent.type !== AST_NODE_TYPES.ObjectExpression) {
        return;
      }
      const name = getStaticPropertyName(node.key, node.computed);
      if (name === undefined || !forbiddenNames.has(name)) {
        return;
      }
      context.report({
        node: node.key,
        messageId: "forbiddenPrototypeAccess"
      });
    },
    PropertyDefinition: (node) => {
      const name = getStaticPropertyName(node.key, node.computed);
      if (name === undefined || !forbiddenNames.has(name)) {
        return;
      }
      context.report({
        node: node.key,
        messageId: "forbiddenPrototypeAccess"
      });
    }
  })
});
