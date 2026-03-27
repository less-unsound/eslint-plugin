# `no-keyof`

Disallow the `keyof` type operator.

## Rule details

It's another type that has no theory behind it. There are no introduction or elimination forms for `keyof`, and almost all uses will end up with `as` or `any`. It was meant for typing old JavaScript libraries, not for new code.

Examples of **incorrect** code for this rule:

```ts
type Keys = keyof Foo;
```

```ts
type Mapped<T> = {
  [K in keyof T]: K;
};
```

Examples of **correct** code for this rule:

```ts
type Value = string;
```

```ts
type User = {
  readonly name: string;
};
```

## Options

This rule does not accept options.
