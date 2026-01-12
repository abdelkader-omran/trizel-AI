# TRIZEL-AI — Official Reference Portal

**Status:** OFFICIAL REFERENCE  
**Phase:** Execution (Phase-6)  
**Authority Level:** Canonical Governance-Compliant Portal

TRIZEL-AI is the **authoritative, governance-compliant scientific portal**
for the TRIZEL research framework. This repository has transitioned from
the Freeze phase (Phase-5) to the Execution phase (Phase-6), marking its
operationalization as the **official public-facing reference** for TRIZEL
methodology, governance, and research artifacts.

---

## Official Reference Status Declaration

As of the Execution Phase (Phase-6), this portal is declared as:

- **The authoritative gateway** to TRIZEL scientific documentation
- **The canonical registry** of TRIZEL repositories and their roles
- **The official multilingual interface** (EN/FR/AR, with ZH reserved)
- **The governance-enforced aggregator** of research artifacts with full provenance

This status supersedes all previous descriptive or non-authoritative characterizations.

---

## Purpose and Scope

The TRIZEL-AI portal serves as:

### What It IS

**A Governance-Compliant Portal:**
- Authoritative reference for TRIZEL methodology and architecture
- Canonical registry of federated TRIZEL repositories (TRIZEL_REGISTRY.yaml)
- Evidence-first aggregator with immutable provenance tracking
- Multilingual documentation hub (EN/FR/AR with content parity, ZH reserved)

**A Scientific Infrastructure:**
- Static rendering of validated, version-controlled content
- DOI-backed immutable archival records (via Zenodo)
- Transparent audit trails and version traceability
- Layer-separated architecture preventing interpretive contamination

**A Public Interface:**
- Read-only viewer and aggregator (no knowledge generation)
- Provenance-first display of research artifacts
- Governance-boundary-respecting presentation layer
- Accessible, professional scientific documentation

### What It is NOT

This repository does **not**:
- Generate hypotheses or theoretical claims
- Perform scientific analysis or interpretation
- Exercise editorial authority over results
- Rank or score scientific theories
- Claim ownership of external work without consent

Any analytical intelligence originates from upstream federated repositories
(Monitor, Algorithm, Analysis, Evaluation layers), not from the portal itself.

---

## Core Documentation

### Conceptual Foundation

- **[TRIZEL Overview](docs/TRIZEL_OVERVIEW.md)** — Comprehensive introduction to TRIZEL concepts, purpose, and methodology (multilingual: EN/FR/AR)
- **[Layer Architecture](docs/LAYER_ARCHITECTURE.md)** — Detailed explanation of Monitor, Algorithm, Analysis, and Evaluation layers, and why inference is deferred
- **[Governance Model](docs/GOVERNANCE_MODEL.md)** — Governance invariants, layer separation enforcement, and registry model

### Governance and Registry

- **[TRIZEL_REGISTRY.yaml](TRIZEL_REGISTRY.yaml)** — Canonical registry of all TRIZEL repositories (single source of truth, allowlist-only)
- **[Governance Invariants](docs/phase5/GOVERNANCE_INVARIANTS.md)** — Non-negotiable rules enforced across all TRIZEL components
- **[Final Execution Acceptance Contract](docs/phase5/FINAL_EXECUTION_ACCEPTANCE_CONTRACT.md)** — Mandatory acceptance criteria for Execution Phase

### Public Portal Pages

- **[Home](/)** — Portal entry with official status declaration
- **[Methodology](/methodology/)** — Methodological boundaries and epistemic framework
- **[Status](/status/)** — Operational status with UTC timestamps and boolean indicators
- **[Evidence](/evidence/)** — Immutable archival pointers (DOI) and provenance registry
- **[Repositories](/repositories/)** — Registry-based repository map
- **[System Map](/system-map/)** — Visual architecture and layer relationships
- **[Project Map](/project-map/)** — Multilingual project overview and registry

---

## Phase Transition: Freeze to Execution

### Historical Context

The TRIZEL program previously operated under bounded phases:

- **Phase-1:** Conceptual precursor (external)
- **Phase-2:** Epistemic state definitions
- **Phase-3:** Deterministic execution boundaries
- **Phase-4:** Governance and evaluation limits
- **Phase-5:** Documentation finalization and closeout (Freeze Phase)

### Current Phase: Execution (Phase-6)

**Status:** ACTIVE  
**Declaration Date:** 2026-01-12  
**Scope:** Operationalization of frozen TRIZEL methodology into official public-facing scientific documentation

