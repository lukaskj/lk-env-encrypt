import type { TExportType } from "./consts";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type AnyType = any;
export type FileContents = AnyType;

export type TEncryptFnc = (value: AnyType, password: string) => string;

export type TOptions = {
  output?: string;
  export?: TExportType;
  password?: string;
  inPlace: boolean;
  pipe: boolean;
  help: boolean;
  keysToExport: string[];
};

export type TArguments = {
  positionals: string[];
  values: TOptions;
};
