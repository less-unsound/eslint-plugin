# `no-as-type-assertion`

Disallow `as` type assertions except `as const`.

## Rule details

It was meant to gradually type legacy code, not for production use in TS-native projects. Often, instead of `x as T` it should have been:
- `const y: T = x;`
- or `x satisfies T`
- or `foo = new Array<T>()`

Examples of **incorrect** code for this rule:

```ts
const value = input as Foo;
```

Examples of **correct** code for this rule:

```ts
const value = [1, 2] as const;
```

## Options

This rule does not accept options.
