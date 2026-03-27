# `no-for-let`

Disallow `for (let ...)` loops.

## Rule details

Prefer built-in array methods, unless mutability is required for performance. But if you really do it for performance, you should probably know that it should be `var`, not `let`?

Examples of **incorrect** code for this rule:

```ts
for (let index = 0; index < 1; index += 1) {
  console.log(index);
}
```

Examples of **correct** code for this rule:

```ts
for (const value of values) {
  console.log(value);
}
```

## Options

This rule does not accept options.

## When not to use it

Disable this rule when an algorithm requires mutable loop state for performance.
