import { getEnPages } from "./render/en/pages";
import { getFrPages } from "./render/fr/pages";
import { renderPage } from "./render/shared/page";

export async function buildStaticSite(): Promise<void> {
  const pages = [...getEnPages(), ...getFrPages()];

  for (const p of pages) {
    await renderPage(p);
  }
}