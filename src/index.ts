import { main } from "./main";

let exitCode = 0;
try {
  const args = process.argv.splice(2);
  exitCode = await main(args);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} catch (error: any) {
  exitCode = 1;
  const errorMessage = "message" in error ? error.message : error;
  console.error(errorMessage);
} finally {
  process.exit(exitCode);
}
