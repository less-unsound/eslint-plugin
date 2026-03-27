import { ruleTester } from "../test/rule-tester.js";
import { requireFunctionVerbRule } from "./require-function-verb.js";

const tsconfigRootDir = new URL("../../", import.meta.url).pathname;

const typeAwareLanguageOptions = {
  parserOptions: {
    projectService: {
      allowDefaultProject: ["src/test/require-function-verb.ts"]
    },
    tsconfigRootDir
  }
};

ruleTester.run("require-function-verb", requireFunctionVerbRule, {
  valid: [
    {
      code: "const getValue = () => 1;",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions
    },
    {
      code: "const collectItems = () => [];",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions
    },
    {
      code: "const assignNode = () => 1;",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions
    },
    {
      code: 'const emitNode = (): string => "node";',
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions
    },
    {
      code: "const convValue = () => 1;",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions
    },
    {
      code: "const elabExpr = () => 1;",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions
    },
    {
      code: "const main = () => 1;",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions
    },
    {
      code: "const guardNode = () => 1;",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions
    },
    {
      code: 'const toNumber = (value: string): number => Number(value);',
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions
    },
    {
      code: "const checkReady = (): boolean => true;",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions
    },
    {
      code: "const eq = (): boolean => true;",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions
    },
    {
      code: "const neq = (): boolean => false;",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions
    },
    {
      code: "const expectValue = (): void => undefined;",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions
    },
    {
      code: "const extendEnv = () => 1;",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions
    },
    {
      code: "const withStd = () => 1;",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions
    },
    {
      code: "const onClick = () => undefined;",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions
    },
    {
      code: "const FormatValue = () => 1;",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions
    },
    {
      code: "const _value = () => 1;",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions
    }
  ],
  invalid: [
    {
      code: "const value = () => 1;",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions,
      errors: [
        {
          messageId: "missingFunctionVerb"
        }
      ]
    },
    {
      code: "const convertValue = (value: string): number => Number(value);",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions,
      errors: [
        {
          data: {
            name: "convertValue",
            suggestedName: "toValue"
          },
          messageId: "convertMustUseTo"
        }
      ]
    },
    {
      code: "const isReady = () => true;",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions,
      errors: [
        {
          data: {
            name: "isReady",
            suggestedName: "checkReady"
          },
          messageId: "predicateMustStartWithCheck"
        }
      ]
    },
    {
      code: "const validateReady = (): boolean => true;",
      filename: "src/test/require-function-verb.ts",
      languageOptions: typeAwareLanguageOptions,
      errors: [
        {
          data: {
            name: "validateReady",
            suggestedName: "checkReady"
          },
          messageId: "predicateMustStartWithCheck"
        }
      ]
    }
  ]
});
