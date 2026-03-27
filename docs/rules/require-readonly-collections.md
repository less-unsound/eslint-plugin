# `require-readonly-collections`

Require `ReadonlySet` and `ReadonlyMap` in types unless mutability is required for performance.

## Rule details

`Set` and `Map` should be readonly: `env: ReadonlyMap<string, Type>`

Examples of **incorrect** code for this rule:

```ts
type Value = Set<string>;
```

```ts
type Value = Map<string, number>;
```

Examples of **correct** code for this rule:

```ts
type Value = ReadonlySet<string>;
```

```ts
type Value = ReadonlyMap<string, number>;
```

## Options

This rule does not accept options.

## When not to use it

Disable this rule when an algorithm requires mutable collections for performance.
