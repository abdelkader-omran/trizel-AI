/* TRIZEL — Phase-6 (Execution)
 * Shared error utilities for Gate scripts and Site rendering.
 *
 * Goals:
 * - Consistent error shape (code, message, details)
 * - Safe serialization for JSON reports
 * - Clear CLI-friendly formatting
 */

export type ErrorCode =
  | "E_CONFIG"
  | "E_IO"
  | "E_PARSE"
  | "E_VALIDATE"
  | "E_RULE"
  | "E_RENDER"
  | "E_INTERNAL";

export type ErrorDetails = Record<string, unknown>;

export class TrizelError extends Error {
  public readonly code: ErrorCode;
  public readonly details?: ErrorDetails;
  public readonly cause?: unknown;

  constructor(code: ErrorCode, message: string, details?: ErrorDetails, cause?: unknown) {
    super(message);
    this.name = "TrizelError";
    this.code = code;
    this.details = details;
    this.cause = cause;
  }
}

/* ------------------------------------------------------------------ */
/* Type guards                                                         */
/* ------------------------------------------------------------------ */

export function isTrizelError(e: unknown): e is TrizelError {
  return typeof e === "object" && e !== null && (e as any).name === "TrizelError";
}

export function asError(e: unknown): Error {
  if (e instanceof Error) return e;
  return new Error(typeof e === "string" ? e : "Unknown error");
}

/* ------------------------------------------------------------------ */
/* Constructors                                                        */
/* ------------------------------------------------------------------ */

export function err(
  code: ErrorCode,
  message: string,
  details?: ErrorDetails,
  cause?: unknown
): TrizelError {
  return new TrizelError(code, message, details, cause);
}

export function wrap(
  code: ErrorCode,
  message: string,
  cause: unknown,
  details?: ErrorDetails
): TrizelError {
  // Preserve TrizelError code if already present? No: caller decides.
  return new TrizelError(code, message, details, cause);
}

/* ------------------------------------------------------------------ */
/* Serialization                                                       */
/* ------------------------------------------------------------------ */

export type SerializableError = {
  name: string;
  code?: string;
  message: string;
  details?: ErrorDetails;
  stack?: string;
  cause?: { name: string; message: string; stack?: string };
};

function serializeCause(cause: unknown): SerializableError["cause"] | undefined {
  if (!cause) return undefined;
  const c = asError(cause);
  return {
    name: c.name || "Error",
    message: c.message || "Unknown error",
    stack: c.stack,
  };
}

export function toSerializableError(e: unknown, opts?: { includeStack?: boolean }): SerializableError {
  const includeStack = opts?.includeStack !== false;

  if (isTrizelError(e)) {
    return {
      name: e.name,
      code: e.code,
      message: e.message,
      details: e.details,
      stack: includeStack ? e.stack : undefined,
      cause: serializeCause(e.cause),
    };
  }

  const base = asError(e);
  return {
    name: base.name || "Error",
    message: base.message || "Unknown error",
    stack: includeStack ? base.stack : undefined,
  };
}

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

export function formatError(e: unknown): string {
  const se = toSerializableError(e, { includeStack: false });

  const header = se.code ? `[${se.code}] ${se.message}` : se.message;
  const lines: string[] = [header];

  if (se.details && Object.keys(se.details).length > 0) {
    lines.push(`details: ${safeJson(se.details)}`);
  }

  if (se.cause) {
    lines.push(`cause: ${se.cause.name}: ${se.cause.message}`);
  }

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/* Safe JSON                                                           */
/* ------------------------------------------------------------------ */

export function safeJson(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return `"${String(value)}"`;
  }
}
