# `require-return-type`

Require functions to declare a return type unless they return a function.

## Rule details

Functions must have a return type, unless they return a function, then they must not have a return type.

If several functions form a group of similar things, see what's different between them, and make a `type Foo<T> = (...) => ...` where `T` is the thing that is different.

Examples of **incorrect** code for this rule:

```ts
function value() {
  return 1;
}
```

```ts
const make = (): ((value: number) => number) => (value: number): number => value;
```

Examples of **correct** code for this rule:

```ts
function value(): number {
  return 1;
}
```

```ts
const make = () => (value: number): number => value;
```

## Options

This rule does not accept options.
