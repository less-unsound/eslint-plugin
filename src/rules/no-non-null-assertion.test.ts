import { ruleTester } from "../test/rule-tester.js";
import { noNonNullAssertionRule } from "./no-non-null-assertion.js";

ruleTester.run("no-non-null-assertion", noNonNullAssertionRule, {
  valid: [
    {
      code: "const value = foo;"
    }
  ],
  invalid: [
    {
      code: "const value = foo!;",
      errors: [
        {
          messageId: "forbiddenNonNullAssertion"
        }
      ]
    }
  ]
});
