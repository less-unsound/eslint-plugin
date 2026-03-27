import { ruleTester } from "../test/rule-tester.js";
import { noVoidOperatorRule } from "./no-void-operator.js";

ruleTester.run("no-void-operator", noVoidOperatorRule, {
  valid: [
    {
      code: "const value = foo;"
    }
  ],
  invalid: [
    {
      code: "void foo();",
      errors: [
        {
          messageId: "forbiddenVoidOperator"
        }
      ]
    },
    {
      code: "const value = void foo();",
      errors: [
        {
          messageId: "forbiddenVoidOperator"
        }
      ]
    }
  ]
});
