# REPOSITORY_INTERFACE_STANDARD

Project: TRIZEL  
Phase: FINAL_EXECUTION  
Status: Normative / Deploy-Blocking  

---

## 1. Purpose

This document defines the **mandatory interface contract** that any repository
connected to the TRIZEL portal MUST satisfy in order to be indexed, exposed, or
referenced publicly.

This standard is **strict**, **non-negotiable**, and **enforced at build time**.

---

## 2. Scope

This standard applies to:
- Producer repositories
- Integrator repositories
- Canonical reference repositories
- External scientific repositories explicitly registered

Any repository failing this interface is **excluded automatically**.

---

## 3. Required Files (Root-Level)

Every repository MUST expose the following files at its root:

### 3.1 `manifest.json` (Mandatory)

Declares repository identity and role.

Required fields:
- repository_id
- repository_name
- repository_role (producer | integrator)
- canonical_reference (true | false)
- version
- license
- authors
- last_updated

---

### 3.2 `outputs.index.json` (Mandatory)

Declares all publishable outputs.

Each output MUST include:
- output_id
- title
- description
- file_path or external_url
- generation_timestamp
- epistemic_status (Stable | Beta | In Progress)

Undeclared outputs are forbidden.

---

### 3.3 `status.json` (Mandatory)

Declares the global epistemic state of the repository.

Required fields:
- current_status
- validation_level
- known_limitations
- last_review_date

---

## 4. Role-Specific Constraints

### 4.1 Producer Repositories

Producers:
- generate raw or derived artifacts
- MUST NOT aggregate external results
- MUST NOT claim integrator authority

---

### 4.2 Integrator Repositories

Integrators:
- combine multiple producer outputs
- MAY reference producers
- MUST dominate presentation priority
- MUST remain interpretation-free

---

## 5. Provenance Enforcement

For every exposed output, provenance MUST be resolvable to:
- repository_id
- repository_role
- version or commit hash
- timestamp

Missing provenance blocks deployment.

---

## 6. Forbidden Patterns

The following result in immediate exclusion:
- placeholder files
- demo or synthetic data
- undocumented outputs
- mutable output identifiers
- implicit or inferred results

---

## 7. Validation Rule

IF any repository violates this standard  
THEN:
- the repository is excluded
- deployment is BLOCKED if exclusion breaks declared completeness

---

## 8. Final Declaration

This interface standard is **immutable for FINAL_EXECUTION**.

Any amendment requires:
- governance approval
- version increment
- public disclosure
