export function renderProvenanceBlock(lang: "en" | "fr"): string {
  const title = lang === "en" ? "Provenance" : "Provenance";
  const body =
    lang === "en"
      ? "All published artifacts must preserve authorship, licensing boundaries, and repository provenance."
      : "Tous les artefacts publiés doivent préserver l’attribution, les frontières de licence et la provenance du dépôt.";

  return `<section>
    <h2>${title}</h2>
    <p>${body}</p>
  </section>`;
}
