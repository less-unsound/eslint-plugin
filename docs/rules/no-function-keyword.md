# `no-function-keyword`

Disallow non-generator `function` declarations and expressions.

## Rule details

We have arrow functions now. They take less characters to type, don't have quirky `this` or `arguments` or `arguments.callee`.

Examples of **incorrect** code for this rule:

```ts
function value(): number {
  return 1;
}
```

```ts
const value = function (): number {
  return 1;
};
```

Examples of **correct** code for this rule:

```ts
const value = (): number => 1;
```

```ts
function* values(): Generator<number, void, unknown> {
  yield 1;
}
```

## Options

This rule does not accept options.
