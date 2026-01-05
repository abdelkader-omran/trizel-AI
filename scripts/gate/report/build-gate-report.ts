import path from "path";
import crypto from "crypto";
import { GateContext, GateRunSummary } from "../shared/types";

function sha256(text: string): string {
  return crypto.createHash("sha256").update(text, "utf8").digest("hex");
}

function mdEscape(s: string): string {
  return s.replace(/[|]/g, "\\|");
}

export async function buildGateReport(ctx: GateContext, summary: GateRunSummary): Promise<void> {
  const outDir = path.join(ctx.repoRoot, ctx.config.paths.publicAudit);
  const jsonPath = path.join(outDir, "gate-report.json");
  const mdPath = path.join(outDir, "gate-report.md");

  const cfgText = JSON.stringify(ctx.config, null, 2);
  const configHash = sha256(cfgText);

  const payload = {
    ...summary,
    configHash,
  };

  ctx.io.writeJson(jsonPath, payload);

  const lines: string[] = [];
  lines.push(`# GATE REPORT`);
  lines.push(``);
  lines.push(`- **Result:** ${summary.ok ? "PASS" : "FAIL"}`);
  lines.push(`- **Started:** ${summary.startedAtISO}`);
  lines.push(`- **Finished:** ${summary.finishedAtISO}`);
  lines.push(`- **Config Hash (sha256):** \`${configHash}\``);
  lines.push(`- **CI:** ${summary.env.ci ? "true" : "false"}`);
  if (summary.env.github_sha) lines.push(`- **GITHUB_SHA:** \`${summary.env.github_sha}\``);
  if (summary.env.github_ref) lines.push(`- **GITHUB_REF:** \`${summary.env.github_ref}\``);
  lines.push(``);

  lines.push(`## Rules`);
  lines.push(``);
  lines.push(`| Rule | Status | Duration (ms) | Findings |`);
  lines.push(`|---|---:|---:|---:|`);

  for (const r of summary.rules) {
    const findingsCount = r.findings.length;
    lines.push(
      `| ${mdEscape(`${r.id} — ${r.title}`)} | ${r.ok ? "PASS" : "FAIL"} | ${r.duration_ms} | ${findingsCount} |`
    );
  }

  lines.push(``);
  lines.push(`## Findings`);
  lines.push(``);

  for (const r of summary.rules) {
    if (!r.findings.length) continue;
    lines.push(`### ${r.id} — ${r.title}`);
    for (const f of r.findings) {
      const p = f.path ? ` (${f.path})` : "";
      lines.push(`- **${f.severity.toUpperCase()}**: ${mdEscape(f.message)}${mdEscape(p)}`);
    }
    lines.push(``);
  }

  ctx.io.writeText(mdPath, lines.join("\n") + "\n");
}
