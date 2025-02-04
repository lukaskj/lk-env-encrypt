import type { FileContents, ParseableType } from "../types";
import yaml from "js-yaml";

export function transformObjectToFormat(fileContents: FileContents, formatToType: ParseableType): string {
  switch (formatToType) {
    case "yaml":
      return yaml.dump(fileContents, { indent: 2 });
    default:
      return JSON.stringify(fileContents, null, 2);
  }
}
