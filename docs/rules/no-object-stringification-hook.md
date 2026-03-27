# `no-object-stringification-hook`

Disallow runtime `.toString` and `.toJSON`, and defining `toString` and `toJSON` hooks on objects and classes.

## Rule details

These obfuscate results of `console.log`, making objects different depending on how they're logged (`util.inspect` wouldn't use them). Worse, they might cause `JSON.stringify` to return unexpected results, and it will be very hard to trace to the source.

Examples of **incorrect** code for this rule:

```ts
const value = { toString: () => "x" };
```

```ts
class Value {
  toJSON() {
    return "x";
  }
}
```

```ts
value["toString"] = () => "x";
```

```ts
value.toString();
```

```ts
const stringify = value.toString;
```

Examples of **correct** code for this rule:

```ts
interface Value {
  toString(): string;
}
```

```ts
const value = { name: "x" };
```

## Options

This rule does not accept options.
