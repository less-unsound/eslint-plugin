import { ruleTester } from "../test/rule-tester.js";
import { noUndefinedTypeRule } from "./no-undefined-type.js";

ruleTester.run("no-undefined-type", noUndefinedTypeRule, {
  valid: [
    {
      code: "type Value = string;"
    }
  ],
  invalid: [
    {
      code: "type Value = undefined;",
      errors: [
        {
          messageId: "forbiddenUndefinedType"
        }
      ]
    }
  ]
});
