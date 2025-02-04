import yaml from "js-yaml";
import assert from "node:assert";
import { IDENTIFIER } from "./encryption/consts";
import { decryptCustomData } from "./encryption/decryptCustomData";
import { encryptCustomData } from "./encryption/encryptCustomData";
import { isEncryptionSuccessful } from "./encryption/encryptionSuccessful";
import { isEncryptingFile } from "./encryption/isEncryptingFile";
import { walkObject } from "./encryption/walkObject";
import type { FileContents, TEncryptFnc } from "./types";
import { getFileType } from "./utils/getFileType";
import { parseOptions, showHelp } from "./utils/parseOptions";
import { readPasswordInput } from "./utils/readPasswordInput";
import { validateInputOptions } from "./validateInputOptions";

const args = process.argv.splice(2);
const parsedArgs = parseOptions(args);
assert(parsedArgs !== undefined && parsedArgs !== null);

const { values: options, positionals } = parsedArgs;
if (options.help) {
  showHelp();
  process.exit(0);
}

validateInputOptions(parsedArgs);

const inputFilePath = positionals[0];
const file = Bun.file(inputFilePath);
assert(await file.exists(), `File '${inputFilePath}' not found.`);

if (!options.password) {
  options.password = await readPasswordInput();
}

if (!options.password) {
  console.error("No password.");
  process.exit(1);
}

assert(options.password);

const fileType = getFileType(file.type);

const fileContents = await file.text();
const fileData: FileContents = fileType === "json" ? JSON.parse(fileContents) : yaml.load(fileContents);

const isEncrypt = isEncryptingFile(fileContents);
const walkFnc: TEncryptFnc = isEncrypt ? encryptCustomData : decryptCustomData;

fileData[IDENTIFIER.KEY] = isEncrypt ? IDENTIFIER.RAW_VALUE : fileData[IDENTIFIER.KEY];

// biome-ignore lint/style/noNonNullAssertion: <explanation>
walkObject(fileData, options.password!, walkFnc);

assert(
  isEncryptionSuccessful(fileData, options.password, isEncrypt),
  `${isEncrypt ? "Encryption" : "Decryption"} failed. Check the password and try again.`,
);

if (!isEncrypt && fileData[IDENTIFIER.KEY]) {
  delete fileData[IDENTIFIER.KEY];
}

const outputFileContents = fileType === "json" ? JSON.stringify(fileData, null, 2) : yaml.dump(fileData, { indent: 2 });

if (options.pipe) {
  console.log(outputFileContents);
} else {
  const outputFilePath = options.output ?? inputFilePath;

  await Bun.file(outputFilePath).write(outputFileContents);
}

process.exit(0);
