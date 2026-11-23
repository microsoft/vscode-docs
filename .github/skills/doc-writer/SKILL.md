---
name: doc-writer
description: 'Review, plan, and update VS Code documentation, coordinating specialized review and media skills. Use for article review/update requests and whenever the user asks to document a feature or issue. Proposes grouped changes in the conversation and waits for approval before editing.'
argument-hint: 'An article and review request, a feature to document, or a relevant issue/PR.'
---

# Review and update documentation

Help review or document VS Code features in the project documentation (the `docs/` folder) and keep required navigation metadata current. Review and propose grouped changes in the current conversation, then implement only after the user approves. No separate Markdown plan, canvas approval, or implementation chat is required. It is acceptable to conclude that no update is needed.

## When to Use

Use this skill **whenever** the request maps to any of these — do not start editing docs directly without first running Phase 1:

* The user says "document this", "document this functionality/feature", "add docs for…", "write docs for…", or "update the docs for…".
* The user pastes a GitHub issue or PR link and asks you to document or address it in the docs.
* Documenting a new or changed VS Code or GitHub Copilot feature.
* Turning a GitHub issue or PR into concrete `docs/` updates.
* Auditing whether existing docs need updating after a feature change.
* Reviewing an existing article, including its text and media, and proposing updates there or in related articles.

This applies even when the change looks small (a clarification, a few added steps, a single section). Run the plan-first workflow rather than jumping straight to edits.

For mixed article work, coordinate the specialists below rather than duplicating their procedures. Standalone release notes and blogs belong to their respective skills. API reference work needs an explicitly agreed scope.

## Use specialized skills

Load the relevant skills in the same chat. A skill supplies a procedure; using it does not require creating a subagent, another chat, or another approval screen.

| Work | Procedure |
|---|---|
| Editorial and technical article review | [docs-review](../docs-review/SKILL.md), using its interactive-review mode. Respect the requested focus; a grammar request does not require an unrelated product audit. |
| Screenshot and video assessment or replacement | [docs-media](../docs-media/SKILL.md). Begin with its read-only assessment. Captures and exact-asset approval remain separate permissions. |
| Frontmatter descriptions | [frontmatter-description](../frontmatter-description/SKILL.md). During review, report proposed corrections without applying them. |
| Approved page moves, renames, or deletion | [content-redirect](../content-redirect/SKILL.md), including dependent links and navigation. |
| Actual PR accuracy review | [pr-review](../pr-review/SKILL.md), with read-only, pinned GitHub inputs. Do not check out or execute PR contents; report checks that cannot run against the available snapshot. |

Keep one consolidated assessment and update plan, grouped by reader outcomes rather than individual edits. Include related articles and assets when justified, with reasons and exact paths. Report unsupported media inspection or unresolved product evidence explicitly. Do not turn a focused request into a corpus-wide audit.

Specialists must respect the current phase: no article changes during review, no unapproved captures, and no public writes. Resume this skill after specialist work rather than recursively handing the same task between skills.

## Guardrails

