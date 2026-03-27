import { ruleTester } from "../test/rule-tester.js";
import { noUnknownRule } from "./no-unknown.js";

ruleTester.run("no-unknown", noUnknownRule, {
  valid: [
    {
      code: "type Value = string;"
    }
  ],
  invalid: [
    {
      code: "type Value = unknown;",
      errors: [
        {
          messageId: "forbiddenUnknown"
        }
      ]
    }
  ]
});
