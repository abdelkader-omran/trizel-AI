import fs from "fs";
import path from "path";
import { buildGateReport } from "./report/build-gate-report";
import { GateContext, GateRunSummary, RuleModule, RuleResult } from "./shared/types";
import { loadPortalConfig } from "./shared/load-config";

import { validateManifest } from "./rules/validate-manifest";
import { validateOutputsIndex } from "./rules/validate-outputs-index";
import { validateStatus } from "./rules/validate-status";
import { validateI18nParity } from "./rules/validate-i18n-parity";
import { scanPlaceholders } from "./rules/scan-placeholders";
import { checkIntegratorPriority } from "./rules/check-integrator-priority";
import { checkProvenance } from "./rules/check-provenance";

function nowISO(): string {
  return new Date().toISOString();
}

function repoRootFromHere(): string {
  // scripts/gate/run.ts -> repo root
  return path.resolve(__dirname, "..", "..");
}

async function runRule(ctx: GateContext, mod: RuleModule): Promise<RuleResult> {
  const startedAt = Date.now();
  try {
    const res = await mod.run(ctx);
    return {
      id: mod.id,
      title: mod.title,
      ok: res.ok,
      findings: res.findings ?? [],
      meta: res.meta ?? {},
      duration_ms: Date.now() - startedAt,
    };
  } catch (e: any) {
    return {
      id: mod.id,
      title: mod.title,
      ok: false,
      findings: [
        {
          severity: "error",
          message: `Unhandled exception: ${e?.message ?? String(e)}`,
        },
      ],
      meta: { stack: e?.stack ?? null },
      duration_ms: Date.now() - startedAt,
    };
  }
}

export async function main(): Promise<number> {
  const repoRoot = repoRootFromHere();
  const cfg = loadPortalConfig(repoRoot);

  const ctx: GateContext = {
    repoRoot,
    config: cfg,
    startedAtISO: nowISO(),
    env: {
      node: process.version,
      ci: Boolean(process.env.CI),
      github_sha: process.env.GITHUB_SHA ?? null,
      github_ref: process.env.GITHUB_REF ?? null,
    },
    io: {
      exists: (p) => fs.existsSync(p),
      readText: (p) => fs.readFileSync(p, "utf8"),
      readJson: (p) => JSON.parse(fs.readFileSync(p, "utf8")),
      listFilesRecursive: (dir) => {
        const out: string[] = [];
        const walk = (d: string) => {
          for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
            const full = path.join(d, entry.name);
            if (entry.isDirectory()) walk(full);
            else out.push(full);
          }
        };
        walk(dir);
        return out;
      },
      writeText: (p, content) => {
        fs.mkdirSync(path.dirname(p), { recursive: true });
        fs.writeFileSync(p, content, "utf8");
      },
      writeJson: (p, data) => {
        fs.mkdirSync(path.dirname(p), { recursive: true });
        fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n", "utf8");
      },
    },
  };

  const rules: RuleModule[] = [
    validateManifest,
    validateOutputsIndex,
    validateStatus,
    validateI18nParity,
    scanPlaceholders,
    checkIntegratorPriority,
    checkProvenance,
  ];

  const results: RuleResult[] = [];
  for (const r of rules) {
    results.push(await runRule(ctx, r));
  }

  const summary: GateRunSummary = {
    startedAtISO: ctx.startedAtISO,
    finishedAtISO: nowISO(),
    repoRoot: ctx.repoRoot,
    env: ctx.env,
    ok: results.every((r) => r.ok),
    rules: results,
  };

  await buildGateReport(ctx, summary);

  // Print minimal console output for CI logs
  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.error(`GATE: FAIL (${failed.length}/${results.length})`);
    for (const f of failed) {
      console.error(`- ${f.id}: ${f.title}`);
      for (const k of f.findings) console.error(`  * [${k.severity}] ${k.message}`);
    }
    return 1;
  }

  console.log(`GATE: PASS (${results.length}/${results.length})`);
  return 0;
}

if (require.main === module) {
  main().then((code) => process.exit(code));
}
