GOVERNANCE INVARIANTS — PHASE-5 FINAL_EXECUTION
==============================================

Project: TRIZEL Epistemic Operational Portal
Target : https://trizel-ai.com/
Phase  : 5 — FINAL_EXECUTION

----------------------------------------------------------------
0. PURPOSE
----------------------------------------------------------------
This document defines governance invariants that are non-negotiable.
They are binding for all contributors, maintainers, and connected
repositories feeding the TRIZEL portal.

Any breach of an invariant invalidates deployment eligibility.

----------------------------------------------------------------
1. DEPLOYMENT GATE INVARIANT (ABSOLUTE)
----------------------------------------------------------------
Invariant G1 (BLOCK_DEPLOYMENT):
If any FINAL_EXECUTION requirement is not met, deployment MUST be
blocked. No override is permitted except explicit governance waiver
recorded in writing and versioned in-repository.

Default: BLOCKER + CRITICAL + MAJOR => BLOCK DEPLOYMENT.

----------------------------------------------------------------
2. EPISTEMIC ROLE INVARIANT (VIEWER-ONLY)
----------------------------------------------------------------
Invariant G2 (NO_KNOWLEDGE_GENERATION):
The website is a read-only epistemic surface.
It must not generate, reinterpret, rank, score, infer, or editorialize
scientific content.

The website may only expose declared artifacts and their provenance.

----------------------------------------------------------------
3. TRACEABILITY INVARIANT (NO ORPHANS)
----------------------------------------------------------------
Invariant G3 (PROVENANCE_REQUIRED):
Every displayed result MUST be traceable to:
- repository identity,
- version/commit reference,
- generation timestamp,
- epistemic status label.

No orphan content is permitted.

----------------------------------------------------------------
4. INTEGRATOR PRIORITY INVARIANT
----------------------------------------------------------------
Invariant G4 (INTEGRATORS_FIRST):
Integrator outputs represent system intelligence and MUST be displayed
before producer outputs across all relevant portal views.

Producers may not visually dominate integrators.

----------------------------------------------------------------
5. DECLARATION INVARIANT (DECLARED-ONLY)
----------------------------------------------------------------
Invariant G5 (DECLARED_OUTPUTS_ONLY):
Only artifacts explicitly declared in repository indexes are eligible
for exposure. Undeclared artifacts are invisible by design.

No manual exceptions.

----------------------------------------------------------------
6. MULTILINGUAL PARITY INVARIANT (EN/FR)
----------------------------------------------------------------
Invariant G6 (NO_LANGUAGE_ASYMMETRY):
All public content MUST exist in EN and FR with equivalent meaning and
structure.

Any of the following blocks deployment:
- page exists in one language only,
- missing section in one language,
- extra claims or legal terms in one language.

----------------------------------------------------------------
7. NO PLACEHOLDER INVARIANT
----------------------------------------------------------------
Invariant G7 (ZERO_PLACEHOLDERS):
Placeholder content is forbidden in all public surfaces:
- no “coming soon”, “TBD”, “demo”, “sample data”,
- no empty shells.

If a feature is not ready, it must be disabled and invisible.

----------------------------------------------------------------
8. NO INFORMALITY INVARIANT (PROFESSIONAL SCIENTIFIC)
----------------------------------------------------------------
Invariant G8 (PRO_SCIENTIFIC_PRESENTATION):
The portal must maintain professional scientific presentation:
- precise typography and hierarchy,
- coherent, disciplined color palette,
- maximum semantic clarity,
- no marketing tone or decorative-first design.

----------------------------------------------------------------
9. AUTHORSHIP AND IP INVARIANT (NON-APPROPRIATION)
----------------------------------------------------------------
Invariant G9 (AUTHOR_RIGHTS_PRESERVED):
Authorship and intellectual property remain with authors and source
repositories.

No theory or work is analyzed or displayed without:
- explicit author consent,
- traceable reference.

TRIZEL functions as evaluator and connector, not rights holder.

----------------------------------------------------------------
10. AUDITABILITY INVARIANT (PUBLIC METADATA)
----------------------------------------------------------------
Invariant G10 (AUDIT_VISIBLE):
Audit metadata must be publicly accessible, including:
- portal build timestamp,
- included repositories list,
- gate validation outcomes,
- blocking reasons (if any).

----------------------------------------------------------------
11. PHASE TRANSITION INVARIANT
----------------------------------------------------------------
Invariant G11 (PHASE5_CLOSE_CONDITION):
Phase-5 ends only when:
- all Phase-5 documentation is merged,
- FINAL_EXECUTION acceptance criteria are satisfied,
- governance approves Phase-5 closure in a versioned record.

No Phase-6 work is permitted without an explicit Phase-6 directive.

----------------------------------------------------------------
AUTHORITY
----------------------------------------------------------------
These invariants are binding for Phase-5 FINAL_EXECUTION.

Any deviation requires a formal governance amendment committed to the
repository and must be explicitly referenced by commit hash.
