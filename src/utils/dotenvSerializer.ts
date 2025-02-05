import type { FileContents } from "../types";
import { isPrimitive } from "./isPrimitive";

export function dotenvSerializer(obj: FileContents): string {
  const result: string[] = [];

  flatObjectToDotEnv(obj, result);

  return result.join("\n");
}

export function flatObjectToDotEnv(input: object, result: string[]) {
  for (const _key of Object.keys(input)) {
    const key = _key as keyof typeof input;
    const currentPrefix = (<string>key).toUpperCase();

    if (isPrimitive(input[key])) {
      const escapedValue = String(input[key]);
      result.push(`${currentPrefix}="${escapedValue}"`);
    } else {
      flatObjectToDotEnv(input[key], result);
    }
  }
}
