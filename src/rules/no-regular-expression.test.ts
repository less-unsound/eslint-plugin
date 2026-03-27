import { ruleTester } from "../test/rule-tester.js";
import { noRegularExpressionRule } from "./no-regular-expression.js";

ruleTester.run("no-regular-expression", noRegularExpressionRule, {
  valid: [
    {
      code: "const RegExp = (value: string): string => value;\nRegExp(\"x\");"
    },
    {
      code: "const globalThis = { RegExp: (value: string): string => value };\nglobalThis.RegExp(\"x\");"
    },
    {
      code: "const value = \"x\";"
    }
  ],
  invalid: [
    {
      code: "const value = /x/;",
      errors: [
        {
          messageId: "forbiddenRegularExpression"
        }
      ]
    },
    {
      code: "RegExp(\"x\");",
      errors: [
        {
          messageId: "forbiddenRegularExpression"
        }
      ]
    },
    {
      code: "new RegExp(\"x\");",
      errors: [
        {
          messageId: "forbiddenRegularExpression"
        }
      ]
    },
    {
      code: "globalThis.RegExp(\"x\");",
      errors: [
        {
          messageId: "forbiddenRegularExpression"
        }
      ]
    }
  ]
});
