import { ruleTester } from "../test/rule-tester.js";
import { requireIdentifierCaseRule } from "./require-identifier-case.js";

ruleTester.run("require-identifier-case", requireIdentifierCaseRule, {
  valid: [
    {
      code: "const fooBar = 1;"
    },
    {
      code: "const FooBar = 1;"
    },
    {
      code: "const _fooBar = 1;"
    },
    {
      code: "const $ = 0; const $x = 1; const $Ab = 2;"
    },
    {
      code: "type FooBar<T> = { fooBar: number; readonly $x: string };"
    },
    {
      code: "import { fooBar as bazQux } from 'x'; import FooBar from 'y';"
    },
    {
      code: "const { foo_bar: fooBar } = value;"
    },
    {
      code: "const [fooBar, $x] = values;"
    }
  ],
  invalid: [
    {
      code: "const foo_bar = 1;",
      errors: [
        {
          messageId: "invalidIdentifierCase"
        }
      ]
    },
    {
      code: "function do_thing(arg_value: number): void {}",
      errors: [
        {
          messageId: "invalidIdentifierCase"
        },
        {
          messageId: "invalidIdentifierCase"
        }
      ]
    },
    {
      code: "type foo_type = { foo_bar: number };",
      errors: [
        {
          messageId: "invalidIdentifierCase"
        },
        {
          messageId: "invalidIdentifierCase"
        }
      ]
    },
    {
      code: "const value = { foo_bar: 1 };",
      errors: [
        {
          messageId: "invalidIdentifierCase"
        }
      ]
    },
    {
      code: "interface foo_type { foo_bar: number; }",
      errors: [
        {
          messageId: "invalidIdentifierCase"
        },
        {
          messageId: "invalidIdentifierCase"
        }
      ]
    },
    {
      code: "const $abc = 1;",
      errors: [
        {
          messageId: "invalidIdentifierCase"
        }
      ]
    },
    {
      code: "const _FooBar = 1;",
      errors: [
        {
          messageId: "invalidIdentifierCase"
        }
      ]
    },
    {
      code: "import { fooBar as bad_name } from 'x';",
      errors: [
        {
          messageId: "invalidIdentifierCase"
        }
      ]
    },
    {
      code: "type Foo<T_value> = T_value;",
      errors: [
        {
          messageId: "invalidIdentifierCase"
        }
      ]
    }
  ]
});
