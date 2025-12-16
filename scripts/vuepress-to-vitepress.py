#!/usr/bin/env python3
"""
VuePress Hope to VitePress Complete Migration Script

Converts ALL VuePress Hope theme patterns to VitePress-compatible syntax.

Fixes:
1. Tab containers: :::: tabs -> ::: tabs
2. Tab markers: @tab Name -> == Name
3. Active tab markers: @tab:active Name -> == Name (first tab is active by default)
4. Container colons: :::: -> :::
5. README.md links -> index.md
6. Removes VuePress Hope specific frontmatter
7. Container syntax fixes (:::note -> ::: info, etc.)

Usage:
    python3 scripts/vuepress-to-vitepress.py --dry-run     # Preview changes
    python3 scripts/vuepress-to-vitepress.py               # Apply changes
    python3 scripts/vuepress-to-vitepress.py --verbose     # Detailed output
"""

import re
import sys
from pathlib import Path
from collections import defaultdict
from dataclasses import dataclass, field
from typing import List, Tuple

@dataclass
class FileStats:
    """Track changes made to a file"""
    tab_containers: int = 0
    tab_markers: int = 0
    container_colons: int = 0
    readme_links: int = 0
    frontmatter_lines: int = 0
    container_syntax: int = 0
    frontmatter_items: List[str] = field(default_factory=list)
    modified: bool = False
    error: str = None


def convert_tabs(content: str) -> Tuple[str, int, int]:
    """
    Convert VuePress Hope tab syntax to vitepress-plugin-tabs syntax.

    VuePress Hope:
        :::: tabs
        @tab:active Tab Name
        content
        @tab Another Tab
        content
        ::::

    VitePress:
        ::: tabs
        == Tab Name
        content
        == Another Tab
        content
        :::

    Returns: (modified_content, containers_fixed, markers_fixed)
    """
    lines = content.split('\n')
    new_lines = []
    containers_fixed = 0
    markers_fixed = 0
    in_code_block = False

    for line in lines:
        # Track code blocks
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            new_lines.append(line)
            continue

        # Skip modifications inside code blocks
        if in_code_block:
            new_lines.append(line)
            continue

        # Convert tab container opening: :::: tabs or ::::: tabs -> ::: tabs
        # Also handle closing: :::: or ::::: -> :::
        tabs_match = re.match(r'^(::::+)\s*(tabs\b.*)?$', line)
        if tabs_match:
            colons = tabs_match.group(1)
            rest = tabs_match.group(2) or ''
            if len(colons) > 3:
                containers_fixed += 1
                if rest:
                    new_lines.append(f'::: {rest}')
                else:
                    new_lines.append(':::')
                continue

        # Convert @tab markers to == markers
        # @tab:active Tab Name -> == Tab Name
        # @tab Tab Name -> == Tab Name
        tab_match = re.match(r'^@tab(:active)?\s+(.+)$', line)
        if tab_match:
            tab_name = tab_match.group(2)
            markers_fixed += 1
            new_lines.append(f'== {tab_name}')
            continue

        new_lines.append(line)

    return '\n'.join(new_lines), containers_fixed, markers_fixed


def normalize_container_colons(content: str) -> Tuple[str, int]:
    """
    Normalize container colons: ::::+ -> :::

    VuePress Hope uses multiple colons for nesting (::::, :::::, etc.)
    VitePress uses only ::: for all containers

    Returns: (modified_content, fixes_count)
    """
    lines = content.split('\n')
    new_lines = []
    fixes = 0
    in_code_block = False

    for line in lines:
        # Track code blocks
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            new_lines.append(line)
            continue

        if in_code_block:
            new_lines.append(line)
            continue

        # Match containers with 4+ colons
        # Opening: ::::+ word -> ::: word
        # Closing: ::::+$ -> :::
        match = re.match(r'^(::::+)(\s+\S.*|$)', line)
        if match:
            colons = match.group(1)
            rest = match.group(2)
            if len(colons) > 3:
                fixes += 1
                new_lines.append(':::' + rest)
                continue

        new_lines.append(line)

    return '\n'.join(new_lines), fixes


