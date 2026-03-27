import { ruleTester } from "../test/rule-tester.js";
import { requireStringTemplateExpressionRule } from "./require-string-template-expression.js";

const tsconfigRootDir = new URL("../../", import.meta.url).pathname;

const typeAwareLanguageOptions = {
  parserOptions: {
    projectService: {
      allowDefaultProject: ["src/test/require-string-template-expression.ts"]
    },
    tsconfigRootDir
  }
};

ruleTester.run(
  "require-string-template-expression",
  requireStringTemplateExpressionRule,
  {
    valid: [
      {
        code: 'const value: string = "x"; const text = `${value}`;',
        filename: "src/test/require-string-template-expression.ts",
        languageOptions: typeAwareLanguageOptions
      },
      {
        code: 'type Value = "a" | "b"; declare const value: Value; const text = `${value}`;',
        filename: "src/test/require-string-template-expression.ts",
        languageOptions: typeAwareLanguageOptions
      },
      {
        code: 'type Value = string & { readonly brand: "value"; }; declare const value: Value; const text = `${value}`;',
        filename: "src/test/require-string-template-expression.ts",
        languageOptions: typeAwareLanguageOptions
      },
      {
        code: "const tag = (strings: TemplateStringsArray, value: number): number => value; const text = tag`${1}`;",
        filename: "src/test/require-string-template-expression.ts",
        languageOptions: typeAwareLanguageOptions
      },
      {
        code: 'const render = <Value extends string>(value: Value): string => `${value}`;',
        filename: "src/test/require-string-template-expression.ts",
        languageOptions: typeAwareLanguageOptions
      }
    ],
    invalid: [
      {
        code: "const value = 1; const text = `${value}`;",
        filename: "src/test/require-string-template-expression.ts",
        languageOptions: typeAwareLanguageOptions,
        errors: [
          {
            messageId: "nonStringTemplateExpression"
          }
        ]
      },
      {
        code: "const value = { n: 1 }; const text = `${value}`;",
        filename: "src/test/require-string-template-expression.ts",
        languageOptions: typeAwareLanguageOptions,
        errors: [
          {
            messageId: "nonStringTemplateExpression"
          }
        ]
      },
      {
        code: 'const value: string | number = 1; const text = `${value}`;',
        filename: "src/test/require-string-template-expression.ts",
        languageOptions: typeAwareLanguageOptions,
        errors: [
          {
            messageId: "nonStringTemplateExpression"
          }
        ]
      },
      {
        code: "const value = (x: number): number => x; const text = `${value}`;",
        filename: "src/test/require-string-template-expression.ts",
        languageOptions: typeAwareLanguageOptions,
        errors: [
          {
            messageId: "nonStringTemplateExpression"
          }
        ]
      }
    ]
  }
);
