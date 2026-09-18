---
name: write-my-release-notes
description: 'Generate VS Code release notes for the features you worked on in a milestone. ALWAYS use this skill when the user asks to "write release notes for my features", "document my milestone features", or "generate release notes from my issues". It gathers the milestone features you own from GitHub, analyzes each feature and its related issues, and writes user-focused feature sections into the milestone release notes file.'
argument-hint: '<milestone name>'
---

# VS Code Release Features Writer

This skill turns the features you worked on in a VS Code milestone into polished, user-focused release note sections. It gathers the features you own from GitHub using the `gh` CLI, then documents every one of them in the milestone's release notes file.

Use this skill when the user wants to draft or update the feature sections of a milestone's release notes based on the issues and test plan items they worked on.

## Prerequisites

* **Prefer the GitHub MCP server** for all GitHub queries when it is available. Use its issue search and issue read capabilities to run the queries and read the bodies, labels, and comments described below.
* **Fall back to the `gh` CLI** only when the GitHub MCP server is not available. In that case, ensure it is authenticated (`gh auth status`); the `gh` commands below implement the same queries.
* Queries use `@me`, so results are scoped to the authenticated user.

## Input parameters

* **Milestone name**: If the user does not provide a milestone name, ask the user for it. Do not continue until you have the milestone name.

## Locate the release notes file

1. Confirm the milestone name with the user.
1. Find the release notes file under the `/release-notes` folder. The file name does **not** match the milestone name, so search the folder contents for the text `TOCTitle: <milestone name>` (for example, `TOCTitle: April 2016`).
1. If no file exists for the milestone, create one using the appropriate template in `/templates` and a filename of the form `v<version>.md` (for example, `v1_109.md`).

## Identify features to document

Gather the features the user owns by running the following GitHub search queries. Use the **GitHub MCP server** if available; otherwise use the **`gh` CLI** commands shown below. Substitute `<milestone>` with the milestone name (keep the surrounding quotes). Collect each issue's `number`, `title`, `body`, `url`, `labels`, and comments.

