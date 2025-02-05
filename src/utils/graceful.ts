export function registerGracefulShutdown(): void {
  ["SIGINT", "SIGTERM", "SIGBREAK", "SIGQUIT"].forEach((signal) => {
    process.on(signal, async () => {
      process.exit(0);
    });
  });
}
