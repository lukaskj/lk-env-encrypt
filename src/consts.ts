export const ParseableType = ["json", "yaml"] as const;
export type ParseableType = (typeof ParseableType)[number];

export const VALID_FILE_TYPES = ["application/json", "text/yaml"] as const;
export type TValidFileType = (typeof VALID_FILE_TYPES)[number];

export const FILE_TYPE_TO_INTERNAL_TYPE: Record<TValidFileType, ParseableType> = {
  [VALID_FILE_TYPES[0]]: "json",
  [VALID_FILE_TYPES[1]]: "yaml",
};

export const VALID_EXPORT_TYPES = ["json", "yaml", "env"] as const;
export type TExportType = (typeof VALID_EXPORT_TYPES)[number];
