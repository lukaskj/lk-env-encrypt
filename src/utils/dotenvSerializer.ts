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

export function fromDotEnv(contents: string): FileContents {
  const result: Record<string, string> = {};

  const lines = contents.split("\n");

  for (const line of lines) {
    const equalIndex = line.indexOf("=");
    const key = line.substring(0, equalIndex);
    let value = line.substring(equalIndex + 1);

    if (value.length) {
      if (value[0] === '"') {
        value = value.substring(1);
      }
      if (value.at(-1) === '"') {
        value = value.substring(0, value.length - 1);
      }
    }

    result[key.toLowerCase()] = value;
  }

  return result;
}
