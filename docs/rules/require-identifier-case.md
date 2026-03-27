# `require-identifier-case`

Require identifiers to use camelCase, PascalCase, `_camelCase`, or short `$` names.

## Rule details

All names must be in `camelCase`, except for React components and type-like values (for example, zod schema) that must be in `PascalCase`.

This rule also allows identifiers that start with `_` and continue in `camelCase` (for unused variables), and identifiers that start with `$` and have up to 2 letters after it (for codegen name clash reasons).

Examples of **incorrect** code for this rule:

```ts
const foo_bar = 1;
```

```ts
type foo_type = { foo_bar: number };
```

```ts
const $abc = 1;
```

```ts
const _FooBar = 1;
```

Examples of **correct** code for this rule:

```ts
const fooBar = 1;
```

```ts
type FooBar = { fooBar: number };
```

```ts
const _fooBar = 1;
```

```ts
const $ = 0;
```

```ts
const $x = 1;
const $Ab = 2;
```

## Options

This rule does not accept options.
