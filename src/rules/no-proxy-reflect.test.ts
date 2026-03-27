import { ruleTester } from "../test/rule-tester.js";
import { noProxyReflectRule } from "./no-proxy-reflect.js";

ruleTester.run("no-proxy-reflect", noProxyReflectRule, {
  valid: [
    {
      code: "const Proxy = createProxy();"
    },
    {
      code: "const Reflect = createReflect();"
    },
    {
      code: "const value = foo.Proxy;"
    },
    {
      code: "const value = foo.Reflect;"
    }
  ],
  invalid: [
    {
      code: "const value = Proxy;",
      errors: [
        {
          messageId: "forbiddenProxyReflect"
        }
      ]
    },
    {
      code: "const value = Reflect;",
      errors: [
        {
          messageId: "forbiddenProxyReflect"
        }
      ]
    },
    {
      code: "const value = Proxy.revocable(target, handler);",
      errors: [
        {
          messageId: "forbiddenProxyReflect"
        }
      ]
    },
    {
      code: "const value = Reflect.apply(fn, thisArg, args);",
      errors: [
        {
          messageId: "forbiddenProxyReflect"
        }
      ]
    },
    {
      code: "const value = new Proxy(target, handler);",
      errors: [
        {
          messageId: "forbiddenProxyReflect"
        }
      ]
    },
    {
      code: "const value = { Proxy };",
      errors: [
        {
          messageId: "forbiddenProxyReflect"
        }
      ]
    }
  ]
});
