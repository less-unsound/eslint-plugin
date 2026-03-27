import { ruleTester } from "../test/rule-tester.js";
import { noImportTypeRule } from "./no-import-type.js";

ruleTester.run("no-import-type", noImportTypeRule, {
  valid: [
    {
      code: 'import { type Foo } from "foo"; type Value = Foo;'
    }
  ],
  invalid: [
    {
      code: 'type Value = import("foo").Foo;',
      errors: [
        {
          messageId: "forbiddenImportType"
        }
      ]
    },
    {
      code: 'type Value = import("foo");',
      errors: [
        {
          messageId: "forbiddenImportType"
        }
      ]
    }
  ]
});
