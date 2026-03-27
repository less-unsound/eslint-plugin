# Less Unsound ESLint Plugin

Enforce less unsound TypeScript subset.

## Install

```sh
pnpm add -D @less-unsound/eslint-plugin eslint typescript @typescript-eslint/parser
```

## How to use

Some of these rules are overly restrictive, and it's intentional. If you have to break them, the plan is:

- create a separate file, or even a package, that will be a sandbox for this unsafe feature use;
- make the code as minimal and abstract as possible, so that it can be reused in all similar places;
- put that code into a sandbox file, and `eslint-ignore` this problem there;
- make sure to put an explanation, why you had to do this:
  - for bugs in TypeScript, find or create GitHub issue and link it;
  - for bugs in EcmaScript design, write why they're impossible to type properly at all;
- thoroughly cover this code with tests
  - for type helpers, make sure that arbitrary types make them work the way you intended;
  - for runtime helpers, write positive/negative tests, use red/green TDD to ensure tests actually fail if you implement it in a different way, try to add property-based tests with `fast-check` and compute coverage if the fix is sufficiently large.

### Example 1

`["a", "b"].includes(x)` doesn't narrow `x` to `'a' | 'b'`. Instead of multiple `x as ('a' | 'b')` over the whole codebase, we can define a wrapper once in `sandbox/array.ts`:

```typescript
// `extends string` is usually a bad idea, but `key is K` is an even worse idea
export const includes = <const K extends string>(
  keys: readonly K[],
  key: string,
): key is K => {
  // we have to do this, otherwise, the next line will complain that `key` isn't `K`
  const keys1: readonly string[] = keys;
  return keys1.includes(key);
};
```

### Example 2

```typescript
export const object = <T>(children: { [K in keyof T]: Foo<T[K]> }): Foo<T> => { ... };
```

- There is no way to type this properly, because, unlike real types, mapped object types have neither proper introduction nor elimination forms.
- Even though the implementation looks correct, it's overly broad: `T` might be a `number` as well. Possibly a `<T extends object>` would make it better, but most likely it will lead to even more problems.
- Worse, it might work as you expected when `object({ ... })` call is allowed to infer type of `T`, but will fail in a horrible way if someone does `object</* unexpected type */>({ ... })`.
- In fact, this whole exception from the rules for `object` might lead to huge problems, because its correctness might rely on the field order in objects, which is not guaranteed by EcmaScript standard.

Probably, a better approach would be a builder that adds fields one by one:

```typescript
export const Point = object
  .add('x', number)
  .add('y', number)
  .end;
```

which is barely, but typeable without exceptions.

TL/DR: you must absolutely know what you're doing when you add exceptions.

## Usage

```ts
import { configs } from "@less-unsound/eslint-plugin";

export default [configs.recommended];
```

Manual flat-config usage:

```ts
import { plugin } from "@less-unsound/eslint-plugin";

export default [
  {
    plugins: {
      "@less-unsound": plugin
    },
    rules: {
      "@less-unsound/no-let": "error",
      "@less-unsound/no-any": "error",
      "@less-unsound/no-switch": "warn"
    }
  }
];
```

## Exports

- `plugin`
- `rules`
- `configs.mutability`
- `configs.naming`
- `configs.oop`
- `configs.syntax`
- `configs.types`
- `configs.recommended`

## Rule Groups

- `configs.mutability`: mutability rules and readonly requirements
- `configs.naming`: identifier, boolean, filename, and function naming rules
- `configs.oop`: class, inheritance, proxy, prototype, and similar object-model rules
- `configs.syntax`: runtime and syntax rules
- `configs.types`: type-system rules
- `configs.recommended`: the default combined rule set

Per-rule documentation lives in [docs/rules](./docs/rules).