### Step 0 — Consult prior context (optional).
If you have persistent memory, notes, or prior context about this milestone (coverage decisions, features you own that the label queries won't surface, work intentionally excluded), review it before the GitHub queries and reconcile against the results. Skip if you have none.

### Step 1 — Feature-request issues assigned to you

```bash
gh search issues 'org:microsoft milestone:"<milestone>" label:feature-request assignee:@me' \
  --limit 100 --json number,title,body,url,labels,repository
```

Process the results:

* **Skip** any issue labeled `*duplicate` or `*out-of-scope`.
* If an issue is labeled `on-testplan`, **set it aside** — do not document it directly. It will be attached as a related issue to its test plan item in Step 2.
* All remaining issues are release features to document.

### Step 2 — Test plan items authored by you

```bash
gh search issues 'repo:microsoft/vscode milestone:"<milestone>" label:testplan-item author:@me' \
  --limit 100 --json number,title,body,url,labels
```

Each test plan item is also a release feature to document. List the test plan item features **first**, before the feature-request features from Step 1. For each test plan item, collect related issues that provide the real feature detail:

* **Issues filed against the test plan item** — closed issues that reference it during testing:

    ```bash
    gh search issues 'repo:microsoft/vscode is:closed Testing <testplan-item-number>' \
      --limit 100 --json number,title,body,url,labels
    ```

* **Set-aside `on-testplan` issues from Step 1** whose issue number appears in the test plan item's body — attach these as related issues too.

### Step 2.5 — Reconcile against all your milestone work (catch mislabeled features)

The label queries in Steps 1 and 2 only find issues labeled `feature-request` or `testplan-item`. Real features are often tracked under other labels during the endgame — for example a feature that shipped a fix may carry `bug`, `verification-needed`, or `polish` instead. **Do not trust the label queries to be exhaustive.** Run these broader queries and reconcile the results against what Steps 1 and 2 already surfaced:

```bash
gh search issues --owner microsoft --assignee @me --milestone "<milestone>" \
  --limit 100 --json number,title,url,labels,state
gh search issues --owner microsoft --author @me --milestone "<milestone>" \
  --limit 100 --json number,title,url,labels,state
```

For every issue these return that is **not** already covered by Steps 1 and 2, judge it on its content, not its label:

* If it describes a **user-facing capability** (a new command, setting, UI, deep link, workflow), document it as a feature — regardless of whether it is labeled `bug`, `verification-needed`, `polish`, or something else. A "bug" that adds or restores a capability users will notice is a release feature.
* If it is a **pure defect fix, internal cleanup, or minor polish** with no user-facing capability, leave it out of the feature sections (it belongs in "Notable fixes" at most).
* When in doubt, read the body and comments (Step 3) before deciding, and ask the user whether to include it.

If you have persistent memory or prior context about this milestone (Step 0), cross-check each remembered feature you own against the combined results here — a feature noted in memory but missing from the query output is exactly the kind of item that slips through mislabeling.

### Step 3 — Fetch comments for each issue

The search queries above may not return comments (the `gh search issues` `--json` output does not include them). For every feature and related issue you plan to use, read the full body and comments for context — use the GitHub MCP server's issue read capability if available, otherwise the `gh` CLI:

```bash
gh issue view <number> --repo <owner/repo> --json number,title,body,url,labels,comments
```

Document **every** feature gathered from Steps 1, 2, and 2.5 — none should be skipped. Most features are identified by one of these labels:

* `feature-request` — a standard feature request issue. Its description and comments contain the feature details.
* `testplan-item` — a structured test plan for the feature. Its description contains in-depth details plus setup and test steps.

Some features surface only through Step 2.5 under other labels (for example `bug`, `verification-needed`, or `polish`). Treat those as features too when they describe a user-facing capability — the label does not disqualify them.

Use the related issues (from Step 2) to pull in additional context (their summary, description, and comments).

## Build each feature section

Gather and analyze all relevant details before writing:

* The summary, description, and comments of the feature itself.
* The summary, description, and comments of every related issue.

Then write a comprehensive, user-focused section for each feature:

* **Feature title**
    * Use a concise, descriptive title that identifies the feature. Use sentence case.
    * Do **not** take the title from a `testplan-item`, because that title is written for testing.
    * If the feature is in Preview or Experimental, include that status in the heading, for example `### New JavaScript debugging experience (Preview)`.
* **Feature description**
    * Do not add a "Feature Description" header — start directly with the prose under the heading.
    * Explain the feature, its purpose, and any constraints users should be aware of.
    * Never include testing content: no setup, test instructions, or validation steps.
* **Value proposition** — every section must answer "Why should the user care?"
    * Lead with the user benefit or the problem being solved, then explain the mechanics. State the pain point first, then the resolution.
    * Avoid describing only what changed. A mechanism ("buffer-based rendering") is not a benefit ("chat responses feel more fluid").
    * Link to relevant [VS Code documentation](https://code.visualstudio.com/docs/) when referencing tools, APIs, or concepts that are not common developer knowledge. Expand inline when docs coverage is thin.
    * For admin and policy features, cover both the administrative use case (compliance, security, cost control) and the developer-productivity impact.
* **Feature continuity for multi-release features**
    * For features that span multiple releases (for example, Agents, Customization UI, Sandboxing), add a 1-2 sentence reminder of what the feature is and its goal before describing what changed this release.
    * The first release of a feature should lead with benefit-oriented bullets. Later releases should still re-establish context.

## Writing guidelines

Follow the [release notes writing instructions](../../instructions/release-notes-writing.instructions.md) first, then the [VS Code documentation writing guidelines](../../instructions/docs-writing.instructions.md). Key rules:

* Use sentence case for headings; do not apply italic, bold, or inline code styling to headings.
* Use absolute documentation links that start with `https://code.visualstudio.com/docs/` and omit the `.md` suffix. Use descriptive link text — never "click here", "this link", or "here".
* Image alt text must describe the content and start with "Screenshot showing" or "Screenshot of". Video alt text must start with "Video showing" or "Video of" and use the `<video>` tag: `<video src="[URL]" title="[description]." autoplay loop controls muted></video>`.
* Format notes and tips as block quotes with a bold **Note** or **Tip** prefix. Use asterisks for list items.
* Reference settings with the `setting(setting.name)` format and keyboard shortcuts with the `kb(command.commandId)` format.
* Avoid marketing language and the word "now". State what changed directly and prefer concrete before/after examples over vague claims like "improved support".
* Group features that share a theme (for example, several agent improvements) and lead with the most impactful one.

## Verify technical details

* Only document settings and commands that actually exist. Verify setting names, values, and command IDs before referencing them.
* Fact-check all technical details and confirm every link and reference resolves.
* Keep terminology and structure consistent with existing release notes.

## Writing to the file

* Write **only** the feature documentation sections. Do not add version headers, welcome messages, or update summaries.
* Start directly with `###` feature headings.
* Do not leave TODO placeholders.
* Save the changes to the milestone release notes file.
