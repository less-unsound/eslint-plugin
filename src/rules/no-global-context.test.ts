import { ruleTester } from "../test/rule-tester.js";
import { noGlobalContextRule } from "./no-global-context.js";

ruleTester.run("no-global-context", noGlobalContextRule, {
  valid: [
    {
      code: "const value = 1;"
    },
    {
      code: "const globalThis = 1; const value = globalThis;"
    },
    {
      code: "const window = 1; const value = window;"
    },
    {
      code: "const value = { globalThis: 1, window: 2, self: 3, global: 4 };"
    }
  ],
  invalid: [
    {
      code: "const value = this;",
      errors: [
        {
          messageId: "forbiddenGlobalContext"
        }
      ]
    },
    {
      code: "interface Value { value: this; }",
      errors: [
        {
          messageId: "forbiddenGlobalContext"
        }
      ]
    },
    {
      code: "const value = globalThis;",
      errors: [
        {
          messageId: "forbiddenGlobalContext"
        }
      ]
    },
    {
      code: "const value = window;",
      errors: [
        {
          messageId: "forbiddenGlobalContext"
        }
      ]
    },
    {
      code: "const value = self;",
      errors: [
        {
          messageId: "forbiddenGlobalContext"
        }
      ]
    },
    {
      code: "const value = global;",
      errors: [
        {
          messageId: "forbiddenGlobalContext"
        }
      ]
    }
  ]
});
