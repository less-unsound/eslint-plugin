# `no-var`

Disallow `var` declarations unless mutability is required for performance.

## Rule details

They're hoisted up to the function or module scope. `for (var i = 0; i < n; ++i) a.push(() => i)` creates an array of functions referencing the same value of `i === n`.

Examples of **incorrect** code for this rule:

```ts
var value = 1;
```

Examples of **correct** code for this rule:

```ts
const value = 1;
```

## Options

This rule does not accept options.

## When not to use it

Disable this rule when an algorithm requires mutable declarations for performance.
