import assert from "node:assert";
import { encryptDecryptCommand } from "./commands/encryptDecryptCommand";
import { saveFileCommand } from "./commands/saveFileCommand";
import { isEncryptingFile } from "./encryption/isEncryptingFile";
import { getFileType } from "./utils/getFileType";
import { loadFileByType } from "./utils/loadFileByType";
import { parseOptions, showHelp } from "./utils/parseOptions";
import { readPasswordInput } from "./utils/readPasswordInput";
import { validateInputOptions } from "./validateInputOptions";

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

  const stats = await file.stat();
  assert(
    stats.isFile() && !stats.isSymbolicLink() && !stats.isBlockDevice() && !stats.isSocket(),
    `'${inputFilePath}' is not a file.`,
  );

  const fileType = getFileType(file.type);
  const exportFileType = options.export ?? fileType;

  const fileContents = await file.text();
  const fileData = loadFileByType(fileContents, fileType);

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
        keysToExport: options.keysToExport,
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