**What Changed:**
- Portal upgraded from "descriptive interface" to **OFFICIAL REFERENCE STATUS**
- Frozen governance structures now **operationally enforced**
- Layer separation model now **publicly documented and binding**
- Registry model now **canonical and authoritative**
- Multilingual parity (EN/FR/AR) now **mandatory for all public content**

**What Remained Immutable:**
- Governance invariants from Phase-5
- Epistemic boundaries and layer architecture
- Non-appropriation policy and consent requirements
- Audit supremacy and deployment blocking rules

The Freeze Phase established the rules; the Execution Phase applies them to operational scientific work.

---

## TRIZEL Architecture: Layered Epistemic Model

TRIZEL operates through **strictly separated architectural layers**, each with defined epistemic roles:

### Layer 1: Monitor
**Role:** Observational data collection without interpretation  
**Function:** Ingest data from authoritative sources (MPC, NASA/JPL, ESA, etc.)  
**Constraint:** No analysis, no selection bias, factual observations only

### Layer 2: Algorithm
**Role:** Deterministic computation on monitored data  
**Function:** Execute reproducible mathematical transformations  
**Constraint:** No subjective parameters, no interpretation, version-controlled

### Layer 3: Analysis
**Role:** Pattern detection and relationship identification  
**Function:** Identify correlations, trends, deviations within evidence bounds  
**Constraint:** No causal claims without validation, methodology fully disclosed

### Layer 4: Evaluation
**Role:** Assessment within explicit governance criteria  
**Function:** Apply predefined evaluation rubrics, generate compliance reports  
**Constraint:** Criteria-driven, no interpretive authority, **deferred inference**

### Layer 6: Portal (This Repository)
**Role:** Public-facing aggregation and display  
**Function:** Present research artifacts with full provenance in multilingual formats  
**Constraint:** Viewer/aggregator only, no knowledge generation, governance-compliant

**Why Inference is Deferred:**  
To maintain **epistemic neutrality** and **governance compliance**, TRIZEL defers interpretive claims that require subjective judgment or theoretical commitment. This preserves scientific integrity by separating observation/computation (TRIZEL's domain) from interpretation (researcher's domain).

**For detailed layer explanation:** See [docs/LAYER_ARCHITECTURE.md](docs/LAYER_ARCHITECTURE.md)

---

## Governance Compliance

This portal operates under **absolute governance invariants**:

1. **Layer Separation:** Strict architectural boundaries enforced
2. **Read-Only Registry:** TRIZEL_REGISTRY.yaml is canonical, allowlist-only
3. **Provenance Tracking:** All artifacts include source, version, timestamp, epistemic status
4. **Multilingual Parity:** EN/FR/AR with content equivalence, ZH reserved
5. **Non-Appropriation:** No external work claimed without explicit consent
6. **Epistemic Status Labeling:** Stable / Beta / In Progress for all outputs
7. **Audit Supremacy:** Deployment blocked if any validation fails
8. **Immutability:** Published DOI records cannot be altered
9. **No Placeholders:** Professional scientific quality required
10. **Open Science Licensing:** CC BY 4.0 for portal content

**Violation of any invariant blocks deployment.**

See [docs/GOVERNANCE_MODEL.md](docs/GOVERNANCE_MODEL.md) for complete governance documentation.

---

## Multilingual Support

**Active Languages:**
- **English (EN)** — Primary
- **French (FR)** — Full translation equivalence
- **Arabic (AR)** — Full translation equivalence with RTL support

**Reserved Language:**
- **Chinese (ZH)** — Explicitly reserved for future implementation

**Parity Requirement:**  
All public content must exist in EN, FR, and AR with identical structure and semantic meaning. Language asymmetry blocks deployment.

---

## Open Science and Licensing

**Portal License:** [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE)

**License Scope:**
- Portal HTML, CSS, JavaScript, documentation
- Configuration files (YAML, JSON)
- Non-code textual content

**License Clarifications:**
- Does NOT transfer ownership of external datasets (MPC, NASA/JPL, ESA, etc.)
- Does NOT override licenses of federated repositories
- Does NOT apply to third-party libraries (they retain their licenses)

**Scientific Compliance:**
- Aligns with international open science principles
- Enables reproducibility through transparent methodologies
- Provides verifiability through full provenance and audit trails
- Supports collaboration via federated repository architecture

**Archival Records:**  
Stable artifacts are archived with DOI through Zenodo: https://doi.org/10.5281/zenodo.18149691

---

## Authoritative Identifiers

