# TRIZEL Metadata and Registry Site Implementation

## Overview

This document summarizes the implementation of TRIZEL canonical metadata templates, internal Apple reference documentation, and the multilingual project registry website feature.

## Implementation Date

**Completed:** 2026-01-12  
**Branch:** `copilot/featuretrizel-metadata-and-registry-site`  
**Repository:** `abdelkader-omran/trizel-AI`

---

## 1. Canonical Metadata Templates

### Location
`Documents/TRIZEL/metadata/`

### Files Installed

#### 1.1 CANONICAL_METADATA_TEMPLATE.yaml
- **Status:** Single Source of Truth
- **Purpose:** Authoritative metadata template for TRIZEL publications
- **Content:** Author information, publication metadata, Zenodo/DataCite compatible fields
- **Format:** YAML (canonical format)

#### 1.2 CANONICAL_METADATA_TEMPLATE.json
- **Status:** Derived Mirror
- **Purpose:** JSON version for systems requiring JSON format
- **Policy:** Auto-generated from YAML; DO NOT edit directly
- **Field Parity:** 100% mapping to YAML structure

#### 1.3 README.md
- **Purpose:** Policy and usage documentation
- **Key Points:**
  - YAML is single source of truth
  - JSON is derived mirror, regenerate when YAML changes
  - Templates are reusable across publications
  - Compatible with Zenodo/DataCite workflows

### Migration Note
Original `CANONICAL_METADATA_TEMPLATE.yaml` was moved from repository root to `Documents/TRIZEL/metadata/` directory structure.

---

## 2. Apple Protected Reference Report

### Location
`docs/internal/apple/TRIZEL_Monitor_Apple_Account_and_App_Reference_Report.md`

### Content
- **Classification:** Protected Internal Reference (NOT for public distribution)
- **Purpose:** Administrative reference for Apple Developer account and app identifiers
- **Security:** NO credentials, keys, certificates, or secrets stored
- **Interim Notice:** Includes planned identifier changes and store discontinuation notice
- **Access Control:** Internal-only; not linked from public navigation

### Key Sections
1. Account information (general)
2. Application identifiers (interim)
3. Interim identifiers and planned renaming notice
4. Technical reference points (no secrets)
5. Administrative contacts
6. Security disclaimers

---

## 3. Project Map - Multilingual Registry Website

### Location
`project-map/index.html`

### Public URL
`https://trizel-ai.com/project-map/`

### Features Implemented

#### 3.1 Multilingual Support
- **English (EN):** Full implementation ✓
- **French (FR):** Full implementation ✓
- **Arabic (AR):** Full implementation with RTL support ✓
- **Chinese (ZH):** Reserved/Planned - Stub page with "Coming soon" notice ✓

#### 3.2 Language Selector
- Consistent across all pages
- All four languages visible in selector
- Chinese marked with asterisk (*) indicating "Planned"
- JavaScript-based language switching
- LocalStorage preference persistence

#### 3.3 Arabic RTL Support
- `direction: rtl` CSS property
- `text-align: right` for Arabic content
- Proper list alignment for RTL
- Class: `.rtl` applied to Arabic sections

#### 3.4 Registry Consumption (Allowlist-Only)

**Canonical Source:**
- Repository: `trizel-ai/trizel-core`
- File: `TRIZEL_REGISTRY.yaml`
- Access: READ ONLY, allowlist-only ingestion

**Non-Interpretive Display:**
- Factual data only (name, URL, layer, role, status)
- No ranking, scoring, or interpretation
- No auto-discovery of repositories
- No inferred relationships

**Provenance Display:**
- Source commit hash
- Last sync timestamp (UTC)
- Canonical source URL
- Verification status

#### 3.5 Placeholder Data
Current implementation includes:
- `trizel-ai/trizel-core` (Layer-0 Governance)
- `abdelkader-omran/trizel-AI` (Layer-6 Website)

**Integration Notice:** Registry consumption is configured but requires initial sync from trizel-core. Placeholder data is clearly marked as pending integration.

---

## 4. Registry Documentation

### Location
`docs/registry/README.md`

### Content
- Canonical source location and access method
- Allowlist rules and provenance requirements
- Non-interpretive constraints
- Language policy (EN/FR/AR active, ZH reserved)
- Implementation strategy (manual sync documented)
- Registry data schema
- Update workflow
- Security and integrity guidelines

---

## 5. Site-Wide Updates

