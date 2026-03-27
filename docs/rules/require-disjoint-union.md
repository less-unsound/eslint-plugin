# `require-disjoint-union`

Require unions to stay literal-only or to use a shared literal tag field on each local object branch.

## Rule details

All unions must be disjoint or string literal unions.

The tag field defaults to `$`.

Examples of **incorrect** code for this rule:

```ts
type A = { readonly $: "a"; a: number };
type B = { readonly $: "a"; b: number };
type Value = A | B;
```

```ts
type A = string;
type B = number;
type Value = A | B;
```

Examples of **correct** code for this rule:

```ts
type Value = 1 | 2;
type Value = "a" | "b";
```

```ts
type A = { readonly $: "a"; a: number };
type B = { readonly $: "b"; b: number };
type Value = A | B;
```

```ts
interface A { readonly kind: "a"; a: number }
interface B { readonly kind: "b"; b: number }
type Value = A | B;
```

```ts
type Value = { readonly $: "a"; a: number } | { readonly $: "b"; b: number };
```

## Options

```json
[
  {
    "tagName": "kind"
  }
]
```

Use `tagName` to change the shared literal tag field that disjoint object unions must use.
