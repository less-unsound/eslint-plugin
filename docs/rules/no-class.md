# `no-class`

Disallow `class` declarations and expressions.

## Rule details

OOP in TypeScript just doesn't work.

- In TS `private` is only a type system feature, and all the "private" fields are globally accessible at runtime.
- Objects have part of their description in `prototype`, and can't be worked with as regular objects.
- Methods don't store a reference to `this` in their closure and take it from object syntactically, i.e., `x.f()` would use `x` as `this`. It means `const { f } = x; f();` will be a runtime error, and TypeScript would emit no error here at compile time.
- TypeScript doesn't statically ensure that OOP actually works. For example, you can easily break Liskov's substitution principle with class implementations.

If a `class` is converted into a regular function, all the fields are correctly private; accessing them requires no `this.` prefix, and in most frequent cases, the only exposed method can be returned directly.

```typescript
class Foo {
    private y: number;
    constructor(_y: number) {
        this.y = _y;
    }
    bar(x: number) {
        return x + y;
    }
}

const Foo = (y: number) => {
    const bar = (x: number) => x + y;
    return { bar };
};
// nobody can ever access `y` now: it's actually private

const Foo = (y: number) => (x: number) => x + y;
```

The only case when `class` might actually be useful is if you create billions of objects. `prototype` is a single pointer to an object with methods for all the instances of the class, while the approach above will create objects with methods 

Examples of **incorrect** code for this rule:

```ts
class Foo {}
```

```ts
const Foo = class {};
```

Examples of **correct** code for this rule:

```ts
class Foo extends Bar {}
```

## Options

This rule does not accept options.
