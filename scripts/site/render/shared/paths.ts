import path from "node:path";
import fs from "node:fs/promises";

export type Locale = "en" | "fr";

export const REPO_ROOT = process.cwd();

export const PATHS = {
  repo: {
    docs: (p: string) => path.join(REPO_ROOT, "docs", p),
    root: (p: string) => path.join(REPO_ROOT, p),
  },
  out: {
    localeRoot: (locale: Locale) => path.join(REPO_ROOT, "public", locale),
    localePage: (locale: Locale, relHtmlPath: string) =>
      path.join(REPO_ROOT, "public", locale, relHtmlPath),
  },
};

export async function ensureDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function writeTextFile(filePath: string, content: string): Promise<void> {
  const dir = path.dirname(filePath);
  await ensureDir(dir);
  await fs.writeFile(filePath, content, "utf8");
}

export async function readTextFile(filePath: string): Promise<string> {
  return await fs.readFile(filePath, "utf8");
}
