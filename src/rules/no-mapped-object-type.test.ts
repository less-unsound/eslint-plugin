import { ruleTester } from "../test/rule-tester.js";
import { noMappedObjectTypeRule } from "./no-mapped-object-type.js";

ruleTester.run("no-mapped-object-type", noMappedObjectTypeRule, {
  valid: [
    {
      code: "type Value = Record<string, number>;"
    }
  ],
  invalid: [
    {
      code: "type Value<T> = { [K in keyof T]: T[K] };",
      errors: [
        {
          messageId: "forbiddenMappedObjectType"
        }
      ]
    }
  ]
});
