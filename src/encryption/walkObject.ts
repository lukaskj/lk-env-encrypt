import type { FileContents, TEncryptFnc } from "../types";

export function walkObject(data: FileContents, password: string, fnc: TEncryptFnc): void {
  walkObjectDfs(data, undefined, fnc);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  function walkObjectDfs(data: any, key: string | undefined, fnc: TEncryptFnc) {
    const stack = [[data, key]];

    while (stack.length) {
      const node = stack.pop();
      if (!node) break;
      const curData = node[0];
      const curKey = node[1];

      if (curKey && curData[curKey]) {
        if (typeof curData[curKey] !== "object") {
          curData[curKey] = fnc(curData[curKey], password);
        } else if (Array.isArray(curData[curKey])) {
          curData[curKey] = curData[curKey].map((value) => fnc(value, password));
        } else {
          stack.push([curData[curKey], undefined]);
        }
      }

      if (!curKey) {
        for (const k of Object.keys(curData)) {
          stack.push([curData, k]);
        }
      }
    }
  }
}
