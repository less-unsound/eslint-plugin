import { ruleTester } from "../test/rule-tester.js";
import { noEvalRule } from "./no-eval.js";

ruleTester.run("no-eval", noEvalRule, {
  valid: [
    {
      code: "const value = read();"
    },
    {
      code: "const evalResult = evalValue(code);"
    },
    {
      code: "const value = obj.eval(code);"
    }
  ],
  invalid: [
    {
      code: "eval(code);",
      errors: [
        {
          messageId: "forbiddenEval"
        }
      ]
    },
    {
      code: "eval?.(code);",
      errors: [
        {
          messageId: "forbiddenEval"
        }
      ]
    }
  ]
});
