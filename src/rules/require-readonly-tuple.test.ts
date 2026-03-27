import { ruleTester } from "../test/rule-tester.js";
import { requireReadonlyTupleRule } from "./require-readonly-tuple.js";

ruleTester.run("require-readonly-tuple", requireReadonlyTupleRule, {
  valid: [
    {
      code: "type Value = readonly [string, number];"
    }
  ],
  invalid: [
    {
      code: "type Value = [string, number];",
      errors: [
        {
          messageId: "missingReadonlyTuple"
        }
      ],
      output: "type Value = readonly [string, number];"
    }
  ]
});
