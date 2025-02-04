type JsonType = "json";
type YamlType = "yaml";
type ParseableType = JsonType | YamlType;

const validFileTypes = ["application/json", "text/yaml"] as const;
const fileTypeToInternalType: Record<(typeof validFileTypes)[number], ParseableType> = {
  [validFileTypes[0]]: "json",
  [validFileTypes[1]]: "yaml",
};

export function getFileType(fileType: string): ParseableType {
  const validType = validFileTypes.find((validType) => fileType.toLowerCase().startsWith(validType));

  if (!validType) {
    throw new Error(`Invalid file type. Accepted types are ${validFileTypes.join(",")}. Received '${fileType}'.`);
  }

  return fileTypeToInternalType[validType];
}
