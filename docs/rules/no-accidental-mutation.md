# `no-accidental-mutation`

Disallow in-place `.sort()`, `.reverse()`, and `.splice()` on non-fresh arrays unless mutability is required for performance.

## Rule details

Clone arrays before `.sort()`, `.reverse()`, `.splice()`: `[...arr].sort()`

Examples of **incorrect** code for this rule:

```ts
values.sort();
```

```ts
values.reverse();
```

```ts
values.splice(0, 1);
```

Examples of **correct** code for this rule:

```ts
[...values].sort();
```

```ts
values.slice().reverse();
```

## Options

This rule does not accept options.

## When not to use it

Disable this rule when an algorithm requires in-place array mutation for performance.
