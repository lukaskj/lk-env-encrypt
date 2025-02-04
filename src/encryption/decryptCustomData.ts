import type { AnyType } from "../types";
import { SEPARATOR } from "./consts";
import { decrypt } from "./encryption";

export function decryptCustomData(value: string, password: string): AnyType {
  const data = value.split(SEPARATOR);
  const valueType = data[1]?.toLowerCase();
  const encryptedValue = data[0];
  const decryptedValue = decrypt(encryptedValue, password);

  switch (valueType) {
    case "number":
      return Number(decryptedValue);
    case "boolean":
      return Boolean(decryptedValue);
    case "bigint":
      return BigInt(decryptedValue);
    default:
      return String(decryptedValue);
  }
}
