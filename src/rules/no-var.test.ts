import { ruleTester } from "../test/rule-tester.js";
import { noVarRule } from "./no-var.js";

ruleTester.run("no-var", noVarRule, {
  valid: [
    {
      code: "const value = 1;"
    }
  ],
  invalid: [
    {
      code: "var value = 1;",
      errors: [
        {
          messageId: "forbiddenVar"
        }
      ]
    }
  ]
});
