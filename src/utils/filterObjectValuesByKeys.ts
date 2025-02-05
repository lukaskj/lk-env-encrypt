import { IDENTIFIER } from "../encryption/consts";
import type { AnyType, FileContents } from "../types";

export function filterObjectValuesByKeys<T extends AnyType>(obj: AnyType, keysToExport?: (keyof T)[]): FileContents {
  if (!keysToExport || !keysToExport.length) {
    return obj;
  }

  return [...keysToExport, IDENTIFIER.KEY].reduce((acc, k) => {
    if (k in obj && obj[k] !== undefined) {
      acc[k as keyof T] = obj[k];
    }
    return acc;
  }, {} as T);
}
