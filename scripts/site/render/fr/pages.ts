import { PATHS } from "../shared/paths";
import { PageSpec } from "../shared/page";
import { buildDefaultNav } from "../shared/nav";

export function getFrPages(): PageSpec[] {
  const locale = "fr" as const;
  const nav = buildDefaultNav(locale);

  return [
    {
      locale,
      title: "Accueil",
      outRelPath: "index.html",
      source: { kind: "html", html: `<p>Passerelle publique pour TRIZEL.</p>` },
      nav,
      statusTags: ["PHASE-6", "EXECUTION"],
    },
    {
      locale,
      title: "Spécifications",
      outRelPath: "spec/index.html",
      source: {
        kind: "markdown",
        mdFileAbsPath: PATHS.repo.docs("spec/FINAL_EXECUTION_SPEC.md"),
      },
      nav,
      statusTags: ["SPEC", "GOVERNANCE-LOCKED"],
      provenance: {
        label: "Rendu depuis les docs du dépôt",
        sourceRepo: "Abdelkader-omran/trizel-AI",
        sourcePath: "docs/spec/FINAL_EXECUTION_SPEC.md",
      },
    },
    {
      locale,
      title: "Feuille de route Phase-5",
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
    {
      locale,
      title: "Juridique",
      outRelPath: "legal/index.html",
      source: {
        kind: "html",
        html: `<ul>
  <li><a href="/fr/legal/ip-non-appropriation.html">Non-appropriation IP</a></li>
  <li><a href="/fr/legal/researcher-submission.html">Soumission Chercheur</a></li>
</ul>`,
      },
      nav,
      statusTags: ["LEGAL"],
    },
    {
      locale,
      title: "Non-appropriation IP",
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
      title: "Soumission Chercheur",
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
