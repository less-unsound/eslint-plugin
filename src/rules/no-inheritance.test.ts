import { ruleTester } from "../test/rule-tester.js";
import { noInheritanceRule } from "./no-inheritance.js";

ruleTester.run("no-inheritance", noInheritanceRule, {
  valid: [
    {
      code: "interface Foo {}"
    },
    {
      code: "class Foo {}"
    },
    {
      code: "interface Foo extends A<Foo> {}"
    }
  ],
  invalid: [
    {
      code: "class Foo extends Bar {}",
      errors: [
        {
          messageId: "forbiddenInheritance"
        }
      ]
    },
    {
      code: "interface Foo extends Bar {}",
      errors: [
        {
          messageId: "forbiddenInheritance"
        }
      ]
    }
  ]
});
