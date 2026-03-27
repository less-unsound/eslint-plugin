# `no-switch`

Disallow `switch` statements.

## Rule details

Switch statements require extra considerations for unexpected passthrough, are bulky, and take an extra function to make exhaustive checks work.

Examples of **incorrect** code for this rule:

```ts
switch (value) {
  case "a":
    return 1;
  default:
    return 2;
}
```

Examples of **correct** code for this rule:

```ts
if (value === "a") {
  return 1;
}

return 2;
```

## Options

This rule does not accept options.
