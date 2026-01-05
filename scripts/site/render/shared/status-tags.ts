export function renderStatusTags(lang: "en" | "fr"): string {
  const title = lang === "en" ? "Status" : "Statut";
  const tags =
    lang === "en"
      ? ["Governance-locked", "Audit-visible", "Deterministic build"]
      : ["Gouvernance verrouillée", "Audit visible", "Build déterministe"];

  return `<section>
    <h2>${title}</h2>
    <ul>
      ${tags.map((t) => `<li>${t}</li>`).join("\n")}
    </ul>
  </section>`;
}
