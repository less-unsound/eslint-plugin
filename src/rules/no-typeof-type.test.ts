import { ruleTester } from "../test/rule-tester.js";
import { noTypeofTypeRule } from "./no-typeof-type.js";

ruleTester.run("no-typeof-type", noTypeofTypeRule, {
  valid: [
    {
      code: "const kind = foo;"
    },
    {
      code: "type Value = string;"
    }
  ],
  invalid: [
    {
      code: "type Value = typeof foo;",
      errors: [
        {
          messageId: "forbiddenTypeofType"
        }
      ]
    }
  ]
});
