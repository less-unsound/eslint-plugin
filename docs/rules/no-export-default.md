# `no-export-default`

Disallow default exports.

## Rule details

It breaks IDE features such as renaming and also has complex semantics. Google for a full page of links to articles that explain why precisely. Next.js enforces these on users? Well, never use Next.js.

Examples of **incorrect** code for this rule:

```ts
export default 1;
```

```ts
const value = 1;
export { value as default };
```

Examples of **correct** code for this rule:

```ts
export const value = 1;
```

## Options

This rule does not accept options.
