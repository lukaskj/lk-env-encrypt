# @lukaskj/lk-env-encrypt

Util to encrypt/decrypt json/yaml/dotenv files values, keeping it's keys.

Inspired by [sops](https://github.com/getsops/sops) and [env-vault](https://github.com/romantomjak/env-vault)

_Note: this project was created for study purposes, not intented to be used in production or to be used as the only reliable tool._

## Usage

```bash
$ ./lk-env-encrypt -h

Usage:  bun.exe src/index.ts [options] <inputFile>

Encrypt, decrypts and exports configuration files.

Arguments:
  inputFile                  Input file to encrypt/decrypt. (Required)

Options:
  --output, -o <output>      Output file
  --password, -p <password>  Password to encrypt/decrypt contents (will prompt if not set)
  --inPlace, -i              Encrypt/decrypt file in-place, replacing it's contents (default: false)
  --export <export>          Export format. Valid formats: json,yaml,env
  --keys, -k <keys>          Comma separated keys to be exported
  --help, -h                 Show this help
```

## Commands:

- `bun run dev`: Run project with `src/index.ts` entrypoint;
- `bun run lint`: Lint source files with `tsc` and `biome`;
- `bun run format`: Format code using `biome` and the configuration file at `biome.json`;
- `bun run test`: Run test files from `test` folder.
- `bun run test:cov`: Run tests with coverage.


