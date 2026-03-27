import { ruleTester } from "../test/rule-tester.js";
import { noOverloadRule } from "./no-overload.js";

ruleTester.run("no-overload", noOverloadRule, {
  valid: [
    {
      code: "function f(x: string | number) { return x; }"
    },
    {
      code: "interface Box { value(value: string): string; }"
    }
  ],
  invalid: [
    {
      code: [
        "function f(x: string): string;",
        "function f(x: number): number;",
        "function f(x: string | number) {",
        "  return x;",
        "}"
      ].join("\n"),
      errors: [
        {
          messageId: "forbiddenOverload"
        },
        {
          messageId: "forbiddenOverload"
        }
      ]
    },
    {
      code: [
        "interface Box {",
        "  value(value: string): string;",
        "  value(value: number): number;",
        "}"
      ].join("\n"),
      errors: [
        {
          messageId: "forbiddenOverload"
        }
      ]
    }
  ]
});
