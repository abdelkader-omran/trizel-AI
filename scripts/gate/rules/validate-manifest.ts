import path from "path";
import { RuleModule, RuleRunResult } from "../shared/types";

export const validateManifest: RuleModule = {
  id: "validate-manifest",
  title: "Validate manifest presence and basic shape",
  run: async (ctx): Promise<RuleRunResult> => {
    const findings: RuleRunResult["findings"] = [];

    const manifestPath = path.join(ctx.repoRoot, ctx.config.paths.manifest);
    if (!ctx.io.exists(manifestPath)) {
      findings.push({
        severity: "error",
        message: `Manifest file not found: ${ctx.config.paths.manifest}`,
        path: ctx.config.paths.manifest,
      });
      return { ok: false, findings };
    }

    let data: any;
    try {
      data = ctx.io.readJson(manifestPath);
    } catch {
      findings.push({
        severity: "error",
        message: `Manifest is not valid JSON: ${ctx.config.paths.manifest}`,
        path: ctx.config.paths.manifest,
      });
      return { ok: false, findings };
    }

    // Minimal non-schema checks (Phase-6 allows schemas later; keep robust now)
    if (typeof data !== "object" || data === null) {
      findings.push({ severity: "error", message: "Manifest root must be an object", path: ctx.config.paths.manifest });
    }

    const required = ["portal", "outputs", "provenance"];
    for (const k of required) {
      if (!(k in data)) {
        findings.push({ severity: "error", message: `Missing required key: ${k}`, path: ctx.config.paths.manifest });
      }
    }

    return { ok: findings.length === 0, findings, meta: { manifestPath: ctx.config.paths.manifest } };
  },
};
