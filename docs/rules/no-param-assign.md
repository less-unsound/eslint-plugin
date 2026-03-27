# `no-param-assign`

Disallow assigning to function parameters unless mutability is required for performance.

## Rule details

This is essentially a `let`, except it's ever present and hidden.

Examples of **incorrect** code for this rule:

```ts
const setValue = (value: number): number => {
  value = value + 1;
  return value;
};
```

Examples of **correct** code for this rule:

```ts
const setValue = (value: number): number => value + 1;
```

## Options

This rule does not accept options.

## When not to use it

Disable this rule when an algorithm requires parameter mutation for performance.
