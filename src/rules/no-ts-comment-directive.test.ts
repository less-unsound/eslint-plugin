import { ruleTester } from "../test/rule-tester.js";
import { noTsCommentDirectiveRule } from "./no-ts-comment-directive.js";

ruleTester.run("no-ts-comment-directive", noTsCommentDirectiveRule, {
  valid: [
    {
      code: "// regular comment\nconst value = 1;"
    }
  ],
  invalid: [
    {
      code: "// @ts-ignore\nconst value = foo;",
      errors: [
        {
          messageId: "forbiddenTsCommentDirective"
        }
      ]
    },
    {
      code: "// @ts-expect-error\nconst value = foo;",
      errors: [
        {
          messageId: "forbiddenTsCommentDirective"
        }
      ]
    }
  ]
});
