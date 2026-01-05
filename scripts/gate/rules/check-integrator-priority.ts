import path from "path";
import { RuleModule, RuleRunResult } from "../shared/types";

/**
 * Minimal integrator-priority enforcement:
 * - ensures repos.registry.json exists (if configured)
 * - checks entries contain { id, priority } with priority as integer >= 0
 */
export const checkIntegratorPriority: RuleModule = {
  id: "check-integrator-priority",
  title: "Check integrator priority registry (basic integrity)",
  run: async (ctx): Promise<RuleRunResult> => {
    const findings: RuleRunResult["findings"] = [];
    const relPath = ctx.config.paths.reposRegistry;
    const p = path.join(ctx.repoRoot, relPath);

    if (!ctx.io.exists(p)) {
      findings.push({ severity: "warning", message: `repos registry not found (skipped): ${relPath}`, path: relPath });
      return { ok: true, findings, meta: { skipped: true } };
    }

    let data: any;
    try {
      data = ctx.io.readJson(p);
    } catch {
      findings.push({ severity: "error", message: `repos registry is not valid JSON: ${relPath}`, path: relPath });
      return { ok: false, findings };
    }

    if (!Array.isArray(data.repos)) {
      findings.push({ severity: "error", message: `repos registry must contain repos: []`, path: relPath });
      return { ok: false, findings };
    }

    for (let i = 0; i < data.repos.length; i++) {
      const r = data.repos[i];
      if (!r || typeof r !== "object") {
        findings.push({ severity: "error", message: `repos[${i}] must be an object`, path: relPath });
        continue;
      }
      if (typeof r.id !== "string" || !r.id.trim()) {
        findings.push({ severity: "error", message: `repos[${i}].id must be a non-empty string`, path: relPath });
      }
      if (!Number.isInteger(r.priority) || r.priority < 0) {
        findings.push({ severity: "error", message: `repos[${i}].priority must be integer >= 0`, path: relPath });
      }
    }

    return { ok: findings.length === 0, findings };
  },
};
