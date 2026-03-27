import { ruleTester } from "../test/rule-tester.js";
import { noArgumentsObjectRule } from "./no-arguments-object.js";

ruleTester.run("no-arguments-object", noArgumentsObjectRule, {
  valid: [
    {
      code: "function foo(arguments: number) { return arguments; }"
    },
    {
      code: "const value = { arguments: 1 };"
    },
    {
      code: "const { arguments: value } = { arguments: 1 };"
    }
  ],
  invalid: [
    {
      code: "function foo() { return arguments; }",
      errors: [
        {
          messageId: "forbiddenArgumentsObject"
        }
      ]
    },
    {
      code: "const foo = () => arguments[0];",
      errors: [
        {
          messageId: "forbiddenArgumentsObject"
        }
      ]
    }
  ]
});
