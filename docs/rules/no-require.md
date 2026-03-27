# `no-require`

Disallow `require()` and Node `createRequire()`.

## Rule details

Use `import`. It's (current year) now.

Examples of **incorrect** code for this rule:

```ts
require("node:fs");
```

```ts
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
```

Examples of **correct** code for this rule:

```ts
import { readFile } from "node:fs/promises";
```

## Options

This rule does not accept options.
