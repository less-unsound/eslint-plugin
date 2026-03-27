# `require-string-template-expression`

Require untagged template literal interpolations to have `string` type.

## Rule details

Any inlining succeeds, and there won't be any compile-time errors even if it's a function `${(x: number) => x}`.

Tagged template literals are ignored by this rule.

Examples of **incorrect** code for this rule:

```ts
const value = 1;
const text = `${value}`;
```

```ts
const value = { n: 1 };
const text = `${value}`;
```

Examples of **correct** code for this rule:

```ts
const value: string = "1";
const text = `${value}`;
```

```ts
type Value = string & { readonly brand: "value" };
declare const value: Value;
const text = `${value}`;
```

## Options

This rule does not accept options.
