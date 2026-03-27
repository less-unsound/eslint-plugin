import { noForLetRule } from "./rules/no-for-let.js";
import { noAccidentalMutationRule } from "./rules/no-accidental-mutation.js";
import { noAmbientDomGlobalsRule } from "./rules/no-ambient-dom-globals.js";
import { noArgumentsObjectRule } from "./rules/no-arguments-object.js";
import { noAnyRule } from "./rules/no-any.js";
import { noAsTypeAssertionRule } from "./rules/no-as-type-assertion.js";
import { noBigintRule } from "./rules/no-bigint.js";
import { noBooleanLiteralCompareRule } from "./rules/no-boolean-literal-compare.js";
import { noBufferRule } from "./rules/no-buffer.js";
import { noBroadTypesRule } from "./rules/no-broad-types.js";
import { noClassRule } from "./rules/no-class.js";
import { noCommaOperatorRule } from "./rules/no-comma-operator.js";
import { noConditionalTypeRule } from "./rules/no-conditional-type.js";
import { noDefaultParameterRule } from "./rules/no-default-parameter.js";
import { noEvalRule } from "./rules/no-eval.js";
import { noEnumRule } from "./rules/no-enum.js";
import { noExportDefaultRule } from "./rules/no-export-default.js";
import { noForInRule } from "./rules/no-for-in.js";
import { noFunctionConstructorRule } from "./rules/no-function-constructor.js";
import { noGenericParameterBoundsRule } from "./rules/no-generic-parameter-bounds.js";
import { noFunctionKeywordRule } from "./rules/no-function-keyword.js";
import { noGetterSetterRule } from "./rules/no-getter-setter.js";
import { noGlobalContextRule } from "./rules/no-global-context.js";
import { noInOperatorRule } from "./rules/no-in-operator.js";
import { noIndexedObjectTypeRule } from "./rules/no-indexed-object-type.js";
import { noIndexedAccessTypeRule } from "./rules/no-indexed-access-type.js";
import { noImportCodeExtensionRule } from "./rules/no-import-code-extension.js";
import { noImportRenameRule } from "./rules/no-import-rename.js";
import { noImportTypeRule } from "./rules/no-import-type.js";
import { noInheritanceRule } from "./rules/no-inheritance.js";
import { noInlineTaggedObjectRule } from "./rules/no-inline-tagged-object.js";
import { noIntersectionTypeRule } from "./rules/no-intersection-type.js";
import { noJsonStaticMethodRule } from "./rules/no-json-static-method.js";
import { noKeyofRule } from "./rules/no-keyof.js";
import { noLetRule } from "./rules/no-let.js";
import { noMappedObjectTypeRule } from "./rules/no-mapped-object-type.js";
import { noNeverRule } from "./rules/no-never.js";
import { noNonNullAssertionRule } from "./rules/no-non-null-assertion.js";
import { noNullRule } from "./rules/no-null.js";
import { noObjectAsMapRule } from "./rules/no-object-as-map.js";
import { noObjectSpreadRule } from "./rules/no-object-spread.js";
import { noObjectStringificationHookRule } from "./rules/no-object-stringification-hook.js";
import { noOptionalParameterRule } from "./rules/no-optional-parameter.js";
import { noOptionalPropertyRule } from "./rules/no-optional-property.js";
import { noOverloadRule } from "./rules/no-overload.js";
import { noParamAssignRule } from "./rules/no-param-assign.js";
import { noPrototypeAccessRule } from "./rules/no-prototype-access.js";
import { noProxyReflectRule } from "./rules/no-proxy-reflect.js";
import { noRequireRule } from "./rules/no-require.js";
import { noRegularExpressionRule } from "./rules/no-regular-expression.js";
import { noReexportOutsideEntrypointRule } from "./rules/no-reexport-outside-entrypoint.js";
import { noRestParameterRule } from "./rules/no-rest-parameter.js";
import { noSymbolRule } from "./rules/no-symbol.js";
import { noSwitchRule } from "./rules/no-switch.js";
import { noTryCatchRule } from "./rules/no-try-catch.js";
import { noTsCommentDirectiveRule } from "./rules/no-ts-comment-directive.js";
import { noTupleRule } from "./rules/no-tuple.js";
import { noTypeGuardRule } from "./rules/no-type-guard.js";
import { noTypeofOperatorRule } from "./rules/no-typeof-operator.js";
import { noTypeofTypeRule } from "./rules/no-typeof-type.js";
import { noUndefinedTypeRule } from "./rules/no-undefined-type.js";
import { noUnknownRule } from "./rules/no-unknown.js";
import { noUntaggedObjectUnionRule } from "./rules/no-untagged-object-union.js";
import { noUtilityTypeRule } from "./rules/no-utility-type.js";
import { noVarRule } from "./rules/no-var.js";
import { noVoidOperatorRule } from "./rules/no-void-operator.js";
import { noWhileRule } from "./rules/no-while.js";
import { requireDisjointUnionRule } from "./rules/require-disjoint-union.js";
import { requireBooleanPrefixRule } from "./rules/require-boolean-prefix.js";
import { requireFunctionVerbRule } from "./rules/require-function-verb.js";
import { requireIdentifierCaseRule } from "./rules/require-identifier-case.js";
import { requireKebabCaseFilenameRule } from "./rules/require-kebab-case-filename.js";
import { requireNamedUnionBranchRule } from "./rules/require-named-union-branch.js";
import { requireReadonlyArrayRule } from "./rules/require-readonly-array.js";
import { requireReadonlyCollectionsRule } from "./rules/require-readonly-collections.js";
import { requireReadonlyObjectFieldsRule } from "./rules/require-readonly-object-fields.js";
import { requireReturnTypeRule } from "./rules/require-return-type.js";
import { requireStringTemplateExpressionRule } from "./rules/require-string-template-expression.js";
import { requireReadonlyTupleRule } from "./rules/require-readonly-tuple.js";

