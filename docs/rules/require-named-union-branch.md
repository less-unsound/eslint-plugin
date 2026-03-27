# `require-named-union-branch`

Require every object-shaped union branch to be defined through its own name.

## Rule details

Every branch of the union type must have its own name, i.e. `{ ... } | { ... }` is invalid, and there must be two `type Foo` for each of the branches.

Examples of **incorrect** code for this rule:

```ts
type Value = { readonly kind: "a"; readonly a: number } | { readonly kind: "b"; readonly b: number };
```

```ts
type Value = Foo | { readonly kind: "b"; readonly b: number };
type Foo = { readonly kind: "a"; readonly a: number };
```

Examples of **correct** code for this rule:

```ts
type A = { readonly kind: "a"; readonly a: number };
type B = { readonly kind: "b"; readonly b: number };
type Value = A | B;
```

```ts
type Value = 1 | 2;
type Value = "a" | "b";
```

## Options

This rule does not accept options.
