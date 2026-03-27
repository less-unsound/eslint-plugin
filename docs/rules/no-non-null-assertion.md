# `no-non-null-assertion`

Disallow non-null assertions.

## Rule details

It does no checks at runtime, and is essentially `x as NotNull<typeof x>`.

Examples of **incorrect** code for this rule:

```ts
const value = foo!;
```

Examples of **correct** code for this rule:

```ts
const value = foo;
```

## Options

This rule does not accept options.
