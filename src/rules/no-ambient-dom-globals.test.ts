import { ruleTester } from "../test/rule-tester.js";
import { noAmbientDomGlobalsRule } from "./no-ambient-dom-globals.js";

ruleTester.run("no-ambient-dom-globals", noAmbientDomGlobalsRule, {
  valid: [
    {
      code: "const value = 1;"
    },
    {
      code: "const name = 1; name;"
    },
    {
      code: "const window = { name: 1 }; window.name;"
    },
    {
      code: "({ name: 1 });"
    },
    {
      code: "type Value = { readonly self: string };"
    }
  ],
  invalid: [
    {
      code: "name;",
      errors: [
        {
          messageId: "forbiddenAmbientDomGlobal"
        }
      ]
    },
    {
      code: "function f() { return blur; }",
      errors: [
        {
          messageId: "forbiddenAmbientDomGlobal"
        }
      ]
    }
  ]
});
