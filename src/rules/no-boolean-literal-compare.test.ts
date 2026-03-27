import { ruleTester } from "../test/rule-tester.js";
import { noBooleanLiteralCompareRule } from "./no-boolean-literal-compare.js";

ruleTester.run("no-boolean-literal-compare", noBooleanLiteralCompareRule, {
  valid: [
    {
      code: "if (isReady) { run(); }"
    },
    {
      code: "if (!isReady) { run(); }"
    },
    {
      code: "const same = isReady === isVisible;"
    },
    {
      code: "const value = count === 1;"
    }
  ],
  invalid: [
    {
      code: "const value = isReady === true;",
      errors: [
        {
          messageId: "forbiddenBooleanLiteralCompare"
        }
      ]
    },
    {
      code: "const value = isReady === false;",
      errors: [
        {
          messageId: "forbiddenBooleanLiteralCompare"
        }
      ]
    },
    {
      code: "const value = true === isReady;",
      errors: [
        {
          messageId: "forbiddenBooleanLiteralCompare"
        }
      ]
    },
    {
      code: "const value = isReady !== false;",
      errors: [
        {
          messageId: "forbiddenBooleanLiteralCompare"
        }
      ]
    },
    {
      code: "const value = isReady == true;",
      errors: [
        {
          messageId: "forbiddenBooleanLiteralCompare"
        }
      ]
    },
    {
      code: "const value = false != isReady;",
      errors: [
        {
          messageId: "forbiddenBooleanLiteralCompare"
        }
      ]
    }
  ]
});
