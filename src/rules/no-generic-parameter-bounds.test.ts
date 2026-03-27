import { ruleTester } from "../test/rule-tester.js";
import { noGenericParameterBoundsRule } from "./no-generic-parameter-bounds.js";

ruleTester.run(
  "no-generic-parameter-bounds",
  noGenericParameterBoundsRule,
  {
    valid: [
      {
        code: "type Box<T> = T;"
      }
    ],
    invalid: [
      {
        code: "type Box<T extends string> = T;",
        errors: [
          {
            messageId: "forbiddenGenericParameterBounds"
          }
        ]
      },
      {
        code: "const value = <T extends string>(input: T): T => input;",
        errors: [
          {
            messageId: "forbiddenGenericParameterBounds"
          }
        ]
      }
    ]
  }
);
