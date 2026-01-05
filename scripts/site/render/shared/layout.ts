import { Locale } from "./paths";
import { buildNavHtml, NavItem } from "./nav";
import { renderStatusTagsHtml } from "./status-tags";
import { renderProvenanceBlockHtml, ProvenanceInput } from "./provenance-block";

export type LayoutInput = {
  locale: Locale;
  title: string;
  description?: string;
  nav: NavItem[];
  activePath?: string; // e.g. "/en/spec/index.html"
  bodyHtml: string;
  statusTags?: string[];
  provenance?: ProvenanceInput;
};

function langLabel(locale: Locale): string {
  return locale === "fr" ? "FR" : "EN";
}

export function renderLayout(input: LayoutInput): string {
  const { locale, title, description, nav, activePath, bodyHtml, statusTags, provenance } = input;

  const navHtml = buildNavHtml({ locale, nav, activePath });

  const tagsHtml = statusTags?.length ? renderStatusTagsHtml(statusTags) : "";
  const provHtml = provenance ? renderProvenanceBlockHtml(provenance, locale) : "";

  const metaDesc = description ? `<meta name="description" content="${escapeAttr(description)}" />` : "";

  return `<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)} · TRIZEL</title>
  ${metaDesc}
  <style>
    :root { color-scheme: dark; }
    body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; background: #0b0d12; color: #e7e9ee; }
    a { color: #7aa7ff; text-decoration: none; }
    a:hover { text-decoration: underline; }
    header { border-bottom: 1px solid #1c2230; background: #0b0d12; position: sticky; top: 0; }
    .wrap { max-width: 980px; margin: 0 auto; padding: 18px 16px; }
    .brand { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
    .brand h1 { margin: 0; font-size: 16px; letter-spacing: 0.4px; }
    .pill { font-size: 12px; padding: 2px 10px; border: 1px solid #273046; border-radius: 999px; color: #c7d1ea; }
    nav { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 10px; }
    nav a { padding: 6px 10px; border-radius: 8px; border: 1px solid transparent; }
    nav a.active { border-color: #273046; background: #0f1420; }
    main { padding: 26px 0 44px; }
    h2,h3 { margin-top: 22px; }
    pre { overflow-x: auto; padding: 12px; background: #0f1420; border: 1px solid #273046; border-radius: 10px; }
    code { background: #0f1420; border: 1px solid #273046; border-radius: 6px; padding: 1px 6px; }
    ul { padding-left: 18px; }
    footer { border-top: 1px solid #1c2230; color: #a9b3cc; font-size: 12px; padding: 18px 0; }
    .meta { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; }
  </style>
</head>
<body>
<header>
  <div class="wrap">
    <div class="brand">
      <h1>TRIZEL · Epistemic Operational Portal</h1>
      <span class="pill">${langLabel(locale)}</span>
    </div>
    ${navHtml}
    <div class="meta">
      ${tagsHtml}
    </div>
  </div>
</header>

<main class="wrap">
  <h2>${escapeHtml(title)}</h2>
  ${bodyHtml}
  ${provHtml}
</main>

<footer>
  <div class="wrap">
    <div>TRIZEL · Phase-6 Execution · Static site rendering</div>
  </div>
</footer>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttr(s: string): string {
  return escapeHtml(s).replaceAll('"', "&quot;");
}
