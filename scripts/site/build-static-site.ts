import fs from "fs";
import path from "path";
import { renderIndexEN } from "./render/en/index";
import { renderIndexFR } from "./render/fr/index";

function writeFile(p: string, content: string) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf8");
}

function repoRootFromHere(): string {
  return path.resolve(__dirname, "..", "..");
}

export function buildStaticSite(): void {
  const repoRoot = repoRootFromHere();

  const outEn = path.join(repoRoot, "public", "en", "index.html");
  const outFr = path.join(repoRoot, "public", "fr", "index.html");

  writeFile(outEn, renderIndexEN());
  writeFile(outFr, renderIndexFR());

  // audit dir is reserved for gate outputs
  fs.mkdirSync(path.join(repoRoot, "public", "audit"), { recursive: true });
}

if (require.main === module) {
  buildStaticSite();
  console.log("SITE: build complete -> public/en + public/fr");
}
