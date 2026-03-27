import { ruleTester } from "../test/rule-tester.js";
import { noNullRule } from "./no-null.js";

ruleTester.run("no-null", noNullRule, {
  valid: [
    {
      code: "const value = 0;"
    },
    {
      code: "type Value = string;"
    }
  ],
  invalid: [
    {
      code: "const value = null;",
      errors: [
        {
          messageId: "forbiddenNull"
        }
      ]
    },
    {
      code: "type Value = null;",
      errors: [
        {
          messageId: "forbiddenNull"
        }
      ]
    },
    {
      code: "type Value = string | null;",
      errors: [
        {
          messageId: "forbiddenNull"
        }
      ]
    }
  ]
});
