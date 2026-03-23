import * as dotenv from "dotenv";
dotenv.config();

import { createWriteStream, existsSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import archiver from "archiver";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distDir = `${__dirname}/../dist`;
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

const brand = process.env.PUBLIC_BRAND || "archive";
const zipPath = `${__dirname}/../${brand}.zip`;

const output = createWriteStream(zipPath);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => {
  const sizeMB = (archive.pointer() / (1024 * 1024)).toFixed(2);
  console.log(`Archive created: ${brand}.zip (${sizeMB} MB)`);
});

archive.on("error", (err) => {
  throw err;
});

archive.pipe(output);
archive.directory("dist", false);
archive.finalize();
