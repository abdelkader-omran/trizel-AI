import fs from "fs";
import path from "path";
import { PortalConfig } from "./types";

const DEFAULT_CONFIG: PortalConfig = {
  paths: {
    manifest: "portal.manifest.json",
    outputsIndex: "outputs.index.json",
    status: "status.json",
    reposRegistry: "repos.registry.json",

    publicEn: "public/en",
    publicFr: "public/fr",
    publicAudit: "public/audit",
  },

  gate: {
    placeholders: ["TODO", "TBD", "FIXME", "<<PLACEHOLDER>>"],
    placeholderScanRoots: ["docs"],
    maxFilesToScan: 5000,

    provenanceMarker: "PROVENANCE",
    provenanceRequiredFiles: [
      "docs/spec/PUBLISHING_RULES_AND_PROVENANCE.md",
      "docs/spec/FINAL_EXECUTION_SPEC.md",
    ],
  },
};

function deepMerge<T extends Record<string, any>>(base: T, patch: Partial<T>): T {
  const out: any = Array.isArray(base) ? [...base] : { ...base };
  for (const [k, v] of Object.entries(patch)) {
    if (v === undefined) continue;
    if (v && typeof v === "object" && !Array.isArray(v) && base[k] && typeof base[k] === "object" && !Array.isArray(base[k])) {
      out[k] = deepMerge(base[k], v as any);
    } else {
      out[k] = v;
    }
  }
  return out as T;
}

export function loadPortalConfig(repoRoot: string): PortalConfig {
  const cfgPath = path.join(repoRoot, "portal.config.json");
  if (!fs.existsSync(cfgPath)) {
    return DEFAULT_CONFIG;
  }

  let userCfg: any;
  try {
    userCfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
  } catch {
    // Fail-safe: use defaults if config is invalid JSON
    return DEFAULT_CONFIG;
  }

  return deepMerge(DEFAULT_CONFIG, userCfg);
}
