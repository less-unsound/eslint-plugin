import { ruleTester } from "../test/rule-tester.js";
import { requireBooleanPrefixRule } from "./require-boolean-prefix.js";

ruleTester.run("require-boolean-prefix", requireBooleanPrefixRule, {
  valid: [
    {
      code: "const isReady: boolean = true;"
    },
    {
      code: "const shouldRetry = left === right;"
    },
    {
      code: "type Value = { hasItems: boolean; }"
    },
    {
      code: "interface Value { matchesSchema: boolean; }"
    },
    {
      code: "const value = { containsErrors: true };"
    },
    {
      code: "class Value { exists: boolean = false; }"
    }
  ],
  invalid: [
    {
      code: "const ready: boolean = true;",
      errors: [
        {
          messageId: "missingBooleanPrefix"
        }
      ]
    },
    {
      code: "const retry = left === right;",
      errors: [
        {
          messageId: "missingBooleanPrefix"
        }
      ]
    },
    {
      code: "type Value = { ready: boolean; }",
      errors: [
        {
          messageId: "missingBooleanPrefix"
        }
      ]
    },
    {
      code: "interface Value { valid: boolean; }",
      errors: [
        {
          messageId: "missingBooleanPrefix"
        }
      ]
    },
    {
      code: "const value = { enabled: true };",
      errors: [
        {
          messageId: "missingBooleanPrefix"
        }
      ]
    },
    {
      code: "class Value { open: boolean = false; }",
      errors: [
        {
          messageId: "missingBooleanPrefix"
        }
      ]
    }
  ]
});
