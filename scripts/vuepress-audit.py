#!/usr/bin/env python3
"""
VuePress to VitePress Migration Audit Script

This script scans markdown files for VuePress-specific patterns that need
to be converted for VitePress compatibility.

Based on:
- VuePress 1.x documentation: https://v1.vuepress.vuejs.org/
- VuePress Hope Theme: https://theme-hope.vuejs.press/
- VitePress documentation: https://vitepress.dev/

Usage:
    python3 scripts/vuepress-audit.py [--fix]
"""

import re
import sys
from pathlib import Path
from collections import defaultdict
from dataclasses import dataclass
from typing import Optional

@dataclass
class Issue:
    """Represents a single VuePress compatibility issue"""
    file: Path
    line_num: int
    category: str
    description: str
    original: str
    suggestion: Optional[str] = None
    auto_fixable: bool = False

# =============================================================================
# PATTERN DEFINITIONS
# =============================================================================

# Category: Container Syntax
CONTAINER_PATTERNS = [
    # VuePress containers without space after :::
    (r'^:::note\b', 'Container missing space', '::: info', True),
    (r'^:::tip\b', 'Container missing space', '::: tip', True),
    (r'^:::warning\b', 'Container missing space', '::: warning', True),
    (r'^:::danger\b', 'Container missing space', '::: danger', True),
    (r'^:::info\b', 'Container missing space', '::: info', True),
    (r'^:::details\b', 'Container missing space', '::: details', True),
    (r'^:::important\b', 'Container missing space', '::: important', True),
    (r'^:::caution\b', 'Container missing space', '::: caution', True),

    # VuePress Hope theme 'note' container (VitePress uses 'info')
    (r'^::: note\b', 'VuePress "note" container', '::: info', True),

    # Nested containers with extra colons (VuePress Hope feature)
    (r'^::::+\s*(note|tip|warning|danger|info|details|important|caution)',
     'Nested container with extra colons (not supported in VitePress)', None, False),
]

# Category: Frontmatter Issues
FRONTMATTER_PATTERNS = [
    # VuePress Hope theme specific frontmatter
    (r'^icon:\s*', 'VuePress Hope "icon" frontmatter (ignored in VitePress)', None, False),
    (r'^category:\s*', 'VuePress Hope "category" frontmatter (may need migration)', None, False),
    (r'^tag:\s*', 'VuePress Hope "tag" frontmatter (may need migration)', None, False),
    (r'^star:\s*', 'VuePress Hope "star" frontmatter (not supported)', None, False),
    (r'^sticky:\s*', 'VuePress Hope "sticky" frontmatter (not supported)', None, False),
    (r'^article:\s*', 'VuePress Hope "article" frontmatter (not supported)', None, False),
    (r'^timeline:\s*', 'VuePress Hope "timeline" frontmatter (not supported)', None, False),
    (r'^breadcrumb:\s*', 'VuePress Hope "breadcrumb" frontmatter (configure in theme)', None, False),
    (r'^pageInfo:\s*', 'VuePress Hope "pageInfo" frontmatter (not supported)', None, False),
    (r'^contributors:\s*', 'VuePress Hope "contributors" frontmatter (not supported)', None, False),
    (r'^editLink:\s*', 'VuePress Hope "editLink" frontmatter (configure in theme)', None, False),
    (r'^prev:\s*', 'Prev link frontmatter (VitePress uses different format)', None, False),
    (r'^next:\s*', 'Next link frontmatter (VitePress uses different format)', None, False),
]

