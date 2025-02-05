import type { ParseableType } from "../consts";
import type { FileContents } from "../types";
import yaml from "js-yaml";
import { fromDotEnv } from "./dotenvSerializer";

export function loadFileByType(rawFileData: string, fileType: ParseableType): FileContents {
  switch (fileType) {
    case "yaml":
      return yaml.load(rawFileData);
    case "env":
      return fromDotEnv(rawFileData);
    default:
      return JSON.parse(rawFileData);
  }
}
