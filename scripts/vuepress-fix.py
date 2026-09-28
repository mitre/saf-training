#!/usr/bin/env python3
"""
VuePress Hope to VitePress Migration Script

This script converts VuePress Hope theme patterns to VitePress-compatible syntax.

Fixes:
1. README.md links -> index.md
2. Removes VuePress Hope specific frontmatter (icon, prev, next, etc.)

Note: Tab syntax (@tab, ::::) is already working with vitepress-plugin-tabs,
so we don't modify that.
"""

import re
import sys
from pathlib import Path
from collections import defaultdict

# =============================================================================
# FIX FUNCTIONS
# =============================================================================

def fix_readme_links(content: str) -> tuple[str, int]:
    """
    Convert README.md links to index.md

    Returns: (modified_content, fix_count)
    """
    # Count before
    count_before = len(re.findall(r'README\.md', content))

    # Pattern: [text](path/README.md) -> [text](path/index.md)
    # Also handle: [text](README.md) -> [text](index.md)
    content = re.sub(
        r'\]\(([^)]*?)README\.md([^)]*)\)',
        r'](\1index.md\2)',
        content
    )

    # Count after
    count_after = len(re.findall(r'README\.md', content))

    # The difference is only in links, not in text
    # Let's be more precise: count only links
    link_count_before = len(re.findall(r'\]\([^)]*README\.md[^)]*\)', content))

    return content, count_before - count_after


def fix_frontmatter(content: str) -> tuple[str, int, list]:
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
                    removed_items.append(name)
                    break
            if not skip:
                new_lines.append(line)
        else:
            new_lines.append(line)

    return '\n'.join(new_lines), removed_count, removed_items


# =============================================================================
# MAIN PROCESSOR
# =============================================================================

def process_file(file_path: Path, dry_run: bool = False) -> dict:
    """Process a single file and return stats"""
    stats = {
        'link_fixes': 0,
        'frontmatter_fixes': 0,
        'frontmatter_items': [],
        'modified': False
    }

    try:
        original = file_path.read_text(encoding='utf-8')
        content = original

        # Fix README.md links
        content, link_fixes = fix_readme_links(content)
        stats['link_fixes'] = link_fixes

        # Fix frontmatter
        content, fm_fixes, fm_items = fix_frontmatter(content)
        stats['frontmatter_fixes'] = fm_fixes
        stats['frontmatter_items'] = fm_items

        # Check if modified
        if content != original:
            stats['modified'] = True
            if not dry_run:
                file_path.write_text(content, encoding='utf-8')

    except Exception as e:
        stats['error'] = str(e)

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
    print("VuePress Hope to VitePress Migration")
    print("=" * 70)
    print(f"Source: {src_dir}")
    print(f"Mode: {'DRY RUN' if dry_run else 'APPLYING FIXES'}")
    print()

    # Process all markdown files
    total_link_fixes = 0
    total_frontmatter_fixes = 0
    files_modified = []
    all_frontmatter_items = defaultdict(int)

    for md_file in sorted(src_dir.rglob('*.md')):
        # Skip node_modules or .vitepress cache
        if 'node_modules' in str(md_file) or '.vitepress/cache' in str(md_file):
            continue

        stats = process_file(md_file, dry_run)

        if stats.get('modified'):
            files_modified.append(md_file)
            rel_path = md_file.relative_to(src_dir.parent)

            if verbose:
                print(f"\nModified: {rel_path}")
                if stats['link_fixes']:
                    print(f"  - README.md -> index.md: {stats['link_fixes']} links")
                if stats['frontmatter_fixes']:
                    items = ', '.join(stats['frontmatter_items'])
                    print(f"  - Frontmatter removed: {items}")

            total_link_fixes += stats['link_fixes']
            total_frontmatter_fixes += stats['frontmatter_fixes']

            for item in stats['frontmatter_items']:
                all_frontmatter_items[item] += 1

        if stats.get('error'):
            print(f"Error processing {md_file}: {stats['error']}", file=sys.stderr)

    # Summary
    print()
    print("-" * 70)
    print("SUMMARY")
    print("-" * 70)
    print(f"Files modified: {len(files_modified)}")
    print(f"README.md -> index.md link fixes: {total_link_fixes}")
    print(f"Frontmatter lines removed: {total_frontmatter_fixes}")

    if all_frontmatter_items:
        print("\nFrontmatter items removed by type:")
        for item, count in sorted(all_frontmatter_items.items(), key=lambda x: -x[1]):
            print(f"  {item}: {count}")

    print()
    if dry_run:
        print("DRY RUN - No files were modified.")
        print("Run without --dry-run to apply fixes.")
    else:
        print("Fixes applied successfully!")

    # List modified files
    if files_modified and not verbose:
        print("\nModified files:")
        for f in files_modified:
            print(f"  {f.relative_to(src_dir.parent)}")


if __name__ == '__main__':
    main()
