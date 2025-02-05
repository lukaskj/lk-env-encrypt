import { VALID_EXPORT_TYPES } from "./consts";
import type { AnyType, TArguments } from "./types";
import { isValidTransformType } from "./utils/isValidTransformType";
import type { parseOptions } from "./utils/parseOptions";

export function validateInputOptions(args: ReturnType<typeof parseOptions>): args is TArguments {
  const { positionals, values: options } = args;
  if (positionals.length === 0) {
    throw new Error("Input file not specified.");
  }

  if (options.export) {
    if (!isValidTransformType(options.export)) {
      throw new Error(`Export type not valid. Expected values: ${VALID_EXPORT_TYPES.join()}`);
    }

    if ((!options.output || options.output.trim() === "") && options.inPlace) {
      throw new Error("Output file expected when the export flag is defined.");
    }
  }

  (<AnyType>options).pipe = !options.inPlace;

  return true;
}
