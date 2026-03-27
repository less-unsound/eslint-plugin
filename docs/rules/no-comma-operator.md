# `no-comma-operator`

Disallow the comma operator.

## Rule details

Seriously?

Examples of **incorrect** code for this rule:

```ts
const value = (foo, bar);
```

```ts
const value = (readFoo(), readBar());
```

Examples of **correct** code for this rule:

```ts
const value = bar;
```

```ts
const values = [foo, bar];
```

## Options

This rule does not accept options.
