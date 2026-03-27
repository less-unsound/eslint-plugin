# `no-regular-expression`

Disallow regular-expression literals and global `RegExp()` constructor usage.

## Rule details

The only available engine is worst-case exponential, is different between user-agents and their versions. Regexps are extremely brittle.

Examples of **incorrect** code for this rule:

```ts
const value = /x/;
```

```ts
RegExp("x");
```

```ts
new RegExp("x");
```

Examples of **correct** code for this rule:

```ts
const RegExp = (value: string): string => value;
RegExp("x");
```

```ts
const value = "x";
```

## Options

This rule does not accept options.
