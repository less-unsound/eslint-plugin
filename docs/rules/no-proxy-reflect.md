# `no-proxy-reflect`

Disallow the `Proxy` and `Reflect` global objects.

## Rule details

These break the type safety, are incorrectly handled in debuggers, and lead to unexpected heisenbugs.

Examples of **incorrect** code for this rule:

```ts
const value = Proxy;
```

```ts
const value = Reflect.apply(fn, thisArg, args);
```

```ts
const value = new Proxy(target, handler);
```

Examples of **correct** code for this rule:

```ts
const Proxy = createProxy();
```

```ts
const Reflect = createReflect();
```

```ts
const value = foo.Proxy;
```

## Options

This rule does not accept options.
