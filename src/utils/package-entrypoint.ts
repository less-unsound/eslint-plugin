import { existsSync, readFileSync } from "node:fs";
import { dirname, parse, resolve } from "node:path";

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

type PackageJson = {
  readonly bin?: JsonValue;
  readonly browser?: JsonValue;
  readonly exports?: JsonValue;
  readonly main?: JsonValue;
  readonly module?: JsonValue;
  readonly types?: JsonValue;
  readonly typings?: JsonValue;
};

const packageEntrypointsCache = new Map<string, ReadonlySet<string>>();

const isJsonObject = (value: JsonValue): value is { [key: string]: JsonValue } => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const collectStringValues = (value: JsonValue): string[] => {
  if (typeof value === "string") {
    return [value];
  }
  if (Array.isArray(value)) {
    return value.flatMap(collectStringValues);
  }
  if (!isJsonObject(value)) {
    return [];
  }
  return Object.values(value).flatMap(collectStringValues);
};

const getExplicitEntrypointValues = (packageJson: PackageJson): string[] => {
  return [
    ...collectStringValues(packageJson.bin ?? []),
    ...collectStringValues(packageJson.browser ?? []),
    ...collectStringValues(packageJson.exports ?? []),
    ...collectStringValues(packageJson.main ?? []),
    ...collectStringValues(packageJson.module ?? []),
    ...collectStringValues(packageJson.types ?? []),
    ...collectStringValues(packageJson.typings ?? [])
  ];
};

const readPackageEntrypoints = (packageJsonPath: string): ReadonlySet<string> => {
  const cached = packageEntrypointsCache.get(packageJsonPath);
  if (cached !== undefined) {
    return cached;
  }

  const packageDir = dirname(packageJsonPath);
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8")) as PackageJson;
  const entrypoints = new Set(
    getExplicitEntrypointValues(packageJson).map((value) => resolve(packageDir, value))
  );
  packageEntrypointsCache.set(packageJsonPath, entrypoints);
  return entrypoints;
};

export const findNearestPackageJsonPath = (filename: string): string | undefined => {
  if (filename === "<input>" || filename === "<text>") {
    return undefined;
  }

  let currentDir = dirname(filename);
  const filesystemRoot = parse(currentDir).root;

  while (true) {
    const packageJsonPath = resolve(currentDir, "package.json");
    if (existsSync(packageJsonPath)) {
      return packageJsonPath;
    }
    if (currentDir === filesystemRoot) {
      return undefined;
    }
    currentDir = dirname(currentDir);
  }
};

export const isExplicitPackageEntrypoint = (filename: string): boolean => {
  const packageJsonPath = findNearestPackageJsonPath(filename);
  if (packageJsonPath === undefined) {
    return false;
  }
  return readPackageEntrypoints(packageJsonPath).has(resolve(filename));
};