# Category: Component Usage
COMPONENT_PATTERNS = [
    # VuePress built-in components
    (r'<Badge\s', 'VuePress Badge component (use VitePress badge or custom)', None, False),
    (r'<ClientOnly>', 'VuePress ClientOnly wrapper (still valid but check usage)', None, False),
    (r'<Content\s', 'VuePress Content component (not available in VitePress)', None, False),
    (r'<OutboundLink', 'VuePress OutboundLink component (automatic in VitePress)', None, False),

    # VuePress Hope theme components
    (r'<CodeGroup>', 'VuePress Hope CodeGroup (use ::: code-group)', None, False),
    (r'<CodeGroupItem', 'VuePress Hope CodeGroupItem (use @tab syntax)', None, False),
    (r'<Tabs>', 'VuePress Hope Tabs component (use ::: tabs)', None, False),
    (r'<Tab\s', 'VuePress Hope Tab component (use @tab syntax)', None, False),
    (r'<Card>', 'VuePress Hope Card component (not available)', None, False),
    (r'<CardGrid>', 'VuePress Hope CardGrid component (not available)', None, False),
    (r'<VPCard>', 'VuePress Hope VPCard component (not available)', None, False),
    (r'<ProjectLink>', 'VuePress Hope ProjectLink (not available)', None, False),
    (r'<BiliBili', 'VuePress Hope BiliBili component (not available)', None, False),
    (r'<YouTube', 'VuePress Hope YouTube component (not available)', None, False),
    (r'<PDF', 'VuePress Hope PDF component (not available)', None, False),
    (r'<AudioPlayer', 'VuePress Hope AudioPlayer (not available)', None, False),
    (r'<VideoPlayer', 'VuePress Hope VideoPlayer (not available)', None, False),
    (r'<FlowChart', 'VuePress Hope FlowChart (use mermaid instead)', None, False),
    (r'<Presentation', 'VuePress Hope Presentation/Reveal.js (not available)', None, False),
    (r'<SlidePage', 'VuePress Hope SlidePage (not available)', None, False),
]

# Category: Special Syntax
SYNTAX_PATTERNS = [
    # Code snippet imports
    (r'<<< @/', 'Code snippet import (verify path resolution)', None, False),
    (r'@\[code', 'VuePress Hope @[code] import syntax (use <<< instead)', None, False),

    # File includes
    (r'@include\(', 'VuePress Hope @include directive (use <!--@include: -->)', None, False),

    # VuePress global computed
    (r'\$page\.', 'VuePress $page global (use useData() in VitePress)', None, False),
    (r'\$site\.', 'VuePress $site global (use useData() in VitePress)', None, False),
    (r'\$themeConfig\.', 'VuePress $themeConfig (use useData() in VitePress)', None, False),
    (r'\$frontmatter\.', 'VuePress $frontmatter (use useData() in VitePress)', None, False),
    (r'\$lang\.', 'VuePress $lang (use useData() in VitePress)', None, False),
    (r'\$localePath\.', 'VuePress $localePath (configure in VitePress)', None, False),

    # v-pre container
    (r'::: v-pre', 'VuePress v-pre container (use ```v-pre in VitePress)', None, False),

    # Deprecated TOC syntax
    (r'\[\[toc\]\]', 'Table of contents (still supported, just verify)', None, False),
]

# Category: VuePress Hope Tabs (need conversion to vitepress-plugin-tabs format)
TAB_PATTERNS = [
    # VuePress Hope tab syntax
    (r'^::: tabs(?!#)', 'VuePress Hope tabs (check format compatibility)', None, False),
    (r'^@tab\s+', 'Tab marker (verify vitepress-plugin-tabs compatibility)', None, False),

    # Code tabs
    (r'^::: code-tabs', 'Code tabs container', None, False),
]

# Category: Links and Paths
LINK_PATTERNS = [
    # VuePress-style links that might break
    (r'\]\(\.md\)', 'Link to .md extension (VitePress prefers .html or no extension)', None, False),
    (r'README\.md', 'README.md reference (VitePress uses index.md)', None, False),
]

# Category: Custom Containers Balance Check
def check_container_balance(content: str, file: Path) -> list:
    """Check for unbalanced ::: containers"""
    issues = []
    lines = content.split('\n')
    stack = []

    for i, line in enumerate(lines, 1):
        # Match opening containers (but not inside code blocks)
        if re.match(r'^:::+\s*\w', line) and not line.strip().startswith('```'):
            stack.append((i, line.strip()))
        elif re.match(r'^:::+\s*$', line):
            if stack:
                stack.pop()
            else:
                issues.append(Issue(
                    file=file,
                    line_num=i,
                    category='Container Balance',
                    description='Closing ::: without matching opening',
                    original=line.strip()
                ))

    # Report unclosed containers
    for line_num, opener in stack:
        issues.append(Issue(
            file=file,
            line_num=line_num,
            category='Container Balance',
            description='Unclosed container',
            original=opener
        ))

    return issues

