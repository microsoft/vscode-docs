---
name: pr-review
description: 'Verify the technical accuracy of a vscode-docs pull request against the VS Code source code in microsoft/vscode and microsoft/vscode-copilot-chat. Use when reviewing a docs PR for factual correctness — setting names, command IDs, default values, API shapes, keybindings, versioned availability, and described behavior.'
argument-hint: '<PR number or branch> (defaults to the current PR / branch)'
---

# PR Technical Accuracy Review

Review a vscode-docs pull request and verify every factual claim about VS Code behavior against the source code in `microsoft/vscode` and `microsoft/vscode-copilot-chat`. Produce an actionable list of findings the author can address before merging.

This skill checks **technical accuracy only**. It does not enforce writing style, frontmatter, or release-notes structure — use the `release-note-writer` or `frontmatter-description` skills for those.

## When to Use

* Reviewing a vscode-docs PR that documents a new or updated VS Code or Copilot feature.
* Auditing existing docs for drift after a feature has changed.
* Asked to "fact-check", "verify", or "validate" a docs change against the product.
* Before merging a PR that touches `docs/`, `api/`, `remote/`, or release-notes content tied to a specific behavior.

Do **not** use this skill for pure copy-edits, redirects, image swaps, or other changes that make no factual claims.

## Repos to Check

| Area being documented | Primary source repo(s) |
|----------------------|------------------------|
| Core editor, workbench, debug, terminal, tasks, settings, commands, keybindings | `microsoft/vscode` |
| Copilot Chat, inline chat, agent mode, chat tools, chat participants, MCP integration in chat | `microsoft/vscode-copilot-chat` |
| Extension API, contribution points, `package.json` schema | `microsoft/vscode` (under `src/vs/workbench/api/`, `src/vscode-dts/`, and `extensions/`) |
| Enterprise policies | `microsoft/vscode` (policy definitions) — note that `enterprise/policies.md` is generated; verify against source, not the generated file |

Use the `gh` CLI for all GitHub interactions (see user memory `gh-cli-powershell.md` for PowerShell-specific patterns).

## Procedure

### 1. Identify the PR and its diff

* If a PR number was given, run `gh pr view <number> --json number,title,headRefName,baseRefName,files,body` to get metadata and the file list.
* If no argument was given, run `gh pr view --json ...` to use the PR for the current branch. If there is no associated PR, fall back to `git diff origin/main...HEAD`.
* Get the actual changed lines with `gh pr diff <number>` (or `git diff` for a branch).
* Skip files whose changes are purely cosmetic (typo fixes, image renames, redirect entries, frontmatter-only edits).

### 2. Extract verifiable claims

Walk the diff and build a list of every claim that can be checked against source code. Include line numbers from the new file content. Categories to look for:

| Category | Examples |
|----------|----------|
| **Setting** | `editor.fontSize`, `chat.agent.enabled`, default values, allowed enum values, deprecation status |
| **Command** | Command IDs (`workbench.action.*`), command palette titles, the action they perform |
| **Keybinding** | Default key bindings, `when` clauses, platform-specific overrides |
| **Menu / UI label** | Menu item text, button labels, view titles, walkthrough step titles |
| **API** | Names, signatures, and shapes in `vscode.d.ts` / `vscode.proposed.*.d.ts` |
| **Contribution point** | `package.json` schema entries (`contributes.*`), required fields |
| **Chat tool / participant** | Tool names, participant IDs, tool input/output schemas, agent mode availability |
| **MCP** | Server config schema, supported transports, capability flags |
| **Version availability** | "Available since 1.X" / "New in 1.X" claims |
| **Default behavior** | What happens out-of-the-box, what is on/off by default |
| **Policy** | Policy names, supported values, scope |

Treat anchor-style references (e.g., `setting(chat.agent.enabled)`, `command:workbench.action.X`) as claims to verify.

### 3. Verify each claim

For every claim, locate the source of truth and compare. Prefer one targeted lookup per claim — do not download full files when a search will do.

**Search the source repos** (parallelize independent lookups):

