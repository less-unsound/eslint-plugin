import { ruleTester } from "../test/rule-tester.js";
import { noBigintRule } from "./no-bigint.js";

ruleTester.run("no-bigint", noBigintRule, {
  valid: [
    {
      code: "const value = 1;"
    },
    {
      code: "const BigInt = () => 1; BigInt();"
    }
  ],
  invalid: [
    {
      code: "const value = 1n;",
      errors: [
        {
          messageId: "forbiddenBigInt"
        }
      ]
    },
    {
      code: "const value: bigint = 1 as never;",
      errors: [
        {
          messageId: "forbiddenBigInt"
        }
      ]
    },
    {
      code: "const value = BigInt(1);",
      errors: [
        {
          messageId: "forbiddenBigInt"
        }
      ]
    },
    {
      code: "const value = BigInt.asUintN(8, 1n);",
      errors: [
        {
          messageId: "forbiddenBigInt"
        },
        {
          messageId: "forbiddenBigInt"
        }
      ]
    }
  ]
});
