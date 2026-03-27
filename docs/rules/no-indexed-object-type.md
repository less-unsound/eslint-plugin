# `no-indexed-object-type`

Disallow indexed object types such as `{ [key: string]: T }`, except for explicit self-recursive cases.

## Rule details

It's `Record<string, number>`. The only valid case is to avoid type recursion quirks in TS: `type Json = null | boolean | number | string | Json[] | { [k: string]: Json }` would emit an error with `Record<string, Json>`

Examples of **incorrect** code for this rule:

```ts
type Value = { [key: string]: number };
```

Examples of **correct** code for this rule:

```ts
type Json = boolean | string | { [key: string]: Json };
```

## Options

This rule does not accept options.
