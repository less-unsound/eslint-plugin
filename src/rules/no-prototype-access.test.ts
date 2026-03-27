import { ruleTester } from "../test/rule-tester.js";
import { noPrototypeAccessRule } from "./no-prototype-access.js";

ruleTester.run("no-prototype-access", noPrototypeAccessRule, {
  valid: [
    {
      code: "const prototype = createPrototype();"
    },
    {
      code: "const value = foo[prototype];"
    },
    {
      code: "type Value = { prototype: string };"
    },
    {
      code: "interface Value { __proto__(): void; }"
    },
    {
      code: "const value = foo['not-prototype'];"
    }
  ],
  invalid: [
    {
      code: "const value = foo.prototype;",
      errors: [
        {
          messageId: "forbiddenPrototypeAccess"
        }
      ]
    },
    {
      code: "const value = foo.__proto__;",
      errors: [
        {
          messageId: "forbiddenPrototypeAccess"
        }
      ]
    },
    {
      code: "const value = foo['prototype'];",
      errors: [
        {
          messageId: "forbiddenPrototypeAccess"
        }
      ]
    },
    {
      code: "const value = foo['__proto__'];",
      errors: [
        {
          messageId: "forbiddenPrototypeAccess"
        }
      ]
    },
    {
      code: "const value = { prototype: 1 };",
      errors: [
        {
          messageId: "forbiddenPrototypeAccess"
        }
      ]
    },
    {
      code: "const value = { __proto__: 1 };",
      errors: [
        {
          messageId: "forbiddenPrototypeAccess"
        }
      ]
    },
    {
      code: "const value = { ['prototype']: 1 };",
      errors: [
        {
          messageId: "forbiddenPrototypeAccess"
        }
      ]
    },
    {
      code: "const value = { ['__proto__']: 1 };",
      errors: [
        {
          messageId: "forbiddenPrototypeAccess"
        }
      ]
    },
    {
      code: "class Value { ['prototype'] = 1; }",
      errors: [
        {
          messageId: "forbiddenPrototypeAccess"
        }
      ]
    },
    {
      code: "class Value { ['__proto__']() {} }",
      errors: [
        {
          messageId: "forbiddenPrototypeAccess"
        }
      ]
    },
    {
      code: "const value = { prototype() {} };",
      errors: [
        {
          messageId: "forbiddenPrototypeAccess"
        }
      ]
    },
    {
      code: "const value = { __proto__() {} };",
      errors: [
        {
          messageId: "forbiddenPrototypeAccess"
        }
      ]
    },
    {
      code: "class Value { prototype() {} }",
      errors: [
        {
          messageId: "forbiddenPrototypeAccess"
        }
      ]
    },
    {
      code: "class Value { __proto__() {} }",
      errors: [
        {
          messageId: "forbiddenPrototypeAccess"
        }
      ]
    },
    {
      code: "class Value { prototype = 1; }",
      errors: [
        {
          messageId: "forbiddenPrototypeAccess"
        }
      ]
    },
    {
      code: "class Value { __proto__ = 1; }",
      errors: [
        {
          messageId: "forbiddenPrototypeAccess"
        }
      ]
    }
  ]
});
