# VS Code Documentation Copilot Instructions

This repository contains the Visual Studio Code documentation that publishes to https://code.visualstudio.com/docs.

## Repository Architecture

**Content Organization:**
- `/docs/` - Main documentation (follows TOC structure in `docs/toc.json`)
- `/api/` - Extension API documentation
- `/blogs/` - VS Code blog posts organized by year
- `/release-notes/` - Version release notes (pattern: `v1_XX.md`)
- `/remote/` - Remote development documentation
- `/images/` - Global images, with subfolder structure matching content

**Key Build Files:**
- `gulpfile.js` - Main build system that syncs with vscode-website
- `build/check-lfs.js` - Git LFS validation (required for binary files)
- `build/sitemap.xml` - Manually maintained sitemap
- `docs/toc.json` - Navigation structure (hierarchical format with areas/topics)

## Critical Workflows

**Git LFS is mandatory** for images/videos (`*.gif,*.mp4,*.jpg,*.png`):
```bash
git lfs install
git clone <repo>  # or GIT_LFS_SKIP_SMUDGE=1 for text-only
```

**Publishing pipeline:** Changes sync to internal staging → manual publish to code.visualstudio.com (no automatic deployment)

**Content validation:**
- Lint staged files with `npm run check-lfs`
- TSA validation via `npm run tsa:validate`

## Documentation Patterns

**Metadata format** (required for all docs):
```yaml
---
ContentId: <GUID>
DateApproved: MM/DD/YYYY
MetaDescription: <300 chars for SEO>
MetaSocialImage: <1024x512 .png for social>
MetaTags: <optional>
---
```

**TOC Integration:** All new docs must be added to `docs/toc.json` using this structure:
```json
["TOC Title", "/docs/folder/filename-without-md"]
```

**Specific Formatting Rules:**
- Use `kb(command.id)` for keyboard shortcuts (renders platform-specific)
- Images: Store in `folder/images/subfolder/` with lowercase, dash-separated names
- Links: Site-relative `/docs/path/file.md` (include .md for GitHub navigation)
- UI elements: **Bold text** for menus, buttons, dialogs
- Code elements: `backticks` for settings, filenames, JSON attributes

**File naming:** Use lowercase with dashes: `workspace-trust.md`, `custom-editors.md`

## Content Types & Conventions

**Documentation intent:** Focus on VS Code features and developer workflows, not general programming tutorials

**Text style:** Present tense, second person ("you"), active voice, sentence-case capitalization. Avoid "simply", "just", "easy", "obviously"

**Step formatting:** Use numbered lists for procedures, bullets for single actions. Format: `**File** > **Preferences** > **Settings**`

**Release notes pattern:**
```yaml
---
Order:
TOCTitle: Month YYYY
PageTitle: Visual Studio Code Month YYYY
MetaDescription: Learn what is new...
Date: YYYY-MM-DD
DownloadVersion: X.XXX.X
---
```

## Cross-Component Integration

**Website sync:** Content builds via `gulpfile.js` into private vscode-website repository for final publishing

**External dependencies:** Git LFS for binary assets, shelljs for build scripts, internal Microsoft systems for TSA compliance

Follow the comprehensive [documentation writing guidelines](../.github/instructions/docs-writing.instructions.md) for detailed style requirements.
