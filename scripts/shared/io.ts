/* TRIZEL — Phase-6 (Execution)
 * Shared filesystem helpers for Gate scripts and Site rendering.
 *
 * Principles:
 * - Deterministic IO (explicit paths, no cwd surprises)
 * - Safe defaults (utf-8, mkdirp)
 * - Minimal surface area (small, composable helpers)
 */

import fs from "fs/promises";
import path from "path";

export type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [k: string]: JsonValue };

/* ------------------------------------------------------------------ */
/* Existence / stats                                                    */
/* ------------------------------------------------------------------ */

export async function exists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

export async function isFile(p: string): Promise<boolean> {
  try {
    const st = await fs.stat(p);
    return st.isFile();
  } catch {
    return false;
  }
}

export async function isDir(p: string): Promise<boolean> {
  try {
    const st = await fs.stat(p);
    return st.isDirectory();
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Directories                                                         */
/* ------------------------------------------------------------------ */

export async function ensureDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function ensureParentDir(filePath: string): Promise<void> {
  await ensureDir(path.dirname(filePath));
}

/* ------------------------------------------------------------------ */
/* Text IO                                                             */
/* ------------------------------------------------------------------ */

export async function readText(filePath: string): Promise<string> {
  return fs.readFile(filePath, "utf8");
}

export async function writeText(
  filePath: string,
  content: string,
  opts?: { ensureParent?: boolean }
): Promise<void> {
  if (opts?.ensureParent !== false) {
    await ensureParentDir(filePath);
  }
  await fs.writeFile(filePath, content, "utf8");
}

/* ------------------------------------------------------------------ */
/* JSON IO                                                             */
/* ------------------------------------------------------------------ */

export async function readJson<T = unknown>(filePath: string): Promise<T> {
  const raw = await readText(filePath);
  try {
    return JSON.parse(raw) as T;
  } catch (e: any) {
    const msg = e?.message ? String(e.message) : "Invalid JSON";
    throw new Error(`Failed to parse JSON: ${filePath} — ${msg}`);
  }
}

export async function writeJson(
  filePath: string,
  data: JsonValue,
  opts?: { pretty?: boolean; ensureParent?: boolean }
): Promise<void> {
  const pretty = opts?.pretty !== false;
  const json = pretty ? JSON.stringify(data, null, 2) + "\n" : JSON.stringify(data);
  await writeText(filePath, json, { ensureParent: opts?.ensureParent });
}

/* ------------------------------------------------------------------ */
/* Copy / list                                                         */
/* ------------------------------------------------------------------ */

export async function copyFile(
  src: string,
  dest: string,
  opts?: { ensureParent?: boolean }
): Promise<void> {
  if (opts?.ensureParent !== false) {
    await ensureParentDir(dest);
  }
  await fs.copyFile(src, dest);
}

export async function listDir(dirPath: string): Promise<string[]> {
  const entries = await fs.readdir(dirPath);
  return entries.sort();
}

/* ------------------------------------------------------------------ */
/* Safe path helpers                                                   */
/* ------------------------------------------------------------------ */

export function normalizePosix(p: string): string {
  // For reports / manifests: stable separators regardless of OS.
  return p.split(path.sep).join("/");
}

export function joinPosix(...parts: string[]): string {
  return normalizePosix(path.join(...parts));
}
