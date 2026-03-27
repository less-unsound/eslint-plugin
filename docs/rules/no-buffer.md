# `no-buffer`

Disallow global `Buffer` types and values.

## Rule details

`Buffer` is Node's old, quirky and non-portable type, that has to be polyfilled if the code is ever used in the browser. Use `Uint8Array` instead.

Examples of **incorrect** code for this rule:

```ts
const value = Buffer.from("x");
```

```ts
const value: Buffer = data;
```

Examples of **correct** code for this rule:

```ts
const value = new Uint8Array();
```

```ts
const value: Uint8Array = data;
```

## Options

This rule does not accept options.
