import { PATHS } from "../shared/paths";
import { PageSpec } from "../shared/page";
import { navEn } from "./nav";

/**
 * EN pages registry.
 * Output paths are relative to: public/en/
 */
export function getEnPages(): PageSpec[] {
  return [
    // Home
    {
      locale: "en",
      title: "TRIZEL — Epistemic Operational Portal",
      description:
        "Professional scientific documentation gateway for TRIZEL (FINAL_EXECUTION).",
      outRelPath: "index.html",
      source: {
        kind: "html",
        html: [
          "<h1>TRIZEL — Epistemic Operational Portal</h1>",
          "<p>",
          "This site is the public documentation gateway for TRIZEL.",
          "</p>",
          "<p>",
          'Start with the <a href="/en/spec/index.html">Specification</a> or review the <a href="/en/audit/index.html">Audit</a> view.',
          "</p>",
        ].join(""),
      },
      nav: navEn(),
      statusTags: ["FINAL_EXECUTION", "DOCS_FREEZE"],
      provenance: {
        label: "Repository source",
        sourceRepo: "Abdelkader-omran/trizel-AI",
        sourcePath: "docs/",
        license: "See repository license",
      },
    },

    // Spec index (markdown)
    {
      locale: "en",
      title: "Specification — Index",
      description: "TRIZEL Phase-5 (FINAL_EXECUTION) specification layer.",
      outRelPath: "spec/index.html",
      source: {
        kind: "markdown",
        mdFileAbsPath: PATHS.docs.spec("FINAL_EXECUTION_SPEC.md"),
      },
      nav: navEn(),
      statusTags: ["SPEC", "GOVERNANCE_LOCKED"],
      provenance: {
        label: "docs/spec/FINAL_EXECUTION_SPEC.md",
        sourceRepo: "Abdelkader-omran/trizel-AI",
        sourcePath: "docs/spec/FINAL_EXECUTION_SPEC.md",
        license: "See repository license",
      },
    },

    // Audit index (markdown)
    {
      locale: "en",
      title: "Audit — Index",
      description: "Audit schema and governance checks for FINAL_EXECUTION.",
      outRelPath: "audit/index.html",
      source: {
        kind: "markdown",
        mdFileAbsPath: PATHS.docs.spec("AUDIT_SCHEMA.md"),
      },
      nav: navEn(),
      statusTags: ["AUDIT", "GOVERNANCE_LOCKED"],
      provenance: {
        label: "docs/spec/AUDIT_SCHEMA.md",
        sourceRepo: "Abdelkader-omran/trizel-AI",
        sourcePath: "docs/spec/AUDIT_SCHEMA.md",
        license: "See repository license",
      },
    },

    // Legal: IP Non-Appropriation (markdown)
    {
      locale: "en",
      title: "Legal — IP Non-Appropriation Policy",
      description:
        "Legal policy governing IP non-appropriation and attribution constraints.",
      outRelPath: "legal/ip-non-appropriation.html",
      source: {
        kind: "markdown",
        mdFileAbsPath: PATHS.docs.legal("IP_NON_APPROPRIATION_POLICY.md"),
      },
      nav: navEn(),
      statusTags: ["LEGAL", "GOVERNANCE_LOCKED"],
      provenance: {
        label: "docs/legal/IP_NON_APPROPRIATION_POLICY.md",
        sourceRepo: "Abdelkader-omran/trizel-AI",
        sourcePath: "docs/legal/IP_NON_APPROPRIATION_POLICY.md",
        license: "See repository license",
      },
    },
  ];
}