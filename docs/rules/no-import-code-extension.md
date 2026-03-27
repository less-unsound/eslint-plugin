# `no-import-code-extension`

Disallow `.ts`, `.tsx`, and `.js` file extensions in import specifiers.

## Rule details

Do not introduce file extensions into imports just so that it can be run in a specific way with Node.

Examples of **incorrect** code for this rule:

```ts
import { foo } from "./foo.ts";
```

```ts
export * from "./foo.js";
```

```ts
await import("./foo.tsx");
```

Examples of **correct** code for this rule:

```ts
import { foo } from "./foo";
```

```ts
export * from "./foo";
```

```ts
await import("./foo");
```

## Options

This rule does not accept options.
