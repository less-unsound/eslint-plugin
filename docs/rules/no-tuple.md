# `no-tuple`

Disallow tuple types.

## Rule details

Tuples are supposed to be used in a very generic code where individual elements of tuples bear no meaning at all. For the rest of the code, use objects.

TS gives them minimal distinction from arrays, and the type system is broken around them. Occasionally, for performance reasons, tuples might be a better option than objects.

Examples of **incorrect** code for this rule:

```ts
type Pair = [string, number];
```

```ts
type Pair = readonly [string, number];
```

Examples of **correct** code for this rule:

```ts
type Pair = { left: string; right: number };
```

## Options

This rule does not accept options.
