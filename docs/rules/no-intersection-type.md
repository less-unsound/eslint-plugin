# `no-intersection-type`

Disallow intersection types.

## Rule details

They are so broken it's hard even to count them as intersection types. Search for amount of mentions of `intersection` and `union` in TypeScript's type checker: at the moment there are 5 and 28. In algebra, union is dual to intersection. Correct type checker would treat them equally.

Examples of **incorrect** code for this rule:

```ts
type Value = A & B;
```

Examples of **correct** code for this rule:

```ts
type Value = A | B;
```

## Options

This rule does not accept options.
