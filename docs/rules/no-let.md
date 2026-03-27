# `no-let`

Disallow `let` declarations unless mutability is required for performance.

## Rule details

Most likely it should be a separate function where what is now each assignment into a variable is a `return`.

These break tree-shaking, make code untestable and make behavior dependent on module initialization order.

Absolutely never use `let` in tests. Execution order of `test()` and `describe()` is hard to understand and will most likely lead to flaky tests.

Examples of **incorrect** code for this rule:

```ts
let value = 1;
```

Examples of **correct** code for this rule:

```ts
const value = 1;
```

## Options

This rule does not accept options.

## When not to use it

Disable this rule when an algorithm requires mutable local state for performance.
