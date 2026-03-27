import { ruleTester } from "../test/rule-tester.js";
import { noWhileRule } from "./no-while.js";

ruleTester.run("no-while", noWhileRule, {
  valid: [
    {
      code: "for (const value of values) { console.log(value); }"
    }
  ],
  invalid: [
    {
      code: "while (value < 1) { value += 1; }",
      errors: [
        {
          messageId: "forbiddenWhile"
        }
      ]
    },
    {
      code: "do { value += 1; } while (value < 1);",
      errors: [
        {
          messageId: "forbiddenWhile"
        }
      ]
    }
  ]
});
