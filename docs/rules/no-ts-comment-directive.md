# `no-ts-comment-directive`

Disallow TypeScript comment directives.

## Rule details

It's a worse version of `as` that can cause the TS compiler to enter an arbitrary incorrect state.

Examples of **incorrect** code for this rule:

```ts
// @ts-ignore
const value = foo;
```

Examples of **correct** code for this rule:

```ts
// regular comment
const value = foo;
```

## Options

This rule does not accept options.
