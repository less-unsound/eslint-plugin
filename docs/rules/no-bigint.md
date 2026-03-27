# `no-bigint`

Disallow `bigint` types and values.

## Rule details

Very rarely needed, and quite slow. If there is actually code that works with large integers, ignore this rule.

Examples of **incorrect** code for this rule:

```ts
const value = 1n;
```

```ts
const value: bigint = 1 as never;
```

```ts
const value = BigInt(1);
```

Examples of **correct** code for this rule:

```ts
const value = 1;
```

## Options

This rule does not accept options.
