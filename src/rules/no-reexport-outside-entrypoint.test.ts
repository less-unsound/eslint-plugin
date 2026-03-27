import { fileURLToPath } from "node:url";
import { ruleTester } from "../test/rule-tester.js";
import { noReexportOutsideEntrypointRule } from "./no-reexport-outside-entrypoint.js";

const fixtureUrl = new URL("../test/fixtures/no-reexport-outside-entrypoint/", import.meta.url);
const packageWithExportsDir = fileURLToPath(new URL("package-with-exports/src/", fixtureUrl));
const packageWithMainDir = fileURLToPath(new URL("package-with-main/src/", fixtureUrl));

ruleTester.run("no-reexport-outside-entrypoint", noReexportOutsideEntrypointRule, {
  valid: [
    {
      code: 'export * from "./foo";',
      filename: packageWithExportsDir + "index.ts"
    },
    {
      code: 'export { foo } from "./foo";',
      filename: packageWithExportsDir + "foo.ts"
    },
    {
      code: 'export * from "./foo";',
      filename: packageWithMainDir + "index.ts"
    },
    {
      code: "const foo = 1;\nexport { foo };",
      filename: packageWithExportsDir + "internal.ts"
    },
    {
      code: 'export * from "./foo";',
      filename: "/tmp/no-package/reexport.ts"
    }
  ],
  invalid: [
    {
      code: 'export * from "./foo";',
      filename: packageWithExportsDir + "internal.ts",
      errors: [
        {
          messageId: "forbiddenReexportOutsideEntrypoint"
        }
      ]
    },
    {
      code: 'export { foo } from "./foo";',
      filename: packageWithMainDir + "other.ts",
      errors: [
        {
          messageId: "forbiddenReexportOutsideEntrypoint"
        }
      ]
    }
  ]
});
