# `no-getter-setter`

Disallow getters and setters in objects, classes, and interfaces.

## Rule details

These break the type safety, are incorrectly handled in debuggers, and lead to unexpected heisenbugs.

Use explicit `getFoo` and `setFoo` functions or avoid mutable state.

Examples of **incorrect** code for this rule:

```ts
const value = {
  get foo() {
    return 1;
  }
};
```

```ts
class Value {
  set foo(value: number) {}
}
```

```ts
interface Value {
  get foo(): number;
}
```

Examples of **correct** code for this rule:

```ts
const value = { foo: 1 };
```

```ts
class Value {
  foo(): number {
    return 1;
  }
}
```

```ts
interface Value {
  foo(): number;
}
```

## Options

This rule does not accept options.
