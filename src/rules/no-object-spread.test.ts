import { ruleTester } from "../test/rule-tester.js";
import { noObjectSpreadRule } from "./no-object-spread.js";

ruleTester.run("no-object-spread", noObjectSpreadRule, {
  valid: [
    {
      code: "[...values];"
    },
    {
      code: "values.map((value) => value);"
    },
    {
      code: "const value = { a: 1, b: 2 };"
    }
  ],
  invalid: [
    {
      code: "const value = { ...values };",
      errors: [
        {
          messageId: "forbiddenObjectSpread"
        }
      ]
    },
    {
      code: "const value = { a: 1, ...values, b: 2 };",
      errors: [
        {
          messageId: "forbiddenObjectSpread"
        }
      ]
    },
    {
      code: "const value = { nested: { ...values } };",
      errors: [
        {
          messageId: "forbiddenObjectSpread"
        }
      ]
    }
  ]
});
