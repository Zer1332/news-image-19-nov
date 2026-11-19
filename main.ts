// news-image-19-nov: copy entry.png to the make.fun output directory.
// Node 22, standard library only, no network.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const source = join(import.meta.dirname, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(import.meta.dirname, "out");
const target = join(outDir, "entry.png");

if (!existsSync(source)) {
  console.error(`entry.png not found next to main.ts: ${source}`);
  process.exit(1);
}

try {
  mkdirSync(outDir, { recursive: true });
  copyFileSync(source, target);
} catch (error) {
  console.error(`Failed to copy entry.png to ${target}: ${error.message}`);
  process.exit(1);
}

if (!existsSync(target)) {
  console.error(`Copy reported success but ${target} is missing.`);
  process.exit(1);
}
console.log(`Copied entry.png to ${target}`);
