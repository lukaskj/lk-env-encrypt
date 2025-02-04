import type { parseOptions } from "./utils/parseOptions";

export function validateInputOptions(parsedArgs: ReturnType<typeof parseOptions>) {
  if (parsedArgs.positionals.length === 0) {
    throw new Error("Input file not specified.");
  }
}
