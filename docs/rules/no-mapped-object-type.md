# `no-mapped-object-type`

Disallow mapped object types.

## Rule details

These lack any theory behind them, don't have introduction/elimination syntax, and are buggy.

Examples of **incorrect** code for this rule:

```ts
type Value<T> = { [K in keyof T]: T[K] };
```

Examples of **correct** code for this rule:

```ts
type Value = Record<string, number>;
```

## Options

This rule does not accept options.
