# `no-global-context`

Disallow `this` and explicit global-object identifiers.

## Rule details

Don't use OOP. Don't mutate global scopes.

Examples of **incorrect** code for this rule:

```ts
const value = this;
```

```ts
interface Value {
  value: this;
}
```

```ts
const value = globalThis;
```

```ts
const value = window;
```

```ts
const value = self;
```

```ts
const value = global;
```

Examples of **correct** code for this rule:

```ts
const globalThis = 1;
const value = globalThis;
```

```ts
const value = { globalThis: 1, window: 2, self: 3, global: 4 };
```

## Options

This rule does not accept options.
