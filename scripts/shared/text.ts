/* TRIZEL — Phase-6 (Execution)
 * Text helpers for scanning, normalization, and deterministic outputs.
 */

export function normalizeNewlines(input: string): string {
  // Normalize CRLF/CR to LF for deterministic scanning and output.
  return input.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

export function hasAnySubstring(haystack: string, needles: string[]): string | null {
  for (const n of needles) {
    if (!n) continue;
    if (haystack.includes(n)) return n;
  }
  return null;
}

export function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, Math.max(0, max - 1)) + "…";
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