def fix_container_syntax(content: str) -> Tuple[str, int]:
    """
    Fix container syntax:
    - Add space after ::: if missing
    - Convert 'note' to 'info'

    Returns: (modified_content, fixes_count)
    """
    fixes = [
        # Missing space after :::
        (r'^:::note\b', '::: info'),
        (r'^:::tip\b', '::: tip'),
        (r'^:::warning\b', '::: warning'),
        (r'^:::danger\b', '::: danger'),
        (r'^:::info\b', '::: info'),
        (r'^:::details\b', '::: details'),
        (r'^:::important\b', '::: important'),
        (r'^:::caution\b', '::: caution'),
        (r'^:::code-group\b', '::: code-group'),

        # VuePress 'note' -> VitePress 'info'
        (r'^::: note\b', '::: info'),
    ]

    count = 0
    for pattern, replacement in fixes:
        matches = len(re.findall(pattern, content, re.MULTILINE))
        if matches:
            count += matches
            content = re.sub(pattern, replacement, content, flags=re.MULTILINE)

    return content, count


def fix_readme_links(content: str) -> Tuple[str, int]:
    """
    Convert README.md links to index.md

    Returns: (modified_content, fix_count)
    """
    count_before = len(re.findall(r'\]\([^)]*README\.md[^)]*\)', content))

    # Pattern: [text](path/README.md) -> [text](path/index.md)
    content = re.sub(
        r'\]\(([^)]*?)README\.md([^)]*)\)',
        r'](\1index.md\2)',
        content
    )

    count_after = len(re.findall(r'\]\([^)]*README\.md[^)]*\)', content))

    return content, count_before - count_after


def fix_frontmatter(content: str) -> Tuple[str, int, List[str]]:
    """
    Remove VuePress Hope specific frontmatter

    Returns: (modified_content, lines_removed, removed_items)
    """
    lines = content.split('\n')
    new_lines = []
    in_frontmatter = False
    frontmatter_started = False
    removed_count = 0
    removed_items = []

    skip_patterns = [
        (r'^icon:\s*', 'icon'),
        (r'^prev:\s*', 'prev'),
        (r'^next:\s*', 'next'),
        (r'^category:\s*', 'category'),
        (r'^tag:\s*', 'tag'),
        (r'^star:\s*', 'star'),
        (r'^sticky:\s*', 'sticky'),
        (r'^article:\s*', 'article'),
        (r'^timeline:\s*', 'timeline'),
        (r'^breadcrumb:\s*', 'breadcrumb'),
        (r'^pageInfo:\s*', 'pageInfo'),
        (r'^contributors:\s*', 'contributors'),
        (r'^editLink:\s*', 'editLink'),
        (r'^lastUpdated:\s*', 'lastUpdated'),
        (r'^navbar:\s*', 'navbar'),
        (r'^sidebar:\s*', 'sidebar'),
        (r'^headerDepth:\s*', 'headerDepth'),
        (r'^comment:\s*', 'comment'),
        (r'^footer:\s*', 'footer'),
        (r'^copyright:\s*', 'copyright'),
        (r'^backToTop:\s*', 'backToTop'),
        (r'^toc:\s*', 'toc'),
        (r'^index:\s*', 'index'),
        (r'^order:\s*', 'order'),
    ]

    for i, line in enumerate(lines):
        # Track frontmatter boundaries
        if i == 0 and line.strip() == '---':
            in_frontmatter = True
            frontmatter_started = True
            new_lines.append(line)
            continue

        if frontmatter_started and in_frontmatter and line.strip() == '---':
            in_frontmatter = False
            new_lines.append(line)
            continue

        # In frontmatter, skip VuePress Hope specific lines
        if in_frontmatter:
            skip = False
            for pattern, name in skip_patterns:
                if re.match(pattern, line, re.IGNORECASE):
                    skip = True
                    removed_count += 1
                    if name not in removed_items:
                        removed_items.append(name)
                    break
            if not skip:
                new_lines.append(line)
        else:
            new_lines.append(line)

    return '\n'.join(new_lines), removed_count, removed_items


def process_file(file_path: Path, dry_run: bool = False) -> FileStats:
    """Process a single file and return stats"""
    stats = FileStats()

    try:
        original = file_path.read_text(encoding='utf-8')
        content = original

        # 1. Convert tab syntax
        content, tab_containers, tab_markers = convert_tabs(content)
        stats.tab_containers = tab_containers
        stats.tab_markers = tab_markers

        # 2. Normalize remaining container colons
        content, colon_fixes = normalize_container_colons(content)
        stats.container_colons = colon_fixes

        # 3. Fix container syntax (:::note -> ::: info, etc.)
        content, syntax_fixes = fix_container_syntax(content)
        stats.container_syntax = syntax_fixes

        # 4. Fix README.md links
        content, link_fixes = fix_readme_links(content)
        stats.readme_links = link_fixes

        # 5. Fix frontmatter
        content, fm_fixes, fm_items = fix_frontmatter(content)
        stats.frontmatter_lines = fm_fixes
        stats.frontmatter_items = fm_items

        # Check if modified
        if content != original:
            stats.modified = True
            if not dry_run:
                file_path.write_text(content, encoding='utf-8')

    except Exception as e:
        stats.error = str(e)

    return stats


