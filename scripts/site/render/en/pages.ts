import { PATHS } from "../shared/paths";
import { PageSpec } from "../shared/page";
import { buildDefaultNav } from "../shared/nav";

export function getEnPages(): PageSpec[] {
  const locale = "en" as const;
  const nav = buildDefaultNav(locale);

  return [
    // HOME
    {
      locale,
      title: "Home",
      outRelPath: "index.html",
      source: { kind: "html", html: `<p>Public gateway for TRIZEL.</p>` },
      nav,
      statusTags: ["PHASE-6", "EXECUTION"],
    },

    // SPEC INDEX (renders docs/spec bundle landing)
    {
      locale,
      title: "Specifications",
      outRelPath: "spec/index.html",
      source: {
        kind: "markdown",
        mdFileAbsPath: PATHS.repo.docs("spec/FINAL_EXECUTION_SPEC.md"),
      },
      nav,
      statusTags: ["SPEC", "GOVERNANCE-LOCKED"],
      provenance: {
        label: "Rendered from repository docs",
        sourceRepo: "Abdelkader-omran/trizel-AI",
        sourcePath: "docs/spec/FINAL_EXECUTION_SPEC.md",
      },
    },

    // PHASE-5 ROADMAP (kept accessible as reference)
    {
      locale,
      title: "Phase-5 Roadmap",
      outRelPath: "phase5/roadmap.html",
      source: {
        kind: "markdown",
        mdFileAbsPath: PATHS.repo.docs("phase5/ROADMAP.md"),
      },
      nav,
      statusTags: ["PHASE-5", "FREEZE"],
      provenance: {
        sourceRepo: "Abdelkader-omran/trizel-AI",
        sourcePath: "docs/phase5/ROADMAP.md",
      },
    },

    // LEGAL INDEX
    {
      locale,
      title: "Legal",
      outRelPath: "legal/index.html",
      source: {
        kind: "html",
        html: `<ul>
  <li><a href="/en/legal/ip-non-appropriation.html">IP Non-Appropriation</a></li>
  <li><a href="/en/legal/researcher-submission.html">Researcher Submission</a></li>
</ul>`,
      },
      nav,
      statusTags: ["LEGAL"],
    },

    // If these files exist under docs/legal, point to them.
    {
      locale,
      title: "IP Non-Appropriation",
      outRelPath: "legal/ip-non-appropriation.html",
      source: { kind: "markdown", mdFileAbsPath: PATHS.repo.docs("legal/IP_NON_APPROPRIATION_POLICY.md") },
      nav,
      statusTags: ["LEGAL", "IP-PROTECTION"],
      provenance: {
        sourceRepo: "Abdelkader-omran/trizel-AI",
        sourcePath: "docs/legal/IP_NON_APPROPRIATION_POLICY.md",
      },
    },
    {
      locale,
      title: "Researcher Submission",
      outRelPath: "legal/researcher-submission.html",
      source: { kind: "markdown", mdFileAbsPath: PATHS.repo.docs("legal/RESEARCHER_SUBMISSION_POLICY.md") },
      nav,
      statusTags: ["LEGAL", "SUBMISSION"],
      provenance: {
        sourceRepo: "Abdelkader-omran/trizel-AI",
        sourcePath: "docs/legal/RESEARCHER_SUBMISSION_POLICY.md",
      },
    },
  ];
}
