import { IDENTIFIER } from "../encryption/consts";
import { decryptCustomData } from "../encryption/decryptCustomData";
import { encryptCustomData } from "../encryption/encryptCustomData";
import { isEncryptionSuccessful } from "../encryption/encryptionSuccessful";
import { walkObject } from "../encryption/walkObject";
import type { FileContents, TEncryptFnc } from "../types";

type EncryptCommandArgs = {
  fileData: FileContents;
  password: string;
  isEncrypt: boolean;
};

export async function encryptDecryptCommand({ fileData, password, isEncrypt }: EncryptCommandArgs): Promise<number> {
  const walkFnc: TEncryptFnc = isEncrypt ? encryptCustomData : decryptCustomData;

  fileData[IDENTIFIER.KEY] = isEncrypt ? IDENTIFIER.RAW_VALUE : fileData[IDENTIFIER.KEY];

  walkObject(fileData, password!, walkFnc);

  if (!isEncryptionSuccessful(fileData, password!, isEncrypt)) {
    console.error(`${isEncrypt ? "Encryption" : "Decryption"} failed. Check the password and try again.`);

    return 1;
  }

  if (!isEncrypt && fileData[IDENTIFIER.KEY]) {
    delete fileData[IDENTIFIER.KEY];
  }

  return 0;
}
