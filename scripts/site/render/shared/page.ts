import * as path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";

/**
 * SHARED — Page model + renderer (writes static HTML to /public/{lang}/...).
 * Keep this module dependency-light so EN/FR pages can evolve independently.
 */

export type Lang = "en" | "fr";

export type Page = {
  lang: Lang;

  /**
   * URL-like slug without leading/trailing slash.
   * Examples:
   *  - ""            => /{lang}/ (root)
   *  - "about"       => /{lang}/about/
   *  - "docs/spec"   => /{lang}/docs/spec/
   */
  slug: string;

  /** <title> and primary heading */
  title: string;

  /** Optional short summary (can be used for meta description) */
  description?: string;

  /** Pre-rendered HTML for the page body (inside <main>) */
  bodyHtml: string;
};

/**
 * Render one page and write it to:
 *   public/{lang}/{slug}/index.html
 *
 * Root page ("") becomes:
 *   public/{lang}/index.html
 */
export async function renderPage(page: Page): Promise<void> {
  const outFile = getOutputFilePath(page.lang, page.slug);
  const outDir = path.dirname(outFile);

  await mkdir(outDir, { recursive: true });

  const html = buildHtmlDocument(page);

  await writeFile(outFile, html, "utf8");
}

export function getOutputFilePath(lang: Lang, slug: string): string {
  const safeSlug = normalizeSlug(slug);

  // Root:
  if (safeSlug === "") {
    return path.join("public", lang, "index.html");
  }

  // Nested:
  return path.join("public", lang, safeSlug, "index.html");
}

function normalizeSlug(slug: string): string {
  const s = (slug ?? "").trim();

  // Remove leading/trailing slashes and collapse backslashes.
  const cleaned = s.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");

  // Prevent path traversal.
  if (cleaned.includes("..")) {
    throw new Error(`Invalid slug (path traversal not allowed): "${slug}"`);
  }

  return cleaned;
}

function buildHtmlDocument(page: Page): string {
  const title = escapeHtml(page.title);
  const description = page.description ? escapeHtml(page.description) : "";
  const langAttr = page.lang;

  return [
    "<!doctype html>",
    `<html lang="${langAttr}">`,
    "<head>",
    '  <meta charset="utf-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1" />',
    `  <title>${title}</title>`,
    description ? `  <meta name="description" content="${description}" />` : "",
    "  <style>",
    "    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,Arial,sans-serif;margin:0;line-height:1.5;}",
    "    header,main,footer{max-width:980px;margin:0 auto;padding:24px;}",
    "    header{border-bottom:1px solid #e5e5e5;}",
    "    footer{border-top:1px solid #e5e5e5;color:#444;font-size:14px;}",
    "    nav a{margin-right:12px;text-decoration:none;}",
    "    nav a:hover{text-decoration:underline;}",
    "    h1{margin:0 0 16px 0;}",
    "  </style>",
    "</head>",
    "<body>",
    "  <header>",
    "    <nav>",
    renderDefaultNav(page.lang),
    "    </nav>",
    "  </header>",
    "  <main>",
    `    <h1>${title}</h1>`,
    page.bodyHtml?.trim() ? `    ${page.bodyHtml}` : "    <p>(empty)</p>",
    "  </main>",
    "  <footer>",
    `    <div>TRIZEL — ${page.lang.toUpperCase()} — Static render</div>`,
    "  </footer>",
    "</body>",
    "</html>",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

function renderDefaultNav(lang: Lang): string {
  const base = `/${lang}/`;
  const other: Lang = lang === "en" ? "fr" : "en";
  const otherBase = `/${other}/`;

  // Minimal nav for now; can be replaced later by shared/nav.ts.
  return [
    `<a href="${base}">Home</a>`,
    `<a href="${base}docs/">Docs</a>`,
    `<a href="${base}audit/">Audit</a>`,
    `<a href="${otherBase}">Switch: ${other.toUpperCase()}</a>`,
  ].join("");
}

function escapeHtml(input: string): string {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}