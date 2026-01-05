/* TRIZEL — Phase-6 (Execution)
 * Shared domain models for Gate system and Static Site rendering.
 *
 * This file defines *data contracts only*.
 * No logic, no IO, no side effects.
 */

/* ------------------------------------------------------------------ */
/* Core domain enums                                                   */
/* ------------------------------------------------------------------ */

export type Phase =
  | "PHASE-1"
  | "PHASE-2"
  | "PHASE-3"
  | "PHASE-4"
  | "PHASE-5"
  | "PHASE-6";

export type EpistemicStatus =
  | "STABLE"
  | "BETA"
  | "IN_PROGRESS"
  | "INDETERMINATE"
  | "CONTRADICTED"
  | "NOT_TESTABLE";

export type GovernanceLock =
  | "OPEN"
  | "LOCKED";

/* ------------------------------------------------------------------ */
/* Provenance                                                         */
/* ------------------------------------------------------------------ */

export interface Provenance {
  repository: string;
  branch: string;
  commit?: string;
  author?: string;
  license?: string;
  generated_at_iso?: string;
}

/* ------------------------------------------------------------------ */
/* Manifest / Registry models                                         */
/* ------------------------------------------------------------------ */

export interface PortalManifest {
  portal: {
    name: "TRIZEL";
    description?: string;
    homepage?: string;
  };

  outputs: OutputDescriptor[];

  provenance: Provenance;
}

export interface OutputDescriptor {
  id: string;
  title: string;
  description?: string;
  status: EpistemicStatus;
  source_path: string;
  published: boolean;
}

/* ------------------------------------------------------------------ */
/* Repository registry (integrators / producers)                      */
/* ------------------------------------------------------------------ */

export interface RepositoryRegistry {
  repos: RepositoryEntry[];
}

export interface RepositoryEntry {
  id: string;
  priority: number; // lower = higher priority
  role?: "INTEGRATOR" | "PRODUCER";
  url?: string;
}

/* ------------------------------------------------------------------ */
/* Status model                                                        */
/* ------------------------------------------------------------------ */

export interface ProjectStatus {
  phase: Phase;
  state: string;
  governance_lock: GovernanceLock;
  updated_at: string;
}

/* ------------------------------------------------------------------ */
/* Gate report models                                                 */
/* ------------------------------------------------------------------ */

export interface GateFinding {
  rule_id: string;
  severity: "ERROR" | "WARN" | "INFO";
  message: string;
  path?: string;
}

export interface GateRuleSummary {
  rule_id: string;
  title: string;
  ok: boolean;
  findings: GateFinding[];
  duration_ms?: number;
}

export interface GateReportModel {
  project: "TRIZEL";
  phase: Phase;
  status: "PASS" | "FAIL";
  started_at_iso: string;
  finished_at_iso: string;
  provenance: Provenance;
  rules: GateRuleSummary[];
}

/* ------------------------------------------------------------------ */
/* Site rendering models                                              */
/* ------------------------------------------------------------------ */

export type Locale = "en" | "fr";

export interface NavigationItem {
  label: string;
  href: string;
}

export interface SitePage {
  locale: Locale;
  title: string;
  nav: NavigationItem[];
  body_html: string;
  provenance?: Provenance;
}
