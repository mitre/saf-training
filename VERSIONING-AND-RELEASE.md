# Versioning and Release Process

This document defines the versioning strategy and release process for the SAF Training project.

---

## Versioning Strategy

We follow **[Semantic Versioning 2.0.0](https://semver.org/)**: `MAJOR.MINOR.PATCH`

### Version Number Meaning

Given a version number `MAJOR.MINOR.PATCH`:

- **MAJOR**: Incompatible changes (e.g., content restructure, breaking navigation changes)
- **MINOR**: New features/courses in a backwards-compatible manner
- **PATCH**: Backwards-compatible bug fixes, typos, minor content updates

### Examples

- `1.0.0` → `2.0.0`: VuePress to VitePress migration (major architecture change)
- `2.0.0` → `2.1.0`: Add new course or major content section
- `2.1.0` → `2.1.1`: Fix typos, update dependencies, minor content corrections

---

## Release Process

### 1. Pre-Release Checklist

Before creating a release, ensure:

- [ ] All tests pass
- [ ] VitePress site builds without errors: `pnpm run docs:build`
- [ ] All PDFs generate successfully: `pnpm pdf all`
- [ ] Documentation updated (README, CHANGELOG if applicable)
- [ ] Version number updated in `package.json`
- [ ] All changes committed to feature branch
- [ ] Feature branch merged to `main` (or create PR)

### 2. Creating a Release

Releases are automated via GitHub Actions when a version tag is pushed.

#### Step-by-Step

1. **Update version in package.json**
   ```bash
   # Manually edit package.json or use npm version
   npm version major|minor|patch --no-git-tag-version
   ```

2. **Commit version bump**
   ```bash
   git add package.json
   git commit -m "chore: bump version to vX.Y.Z"
   ```

3. **Create and push tag**
   ```bash
   git tag -a vX.Y.Z -m "Release vX.Y.Z: Brief description"
   git push origin main
   git push origin vX.Y.Z
   ```

4. **GitHub Actions automatically**:
   - Builds VitePress site
   - Generates PDFs for all courses
   - Creates GitHub Release with:
     - Auto-generated release notes
     - All course PDFs as downloadable assets
     - Tag reference

### 3. Release Workflow Details

Our release is managed by `.github/workflows/release.yml`:

**Triggers**: Push of tags matching `v*.*.*` (e.g., `v2.0.0`)

**Process**:
1. Checkout code
2. Setup pnpm + Node.js 22
3. Install dependencies
4. Build VitePress site (`pnpm run docs:build`)
5. Generate all course PDFs (`pnpm pdf all`)
6. Create GitHub Release using `softprops/action-gh-release@v2`
7. Upload all PDFs from `pdfs/*.pdf` as release assets

**Permissions**: `contents: write` (required for creating releases)

---

## Release Artifacts

Each release includes:

- **Source code** (auto-attached by GitHub)
- **Course PDFs** (all courses as separate files):
  - `Getting-Started-SAF-User-Class-YYYY-MM-DD.pdf`
  - `InSpec-Training-Beginner-YYYY-MM-DD.pdf`
  - `InSpec-Training-Advanced-YYYY-MM-DD.pdf`
  - `InSpec-Profile-Development-Testing-YYYY-MM-DD.pdf`
  - `STIG-Development-YYYY-MM-DD.pdf`
  - `SAF-Delta-Tool-YYYY-MM-DD.pdf`
  - `OHDF-Mapper-Development-YYYY-MM-DD.pdf`

PDF filenames include the date from the course's `lastUpdated` frontmatter field.

---

## Hotfix Process

For urgent fixes to a released version:

1. Create hotfix branch from tag: `git checkout -b hotfix-vX.Y.Z vX.Y.Z`
2. Make minimal fix
3. Bump PATCH version: `vX.Y.Z` → `vX.Y.Z+1`
4. Commit and tag: `git tag -a vX.Y.Z+1 -m "Hotfix: description"`
5. Push tag to trigger release
6. Merge hotfix back to main

---

## Development Workflow

### Working on Features

1. **Create feature branch** from `main`:
   ```bash
   git checkout -b feature/my-feature main
   ```

2. **Make changes** and commit regularly

3. **Test locally**:
   ```bash
   pnpm run docs:dev     # Preview site
   pnpm pdf all          # Test PDF generation
   ```

4. **Create PR** to merge into `main`

5. **After merge**: Tag and release from `main`

### Version Bumping Strategy

- **During development**: Keep version at current released version
- **When ready to release**: Bump version according to changes made
- **Only bump version once** when creating the release tag

---

## GitHub Actions Used

Our workflows use these battle-tested GitHub Actions:

### Release Workflow (`.github/workflows/release.yml`)
- `actions/checkout@v4` - Checkout code
- `pnpm/action-setup@v4` - Setup pnpm (version 10)
- `actions/setup-node@v4` - Setup Node.js 22 with pnpm cache
- `softprops/action-gh-release@v2` - Create release with artifacts (5,280⭐)

### Deploy Workflow (`.github/workflows/deploy-docs.yml`)
- Future: May use official VitePress deployment pattern:
  - `actions/configure-pages@v4`
  - `actions/upload-pages-artifact@v3`
  - `actions/deploy-pages@v4`

---

## Best Practices

1. **Never edit tags**: Tags are immutable - create a new version instead
2. **Test PDFs before release**: Ensure all courses generate correctly
3. **Write clear release notes**: GitHub auto-generates from commits, but you can edit
4. **Use conventional commits**: Helps with auto-generated release notes
   - `feat:` - New features
   - `fix:` - Bug fixes
   - `docs:` - Documentation changes
   - `chore:` - Maintenance tasks
5. **Keep CHANGELOG.md** (optional): Manual changelog for significant changes

---

## Troubleshooting

### Release workflow fails

Check:
- All PDF courses exist in `pdf-configs/unified.ts`
- VitePress build succeeds locally
- No missing dependencies

### PDFs missing from release

- Ensure `pnpm pdf all` runs successfully
- Check `pdfs/` directory contains all expected files
- Verify `softprops/action-gh-release` `files:` pattern matches

### Version conflicts

- Never reuse version numbers
- If a release fails, increment PATCH and retry
- Delete bad tags: `git tag -d vX.Y.Z && git push origin :refs/tags/vX.Y.Z`

---

## References

- [Semantic Versioning 2.0.0](https://semver.org/)
- [GitHub Releases Documentation](https://docs.github.com/en/repositories/releasing-projects-on-github)
- [VitePress Deployment Guide](https://vitepress.dev/guide/deploy)
- [softprops/action-gh-release](https://github.com/softprops/action-gh-release)
