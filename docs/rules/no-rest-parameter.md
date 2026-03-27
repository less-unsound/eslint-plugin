# `no-rest-parameter`

Disallow rest parameters.

## Rule details

TypeScript doesn't have "mapped tuple types", so typing these will be problematic. In most cases, passing an array would suffice and would only take two more characters to type.

Examples of **incorrect** code for this rule:

```ts
const join = (...values: string[]): string => values.join(",");
```

Examples of **correct** code for this rule:

```ts
const join = (values: readonly string[]): string => values.join(",");
```

## Options

This rule does not accept options.
