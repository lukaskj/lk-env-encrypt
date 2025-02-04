import { type ParseArgsConfig, parseArgs } from "node:util";

const options = {
  output: {
    type: "string",
    short: "o",
  },
  password: {
    type: "string",
    short: "p",
  },
  pipe: {
    type: "boolean",
  },
  help: {
    type: "boolean",
    short: "h",
  },
  export: {
    type: "string",
  },
} satisfies ParseArgsConfig["options"];

export function parseOptions(args: string[]) {
  const parsed = parseArgs({
    args,
    options,
    strict: true,
    allowPositionals: true,
  });

  return parsed!;
}
export type TOptions = ReturnType<typeof parseOptions>["values"];

export function showHelp() {
  console.log("Usage");
}
