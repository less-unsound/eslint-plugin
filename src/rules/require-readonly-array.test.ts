import { ruleTester } from "../test/rule-tester.js";
import { requireReadonlyArrayRule } from "./require-readonly-array.js";

ruleTester.run("require-readonly-array", requireReadonlyArrayRule, {
  valid: [
    {
      code: "type Value = readonly string[];"
    }
  ],
  invalid: [
    {
      code: "type Value = string[];",
      errors: [
        {
          messageId: "missingReadonlyArray"
        }
      ],
      output: "type Value = readonly string[];"
    },
    {
      code: "type Value = Array<string>;",
      errors: [
        {
          messageId: "missingReadonlyArray"
        }
      ]
    },
    {
      code: "type Value = ReadonlyArray<string>;",
      errors: [
        {
          messageId: "missingReadonlyArray"
        }
      ]
    }
  ]
});
