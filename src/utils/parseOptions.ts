import { basename } from "node:path";
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
export type TRawOptions = ReturnType<typeof parseOptions>["values"];

const optionsDescriptions: Record<keyof TRawOptions, string> = {
  export: "Export format",
  help: "Show this help",
  output: "Output file",
  password: "Password to encrypt/decrypt contents (will prompt if not set)",
  pipe: "Pipe output to console (default: false)",
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

/*
Usage: syncr [options] <scenarios...>

Automation tool to help configure and orchestrate remotely via ssh using configuration files.

Arguments:
  scenarios                 Scenarios to sync

Options:
  -s, --serversFile <file>  Servers file (default: "servers.yaml")
  -h, --hosts <hosts>       Run only in specified comma-separated hosts groups
  -d, --debug               Debug mode (default: false)
  -v, --verbose             Verbose (default: false)
  -V, --version             output the version number
  --help                    display help for command
*/
