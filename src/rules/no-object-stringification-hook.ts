import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const forbiddenNames = new Set<string>(["toJSON", "toString"]);

const messageIds = Object.freeze({
  forbiddenObjectStringificationHook: "Runtime `.toString` and `.toJSON` are not allowed."
});

const getPropertyName = (node: TSESTree.Node): string | undefined => {
  if (node.type === AST_NODE_TYPES.Identifier) {
    return node.name;
  }
  if (node.type === AST_NODE_TYPES.Literal && typeof node.value === "string") {
    return node.value;
  }
  if (
    node.type === AST_NODE_TYPES.TemplateLiteral &&
    node.expressions.length === 0 &&
    node.quasis.length === 1
  ) {
    return node.quasis[0]?.value.cooked ?? undefined;
  }
  return undefined;
};

type RuleContext = {
  readonly report: (descriptor: { readonly messageId: string; readonly node: TSESTree.Node }) => void;
};

const isWriteTarget = (node: TSESTree.MemberExpression): boolean => {
  const parent = node.parent;
  if (parent === null) {
    return false;
  }
  if (parent.type === AST_NODE_TYPES.AssignmentExpression) {
    return parent.left === node;
  }
  return false;
};

export const noObjectStringificationHookRule = createRule({
  name: "no-object-stringification-hook",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow runtime `toString` and `toJSON` hooks on objects and classes."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context: RuleContext) => {
    const report = (node: TSESTree.Node): void => {
      context.report({
        node,
        messageId: "forbiddenObjectStringificationHook"
      });
    };

    return {
      AssignmentExpression: (node) => {
        if (node.left.type !== AST_NODE_TYPES.MemberExpression) {
          return;
        }
        const name = getPropertyName(node.left.property);
        if (name === undefined || !forbiddenNames.has(name)) {
          return;
        }
        report(node.left.property);
      },
      MethodDefinition: (node) => {
        const name = getPropertyName(node.key);
        if (name === undefined || !forbiddenNames.has(name)) {
          return;
        }
        report(node.key);
      },
      MemberExpression: (node) => {
        if (isWriteTarget(node)) {
          return;
        }
        const name = getPropertyName(node.property);
        if (name === undefined || !forbiddenNames.has(name)) {
          return;
        }
        report(node.property);
      },
      ObjectExpression: (node) => {
        for (const property of node.properties) {
          if (property.type !== AST_NODE_TYPES.Property) {
            continue;
          }
          const name = getPropertyName(property.key);
          if (name === undefined || !forbiddenNames.has(name)) {
            continue;
          }
          report(property.key);
        }
      },
      PropertyDefinition: (node) => {
        const name = getPropertyName(node.key);
        if (name === undefined || !forbiddenNames.has(name)) {
          return;
        }
        report(node.key);
      }
    };
  }
});