**Principal Investigator:**
- **ORCID:** [0009-0003-9884-3697](https://orcid.org/0009-0003-9884-3697)

**Archival Records:**
- **Latest DOI:** [10.5281/zenodo.18149691](https://doi.org/10.5281/zenodo.18149691)
- **DOI Resolver:** https://doi.org/

**Authoritative Data Sources:**
- **Minor Planet Center (MPC):** https://minorplanetcenter.net/
- **NASA/JPL Solar System Dynamics:** https://ssd.jpl.nasa.gov/
- **JPL Horizons:** https://ssd.jpl.nasa.gov/horizons/
- **CNEOS:** https://cneos.jpl.nasa.gov/
- **ESA:** https://www.esa.int/
- **Zenodo:** https://zenodo.org/

---

## Repository Ecosystem

The TRIZEL ecosystem consists of federated repositories, each with defined roles and layers. All repository relationships are documented in the **canonical registry:**

**Registry Location:** [TRIZEL_REGISTRY.yaml](TRIZEL_REGISTRY.yaml)

**Registry Consumption Rules:**
- Allowlist-only ingestion (no auto-discovery)
- Commit-pinned references with provenance tracking
- Read-only access (no programmatic modification)
- Verification of source before display

**Key Repositories:**
- **trizel-ai/trizel-core** — Layer-0 Governance & Registry Core
- **trizel-ai/trizel-epistemic-engine** — Historical Phase-5 Epistemic Framework (archived)
- **abdelkader-omran/trizel-AI** — Layer-6 Official Reference Portal (this repository)

For complete repository listing with roles and status, see the registry file or visit https://trizel-ai.com/repositories/

---

## Building and Deployment

**Hosting:** GitHub Pages (static site)  
**Build Mode:** Static generation (no runtime computation)  
**Deployment Branch:** `main`

**No Build Process Required:**
- Pure static HTML/CSS/JavaScript
- Client-side language switching (no server-side rendering)
- Build metadata in `build.json` (updated via GitHub Actions)

**Governance Enforcement:**
- Automated audit checks before deployment
- Language parity validation
- Registry compliance verification
- Provenance completeness checks
- Deployment blocked on any validation failure

---

## Scientific Position

This portal makes **no scientific claims** and exercises **no interpretive authority**.

**What the Portal Does:**
- Aggregates and displays research artifacts with provenance
- Documents governance rules and methodological boundaries
- Provides navigation and discovery tools
- Ensures multilingual accessibility

**What the Portal Does NOT Do:**
- Interpret observations or generate theories
- Endorse specific models or frameworks
- Assert theoretical superiority or conclusions
- Exercise editorial judgment over scientific content

**Its function is to reduce ambiguity, not to resolve it.**

All epistemic authority remains with:
- Authoritative data sources (MPC, NASA/JPL, ESA, etc.)
- Federated repository authors (with explicit consent)
- External researchers interpreting the evidence

---

## Contact and Contribution

**Website:** https://trizel-ai.com/  
**Email:** admin1@trizel-ai.com  
**Organization:** TRIZEL International Group

**Contributing:**
- All contributions must respect governance invariants
- Code review required for all changes
- Multilingual parity must be maintained
- Documentation updates required for governance-relevant changes

**Reporting Issues:**
- Use GitHub Issues for technical problems
- Include reproduction steps and expected behavior
- Tag issues appropriately (bug, documentation, governance)

---

## Document Version and Provenance

**README Version:** 2.0.0  
**Last Updated:** 2026-01-12  
**Phase:** Execution (Phase-6)  
**Status:** Official Reference Documentation

**Change Log:**
- v2.0.0 (2026-01-12): Upgraded to OFFICIAL REFERENCE STATUS for Execution Phase
- v1.0.0 (Prior): Descriptive interface documentation (superseded)

**Related Documentation:**
- [TRIZEL_OVERVIEW.md](docs/TRIZEL_OVERVIEW.md)
- [LAYER_ARCHITECTURE.md](docs/LAYER_ARCHITECTURE.md)
- [GOVERNANCE_MODEL.md](docs/GOVERNANCE_MODEL.md)
- [GOVERNANCE_INVARIANTS.md](docs/phase5/GOVERNANCE_INVARIANTS.md)
- [TRIZEL_REGISTRY.yaml](TRIZEL_REGISTRY.yaml)

---

**TRIZEL-AI** — Official Reference Portal for Evidence-First Scientific Research  
Phase-6 Execution | Governance-Compliant | Multilingual | Open Science