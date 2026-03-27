import { ruleTester } from "../test/rule-tester.js";
import { noSymbolRule } from "./no-symbol.js";

ruleTester.run("no-symbol", noSymbolRule, {
  valid: [
    {
      code: "type Value = string;"
    }
  ],
  invalid: [
    {
      code: "type Value = symbol;",
      errors: [
        {
          messageId: "forbiddenSymbolType"
        }
      ]
    },
    {
      code: "declare const key: unique symbol;",
      errors: [
        {
          messageId: "forbiddenSymbolType"
        }
      ]
    }
  ]
});
