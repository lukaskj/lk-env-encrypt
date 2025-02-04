import type { FileContents, ParseableType } from "../types";
import type { TOptions } from "../utils/parseOptions";
import { transformObjectToFormat } from "../utils/transformObjectToFormat";

type TArgs = {
  fileType: ParseableType;
  fileData: FileContents;
  options: TOptions;
  inputFilePath: string;
};
export async function saveFileCommand({ fileData, fileType, options, inputFilePath }: TArgs): Promise<number> {
  const outputFileContents = transformObjectToFormat(fileData, fileType);

  if (options.pipe) {
    console.log(outputFileContents);
  } else {
    const outputFilePath = options.output ?? inputFilePath;

    await Bun.file(outputFilePath).write(outputFileContents);
  }

  return 0;
}
