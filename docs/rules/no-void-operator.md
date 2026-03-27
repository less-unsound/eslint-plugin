# `no-void-operator`

Disallow the runtime `void` operator.

## Rule details

What for?

Examples of **incorrect** code for this rule:

```ts
void foo();
```

```ts
const value = void foo();
```

Examples of **correct** code for this rule:

```ts
foo();
```

## Options

This rule does not accept options.
