// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type FileContents = any;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type TEncryptFnc = (value: any, password: string) => string;

export type JsonType = "json";
export type YamlType = "yaml";
export type ParseableType = JsonType | YamlType;
