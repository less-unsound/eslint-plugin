import { ruleTester } from "../test/rule-tester.js";
import { noForInRule } from "./no-for-in.js";

ruleTester.run("no-for-in", noForInRule, {
  valid: [
    {
      code: "for (const value of values) {}"
    }
  ],
  invalid: [
    {
      code: "for (const key in object) {}",
      errors: [
        {
          messageId: "forbiddenForIn"
        }
      ]
    }
  ]
});
