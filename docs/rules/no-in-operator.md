# `no-in-operator`

Disallow the `in` operator.

## Rule details

TypeScript has no distinction between open and closed object types. There might be no field in an object type, but there will be one at runtime. Narrowing for `in` operators is also buggy in other ways and doesn't correctly apply to either of its arguments.

Examples of **incorrect** code for this rule:

```ts
const value = "name" in foo;
```

Examples of **correct** code for this rule:

```ts
const value = foo === undefined;
```

## Options

This rule does not accept options.
