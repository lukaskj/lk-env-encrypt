import type { FileContents } from "../types";
import { IDENTIFIER } from "./consts";
import { decrypt } from "./encryption";

export function isEncryptionSuccessful(data: FileContents, password: string, isEncrypting: boolean): boolean {
  if (!data[IDENTIFIER.KEY]) {
    return false;
  }

  const decryptedValue = isEncrypting ? decrypt(data[IDENTIFIER.KEY], password) : data[IDENTIFIER.KEY];

  return decryptedValue === IDENTIFIER.RAW_VALUE;
}
