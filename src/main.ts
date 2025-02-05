import yaml from "js-yaml";
import assert from "node:assert";
import { encryptDecryptCommand } from "./commands/encryptDecryptCommand";
import { isEncryptingFile } from "./encryption/isEncryptingFile";
import type { FileContents } from "./types";
import { getFileType } from "./utils/getFileType";
import { parseOptions, showHelp } from "./utils/parseOptions";
import { readPasswordInput } from "./utils/readPasswordInput";
import { validateInputOptions } from "./validateInputOptions";
import { saveFileCommand } from "./commands/saveFileCommand";

type TCommand = () => number | Promise<number>;

export async function main(args: string[]): Promise<number> {
  const parsedArgs = parseOptions(args);
  assert(parsedArgs !== undefined && parsedArgs !== null);

  if (parsedArgs?.values?.help) {
    showHelp();
    return 0;
  }

  if (!validateInputOptions(parsedArgs)) {
    return 0;
  }

  const { values: options, positionals } = parsedArgs;

  const inputFilePath = positionals[0];
  const file = Bun.file(inputFilePath);
  assert(await file.exists(), `File '${inputFilePath}' not found.`);

  const fileType = getFileType(file.type);
  const exportFileType = options.export ?? fileType;

  const fileContents = await file.text();
  const fileData: FileContents = fileType === "json" ? JSON.parse(fileContents) : yaml.load(fileContents);

  const isEncrypt = isEncryptingFile(fileContents);

  if (!options.password) {
    options.password = await readPasswordInput();
  }

  if (!options.password || typeof options.password === "undefined" || options.password === undefined) {
    console.error("No password.");

    return 1;
  }

  const commands: TCommand[] = [
    async () =>
      await encryptDecryptCommand({
        fileData,
        isEncrypt,
        password: options.password!,
      }),
    async () =>
      await saveFileCommand({
        fileData,
        inputFilePath,
        exportFileType,
        outputFileName: options.output,
        pipeOutput: options.pipe,
      }),
  ];

  for (const command of commands) {
    const result = await command();
    if (result !== 0) {
      return result;
    }
  }

  return 0;
}
