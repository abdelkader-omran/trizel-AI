I18N PARITY STANDARD — EN / FR
=============================

Project : TRIZEL Epistemic Operational Portal
Target  : https://trizel-ai.com/
Phase   : FINAL_EXECUTION (Phase-5)
Spec ID : I18N-PARITY-ENFR-v1.0
Status  : Governance-locked

----------------------------------------------------------------
1. PURPOSE
----------------------------------------------------------------
This standard defines the mandatory requirements for bilingual parity
(English/French) across all public content of the TRIZEL portal.

This document is normative. Any deviation blocks deployment.

----------------------------------------------------------------
2. SCOPE (ABSOLUTE)
----------------------------------------------------------------
The scope of this standard is ALL_PUBLIC_CONTENT, including:
- landing pages and navigation
- project and results pages
- theory analysis pages (if enabled)
- researcher gateway pages
- governance and legal documents
- audit and provenance pages
- UI labels, filters, status tags, footers, headers

Anything publicly reachable is in scope.

----------------------------------------------------------------
3. PARITY PRINCIPLE (NON-NEGOTIABLE)
----------------------------------------------------------------
For every public page P:

- P(en) MUST exist
- P(fr) MUST exist
- P(en) and P(fr) MUST be semantically equivalent

Parity is defined as equivalence of:
- meaning,
- claims,
- results,
- legal terms,
- obligations,
- exclusions.

Literal translation is not required.
Semantic equivalence is required.

----------------------------------------------------------------
4. PROHIBITED ASYMMETRIES (BLOCKER)
----------------------------------------------------------------
Any of the following constitutes a deployment blocker:

- a page exists in EN but not in FR (or inverse)
- missing sections in one language
- additional claims or results in one language
- additional legal clauses in one language
- different epistemic status labels between languages

No exceptions.

----------------------------------------------------------------
5. STRUCTURAL PARITY REQUIREMENTS
----------------------------------------------------------------
EN and FR versions MUST share:
- identical page structure
- identical section ordering
- identical headings hierarchy (H1/H2/H3)
- identical navigation topology

Structural drift is prohibited.

----------------------------------------------------------------
6. CANONICAL ROUTING
----------------------------------------------------------------
Mandatory routing rules:

- English pages use: /en/...
- French pages use:  /fr/...

Each page MUST declare:
- canonical URL to itself
- hreflang="en"
- hreflang="fr"

Root (/) routing behavior:
- redirect to last-used language OR
- redirect to /en/
(governance choice)

----------------------------------------------------------------
7. TERMINOLOGY CONSISTENCY
----------------------------------------------------------------
Key epistemic and governance terms MUST be mapped consistently
between languages.

Examples (non-exhaustive):
- Stable / Beta / In Progress
- Integrator / Producer
- Epistemic status
- Declared output
- Provenance
- Deployment gate

Terminology drift is prohibited.

----------------------------------------------------------------
8. NUMERIC AND SCIENTIFIC FIDELITY
----------------------------------------------------------------
Numeric and scientific content MUST preserve exact meaning:

- EN uses decimal dot
- FR uses decimal comma
- Values MUST NOT be rounded or altered
- Units MUST remain identical (SI preferred)

Formatting differences MUST NOT change meaning.

----------------------------------------------------------------
9. VALIDATION REQUIREMENTS
----------------------------------------------------------------
Before deployment, the following MUST be validated:

- route parity check (EN/FR)
- section count equivalence
- claim equivalence
- legal equivalence
- status label equivalence

Failure of any check blocks deployment.

----------------------------------------------------------------
10. FAILURE HANDLING
----------------------------------------------------------------
If parity is violated:
- deployment MUST be blocked
- violation MUST be reported in gate-report metadata
- no partial or conditional deployment is permitted

----------------------------------------------------------------
11. VERSIONING
----------------------------------------------------------------
This standard is version-locked.

Any modification requires:
- governance approval,
- version increment,
- recorded commit hash.

----------------------------------------------------------------
AUTHORITY
----------------------------------------------------------------
This standard is binding for Phase-5 FINAL_EXECUTION.
Non-compliance invalidates deployment eligibility.
