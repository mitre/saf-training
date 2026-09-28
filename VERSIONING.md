# Versioning Strategy

This document explains how versioning works for the MITRE SAF Training site.

## Dual-Level Versioning System

We use **two levels of versioning** to track both infrastructure and content changes:

### 1. Site-Level Version (Infrastructure)

**Location:** `.vitepress/config.ts`

```typescript
site: {
  version: '2.0.0'
}
```

**What it tracks:**
- Framework changes (VuePress → VitePress)
- Build system updates
- Major infrastructure changes
- Breaking URL changes

**Semantic Versioning:**
- **Major (3.0.0):** Breaking changes, major framework upgrades
- **Minor (2.1.0):** New features, new courses, new plugins
- **Patch (2.0.1):** Bug fixes, dependency updates

**Examples:**
- `v2.0.0` - VitePress migration
- `v2.1.0` - Add new course
- `v2.2.0` - Add PDF export feature
- `v2.2.1` - Fix broken links

---

### 2. Course-Level Version (Content)

**Location:** Each course `index.md` frontmatter

```yaml
---
title: 1. InSpec Beginner Tutorial
courseVersion: "1.2"
lastUpdated: 2024-12-15
---
```

**What it tracks:**
- Content updates within a course
- New lessons added
- Lesson content improvements
- Course restructuring

**Versioning:**
- **Major (2.0):** Course completely rewritten or restructured
- **Minor (1.1, 1.2, 1.3):** New lessons, significant content updates
- **Patch (1.0.1):** Not used - use lastUpdated instead

**Examples:**
- `v1.0` - Initial course version
- `v1.1` - Add 2 new lessons
- `v1.2` - Update all code examples
- `v2.0` - Complete course rewrite

---

## How Versions Are Displayed

Both versions appear on course landing pages via the `<CourseVersion />` component:

```vue
<CourseVersion />
```

Displays as:
- **Site v2.0** (orange badge) - Infrastructure version
- **Course v1.2** (blue badge) - Content version
- **Updated: Dec 15, 2024** (green badge) - Last modified date

---

## Updating Versions

### When to Bump Site Version

**Major (X.0.0):**
```bash
# Breaking changes
- Framework migration (VuePress → VitePress)
- URL structure changes
- Major plugin replacements
```

**Minor (2.X.0):**
```bash
# New features
- Add new course
- Add major plugin (comments, PDF export)
- Significant navigation changes
```

**Patch (2.0.X):**
```bash
# Bug fixes
- Dependency updates
- Fix broken links
- Correct typos
- Security patches
```

### When to Bump Course Version

**Update the course `index.md` frontmatter:**

**Minor (1.X):**
```yaml
# Before
courseVersion: "1.0"
lastUpdated: 2024-12-12

# After - added 3 new lessons
courseVersion: "1.1"
lastUpdated: 2024-12-15
```

**Major (X.0):**
```yaml
# Complete rewrite
courseVersion: "2.0"
lastUpdated: 2024-12-20
```

**Content fixes only:**
```yaml
# Just update the date, keep version
courseVersion: "1.1"
lastUpdated: 2024-12-16
```

---

## Workflow Examples

### Scenario 1: Update InSpec Beginner Course

```bash
# 1. Edit lessons in src/inspec-training/beginner/
# 2. Update course version in index.md
courseVersion: "1.1"  # was 1.0
lastUpdated: 2024-12-15

# 3. Commit
git add src/inspec-training/beginner/
git commit -m "feat(beginner): add lesson on custom matchers (v1.1)"

# 4. Site version stays same (v2.0.0)
```

### Scenario 2: Add New Course

```bash
# 1. Create new course directory
# 2. Bump site version in .vitepress/config.ts
site: { version: '2.1.0' }  # was 2.0.0

# 3. Commit
git commit -m "feat: add Heimdall visualization course (v2.1.0)"

# 4. Tag release
git tag v2.1.0
git push origin v2.1.0
```

### Scenario 3: Fix Typo in STIG Course

```bash
# 1. Fix typo
# 2. Update only the date
lastUpdated: 2024-12-16  # courseVersion stays 1.0

# 3. Commit
git commit -m "fix(stig): correct typo in lesson 5"

# 4. No version bumps needed
```

