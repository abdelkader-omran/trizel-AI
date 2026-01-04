# FINAL_EXECUTION — Portal Specification

Project: TRIZEL  
Target: https://trizel-ai.com/  
Phase: FINAL_EXECUTION  
Standard: PROFESSIONAL_SCIENTIFIC  

---

## 1. Purpose

This document defines the immutable execution specification governing the
TRIZEL epistemic portal during FINAL_EXECUTION.

It is **normative**, **deploy-blocking**, and **authoritative** for:
- publication rules
- multilingual parity
- provenance enforcement
- epistemic constraints

No implementation may violate this specification.

---

## 2. Execution Rule (Hard Gate)

IF any requirement in this document is not satisfied  
THEN deployment **MUST be blocked**.

---

## 3. Epistemic Role of the Portal

The portal is strictly:

- Viewer
- Aggregator
- Auditor

The portal **MUST NOT**:
- infer
- interpret
- score
- rank
- extrapolate
- editorialize
- execute runtime computation

All outputs are **declared artifacts only**.

---

## 4. Multilingual Parity (EN / FR)

### 4.1 Mandatory Parity

Every public page MUST exist in:
- English
- French

Parity requirements:
- identical structure
- identical claims
- identical legal meaning
- identical scientific scope

Any asymmetry blocks deployment.

---

## 5. Provenance & Traceability

Every exposed result MUST include:
- source repository
- repository role (producer / integrator)
- version or commit hash
- generation timestamp
- epistemic status

Undeclared artifacts are forbidden.

---

## 6. Integrator Priority Rule

Integrator outputs MUST:
- appear before producer outputs
- dominate navigation and presentation
- never be visually subordinated

Violation blocks deployment.

---

## 7. Publication Constraints

### 7.1 Allowed
- validated outputs
- version-locked artifacts
- audit metadata
- canonical references

### 7.2 Forbidden
- placeholders
- demo or sample data
- draft theory without consent
- internal logs
- narrative speculation

---

## 8. Audit Requirement

A public audit artifact MUST be generated at each build:

`public/audit/gate-report.json`

It MUST contain:
- timestamp
- portal commit
- included repositories
- validation results
- blocking reasons (if any)

---

## 9. Final Declaration

This specification is immutable for FINAL_EXECUTION.

Any modification requires:
- explicit governance approval
- versioned amendment
- public disclosure
