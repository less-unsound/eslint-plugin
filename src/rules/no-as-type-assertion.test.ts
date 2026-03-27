import { ruleTester } from "../test/rule-tester.js";
import { noAsTypeAssertionRule } from "./no-as-type-assertion.js";

ruleTester.run("no-as-type-assertion", noAsTypeAssertionRule, {
  valid: [
    {
      code: "const value = [1, 2] as const;"
    }
  ],
  invalid: [
    {
      code: "const value = input as Foo;",
      errors: [
        {
          messageId: "forbiddenAsTypeAssertion"
        }
      ]
    }
  ]
});
