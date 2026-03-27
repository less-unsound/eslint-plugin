import { ruleTester } from "../test/rule-tester.js";
import { noIntersectionTypeRule } from "./no-intersection-type.js";

ruleTester.run("no-intersection-type", noIntersectionTypeRule, {
  valid: [
    {
      code: "type Value = A | B;"
    }
  ],
  invalid: [
    {
      code: "type Value = A & B;",
      errors: [
        {
          messageId: "forbiddenIntersectionType"
        }
      ]
    }
  ]
});
