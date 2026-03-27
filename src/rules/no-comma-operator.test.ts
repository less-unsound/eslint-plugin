import { ruleTester } from "../test/rule-tester.js";
import { noCommaOperatorRule } from "./no-comma-operator.js";

ruleTester.run("no-comma-operator", noCommaOperatorRule, {
  valid: [
    {
      code: "const value = bar;"
    },
    {
      code: "const values = [foo, bar];"
    },
    {
      code: "call(foo, bar);"
    }
  ],
  invalid: [
    {
      code: "const value = (foo, bar);",
      errors: [
        {
          messageId: "forbiddenCommaOperator"
        }
      ]
    },
    {
      code: "const value = (readFoo(), readBar());",
      errors: [
        {
          messageId: "forbiddenCommaOperator"
        }
      ]
    },
    {
      code: "for (; keepGoing(); stepFoo(), stepBar()) { run(); }",
      errors: [
        {
          messageId: "forbiddenCommaOperator"
        }
      ]
    }
  ]
});
