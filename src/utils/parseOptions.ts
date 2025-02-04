import { type ParseArgsConfig, parseArgs } from "node:util";

const options = {
  output: {
    type: "string",
    short: "o",
  },
  password: {
    type: "string",
  },
  help: {
    type: "boolean",
    short: "h",
  },
} satisfies ParseArgsConfig["options"];

export function parseOptions(args: string[]) {
  const parsed = parseArgs({
    args,
    options,
    strict: true,
    allowPositionals: true,
  });

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  return parsed!;
}

export function showHelp() {
  console.log("Usage");
  process.exit(0);
}
