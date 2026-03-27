import { ruleTester } from "../test/rule-tester.js";
import { noJsonStaticMethodRule } from "./no-json-static-method.js";

ruleTester.run("no-json-static-method", noJsonStaticMethodRule, {
  valid: [
    {
      code: "const JSON = { parse: (): number => 1 };\nJSON.parse();"
    },
    {
      code: "const globalThis = { JSON: { parse: (): number => 1 } };\nglobalThis.JSON.parse();"
    },
    {
      code: "const window = { JSON: { stringify: (): string => \"\" } };\nwindow.JSON.stringify();"
    },
    {
      code: "const JSON = { stringify: (): string => \"\" };\nJSON[\"stringify\"]();"
    }
  ],
  invalid: [
    {
      code: "JSON.parse(value);",
      errors: [
        {
          messageId: "forbiddenJsonStaticMethod"
        }
      ]
    },
    {
      code: "JSON[\"stringify\"](value);",
      errors: [
        {
          messageId: "forbiddenJsonStaticMethod"
        }
      ]
    },
    {
      code: "globalThis.JSON.parse(value);",
      errors: [
        {
          messageId: "forbiddenJsonStaticMethod"
        }
      ]
    },
    {
      code: "window.JSON[\"stringify\"](value);",
      errors: [
        {
          messageId: "forbiddenJsonStaticMethod"
        }
      ]
    },
    {
      code: "globalThis[\"JSON\"].stringify(value);",
      errors: [
        {
          messageId: "forbiddenJsonStaticMethod"
        }
      ]
    }
  ]
});
