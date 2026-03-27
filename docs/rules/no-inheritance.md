# `no-inheritance`

Disallow `extends` on classes and interfaces, except for the documented recursive-interface workaround.

## Rule details

There is no way to distinguish objects supporting parent and child interfaces at runtime safely.

Except where it's required to untie type recursion. For example `type Foo = A<Foo>` would only work as `interface Foo extends A<Foo> {}`

Overriding is allowed in JS, but Liskov substitution is not guaranteed.

Examples of **incorrect** code for this rule:

```ts
class Foo extends Bar {}
```

```ts
interface Foo extends Bar {}
```

Examples of **correct** code for this rule:

```ts
interface Foo extends A<Foo> {}
```

## Options

This rule does not accept options.
