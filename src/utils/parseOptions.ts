import { basename } from "node:path";
import { type ParseArgsConfig, parseArgs } from "node:util";
import { VALID_EXPORT_TYPES } from "../consts";
import type { TOptions } from "../types";

const options = {
  output: {
    type: "string",
    short: "o",
  },
  password: {
    type: "string",
    short: "p",
  },
  inPlace: {
    type: "boolean",
    short: "i",
  },
  export: {
    type: "string",
  },
  keys: {
    type: "string",
    short: "k",
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

  (<TOptions>parsed.values).pipe = !parsed.values.inPlace && !parsed.values.output?.trim();

  (<TOptions>parsed.values).keysToExport = parsed.values.keys?.trim() ? parsed.values.keys.split(",") : [];

  return parsed!;
}
export type TRawOptions = ReturnType<typeof parseOptions>["values"];

const optionsDescriptions: Record<keyof TRawOptions, string> = {
  export: `Export format. Valid formats: ${VALID_EXPORT_TYPES.join(",")}`,
  help: "Show this help",
  output: "Output file",
  password: "Password to encrypt/decrypt contents (will prompt if not set)",
  inPlace: "Encrypt/decrypt file in-place, replacing it's contents (default: false)",
  keys: "Comma separated keys to be exported",
};

export function showHelp() {
  let executable = basename(process.execPath);
  const scriptName = process.argv[1];

  if (scriptName?.trim().endsWith(".ts")) {
    executable = `${executable} src/index.ts`;
  }

  const usage = `${executable} [options] <inputFile>`;
  const description = "Encrypt, decrypts and exports configuration files.";
  const argument = ["  inputFile", "Input file to encrypt/decrypt. (Required)"];

  const optionsList: string[][] = [];
  for (const [_largeOption, optionConfig] of Object.entries(options)) {
    const largeOption = <keyof typeof options>_largeOption;

    const isStringType = optionConfig.type === "string";
    const value = isStringType ? `<${largeOption}>` : "";
    const optionUsage = `  --${largeOption}${"short" in optionConfig ? `, -${optionConfig.short}` : ""} ${value}`;

    optionsList.push([optionUsage, optionsDescriptions[largeOption]]);
  }
  const firstColumnMaxLen = optionsList.reduce((maxLen, opt) => Math.max(maxLen, opt[0].length), 0);

  console.log("Usage: ", usage);
  console.log("");
  console.log(description);
  console.log("\nArguments:");
  console.log(argument[0].padEnd(firstColumnMaxLen + 1, " "), argument[1]);
  console.log("\nOptions:");

  for (const opt of optionsList) {
    console.log(opt[0].padEnd(firstColumnMaxLen + 1, " "), opt[1]);
  }
}
