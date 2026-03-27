# `no-typeof-operator`

Disallow the runtime `typeof` operator.

## Rule details

`<T>(x: T) => typeof x === 'number'`. Properly designed languages do not allow this.

Examples of **incorrect** code for this rule:

```ts
const kind = typeof foo;
```

Examples of **correct** code for this rule:

```ts
const value = foo;
```

## Options

This rule does not accept options.
