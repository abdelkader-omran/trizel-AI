SPEC v1.0 — TRIZEL EPISTEMIC PORTAL
=================================

Project : TRIZEL Epistemic Operational Portal
Target  : https://trizel-ai.com/
Phase   : FINAL_EXECUTION (Phase-5)
Spec ID : SPEC-PORTAL-v1.0
Status  : Governance-locked

----------------------------------------------------------------
1. PURPOSE
----------------------------------------------------------------
This specification defines the formal, execution-grade technical
requirements for the TRIZEL website as an epistemic operational portal.

This spec is normative. Any deviation invalidates deployment eligibility.

----------------------------------------------------------------
2. SYSTEM ROLE (NON-NEGOTIABLE)
----------------------------------------------------------------
The portal SHALL function exclusively as:
- a viewer,
- an aggregator,
- an auditor.

The portal SHALL NOT:
- generate knowledge,
- perform analysis or inference,
- rank, score, or interpret results,
- modify upstream scientific content.

----------------------------------------------------------------
3. ARCHITECTURAL POSITION
----------------------------------------------------------------
The portal is downstream of all intelligence.

Upstream:
- Producer repositories (primary outputs)
- Integrator repositories (system intelligence)

Downstream:
- Static portal artifacts
- Public audit metadata

No bidirectional dependency is permitted.

----------------------------------------------------------------
4. REPOSITORY TAXONOMY
----------------------------------------------------------------
A. Portal Repository
- Role: Viewer / Aggregator only
- No analytical logic
- No result generation

B. Producer Repositories
- Emit primary artifacts
- Expose declared outputs only

C. Integrator Repositories
- Consume multiple producer outputs
- Emit system-level conclusions
- Define intelligence priority

----------------------------------------------------------------
5. MANDATORY REPOSITORY INTERFACE
----------------------------------------------------------------
Each eligible research repository MUST expose:

1) manifest.json
   - repository_id
   - repository_role (producer | integrator)
   - version
   - epistemic_scope

2) outputs.index.json
   - explicit list of publishable artifacts
   - artifact type
   - generation timestamp
   - version/commit reference

3) status.json
   - epistemic status:
     - Stable
     - Beta
     - In Progress

Absence of any file => repository is invisible to the portal.

----------------------------------------------------------------
6. PUBLICATION RULES
----------------------------------------------------------------
The portal MAY expose ONLY:
- artifacts declared in outputs.index.json,
- artifacts that are version-locked,
- artifacts with complete provenance.

The portal MUST NEVER expose:
- undeclared artifacts,
- intermediate calculations,
- draft theories,
- speculative interpretation,
- private correspondence.

----------------------------------------------------------------
7. INTEGRATOR PRIORITY MODEL
----------------------------------------------------------------
Integrator outputs SHALL be displayed before producer outputs on all
relevant views.

Producers SHALL NOT visually dominate integrators.

Violation blocks deployment.

----------------------------------------------------------------
8. MULTILINGUAL PARITY (EN/FR)
----------------------------------------------------------------
All public content SHALL exist in EN and FR.

Rules:
- identical structure,
- identical semantic meaning,
- identical claims and legal terms.

Any language asymmetry blocks deployment.

----------------------------------------------------------------
9. NO PLACEHOLDER POLICY
----------------------------------------------------------------
Placeholder content is forbidden.

If a feature is not ready:
- it MUST be disabled and invisible.

Empty shells, demo content, or future promises are prohibited.

----------------------------------------------------------------
10. PROVENANCE AND TRACEABILITY
----------------------------------------------------------------
Every exposed artifact MUST include:
- repository identity,
- version or commit reference,
- generation timestamp,
- epistemic status.

No orphan content is permitted.

----------------------------------------------------------------
11. STATIC GENERATION REQUIREMENT
----------------------------------------------------------------
The portal SHALL be generated as static artifacts.

No runtime computation.
No live queries to research repositories.
No dynamic content generation.

----------------------------------------------------------------
12. AUDITABILITY REQUIREMENT
----------------------------------------------------------------
Public audit metadata MUST include:
- build timestamp,
- portal commit hash,
- list of included repositories,
- gate validation outcomes,
- blocking reasons (if any).

----------------------------------------------------------------
13. DEPLOYMENT GATE
----------------------------------------------------------------
Deployment MUST be blocked if any requirement in this specification
is not satisfied.

No implicit override is permitted.

----------------------------------------------------------------
14. VERSIONING
----------------------------------------------------------------
This specification is version-locked.

Any modification requires:
- governance approval,
- version increment,
- recorded commit hash.

----------------------------------------------------------------
AUTHORITY
----------------------------------------------------------------
This specification is binding for Phase-5 FINAL_EXECUTION.
Non-compliance invalidates deployment eligibility.
