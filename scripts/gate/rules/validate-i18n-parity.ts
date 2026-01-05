import path from "path";
import { RuleModule, RuleRunResult } from "../shared/types";

function rel(p: string): string {
  return p.split(path.sep).join("/");
}

export const validateI18nParity: RuleModule = {
  id: "validate-i18n-parity",
  title: "Validate EN/FR parity for generated site structure (when present)",
  run: async (ctx): Promise<RuleRunResult> => {
    const findings: RuleRunResult["findings"] = [];

    const enRoot = path.join(ctx.repoRoot, ctx.config.paths.publicEn);
    const frRoot = path.join(ctx.repoRoot, ctx.config.paths.publicFr);

    // If site not built yet, do not fail hard; enforce only if folders exist and contain files
    const enExists = ctx.io.exists(enRoot);
    const frExists = ctx.io.exists(frRoot);

    if (!enExists || !frExists) {
      findings.push({
        severity: "warning",
        message: "public/en and/or public/fr not present yet; parity check deferred until site build runs",
      });
      return { ok: true, findings, meta: { deferred: true } };
    }

    const enFiles = ctx.io.listFilesRecursive(enRoot).filter((f) => !f.endsWith(".gitkeep"));
    const frFiles = ctx.io.listFilesRecursive(frRoot).filter((f) => !f.endsWith(".gitkeep"));

    if (enFiles.length === 0 || frFiles.length === 0) {
      findings.push({
        severity: "warning",
        message: "public/en or public/fr is empty; parity check deferred until outputs exist",
      });
      return { ok: true, findings, meta: { deferred: true } };
    }

    const enRel = new Set(enFiles.map((f) => rel(path.relative(enRoot, f))));
    const frRel = new Set(frFiles.map((f) => rel(path.relative(frRoot, f))));

    for (const f of enRel) {
      if (!frRel.has(f)) findings.push({ severity: "error", message: `Missing FR counterpart for EN file: ${f}` });
    }
    for (const f of frRel) {
      if (!enRel.has(f)) findings.push({ severity: "error", message: `Missing EN counterpart for FR file: ${f}` });
    }

    return { ok: findings.filter((x) => x.severity === "error").length === 0, findings };
  },
};
