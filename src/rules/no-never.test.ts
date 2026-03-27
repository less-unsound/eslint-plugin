import { ruleTester } from "../test/rule-tester.js";
import { noNeverRule } from "./no-never.js";

ruleTester.run("no-never", noNeverRule, {
  valid: [
    {
      code: "type Value = string;"
    },
    {
      code: "function value(): string { return \"x\"; }"
    }
  ],
  invalid: [
    {
      code: "type Value = never;",
      errors: [
        {
          messageId: "forbiddenNever"
        }
      ]
    },
    {
      code: "function fail(): never { throw new Error(); }",
      errors: [
        {
          messageId: "forbiddenNever"
        }
      ]
    }
  ]
});
