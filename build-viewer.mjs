import { readFile, writeFile, rename, rm, lstat } from "node:fs/promises";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { applyPatch } from "diff";
import { downloadTemplate } from "giget";
import { exit } from "node:process";

try {
  if ((await lstat("./viewer")).isDirectory()) {
    exit(0);
  }
} catch {}

const { dir } = await downloadTemplate("gh:vivliostyle/vivliostyle.js#master", {
  force: true,
  forceClean: true,
  install: true,
});

const execProcess = (command, ...args) => {
  const process = spawn(command, args, { cwd: dir });
  return new Promise((resolve) => process.on("exit", resolve));
};

const netTSPath = join(dir, "packages/core/src/vivliostyle/net.ts");
const netTS = await readFile(netTSPath, "utf-8");
const patch = await readFile("./vivliostyle-net.patch", "utf-8");
await writeFile(netTSPath, applyPatch(netTS, patch), "utf-8");

await execProcess("yarn", "workspace", "@vivliostyle/core", "build");
await execProcess("yarn", "workspace", "@vivliostyle/viewer", "build");

await rm("./viewer", { recursive: true, force: true });
await rename(join(dir, "packages/viewer/lib"), "./viewer");
await rm(dir, { recursive: true, force: true });
