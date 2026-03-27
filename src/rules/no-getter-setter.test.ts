import { ruleTester } from "../test/rule-tester.js";
import { noGetterSetterRule } from "./no-getter-setter.js";

ruleTester.run("no-getter-setter", noGetterSetterRule, {
  valid: [
    {
      code: "const value = { foo: 1 };"
    },
    {
      code: "class Value { foo(): number { return 1; } }"
    },
    {
      code: "interface Value { foo(): number; }"
    }
  ],
  invalid: [
    {
      code: "const value = { get foo() { return 1; } };",
      errors: [
        {
          messageId: "forbiddenGetterSetter"
        }
      ]
    },
    {
      code: "const value = { set foo(value: number) {} };",
      errors: [
        {
          messageId: "forbiddenGetterSetter"
        }
      ]
    },
    {
      code: "class Value { get foo() { return 1; } }",
      errors: [
        {
          messageId: "forbiddenGetterSetter"
        }
      ]
    },
    {
      code: "class Value { set foo(value: number) {} }",
      errors: [
        {
          messageId: "forbiddenGetterSetter"
        }
      ]
    },
    {
      code: "interface Value { get foo(): number; }",
      errors: [
        {
          messageId: "forbiddenGetterSetter"
        }
      ]
    },
    {
      code: "interface Value { set foo(value: number); }",
      errors: [
        {
          messageId: "forbiddenGetterSetter"
        }
      ]
    }
  ]
});
