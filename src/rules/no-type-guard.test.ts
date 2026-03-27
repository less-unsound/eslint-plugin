import { ruleTester } from "../test/rule-tester.js";
import { noTypeGuardRule } from "./no-type-guard.js";

ruleTester.run("no-type-guard", noTypeGuardRule, {
  valid: [
    {
      code: "const isFoo = (value: string): boolean => value.length > 0;"
    }
  ],
  invalid: [
    {
      code: "const isFoo = (value: string): value is Foo => true;",
      errors: [
        {
          messageId: "forbiddenTypeGuard"
        }
      ]
    }
  ]
});
