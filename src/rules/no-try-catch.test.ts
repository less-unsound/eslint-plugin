import { ruleTester } from "../test/rule-tester.js";
import { noTryCatchRule } from "./no-try-catch.js";

ruleTester.run("no-try-catch", noTryCatchRule, {
  valid: [
    {
      code: "const value = handleFooError(() => read(), error => recover(error));"
    },
    {
      code: "try { work(); } finally { cleanUp(); }"
    }
  ],
  invalid: [
    {
      code: "try { return read(); } catch (error) { return recover(error); }",
      errors: [
        {
          messageId: "forbiddenTryCatch"
        }
      ]
    }
  ]
});
