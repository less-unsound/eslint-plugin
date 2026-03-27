import { ruleTester } from "../test/rule-tester.js";
import { noEnumRule } from "./no-enum.js";

ruleTester.run("no-enum", noEnumRule, {
  valid: [
    {
      code: "const value = 1;"
    }
  ],
  invalid: [
    {
      code: "enum Value { A }",
      errors: [
        {
          messageId: "forbiddenEnum"
        }
      ]
    },
    {
      code: "const enum Value { A }",
      errors: [
        {
          messageId: "forbiddenEnum"
        }
      ]
    }
  ]
});
