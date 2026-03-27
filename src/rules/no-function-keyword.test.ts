import { ruleTester } from "../test/rule-tester.js";
import { noFunctionKeywordRule } from "./no-function-keyword.js";

ruleTester.run("no-function-keyword", noFunctionKeywordRule, {
  valid: [
    {
      code: "const value = (): number => 1;"
    },
    {
      code: "function* values(): Generator<number, void, unknown> { yield 1; }"
    },
    {
      code: "async function* values(): AsyncGenerator<number, void, unknown> { yield 1; }"
    }
  ],
  invalid: [
    {
      code: "function value(): number { return 1; }",
      errors: [
        {
          messageId: "forbiddenFunctionKeyword"
        }
      ]
    },
    {
      code: "async function value(): Promise<number> { return 1; }",
      errors: [
        {
          messageId: "forbiddenFunctionKeyword"
        }
      ]
    },
    {
      code: "const value = function (): number { return 1; };",
      errors: [
        {
          messageId: "forbiddenFunctionKeyword"
        }
      ]
    },
    {
      code: "declare function value(): number;",
      errors: [
        {
          messageId: "forbiddenFunctionKeyword"
        }
      ]
    }
  ]
});
