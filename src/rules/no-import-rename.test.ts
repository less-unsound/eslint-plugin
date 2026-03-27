import { ruleTester } from "../test/rule-tester.js";
import { noImportRenameRule } from "./no-import-rename.js";

ruleTester.run("no-import-rename", noImportRenameRule, {
  valid: [
    {
      code: 'import { foo } from "./foo";'
    },
    {
      code: 'import foo from "./foo";'
    },
    {
      code: 'import * as foo from "./foo";'
    },
    {
      code: 'import { type Foo } from "./foo";'
    }
  ],
  invalid: [
    {
      code: 'import { foo as bar } from "./foo";',
      errors: [
        {
          data: {
            importedName: "foo",
            localName: "bar"
          },
          messageId: "forbiddenImportRename"
        }
      ]
    },
    {
      code: 'import { type Foo as Bar } from "./foo";',
      errors: [
        {
          data: {
            importedName: "Foo",
            localName: "Bar"
          },
          messageId: "forbiddenImportRename"
        }
      ]
    },
    {
      code: 'import { default as Foo } from "./foo";',
      errors: [
        {
          data: {
            importedName: "default",
            localName: "Foo"
          },
          messageId: "forbiddenImportRename"
        }
      ]
    }
  ]
});