export const rules = Object.freeze({
  "no-for-let": noForLetRule,
  "no-accidental-mutation": noAccidentalMutationRule,
  "no-ambient-dom-globals": noAmbientDomGlobalsRule,
  "no-arguments-object": noArgumentsObjectRule,
  "no-any": noAnyRule,
  "no-as-type-assertion": noAsTypeAssertionRule,
  "no-bigint": noBigintRule,
  "no-boolean-literal-compare": noBooleanLiteralCompareRule,
  "no-buffer": noBufferRule,
  "no-broad-types": noBroadTypesRule,
  "no-class": noClassRule,
  "no-comma-operator": noCommaOperatorRule,
  "no-conditional-type": noConditionalTypeRule,
  "no-default-parameter": noDefaultParameterRule,
  "no-eval": noEvalRule,
  "no-enum": noEnumRule,
  "no-export-default": noExportDefaultRule,
  "no-for-in": noForInRule,
  "no-function-constructor": noFunctionConstructorRule,
  "no-generic-parameter-bounds": noGenericParameterBoundsRule,
  "no-function-keyword": noFunctionKeywordRule,
  "no-getter-setter": noGetterSetterRule,
  "no-global-context": noGlobalContextRule,
  "no-in-operator": noInOperatorRule,
  "no-indexed-access-type": noIndexedAccessTypeRule,
  "no-indexed-object-type": noIndexedObjectTypeRule,
  "no-import-code-extension": noImportCodeExtensionRule,
  "no-import-rename": noImportRenameRule,
  "no-import-type": noImportTypeRule,
  "no-inheritance": noInheritanceRule,
  "no-inline-tagged-object": noInlineTaggedObjectRule,
  "no-intersection-type": noIntersectionTypeRule,
  "no-json-static-method": noJsonStaticMethodRule,
  "no-keyof": noKeyofRule,
  "no-let": noLetRule,
  "no-mapped-object-type": noMappedObjectTypeRule,
  "no-never": noNeverRule,
  "no-non-null-assertion": noNonNullAssertionRule,
  "no-null": noNullRule,
  "no-object-as-map": noObjectAsMapRule,
  "no-object-spread": noObjectSpreadRule,
  "no-object-stringification-hook": noObjectStringificationHookRule,
  "no-optional-parameter": noOptionalParameterRule,
  "no-optional-property": noOptionalPropertyRule,
  "no-overload": noOverloadRule,
  "no-param-assign": noParamAssignRule,
  "no-prototype-access": noPrototypeAccessRule,
  "no-proxy-reflect": noProxyReflectRule,
  "no-require": noRequireRule,
  "no-reexport-outside-entrypoint": noReexportOutsideEntrypointRule,
  "no-regular-expression": noRegularExpressionRule,
  "no-rest-parameter": noRestParameterRule,
  "no-symbol": noSymbolRule,
  "no-switch": noSwitchRule,
  "no-try-catch": noTryCatchRule,
  "no-ts-comment-directive": noTsCommentDirectiveRule,
  "no-tuple": noTupleRule,
  "no-type-guard": noTypeGuardRule,
  "no-typeof-operator": noTypeofOperatorRule,
  "no-typeof-type": noTypeofTypeRule,
  "no-undefined-type": noUndefinedTypeRule,
  "no-unknown": noUnknownRule,
  "no-untagged-object-union": noUntaggedObjectUnionRule,
  "no-utility-type": noUtilityTypeRule,
  "no-var": noVarRule,
  "no-void-operator": noVoidOperatorRule,
  "no-while": noWhileRule,
  "require-disjoint-union": requireDisjointUnionRule,
  "require-boolean-prefix": requireBooleanPrefixRule,
  "require-function-verb": requireFunctionVerbRule,
  "require-identifier-case": requireIdentifierCaseRule,
  "require-kebab-case-filename": requireKebabCaseFilenameRule,
  "require-named-union-branch": requireNamedUnionBranchRule,
  "require-readonly-array": requireReadonlyArrayRule,
  "require-readonly-collections": requireReadonlyCollectionsRule,
  "require-readonly-object-fields": requireReadonlyObjectFieldsRule,
  "require-return-type": requireReturnTypeRule,
  "require-string-template-expression": requireStringTemplateExpressionRule,
  "require-readonly-tuple": requireReadonlyTupleRule
});

