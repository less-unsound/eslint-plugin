# `no-untagged-object-union`

Disallow unions of inline object types unless they share a literal tag field.

## Rule details

These will require an `in`-condition for narrowing to select either of the branches, and `in` typing is broken.

Examples of **incorrect** code for this rule:

```ts
type Value = { a: 1 } | { b: 2 };
```

Examples of **correct** code for this rule:

```ts
type Value = 1 | 2;
type Value = "a" | "b";
type Value = { readonly kind: "a"; a: number } | { readonly kind: "b"; b: number };
```

## Options

This rule does not accept options.
