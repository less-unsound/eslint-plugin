# `no-object-spread`

Disallow object spread in object literals.

## Rule details

It will require intersection types or inheritance to type. Prefer aggregation: `{ ...a, b }` → `{ a, b }`.

Examples of **incorrect** code for this rule:

```ts
const value = { ...values };
```

```ts
const value = { a: 1, ...values, b: 2 };
```

Examples of **correct** code for this rule:

```ts
const value = [...values];
```

```ts
const value = { a: 1, b: 2 };
```

## Options

This rule does not accept options.
