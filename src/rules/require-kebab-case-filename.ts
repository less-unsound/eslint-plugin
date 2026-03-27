import type { TSESLint, TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";
import { isKebabCase } from "../utils/string-case.js";

const messageIds = Object.freeze({
  nonKebabCaseFilename:
    "Filenames must be in kebab-case. `{{filename}}` is not allowed."
});

const getFilename = (
  context: Readonly<
    TSESLint.RuleContext<"nonKebabCaseFilename", readonly []>
  >
): string => context.filename;

const getBaseFilename = (filename: string): string => {
  const parts = filename.split(/[/\\]/);
  return parts.at(-1) ?? filename;
};

const isLintVirtualFilename = (filename: string): boolean =>
  filename.startsWith("<") && filename.endsWith(">");

export const requireKebabCaseFilenameRule = createRule({
  name: "require-kebab-case-filename",
  meta: {
    type: "problem",
    docs: {
      description: "Require filenames to be in kebab-case."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    Program: (node: TSESTree.Program) => {
      const filename = getFilename(context);
      if (isLintVirtualFilename(filename)) {
        return;
      }
      const baseFilename = getBaseFilename(filename);
      if (isKebabCase(baseFilename)) {
        return;
      }
      context.report({
        node,
        messageId: "nonKebabCaseFilename",
        data: {
          filename: baseFilename
        }
      });
    }
  })
});
