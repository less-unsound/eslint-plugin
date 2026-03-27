import { ruleTester } from "../test/rule-tester.js";
import { requireReadonlyCollectionsRule } from "./require-readonly-collections.js";

ruleTester.run("require-readonly-collections", requireReadonlyCollectionsRule, {
  valid: [
    {
      code: "type Value = ReadonlySet<string>;"
    },
    {
      code: "type Value = ReadonlyMap<string, number>;"
    }
  ],
  invalid: [
    {
      code: "type Value = Set<string>;",
      errors: [
        {
          messageId: "missingReadonlyCollections"
        }
      ]
    },
    {
      code: "type Value = Map<string, number>;",
      errors: [
        {
          messageId: "missingReadonlyCollections"
        }
      ]
    }
  ]
});
