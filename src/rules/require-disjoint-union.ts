import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/create-rule.js";

type LocalDeclaration =
  | TSESTree.TSInterfaceDeclaration
  | TSESTree.TSTypeAliasDeclaration;

const defaultTagName = "$";

const messageIds = Object.freeze({
  forbiddenDisjointUnion:
    "Union members must be literal types or disjoint object types tagged by `{{tagName}}`."
});

const getPropertyName = (node: TSESTree.PropertyName): string | undefined => {
  if (node.type === AST_NODE_TYPES.Identifier) {
    return node.name;
  }
  if (node.type !== AST_NODE_TYPES.Literal) {
    return undefined;
  }
  const { value } = node;
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number") {
    return String(value);
  }
  if (typeof value === "boolean") {
    return String(value);
  }
  if (typeof value === "bigint") {
    return value.toString();
  }
  if (value === null) {
    return "null";
  }
  return undefined;
};

const getLiteralValue = (node: TSESTree.TSLiteralType): string | undefined => {
  if (node.literal.type !== AST_NODE_TYPES.Literal) {
    return undefined;
  }
  const { value } = node.literal;
  if (typeof value === "string") {
    return `string:${value}`;
  }
  if (typeof value === "number") {
    return `number:${value}`;
  }
  if (typeof value === "boolean") {
    return `boolean:${value}`;
  }
  if (typeof value === "bigint") {
    return `bigint:${value.toString()}`;
  }
  if (value === null) {
    return "null";
  }
  return undefined;
};

const unwrapType = (node: TSESTree.TypeNode): TSESTree.TypeNode => node;

const isLiteralOnlyType = (node: TSESTree.TypeNode): boolean => {
  const unwrapped = unwrapType(node);
  if (unwrapped.type === AST_NODE_TYPES.TSLiteralType) {
    return getLiteralValue(unwrapped) !== undefined;
  }
  if (unwrapped.type === AST_NODE_TYPES.TSUnionType) {
    return (
      unwrapped.types.length > 0 &&
      unwrapped.types.every((child) => isLiteralOnlyType(child))
    );
  }
  return false;
};

const getEntityName = (node: TSESTree.EntityName): string | undefined => {
  if (node.type !== AST_NODE_TYPES.Identifier) {
    return undefined;
  }
  return node.name;
};

const getObjectMembers = (
  node: LocalDeclaration
): readonly TSESTree.TypeElement[] => {
  if (node.type === AST_NODE_TYPES.TSInterfaceDeclaration) {
    return node.body.body;
  }
  const unwrapped = unwrapType(node.typeAnnotation);
  if (unwrapped.type !== AST_NODE_TYPES.TSTypeLiteral) {
    return [];
  }
  return unwrapped.members;
};

const getLiteralTagValue = (
  members: readonly TSESTree.TypeElement[],
  tagName: string
): string | undefined => {
  for (const member of members) {
    if (member.type !== AST_NODE_TYPES.TSPropertySignature) {
      continue;
    }
    if (member.computed || member.optional) {
      continue;
    }
    const propertyName = getPropertyName(member.key);
    if (propertyName !== tagName) {
      continue;
    }
    if (member.typeAnnotation === undefined) {
      return undefined;
    }
    if (
      member.typeAnnotation.typeAnnotation.type !== AST_NODE_TYPES.TSLiteralType
    ) {
      return undefined;
    }
    return getLiteralValue(member.typeAnnotation.typeAnnotation);
  }
  return undefined;
};

export const requireDisjointUnionRule = createRule({
  name: "require-disjoint-union",
  meta: {
    type: "problem",
    docs: {
      description:
        "Require unions to stay literal-only or to use a shared literal tag field on each local object branch."
    },
    schema: [
      {
        type: "object",
        properties: {
          tagName: {
            type: "string"
          }
        },
        additionalProperties: false
      }
    ],
    messages: messageIds
  },
  defaultOptions: [{ tagName: defaultTagName }],
  create: (context) => {
    const declarations = new Map<string, LocalDeclaration>();
    const unions: TSESTree.TSUnionType[] = [];

    const resolveObjectMembers = (
      name: string,
      seen: Set<string>
    ): readonly TSESTree.TypeElement[] | undefined => {
      if (seen.has(name)) {
        return undefined;
      }
      seen.add(name);
      const declaration = declarations.get(name);
      if (declaration === undefined) {
        return undefined;
      }
      if (declaration.type === AST_NODE_TYPES.TSInterfaceDeclaration) {
        return getObjectMembers(declaration);
      }
      const unwrapped = unwrapType(declaration.typeAnnotation);
      if (unwrapped.type === AST_NODE_TYPES.TSTypeLiteral) {
        return unwrapped.members;
      }
      if (unwrapped.type !== AST_NODE_TYPES.TSTypeReference) {
        return undefined;
      }
      const referencedName = getEntityName(unwrapped.typeName);
      if (referencedName === undefined) {
        return undefined;
      }
      return resolveObjectMembers(referencedName, seen);
    };

    const getNamedObjectMembers = (
      node: TSESTree.TypeNode
    ): readonly TSESTree.TypeElement[] | undefined => {
      const unwrapped = unwrapType(node);
      if (unwrapped.type !== AST_NODE_TYPES.TSTypeReference) {
        return undefined;
      }
      const name = getEntityName(unwrapped.typeName);
      if (name === undefined) {
        return undefined;
      }
      return resolveObjectMembers(name, new Set<string>());
    };

    const isInlineObjectBranch = (node: TSESTree.TypeNode): boolean => {
      const unwrapped = unwrapType(node);
      return unwrapped.type === AST_NODE_TYPES.TSTypeLiteral;
    };

    const isDisjointObjectUnion = (
      node: TSESTree.TSUnionType,
      tagName: string
    ): boolean => {
      const values = new Set<string>();
      for (const branch of node.types) {
        const members = getNamedObjectMembers(branch);
        if (members === undefined) {
          return false;
        }
        const tagValue = getLiteralTagValue(members, tagName);
        if (tagValue === undefined) {
          return false;
        }
        values.add(tagValue);
      }
      return values.size === node.types.length;
    };

    const shouldReportUnion = (node: TSESTree.TSUnionType, tagName: string): boolean => {
      if (node.types.length < 2) {
        return false;
      }
      if (node.types.every((branch) => isLiteralOnlyType(branch))) {
        return false;
      }
      if (node.types.some((branch) => isInlineObjectBranch(branch))) {
        return false;
      }
      if (node.types.every((branch) => getNamedObjectMembers(branch) !== undefined)) {
        return isDisjointObjectUnion(node, tagName) === false;
      }
      return true;
    };

    return {
      TSInterfaceDeclaration: (node) => {
        declarations.set(node.id.name, node);
      },
      TSTypeAliasDeclaration: (node) => {
        declarations.set(node.id.name, node);
      },
      TSUnionType: (node) => {
        unions.push(node);
      },
      "Program:exit": () => {
        const option = context.options[0] ?? { tagName: defaultTagName };
        const tagName = option.tagName;
        for (const node of unions) {
          if (shouldReportUnion(node, tagName)) {
            context.report({
              node,
              messageId: "forbiddenDisjointUnion",
              data: {
                tagName
              }
            });
          }
        }
      }
    };
  }
});
