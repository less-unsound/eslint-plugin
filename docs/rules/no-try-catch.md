# `no-try-catch`

Disallow `try ... catch`.

## Rule details

`catch` is untyped: you get an `unknown`. Worse, most of the uses accidentally try to handle exceptions that they mustn't.

Every custom FooError must have its own `handleFooError()` exported next to it, that takes 2 functions corresponding to two `{}` of `try...catch`. The two functions must be `() => T` and `(error: FooError) => U`, and the result must be `T | U`. It handles errors of that type, and passes the rest through.

Examples of **incorrect** code for this rule:

```ts
try {
  return readFoo();
} catch (error) {
  if (error instanceof FooError) {
    return recoverFoo(error);
  }
  throw error;
}
```

Examples of **correct** code for this rule:

```ts
export const handleFooError = createErrorHandler(FooError);

const value = handleFooError(
  () => readFoo(),
  error => recoverFoo(error),
);
```

## Options

This rule does not accept options.
