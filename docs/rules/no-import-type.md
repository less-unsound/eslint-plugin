# `no-import-type`

Disallow `import()` types.

## Rule details

Imports go into the header of the file.

Examples of **incorrect** code for this rule:

```ts
type Value = import("foo").Foo;
```

Examples of **correct** code for this rule:

```ts
import { type Foo } from "foo";

type Value = Foo;
```

## Options

This rule does not accept options.
