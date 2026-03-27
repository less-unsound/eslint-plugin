import { ruleTester } from "../test/rule-tester.js";
import { noBroadTypesRule } from "./no-broad-types.js";

ruleTester.run("no-broad-types", noBroadTypesRule, {
  valid: [
    {
      code: "type Value = { readonly name: string };"
    }
  ],
  invalid: [
    {
      code: "type Value = object;",
      errors: [
        {
          messageId: "forbiddenBroadType"
        }
      ]
    },
    {
      code: "type Value = Object;",
      errors: [
        {
          messageId: "forbiddenBroadType"
        }
      ]
    },
    {
      code: "type Value = Function;",
      errors: [
        {
          messageId: "forbiddenBroadType"
        }
      ]
    },
    {
      code: "type Value = {};",
      errors: [
        {
          messageId: "forbiddenBroadType"
        }
      ]
    }
  ]
});
