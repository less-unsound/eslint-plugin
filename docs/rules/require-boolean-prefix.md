# `require-boolean-prefix`

Require boolean variables and fields to start with an allowed boolean prefix.

## Rule details

Boolean variables and fields must start with `is`, `are`, `was`, `were`, `has`, `have`, `can`, `may`, `should`, `must`, `will`, `would`, `did`, `does`, `do`, `needs`, `need`, `requires`, `supports`, `allows`, `contains`, `includes`, `matches`, or `exists`.

Examples of **incorrect** code for this rule:

```ts
const ready: boolean = true;
```

```ts
type Value = { ready: boolean };
```

Examples of **correct** code for this rule:

```ts
const isReady: boolean = true;
```

```ts
type Value = { hasItems: boolean };
```

## Options

This rule does not accept options.
