/* TRIZEL — Phase-6 (Execution)
 * JSON helpers for deterministic parsing and reporting.
 */

import { TrizelError } from "./errors";
import { JsonValue } from "./io";

export function parseJson<T = unknown>(raw: string, ctx?: { file?: string }): T {
  try {
    return JSON.parse(raw) as T;
  } catch (e: any) {
    const file = ctx?.file ? ` (${ctx.file})` : "";
    throw new TrizelError(
      "E_PARSE",
      `Invalid JSON${file}: ${e?.message ?? "parse error"}`,
      { file: ctx?.file ?? null },
      e
    );
  }
}

/**
 * Deterministic JSON stringify:
 * - stable indentation (2 spaces)
 * - trailing newline for file output
 */
export function stringifyJson(value: JsonValue, opts?: { pretty?: boolean; newline?: boolean }): string {
  const pretty = opts?.pretty !== false;
  const nl = opts?.newline !== false;

  const out = pretty ? JSON.stringify(value, null, 2) : JSON.stringify(value);
  return nl ? out + "\n" : out;
}
