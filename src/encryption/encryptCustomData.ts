import { SEPARATOR } from "./consts";
import { encrypt } from "./encryption";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function encryptCustomData(value: any, password: string): string {
  const valueType = typeof value;
  const encryptedValue = encrypt(String(value), password);
  if (valueType === "string") {
    return encryptedValue;
  }

  return `${encryptedValue}${SEPARATOR}${valueType}`;
}
