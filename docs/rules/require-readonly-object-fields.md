# `require-readonly-object-fields`

Require `readonly` on all object type fields unless mutability is required for performance.

## Rule details

All object fields must be `readonly`: `{ readonly foo: string }`.

By assigning into a tag field of an `A | B` union, we can narrow it to an `A` type while it will have `B` (or some arbitrary combination of `A` and `B`) at runtime.

If data are not immutable, it's possible to create loopy data with assignment, and cause infinite loops/recursion trying to walk that data.

```typescript
type A = { value: number, foo: A | undefined }
const a: A = { value: 1, foo: undefined };
a.foo = a;
// best luck walking or serializing it now
```

Examples of **incorrect** code for this rule:

```ts
type Value = { name: string };
```

```ts
type Value = { kind: "a"; readonly name: string } | { readonly kind: "b"; readonly name: string };
```

Examples of **correct** code for this rule:

```ts
type Value = { readonly name: string };
```

```ts
type Value = { readonly kind: "a"; readonly name: string } | { readonly kind: "b"; readonly name: string };
```

## Options

This rule does not accept options.

## When not to use it

Disable this rule when an algorithm requires mutable object fields, including tag fields, for performance.
