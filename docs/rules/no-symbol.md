# `no-symbol`

Disallow `symbol` and `unique symbol` types.

## Rule details

These are very good for opaque/branded types, but have to be sandboxed in their own files and `eslint-ignore`d. The rule is here to ensure the rest of the code doesn't use them, and doesn't break opaque/branded type guarantees.

Examples of **incorrect** code for this rule:

```ts
type Value = symbol;
```

```ts
declare const key: unique symbol;
```

Examples of **correct** code for this rule:

```ts
type Value = string;
```

```ts
declare const key: string;
```

## Options

This rule does not accept options.
