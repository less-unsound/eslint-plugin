# `no-any`

Disallow the `any` type.

## Rule details

Its actual meaning is "completely disregard type errors here". It has no basis in type theory. This will just break your code. At the very least, use `unknown` or `never`.

Examples of **incorrect** code for this rule:

```ts
type Value = any;
```

Examples of **correct** code for this rule:

```ts
type Value = string;
```

## Options

This rule does not accept options.
