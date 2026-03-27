# `require-kebab-case-filename`

Require filenames to be in kebab-case.

## Rule details

All filenames must be in kebab-case. It's Node's standard, meant to make the code safe to run on all operating systems (ahem, Windows that doesn't distinguish case in file names).

Yes, even source code of TypeScript doesn't use kebab case. Yes, they've already made their repo impossible to `git clone` on Windows with these. Wait, doesn't MS use their own OS for development?

Examples of **incorrect** code for this rule:

```ts
// filename: fooBar.ts
const value = 1;
```

```ts
// filename: foo_bar.ts
const value = 1;
```

Examples of **correct** code for this rule:

```ts
// filename: foo-bar.ts
const value = 1;
```

```ts
// filename: foo-bar.test.ts
const value = 1;
```

## Options

This rule does not accept options.
