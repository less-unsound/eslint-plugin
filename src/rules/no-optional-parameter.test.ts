import { ruleTester } from "../test/rule-tester.js";
import { noOptionalParameterRule } from "./no-optional-parameter.js";

ruleTester.run("no-optional-parameter", noOptionalParameterRule, {
  valid: [
    {
      code: "function value(value: number) { return value; }"
    },
    {
      code: "const value = (value: number) => value;"
    },
    {
      code: "class Value { constructor(value: number) {} }"
    },
    {
      code: "class Value { constructor(private value: number) {} }"
    },
    {
      code: "interface Value { value(value: number): void; }"
    },
    {
      code: "type Value = (value: number) => number;"
    }
  ],
  invalid: [
    {
      code: "function value(value?: number) { return value; }",
      errors: [
        {
          messageId: "forbiddenOptionalParameter"
        }
      ]
    },
    {
      code: "const value = (value?: number) => value;",
      errors: [
        {
          messageId: "forbiddenOptionalParameter"
        }
      ]
    },
    {
      code: "class Value { constructor(value?: number) {} }",
      errors: [
        {
          messageId: "forbiddenOptionalParameter"
        }
      ]
    },
    {
      code: "class Value { constructor(private value?: number) {} }",
      errors: [
        {
          messageId: "forbiddenOptionalParameter"
        }
      ]
    },
    {
      code: "interface Value { value(value?: number): void; }",
      errors: [
        {
          messageId: "forbiddenOptionalParameter"
        }
      ]
    },
    {
      code: "type Value = (value?: number) => number;",
      errors: [
        {
          messageId: "forbiddenOptionalParameter"
        }
      ]
    }
  ]
});