* **Docs and sitemap only.** Limit content changes to the `docs/` folder. When you add an article or change an article URL, update `build/sitemap.xml` in the same change. Do **not** update release notes or API docs (`api/`) unless the user explicitly asks.
* **Public functionality only.** Do not add or retain documentation for internal builds, dogfood-only functionality, hidden settings or commands, source-only implementation, or manually settable internal feature flags.
* **Focused research.** Follow the [focused research guidance](../../instructions/docs-writing.instructions.md#focused-research). Verify the requested functionality and settings without turning the task into an exhaustive source audit.
* **Never edit `enterprise/policies.md`.** This file is generated from the enterprise policy definitions in the VS Code source. Edit `enterprise/policies-template.md` instead, which is used to regenerate `policies.md`.
* **Media candidates require human approval.** Follow the [attended media procedure](../docs-media/SKILL.md) to capture real screenshots or videos. Keep the capture window visible with a human available throughout the run. Do not schedule unattended media capture. Keep candidates outside the repository until a human visually approves the exact asset. Never fabricate image references, publish unreviewed media, or treat a successful capture as visual approval. If capture is unavailable, leave a `TODO` explaining what still needs to be captured. Live AI captures require a dedicated test account and separate approval before sign-in or model requests.
* **Style compliance.** All writing must follow the [docs-writing style guide](../../instructions/docs-writing.instructions.md).

## Phase 1 — Research & Propose a Plan (no edits)

Do not modify any files in this phase.

1. **Understand the request.** Read the article, feature description, issue, or PR provided and the author's requested focus, concerns, and exclusions. Route specialized work as above. Ask only for missing details that materially affect the work.
2. **Establish the content framing.** Identify the primary persona, reader intent, and article purpose by following the [content-framing guidance](../../instructions/docs-writing.instructions.md#content-framing). Infer them from the existing content, documentation journey, source material, and writer's request. If any part of the framing remains ambiguous and different interpretations would change the content, ask the writer to confirm before planning edits.
3. **Check the source if needed.** Use `microsoft/vscode` for all source code, including Copilot Chat. Start with the supplied issue or PR and directly related changes. Identify concrete questions that the existing docs and feature description don't answer, then inspect only the source files and ranges needed to resolve them. Use exact setting or command IDs and linked implementation files before broader searches. Use the `gh` CLI for all GitHub interactions (issues, PRs, code). See user memory `gh-cli-powershell.md` for PowerShell-specific `gh` patterns.

4. **Verify public availability.** Check every feature, setting, and command in scope for the article against its intended public product channel. Public Preview, Experimental, and Insiders functionality qualifies when labeled clearly. Source-code existence or manual configurability is not enough. Inspect the relevant registration metadata, product quality gates, feature flags, and public release without surveying unrelated registrations or release history. Treat metadata such as `included: false` as internal unless product evidence shows otherwise. If functionality is not public, do not document it. During an audit or review, propose removing existing coverage.
5. **Identify affected docs.** Search the `docs/` folder for the pages that need to be created or updated. Map each change to a specific file and section. Include `docs/toc.json` and `build/sitemap.xml` in the plan when you add an article or change an article URL.
6. **Present the plan in chat.** Keep it concise and group routine corrections into meaningful outcomes. Do not ask the user to approve each finding or edit. Summarize:
   * The primary persona, reader intent, and article purpose.
   * Which `docs/` files and required navigation metadata you propose to create or change, and a short description of each edit.
   * Which screenshots or videos need candidate captures and human visual approval, or `TODO` placeholders if capture is unavailable.
   * Open questions or assumptions.
   * The target checkout and branch decision when implementation is requested. If already agreed, retain that choice rather than asking again.

   If you conclude that **no documentation update is needed**, say so and ask the user to confirm before closing out.
7. **Stop and wait for approval.** Do not proceed to Phase 2 until the user explicitly approves the plan (or adjusts it).

## Phase 2 — Confirm the Branch & Implement (after approval)

Once the user approves the plan:

1. **Confirm the branch before editing if it was not already agreed with the plan.** Use the user-question tool to ask whether to create a new branch from `main`. Offer these choices:
   * `Yes, create a new branch from main (Recommended)`
   * `No, continue on the current branch`

   Do not modify documentation files until the user answers. If the user chooses a new branch, ask for a branch name unless they already supplied one, then create the branch from `main` before editing. If uncommitted changes prevent safe branch creation, stop and explain the conflict instead of stashing or reverting changes. If the user chooses the current branch, continue without changing branches.
2. Apply the documentation edits exactly as agreed, following the [docs-writing style guide](../../instructions/docs-writing.instructions.md) and the approved content framing.
3. Generate approved-scope media candidates where the capture workflow is available. Inspect them for privacy, framing, and accuracy, then obtain human visual approval before copying an asset into the article's media directory. Otherwise, add `TODO` comments identifying the capture needed.
4. Respect the guardrails above (docs content and required sitemap updates only; no release notes/API docs unless asked; never edit generated `policies.md`).
5. Verify that the introduction, main content, examples, and next steps serve the approved primary persona and reader intent.
6. Summarize the changes you made and call out any remaining `TODO`s for the user.

## Orchestrate your documentation updates

- Handle short lookups and a single source trace directly. Act as a reviewer and coordinator when delegation is useful.
- Delegate substantial independent work to GPT-5.6 Sol subagents, in parallel when feasible. Give each task a bounded question, a distinct scope, and a clear stopping condition.
- Reuse collected evidence across the plan and delegated tasks. Don't have multiple agents scan the same source or repeat their research yourself.
- The subagents should not themselves run validation on their work, that's your job! You own the plan, integrate their contributions, and validate the final documentation.
