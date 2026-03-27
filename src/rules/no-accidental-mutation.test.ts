import { ruleTester } from "../test/rule-tester.js";
import { noAccidentalMutationRule } from "./no-accidental-mutation.js";

ruleTester.run("no-accidental-mutation", noAccidentalMutationRule, {
  valid: [
    {
      code: "[...values].sort();"
    },
    {
      code: "values.slice().reverse();"
    },
    {
      code: "Array.from(values).splice(0, 1);"
    },
    {
      code: "[1, 2].sort();"
    }
  ],
  invalid: [
    {
      code: "values.sort();",
      errors: [
        {
          messageId: "forbiddenAccidentalMutation"
        }
      ]
    },
    {
      code: "values.reverse();",
      errors: [
        {
          messageId: "forbiddenAccidentalMutation"
        }
      ]
    },
    {
      code: "values.splice(0, 1);",
      errors: [
        {
          messageId: "forbiddenAccidentalMutation"
        }
      ]
    },
    {
      code: "values.filter(Boolean).sort().reverse();",
      errors: [
        {
          messageId: "forbiddenAccidentalMutation"
        }
      ]
    }
  ]
});
