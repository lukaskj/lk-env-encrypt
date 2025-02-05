import type { FileContents } from "../types";

export function getObjectValuesByKeys<T extends object>(fileContents: T, keysToExport?: (keyof T)[]): FileContents {
  if (!keysToExport || !keysToExport.length) {
    return fileContents;
  }

  return keysToExport.reduce((acc, k) => {
    acc[k] = fileContents[k];
    return acc;
  }, {} as T);
}
