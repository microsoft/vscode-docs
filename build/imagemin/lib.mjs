// @ts-check
import { resolve } from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";

const extensions = [".png", ".jpg", ".gif"];
const __dirname = fileURLToPath(new URL(".", import.meta.url));

export const alreadyMinifiedPath = resolve(__dirname, "already-minified.json");
export const repoPath = resolve(__dirname, "..", "..");

export const getDirtyImages = () =>
  execSync("git ls-files --others")
    .toString()
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => extensions.some((e) => l.endsWith(e)))
    .map((l) => resolve(repoPath, l));

export const getAlreadyMinified = async () =>
  new Set(
    JSON.parse(
      await fs.readFile(alreadyMinifiedPath, "utf-8").catch(() => "[]")
    )
  );

/** @param {Set<string>} alreadyMinified */
export const saveAlreadyMinified = (alreadyMinified) =>
  fs.writeFile(
    alreadyMinifiedPath,
    JSON.stringify([...alreadyMinified], null, 2)
  );
