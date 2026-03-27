import { ruleTester } from "../test/rule-tester.js";
import { requireNamedUnionBranchRule } from "./require-named-union-branch.js";

ruleTester.run("require-named-union-branch", requireNamedUnionBranchRule, {
  valid: [
    {
      code: "type Value = 1 | 2;"
    },
    {
      code: 'type Value = "a" | "b";'
    },
    {
      code: "type A = { readonly kind: \"a\"; readonly a: number }; type B = { readonly kind: \"b\"; readonly b: number }; type Value = A | B;"
    },
    {
      code:
        "interface A { readonly kind: \"a\"; readonly a: number } interface B { readonly kind: \"b\"; readonly b: number } type Value = A | B;"
    }
  ],
  invalid: [
    {
      code:
        'type Value = { readonly kind: "a"; readonly a: number } | { readonly kind: "b"; readonly b: number };',
      errors: [
        {
          messageId: "requireNamedUnionBranch"
        },
        {
          messageId: "requireNamedUnionBranch"
        }
      ]
    },
    {
      code: 'type Value = Foo | { readonly kind: "b"; readonly b: number }; type Foo = { readonly kind: "a"; readonly a: number };',
      errors: [
        {
          messageId: "requireNamedUnionBranch"
        }
      ]
    }
  ]
});
