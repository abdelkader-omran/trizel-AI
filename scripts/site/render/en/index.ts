import { renderNav } from "../shared/nav";
import { renderStatusTags } from "../shared/status-tags";
import { renderProvenanceBlock } from "../shared/provenance-block";

export function renderIndexEN(): string {
  const title = "TRIZEL — Epistemic Operational Portal";
  const nav = renderNav("en");
  const tags = renderStatusTags("en");
  const prov = renderProvenanceBlock("en");

  return `<!doctype html>
<html lang="en">
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
      <h2>Scope</h2>
      <p>Public gateway for governed scientific artifacts. Rendering is deterministic and audit-visible.</p>
    </section>

    ${prov}
  </main>
</body>
</html>`;
}