# =============================================================================
# SCANNER
# =============================================================================

def scan_file(file_path: Path) -> list:
    """Scan a single markdown file for VuePress patterns"""
    issues = []

    try:
        content = file_path.read_text(encoding='utf-8')
    except Exception as e:
        print(f"Error reading {file_path}: {e}", file=sys.stderr)
        return issues

    lines = content.split('\n')
    in_code_block = False
    in_frontmatter = False
    frontmatter_start = False

    for line_num, line in enumerate(lines, 1):
        # Track code blocks
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            continue

        # Track frontmatter
        if line_num == 1 and line.strip() == '---':
            in_frontmatter = True
            frontmatter_start = True
            continue
        if in_frontmatter and line.strip() == '---':
            in_frontmatter = False
            continue

        # Skip content in code blocks
        if in_code_block:
            continue

        # Check frontmatter-specific patterns
        if in_frontmatter:
            for pattern, desc, suggestion, fixable in FRONTMATTER_PATTERNS:
                if re.match(pattern, line, re.IGNORECASE):
                    issues.append(Issue(
                        file=file_path,
                        line_num=line_num,
                        category='Frontmatter',
                        description=desc,
                        original=line.strip(),
                        suggestion=suggestion,
                        auto_fixable=fixable
                    ))
            continue

        # Check container patterns
        for pattern, desc, suggestion, fixable in CONTAINER_PATTERNS:
            if re.match(pattern, line, re.IGNORECASE):
                issues.append(Issue(
                    file=file_path,
                    line_num=line_num,
                    category='Container Syntax',
                    description=desc,
                    original=line.strip(),
                    suggestion=suggestion,
                    auto_fixable=fixable
                ))

        # Check component patterns
        for pattern, desc, suggestion, fixable in COMPONENT_PATTERNS:
            if re.search(pattern, line):
                issues.append(Issue(
                    file=file_path,
                    line_num=line_num,
                    category='Component',
                    description=desc,
                    original=line.strip(),
                    suggestion=suggestion,
                    auto_fixable=fixable
                ))

        # Check syntax patterns
        for pattern, desc, suggestion, fixable in SYNTAX_PATTERNS:
            if re.search(pattern, line):
                issues.append(Issue(
                    file=file_path,
                    line_num=line_num,
                    category='Syntax',
                    description=desc,
                    original=line.strip(),
                    suggestion=suggestion,
                    auto_fixable=fixable
                ))

        # Check tab patterns
        for pattern, desc, suggestion, fixable in TAB_PATTERNS:
            if re.match(pattern, line):
                issues.append(Issue(
                    file=file_path,
                    line_num=line_num,
                    category='Tabs',
                    description=desc,
                    original=line.strip(),
                    suggestion=suggestion,
                    auto_fixable=fixable
                ))

        # Check link patterns
        for pattern, desc, suggestion, fixable in LINK_PATTERNS:
            if re.search(pattern, line):
                issues.append(Issue(
                    file=file_path,
                    line_num=line_num,
                    category='Links',
                    description=desc,
                    original=line.strip(),
                    suggestion=suggestion,
                    auto_fixable=fixable
                ))

    # Check container balance
    issues.extend(check_container_balance(content, file_path))

    return issues

def scan_directory(src_dir: Path) -> dict:
    """Scan all markdown files in the directory"""
    all_issues = defaultdict(list)

    for md_file in sorted(src_dir.rglob('*.md')):
        # Skip node_modules or .vitepress internal files
        if 'node_modules' in str(md_file) or '.vitepress/cache' in str(md_file):
            continue

        issues = scan_file(md_file)
        for issue in issues:
            all_issues[issue.category].append(issue)

    return all_issues

# =============================================================================
# REPORTING
# =============================================================================

