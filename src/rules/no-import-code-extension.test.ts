import { ruleTester } from "../test/rule-tester.js";
import { noImportCodeExtensionRule } from "./no-import-code-extension.js";

ruleTester.run("no-import-code-extension", noImportCodeExtensionRule, {
  valid: [
    {
      code: 'import { foo } from "./foo";'
    },
    {
      code: 'export { foo } from "./foo";'
    },
    {
      code: 'export * from "./foo";'
    },
    {
      code: 'await import("./foo");'
    },
    {
      code: 'await import(`./foo`);'
    },
    {
      code: 'import config from "./foo.json";'
    }
  ],
  invalid: [
    {
      code: 'import { foo } from "./foo.ts";',
      errors: [
        {
          data: {
            extension: ".ts",
            specifier: "./foo.ts"
          },
          messageId: "forbiddenImportCodeExtension"
        }
      ]
    },
    {
      code: 'export { foo } from "./foo.tsx";',
      errors: [
        {
          data: {
            extension: ".tsx",
            specifier: "./foo.tsx"
          },
          messageId: "forbiddenImportCodeExtension"
        }
      ]
    },
    {
      code: 'export * from "./foo.js";',
      errors: [
        {
          data: {
            extension: ".js",
            specifier: "./foo.js"
          },
          messageId: "forbiddenImportCodeExtension"
        }
      ]
    },
    {
      code: 'await import("./foo.ts");',
      errors: [
        {
          data: {
            extension: ".ts",
            specifier: "./foo.ts"
          },
          messageId: "forbiddenImportCodeExtension"
        }
      ]
    },
    {
      code: 'await import(`./foo.tsx`);',
      errors: [
        {
          data: {
            extension: ".tsx",
            specifier: "./foo.tsx"
          },
          messageId: "forbiddenImportCodeExtension"
        }
      ]
    }
  ]
});
