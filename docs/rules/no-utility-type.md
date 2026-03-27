# `no-utility-type`

Disallow built-in TypeScript utility types.

## Rule details

These are conditional types in disguise.

Examples of **incorrect** code for this rule:

```ts
type Value = Omit<Foo, "bar">;
```

```ts
type Value = Exclude<Foo, Bar>;
```

```ts
type Value = Readonly<Foo>;
```

```ts
type Value = ReturnType<() => Foo>;
```

Examples of **correct** code for this rule:

```ts
type Value = Foo;
```

## Options

This rule does not accept options.
