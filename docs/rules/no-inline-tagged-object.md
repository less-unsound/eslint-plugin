# `no-inline-tagged-object`

Ban creating tagged objects by supplying the configured tag field directly.

## Rule details

Tagged objects must be created with constructors. Files with constructors must use `eslint-disable` to pass.

Ban creating objects with a supplied tag, and recommend using constructors instead. For example, `{ $: "foo" }` is banned, and must use a `Foo()` constructor when `$` is the disjoint union tag.

Examples of **incorrect** code for this rule:

```ts
const value = { $: "foo" };
```

```ts
const value = { kind: "foo-bar", value: 1 };
```

Examples of **correct** code for this rule:

```ts
const value = Foo();
```

```ts
const value = { foo: "bar" };
```

## Options

```json
[
  {
    "tagName": "kind"
  }
]
```

Use `tagName` to change which object field is treated as the disjoint-union tag.
