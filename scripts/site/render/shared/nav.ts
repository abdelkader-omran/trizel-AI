export function renderNav(lang: "en" | "fr"): string {
  const items =
    lang === "en"
      ? [
          { href: "/en/index.html", label: "Home" },
          { href: "/audit/gate-report.md", label: "Audit" },
        ]
      : [
          { href: "/fr/index.html", label: "Accueil" },
          { href: "/audit/gate-report.md", label: "Audit" },
        ];

  const links = items.map((it) => `<a href="${it.href}">${it.label}</a>`).join(" | ");
  return `<nav>${links}</nav>`;
}
