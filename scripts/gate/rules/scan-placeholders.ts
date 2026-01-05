import path from "path";
import { RuleModule, RuleRunResult } from "../shared/types";

const DEFAULT_PLACEHOLDERS = ["TODO", "TBD", "FIXME", "<<PLACEHOLDER>>"];

export const scanPlaceholders: RuleModule = {
  id: "scan-placeholders",
  title: "Scan documentation for forbidden placeholders",
  run: async (ctx): Promise<RuleRunResult> => {
    const findings: RuleRunResult["findings"] = [];
    const needles = ctx.config.gate.placeholders?.length ? ctx.config.gate.placeholders : DEFAULT_PLACEHOLDERS;

    const roots = ctx.config.gate.placeholderScanRoots.map((p) => path.join(ctx.repoRoot, p));
    for (const root of roots) {
      if (!ctx.io.exists(root)) continue;
      const files = ctx.io
        .listFilesRecursive(root)
        .filter((f) => /\.(md|txt|json|html|ts)$/i.test(f))
        .slice(0, ctx.config.gate.maxFilesToScan);

      for (const f of files) {
        const text = ctx.io.readText(f);
        for (const n of needles) {
          if (text.includes(n)) {
            findings.push({
              severity: "error",
              message: `Placeholder "${n}" detected`,
              path: path.relative(ctx.repoRoot, f).split(path.sep).join("/"),
            });
            break;
          }
        }
      }
    }

    return { ok: findings.length === 0, findings, meta: { placeholders: needles } };
  },
};
