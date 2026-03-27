# `no-overload`

Disallow function and method overloads.

## Rule details

It's almost the same as intersection types, which are broken.

Examples of **incorrect** code for this rule:

```ts
function f(x: string): string;
function f(x: number): number;
function f(x: string | number) {
  return x;
}
```

Examples of **correct** code for this rule:

```ts
function f(x: string | number) {
  return x;
}
```

## Options

This rule does not accept options.
