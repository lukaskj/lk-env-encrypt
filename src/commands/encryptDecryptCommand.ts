import { IDENTIFIER } from "../encryption/consts";
import { decryptCustomData } from "../encryption/decryptCustomData";
import { encryptCustomData } from "../encryption/encryptCustomData";
import { isEncryptionSuccessful } from "../encryption/encryptionSuccessful";
import { walkObject } from "../encryption/walkObject";
import type { FileContents, ParseableType, TEncryptFnc } from "../types";
import type { TOptions } from "../utils/parseOptions";

type EncryptCommandArgs = {
  fileData: FileContents;
  fileType: ParseableType;
  inputFilePath: string;
  options: TOptions;
  isEncrypt: boolean;
};

export async function encryptDecryptCommand({ fileData, options, isEncrypt }: EncryptCommandArgs): Promise<number> {
  const walkFnc: TEncryptFnc = isEncrypt ? encryptCustomData : decryptCustomData;

  fileData[IDENTIFIER.KEY] = isEncrypt ? IDENTIFIER.RAW_VALUE : fileData[IDENTIFIER.KEY];

  walkObject(fileData, options.password!, walkFnc);

  if (!isEncryptionSuccessful(fileData, options.password!, isEncrypt)) {
    console.error(`${isEncrypt ? "Encryption" : "Decryption"} failed. Check the password and try again.`);

    return 1;
  }

  if (!isEncrypt && fileData[IDENTIFIER.KEY]) {
    delete fileData[IDENTIFIER.KEY];
  }

  return 0;
}
