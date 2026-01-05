ARCHITECTURE — DATAFLOW & EPISTEMIC CONTROL POINTS
=================================================

Project : TRIZEL Epistemic Operational Portal
Target  : https://trizel-ai.com/
Phase   : FINAL_EXECUTION (Phase-5)
Arch ID : ARCH-DATAFLOW-ECP-v1.0
Status  : Governance-locked

----------------------------------------------------------------
1. PURPOSE
----------------------------------------------------------------
This document defines the authoritative dataflow architecture of the
TRIZEL portal and enumerates the mandatory epistemic control points
(ECPs) that enforce scientific validity and deployment gating.

This architecture is normative. Any deviation blocks deployment.

----------------------------------------------------------------
2. ARCHITECTURAL PRINCIPLE
----------------------------------------------------------------
All intelligence is upstream.
The portal is strictly downstream.

The portal:
- aggregates,
- renders,
- audits.

It does NOT:
- compute,
- infer,
- interpret,
- enrich content.

----------------------------------------------------------------
3. SYSTEM TOPOLOGY (UNIDIRECTIONAL)
----------------------------------------------------------------
[ Producer Repositories ]
            |
            |  (declared outputs only)
            v
[ Integrator Repositories ]
            |
            |  (system-level declared outputs)
            v
[ Epistemic Aggregation Layer ]
            |
            |  (static, auditable artifacts)
            v
[ TRIZEL Portal (Read-only) ]

No reverse dataflow is permitted.

----------------------------------------------------------------
4. DATA SOURCES (AUTHORITATIVE)
----------------------------------------------------------------
Only registered repositories listed in repos.registry.json
are eligible data sources.

Each source MUST expose:
- manifest.json
- outputs.index.json
- status.json

Missing interface files => source is ignored by design.

----------------------------------------------------------------
5. EPISTEMIC CONTROL POINTS (MANDATORY)
----------------------------------------------------------------

ECP-1: REGISTRATION GATE
- Verifies repository presence in repos.registry.json
- Rejects unregistered sources

ECP-2: INTERFACE VALIDATION
- Validates manifest.json schema
- Validates outputs.index.json schema
- Validates status.json schema

ECP-3: DECLARATION FILTER
- Accepts only artifacts explicitly declared
- Rejects undeclared artifacts

ECP-4: STATUS FILTER
- Requires exactly one epistemic status per artifact
- Rejects missing or ambiguous status

ECP-5: PROVENANCE COMPLETENESS
- Requires repository id
- Requires version/commit reference
- Requires generation timestamp
- Rejects orphan artifacts

ECP-6: INTEGRATOR PRIORITY ENFORCEMENT
- Ranks integrator outputs before producer outputs
- Prevents producer dominance

ECP-7: MULTILINGUAL PARITY CHECK (EN/FR)
- Verifies page existence in both languages
- Verifies structural and semantic equivalence

ECP-8: NO-PLACEHOLDER SCAN
- Detects prohibited placeholder patterns
- Rejects empty shells

ECP-9: STATIC BUILD ENFORCEMENT
- Prohibits runtime computation
- Prohibits live repository queries

ECP-10: AUDIT EMISSION
- Emits public audit metadata
- Records validation outcomes
- Records blocking reasons (if any)

----------------------------------------------------------------
6. FAILURE HANDLING
----------------------------------------------------------------
Failure at ANY epistemic control point results in:
- immediate build failure,
- deployment blockage,
- recorded reason in gate-report metadata.

No partial success is permitted.

----------------------------------------------------------------
7. ARTIFACT GENERATION
----------------------------------------------------------------
Successful traversal of all control points produces:
- static portal pages,
- public audit metadata,
- gate-report.json.

All artifacts are version-locked.

----------------------------------------------------------------
8. SECURITY AND ISOLATION
----------------------------------------------------------------
- No write access to upstream repositories
- No secrets required for build
- No privileged runtime execution

The portal is a passive consumer only.

----------------------------------------------------------------
9. CHANGE MANAGEMENT
----------------------------------------------------------------
Changes to this architecture require:
- governance approval,
- version increment,
- recorded commit hash.

----------------------------------------------------------------
AUTHORITY
----------------------------------------------------------------
This architecture is binding for Phase-5 FINAL_EXECUTION.
Non-compliance invalidates deployment eligibility.
