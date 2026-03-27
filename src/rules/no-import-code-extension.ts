import { AST_NODE_TYPES, type TSESLint, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

const forbiddenExtensionPattern = /(\.tsx|\.ts|\.js)$/u;

const messageIds = Object.freeze({
  forbiddenImportCodeExtension:
    "Module specifier `{{specifier}}` must not end with `{{extension}}`. Remove the extension."
});

const getSpecifier = (node: TSESTree.Expression | TSESTree.Literal): string | undefined => {
  if (node.type === AST_NODE_TYPES.Literal) {
    return typeof node.value === "string" ? node.value : undefined;
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

const getForbiddenExtension = (specifier: string): string | undefined => {
  return specifier.match(forbiddenExtensionPattern)?.[1];
};

const reportIfNeeded = (
  context: Readonly<TSESLint.RuleContext<"forbiddenImportCodeExtension", []>>,
  node: TSESTree.Node,
  source: TSESTree.Expression | TSESTree.Literal
): void => {
  const specifier = getSpecifier(source);
  if (specifier === undefined) {
    return;
  }

  const extension = getForbiddenExtension(specifier);
  if (extension === undefined) {
    return;
  }

  context.report({
    node,
    messageId: "forbiddenImportCodeExtension",
    data: {
      extension,
      specifier
    }
  });
};

export const noImportCodeExtensionRule = createRule({
  name: "no-import-code-extension",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow `.ts`, `.tsx`, and `.js` file extensions in import specifiers."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    ExportAllDeclaration: (node) => {
      reportIfNeeded(context, node.source, node.source);
    },
    ExportNamedDeclaration: (node) => {
      if (node.source === null) {
        return;
      }
      reportIfNeeded(context, node.source, node.source);
    },
    ImportDeclaration: (node) => {
      reportIfNeeded(context, node.source, node.source);
    },
    ImportExpression: (node) => {
      reportIfNeeded(context, node.source, node.source);
    }
  })
});
