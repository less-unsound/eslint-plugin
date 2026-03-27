import { ruleTester } from "../test/rule-tester.js";
import { noSwitchRule } from "./no-switch.js";

ruleTester.run("no-switch", noSwitchRule, {
  valid: [
    {
      code: "if (value === 1) { return 1; } return 2;"
    }
  ],
  invalid: [
    {
      code: "switch (value) { case 1: return 1; default: return 2; }",
      errors: [
        {
          messageId: "forbiddenSwitch"
        }
      ]
    }
  ]
});
