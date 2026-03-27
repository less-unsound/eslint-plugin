import { ruleTester } from "../test/rule-tester.js";
import { noExportDefaultRule } from "./no-export-default.js";

ruleTester.run("no-export-default", noExportDefaultRule, {
  valid: [
    {
      code: "export const value = 1;"
    }
  ],
  invalid: [
    {
      code: "export default 1;",
      errors: [
        {
          messageId: "forbiddenExportDefault"
        }
      ]
    },
    {
      code: "const value = 1; export { value as default };",
      errors: [
        {
          messageId: "forbiddenExportDefault"
        }
      ]
    }
  ]
});
