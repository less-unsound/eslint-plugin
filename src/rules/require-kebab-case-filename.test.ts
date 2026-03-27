import { ruleTester } from "../test/rule-tester.js";
import { requireKebabCaseFilenameRule } from "./require-kebab-case-filename.js";

ruleTester.run(
  "require-kebab-case-filename",
  requireKebabCaseFilenameRule,
  {
    valid: [
      {
        code: "const value = 1;",
        filename: "/Repo Root/Some Package/src/foo-bar.ts"
      },
      {
        code: "const value = 1;",
        filename: "/Repo Root/Some Package/src/foo-bar.test.ts"
      },
      {
        code: "const value = 1;",
        filename: "/Repo Root/Some Package/src/foo-bar.d.ts"
      },
      {
        code: "const value = 1;",
        filename: "/Repo Root/Some Package/src/index.ts"
      },
      {
        code: "const value = 1;",
        filename: "<input>"
      }
    ],
    invalid: [
      {
        code: "const value = 1;",
        filename: "/Repo Root/Some Package/src/fooBar.ts",
        errors: [
          {
            messageId: "nonKebabCaseFilename"
          }
        ]
      },
      {
        code: "const value = 1;",
        filename: "/Repo Root/Some Package/src/Foo.ts",
        errors: [
          {
            messageId: "nonKebabCaseFilename"
          }
        ]
      },
      {
        code: "const value = 1;",
        filename: "/Repo Root/Some Package/src/foo_bar.ts",
        errors: [
          {
            messageId: "nonKebabCaseFilename"
          }
        ]
      },
      {
        code: "const value = 1;",
        filename: "/Repo Root/Some Package/src/foo bar.ts",
        errors: [
          {
            messageId: "nonKebabCaseFilename"
          }
        ]
      }
    ]
  }
);
