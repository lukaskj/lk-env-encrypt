import { FILE_TYPE_TO_INTERNAL_TYPE, VALID_FILE_TYPES } from "../consts";
import type { ParseableType } from "../types";

export function getFileType(fileType: string): ParseableType {
  const validType = VALID_FILE_TYPES.find((validType) => fileType.toLowerCase().startsWith(validType));

  if (!validType) {
    throw new Error(`Invalid file type. Accepted types are ${VALID_FILE_TYPES.join(",")}. Received '${fileType}'.`);
  }

  return FILE_TYPE_TO_INTERNAL_TYPE[validType];
}
