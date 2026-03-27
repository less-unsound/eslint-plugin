# `no-undefined-type`

Disallow the `undefined` type keyword in type positions.

## Rule details

It usually appears in `Foo | undefined` context.
- `string | undefined` has `""` that sometimes will clash with `undefined` in `if ()` and boolean checks.
- `number | undefined` will cause this with `0`.
- `boolean | undefined`... well, you get the pattern.
- `T | undefined` where `T` is generic is a bug, because `T` might be `undefined` on its own, and in that case code is almost guaranteed to work incorrectly.

Use a proper `Option<T>` type. For example, `Option<T> = [T] | undefined`, or `{ $: 'Some', value: T } | { $: 'None' }`.

Examples of **incorrect** code for this rule:

```ts
type Value = undefined;
type Value = string | undefined;
```

Examples of **correct** code for this rule:

```ts
type Value = string;
```

## Options

This rule does not accept options.
