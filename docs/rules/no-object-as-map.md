# `no-object-as-map`

Disallow using plain objects as dynamic maps.

## Rule details

Objects have a set of quirks: numeric keys get listed before string keys, key order is not guaranteed, keys can be inherited from `Object.prototype`, and the `__proto__` key can be used for prototype pollution exploits. Unless a high performance of hashmap is needed, or an object is statically defined, use `Map`.

Examples of **incorrect** code for this rule:

```ts
const map = {};
const value = map[key];
```

```ts
const map = {};
map[key] = value;
```

```ts
const map = Object.create(null);
const value = map[key];
```

```ts
({})[key];
```

Examples of **correct** code for this rule:

```ts
const map = {};
const value = map.foo;
```

```ts
const map = {};
const value = map["foo"];
```

```ts
const map = new Map<string, number>();
const value = map.get(key);
```

## Options

This rule does not accept options.
