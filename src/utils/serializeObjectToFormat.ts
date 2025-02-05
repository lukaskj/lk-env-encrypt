import yaml from "js-yaml";
import type { TExportType } from "../consts";
import type { FileContents } from "../types";
import { dotenvSerializer } from "./dotenvSerializer";

export function serializeObjectToFormat(fileContents: FileContents, formatToType: TExportType): string {
  switch (formatToType) {
    case "yaml":
      return yaml.dump(fileContents, { indent: 2 });
    case "env":
      return dotenvSerializer(fileContents);
    default:
      return JSON.stringify(fileContents, null, 2);
  }
}
