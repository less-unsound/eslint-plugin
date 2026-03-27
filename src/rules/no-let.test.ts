import { ruleTester } from "../test/rule-tester.js";
import { noLetRule } from "./no-let.js";

ruleTester.run("no-let", noLetRule, {
  valid: [
    {
      code: "const value = 1;"
    },
    {
      code: "for (let index = 0; index < 1; index += 1) { console.log(index); }"
    }
  ],
  invalid: [
    {
      code: "let value = 1;",
      errors: [
        {
          messageId: "forbiddenLet"
        }
      ]
    }
  ]
});
