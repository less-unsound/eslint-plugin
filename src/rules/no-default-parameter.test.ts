import { ruleTester } from "../test/rule-tester.js";
import { noDefaultParameterRule } from "./no-default-parameter.js";

ruleTester.run("no-default-parameter", noDefaultParameterRule, {
  valid: [
    {
      code: "function f(x: number) {}"
    },
    {
      code: "const f = (x: number) => x;"
    },
    {
      code: "class Value { constructor(private value: number) {} }"
    },
    {
      code: "function f({ value }: { value: number }) {}"
    }
  ],
  invalid: [
    {
      code: "function f(x = 1) {}",
      errors: [
        {
          messageId: "forbiddenDefaultParameter"
        }
      ]
    },
    {
      code: "const f = (x = 1) => x;",
      errors: [
        {
          messageId: "forbiddenDefaultParameter"
        }
      ]
    },
    {
      code: "class Value { constructor(private value = 1) {} }",
      errors: [
        {
          messageId: "forbiddenDefaultParameter"
        }
      ]
    },
    {
      code: "function f({ value = 1 }: { value?: number }) {}",
      errors: [
        {
          messageId: "forbiddenDefaultParameter"
        }
      ]
    }
  ]
});
