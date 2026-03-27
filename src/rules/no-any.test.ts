import { ruleTester } from "../test/rule-tester.js";
import { noAnyRule } from "./no-any.js";

ruleTester.run("no-any", noAnyRule, {
  valid: [
    {
      code: "type Value = string;"
    }
  ],
  invalid: [
    {
      code: "type Value = any;",
      errors: [
        {
          messageId: "forbiddenAny"
        }
      ]
    }
  ]
});
