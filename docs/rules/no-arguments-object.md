# `no-arguments-object`

Disallow the `arguments` object.

## Rule details

In general, variadic functions cause typing problems and are unsafe to have in the code. If absolutely needed, use `...rest`, at least it will return an array, and not some quirky array-like object.

Examples of **incorrect** code for this rule:

```ts
function foo() {
  return arguments;
}
```

```ts
const foo = () => arguments[0];
```

Examples of **correct** code for this rule:

```ts
function foo(arguments: number) {
  return arguments;
}
```

```ts
const value = { arguments: 1 };
```

## Options

This rule does not accept options.
