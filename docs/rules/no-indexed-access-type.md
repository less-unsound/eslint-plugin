# `no-indexed-access-type`

Disallow indexed access types such as Foo["bar"].

## Rule details

They disregard variance at their use site and most likely will pin types in another library/module with both lower and upper bounds; thus, they're very detrimental to modularity. Most likely, the type of the `foo` field should be defined separately.

Examples of **incorrect** code for this rule:

```ts
type Name = User["name"];
```

```ts
type Value = Record<string, string>[string];
```

Examples of **correct** code for this rule:

```ts
type Name = string;
```

```ts
type User = {
  readonly name: string;
};
```

## Options

This rule does not accept options.
