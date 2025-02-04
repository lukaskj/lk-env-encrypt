import type { parseOptions } from "./utils/parseOptions";

export function validateInputOptions({ positionals, values: options }: ReturnType<typeof parseOptions>) {
  if (positionals.length === 0) {
    throw new Error("Input file not specified.");
  }
}
