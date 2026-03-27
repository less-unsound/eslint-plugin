const kebabCasePattern = /^[a-z0-9][a-z0-9.-]*$/u;
const camelCasePattern = /^[a-z][A-Za-z0-9]*$/u;
const pascalCasePattern = /^[A-Z][A-Za-z0-9]*$/u;

export const isKebabCase = (value: string): boolean =>
  value === "" || kebabCasePattern.test(value);

export const isCamelCase = (value: string): boolean =>
  camelCasePattern.test(value);

export const isPascalCase = (value: string): boolean =>
  pascalCasePattern.test(value);
