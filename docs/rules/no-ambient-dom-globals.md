# `no-ambient-dom-globals`

Disallow the confusing ambient browser-global surface.

## Rule details

Ban ambient DOM declarations (use of global `name` etc; find existing package that does this and follow suit).

Examples of **incorrect** code for this rule:

```ts
name;
```

```ts
blur;
```

Examples of **correct** code for this rule:

```ts
const name = 1;
name;
```

```ts
const window = { name: 1 };
window.name;
```

```ts
({ name: 1 });
```

## Options

This rule does not accept options.