### 5.1 Navigation Menu Updates
Project Map link added to all pages:
- `index.html` ✓
- `status/index.html` ✓
- `methodology/index.html` ✓
- `evidence/index.html` ✓
- `repositories/index.html` ✓
- `system-map/index.html` ✓
- `applications/index.html` ✓

### 5.2 Sitemap Update
- `sitemap.xml` updated with `/project-map/` entry
- Priority: 0.8 (same as other main pages)

### 5.3 Portal Configuration
`portal.config.json` updated:
- Added `"AR"` to languages array
- Added `"languages_planned": ["ZH"]` field
- Extended `prefix_map` with AR (`/ar`) and ZH (`/zh`) routes
- Added `"rtl_languages": ["AR"]` configuration

---

## 6. Compliance Checklist

### Constraints Satisfied
- ✓ Non-interpretive display (structure/status/provenance only)
- ✓ Allowlist-only ingestion (no auto-discovery)
- ✓ No deprecated terminology introduced
- ✓ Minimal diff and clear paths
- ✓ Multilingual support: EN + FR + AR (active)
- ✓ Chinese (ZH) explicitly reserved with stub page
- ✓ Arabic RTL support implemented correctly
- ✓ Internal Apple report protected (not in public navigation)
- ✓ Internal-only warnings present

### Documentation Complete
- ✓ Metadata policy documented
- ✓ Registry consumption rules documented
- ✓ Provenance requirements specified
- ✓ Language policy defined
- ✓ Non-interpretive constraints explained

### Security & Privacy
- ✓ No credentials in Apple reference report
- ✓ No secrets stored in repository
- ✓ Internal documents properly classified
- ✓ Access control documented

---

## 7. Technical Details

### File Structure
```
trizel-AI/
├── Documents/
│   └── TRIZEL/
│       └── metadata/
│           ├── CANONICAL_METADATA_TEMPLATE.yaml
│           ├── CANONICAL_METADATA_TEMPLATE.json
│           └── README.md
├── docs/
│   ├── internal/
│   │   └── apple/
│   │       └── TRIZEL_Monitor_Apple_Account_and_App_Reference_Report.md
│   └── registry/
│       └── README.md
├── project-map/
│   └── index.html
├── portal.config.json (updated)
├── sitemap.xml (updated)
└── [all pages updated with Project Map nav link]
```

### Static HTML Deployment
- No build process required (`.nojekyll` present)
- Pure static HTML served by GitHub Pages
- Client-side JavaScript for language switching
- No external dependencies

### Language Switching Mechanism
- JavaScript-based content visibility toggle
- `data-lang` attributes for content sections
- `data-setlang` buttons for language selection
- LocalStorage for preference persistence
- Accessible via `aria-pressed` states

---

## 8. Future Integration Tasks

### Registry Sync
1. Establish sync procedure from `trizel-ai/trizel-core`
2. Fetch `TRIZEL_REGISTRY.yaml` from canonical source
3. Parse YAML and replace placeholder repository data
4. Update provenance metadata (commit hash, timestamp)
5. Document sync in audit trail

### Chinese Localization
When ready to activate Chinese (ZH):
1. Translate all project-map content to Chinese
2. Update stub page with full content
3. Remove "Planned" indicator from language selector
4. Test RTL/LTR layout compatibility
5. Update portal.config.json to move ZH from `languages_planned` to `languages`

---

## 9. Validation Results

### HTML Validation
- ✓ project-map/index.html: Valid HTML5
- ✓ No syntax errors
- ✓ All language sections present (EN, FR, AR, ZH)
- ✓ RTL classes applied correctly

### Content Parity
- ✓ EN: Complete
- ✓ FR: Complete (equivalent to EN)
- ✓ AR: Complete (equivalent to EN, RTL enabled)
- ✓ ZH: Stub page (explicitly marked as planned)

### Navigation
- ✓ Project Map link present in all page navs
- ✓ Sitemap entry added
- ✓ Canonical URL configured

---

## 10. Contact & Maintenance

**Repository Owner:** Abdelkader Omran  
**ORCID:** 0009-0003-9884-3697  
**Email:** admin1@trizel-ai.com  
**Website:** https://trizel-ai.com/

**Canonical Registry Owner:** trizel-ai organization (GitHub)

---

## 11. Change Log

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-12 | 1.0 | Initial implementation complete |

---

**Status:** Implementation Complete ✓  
**Ready for:** Review and deployment
