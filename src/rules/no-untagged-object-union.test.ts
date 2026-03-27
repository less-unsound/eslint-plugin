import { ruleTester } from "../test/rule-tester.js";
import { noUntaggedObjectUnionRule } from "./no-untagged-object-union.js";

ruleTester.run("no-untagged-object-union", noUntaggedObjectUnionRule, {
  valid: [
    {
      code: "type Value = 1 | 2;"
    },
    {
      code: "type Value = \"a\" | \"b\";"
    },
    {
      code:
        'type Value = { readonly kind: "a"; a: number } | { readonly kind: "b"; b: number };'
    },
    {
      code:
        'type Value = { readonly $: "foo"; foo: number } | { readonly $: "bar"; bar: number };'
    }
  ],
  invalid: [
    {
      code: "type Value = { a: 1 } | { b: 2 };",
      errors: [
        {
          messageId: "forbiddenUntaggedObjectUnion"
        }
      ]
    },
    {
      code: "type Value = { readonly kind: string } | { readonly kind: string };",
      errors: [
        {
          messageId: "forbiddenUntaggedObjectUnion"
        }
      ]
    }
  ]
});
