---
description: Validate internal links in documentation articles and report broken references.
argument-hint: 'File or folder to check (e.g., "docs/copilot/overview.md" or "docs/copilot/")'
tools: ['read', 'search', 'agent', 'problems']
---
Validate all internal links in the specified file(s) and report any broken references.

## Checks to perform

For each Markdown link in the file(s):

1. **Relative file links** (e.g., `/docs/editor/codebasics.md`):
   - Verify the target file exists in the repository.
   - If the link includes an anchor (e.g., `/docs/editor/codebasics.md#folding`), verify the target file contains a heading that matches the anchor.

2. **Image references** (e.g., `images/overview.png`):
   - Verify the image file exists at the referenced path.

3. **Anchor-only links** (e.g., `#some-heading`):
   - Verify the current file contains a heading that produces the referenced anchor slug.

4. **Absolute documentation links** (e.g., `https://code.visualstudio.com/docs/...`):
   - Extract the path and verify the corresponding file exists in the repository.

## Output format

Report findings as a Markdown table:

| File | Line | Link | Issue | Suggested fix |
|------|------|------|-------|---------------|

If all links are valid, report "All links validated successfully."
