---
name: daily-docs-audit
description: 'Audit recently merged microsoft/vscode pull requests for documentation impact, stage deduplicated issue proposals, and create confirmed issues in microsoft/vscode-docs. ALWAYS use this skill when asked to run or configure a daily docs audit, identify documentation work from merged VS Code PRs, review pending docs issue proposals, or create docs issues for product updates.'
argument-hint: 'Optionally provide a lookback window or ISO 8601 start time (defaults to 30 hours), or ask to review pending proposals.'
---

# Daily Documentation Audit

Audit recently merged pull requests in `microsoft/vscode` and stage an issue proposal for each documentation update that is clearly required. Create an issue in `microsoft/vscode-docs` only after the user confirms that exact proposal.

The audit and staging phase is an unattended daily workflow. During that phase, do not ask questions, edit documentation, or create any GitHub issue. Use the `gh` CLI for all GitHub operations.

Issue creation is a separate, interactive phase. A request to run an audit is not approval to create its proposals. Never call `gh issue create` unless the user confirms the individual proposal in the current conversation.

## Related skill guidance

Apply the research and user-facing feature checks from the [doc-writer skill](../doc-writer/SKILL.md), but do not run its interactive approval or implementation phases. Use the source-verification techniques from the [pr-review skill](../pr-review/SKILL.md). For AI-related changes that affect `docs/copilot/` or `docs/agents/`, also apply the factuality and terminology guidance from the [docs-product-alignment skill](../docs-product-alignment/SKILL.md).

The `frontmatter-description` and `content-redirect` skills are implementation-time skills and are not needed for this audit.

## 1. Load and reconcile pending proposals

Pending proposals persist across runs in untracked Git metadata. Use the state helper for every state operation; do not read or edit its JSON file directly:

```powershell
node .github\skills\daily-docs-audit\manage-state.js list
```

The helper resolves storage with `git rev-parse --git-path daily-docs-audit/pending.json`. If it reports malformed or unsupported state, report the error and stop. Do not overwrite, reset, or discard unreadable state.

At the beginning of an audit:

1. Load every pending proposal, including proposals from earlier audit windows.
2. Repeat the GitHub deduplication searches from step 5 for each pending proposal.
3. If an existing issue or docs PR covers a proposal, remove it with `manage-state.js remove <proposal-id>` and report the existing item.
4. If a GitHub query fails, retain the proposal and report the failure.

Do not remove a proposal merely because its source PR is outside the current audit window.

## 2. Determine the audit window

Use the lookback window or ISO 8601 start time provided by the user. If none is provided, inspect PRs merged during the last 30 hours. Record the exact UTC start and end times in the final report.

The default includes a six-hour overlap between daily runs. Deduplication is therefore required.

## 3. Collect merged PRs

List every PR merged into the default branch of `microsoft/vscode` during the audit window. Paginate until all matching PRs are retrieved. Capture at least:

* PR number, title, URL, body, labels, author, and merge time
* Changed files and diff
* Linked issues and relevant review or author comments

Do not decide from the PR title alone. Inspect enough of the implementation and linked context to understand the user-visible behavior.

## 4. Evaluate documentation impact

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

## 5. Deduplicate and group

Prepare one issue proposal per coherent documentation task, grouping multiple source PRs when they implement the same user-facing feature.

Before staging a proposal, search issue bodies for each source marker and source PR URL:

`<!-- vscode-docs-update:vscode-pr-<PR_NUMBER> -->`

Also compare the task with every pending proposal. Reuse the same pending proposal ID when refreshing the same coherent documentation task in a later run.

Do not stage a proposal if any open or closed issue contains a matching marker, or if an existing issue, docs PR, or pending proposal already covers the same task. Report or refresh the existing item instead.

## 6. Stage the issue proposal

Prepare the exact issue title, labels, and body that would be submitted to `microsoft/vscode-docs`. Use a concise title in this format:

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

Store the proposal by passing a JSON object to the state helper's standard input:

```json
{
  "id": "<stable-kebab-case-task-id>",
  "title": "Document <user-facing feature or behavior>",
  "labels": ["doc-enhancement", "triage-needed"],
  "sourcePrs": [123456],
  "body": "<complete issue body, including every source marker>"
}
```

```powershell
$proposalJson | node .github\skills\daily-docs-audit\manage-state.js upsert
```

Before choosing an ID, compare the task with the pending list. Reuse an existing ID for the same task; otherwise choose a stable, descriptive, kebab-case ID. The helper preserves the original creation time when an existing proposal is refreshed.

If staging fails, report the error and continue evaluating the remaining candidates. Do not fall back to creating the issue or writing the state file directly.

## 7. Review and create pending proposals

Enter this interactive phase only when the user explicitly asks to review or create pending proposals. Do not treat an unattended or scheduled audit, a prior conversation, or a general preference to create docs issues as confirmation.

1. Load the pending proposals with the state helper.
2. Present one proposal at a time, including its complete title, labels, source PRs, and body.
3. Use the user-input tool to ask the user to choose **Create issue** or **Reject proposal** for that proposal. Do not request or infer bulk confirmation.
4. Leave the proposal pending if the user does not make either choice.

If the user chooses **Create issue**:

1. Repeat all GitHub deduplication searches immediately before creation.
2. If an existing issue or docs PR covers the task, do not create an issue. Remove the pending proposal and report the existing item.
3. If any deduplication query fails, retain the proposal, report the failure, and do not create the issue.
4. Run `gh issue create` with the exact confirmed title, labels, and body.
5. Remove the pending proposal only after `gh issue create` returns the created issue URL.
6. If creation fails, retain the proposal and report the error. Never claim that an issue was created without the returned URL.

If the user chooses **Reject proposal**, remove it with the state helper. Do not store a suppression record; a future audit may propose the task again. If removal fails, report the error and leave the proposal pending.

## 8. Report results

After an audit, return a concise report containing:

* Exact audit window and number of merged PRs inspected
* Newly staged or refreshed proposals and their source PRs
* All proposals that remain pending from current or earlier runs
* Existing issues or docs PRs that prevented duplicates
* Candidates skipped because docs are current, the change is not public, or evidence is insufficient
* Any GitHub query or proposal-staging failures

After an interactive review, report proposals created, rejected, deduplicated against existing work, still pending, or retained after failures. Include created issue links and source PRs.

If no new or pending proposals need action, state that clearly.
