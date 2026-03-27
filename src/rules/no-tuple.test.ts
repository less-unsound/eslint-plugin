import { ruleTester } from "../test/rule-tester.js";
import { noTupleRule } from "./no-tuple.js";

ruleTester.run("no-tuple", noTupleRule, {
  valid: [
    {
      code: "type Pair = { left: string; right: number };"
    }
  ],
  invalid: [
    {
      code: "type Pair = [string, number];",
      errors: [
        {
          messageId: "forbiddenTuple"
        }
      ]
    },
    {
      code: "type Pair = readonly [string, number];",
      errors: [
        {
          messageId: "forbiddenTuple"
        }
      ]
    }
  ]
});
