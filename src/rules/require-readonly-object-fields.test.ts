import { ruleTester } from "../test/rule-tester.js";
import { requireReadonlyObjectFieldsRule } from "./require-readonly-object-fields.js";

ruleTester.run("require-readonly-object-fields", requireReadonlyObjectFieldsRule, {
  valid: [
    {
      code: "type Value = { readonly name: string };"
    },
    {
      code: "interface Value { readonly name: string; }"
    }
  ],
  invalid: [
    {
      code: "type Value = { name: string };",
      errors: [
        {
          messageId: "missingReadonlyObjectField"
        }
      ],
      output: "type Value = { readonly name: string };"
    },
    {
      code: "interface Value { name: string; }",
      errors: [
        {
          messageId: "missingReadonlyObjectField"
        }
      ],
      output: "interface Value { readonly name: string; }"
    },
    {
      code: "type Value = { kind: \"a\"; readonly name: string } | { readonly kind: \"b\"; readonly name: string };",
      errors: [
        {
          messageId: "missingReadonlyObjectField"
        }
      ],
      output: "type Value = { readonly kind: \"a\"; readonly name: string } | { readonly kind: \"b\"; readonly name: string };"
    }
  ]
});
