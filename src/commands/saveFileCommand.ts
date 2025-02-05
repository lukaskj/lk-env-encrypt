import type { TExportType } from "../consts";
import type { FileContents } from "../types";
import { getObjectValuesByKeys } from "../utils/getObjectValuesByKeys";
import { serializeObjectToFormat } from "../utils/serializeObjectToFormat";

type TArgs = {
  exportFileType: TExportType;
  fileData: FileContents;
  inputFilePath: string;
  outputFileName?: string;
  pipeOutput?: boolean;
  keysToExport?: string[];
};

export async function saveFileCommand({
  fileData,
  exportFileType,
  pipeOutput,
  inputFilePath,
  outputFileName,
  keysToExport,
}: TArgs): Promise<number> {
  const dataToSave = getObjectValuesByKeys(fileData, keysToExport);

  const outputFileContents = serializeObjectToFormat(dataToSave, exportFileType);

  if (pipeOutput) {
    console.log(outputFileContents);
  } else {
    const outputFilePath = outputFileName ?? inputFilePath;

    await Bun.file(outputFilePath).write(outputFileContents);
  }

  return 0;
}
