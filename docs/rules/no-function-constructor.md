# `no-function-constructor`

Disallow global `Function` constructor usage.

## Rule details

Use normal function types: `(a: A) => B`.

Examples of **incorrect** code for this rule:

```ts
Function("return 1;");
```

```ts
new Function("return 1;");
```

Examples of **correct** code for this rule:

```ts
const run = (): number => 1;
```

## Options

This rule does not accept options.
