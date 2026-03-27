import { ruleTester } from "../test/rule-tester.js";
import { noObjectStringificationHookRule } from "./no-object-stringification-hook.js";

ruleTester.run("no-object-stringification-hook", noObjectStringificationHookRule, {
  valid: [
    {
      code: "const value = { name: 1 };"
    },
    {
      code: "interface Value { toString(): string; }"
    },
    {
      code: "type Value = { toJSON: string };"
    },
    {
      code: "class Value { value = 1; }"
    },
    {
      code: "type Value = { readonly toString: string };"
    }
  ],
  invalid: [
    {
      code: "const value = { toString: () => \"x\" };",
      errors: [
        {
          messageId: "forbiddenObjectStringificationHook"
        }
      ]
    },
    {
      code: "const value = { [\"toJSON\"]: () => \"x\" };",
      errors: [
        {
          messageId: "forbiddenObjectStringificationHook"
        }
      ]
    },
    {
      code: "class Value { toString() { return \"x\"; } }",
      errors: [
        {
          messageId: "forbiddenObjectStringificationHook"
        }
      ]
    },
    {
      code: "class Value { [\"toJSON\"]() { return \"x\"; } }",
      errors: [
        {
          messageId: "forbiddenObjectStringificationHook"
        }
      ]
    },
    {
      code: "class Value { toString = () => \"x\"; }",
      errors: [
        {
          messageId: "forbiddenObjectStringificationHook"
        }
      ]
    },
    {
      code: "value.toString = () => \"x\";",
      errors: [
        {
          messageId: "forbiddenObjectStringificationHook"
        }
      ]
    },
    {
      code: "value[\"toJSON\"] = () => \"x\";",
      errors: [
        {
          messageId: "forbiddenObjectStringificationHook"
        }
      ]
    },
    {
      code: "value.toString();",
      errors: [
        {
          messageId: "forbiddenObjectStringificationHook"
        }
      ]
    },
    {
      code: "value[\"toJSON\"]();",
      errors: [
        {
          messageId: "forbiddenObjectStringificationHook"
        }
      ]
    },
    {
      code: "const stringify = value.toString;",
      errors: [
        {
          messageId: "forbiddenObjectStringificationHook"
        }
      ]
    },
    {
      code: "const json = value?.toJSON;",
      errors: [
        {
          messageId: "forbiddenObjectStringificationHook"
        }
      ]
    }
  ]
});
