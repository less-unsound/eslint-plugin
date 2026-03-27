import { ruleTester } from "../test/rule-tester.js";
import { noInOperatorRule } from "./no-in-operator.js";

ruleTester.run("no-in-operator", noInOperatorRule, {
  valid: [
    {
      code: "const value = foo === undefined;"
    }
  ],
  invalid: [
    {
      code: "const value = \"name\" in foo;",
      errors: [
        {
          messageId: "forbiddenInOperator"
        }
      ]
    }
  ]
});
