---
name: daily-docs-audit
description: 'Audit recently merged microsoft/vscode pull requests for documentation impact and create deduplicated issues in microsoft/vscode-docs. ALWAYS use this skill when asked to run or configure a daily docs audit, identify documentation work from merged VS Code PRs, or create docs issues for product updates.'
argument-hint: 'Optional lookback window or ISO 8601 start time. Defaults to the last 30 hours.'
---

# Daily Documentation Audit

Audit recently merged pull requests in `microsoft/vscode` and create an issue in `microsoft/vscode-docs` for each documentation update that is clearly required.

This is an unattended daily workflow. Do not ask questions, edit documentation, or create issues for uncertain or speculative updates. Use the `gh` CLI for all GitHub operations.

## Related skill guidance

Apply the research and user-facing feature checks from the [doc-writer skill](../doc-writer/SKILL.md), but do not run its interactive approval or implementation phases. Use the source-verification techniques from the [pr-review skill](../pr-review/SKILL.md). For AI-related changes that affect `docs/copilot/` or `docs/agents/`, also apply the factuality and terminology guidance from the [docs-product-alignment skill](../docs-product-alignment/SKILL.md).

The `frontmatter-description` and `content-redirect` skills are implementation-time skills and are not needed for this audit.

## 1. Determine the audit window

Use the lookback window or ISO 8601 start time provided by the user. If none is provided, inspect PRs merged during the last 30 hours. Record the exact UTC start and end times in the final report.

The default includes a six-hour overlap between daily runs. Deduplication is therefore required.

## 2. Collect merged PRs

List every PR merged into the default branch of `microsoft/vscode` during the audit window. Paginate until all matching PRs are retrieved. Capture at least:

* PR number, title, URL, body, labels, author, and merge time
* Changed files and diff
* Linked issues and relevant review or author comments

Do not decide from the PR title alone. Inspect enough of the implementation and linked context to understand the user-visible behavior.

## 3. Evaluate documentation impact

A PR normally requires a docs follow-up when it introduces or changes a user-facing or extension-author-facing:

* Feature, workflow, UI action, setting, command, keybinding, default, or configuration format
* Stable API, contribution point, schema, policy, authentication flow, or platform requirement
* Setup, accessibility, remote-development, troubleshooting, migration, deprecation, or removal behavior
* Behavior that makes existing documentation inaccurate or materially incomplete

Normally exclude:

* Refactors, tests, dependency updates, build changes, telemetry, code cleanup, and internal-only APIs
* Fixes that only restore already documented behavior
* Internal experiments, dogfooding-only features, and proposed APIs that are not publicly available
* Changes fully covered by an existing docs page, open issue, or open or merged docs PR
* Release-note-only updates unless permanent product documentation is also required

For each plausible candidate:

1. Verify availability, defaults, setting and command identifiers, UI labels, platform constraints, and feature flags against source.
2. Search `microsoft/vscode-docs` content for the affected concept and identify specific files or sections that are missing or stale. Consider `docs/`, `api/`, and `remote/`; do not propose edits to generated `enterprise/policies.md`.
3. Search all open and closed `microsoft/vscode-docs` issues and all open and merged PRs for the source PR URL, source PR number, feature name, setting or command ID, and likely documentation files.
4. Conclude that an update is required only when the product change is publicly relevant and the documentation gap is concrete and actionable.

## 4. Deduplicate and group

Create one issue per coherent documentation task, grouping multiple source PRs when they implement the same user-facing feature.

Before creating an issue, search issue bodies for each source marker and source PR URL:

`<!-- vscode-docs-update:vscode-pr-<PR_NUMBER> -->`

Do not create an issue if any open or closed issue contains a matching marker, or if an existing issue or docs PR already covers the same task. Report the existing item instead.

## 5. Create the issue

Create the issue in `microsoft/vscode-docs` with a concise title in this format:

`Document <user-facing feature or behavior>`

Use `doc-bug` when the product change makes existing docs inaccurate. Use `doc-enhancement` when documentation is missing, and add `triage-needed`. Use only labels that already exist.

Use this body:

```markdown
<!-- vscode-docs-update:vscode-pr-<PR_NUMBER> -->

## Product change

* Source: <links to all relevant microsoft/vscode PRs>
* Merged: <UTC merge date or date range>

<Concise, user-focused summary of what changed and who is affected.>

## Why the docs need an update

<Describe the verified gap or the existing content that became inaccurate.>

## Suggested documentation

* `<repository-relative file or documentation area>`: <specific content to add or change>

## Details to verify

* <Defaults, identifiers, availability, platform constraints, feature flags, or other facts the writer must preserve>

## Acceptance criteria

* <Observable documentation outcome>
* <Any related pages that must remain consistent>
```

Include one source marker per grouped PR. Omit the **Details to verify** section when there are no meaningful caveats. Do not include implementation instructions, test-plan steps, unsupported claims, or release-note prose.

If issue creation fails, report the error and continue evaluating the remaining candidates. Never claim that an issue was created unless `gh issue create` returned its URL.

## 6. Report results

Return a concise report containing:

* Exact audit window and number of merged PRs inspected
* Issues created, with links and source PRs
* Existing issues or docs PRs that prevented duplicates
* Candidates skipped because docs are current, the change is not public, or evidence is insufficient
* Any GitHub query or issue-creation failures

If no issues are needed, state that clearly.
