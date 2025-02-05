import { type TExportType, VALID_EXPORT_TYPES } from "../consts";
import type { AnyType } from "../types";

export function isValidTransformType(exportType: string): exportType is TExportType {
  return VALID_EXPORT_TYPES.includes(<AnyType>exportType.trim());
}
