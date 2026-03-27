import { ruleTester } from "../test/rule-tester.js";
import { noObjectAsMapRule } from "./no-object-as-map.js";

ruleTester.run("no-object-as-map", noObjectAsMapRule, {
  valid: [
    {
      code: "const map = new Map<string, number>(); const value = map.get(key);"
    },
    {
      code: "const map = {}; const value = map.foo;"
    },
    {
      code: "const map = {}; const value = map['foo'];"
    },
    {
      code: "const map = Object.create(null); const value = map['foo'];"
    }
  ],
  invalid: [
    {
      code: "const map = {}; const value = map[key];",
      errors: [
        {
          messageId: "forbiddenObjectAsMap"
        }
      ]
    },
    {
      code: "const map = {}; map[key] = value;",
      errors: [
        {
          messageId: "forbiddenObjectAsMap"
        }
      ]
    },
    {
      code: "const map = Object.create(null); const value = map[key];",
      errors: [
        {
          messageId: "forbiddenObjectAsMap"
        }
      ]
    },
    {
      code: "({})[key];",
      errors: [
        {
          messageId: "forbiddenObjectAsMap"
        }
      ]
    }
  ]
});
