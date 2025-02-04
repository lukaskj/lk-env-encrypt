import { main } from "./main";

let exitCode = 0;
try {
  const args = process.argv.splice(2);
  exitCode = await main(args);
} catch (error) {
  exitCode = 1;
  console.error(error);
} finally {
  process.exit(exitCode);
}
