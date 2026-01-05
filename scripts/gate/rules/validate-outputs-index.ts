import path from "path";
import { RuleModule, RuleRunResult } from "../shared/types";

export const validateOutputsIndex: RuleModule = {
  id: "validate-outputs-index",
  title: "Validate outputs.index presence and basic shape",
  run: async (ctx): Promise<RuleRunResult> => {
    const findings: RuleRunResult["findings"] = [];

    const p = path.join(ctx.repoRoot, ctx.config.paths.outputsIndex);
    if (!ctx.io.exists(p)) {
      findings.push({
        severity: "error",
        message: `outputs.index file not found: ${ctx.config.paths.outputsIndex}`,
        path: ctx.config.paths.outputsIndex,
      });
      return { ok: false, findings };
    }

    let data: any;
    try {
      data = ctx.io.readJson(p);
    } catch {
      findings.push({
        severity: "error",
        message: `outputs.index is not valid JSON: ${ctx.config.paths.outputsIndex}`,
        path: ctx.config.paths.outputsIndex,
      });
      return { ok: false, findings };
    }

    if (typeof data !== "object" || data === null) {
      findings.push({ severity: "error", message: "outputs.index root must be an object", path: ctx.config.paths.outputsIndex });
      return { ok: false, findings };
    }

    if (!Array.isArray(data.items)) {
      findings.push({ severity: "error", message: "outputs.index must contain items: []", path: ctx.config.paths.outputsIndex });
    } else {
      for (let i = 0; i < data.items.length; i++) {
        const it = data.items[i];
        if (typeof it !== "object" || it === null) {
          findings.push({ severity: "error", message: `items[${i}] must be an object`, path: ctx.config.paths.outputsIndex });
          continue;
        }
        if (typeof it.id !== "string" || !it.id.trim()) {
          findings.push({ severity: "error", message: `items[${i}].id must be a non-empty string`, path: ctx.config.paths.outputsIndex });
        }
        if (typeof it.title !== "string" || !it.title.trim()) {
          findings.push({ severity: "error", message: `items[${i}].title must be a non-empty string`, path: ctx.config.paths.outputsIndex });
        }
      }
    }

    return { ok: findings.length === 0, findings };
  },
};
