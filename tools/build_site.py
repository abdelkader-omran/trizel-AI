#!/usr/bin/env python3
"""
Phase 2B - SOE (Source of Evidence) Content Injection Script

This script injects SOE markers into HTML files to track evidence sections.
SOE markers are HTML comments that wrap content sections for provenance tracking.

Files modified:
- index.html
- status/index.html
- methodology/index.html
- evidence/index.html
- repositories/index.html
- site/soe/site.json

SOE markers format:
<!-- SOE:START:section-name -->
content here
<!-- SOE:END:section-name -->
"""

import json
import os
import re
import sys
from pathlib import Path
from typing import Dict, List, Tuple


class SOEInjector:
    """Handles SOE marker injection into HTML files."""
    
    def __init__(self, repo_root: Path):
        self.repo_root = repo_root
        self.soe_data = {
            "injected_at": "",
            "files_modified": [],
            "markers_added": []
        }
    
    def inject_soe_markers(self, html_path: Path, sections: List[Tuple[str, str, str]]) -> bool:
        """
        Inject SOE markers into an HTML file.
        
        Args:
            html_path: Path to the HTML file
            sections: List of (section_name, start_pattern, end_pattern) tuples
        
        Returns:
            True if file was modified, False otherwise
        """
        if not html_path.exists():
            print(f"ERROR: File not found: {html_path}")
            return False
        
        content = html_path.read_text(encoding='utf-8')
        original_content = content
        
        for section_name, start_pattern, end_pattern in sections:
            # Check if markers already exist
            soe_start = f"<!-- SOE:START:{section_name} -->"
            soe_end = f"<!-- SOE:END:{section_name} -->"
            
            if soe_start in content and soe_end in content:
                print(f"  SOE markers for '{section_name}' already exist in {html_path.name}")
                continue
            
            # Find the section using regex
            pattern = f"({re.escape(start_pattern)}.*?{re.escape(end_pattern)})"
            match = re.search(pattern, content, re.DOTALL)
            
            if match:
                matched_section = match.group(1)
                # Inject SOE markers around the matched section
                wrapped_section = f"{soe_start}\n{matched_section}\n{soe_end}"
                content = content.replace(matched_section, wrapped_section)
                
                self.soe_data["markers_added"].append({
                    "file": str(html_path.relative_to(self.repo_root)),
                    "section": section_name
                })
                print(f"  ✓ Injected SOE markers for '{section_name}' in {html_path.name}")
            else:
                print(f"  ⚠ Pattern not found for '{section_name}' in {html_path.name}")
        
        # Only write if content changed
        if content != original_content:
            html_path.write_text(content, encoding='utf-8')
            return True
        
        return False
    
    def process_all_files(self) -> bool:
        """Process all HTML files that need SOE injection."""
        from datetime import datetime, timezone
        
        self.soe_data["injected_at"] = datetime.now(timezone.utc).isoformat()
        
        modified = False
        
        # Define sections to inject for each file
        # These are example patterns - adjust based on actual content structure
        files_to_process = [
            (
                self.repo_root / "index.html",
                [
                    ("hero-section", "<h1>", "</h1>"),
                ]
            ),
            (
                self.repo_root / "status" / "index.html",
                [
                    ("status-content", "<h1>", "</h1>"),
                ]
            ),
            (
                self.repo_root / "methodology" / "index.html",
                [
                    ("methodology-content", "<h1>", "</h1>"),
                ]
            ),
            (
                self.repo_root / "evidence" / "index.html",
                [
                    ("evidence-content", "<h1>", "</h1>"),
                ]
            ),
            (
                self.repo_root / "repositories" / "index.html",
                [
                    ("repositories-content", "<h1>", "</h1>"),
                ]
            ),
        ]
        
        for html_path, sections in files_to_process:
            print(f"\nProcessing {html_path.relative_to(self.repo_root)}...")
            if self.inject_soe_markers(html_path, sections):
                self.soe_data["files_modified"].append(str(html_path.relative_to(self.repo_root)))
                modified = True
        
        # Update site.json
        site_json_path = self.repo_root / "site" / "soe" / "site.json"
        print(f"\nUpdating {site_json_path.relative_to(self.repo_root)}...")
        site_json_path.parent.mkdir(parents=True, exist_ok=True)
        site_json_path.write_text(json.dumps(self.soe_data, indent=2), encoding='utf-8')
        self.soe_data["files_modified"].append(str(site_json_path.relative_to(self.repo_root)))
        
        print(f"\n✓ SOE injection complete. Modified {len(self.soe_data['files_modified'])} files.")
        return modified


def main():
    """Main entry point for the script."""
    # Determine repository root
    script_path = Path(__file__).resolve()
    repo_root = script_path.parent.parent
    
    print(f"TRIZEL-AI Phase 2B - SOE Content Injection")
    print(f"Repository root: {repo_root}")
    print(f"=" * 60)
    
    injector = SOEInjector(repo_root)
    
    try:
        injector.process_all_files()
        print("\n" + "=" * 60)
        print("✓ Phase 2B - SOE content injection completed successfully")
        return 0
    except Exception as e:
        print(f"\n✗ ERROR: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        return 1


if __name__ == "__main__":
    sys.exit(main())
