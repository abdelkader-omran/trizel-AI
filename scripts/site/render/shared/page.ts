import { Locale, PATHS, readTextFile, writeTextFile } from "./paths";
import { markdownToHtml } from "./md";
import { renderLayout } from "./layout";
import { NavItem } from "./nav";

export type PageSpec = {
  locale: Locale;
  title: string;

  // Output relative to public/{locale}/
  outRelPath: string; // e.g. "spec/index.html" or "legal/ip.html"

  // Either markdown doc or raw html builder
  source?:
    | { kind: "markdown"; mdFileAbsPath: string }
    | { kind: "html"; html: string };

  description?: string;
  statusTags?: string[];
  provenance?: {
    label?: string;
    sourceRepo?: string;
    sourcePath?: string;
    license?: string;
  };

  nav: NavItem[];
};

export async function renderPage(spec: PageSpec): Promise<void> {
  const bodyHtml =
    spec.source?.kind === "markdown"
      ? markdownToHtml(await readTextFile(spec.source.mdFileAbsPath))
      : spec.source?.kind === "html"
      ? spec.source.html
      : "<p>No content.</p>";

  const activePath = `/${spec.locale}/${spec.outRelPath}`.replaceAll("//", "/");

  const html = renderLayout({
    locale: spec.locale,
    title: spec.title,
    description: spec.description,
    nav: spec.nav,
    activePath,
    bodyHtml,
    statusTags: spec.statusTags,
    provenance: spec.provenance
      ? {
          label: spec.provenance.label,
          sourceRepo: spec.provenance.sourceRepo,
          sourcePath: spec.provenance.sourcePath,
          license: spec.provenance.license,
        }
      : undefined,
  });

  const outAbs = PATHS.out.localePage(spec.locale, spec.outRelPath);
  await writeTextFile(outAbs, html);
}
