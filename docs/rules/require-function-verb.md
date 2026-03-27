# `require-function-verb`

Require camelCase function variable names to start with an allowed verb prefix.

## Rule details

Names of variables that store a function must start with a verb, that store an object, string, number - with a noun.
Predicate functions must start with `check`.
Use `to` instead of `convert`.
Event handlers must start with `on*`.
The allowlist includes short established prefixes such as `assign`, `collect`, `emit`, `conv`, `elab`, `eq`, `neq`, `expect`, `extend`, `guard`, `main`, and `with`.

Examples of **incorrect** code for this rule:

```ts
const value = () => 1;
```

```ts
const convertValue = (value: string): number => Number(value);
```

```ts
const isReady = () => true;
```

Examples of **correct** code for this rule:

```ts
const getValue = () => 1;
```

```ts
const collectItems = () => [];
```

```ts
const assignNode = () => 1;
```

```ts
const emitNode = (): string => "node";
```

```ts
const main = () => 1;
```

```ts
const guardNode = () => 1;
```

```ts
const toNumber = (value: string): number => Number(value);
```

```ts
const checkReady = () => true;
```

```ts
const eq = () => true;
```

```ts
const expectValue = (): void => undefined;
```

```ts
const extendEnv = () => 1;
```

```ts
const withStd = () => 1;
```

```ts
const onClick = () => undefined;
```

## Options

This rule does not accept options.
