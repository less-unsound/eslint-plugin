import { ruleTester } from "../test/rule-tester.js";
import { noParamAssignRule } from "./no-param-assign.js";

ruleTester.run("no-param-assign", noParamAssignRule, {
  valid: [
    {
      code: "const setValue = (value: number): number => value + 1;"
    },
    {
      code: "const setValue = ({ value }: { readonly value: number }): number => value + 1;"
    }
  ],
  invalid: [
    {
      code: "const setValue = (value: number): number => { value = value + 1; return value; };",
      errors: [
        {
          messageId: "forbiddenParamAssign"
        }
      ]
    },
    {
      code: "const setValue = ({ value }: { readonly value: number }): number => { value += 1; return value; };",
      errors: [
        {
          messageId: "forbiddenParamAssign"
        }
      ]
    }
  ]
});
