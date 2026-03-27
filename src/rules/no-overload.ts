import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

type Entry = {
  readonly name: string;
  readonly node: TSESTree.Node;
};

const messageIds = Object.freeze({
  forbiddenOverload: "Overloads are not allowed."
});

const getText = (sourceText: string, range: TSESTree.Range): string =>
  sourceText.slice(range[0], range[1]);

const getTopLevelEntries = (body: readonly TSESTree.Statement[]): readonly Entry[] => {
  const entries: Entry[] = [];
  body.forEach((statement) => {
    if (
      statement.type !== AST_NODE_TYPES.FunctionDeclaration &&
      statement.type !== AST_NODE_TYPES.TSDeclareFunction
    ) {
      return;
    }
    if (statement.id === null) {
      return;
    }
    entries.push({
      name: statement.id.name,
      node: statement
    });
  });
  return entries;
};

const getClassEntries = (
  sourceText: string,
  body: readonly TSESTree.ClassElement[]
): readonly Entry[] => {
  const entries: Entry[] = [];
  body.forEach((member) => {
    if (member.type !== AST_NODE_TYPES.MethodDefinition) {
      return;
    }
    if (member.kind === "get" || member.kind === "set") {
      return;
    }
    entries.push({
      name: getText(sourceText, member.key.range),
      node: member
    });
  });
  return entries;
};

const getTypeEntries = (
  sourceText: string,
  body: readonly TSESTree.TypeElement[]
): readonly Entry[] => {
  const entries: Entry[] = [];
  body.forEach((member) => {
    if (member.type === AST_NODE_TYPES.TSMethodSignature) {
      entries.push({
        name: getText(sourceText, member.key.range),
        node: member
      });
      return;
    }
    if (member.type === AST_NODE_TYPES.TSCallSignatureDeclaration) {
      entries.push({
        name: "(call)",
        node: member
      });
      return;
    }
    if (member.type === AST_NODE_TYPES.TSConstructSignatureDeclaration) {
      entries.push({
        name: "(construct)",
        node: member
      });
    }
  });
  return entries;
};

export const noOverloadRule = createRule({
  name: "no-overload",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow function and method overloads."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => {
    const sourceText = context.sourceCode.getText();
    const reportDuplicates = (entries: readonly Entry[]): void => {
      const seen = new Set<string>();
      entries.forEach((entry) => {
        if (seen.has(entry.name)) {
          context.report({
            node: entry.node,
            messageId: "forbiddenOverload"
          });
          return;
        }
        seen.add(entry.name);
      });
    };

    return {
      Program: (node) => {
        reportDuplicates(getTopLevelEntries(node.body));
      },
      ClassBody: (node) => {
        reportDuplicates(getClassEntries(sourceText, node.body));
      },
      TSInterfaceBody: (node) => {
        reportDuplicates(getTypeEntries(sourceText, node.body));
      },
      TSTypeLiteral: (node) => {
        reportDuplicates(getTypeEntries(sourceText, node.members));
      }
    };
  }
});
