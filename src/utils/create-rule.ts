import { ESLintUtils } from "@typescript-eslint/utils";

const buildRuleUrl = (name: string): string =>
  "docs/rules/" + name + ".md";

export const createRule = ESLintUtils.RuleCreator(buildRuleUrl);
