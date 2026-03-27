import { ruleTester } from "../test/rule-tester.js";
import { noFunctionConstructorRule } from "./no-function-constructor.js";

ruleTester.run("no-function-constructor", noFunctionConstructorRule, {
  valid: [
    {
      code: "const Function = (value: string): string => value;\nFunction(\"x\");"
    },
    {
      code:
        "const globalThis = { Function: (value: string): string => value };\nglobalThis.Function(\"x\");"
    },
    {
      code: "const value = \"x\";"
    }
  ],
  invalid: [
    {
      code: "Function(\"return 1;\");",
      errors: [
        {
          messageId: "forbiddenFunctionConstructor"
        }
      ]
    },
    {
      code: "new Function(\"return 1;\");",
      errors: [
        {
          messageId: "forbiddenFunctionConstructor"
        }
      ]
    },
    {
      code: "globalThis.Function(\"return 1;\");",
      errors: [
        {
          messageId: "forbiddenFunctionConstructor"
        }
      ]
    },
    {
      code: "new globalThis.Function(\"return 1;\");",
      errors: [
        {
          messageId: "forbiddenFunctionConstructor"
        }
      ]
    }
  ]
});
