# Phase 2B - SOE Content Injection

## Overview

Phase 2B introduces Source of Evidence (SOE) markers into HTML files to enable provenance tracking and evidence section identification.

## Components

### 1. SOE Injection Script (`tools/build_site.py`)

A Python script that automatically injects SOE markers into HTML files. The markers are HTML comments that wrap specific content sections:

```html
<!-- SOE:START:section-name -->
<h1>Content here</h1>
<!-- SOE:END:section-name -->
```

**Modified Files:**
- `index.html` - Hero section
- `status/index.html` - Status content
- `methodology/index.html` - Methodology content
- `evidence/index.html` - Evidence content
- `repositories/index.html` - Repositories content
- `site/soe/site.json` - Metadata about injected markers

### 2. GitHub Actions Workflow (`.github/workflows/phase-2b-run.yml`)

A workflow that:
1. Triggers manually via `workflow_dispatch`
2. Checks out the `main` branch
3. Runs the SOE injection script
4. Validates changes:
   - Only allowed files are modified
   - `<head>` sections remain unchanged
   - SOE markers are balanced and not duplicated
5. Commits changes with message: `Phase 2B – SOE content injection`

## Usage

### Manual Execution

To manually run the SOE injection script:

```bash
python3 tools/build_site.py
```

### Workflow Execution

1. Navigate to the repository's Actions tab
2. Select "Phase 2B — SOE Content Injection" workflow
3. Click "Run workflow"
4. Select the `main` branch
5. Click "Run workflow" button

## Validation Rules

### File Change Validation
- ✅ Only specified files can be modified
- ❌ Changes to any other files will fail the workflow

### HEAD Section Validation
- ✅ The `<head>` section of HTML files must remain unchanged
- ❌ Any modifications to `<head>` content will fail the workflow

### SOE Marker Validation
- ✅ All markers must be balanced (each START has a corresponding END)
- ✅ No duplicate markers allowed
- ✅ Section names must match between START and END markers
- ❌ Missing, duplicated, or unbalanced markers will fail the workflow

## Technical Details

### SOE Marker Format

```html
<!-- SOE:START:section-name -->
content
<!-- SOE:END:section-name -->
```

### Metadata Tracking

The `site/soe/site.json` file tracks:
- Injection timestamp (ISO 8601 UTC)
- List of modified files
- List of markers added with section names

Example:
```json
{
  "injected_at": "2026-01-09T15:15:38.053440+00:00",
  "files_modified": [
    "index.html",
    "status/index.html"
  ],
  "markers_added": [
    {
      "file": "index.html",
      "section": "hero-section"
    }
  ]
}
```

## Troubleshooting

### Script fails to find patterns
The script uses regex patterns to identify sections. If patterns aren't found:
1. Check the HTML structure matches expected patterns
2. Update section patterns in `files_to_process` list

### Workflow fails validation
1. Check which validation step failed
2. Review the validation error message
3. Fix the issue locally and re-run the script
4. Re-trigger the workflow

## Notes

- This is a structural activation for Phase 2B
- The workflow has not been executed yet
- SOE markers are designed for evidence provenance tracking
- All changes are committed to the `main` branch directly
