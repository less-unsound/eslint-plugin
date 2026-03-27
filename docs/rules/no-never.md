# `no-never`

Disallow the `never` type keyword.

## Rule details

This type is only needed in cases when there are bugs in type system. Sandbox them, and `eslint-ignore` it there.

Examples of **incorrect** code for this rule:

```ts
type Value = never;
```

```ts
function fail(): never {
  throw new Error();
}
```

Examples of **correct** code for this rule:

```ts
type Value = string;
```

```ts
function value(): string {
  return "x";
}
```

## Options

This rule does not accept options.
