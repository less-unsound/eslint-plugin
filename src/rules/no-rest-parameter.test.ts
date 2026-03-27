import { ruleTester } from "../test/rule-tester.js";
import { noRestParameterRule } from "./no-rest-parameter.js";

ruleTester.run("no-rest-parameter", noRestParameterRule, {
  valid: [
    {
      code: "const join = (values: readonly string[]): string => values.join(\",\");"
    }
  ],
  invalid: [
    {
      code: "const join = (...values: string[]): string => values.join(\",\");",
      errors: [
        {
          messageId: "forbiddenRestParameter"
        }
      ]
    }
  ]
});
