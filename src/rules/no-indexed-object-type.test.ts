import { ruleTester } from "../test/rule-tester.js";
import { noIndexedObjectTypeRule } from "./no-indexed-object-type.js";

ruleTester.run("no-indexed-object-type", noIndexedObjectTypeRule, {
  valid: [
    {
      code: "type Json = null | string | { [key: string]: Json };"
    },
    {
      code: "interface Json { [key: string]: Json }"
    }
  ],
  invalid: [
    {
      code: "type Value = { [key: string]: number };",
      errors: [
        {
          messageId: "forbiddenIndexedObjectType"
        }
      ]
    },
    {
      code: "interface Value { [key: string]: number }",
      errors: [
        {
          messageId: "forbiddenIndexedObjectType"
        }
      ]
    }
  ]
});
