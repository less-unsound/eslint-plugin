import { ruleTester } from "../test/rule-tester.js";
import { noTypeofOperatorRule } from "./no-typeof-operator.js";

ruleTester.run("no-typeof-operator", noTypeofOperatorRule, {
  valid: [
    {
      code: "const value = foo;"
    },
    {
      code: "type Value = string;"
    }
  ],
  invalid: [
    {
      code: "const kind = typeof foo;",
      errors: [
        {
          messageId: "forbiddenTypeofOperator"
        }
      ]
    }
  ]
});
