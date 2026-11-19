// 19 November 2026 — The World in One Day
// Entry for the make.fun bounty "news-image-20261119".
// This program copies the entry image (entry.png, sitting next to this
// file) into the output directory chosen by the environment variable
// MAKEFUN_OUTPUT_DIR, falling back to /output when the variable is unset.

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";

if (!existsSync(source)) {
  console.error(`Missing source image: ${source}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const destination = join(outDir, "entry.png");
copyFileSync(source, destination);

// Verify the copy landed intact before reporting success.
const sourceBytes = statSync(source).size;
const copiedBytes = statSync(destination).size;
if (sourceBytes !== copiedBytes) {
  console.error(
    `Copy mismatch: source is ${sourceBytes} bytes, destination is ${copiedBytes} bytes.`,
  );
  process.exit(1);
}
console.log(`Copied entry.png (${copiedBytes} bytes) to ${destination}`);