---

## Release Process

### Creating a Release

1. **Update site version** in `.vitepress/config.ts`
2. **Commit and push** all changes
3. **Tag the release:**
   ```bash
   git tag v2.1.0
   git push origin v2.1.0
   ```

4. **GitHub Actions automatically:**
   - Builds the site
   - Generates PDFs for all courses
   - Creates GitHub Release
   - Attaches PDFs to release

### Release Notes Template

```markdown
## MITRE SAF Training v2.1.0

### New Courses
- Heimdall Visualization (v1.0)

### Course Updates
- InSpec Beginner v1.0 → v1.1 (added 3 lessons)
- STIG Development v1.2 → v1.3 (updated workflows)

### Infrastructure
- Added PDF export functionality
- Improved search performance

### Bug Fixes
- Fixed broken links in Advanced course
- Corrected code examples in Profile Development
```

---

## Git Commit Conventions

Use conventional commits with course scope:

```bash
# Course updates
git commit -m "feat(beginner): add lesson on custom matchers"
git commit -m "fix(stig): correct typo in lesson 5"
git commit -m "docs(advanced): update code examples"

# Site updates
git commit -m "feat: add PDF export capability"
git commit -m "fix: resolve pnpm + mermaid compatibility"
git commit -m "chore: update dependencies"
```

**Scopes:**
- `beginner`, `advanced`, `profile-dev`, `stig`, `delta`, `mappers`, `getting-started`
- `site` - for infrastructure
- `docs` - for documentation (like this file)

---

## Version History

### Site Versions

| Version | Date | Description |
|---------|------|-------------|
| v2.0.0 | 2024-12-12 | VitePress migration, SEO optimization, pnpm, Playwright |
| v1.0.0 | 2023-XX-XX | Initial VuePress site |

### Course Versions (as of v2.0.0)

| Course | Version | Last Updated | Lessons |
|--------|---------|--------------|---------|
| Getting Started | 1.0 | 2024-12-12 | 16 |
| InSpec Beginner | 1.0 | 2024-12-12 | 14 |
| InSpec Advanced | 1.0 | 2024-12-12 | 17 |
| Profile Development | 1.0 | 2024-12-12 | 26 |
| STIG Development | 1.0 | 2024-12-12 | 14 |
| SAF Delta | 1.0 | 2024-12-12 | 7 |
| OHDF Mappers | 1.0 | 2024-12-12 | 16 |

---

## For Instructors

### Referencing Versions in Training

When delivering training, you can reference specific versions:

> "Make sure you're using InSpec Beginner v1.2 or higher for this exercise"

> "The workflow shown requires Site v2.0+ which includes Playwright testing"

### Tracking Student Progress

Students can check their course version on each course landing page under the title.

### Reporting Issues

When reporting issues, include both versions:
- Site version (from any page footer or course badge)
- Course version (from course landing page)

**Example:**
> "Found broken link in InSpec Advanced v1.1, site v2.0.0, lesson 8"

---

## Maintenance

### Monthly Review
- Check for outdated content in courses
- Update `lastUpdated` dates after content reviews
- Bump course versions when lessons are added/updated

### Quarterly Review
- Evaluate need for site version bump
- Review dependency updates
- Plan new course additions

### Annual Review
- Consider major version bump if significant infrastructure changes
- Audit all course versions for consistency
- Update version history table

---

## FAQ

**Q: When should I bump the site version?**
A: Only for infrastructure changes (framework, build system, major plugins). Content updates only affect course versions.

**Q: Can course versions be independent?**
A: Yes! Each course has its own version and update schedule.

**Q: Do I need to update both versions?**
A: No. Most updates only affect one level. Update site version OR course version, rarely both.

**Q: How do PDFs relate to versions?**
A: PDF filenames can include course version (future enhancement). PDFs are regenerated on each site release.

**Q: What if I forget to bump a version?**
A: Not critical for course versions - the `lastUpdated` date is more important. Site versions should be bumped for major releases.

---

## Related Documentation

- [CONTRIBUTING.md](./resources/03.md) - How to contribute
- [PDF-EXPORT-README.md](./PDF-EXPORT-README.md) - PDF generation
- [SESSION02.md](./SESSION02.md) - VitePress migration notes
