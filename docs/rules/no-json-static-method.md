# `no-json-static-method`

Disallow `JSON.parse` and `JSON.stringify`, including access through `globalThis.JSON` and `window.JSON`.

## Rule details

Both functions have very broken types: `JSON.stringify(undefined) = undefined`, but the return type is `string`. Now you have `undefined` in a `string`!

Always use `zod` or equivalent schema library in every case there is an `unknown`: results of `JSON.parse`, messages sent from `postMessage`, JSONs stored in localstorage, JSONs in history objects (the part of location that is not displayed in the URL), for reading configs from files (such as `package.json`), `process.env` etc.

Put all calls to `JSON.*` methods in that sandbox and `eslint-ignore` them.

Examples of **incorrect** code for this rule:

```ts
JSON.parse(value);
```

```ts
JSON["stringify"](value);
```

```ts
globalThis.JSON.parse(value);
```

Examples of **correct** code for this rule:

```ts
const JSON = { parse: () => 1 };
JSON.parse(value);
```

```ts
const globalThis = { JSON: { stringify: () => "" } };
globalThis.JSON.stringify(value);
```

```ts
const window = { JSON: { parse: () => 1 } };
window.JSON.parse(value);
```

## Options

This rule does not accept options.
