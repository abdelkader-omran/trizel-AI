/* TRIZEL — Phase-6 (Execution)
 * Shared types used by Gate + Site rendering.
 */

export type Locale = "en" | "fr";

export type GateStatus = "PASS" | "FAIL";

export type Severity = "INFO" | "WARN" | "ERROR";

export interface GateIssue {
  rule_id: string;
  severity: Severity;
  message: string;
  file?: string;
  hint?: string;
}

export interface GateRuleResult {
  rule_id: string;
  status: GateStatus;
  issues: GateIssue[];
}

export interface GateReport {
  project: "TRIZEL";
  phase: "PHASE-6";
  target_branch: string;
  generated_at_iso: string;
  status: GateStatus;
  results: GateRuleResult[];
}

export interface ReadTextOptions {
  allow_missing?: boolean;
}

export interface WriteTextOptions {
  ensure_dir?: boolean;
  newline?: "lf" | "crlf";
}

export interface RenderContext {
  locale: Locale;
  base_url: string;
}