def main():
    # Parse arguments
    dry_run = '--dry-run' in sys.argv
    verbose = '--verbose' in sys.argv or '-v' in sys.argv

    # Find src directory
    script_dir = Path(__file__).parent
    src_dir = script_dir.parent / 'src'

    if not src_dir.exists():
        print(f"Error: src directory not found at {src_dir}", file=sys.stderr)
        sys.exit(1)

    print("=" * 70)
    print("VuePress Hope to VitePress Complete Migration")
    print("=" * 70)
    print(f"Source: {src_dir}")
    print(f"Mode: {'DRY RUN (no files modified)' if dry_run else 'APPLYING FIXES'}")
    print()

    # Track totals
    totals = {
        'files_modified': 0,
        'tab_containers': 0,
        'tab_markers': 0,
        'container_colons': 0,
        'container_syntax': 0,
        'readme_links': 0,
        'frontmatter_lines': 0,
    }
    all_frontmatter_items = defaultdict(int)
    modified_files = []

    # Process all markdown files
    for md_file in sorted(src_dir.rglob('*.md')):
        # Skip node_modules or .vitepress cache
        if 'node_modules' in str(md_file) or '.vitepress/cache' in str(md_file):
            continue

        stats = process_file(md_file, dry_run)

        if stats.error:
            print(f"Error processing {md_file}: {stats.error}", file=sys.stderr)
            continue

        if stats.modified:
            totals['files_modified'] += 1
            modified_files.append(md_file)
            rel_path = md_file.relative_to(src_dir.parent)

            # Accumulate totals
            totals['tab_containers'] += stats.tab_containers
            totals['tab_markers'] += stats.tab_markers
            totals['container_colons'] += stats.container_colons
            totals['container_syntax'] += stats.container_syntax
            totals['readme_links'] += stats.readme_links
            totals['frontmatter_lines'] += stats.frontmatter_lines

            for item in stats.frontmatter_items:
                all_frontmatter_items[item] += 1

            if verbose:
                print(f"\nModified: {rel_path}")
                if stats.tab_containers:
                    print(f"  - Tab containers (::::+ -> :::): {stats.tab_containers}")
                if stats.tab_markers:
                    print(f"  - Tab markers (@tab -> ==): {stats.tab_markers}")
                if stats.container_colons:
                    print(f"  - Container colons normalized: {stats.container_colons}")
                if stats.container_syntax:
                    print(f"  - Container syntax fixed: {stats.container_syntax}")
                if stats.readme_links:
                    print(f"  - README.md -> index.md links: {stats.readme_links}")
                if stats.frontmatter_lines:
                    items = ', '.join(stats.frontmatter_items)
                    print(f"  - Frontmatter removed: {items}")

    # Summary
    print()
    print("-" * 70)
    print("SUMMARY")
    print("-" * 70)
    print(f"Files modified: {totals['files_modified']}")
    print()
    print("Tab conversions:")
    print(f"  - Tab containers (::::+ -> :::): {totals['tab_containers']}")
    print(f"  - Tab markers (@tab -> ==): {totals['tab_markers']}")
    print()
    print("Container fixes:")
    print(f"  - Extra colons normalized: {totals['container_colons']}")
    print(f"  - Syntax fixes (:::note -> ::: info, etc.): {totals['container_syntax']}")
    print()
    print("Other fixes:")
    print(f"  - README.md -> index.md links: {totals['readme_links']}")
    print(f"  - Frontmatter lines removed: {totals['frontmatter_lines']}")

    if all_frontmatter_items:
        print("\nFrontmatter items removed by type:")
        for item, count in sorted(all_frontmatter_items.items(), key=lambda x: -x[1]):
            print(f"  {item}: {count}")

    # List modified files if not verbose
    if modified_files and not verbose:
        print("\nModified files:")
        for f in modified_files:
            print(f"  {f.relative_to(src_dir.parent)}")

    print()
    if dry_run:
        print("=" * 70)
        print("DRY RUN - No files were modified.")
        print("Run without --dry-run to apply fixes.")
        print("=" * 70)
    else:
        print("=" * 70)
        print("Fixes applied successfully!")
        print("=" * 70)


if __name__ == '__main__':
    main()
