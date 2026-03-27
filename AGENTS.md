- Do not stop at the middle of the job. Do not prompt user to run anything out of sandbox in the middle of the long job.
- Never send user commands longer than one line; if longer flow is needed, use a temporary `.sh` file named `temp.sh`, do not commit it, provide a one-line command to run it, and remove it only after the user confirms it was run or is no longer needed.
- Do not change unrelated files or dependencies outside the user-specified scope; if a broader cleanup is beneficial, ask first.
- Do not stop, kill, or restart running processes without explicit user approval.
- Commit checkpoint after every self-contained change:
  - Finish one self-contained change.
  - Run required checks.
  - Run `git status --short`.
  - If there are related unstaged/staged edits, commit immediately.
  - Start the next task only after the commit is complete.
- NPM packages must be installed with their corresponding `@types/` packages, if they don't have built-in types.
- Violations of the styleguide are unacceptable, unless user specifically said to do such a violation.
- You are running inside of sandbox. When `pnpm install` is needed, ask user to run it. Do not try to find a way to continue without `pnpm install`: do not create bogus symlinks, do not edit `tsconfig.json` with `"paths"`, do not define `.d.ts` files instead of using proper typings from `node_modules`.
- You're allowed to mute eslint errors and warnings, if you've got precise user statement about why it's allowed. The `eslint-ignore` must include that reason. Doing so without user consent will be severely punished. You're absolutely banned from adding these without user consent.
- Use Conventional Commits.

## TypeScript

- Prefer the most simple and basic language features.
  - Variables `const x = f()`
  - Objects `{ foo: 'bar' }`, `x.foo`, `const { foo } = x;`
  - Statements `if`, `for`, `return`
  - Aliases `type F<T> = { foo: T }`
  - Simple types `number`, `string`, `boolean`
  - Literal types `1`, `"hello"`
  - Unions of literal types `1 | 2 | 3`
  - Tagged unions `{ kind: 'A', a: number } | { kind: 'B' }`
- Prefer freezing highly reused objects with `Object.freeze`.
- Avoid the `void` type. It usually appears when functions are not pure, and have side effects. Most functions should be pure. Try to move side-effecting parts of the application up the call stack, so that most of the call tree is side-effect-free.
- Avoid passing functions directly to built-in functions `.map(foo)`. Example: `["10", "10", "10"].map(parseInt) = [10, NaN, 2]`. Prefer `.map(x => foo(x))`.
- If a `string` has more structure to it than "absolutely arbitrary string, even empty", it's not just a `string`, and must have a different type. If you get them from an external interface, convert them into more specific types immediately.
  - Parse and create URLs with `new URL()`.
  - Parse and create query parameters with `URLSearchParams`.
  - Create or find a library for working with FS paths.
  - Binary or non-UTF strings are `Uint8Array`, not `string`.
  - If only a few strings are allowed, use a string literal union: `"A" | "B"`.
  - Produce AST with `@babel/types` or `typescript`.
- If there are objects that have more structure to them than merely listed in the type, that extra structure must be ensured in a constructor, object must be `Object.freeze`d, and must get an extra `unique symbol` property to prevent creating it otherwise.
- Use opaque and branded types as much as possible to ensure that extra structure. If opaque/branded types are passed over serialization/RPC boundary, there must be schema constructors for them that do the same kind of checks.
- Ensure `boolean` actually means a `boolean`. If there is a boolean parameter or field, sometimes it might not be obvious what does it mean. Prefer `'foo' | 'bar'` if they don't have to be `'foo' | 'not-foo'`.

## Architecture

- Do not mix things. A single file must serve a single purpose. Ask yourself "does it fit here?" For example, if there are helpers to convert into camelCase in a code generator, they do not belong there, because it generates code, and working with strings is a more abstract low-level aspect. Split such things into a separate file.
- Always think about the app as if it was made of bricks. Part of an app must correspond to contained self-sufficient fragment. Brick being "on top of other bricks" would mean there are imports from another fragment. Every brick must serve a very clean purpose that can easily be verbalized.
- Well-architected parts of an application only `export` one (or sometimes few) function and type(s) for its return value. All of these functions are used by the parts that build on top of it. Neither of internal functions or types are exposed.
- Good code obeys locality principle: a single semantic change involves files that are close to each other on the filesystem, and declarations that are close to each other in the single file.
- Good code is immutable: if it's implemented well and doesn't have unnecessary detail, there will be no need to change it.
- Good code is short: real-life systems do not involve 8000 lines of detail; if that happens it's very likely just accidental complexity. You must take time to simplify the code as much as possible, and reuse as much common structure as possible, so that it stays short.
- Good code is generic. Polymorphic/generic code obeys parametricity: it proves that for all values it works the same. In real world, scenarios when nested constructors have to be explored, or "what happens if we put X into Y" problems are almost always a sign that there must be something generic to ensure this kind of interplay between (likely) unrelated things just doesn't happen.
- Good code is based in research. Do not invent things that were invented before, prefer copying known-to-be-good solutions from scientific literature. Do not consider software engineering (i.e. libraries) good: most likely they weren't even peer-reviewed.

## Filesystem

- Names of files must be as short as possible.
- Linked files have to have same names: `foo.tsx` and `foo.css`.

## package.json

- Every module must have a script `check` that runs all scripts with names that match `"check": "pnpm run --parallel --aggregate-output --reporter=append-only \"/^check:.*/\""`
- `check:test` script must run tests.
- `check:lint` script must run eslint.
- `check:knip` script must run knip.
- `check:types` script must run TypeScript in no-emit mode.
- `check:spell` script must run cspell from npm.
- `check:links` script must run a link checker.
- There must be a `fix` script and corresponding `fix:...` scripts for the rest of the checks, that autofix possible errors.
- Don't forget to put into devDependencies `@types/node` in all packages that use Node's modules.
- All scripts must be executable on Linux, MacOS and Windows. Use `cross-env` to pass env variables if needed.
- Do not pass env variables into executables that we have code control of.
- Prefer TypeScript libraries. Avoid native libraries.
- Do not add scripts to `package.json` except if absolutely needed. For example, being able to run `pnpm start` for the main package in a repo is such a need. Pretty much nothing else is.
- Do not use sed, awk, perl, python, bash, zsh, sh for scripting. Only TypeScript is allowed for scripting. If you have to use *sh, use a minimal wrapper around TypeScript code that implements the logic.

## Other

- Do not introduce shims for no reason. No `const foo = bar;` just because things were renamed, no `const foo = () => fooByKind()`.
- Do not use long names for variables and functions. Keep names semantic and clear, but do not try to put the whole history into them. If there are more than 2 words in the name, something is very likely wrong there.
- Do not nest ternaries. Most of the time it means you need to use a matcher function.
- Do not create `x => f(x)` functions unless really needed (for example, if `f` is defined below in the file, and there is no way to sort the file due to mutual recursion).
- Definitions must be topologically sorted, so that the number of definitions that require explicit type annotation is minimized.
- If `import {}` becomes so long it's multiline, use `import * as`
