import { ruleTester } from "../test/rule-tester.js";
import { noBufferRule } from "./no-buffer.js";

ruleTester.run("no-buffer", noBufferRule, {
  valid: [
    {
      code: "const value = new Uint8Array();"
    },
    {
      code: "const Buffer = { from: (value: string): string => value };\nconst value = Buffer.from(\"x\");"
    },
    {
      code: "type Buffer = Uint8Array;\nconst value = null as unknown as Buffer;"
    },
    {
      code: "interface Box extends Uint8Array {}"
    }
  ],
  invalid: [
    {
      code: "const value = Buffer.from(\"x\");",
      errors: [
        {
          messageId: "forbiddenBuffer"
        }
      ]
    },
    {
      code: "const value = Buffer;",
      errors: [
        {
          messageId: "forbiddenBuffer"
        }
      ]
    },
    {
      code: "const value: Buffer = data;",
      errors: [
        {
          messageId: "forbiddenBuffer"
        }
      ]
    },
    {
      code: "interface Box extends Buffer {}",
      errors: [
        {
          messageId: "forbiddenBuffer"
        }
      ]
    }
  ]
});
