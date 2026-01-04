ARCHITECTURE — INTEGRATOR PRIORITY MODEL
=======================================

Project : TRIZEL Epistemic Operational Portal
Target  : https://trizel-ai.com/
Phase   : FINAL_EXECUTION (Phase-5)
Arch ID : ARCH-INTEGRATOR-PRIORITY-v1.0
Status  : Governance-locked

----------------------------------------------------------------
1. PURPOSE
----------------------------------------------------------------
This document defines the mandatory priority model governing how
integrator and producer outputs are ordered, exposed, and interpreted
within the TRIZEL portal.

This model is normative and deploy-blocking.

----------------------------------------------------------------
2. DEFINITIONS
----------------------------------------------------------------
Producer Repository:
- Generates primary data, analyses, or isolated results.
- Has no system-level authority.

Integrator Repository:
- Consumes outputs from multiple producer repositories.
- Emits system-level intelligence.
- Resolves cross-domain coherence.

----------------------------------------------------------------
3. CORE PRINCIPLE (NON-NEGOTIABLE)
----------------------------------------------------------------
Integrator outputs define epistemic system intelligence.

Therefore:
Integrator outputs SHALL always take precedence over producer outputs
in visibility, ordering, and semantic emphasis.

----------------------------------------------------------------
4. DISPLAY ORDER INVARIANT
----------------------------------------------------------------
Invariant IP-1 (INTEGRATORS_FIRST):

On every portal view where results are displayed:
1. Integrator outputs MUST be rendered first.
2. Producer outputs MUST be rendered only after integrators.
3. Producers MUST NOT visually dominate integrators.

Violation blocks deployment.

----------------------------------------------------------------
5. SEMANTIC AUTHORITY RULE
----------------------------------------------------------------
Integrator outputs:
- provide system-level synthesis,
- contextualize producer results,
- define cross-repository coherence.

Producer outputs:
- remain local,
- are not promoted to system conclusions,
- do not override integrator interpretations.

----------------------------------------------------------------
6. VISUAL AND STRUCTURAL CONSTRAINTS
----------------------------------------------------------------
The following constraints MUST be enforced:

- Integrator sections appear at top-level hierarchy.
- Producer sections appear nested or secondary.
- Typography, spacing, and emphasis favor integrators.
- No producer output may appear without clear contextual scope.

----------------------------------------------------------------
7. CONFLICT RESOLUTION
----------------------------------------------------------------
If producer outputs conflict:
- the portal MUST NOT resolve conflicts,
- the portal MUST defer to integrator outputs,
- unresolved conflicts MUST be labeled explicitly.

The portal does not arbitrate scientific truth.

----------------------------------------------------------------
8. PROHIBITED BEHAVIOR
----------------------------------------------------------------
The following are strictly forbidden:

- promoting producer outputs above integrators,
- aggregating producers without integrator context,
- reinterpreting producer results at the portal level,
- presenting producer outputs as final conclusions.

Any violation blocks deployment.

----------------------------------------------------------------
9. VALIDATION REQUIREMENTS
----------------------------------------------------------------
Before deployment, the following MUST be verified:

- integrator-first ordering enforced across all views,
- no producer-dominant layouts exist,
- provenance and status remain intact after ordering.

Failures MUST be recorded in gate-report metadata.

----------------------------------------------------------------
10. CHANGE MANAGEMENT
----------------------------------------------------------------
Changes to this priority model require:
- governance approval,
- version increment,
- explicit commit hash reference.

----------------------------------------------------------------
AUTHORITY
----------------------------------------------------------------
This architecture model is binding for Phase-5 FINAL_EXECUTION.
Non-compliance invalidates deployment eligibility.
