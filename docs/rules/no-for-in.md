# `no-for-in`

Disallow `for (... in ...)` loops.

## Rule details

It requires a `hasOwnProperty` check. Prefer `Object.entries`, `Object.keys`, or `Object.values`.

Examples of **incorrect** code for this rule:

```ts
for (const key in object) {}
```

Examples of **correct** code for this rule:

```ts
for (const value of values) {}
```

## Options

This rule does not accept options.
