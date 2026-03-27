# `no-typeof-type`

Disallow `typeof` in type context.

## Rule details

TypeScript has bugs around `typeof` types. For example, sometimes you might get a red underline in the editor and spend half an hour debugging, just to find that "Reload TS server" makes an error go away.

Examples of **incorrect** code for this rule:

```ts
type Value = typeof foo;
```

Examples of **correct** code for this rule:

```ts
type Value = string;
```

## Options

This rule does not accept options.
