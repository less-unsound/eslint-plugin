import { ruleTester } from "../test/rule-tester.js";
import { noUtilityTypeRule } from "./no-utility-type.js";

ruleTester.run("no-utility-type", noUtilityTypeRule, {
  valid: [
    {
      code: "type Value = Foo;"
    }
  ],
  invalid: [
    {
      code: "type Value = Omit<Foo, \"bar\">;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = Pick<Foo, \"bar\">;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = Exclude<Foo, Bar>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = Extract<Foo, Bar>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = Partial<Foo>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = Required<Foo>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = Readonly<Foo>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = Record<Key, Foo>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = NonNullable<Foo>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = ReturnType<() => Foo>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = Parameters<(value: Foo) => Bar>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = ConstructorParameters<typeof Foo>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = InstanceType<typeof Foo>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = Awaited<Promise<Foo>>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = Uppercase<Text>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = Lowercase<Text>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = Capitalize<Text>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = Uncapitalize<Text>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = ThisParameterType<(this: Foo) => Bar>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = OmitThisParameter<(this: Foo, value: Bar) => Baz>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    },
    {
      code: "type Value = ThisType<Foo>;",
      errors: [
        {
          messageId: "forbiddenUtilityType"
        }
      ]
    }
  ]
});
