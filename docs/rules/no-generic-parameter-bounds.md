# `no-generic-parameter-bounds`

Disallow generic parameter bounds with `extends`.

## Rule details

Type inference is broken here and, in many cases, will force TS to infer the type of bound instead of the expected type.

If subtyping actually worked in TypeScript, there would have to be `A super B` syntax too, so that you could have set an upper bound on the type too. But subtyping doesn't work in TypeScript, thus you must not use subtyping, thus you must not use `extends`.

Examples of **incorrect** code for this rule:

```ts
type Box<T extends string> = T;
```

Examples of **correct** code for this rule:

```ts
type Box<T> = T;
```

## Options

This rule does not accept options.
