import { createRule } from "../utils/create-rule.js";

const directives = Object.freeze([
  "@ts-check",
  "@ts-expect-error",
  "@ts-ignore",
  "@ts-nocheck"
]);

const messageIds = Object.freeze({
  forbiddenTsCommentDirective: "TypeScript comment directives are not allowed."
});

const hasDirective = (value: string): boolean =>
  directives.some((directive) => value.includes(directive));

export const noTsCommentDirectiveRule = createRule({
  name: "no-ts-comment-directive",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow TypeScript comment directives."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    Program: () => {
      context.sourceCode.getAllComments().forEach((comment) => {
        if (!hasDirective(comment.value)) {
          return;
        }
        context.report({
          loc: comment.loc,
          messageId: "forbiddenTsCommentDirective"
        });
      });
    }
  })
});