const namespace = "@less-unsound";
const packageName = "@less-unsound/eslint-plugin";

export const plugin = Object.freeze({
  meta: Object.freeze({
    name: packageName,
    version: "0.0.1"
  }),
  rules
});

type RuleLevel = "off" | "warn" | "error";

const createConfig = (
  entries: readonly (readonly [keyof typeof rules, RuleLevel])[]
) => {
  const namespacedRules = Object.fromEntries(
    entries.map(([name, level]) => [namespace + "/" + name, level])
  );

  return Object.freeze({
    plugins: Object.freeze({
      [namespace]: plugin
    }),
    rules: Object.freeze(namespacedRules)
  });
};

export const mutabilityConfig = createConfig([
  ["no-for-let", "error"],
  ["no-accidental-mutation", "error"],
  ["no-let", "error"],
  ["no-param-assign", "error"],
  ["no-var", "error"],
  ["require-readonly-array", "error"],
  ["require-readonly-collections", "error"],
  ["require-readonly-object-fields", "error"],
  ["require-readonly-tuple", "error"]
]);

export const oopConfig = createConfig([
  ["no-class", "error"],
  ["no-getter-setter", "error"],
  ["no-global-context", "error"],
  ["no-inheritance", "error"],
  ["no-object-stringification-hook", "error"],
  ["no-prototype-access", "error"],
  ["no-proxy-reflect", "error"]
]);

export const namingConfig = createConfig([
  ["require-boolean-prefix", "error"],
  ["require-function-verb", "error"],
  ["require-identifier-case", "error"],
  ["require-kebab-case-filename", "error"]
]);

export const typesConfig = createConfig([
  ["no-any", "error"],
  ["no-as-type-assertion", "error"],
  ["no-broad-types", "error"],
  ["no-conditional-type", "error"],
  ["no-generic-parameter-bounds", "error"],
  ["no-in-operator", "error"],
  ["no-indexed-access-type", "error"],
  ["no-indexed-object-type", "error"],
  ["no-import-type", "error"],
  ["no-intersection-type", "error"],
  ["no-keyof", "error"],
  ["no-mapped-object-type", "error"],
  ["no-never", "warn"],
  ["no-non-null-assertion", "error"],
  ["no-tuple", "error"],
  ["no-optional-property", "error"],
  ["no-symbol", "error"],
  ["no-overload", "error"],
  ["no-ts-comment-directive", "error"],
  ["no-type-guard", "error"],
  ["no-typeof-operator", "error"],
  ["no-typeof-type", "error"],
  ["no-undefined-type", "warn"],
  ["no-unknown", "error"],
  ["no-utility-type", "error"],
  ["require-disjoint-union", "error"],
  ["require-named-union-branch", "error"],
  ["require-return-type", "error"]
]);

