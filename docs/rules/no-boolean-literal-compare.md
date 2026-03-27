# `no-boolean-literal-compare`

Disallow equality comparisons to boolean literals.

## Rule details

Bans bogus boolean operations, such as `=== true` and `=== false`. If you have `boolean | undefined` type and actually have to do such checks, change this type to something better.

Examples of **incorrect** code for this rule:

```ts
const value = isReady === true;
```

```ts
const value = isReady !== false;
```

Examples of **correct** code for this rule:

```ts
const value = isReady;
```

```ts
const value = !isReady;
```

## Options

This rule does not accept options.
