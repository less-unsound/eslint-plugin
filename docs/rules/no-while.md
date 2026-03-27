# `no-while`

Disallow `while` loops and `do ... while` loops.

## Rule details

Every iteration must have at least an explicit "fuel" check. `while` _always_ eventually leads to infinite loops in production. Do you want the whole server or browser to hang on your code?

Examples of **incorrect** code for this rule:

```ts
while (value < 1) {
  value += 1;
}
```

```ts
do {
  value += 1;
} while (value < 1);
```

Examples of **correct** code for this rule:

```ts
for (const value of values) {
  console.log(value);
}
```

## Options

This rule does not accept options.
