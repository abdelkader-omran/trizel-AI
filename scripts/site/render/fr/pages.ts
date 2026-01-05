import { PageSpec } from "../shared/page";
import { getFrNav } from "./nav";
import { PATHS } from "../shared/paths";

export function getFrPages(): PageSpec[] {
  const nav = getFrNav();

  return [
    {
      locale: "fr",
      title: "TRIZEL — Portail épistémique opérationnel",
      outRelPath: "index.html",
      source: {
        kind: "html",
        html: `
          <h1>TRIZEL — Portail épistémique opérationnel</h1>
          <p>
            Ce site publie les artefacts officiels (spécifications, gouvernance, audit, juridique)
            pour le projet TRIZEL.
          </p>
          <p>
            Utilisez la navigation pour accéder aux documents validés.
          </p>
        `,
      },
      description:
        "Portail public TRIZEL : spécifications, gouvernance, audit et documents juridiques.",
      statusTags: ["FINAL_EXECUTION", "GOVERNANCE_LOCKED"],
      provenance: {
        label: "TRIZEL repository",
        sourceRepo: "Abdelkader-omran/trizel-AI",
        sourcePath: "docs/",
      },
      nav,
    },

    // SPEC
    {
      locale: "fr",
      title: "Spécifications — TRIZEL",
      outRelPath: "spec/index.html",
      source: {
        kind: "markdown",
        mdFileAbsPath: PATHS.docs.spec("FINAL_EXECUTION_SPEC.md"),
      },
      description: "Spécification d’exécution (Phase-5) — version gelée.",
      statusTags: ["SPEC", "FINAL_EXECUTION", "GOVERNANCE_LOCKED"],
      provenance: {
        label: "Canonical spec",
        sourceRepo: "Abdelkader-omran/trizel-AI",
        sourcePath: "docs/spec/FINAL_EXECUTION_SPEC.md",
      },
      nav,
    },

    // AUDIT
    {
      locale: "fr",
      title: "Audit — TRIZEL",
      outRelPath: "audit/index.html",
      source: {
        kind: "markdown",
        mdFileAbsPath: PATHS.docs.spec("AUDIT_SCHEMA.md"),
      },
      description: "Schéma d’audit et exigences de conformité.",
      statusTags: ["AUDIT", "FINAL_EXECUTION", "GOVERNANCE_LOCKED"],
      provenance: {
        label: "Audit schema",
        sourceRepo: "Abdelkader-omran/trizel-AI",
        sourcePath: "docs/spec/AUDIT_SCHEMA.md",
      },
      nav,
    },

    // LEGAL
    {
      locale: "fr",
      title: "Juridique — Non-appropriation IP",
      outRelPath: "legal/ip-non-appropriation.html",
      source: {
        kind: "markdown",
        mdFileAbsPath: PATHS.docs.legal("IP_NON_APPROPRIATION_POLICY.md"),
      },
      description: "Politique de non-appropriation de la propriété intellectuelle.",
      statusTags: ["LEGAL", "FINAL_EXECUTION", "GOVERNANCE_LOCKED"],
      provenance: {
        label: "Legal policy",
        sourceRepo: "Abdelkader-omran/trizel-AI",
        sourcePath: "docs/legal/IP_NON_APPROPRIATION_POLICY.md",
      },
      nav,
    },
  ];
}