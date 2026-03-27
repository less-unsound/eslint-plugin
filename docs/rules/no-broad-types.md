# `no-broad-types`

Disallow `Object`, `object`, `{}`, and `Function` types.

## Rule details

There's barely a case when common supertypes of objects and functions are even needed.

Examples of **incorrect** code for this rule:

```ts
type Value = object;
```

```ts
type Value = {};
```

Examples of **correct** code for this rule:

```ts
type Value = { readonly name: string };
```

## Options

This rule does not accept options.
