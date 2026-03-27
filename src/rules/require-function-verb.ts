import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import ts from "typescript";
import { createRule } from "../utils/create-rule.js";
import { isCamelCase } from "../utils/string-case.js";

const allowedPrefixes = Object.freeze([
  "add",
  "advance",
  "analyze",
  "append",
  "apply",
  "assign",
  "assert",
  "attach",
  "bind",
  "build",
  "calculate",
  "call",
  "capitalize",
  "check",
  "clear",
  "close",
  "collect",
  "combine",
  "compile",
  "compare",
  "compute",
  "concat",
  "conv",
  "create",
  "decode",
  "dedupe",
  "delete",
  "derive",
  "deserialize",
  "diff",
  "drain",
  "elab",
  "emit",
  "encode",
  "ensure",
  "eq",
  "erase",
  "exec",
  "expect",
  "extend",
  "fail",
  "filter",
  "find",
  "flatMap",
  "fold",
  "format",
  "get",
  "guard",
  "hash",
  "handle",
  "indent",
  "inline",
  "init",
  "insert",
  "intersect",
  "join",
  "lint",
  "listen",
  "list",
  "load",
  "lower",
  "make",
  "main",
  "mark",
  "map",
  "match",
  "measure",
  "merge",
  "neq",
  "normalize",
  "on",
  "observe",
  "open",
  "parse",
  "patch",
  "pick",
  "prepend",
  "print",
  "process",
  "prune",
  "qualify",
  "read",
  "receive",
  "reduce",
  "remove",
  "render",
  "repeat",
  "require",
  "replace",
  "reset",
  "resolve",
  "rewrite",
  "run",
  "rank",
  "save",
  "search",
  "select",
  "send",
  "serialize",
  "set",
  "show",
  "simplify",
  "skip",
  "solve",
  "sort",
  "spawn",
  "split",
  "start",
  "stop",
  "strip",
  "subscribe",
  "to",
  "transform",
  "transpile",
  "trim",
  "unsubscribe",
  "unify",
  "unwrap",
  "update",
  "validate",
  "verify",
  "visit",
  "walk",
  "watch",
  "with",
  "wrap",
  "write"
]);

const allowedPredicatePrefixes = Object.freeze(["check", "eq", "neq"]);

const booleanLikePrefixes = Object.freeze([
  "are",
  "can",
  "did",
  "do",
  "does",
  "exists",
  "has",
  "have",
  "includes",
  "is",
  "matches",
  "may",
  "must",
  "need",
  "needs",
  "requires",
  "should",
  "supports",
  "was",
  "were",
  "will",
  "would"
]);

const messageIds = Object.freeze({
  convertMustUseTo: "`convert` is not allowed for function variable names. Rename `{{name}}` to `{{suggestedName}}`.",
  missingFunctionVerb:
    "CamelCase function variable names must start with an allowed verb prefix. `{{name}}` should start with one of: {{prefixes}}.",
  predicateMustStartWithCheck:
    "Predicate function variable names must start with `check`. Rename `{{name}}` to `{{suggestedName}}`."
});

const isUppercaseLetter = (value: string): boolean =>
  value.toUpperCase() === value && value.toLowerCase() !== value;

const getMatchedPrefix = (name: string, prefixes: readonly string[]): string | undefined => {
  return prefixes.find((prefix) => {
    if (!name.startsWith(prefix)) {
      return false;
    }
    if (name.length === prefix.length) {
      return true;
    }
    const next = name[prefix.length];
    return next !== undefined && isUppercaseLetter(next);
  });
};

const capitalize = (value: string): string => {
  const first = value[0];
  if (first === undefined) {
    return "";
  }
  return first.toUpperCase() + value.slice(1);
};

const getCheckName = (name: string): string => {
  const booleanLikePrefix = getMatchedPrefix(name, booleanLikePrefixes);
  if (booleanLikePrefix !== undefined) {
    const suffix = name.slice(booleanLikePrefix.length);
    return "check" + suffix;
  }

  const allowedPrefix = getMatchedPrefix(
    name,
    allowedPrefixes.filter((prefix) => prefix !== "check" && prefix !== "on" && prefix !== "to")
  );
  if (allowedPrefix !== undefined) {
    const suffix = name.slice(allowedPrefix.length);
    return suffix === "" ? "check" : "check" + suffix;
  }

  return "check" + capitalize(name);
};

const getToName = (name: string): string => {
  const suffix = name.slice("convert".length);
  return suffix === "" ? "to" : "to" + suffix;
};

const isBooleanType = (checker: ts.TypeChecker, type: ts.Type): boolean => {
  const constrainedType = checker.getBaseConstraintOfType(type) ?? type;
  if (constrainedType.isUnion()) {
    return constrainedType.types.length > 0 && constrainedType.types.every((member) => isBooleanType(checker, member));
  }
  if (constrainedType.isIntersection()) {
    return constrainedType.types.some((member) => isBooleanType(checker, member));
  }
  const baseType = checker.getBaseTypeOfLiteralType(constrainedType);
  return checker.typeToString(baseType) === "boolean";
};

export const requireFunctionVerbRule = createRule({
  name: "require-function-verb",
  meta: {
    type: "problem",
    docs: {
      description:
        "Require camelCase function variable names to start with an allowed verb prefix."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => {
    const services = ESLintUtils.getParserServices(context);
    const checker = services.program.getTypeChecker();

    return {
      VariableDeclarator: (node) => {
        if (node.id.type !== AST_NODE_TYPES.Identifier) {
          return;
        }
        if (
          node.init === null ||
          (node.init.type !== AST_NODE_TYPES.ArrowFunctionExpression &&
            node.init.type !== AST_NODE_TYPES.FunctionExpression)
        ) {
          return;
        }

        const name = node.id.name;
        if (!isCamelCase(name)) {
          return;
        }

        const booleanLikePrefix = getMatchedPrefix(name, booleanLikePrefixes);
        if (booleanLikePrefix !== undefined) {
          context.report({
            node: node.id,
            messageId: "predicateMustStartWithCheck",
            data: {
              name,
              suggestedName: getCheckName(name)
            }
          });
          return;
        }

        const signature = checker.getSignatureFromDeclaration(
          services.esTreeNodeToTSNodeMap.get(node.init) as ts.SignatureDeclaration
        );
        if (signature !== undefined && isBooleanType(checker, checker.getReturnTypeOfSignature(signature))) {
          if (getMatchedPrefix(name, allowedPredicatePrefixes) === undefined) {
            context.report({
              node: node.id,
              messageId: "predicateMustStartWithCheck",
              data: {
                name,
                suggestedName: getCheckName(name)
              }
            });
          }
          return;
        }

        if (getMatchedPrefix(name, ["convert"]) !== undefined) {
          context.report({
            node: node.id,
            messageId: "convertMustUseTo",
            data: {
              name,
              suggestedName: getToName(name)
            }
          });
          return;
        }

        if (getMatchedPrefix(name, allowedPrefixes) !== undefined) {
          return;
        }

        context.report({
          node: node.id,
          messageId: "missingFunctionVerb",
          data: {
            name,
            prefixes: allowedPrefixes.join(", ")
          }
        });
      }
    };
  }
});
