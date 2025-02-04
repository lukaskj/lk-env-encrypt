import type { AnyType } from "../types";
import { SEPARATOR } from "./consts";
import { encrypt } from "./encryption";

export function encryptCustomData(value: AnyType, password: string): string {
  const valueType = typeof value;
  const encryptedValue = encrypt(String(value), password);
  if (valueType === "string") {
    return encryptedValue;
  }

  return `${encryptedValue}${SEPARATOR}${valueType}`;
}
