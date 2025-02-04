// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type AnyType = any;
export type FileContents = AnyType;

export type TEncryptFnc = (value: AnyType, password: string) => string;

export type JsonType = "json";
export type YamlType = "yaml";
export type ParseableType = JsonType | YamlType;
