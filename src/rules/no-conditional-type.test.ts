import { ruleTester } from "../test/rule-tester.js";
import { noConditionalTypeRule } from "./no-conditional-type.js";

ruleTester.run("no-conditional-type", noConditionalTypeRule, {
  valid: [
    {
      code: "type Value = string | number;"
    }
  ],
  invalid: [
    {
      code: "type Value<T> = T extends string ? 1 : 2;",
      errors: [
        {
          messageId: "forbiddenConditionalType"
        }
      ]
    }
  ]
});
