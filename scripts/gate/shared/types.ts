export type FindingSeverity = "error" | "warning" | "info";

export type Finding = {
  severity: FindingSeverity;
  message: string;
  path?: string;
  line?: number;
};

export type RuleRunResult = {
  ok: boolean;
  findings: Finding[];
  meta?: Record<string, any>;
};

export type RuleResult = {
  id: string;
  title: string;
  ok: boolean;
  findings: Finding[];
  meta: Record<string, any>;
  duration_ms: number;
};

export type RuleModule = {
  id: string;
  title: string;
  run: (ctx: GateContext) => Promise<RuleRunResult>;
};

export type PortalConfig = {
  paths: {
    manifest: string;
    outputsIndex: string;
    status: string;
    reposRegistry: string;

    publicEn: string;
    publicFr: string;
    publicAudit: string;
  };

  gate: {
    placeholders: string[];
    placeholderScanRoots: string[];
    maxFilesToScan: number;

    provenanceMarker: string;
    provenanceRequiredFiles: string[];
  };
};

export type GateContext = {
  repoRoot: string;
  config: PortalConfig;
  startedAtISO: string;

  env: {
    node: string;
    ci: boolean;
    github_sha: string | null;
    github_ref: string | null;
  };

  io: {
    exists: (p: string) => boolean;
    readText: (p: string) => string;
    readJson: (p: string) => any;
    listFilesRecursive: (dir: string) => string[];
    writeText: (p: string, content: string) => void;
    writeJson: (p: string, data: any) => void;
  };
};

export type GateRunSummary = {
  startedAtISO: string;
  finishedAtISO: string;
  repoRoot: string;
  env: GateContext["env"];
  ok: boolean;
  rules: RuleResult[];
};
