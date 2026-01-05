import { renderNav } from "../shared/nav";
import { renderStatusTags } from "../shared/status-tags";
import { renderProvenanceBlock } from "../shared/provenance-block";

export function renderIndexFR(): string {
  const title = "TRIZEL — Portail Opérationnel Épistémique";
  const nav = renderNav("fr");
  const tags = renderStatusTags("fr");
  const prov = renderProvenanceBlock("fr");

  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${title}</title>
</head>
<body>
  <header>
    <h1>${title}</h1>
    ${nav}
  </header>

  <main>
    ${tags}
    <section>
      <h2>Périmètre</h2>
      <p>Passerelle publique pour des artefacts scientifiques gouvernés. Rendu déterministe et auditable.</p>
    </section>

    ${prov}
  </main>
</body>
</html>`;
}
