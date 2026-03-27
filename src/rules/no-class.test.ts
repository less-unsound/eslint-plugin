import { ruleTester } from "../test/rule-tester.js";
import { noClassRule } from "./no-class.js";

ruleTester.run("no-class", noClassRule, {
  valid: [
    {
      code: "const value = 1;"
    },
    {
      code: "class Foo extends Bar {}"
    }
  ],
  invalid: [
    {
      code: "class Foo {}",
      errors: [
        {
          messageId: "forbiddenClass"
        }
      ]
    },
    {
      code: "const Foo = class {};",
      errors: [
        {
          messageId: "forbiddenClass"
        }
      ]
    }
  ]
});
