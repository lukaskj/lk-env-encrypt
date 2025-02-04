import { IDENTIFIER } from "./consts";

export function isEncryptingFile(rawFileContents: string): boolean {
  return !rawFileContents.includes(IDENTIFIER.KEY);
}
