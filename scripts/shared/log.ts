/* TRIZEL — Phase-6 (Execution)
 * Minimal structured logging for Gate scripts and Site rendering.
 *
 * Principles:
 * - Deterministic and CI-friendly
 * - No external deps
 * - Optional JSON mode for machine parsing
 */

import { Severity } from "./types";

export type LogMode = "text" | "json";

export type LogEvent = {
  ts: string; // ISO
  level: Severity;
  scope: string;
  message: string;
  data?: Record<string, unknown>;
};

function nowISO(): string {
  return new Date().toISOString();
}

function stringifySafe(v: unknown): string {
  try {
    return JSON.stringify(v);
  } catch {
    return `"${String(v)}"`;
  }
}

export class Logger {
  private readonly scope: string;
  private readonly mode: LogMode;

  constructor(scope: string, mode: LogMode = "text") {
    this.scope = scope;
    this.mode = mode;
  }

  info(message: string, data?: Record<string, unknown>) {
    this.emit("INFO", message, data);
  }

  warn(message: string, data?: Record<string, unknown>) {
    this.emit("WARN", message, data);
  }

  error(message: string, data?: Record<string, unknown>) {
    this.emit("ERROR", message, data);
  }

  private emit(level: Severity, message: string, data?: Record<string, unknown>) {
    const evt: LogEvent = { ts: nowISO(), level, scope: this.scope, message, data };

    if (this.mode === "json") {
      // One JSON per line (log ingestion friendly)
      // Do not pretty-print to keep logs compact.
      // eslint-disable-next-line no-console
      console.log(stringifySafe(evt));
      return;
    }

    const head = `${evt.ts} [${evt.level}] ${evt.scope}: ${evt.message}`;
    if (evt.data && Object.keys(evt.data).length > 0) {
      // eslint-disable-next-line no-console
      console.log(`${head} ${stringifySafe(evt.data)}`);
    } else {
      // eslint-disable-next-line no-console
      console.log(head);
    }
  }
}

/** Convenience factory */
export function createLogger(scope: string): Logger {
  const mode = (process.env.TRIZEL_LOG_MODE as LogMode) || "text";
  return new Logger(scope, mode);
}
