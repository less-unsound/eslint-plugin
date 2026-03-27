import { ruleTester } from "../test/rule-tester.js";
import { noRequireRule } from "./no-require.js";

ruleTester.run("no-require", noRequireRule, {
  valid: [
    {
      code: 'import { readFile } from "node:fs/promises";'
    },
    {
      code: 'const require = (value: string): string => value; require("fs");'
    },
    {
      code: 'const createRequire = (value: string): string => value; createRequire("x");'
    },
    {
      code: 'import { createRequire } from "node:fs"; createRequire("x");'
    },
    {
      code: 'import * as module from "node:fs"; module.createRequire("x");'
    }
  ],
  invalid: [
    {
      code: 'require("node:fs");',
      errors: [
        {
          messageId: "forbiddenRequire"
        }
      ]
    },
    {
      code: 'import { createRequire } from "node:module"; createRequire(import.meta.url);',
      errors: [
        {
          messageId: "forbiddenCreateRequire"
        }
      ]
    },
    {
      code: 'import { createRequire as mk } from "module"; mk(import.meta.url);',
      errors: [
        {
          messageId: "forbiddenCreateRequire"
        }
      ]
    },
    {
      code: 'import * as module from "node:module"; module.createRequire(import.meta.url);',
      errors: [
        {
          messageId: "forbiddenCreateRequire"
        }
      ]
    }
  ]
});
