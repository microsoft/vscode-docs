---
name: release-note-reviewer
description: 'Review VS Code release notes for style, structure, and completeness. Use for reviewing Insiders or Stable release notes against writing guidelines. Produces an actionable list of recommendations.'
argument-hint: 'Review the current release notes file'
---

# Release Note Reviewer

Review Visual Studio Code release notes and produce a clear, actionable list of recommendations. Handles both **Insiders** and **Stable** release notes, each with its own checklist.

## When to Use

* After drafting or updating a release notes file.
* Before publishing or merging release notes into the main branch.
* When asked to review, proofread, or improve release notes.

## Procedure

### 1. Determine release note type

Read the file's YAML frontmatter and check the `ProductEdition` field:

| `ProductEdition` value | Type       |
|------------------------|------------|
| `Insiders`             | Insiders   |
| `Stable` (or absent)   | Stable     |

If the file is not a release note (no recognizable frontmatter), tell the user and stop.

### 2. Load writing guidelines

Read the following instruction files to use as the review baseline:

* [Release notes writing instructions](../../instructions/release-notes-writing.instructions.md)
* [Documentation writing guidelines](../../instructions/docs-writing.instructions.md)

### 3. Run the review checklist

Apply the checklist for the detected release note type. Check every item and record a recommendation for each violation.

#### Common checklist (both types)

**Frontmatter**

* `Order`, `TOCTitle`, `PageTitle`, `MetaDescription`, `MetaSocialImage`, `Date`, `DownloadVersion`, `Milestone`, and `ProductEdition` are all present and well-formed.
* `MetaDescription` is under 160 characters and starts with "Learn what is new".
* `PageTitle` follows the pattern: `Visual Studio Code <Month> <Year>`.
* `MetaSocialImage` follows the pattern: `1_<release number>/release-highlights.webp`.
* `Date` is in `YYYY-MM-DD` format and matches the release date mentioned in the content.
* `DownloadVersion` follows the pattern: `1.<release number>.0`.
* `Milestone` matches the milestone name used in GitHub issues for this release.

**Headings**

* Headings use sentence case (only first word capitalized, except proper nouns).
* No inline formatting (bold, italic, code) inside headings.
* Section headings match the TOC navigation block entries.
* There should be empty sections
* For preview or experimental features, the heading includes that status, e.g. `### New JavaScript debugging experience (Preview)`.

**Writing style**

Follow the VS Code release notes writing style:
* Present tense, active voice, second person ("you").
* No banned words: "simply", "just", "easy", "obviously", "of course", "etc.", "delve", "crucial", "utilize", "leverage", "prior to", "in order to", "harness".
* "Select" instead of "Click" for UI actions.
* "might" instead of "may" for conditional statements.
* "for example" instead of "e.g.".
* "to enable" instead of "to allow" (unless referring to permissions).
* Sentences are concise and free of jargon.

**Settings and commands**

* When a setting is mentioned, the section starts with `**Setting**: \`setting(setting.name)\``.
* Setting names and command IDs look valid (dot-separated, camelCase).

**Links**

* Links to other VS Code docs use full URLs starting with `https://code.visualstudio.com/docs/` (no `.md` suffix).
* Links to bookmarks within the same file start with `#`.
* Link text is descriptive (no "click here", "this link", or "here").

**Images and videos**

* Image alt text starts with "Screenshot showing" and ends with a period.
* Video alt text starts with "Video showing" or "Video of" and ends with a period.
* Embedded YouTube videos use `youtube-nocookie.com`.

**Lists**

* Use asterisks (`*`) for unordered lists, not hyphens or dashes.
* List items are parallel in structure.

**Formatting**

* UI elements (menu items, dialog names, button labels) are in **bold**.
* Code elements (methods, properties, keywords, commands, setting names) use `inline code`.
* No em-dashes; use commas or separate sentences.

**TOC navigation block**

* The HTML TOC block exists and lists all H2 sections present in the document.
* Anchor `href` values match the H2 heading slugs.

#### Stable-only checklist

* Welcome paragraph is present and correctly references the release month (not a different month).
* The welcome paragraph does not contain TODO placeholders.
* Standard H2 sections are present and in the expected order (see the [template](../../../templates/template-release-note-endgame.md) for canonical order).
* Each feature section has a descriptive H3 title and a clear explanation of the change and its benefit.
* Each feature section opens with a user benefit or problem statement, not just a mechanism description.
* For features that span multiple releases, the entry re-establishes context in 1-2 sentences so it stands on its own without requiring readers to consult earlier notes.
* Admin and policy features address both the administrative use case and the developer-facing impact.
* No vague claims like "improved support" or "more efficient" without a concrete example or before/after comparison.
* When multiple features relate to the same theme, they are grouped and led by the most impactful one.
* `Notable fixes` and `Thank you` sections are present at the end (skip their content during review).

#### Insiders-only checklist

* The VS Code Insiders banner image reference exists and points to the correct version folder.
* The `_Last updated_` line is present and has a valid date.
* The disclaimer about GitHub Copilot generation is present.
* Feature entries are grouped under H2 date headings (format: `## <Month> <day>, <year>`).
* Each feature entry includes a link to a GitHub issue in the pattern `_[#issue-number](https://github.com/microsoft/vscode/issues/issue-number)_`.

### 4. Generate the recommendations list

Produce a Markdown document with a list of recommendations. Each item must include:

1. **Location** — the line number or heading where the issue occurs.
2. **Category** — one of: `frontmatter`, `heading`, `style`, `link`, `image/video`, `formatting`, `structure`, `setting`, `toc`.
3. **Current text** — quote the problematic text.
4. **Recommendation** — the specific, actionable fix.
5. **Suggested revision** — the corrected text (when applicable).

Format each recommendation as:

```markdown
* **Line <N>** (`<category>`): <description of the issue>
  * Current: `<current text>`
  * Suggested: `<revised text>`
```

Group recommendations by severity:

1. **Errors** — incorrect information, broken links, missing required sections.
2. **Warnings** — style violations, guideline deviations.
3. **Suggestions** — optional improvements for clarity or consistency.

If no issues are found, confirm that the release notes pass the review.

### 5. Summary

End with a brief summary:

* Total number of recommendations by severity.
* An overall assessment: **Pass**, **Pass with suggestions**, or **Needs revision**.
