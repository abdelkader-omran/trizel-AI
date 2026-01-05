import path from "path";
import { RuleModule, RuleRunResult } from "../shared/types";

export const checkProvenance: RuleModule = {
  id: "check-provenance",
  title: "Check provenance block presence in key documents (basic)",
  run: async (ctx): Promise<RuleRunResult> => {
    const findings: RuleRunResult["findings"] = [];

    const requiredFiles = ctx.config.gate.provenanceRequiredFiles;
    const requiredMarker = ctx.config.gate.provenanceMarker;

    for (const relFile of requiredFiles) {
      const p = path.join(ctx.repoRoot, relFile);
      if (!ctx.io.exists(p)) {
        findings.push({ severity: "error", message: `Required file missing for provenance check: ${relFile}`, path: relFile });
        continue;
      }
      const text = ctx.io.readText(p);
      if (!text.includes(requiredMarker)) {
        findings.push({
          severity: "error",
          message: `Missing provenance marker "${requiredMarker}"`,
          path: relFile,
        });
      }
    }

    return { ok: findings.length === 0, findings, meta: { marker: requiredMarker } };
  },
};