* `gh search code --repo microsoft/vscode '"<exact-string>"'` for setting IDs, command IDs, contribution keys.
* `gh search code --repo microsoft/vscode-copilot-chat '"<exact-string>"'` for chat tool names, participant IDs, agent-mode flags.
* `gh api "search/code?q=<query>+repo:microsoft/vscode"` when the `gh search` CLI quotes the query in a way that breaks qualifiers (see user memory `gh-cli-powershell.md`).
* `gh api repos/microsoft/vscode/contents/<path>?ref=main` to read a specific file.

**Where things live (common starting points):**

* Settings — search for `'<setting.id>'` near `registerConfiguration` calls; default values are in the `default:` field of the schema.
* Commands — search for `CommandsRegistry.registerCommand` or `registerAction2` with the matching `id`.
* Keybindings — search for `KeybindingsRegistry.registerKeybindingRule` or look in `src/vs/workbench/browser/parts/editor/...` and feature folders.
* Extension API — `src/vscode-dts/vscode.d.ts` (stable) and `src/vscode-dts/vscode.proposed.*.d.ts` (proposed).
* Chat tools — search `microsoft/vscode-copilot-chat` for `displayName`, `toolReferenceName`, or the tool ID string.
* Contribution points — `extensions/<ext>/package.json` and the schema in `src/vs/workbench/api/common/extHost*.ts`.

**Version availability** — when a doc claims "since 1.X":

* `gh api repos/microsoft/vscode/contents/<file>?ref=release/1.X` to see if the symbol existed in that branch, or
* `gh search commits --repo microsoft/vscode '<symbol>'` to find when it was introduced.

If a claim cannot be verified after a reasonable search, mark it **Unverified** rather than failing it — the author may have access to context the source does not expose.

### 4. Categorize each finding

| Severity | Use when |
|----------|----------|
| **Error** | The doc contradicts the source code (wrong setting name, wrong default, wrong command ID, removed API, wrong key binding). |
| **Warning** | The claim is partially correct but misleading (default changed in a recent release, behavior is platform-specific and the doc does not say so, feature is behind a setting the doc does not mention). |
| **Suggestion** | Optional clarification — link to the source, add a "since 1.X" note, mention a related setting. |
| **Unverified** | Could not locate the source of truth; ask the author to confirm. |

### 5. Produce the findings list

Output a Markdown report with this structure:

```markdown
## PR Accuracy Review: #<number> — <title>

**Files reviewed:** <count>
**Claims checked:** <count>
**Result:** <Pass | Pass with warnings | Needs changes>

### Errors

* **`<file>`:L<line>** (`<category>`) — <one-line description>
  * Doc says: `<quoted text>`
  * Source: `<repo>/<path>#L<line>` — <what the source actually says>
  * Fix: <specific suggested correction>

### Warnings

* ...

### Suggestions

* ...

### Unverified

* **`<file>`:L<line>** — <claim>. Searched <queries tried>. Please confirm.
```

Rules for the report:

* Use workspace-relative paths and 1-based line numbers for vscode-docs files, formatted as Markdown links per the `fileLinkification` rules.
* For source-code citations, include the repo, file path, and (when known) line or commit. A `gh`-friendly URL is fine: `https://github.com/microsoft/vscode/blob/main/<path>#L<line>`.
* Quote the doc text exactly so the author can search for it.
* Keep each finding to one issue — split combined problems into separate items.
* If everything checks out, say so explicitly and skip the empty sections.

### 6. Summary

End with:

* Counts by severity.
* An overall verdict: **Pass**, **Pass with warnings**, or **Needs changes** (any Errors → Needs changes).
* A reminder that this review covers technical accuracy only, and to run style/frontmatter skills separately if needed.

## Notes

* Do **not** push commits or post review comments on the PR unless the user explicitly asks. This skill produces a report for the user to act on.
* Do **not** edit `enterprise/policies.md` — it is generated; flag policy issues against `enterprise/policies-template.md` and the source policy definitions instead.
* When the doc references screenshots or videos, do not attempt to verify their contents — only verify any captions, labels, or alt text that make factual claims.
* Prefer `main` as the source-of-truth ref unless the PR explicitly documents behavior on a release branch or Insiders-only feature, in which case check `release/1.X` or recent commits accordingly.
