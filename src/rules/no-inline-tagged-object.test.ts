import { ruleTester } from "../test/rule-tester.js";
import { noInlineTaggedObjectRule } from "./no-inline-tagged-object.js";

ruleTester.run("no-inline-tagged-object", noInlineTaggedObjectRule, {
  valid: [
    {
      code: "const value = Foo();"
    },
    {
      code: 'const value = { foo: "bar" };'
    },
    {
      code: 'const value = { kind: "foo" };'
    },
    {
      code: 'const value = { kind: "foo" };',
      options: [{ tagName: "$" }]
    }
  ],
  invalid: [
    {
      code: 'const value = { $: "foo" };',
      errors: [
        {
          messageId: "useConstructor",
          data: {
            constructorName: "Foo",
            tagName: "$"
          }
        }
      ]
    },
    {
      code: 'const value = { kind: "foo-bar", value: 1 };',
      options: [{ tagName: "kind" }],
      errors: [
        {
          messageId: "useConstructor",
          data: {
            constructorName: "FooBar",
            tagName: "kind"
          }
        }
      ]
    },
    {
      code: "const value = { $: tag };",
      options: [{ tagName: "$" }],
      errors: [
        {
          messageId: "useConstructorGeneric",
          data: {
            tagName: "$"
          }
        }
      ]
    }
  ]
});
