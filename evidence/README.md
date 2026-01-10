# Evidence Layer — TRIZEL-AI

**Repository:** abdelkader-omran/trizel-AI  
**Directory:** `/evidence/`  
**Phase:** 5 — Evidence Layer Initialization  
**Status:** Descriptive, Non-Interpretive

---

## Scope

This directory implements a **first-class Evidence registry** aligned with TRIZEL evidence-first governance.

The evidence layer publishes **machine-readable pointers** to authoritative sources, immutable archival records (DOI), and verifiable identifiers (ORCID).

---

## Files

- **`index.html`** — Evidence registry UI (read-only, descriptive display)
- **`sources.json`** — Machine-readable evidence list (strict schema)
- **`README.md`** — This file (scope + non-interpretation notice)

---

## Evidence Schema

Each entry in `sources.json` contains **ONLY** the following fields:

- `id` — Unique identifier (e.g., E001, E002, ...)
- `source` — Name of the authoritative source
- `type` — Evidence type: `dataset` | `observation` | `archive` | `registry`
- `pointer` — URL | DOI | hash (immutable reference)
- `timestamp_utc` — ISO 8601 timestamp in UTC
- `verification_status` — Boolean (true = verified, false = unverified)

**NO narrative. NO inference. NO interpretation.**

---

## Non-Interpretation Policy

This evidence layer is **descriptive only**.

- Evidence entries are published as-is without interpretation.
- No embedded datasets, no reprocessing, no analysis.
- Interpretative publication requires explicit authorization beyond the governance boundary.

---

## Governance Constraints

- **Canonical authority:** LOCKED
- **Interpretation publishing:** DISABLED
- **Evidence pointers (DOI):** ENABLED

For governance details, see `/methodology/` and `/status/`.

---

## Authoritative Sources

TRIZEL-AI references the following authoritative sources:

- **Minor Planet Center (MPC):** https://minorplanetcenter.net/
- **NASA/JPL Solar System Dynamics:** https://ssd.jpl.nasa.gov/
- **JPL Horizons:** https://ssd.jpl.nasa.gov/horizons/
- **CNEOS:** https://cneos.jpl.nasa.gov/
- **ESA:** https://www.esa.int/
- **Zenodo:** https://zenodo.org/
- **ORCID:** https://orcid.org/0009-0003-9884-3697

---

**TRIZEL-AI** is a research and epistemic portal dedicated to evidence-first methodology, verifiable provenance, and immutable archival records (DOI).