export const syntaxConfig = createConfig([
  ["no-ambient-dom-globals", "error"],
  ["no-arguments-object", "error"],
  ["no-default-parameter", "error"],
  ["no-eval", "error"],
  ["no-enum", "error"],
  ["no-export-default", "error"],
  ["no-for-in", "error"],
  ["no-function-constructor", "error"],
  ["no-function-keyword", "error"],
  ["no-boolean-literal-compare", "error"],
  ["no-buffer", "error"],
  ["no-comma-operator", "error"],
  ["no-inline-tagged-object", "error"],
  ["no-json-static-method", "error"],
  ["no-import-code-extension", "error"],
  ["no-import-rename", "error"],
  ["no-null", "error"],
  ["no-object-as-map", "error"],
  ["no-object-spread", "error"],
  ["no-optional-parameter", "error"],
  ["no-reexport-outside-entrypoint", "error"],
  ["no-require", "error"],
  ["no-regular-expression", "error"],
  ["no-rest-parameter", "error"],
  ["no-try-catch", "error"],
  ["no-void-operator", "error"],
  ["no-while", "error"],
  ["require-string-template-expression", "error"]
]);

export const recommendedConfig = createConfig([
  ["no-for-let", "error"],
  ["no-any", "error"],
  ["no-as-type-assertion", "error"],
  ["no-accidental-mutation", "error"],
  ["no-ambient-dom-globals", "error"],
  ["no-arguments-object", "error"],
  ["no-bigint", "warn"],
  ["no-boolean-literal-compare", "error"],
  ["no-buffer", "error"],
  ["no-broad-types", "error"],
  ["no-class", "error"],
  ["no-comma-operator", "error"],
  ["no-conditional-type", "error"],
  ["no-default-parameter", "error"],
  ["no-eval", "error"],
  ["no-enum", "error"],
  ["no-export-default", "error"],
  ["no-for-in", "error"],
  ["no-function-constructor", "error"],
  ["no-function-keyword", "error"],
  ["no-inline-tagged-object", "error"],
  ["no-generic-parameter-bounds", "error"],
  ["no-getter-setter", "error"],
  ["no-global-context", "error"],
  ["no-in-operator", "error"],
  ["no-indexed-access-type", "error"],
  ["no-indexed-object-type", "error"],
  ["no-import-code-extension", "error"],
  ["no-import-rename", "error"],
  ["no-import-type", "error"],
  ["no-inheritance", "error"],
  ["no-intersection-type", "error"],
  ["no-json-static-method", "error"],
  ["no-keyof", "error"],
  ["no-let", "error"],
  ["no-mapped-object-type", "error"],
  ["no-never", "warn"],
  ["no-non-null-assertion", "error"],
  ["no-null", "error"],
  ["no-object-as-map", "error"],
  ["no-object-spread", "error"],
  ["no-object-stringification-hook", "error"],
  ["no-optional-parameter", "error"],
  ["no-optional-property", "error"],
  ["no-overload", "error"],
  ["no-param-assign", "error"],
  ["no-prototype-access", "error"],
  ["no-proxy-reflect", "error"],
  ["no-reexport-outside-entrypoint", "error"],
  ["no-require", "error"],
  ["no-regular-expression", "error"],
  ["no-rest-parameter", "error"],
  ["no-symbol", "error"],
  ["no-switch", "warn"],
  ["no-try-catch", "error"],
  ["no-ts-comment-directive", "error"],
  ["no-tuple", "error"],
  ["no-type-guard", "error"],
  ["no-typeof-operator", "error"],
  ["no-typeof-type", "error"],
  ["no-undefined-type", "warn"],
  ["no-unknown", "error"],
  ["no-utility-type", "error"],
  ["no-var", "error"],
  ["no-void-operator", "error"],
  ["no-while", "error"],
  ["require-boolean-prefix", "error"],
  ["require-disjoint-union", "error"],
  ["require-function-verb", "error"],
  ["require-identifier-case", "error"],
  ["require-kebab-case-filename", "error"],
  ["require-named-union-branch", "error"],
  ["require-readonly-array", "error"],
  ["require-readonly-collections", "error"],
  ["require-readonly-object-fields", "error"],
  ["require-return-type", "error"],
  ["require-string-template-expression", "error"],
  ["require-readonly-tuple", "off"]
]);

export const configs = Object.freeze({
  mutability: mutabilityConfig,
  naming: namingConfig,
  oop: oopConfig,
  recommended: recommendedConfig,
  syntax: syntaxConfig,
  types: typesConfig
});
