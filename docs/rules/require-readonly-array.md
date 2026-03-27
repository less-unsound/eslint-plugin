# `require-readonly-array`

Require array types to use `readonly T[]` unless mutability is required for performance.

## Rule details

Arrays should be readonly: `readonly string[]`

Examples of **incorrect** code for this rule:

```ts
type Value = string[];
```

```ts
type Value = Array<string>;
```

```ts
type Value = ReadonlyArray<string>;
```

Examples of **correct** code for this rule:

```ts
type Value = readonly string[];
```

## Options

This rule does not accept options.

## When not to use it

Disable this rule when an algorithm requires mutable arrays for performance.
