import { ruleTester } from "../test/rule-tester.js";
import { noOptionalPropertyRule } from "./no-optional-property.js";

ruleTester.run("no-optional-property", noOptionalPropertyRule, {
  valid: [
    {
      code: "type Value = { name: string };"
    },
    {
      code: "interface Value { name: string; }"
    }
  ],
  invalid: [
    {
      code: "type Value = { name?: string };",
      errors: [
        {
          messageId: "forbiddenOptionalProperty"
        }
      ]
    },
    {
      code: "interface Value { name?: string; }",
      errors: [
        {
          messageId: "forbiddenOptionalProperty"
        }
      ]
    }
  ]
});
