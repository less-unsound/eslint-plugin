# `no-optional-property`

Disallow optional object fields marked with `?`.

## Rule details

Every `?` doubles the number of cases that should be tested. Eventually, some combination of non-defined and undefined fields will be non-semantic. Prefer at least an explicit `foo: Bar | undefined`, or better, create a type with a descriptive name to make it a tagged union.

In JS, there is a distinction between a field that is not defined and a field that is `undefined` (sic). `'a' in {} === false`, `'a' in { a: undefined } === true`. TypeScript doesn't handle this properly in its type system.

Examples of **incorrect** code for this rule:

```ts
type Value = { name?: string };
```

```ts
interface Value { name?: string; }
```

Examples of **correct** code for this rule:

```ts
type Value = { name: string };
```

```ts
interface Value { name: string; }
```

## Options

This rule does not accept options.
