import { ruleTester } from "../test/rule-tester.js";
import { noForLetRule } from "./no-for-let.js";

ruleTester.run("no-for-let", noForLetRule, {
  valid: [
    {
      code: "const value = 1;"
    },
    {
      code: "for (const value of values) { console.log(value); }"
    }
  ],
  invalid: [
    {
      code: "for (let index = 0; index < 1; index += 1) { console.log(index); }",
      errors: [
        {
          messageId: "forbiddenForLet"
        }
      ]
    },
    {
      code: "for (let value of values) { console.log(value); }",
      errors: [
        {
          messageId: "forbiddenForLet"
        }
      ]
    }
  ]
});
