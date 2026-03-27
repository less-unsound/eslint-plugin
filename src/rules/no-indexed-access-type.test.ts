import { ruleTester } from "../test/rule-tester.js";
import { noIndexedAccessTypeRule } from "./no-indexed-access-type.js";

ruleTester.run("no-indexed-access-type", noIndexedAccessTypeRule, {
  valid: [
    {
      code: "type Name = string;"
    },
    {
      code: [
        "type User = {",
        "  readonly name: string;",
        "};",
        "type Alias = User;"
      ].join("\n")
    }
  ],
  invalid: [
    {
      code: "type Name = User[\"name\"];",
      errors: [
        {
          messageId: "forbiddenIndexedAccessType"
        }
      ]
    },
    {
      code: "type Value = Record<string, string>[string];",
      errors: [
        {
          messageId: "forbiddenIndexedAccessType"
        }
      ]
    }
  ]
});
