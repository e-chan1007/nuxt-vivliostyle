import { readFile, writeFile, rename, rm, lstat } from "node:fs/promises";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { applyPatch } from "diff";
import { downloadTemplate } from "giget";
import { exit } from "node:process";
import { tmpdir } from "node:os";

const { dir } = await downloadTemplate("gh:vivliostyle/vivliostyle.js#master", {
  cwd: tmpdir(),
  force: true,
});

const execProcess = (command, args, cwd = dir) => {
  const process = spawn(command, args, { cwd, stdio: "inherit" });
  return new Promise((resolve) => process.on("exit", resolve));
};

await writeFile(join(dir, ".yarnrc.yml"), "nodeLinker: node-modules", "utf-8");
await execProcess("yarn", ["install"]);

const netTSPath = join(dir, "packages/core/src/vivliostyle/net.ts");
const netTS = await readFile(netTSPath, "utf-8");
const patch = await readFile("./vivliostyle-net.patch", "utf-8");
await writeFile(netTSPath, applyPatch(netTS, patch), "utf-8");

await execProcess("yarn", ["build", "--ignore=@vivliostyle/react"]);

await rm("./viewer", { recursive: true, force: true });
await rename(join(dir, "packages/viewer/lib"), "./viewer");
await rm(dir, { recursive: true, force: true });
