# `no-conditional-type`

Disallow conditional types.

## Rule details

These lack any theory behind them and were meant to type legacy JS code.

Examples of **incorrect** code for this rule:

```ts
type Value<T> = T extends string ? 1 : 2;
```

Examples of **correct** code for this rule:

```ts
type Value = string | number;
```

## Options

This rule does not accept options.
