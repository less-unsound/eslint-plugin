# `no-prototype-access`

Disallow runtime access to `prototype` and `__proto__`.

## Rule details

Don't use a legacy form of OOP. It's even worse than just using OOP.

Examples of **incorrect** code for this rule:

```ts
const value = foo.prototype;
```

```ts
const value = foo["__proto__"];
```

```ts
const value = { prototype: 1 };
```

```ts
class Value { __proto__() {} }
```

Examples of **correct** code for this rule:

```ts
const prototype = createPrototype();
```

```ts
type Value = { prototype: string };
```

```ts
const value = foo[prototype];
```

## Options

This rule does not accept options.
