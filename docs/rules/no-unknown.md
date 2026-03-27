# `no-unknown`

Disallow the `unknown` type.

## Rule details

All `unknown` must immediately go through some kind of schema parser, such as `zod`. If you have to store an `unknown` somewhere and had to write this type, this caught you on not using that kind of parser immediately.

Examples of **incorrect** code for this rule:

```ts
type Value = unknown;
```

Examples of **correct** code for this rule:

```ts
type Value = string;
```

## Options

This rule does not accept options.
