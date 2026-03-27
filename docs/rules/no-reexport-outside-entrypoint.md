# `no-reexport-outside-entrypoint`

Disallow reexports outside files explicitly mentioned in `package.json` as entrypoints.

## Rule details

Do not use `index.ts` files to reexport, unless it's a root `index.ts` file of some library. IDEs still don't have proper support for this, and it just adds one more file to edit on every rename.

Examples of **incorrect** code for this rule:

```ts
export * from "./foo";
```

```ts
export { foo } from "./foo";
```

Examples of **correct** code for this rule:

```ts
export * from "./foo";
```

This is only correct when the file is explicitly mentioned in `package.json` as an entrypoint.

```ts
const foo = 1;

export { foo };
```

## Options

This rule does not accept options.
