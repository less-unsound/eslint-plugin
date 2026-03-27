# `no-type-guard`

Disallow TypeScript type guards.

## Rule details

These are just `as` in disguise: `const foo = (x: 1 | 2): x is 1 => x === 2;`. It might be used in straightforward cases, such as ADT boilerplate.

Examples of **incorrect** code for this rule:

```ts
const isFoo = (value: string): value is Foo => true;
```

Examples of **correct** code for this rule:

```ts
const isFoo = (value: string): boolean => value.length > 0;
```

## Options

This rule does not accept options.
