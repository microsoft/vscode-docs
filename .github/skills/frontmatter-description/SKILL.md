---
name: frontmatter-description
description: 'Check and optimize MetaDescription frontmatter fields in VS Code documentation. Use when auditing, adding, or improving page descriptions for SEO and discoverability. Apply this when making content changes to markdown articles.'
---

# Frontmatter Description

Check and optimize `MetaDescription` frontmatter fields in markdown documentation files. Produces actionable fixes for descriptions that violate the rules below.

## When to Use

* Adding or editing a documentation page and need to write a `MetaDescription`.
* Auditing existing pages for SEO or discoverability improvements.
* Asked to check, review, or optimize frontmatter descriptions.
* Editing content articles and want to ensure the `MetaDescription` reflects the updated content.

## Rules

Every `MetaDescription` value must satisfy **all** of the following:

| Rule | Detail |
|------|--------|
| **Length** | Maximum 160 characters. |
| **Tone** | Action-oriented, value-focused, factual, and impersonal. |
| **Voice** | No "you can", "users can", or "this page explains". |
| **Sentences** | Complete sentences, not fragments or labels. |
| **No colons** | Do not include `:` in the value — it breaks YAML parsing. |
| **Uniqueness** | Each description must be unique across the docs. |

## Procedure

### 1. Identify target files

Determine which files to check:

* If given specific files, use those.
* If asked to audit a folder (e.g., `docs/copilot/`), find all `.md` files in that folder recursively.
* Skip files that have no YAML frontmatter (e.g., `README.md` files without `---` delimiters).

### 2. Extract and validate

For each file, read the YAML frontmatter and check the `MetaDescription` field:

1. **Missing** — Flag if `MetaDescription` is absent.
2. **Length** — Flag if the value exceeds 160 characters. Report the current length.
3. **Voice** — Flag if it contains "you can", "users can", "this page explains", or similar reader-addressing phrases.
4. **Tone** — Flag if the description is a fragment, a label, or passive rather than action-oriented.
5. **Context** — Flag if the description does not mention the relevant feature or tool.
6. **Forbidden words** — Flag any occurrence of "teaching", "enable", "disable", or condescending terms.
7. **Colons** — Flag any `:` character in the value.
8. **Versions** — Flag any version numbers (e.g., "v1.90", "VS Code 1.90").
9. **Plain text** — Flag Jinja2 variables (`{{...}}`), HTML tags, or Markdown formatting.

### 3. Report findings

Present results as a table:

```
| File | Issue | Current value | Suggested fix |
|------|-------|---------------|---------------|
```

* Group by file path.
* For each issue, provide the current `MetaDescription` and a rewritten suggestion that passes all rules.
* If a description passes all checks, omit it from the table (or mark it as passing if the user asked for a full report).

### 4. Apply fixes (when asked)

* Edit the `MetaDescription` value in the YAML frontmatter.
* Do not change any other frontmatter fields.
* Do not alter the page body content.
* Verify the fix passes all rules before applying.

## Examples

**Good descriptions:**

* `Get AI-powered inline suggestions from GitHub Copilot in VS Code, including ghost text completions and next edit suggestions.`
* `Configure and manage extensions in Visual Studio Code to customize your development environment.`
* `Debug Python applications in Visual Studio Code with breakpoints, variable inspection, and integrated terminal output.`

**Bad descriptions and why:**

| Description | Problem |
|-------------|---------|
| `This page explains how to use Copilot.` | Uses "this page explains". |
| `You can debug your code with VS Code.` | Uses "you can". |
| `Copilot` | Fragment, not a sentence. |
| `Learn how to enable the new feature in VS Code 1.90.` | Uses "enable" and includes a version number. |
| `Set up debugging: configure launch.json for Python.` | Contains a colon. |
