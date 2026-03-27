import { ruleTester } from "../test/rule-tester.js";
import { requireReturnTypeRule } from "./require-return-type.js";

const tsconfigRootDir = new URL("../../", import.meta.url).pathname;

const typeAwareLanguageOptions = {
  parserOptions: {
    projectService: {
      allowDefaultProject: ["src/test/require-return-type.ts"]
    },
    tsconfigRootDir
  }
};

ruleTester.run(
  "require-return-type",
  requireReturnTypeRule,
  {
    valid: [
      {
        code: "function value(): number { return 1; }",
        filename: "src/test/require-return-type.ts",
        languageOptions: typeAwareLanguageOptions
      },
      {
        code: "const value = (): number => 1;",
        filename: "src/test/require-return-type.ts",
        languageOptions: typeAwareLanguageOptions
      },
      {
        code: "const value = function (): number { return 1; };",
        filename: "src/test/require-return-type.ts",
        languageOptions: typeAwareLanguageOptions
      },
      {
        code: "function make() { return (value: number): number => value; }",
        filename: "src/test/require-return-type.ts",
        languageOptions: typeAwareLanguageOptions
      },
      {
        code: "const make = () => (value: number): number => value;",
        filename: "src/test/require-return-type.ts",
        languageOptions: typeAwareLanguageOptions
      },
      {
        code: "declare function value(): number;",
        filename: "src/test/require-return-type.ts",
        languageOptions: typeAwareLanguageOptions
      },
      {
        code: "const values = [1].map(value => value + 1);",
        filename: "src/test/require-return-type.ts",
        languageOptions: typeAwareLanguageOptions
      },
      {
        code: "const use = (onValue: () => number): number => onValue(); const value = use(() => 1);",
        filename: "src/test/require-return-type.ts",
        languageOptions: typeAwareLanguageOptions
      },
      {
        code: "const use = (onValue: () => number): number => onValue(); const value = use(function () { return 1; });",
        filename: "src/test/require-return-type.ts",
        languageOptions: typeAwareLanguageOptions
      }
    ],
    invalid: [
      {
        code: "function value() { return 1; }",
        filename: "src/test/require-return-type.ts",
        languageOptions: typeAwareLanguageOptions,
        errors: [
          {
            messageId: "missingReturnType"
          }
        ]
      },
      {
        code: "const value = () => 1;",
        filename: "src/test/require-return-type.ts",
        languageOptions: typeAwareLanguageOptions,
        errors: [
          {
            messageId: "missingReturnType"
          }
        ]
      },
      {
        code: "const value = function () { return 1; };",
        filename: "src/test/require-return-type.ts",
        languageOptions: typeAwareLanguageOptions,
        errors: [
          {
            messageId: "missingReturnType"
          }
        ]
      },
      {
        code: "function make(): (value: number) => number { return (value: number): number => value; }",
        filename: "src/test/require-return-type.ts",
        languageOptions: typeAwareLanguageOptions,
        errors: [
          {
            messageId: "forbiddenHigherOrderReturnType"
          }
        ]
      },
      {
        code: "const make = (): ((value: number) => number) => (value: number): number => value;",
        filename: "src/test/require-return-type.ts",
        languageOptions: typeAwareLanguageOptions,
        errors: [
          {
            messageId: "forbiddenHigherOrderReturnType"
          }
        ]
      }
    ]
  }
);
