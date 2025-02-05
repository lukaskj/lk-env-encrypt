import { createInterface } from "node:readline/promises";
import { clearLine, emitKeypressEvents, moveCursor } from "node:readline";

const input = process.stdin;
const output = process.stdout;

export async function readPasswordInput(): Promise<string | undefined> {
  emitKeypressEvents(input);
  if (input.isTTY) input.setRawMode(true);
  const rl = createInterface(input, output);

  rl.on("SIGINT", function () {
    process.emit("SIGINT");
  });

  process.stdin.on("keypress", (_, key) => {
    if (!key.ctrl) {
      moveCursor(output, -1, 0);
      clearLine(output, 1);
    }
  });

  try {
    const pass = await rl.question("Password: ");

    return pass;
  } finally {
    if ("history" in rl && Array.isArray(rl.history) && rl.history.length > 0) {
      rl.history.slice(1);
    }
    rl.close();
  }
}
