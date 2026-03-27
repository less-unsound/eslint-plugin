import { createRule } from "../utils/create-rule.js";
import { findNearestPackageJsonPath } from "../utils/package-entrypoint.js";
import { isExplicitPackageEntrypoint } from "../utils/package-entrypoint.js";

const messageIds = Object.freeze({
  forbiddenReexportOutsideEntrypoint:
    "Reexports are only allowed in files explicitly mentioned in package.json as entrypoints."
});

export const noReexportOutsideEntrypointRule = createRule({
  name: "no-reexport-outside-entrypoint",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow reexports outside files explicitly mentioned in package.json as entrypoints."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => {
    const packageJsonPath = findNearestPackageJsonPath(context.physicalFilename);
    const isRuleEnabledForFile = packageJsonPath !== undefined;
    const isEntrypoint = isRuleEnabledForFile && isExplicitPackageEntrypoint(context.physicalFilename);

    return {
      ExportAllDeclaration: (node) => {
        if (!isRuleEnabledForFile || isEntrypoint) {
          return;
        }
        context.report({
          node,
          messageId: "forbiddenReexportOutsideEntrypoint"
        });
      },
      ExportNamedDeclaration: (node) => {
        if (node.source === null || !isRuleEnabledForFile || isEntrypoint) {
          return;
        }
        context.report({
          node,
          messageId: "forbiddenReexportOutsideEntrypoint"
        });
      }
    };
  }
});
