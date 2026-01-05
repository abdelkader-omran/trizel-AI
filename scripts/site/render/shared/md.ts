/**
 * Minimal Markdown → HTML renderer (safe subset).
 * Supported:
 * - # / ## / ### headings
 * - paragraphs
 * - unordered lists (- / * )
 * - fenced code blocks ```lang
 * - inline code `code`
 * - links [text](url)
 *
 * Notes:
 * - This is intentionally conservative (no raw HTML passthrough).
 * - Designed for repository docs rendering, not full Markdown spec.
 */

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderInline(md: string): string {
  let out = escapeHtml(md);

  // inline code
  out = out.replace(/`([^`]+)`/g, (_m, code) => `<code>${escapeHtml(code)}</code>`);

  // links
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_m, text, url) => `<a href="${escapeHtml(url)}" rel="noopener noreferrer">${escapeHtml(text)}</a>`
  );

  return out;
}

export function markdownToHtml(md: string): string {
  const lines = md.replaceAll("\r\n", "\n").split("\n");

  const html: string[] = [];
  let inCode = false;
  let codeLang = "";
  let codeBuf: string[] = [];
  let listBuf: string[] = [];
  let paraBuf: string[] = [];

  const flushPara = () => {
    if (paraBuf.length === 0) return;
    const text = paraBuf.join(" ").trim();
    if (text) html.push(`<p>${renderInline(text)}</p>`);
    paraBuf = [];
  };

  const flushList = () => {
    if (listBuf.length === 0) return;
    html.push("<ul>");
    for (const item of listBuf) html.push(`<li>${renderInline(item)}</li>`);
    html.push("</ul>");
    listBuf = [];
  };

  const flushCode = () => {
    const code = codeBuf.join("\n");
    const klass = codeLang ? ` class="language-${escapeHtml(codeLang)}"` : "";
    html.push(`<pre><code${klass}>${escapeHtml(code)}</code></pre>`);
    codeBuf = [];
    codeLang = "";
  };

  for (const rawLine of lines) {
    const line = rawLine ?? "";

    // fenced code
    const fence = line.match(/^```(.*)$/);
    if (fence) {
      if (!inCode) {
        flushPara();
        flushList();
        inCode = true;
        codeLang = (fence[1] || "").trim();
      } else {
        inCode = false;
        flushCode();
      }
      continue;
    }

    if (inCode) {
      codeBuf.push(line);
      continue;
    }

    // headings
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      flushPara();
      flushList();
      const level = h[1].length;
      const text = h[2].trim();
      html.push(`<h${level}>${renderInline(text)}</h${level}>`);
      continue;
    }

    // list items
    const li = line.match(/^\s*[-*]\s+(.*)$/);
    if (li) {
      flushPara();
      listBuf.push(li[1].trim());
      continue;
    }

    // blank line flushers
    if (line.trim() === "") {
      flushPara();
      flushList();
      continue;
    }

    // paragraph accumulation
    paraBuf.push(line.trim());
  }

  flushPara();
  flushList();
  if (inCode) flushCode();

  return html.join("\n");
}
