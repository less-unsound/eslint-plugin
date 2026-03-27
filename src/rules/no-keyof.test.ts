import { ruleTester } from "../test/rule-tester.js";
import { noKeyofRule } from "./no-keyof.js";

ruleTester.run("no-keyof", noKeyofRule, {
  valid: [
    {
      code: "type Value = string;"
    }
  ],
  invalid: [
    {
      code: "type Keys = keyof Foo;",
      errors: [
        {
          messageId: "forbiddenKeyof"
        }
      ]
    },
    {
      code: "type Mapped<T> = { [K in keyof T]: K };",
      errors: [
        {
          messageId: "forbiddenKeyof"
        }
      ]
    }
  ]
});
