# `no-import-rename`

Disallow renamed named imports.

## Rule details

Do not `import { Foo as Bar }` unless absolutely required. Renamed imports make it harder to debug. Prefer `import * as Foo` instead.

Examples of **incorrect** code for this rule:

```ts
import { foo as bar } from "./foo";
```

```ts
import { type Foo as Bar } from "./foo";
```

Examples of **correct** code for this rule:

```ts
import { foo } from "./foo";
```

```ts
import * as Foo from "./foo";
```

## Options

This rule does not accept options.
