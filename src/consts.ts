import type { ParseableType } from "./types";

export const VALID_FILE_TYPES = ["application/json", "text/yaml"] as const;
export const FILE_TYPE_TO_INTERNAL_TYPE: Record<(typeof VALID_FILE_TYPES)[number], ParseableType> = {
  [VALID_FILE_TYPES[0]]: "json",
  [VALID_FILE_TYPES[1]]: "yaml",
};

export const VALID_EXPORT_TYPES = ["json", "yaml", "env"] as const;
export type VALID_EXPORT_TYPES = (typeof VALID_EXPORT_TYPES)[number];
