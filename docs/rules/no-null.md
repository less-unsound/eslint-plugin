# `no-null`

Disallow both runtime `null` literals and the `null` type.

## Rule details

`typeof null === 'object'`, and there is `undefined` anyway. Sometimes it might be useful for working with JSON, but you should have it sandboxed in a schema layer anyway.

Examples of **incorrect** code for this rule:

```ts
const value = null;
```

```ts
type Value = string | null;
```

Examples of **correct** code for this rule:

```ts
const value = 0;
```

```ts
type Value = string;
```

## Options

This rule does not accept options.
