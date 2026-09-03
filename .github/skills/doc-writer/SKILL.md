---
name: doc-writer
description: 'Plan and write VS Code documentation for a new or updated feature. ALWAYS use this skill when the user asks to "document", "add docs for", "write docs for", or "update the docs for" a feature, or provides a GitHub issue/PR link to document — even if the change seems small. Proposes a documentation plan and asks clarifying questions first — it does not edit any files until you approve the plan.'
argument-hint: 'Feature to document, or a link to the relevant issue/PR.'
---

# Document a Feature

Help document a new or updated VS Code feature in the project documentation (the `docs/` folder). This skill works in two phases: it first **researches the feature and proposes a documentation plan**, then implements the changes **only after you approve**. It is acceptable to conclude that no documentation update is needed.

## When to Use

Use this skill **whenever** the request maps to any of these — do not start editing docs directly without first running Phase 1:

* The user says "document this", "document this functionality/feature", "add docs for…", "write docs for…", or "update the docs for…".
* The user pastes a GitHub issue or PR link and asks you to document or address it in the docs.
* Documenting a new or changed VS Code or GitHub Copilot feature.
* Turning a GitHub issue or PR into concrete `docs/` updates.
* Auditing whether existing docs need updating after a feature change.

This applies even when the change looks small (a clarification, a few added steps, a single section). Run the plan-first workflow rather than jumping straight to edits.

Do **not** use this skill for release notes, API reference docs, redirects, image swaps, or pure copy-edits — those are handled by other skills (`release-note-writer`, `content-redirect`, `frontmatter-description`) or direct edits.

## Guardrails

* **Docs only.** Limit changes to the `docs/` folder. Do **not** update release notes or API docs (`api/`) unless the user explicitly asks.
* **Public functionality only.** Do not add or retain documentation for internal builds, dogfood-only functionality, hidden settings or commands, source-only implementation, or manually settable internal feature flags.
* **Never edit `enterprise/policies.md`.** This file is generated from the enterprise policy definitions in the VS Code source. Edit `enterprise/policies-template.md` instead, which is used to regenerate `policies.md`.
* **Screenshots are human work.** When a screenshot needs to be added or updated, insert a `TODO` comment in the doc for a human to capture and insert it later — do not fabricate image references.
* **Style compliance.** All writing must follow the [docs-writing style guide](../../instructions/docs-writing.instructions.md).

## Phase 1 — Research & Propose a Plan (no edits)

Do not modify any files in this phase.

1. **Understand the feature.** Read the feature description, issue, or PR provided. If the description is ambiguous or lacks detail, ask clarifying questions before continuing.
2. **Establish the content framing.** Identify the primary persona, reader intent, and article purpose by following the [content-framing guidance](../../instructions/docs-writing.instructions.md#content-framing). Infer them from the existing content, documentation journey, source material, and writer's request. If any part of the framing remains ambiguous and different interpretations would change the content, ask the writer to confirm before planning edits.
3. **Check the source if needed.** To understand the implementation, inspect the source code in the `microsoft/vscode` repo. Use the `gh` CLI for all GitHub interactions (issues, PRs, code). See user memory `gh-cli-powershell.md` for PowerShell-specific `gh` patterns.

   | Area being documented | Primary source repo |
   |----------------------|---------------------|
   | Core editor, workbench, debug, terminal, tasks, settings, commands, keybindings | `microsoft/vscode` |
   | Copilot Chat, inline chat, agent mode, chat tools, chat participants, MCP in chat | `microsoft/vscode-copilot-chat` |
   | Enterprise policies | `microsoft/vscode` (policy definitions) |

4. **Verify public availability.** Check every feature, setting, and command against the public product channel intended for the article. Public Preview, Experimental, and Insiders functionality qualifies when labeled clearly. Source-code existence or manual configurability is not enough. Inspect registration metadata, product quality gates, feature flags, and the relevant public release. Treat metadata such as `included: false` as internal unless product evidence shows otherwise. If functionality is not public, do not document it. During an audit or review, propose removing existing coverage.
5. **Identify affected docs.** Search the `docs/` folder for the pages that need to be created or updated. Map each change to a specific file and section.
6. **Present the plan.** Summarize:
   * The primary persona, reader intent, and article purpose.
   * Which `docs/` files you propose to create or change, and a short description of each edit.
   * Any `TODO` screenshot placeholders that will be needed.
   * Open questions or assumptions.

   If you conclude that **no documentation update is needed**, say so and ask the user to confirm before closing out.
7. **Stop and wait for approval.** Do not proceed to Phase 2 until the user explicitly approves the plan (or adjusts it).

## Phase 2 — Implement (after approval)

Once the user approves the plan:

1. Apply the documentation edits exactly as agreed, following the [docs-writing style guide](../../instructions/docs-writing.instructions.md) and the approved content framing.
2. Add `TODO` comments where screenshots need to be captured by a human.
3. Respect the guardrails above (docs only; no release notes/API docs unless asked; never edit generated `policies.md`).
4. Verify that the introduction, main content, examples, and next steps serve the approved primary persona and reader intent.
5. Summarize the changes you made and call out any remaining `TODO`s for the user.
