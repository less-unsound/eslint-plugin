# `no-eval`

Disallow `eval`.

## Rule details

It's impossible to typecheck.

Examples of **incorrect** code for this rule:

```ts
eval(code);
```

```ts
eval?.(code);
```

Examples of **correct** code for this rule:

```ts
const value = run(code);
```

## Options

This rule does not accept options.