def print_report(issues: dict, src_dir: Path):
    """Print a formatted report of all issues"""
    total = sum(len(v) for v in issues.values())

    print("=" * 80)
    print("VuePress to VitePress Migration Audit Report")
    print("=" * 80)
    print(f"\nScanned: {src_dir}")
    print(f"Total issues found: {total}")
    print()

    if total == 0:
        print("No VuePress compatibility issues found!")
        return

    # Summary by category
    print("-" * 80)
    print("SUMMARY BY CATEGORY")
    print("-" * 80)
    for category in sorted(issues.keys()):
        count = len(issues[category])
        auto_fix = sum(1 for i in issues[category] if i.auto_fixable)
        print(f"  {category}: {count} issues ({auto_fix} auto-fixable)")
    print()

    # Detailed report by category
    for category in sorted(issues.keys()):
        print("-" * 80)
        print(f"CATEGORY: {category}")
        print("-" * 80)

        # Group by file
        by_file = defaultdict(list)
        for issue in issues[category]:
            by_file[issue.file].append(issue)

        for file_path in sorted(by_file.keys()):
            rel_path = file_path.relative_to(src_dir.parent)
            print(f"\n  {rel_path}:")

            for issue in sorted(by_file[file_path], key=lambda x: x.line_num):
                fix_marker = " [AUTO-FIXABLE]" if issue.auto_fixable else ""
                print(f"    Line {issue.line_num}: {issue.description}{fix_marker}")
                print(f"      Found: {issue.original[:60]}{'...' if len(issue.original) > 60 else ''}")
                if issue.suggestion:
                    print(f"      Fix: {issue.suggestion}")
        print()

    # Auto-fixable summary
    auto_fixable = [i for cat in issues.values() for i in cat if i.auto_fixable]
    if auto_fixable:
        print("=" * 80)
        print(f"AUTO-FIXABLE ISSUES: {len(auto_fixable)}")
        print("Run with --fix to automatically fix these issues")
        print("=" * 80)

def apply_fixes(issues: dict, src_dir: Path):
    """Apply auto-fixes to files"""
    fixes_applied = 0
    files_modified = set()

    # Group fixable issues by file
    by_file = defaultdict(list)
    for category in issues.values():
        for issue in category:
            if issue.auto_fixable and issue.suggestion:
                by_file[issue.file].append(issue)

    for file_path, file_issues in by_file.items():
        try:
            content = file_path.read_text(encoding='utf-8')
            original_content = content

            # Apply each fix
            for issue in file_issues:
                # Find the pattern and replacement
                for pattern, desc, suggestion, fixable in CONTAINER_PATTERNS:
                    if fixable and suggestion and re.search(pattern, content, re.MULTILINE):
                        content = re.sub(pattern, suggestion, content, flags=re.MULTILINE)
                        fixes_applied += 1

            if content != original_content:
                file_path.write_text(content, encoding='utf-8')
                files_modified.add(file_path)
                print(f"Fixed: {file_path.relative_to(src_dir.parent)}")

        except Exception as e:
            print(f"Error fixing {file_path}: {e}", file=sys.stderr)

    print(f"\nApplied {fixes_applied} fixes across {len(files_modified)} files")

# =============================================================================
# MAIN
# =============================================================================

def main():
    # Find src directory
    script_dir = Path(__file__).parent
    src_dir = script_dir.parent / 'src'

    if not src_dir.exists():
        print(f"Error: src directory not found at {src_dir}", file=sys.stderr)
        sys.exit(1)

    # Check for --fix flag
    do_fix = '--fix' in sys.argv

    # Scan for issues
    print("Scanning for VuePress compatibility issues...")
    issues = scan_directory(src_dir)

    # Print report
    print_report(issues, src_dir)

    # Apply fixes if requested
    if do_fix:
        print("\nApplying auto-fixes...")
        apply_fixes(issues, src_dir)

    # Exit with error code if issues found
    total = sum(len(v) for v in issues.values())
    sys.exit(1 if total > 0 else 0)

if __name__ == '__main__':
    main()
