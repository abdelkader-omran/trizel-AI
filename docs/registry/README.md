# TRIZEL Registry Documentation

## Overview

This directory contains documentation for the TRIZEL Project Registry, which provides a canonical map of all repositories, their roles, and relationships within the TRIZEL ecosystem.

---

## Canonical Source

### Primary Registry File
- **Repository:** `trizel-ai/trizel-core` (READ ONLY)
- **File Path:** `TRIZEL_REGISTRY.yaml`
- **Status:** Canonical Layer-0 Governance Source

### Access Method
- **Type:** Allowlist-only ingestion
- **Strategy:** Commit-pinned reference or build-time fetch from authorized raw URL
- **Update Policy:** Manual sync with provenance tracking

---

## Allowlist Rules

### Authorized Sources
The registry consumption system **only** ingests data from explicitly allowlisted sources:

1. **Primary Source:** `trizel-ai/trizel-core/TRIZEL_REGISTRY.yaml`
2. **Allowlist Policy:** No automatic repository discovery
3. **Verification:** Source provenance must be verified before ingestion
4. **Audit Trail:** All sync operations must record source commit hash and timestamp

### Prohibited Actions
- **No auto-discovery** of repositories
- **No dynamic scanning** of GitHub organizations
- **No inference** of repository relationships
- **No interpretation** of registry data beyond factual display

---

## Provenance Requirements

Every registry data display must include:

1. **Source Commit Hash:** Git SHA of the consumed registry file
2. **Last Sync Date:** Timestamp of most recent ingestion (UTC)
3. **Canonical URL:** Link to the authoritative source file
4. **Verification Status:** Confirmation that source is allowlisted

Example provenance display:
```
Source: trizel-ai/trizel-core/TRIZEL_REGISTRY.yaml
Commit: abc123def456... (2026-01-12)
Last Sync: 2026-01-12 10:30 UTC
Status: Verified Allowlisted Source
```

---

## Non-Interpretive Constraints

The registry display system must be **strictly non-interpretive**:

### Permitted Displays
✓ Repository name and URL  
✓ Layer designation (as stated in registry)  
✓ Role/purpose (verbatim from registry)  
✓ Status indicators (stable/beta/in-progress as defined)  
✓ Direct links to repositories  
✓ Provenance metadata  

### Prohibited Displays
✗ Analytical claims or interpretations  
✗ Ranking or scoring of repositories  
✗ Computed relationships not in registry  
✗ Editorial commentary  
✗ Inferred status beyond stated data  
✗ Comparative evaluations  

---

## Language Policy

### Currently Supported
- **English (EN)** — Primary language
- **French (FR)** — Full translation equivalence
- **Arabic (AR)** — Full translation equivalence with RTL support

### Reserved for Future
- **Chinese (ZH)** — Explicitly reserved; marked as "Planned" / "Coming soon"

### Requirements
1. **Content Parity:** All public content must be available in EN, FR, and AR
2. **No Asymmetry:** No language should have more or less information than others
3. **RTL Support:** Arabic pages must use correct right-to-left text direction
4. **ZH Placeholder:** Chinese must appear in language selector with "Planned" status

---

## Implementation Strategy

### Build-Time Approach (Preferred)
If static site generation is available:
1. Fetch `TRIZEL_REGISTRY.yaml` from allowlisted raw URL at build time
2. Parse YAML and generate static HTML pages
3. Embed provenance metadata in generated pages
4. Fail build if source verification fails

### Manual Sync Approach (Fallback)
If build-time tooling is not present:
1. Document manual sync procedure clearly
2. Provide sync timestamp and commit hash tracking
3. Create audit trail for each sync operation
4. Keep process simple and auditable

**Current Implementation:** Manual sync with documented procedure (see build documentation)

---

## Registry Data Schema

Expected fields from `TRIZEL_REGISTRY.yaml`:

```yaml
repositories:
  - name: "Repository Name"
    url: "https://github.com/org/repo"
    layer: "Layer-N"
    role: "Role description"
    status: "stable|beta|in-progress"
    description: "Factual description"
```

Display only the fields present in the canonical source. Do not infer missing fields.

---

## Update Workflow

1. **Detection:** Monitor `trizel-core` for registry updates (manual check)
2. **Verification:** Confirm update is from authorized maintainer
3. **Sync:** Fetch updated registry file
4. **Validation:** Verify YAML syntax and schema compliance
5. **Rebuild:** Regenerate registry display pages
6. **Provenance:** Update commit hash and sync timestamp
7. **Audit:** Log sync operation with full metadata

---

## Security and Integrity

### Data Integrity
- Source file must be fetched over HTTPS
- Commit hash verification required
- No execution of untrusted code
- Schema validation before use

### Access Control
- Registry source is public (open-access repository)
- No credentials required for read access
- Allowlist prevents unauthorized source injection

---

## Contact

For questions about registry integration:
- **Email:** admin1@trizel-ai.com
- **Website:** https://trizel-ai.com/
- **Canonical Source Owner:** trizel-ai organization (GitHub)

---

**Document Version:** 1.0  
**Last Updated:** 2026-01-12  
**Status:** Active
