import { ruleTester } from "../test/rule-tester.js";
import { requireDisjointUnionRule } from "./require-disjoint-union.js";

ruleTester.run("require-disjoint-union", requireDisjointUnionRule, {
  valid: [
    {
      code: "type Value = 1 | 2;"
    },
    {
      code: "type Value = \"a\" | \"b\";"
    },
    {
      code:
        'type A = { readonly $: "a"; a: number }; type B = { readonly $: "b"; b: number }; type Value = A | B;'
    },
    {
      code:
        'interface A { readonly kind: "a"; a: number } interface B { readonly kind: "b"; b: number } type Value = A | B;',
      options: [{ tagName: "kind" }]
    },
    {
      code:
        'type Value = { readonly $: "a"; a: number } | { readonly $: "b"; b: number };'
    }
  ],
  invalid: [
    {
      code:
        'type A = { readonly $: "a"; a: number }; type B = { readonly $: "a"; b: number }; type Value = A | B;',
      errors: [
        {
          messageId: "forbiddenDisjointUnion"
        }
      ]
    },
    {
      code:
        'type A = { readonly $: "a"; a: number }; type B = { readonly kind: "b"; b: number }; type Value = A | B;',
      errors: [
        {
          messageId: "forbiddenDisjointUnion"
        }
      ]
    },
    {
      code: "type A = string; type B = number; type Value = A | B;",
      errors: [
        {
          messageId: "forbiddenDisjointUnion"
        }
      ]
    },
    {
      code:
        'type A = { readonly $: "a"; a: number }; type B = { readonly $: "b"; b: number }; type Value = A | B;',
      options: [{ tagName: "kind" }],
      errors: [
        {
          messageId: "forbiddenDisjointUnion"
        }
      ]
    }
  ]
});
