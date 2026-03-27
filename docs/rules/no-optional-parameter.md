# `no-optional-parameter`

Disallow optional parameters marked with `?` in functions and constructor parameter properties.

## Rule details

TypeScript has a quirk that allows passing the function with fewer arguments to a parameter list that requires more. Eventually, this leads to passing unexpected values to optional parameters. Prefer decomposing the function into two, where one takes a full set of parameters, and the other one is a simpler version that takes less.

Examples of **incorrect** code for this rule:

```ts
function value(value?: number) {
  return value;
}
```

```ts
class Value {
  constructor(private value?: number) {}
}
```

Examples of **correct** code for this rule:

```ts
function value(value: number) {
  return value;
}
```

```ts
class Value {
  constructor(private value: number) {}
}
```

## Options

This rule does not accept options.
