# `no-enum`

Disallow `enum` and `const enum` declarations.

## Rule details

It's equivalent to unions since 5.0, except generates boilerplate JS code. A version that doesn't generate extraneous code, `const enum`, is not properly supported by `babel`. Neither is supported by Node's type stripping.

Examples of **incorrect** code for this rule:

```ts
enum Value {
  A
}
```

```ts
const enum Value {
  A
}
```

Examples of **correct** code for this rule:

```ts
const value = 1;
```

## Options

This rule does not accept options.
