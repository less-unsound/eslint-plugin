# `require-readonly-tuple`

Require tuple types to use `readonly [...]` unless mutability is required for performance.

## Rule details

Tuples should be readonly: `readonly [string, number]`

Examples of **incorrect** code for this rule:

```ts
type Value = [string, number];
```

Examples of **correct** code for this rule:

```ts
type Value = readonly [string, number];
```

## Options

This rule does not accept options.

## When not to use it

Disable this rule when an algorithm requires mutable tuples for performance.
