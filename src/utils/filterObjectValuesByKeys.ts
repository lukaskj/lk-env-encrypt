import { IDENTIFIER } from "../encryption/consts";
import type { AnyType, FileContents } from "../types";

export function filterObjectValuesByKeys<T extends AnyType>(
  fileContents: AnyType,
  keysToExport?: (keyof T)[],
): FileContents {
  if (!keysToExport || !keysToExport.length) {
    return fileContents;
  }

  return [...keysToExport, IDENTIFIER.KEY].reduce((acc, k) => {
    if (k in fileContents && fileContents[k] !== undefined) {
      acc[k as keyof T] = fileContents[k];
    }
    return acc;
  }, {} as T);
}
