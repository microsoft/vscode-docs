# Docs agent implementation plan

Assessment date: 2026-11-22. Committed baseline before the W6 slice: `c4dc04ca4`. Durable media recipes and cache-safe refresh are complete. This slice adds article-first instruction checks using the existing attended runner.

Current position: chat launchers cover writing, issue/TPI documentation, article and PR review, screenshots, videos, and bounded article-driven instruction checks. Findings supports local claims/link checks and bounded editorial batch review. The bounded review-and-revise pilot is accepted as complete and successful, alongside the screenshot and video pilots. A live PR pilot completed a scoped technical pass and cleared a false comment-counter blocker. An attended Find pilot verified the selected instructions, and its sample workspace and dedicated profile are retained for reuse. New-article, issue/TPI authoring, related-article revision, multi-asset capture, and PR rejection-path validation remain separate opportunities. The additional live finding-fix pilot was explicitly skipped. Broader technical batch review remains separate.

This revision makes the author's eight daily workflows the core release scope. The original 30 scenario IDs remain in the inventory, but broader audits, blogs, release notes, corpus maintenance, and optional extensions are not prerequisites for this release. The PR launcher does not authorize a review until the author selects Review, and never relaxes the no-checkout rule.

The delivery order below is proposed, not authorization to execute tasks or change existing approval policies. Use [Docs agent workflow](DOCS-AGENT-WORKFLOW.md) for current operating procedures.

## Latest direction: separate chat launchers from batch findings

Prefer a small review launcher over further canvas-managed review/plan/implementation stages. The user selects presets and/or a free-form request, then starts a real interactive chat with the article and doc-writer guidance. Doc-writer coordinates specialized skills, proposes grouped changes in that conversation, and continues after approval. A separate Markdown plan and implementation handoff are not required.

Keep two distinct experiences:

* **Interactive launchers:** Supply context and start the relevant skill in chat. The chat owns the conversation, approvals, implementation, and follow-up. Launching it does not promise structured findings ingestion or completion tracking.
* **Batch checks and findings:** Choose a bounded scope, run supported report-only checks/reviews, and retain structured, deduplicated findings with coverage, freshness, and review decisions. This remains a first-class experience, not a hidden legacy view.

Do not make the launcher depend on transient host tasks or automatically import free-form chat output. **Fix in chat** carries one stored finding, its authenticated evidence, and current article context into a focused doc-writer conversation. It authorizes assessment and planning, not immediate edits or state changes. Findings offers one-click **Dismiss**, **Mark fixed**, and **Undo**, without an Accepted step, mandatory reason, or Save button. The existing audit history is retained. Manual closure after an article edit records current bytes without pretending that the historical report became fresh. Broader product-source batch review remains future work.

The batch-reliability slice allows new report-only checks and structured reviews after revalidating historical completion and a stopped-host observation, even if the old host task disappeared or a different session starts the new check. Active/unconfirmed work, bad evidence, and host API failures still block overlaps. Capture, replay, and authoring gates are unchanged.

Findings has one batch form with **Local claims and links** and **Editorial review (AI)** options, not duplicate single-article review or replay launch forms. Editorial batches contain at most five resolved articles and start one independent agent per article. The whole scope is preflighted before any launch; unconfirmed starts stop further launches and remain visible with per-article recovery. Existing review storage, exact-line validation, freshness, coverage, and decisions are reused. Editorial judgments do not verify product behavior or media. **Review in chat** remains the interactive article-review entry point. **Check instructions** (`/instructions`) starts from an article and optional section or task, then continues source-linked procedure review, attended execution, and private results in chat.

The two-article live editorial pilot completed both reports: no actionable findings for debug configurations and five candidate findings for basic editing. Both reports passed completion/current-source validation and entered Findings automatically. Refresh preserved 95 findings, including the original 90, with all five new observations open for human review. Articles and triage states remained unchanged. This validates execution and persistence, not product accuracy or blanket approval of the agent's judgments.

The bounded spike adds **Review in chat** at `/review`. A live click created a separate interactive review chat with the article and skill attached; that chat loaded doc-writer, returned the requested handoff acknowledgement, and stopped without editing. Three focused tests cover request preservation, native CLI arguments, and the browser launcher. This proves the handoff, not a full content/media review or automated chat-completion tracking.

New writing starts from **Write documentation** (`/write`) or **Document an issue** (`/issue`). Both launch doc-writer in an interactive chat with the author's brief, optional existing article, source URL when supplied, and channel. The canvas neither fetches issue requirements nor creates a planning task. **Saved plans and drafts** retains the older `/writing` route and its existing work, without its competing new-request form.

**Release TPIs** (`/tpis`) is the separate release-based discovery page. It lists open and closed `microsoft/vscode` test plan items for a selected milestone, excluding Verification TPIs. Each row opens the source issue, starts a doc-writer chat through **Document**, and offers one persistent manual **Documented** checkbox. No intermediate statuses, automatic completion, GitHub writes, legacy-state migration, or dependency on old host tasks are added. The selected release and private checkbox state persist per workspace/account; chat launch does not change the checkbox.

**Review PRs** (`/prs`) lists all open PRs, including drafts, for the selected `microsoft/vscode-docs` or `microsoft/vscode-docs-pr` repository. Search by title, number, or author, then select **Review** with optional instructions and a product channel. A direct-URL fallback accepts closed PRs too. The native chat receives the pr-review skill, not executable PR content or a claim that the list is a pinned snapshot. The skill screens untrusted inputs, records head/base hashes, uses full articles as context for changed passages, and checks freshness before reporting. No checkout, PR execution, completion state, or automatic Findings import is added. Deterministic checks remain unavailable without an already available authenticated matching source root.

The live PR pilot for `microsoft/vscode-docs#10724` verified five behavior claims against Stable 1.147.0 and corroborated the historical example, with no technical corrections. Complete REST and GraphQL comment collections agreed on zero available comments despite an advisory REST count of one, so the review continued with a metadata warning. Head/base freshness was checked and no repository or GitHub writes occurred. Deterministic checks, screenshot provenance, rendered-site behavior, and moved-head rejection were not exercised.

The standalone media slice adds independent **Screenshots** (`/screenshots`) and **Demo videos** (`/videos`) launchers. Both accept an article, create/refresh choice, and optional multi-asset request, then start docs-media in chat. Capture proposals, attended approval, candidate review, and authorized article changes stay in that conversation. Five focused launcher tests cover review plus both media handoffs, including unchanged batch findings. Both pages were also inspected in the actual canvas without starting a capture. Further live pilots require their own scope and attended approval.

**Screenshot validation completed:** An approved Stable Find/Replace pilot followed the Screenshots launcher into docs-media chat, attended capture, preparation, exact-candidate approval, and replacement in a disposable article copy. The 648 by 124 pixel result preserved the tight crop and two red callouts. Exact image bytes, descriptive alt text, the retained reference, and the native before/after diff were verified. The original repository article and image remained unchanged. This establishes one screenshot-refresh journey, not a full website build, LFS staging, production rollout, video, or multi-asset acceptance.

**Video callouts and validation completed:** MP4 preparation supports bounded, frame-timed red rectangles while preserving the raw recording. Real-FFmpeg synthetic tests verify exact timing, crop/padding translation, source preservation, and renewed approval after a recipe change. The separate Stable Find-demo pilot produced a human-approved 10.88-second, 1320 by 280 pixel MP4 with timed callouts. Full playback, all 272 frames, title/reference, approval hashes, disposable-copy insertion, and native diff were verified. The initial capture failed cleanup; an explicitly approved rerun succeeded. Raw WebM playback was unsupported in the integrated viewer, but final MP4 playback worked. Repository articles/assets and pre-existing changes stayed untouched. Multi-video acceptance, text/arrows, moving-target tracking, and production use remain outside this proof.

**Review-and-revise pilot accepted:** On 22 November 2026, the author explicitly accepted the debug-configuration review pilot as complete and successful. The chat reviewed the scoped text and screenshot, verified relevant Stable behavior, obtained one grouped update approval, revised a disposable article copy, and passed trusted local checks. The screenshot and related articles were retained because no changes were justified; repository originals remained unchanged. The execution evidence still records that automated native-diff inspection was not completed because of UI interruptions and dispatch failures. That observation does not block the author's pilot acceptance and is not relabeled as an automated pass.

The broader scenarios remain relevant. Their orchestration should stay in existing skills and the host chat wherever possible; the canvas supplies useful intake and context rather than another execution engine.

* **Primary persona:** Documentation maintainers and authors who review, write, and maintain VS Code content.
* **Reader intent:** Choose the next useful workflow, understand its prerequisites, and distinguish delivered behavior from supporting infrastructure.
* **Purpose:** Deliver the eight daily workflows using the most suitable existing tools, with a canvas to manage and track work rather than reproduce an editor, chat, or media application.

## Core day-to-day workflows

These eight entries define the user-facing release boundary. W IDs identify workflows; the existing S IDs identify reusable scenarios and remain stable.

| Workflow | Intended user journey | Current position | Scenario home |
|---|---|---|---|
| W1: Write feature content | Describe the request on Write documentation, then research, approve the grouped plan, implement, and review diffs in the same doc-writer chat. No existing article or issue is required. | Chat launcher implemented with fixture/browser coverage. The earlier live draft pilot updates one paragraph; a genuinely new article with navigation still needs end-to-end acceptance. | S19, S30; M2 |
| W2: Review and revise an article | Start an interactive review chat from presets and a request. Review, approve grouped changes, and continue there. Findings retains earlier structured review results, not a second review launcher. | The author accepted the bounded live review-and-revise pilot as complete and successful. Scoped text/media review, grouped approval, disposable revision, and checks completed; the native-diff automation limitation remains recorded. Cross-article edits were not needed or exercised. | S01, S26, S30; M1, M2 |
| W3: Create or update screenshots | Start docs-media from **Screenshots** with an article and create/refresh request. Agree the capture proposal, inspect one or several candidates, then authorize exact-asset use and article changes in chat. | One Stable screenshot refresh is validated through attended capture, human approval, exact-byte replacement, alt text, checks, and native diff in a disposable copy. Multi-image and production use remain separate. | S12, S15, S16, S18; M3 |
| W4: Create demo videos | Start docs-media from **Demo videos** with the article and desired demos. Agree action sequences, capture attended candidates, review playback/titles, and authorize selected handoff in chat. | One annotated Stable demo is validated through full MP4 playback, human approval, exact-byte disposable insertion, title/reference checks, and native diff. Multi-video and production acceptance remain separate. | S14, S15, S16, S18; M3 |
| W5: Check content accuracy | Select a bounded scope in Findings and choose local claims/links or editorial review. Inspect saved results with coverage, uncertainty, and explicit triage. | Editorial batches support up to five articles and reuse per-article review evidence, freshness, and decisions. Interactive reviews remain in chat. Broader product-source batch review, captured-manifest integration, external URLs, and live editorial-batch acceptance remain separate. Unverified references are not passes. | S01-S04, S26; M1 |
| W6: Check article instructions against the UI | Select an article section and target environment, review actions derived from its actual steps, approve attended execution, and inspect expected versus observed results tied to source lines. | Article-first chat intake and optional source maps reuse the attended runner. The bounded Find pilot passed, and its workspace and profile are reusable. Unsupported claims remain explicit. No arbitrary command execution or automatic Findings import. | S07, S08; M4 |
| W7: Verify a PR's accuracy | Browse Review PRs or supply a direct URL, choose a product channel and optional focus, then inspect pinned, source-backed findings in chat. | Discovery, handoff, and one live scoped technical review are validated. The pilot reconciled a comment-counter mismatch, verified five claims, and checked final freshness. Rejection paths, including moved-head rejection, remain unexercised. No checkout, execution, or automatic Findings import. | S01-S04, S26; M1 |
| W8: Document an issue or test plan item | Browse Release TPIs, choose a release, and select Document on a row; mark Documented manually when finished. Direct issue URLs still use Document an issue. Research, approval, and implementation stay in chat. | The release list, manual flag, and chat handoff are implemented with focused fixture/browser coverage. Live TPI interpretation and authoring acceptance remain separate. Test instructions are evidence, not execution permission. | S19, S29, S30; M2, M8 |

### Choose the right experience for each task

The canvas manages and tracks work: its request, scope, current status, decisions, blockers, results, and next action. It does not need to contain every interaction. A workflow is complete when the author can move between the appropriate tools without losing context, not when every step fits inside the canvas.

| Activity | Preferred experience | Canvas responsibility |
|---|---|---|
| Start or resume work across W1-W8 | A small task chooser and current-work list, with chat or editor entry points when useful. | Keep the request, article or source, progress, approvals, and next action together. Track work items, not execution transcripts. |
| Clarify requirements and adjust plans (W1, W2, W8) | Existing agent conversation; a readable plan artifact for longer plans. | Show the current plan summary and its approval state. Open the plan or continue in the owning session through supported host actions. No embedded replacement chat. |
| Read or edit articles; inspect corrections (W1, W2, W8) | Native editor, Markdown preview, and editor diff view. | List affected files and provide **Open article** and **Open diff** actions. Preserve the approved scope and check summary, not another text editor. |
| Review findings (W2, W5, W6, W7) | Persistent findings inbox with navigation to the relevant source line; native diagnostics where supported and useful. | Filter and triage durable findings, select corrections, and track follow-up. Do not require a new diagnostics extension before basic source navigation works. |
| Inspect screenshots and videos (W3, W4) | Existing image preview, side-by-side image views, or a compatible video player. Use a lightweight browser preview only where existing tools are insufficient. | Track one or several candidates, their destinations, descriptions, and exact-asset decisions. Thumbnails can help selection; a custom gallery, image editor, or player is not a prerequisite. |
| Run article instructions (W6) | The actual attended VS Code test window, with the procedure and findings available alongside it. | Show the reviewed scope, readiness request, progress, blockers, and result links. Do not recreate the product UI. |
| Inspect issue/TPI context or a docs PR (W7, W8) | Existing GitHub/browser views and read-only editor comparisons of captured PR content where supported. | Retain the source identity, pinned revision, interpretation, and review outcome. No PR checkout, executable preview, or duplicated GitHub conversation UI. |

The earlier **Start / Docs writing / Media / Findings** navigation and canvas-owned drafting sequence are superseded for new interactive work. Use focused chat launchers and the separate Findings inbox. Keep the older saved-work route accessible without creating a second new-writing workflow. Do not add tracking panels for chat activity that the host does not reliably expose.

Each tracked item needs only its request/source, scope, current status, pending decision or blocker, artifact links, and next action. Reuse existing state rather than adding a parallel task database or workflow engine. A task chooser must not offer working-looking actions for unimplemented workflows. Broader GitHub queues, board customization, and archive features remain backlog work.

Handoffs carry the article, source revision, review context, approved plan, and exact candidate identity without making the author re-enter them. Closing an editor or preview does not lose the task. Editing an article or transforming media makes dependent evidence stale; returning to the canvas must show that state rather than imply the prior approval covers new bytes.

**Editor integration:** The Windows extension uses the installed VS Code CLI for **Open article at finding** and **Open diff in editor**. The latter compares a verified, read-only captured baseline with the current editable article, not Git HEAD. The actual editor was inspected to confirm line navigation and the native diff view. Other hosts expose an explicit limitation and retain artifact paths and the saved diff as a fallback. No SDK editor API or session deep-link contract is assumed.

Distinguish a saved draft comparison from the current working-tree diff. Compare the correct captured baseline and result, label which is shown, and never present an outdated report as current editor state. For PRs, use read-only pinned content without checking out or executing it.

The current inline diff and screenshot preview can remain temporary fallbacks while editor and viewer handoffs are validated. Do not expand them or remove saved evidence prematurely. Plan adjustments stay in conversation; capture proposals remain readable rather than requiring storyboard JSON.

Read-only checks need a clear scope and explicit start, not a content-edit plan. Writing and revision require plan approval before edits. Capture requires reviewed actions and attended permission. Asset approval and application to files remain separate.

Before implementing each new slice, describe its complete user journey, identify the working surfaces and meaningful approval points, and wait for the author's approval. Do not add artificial steps to fit the implementation. For article updates, group corrections by outcomes and approve the overall plan and file writes once; do not ask for each edit.

### Reusable foundation

Reuse the [checkers](build/check-claims.js), [product evidence](build/product-manifest.js), [review reports](build/review.js), [findings inbox](.github/extensions/vscode-docs-workbench/article-inbox.mjs), [host adapter](.github/extensions/vscode-docs-workbench/article-workflow.mjs), and existing writing/review skills. Reuse [capture](build/capture.js), [video](build/capture-video.js), [preparation and exact-asset review](build/media.js), and [replay](build/replay.js) where applicable.

These components do not establish complete workflow acceptance. Product inventories are partial; source presence is not public availability. Replay success is not article correctness. The host SDK is experimental and session-scoped. Small scopes are usable, but full-corpus performance work remains parked. No new general infrastructure phase is needed.

### Decisions already made

* Execution and review are separate. Findings are durable review objects, not a run-history browser. Keep provenance and independent coverage behind the results.
* Preserve useful scenarios from the old workbench, not its implementation or migration compatibility. Existing private state must not be deleted or overwritten without authorization.
* Put reusable logic in tested scripts under `build/`. Keep skills procedural. Use host sessions, tasks, and worktrees rather than another orchestration engine.
* PR review must not check out a PR or execute its contents. Read commit-pinned articles, diffs, and discussion through GitHub as untrusted data. Review changed passages by default, using full articles as context. This does not prohibit host-managed worktrees for separately approved authoring.
* Use a thin, task-centered visual interface. Technical replay belongs under advanced tooling, not as a substitute for **Validate article instructions**.
* Keep chat launchers, **Saved plans and drafts** (`/writing`), and **Findings** (`/findings`) distinct. Use native editor diffs, existing conversations, and suitable media viewers for the work itself. Do not restore duplicate intake forms or claim unverified chat-completion tracking.
* UI capture and replay are attended-only. No scheduled UI, lock-screen tests, sleep-state tests, or automatic native-prompt handling.
* Keep the approved media baseline: Windows, Dark Modern, 1920 by 1080 output pixels, 100% instance scale, default fonts, and zoom 2. Zoom 1.5 requires explicitly wide content.
* Readiness, review of a finding, media approval, documentation edits, and public actions are distinct permissions. Unattended repo-only work, if later approved, is report-only.
* Do not install tools, enable automations, commit, push, publish, post comments, or create issues without the applicable explicit authorization.
* Production article and media rollout remains deferred until workflow implementation is complete and the user authorizes rollout. Acceptance uses synthetic content or explicitly approved bounded pilots.
* Settings have no CLI export. Capture raw default settings from both the editor and Agents windows. Export keybindings for both window modes. Do not reintroduce the original plan's assumed settings-export command.

## Complete scenario inventory

Status describes the current capability, not an approved delivery commitment:

* **Available:** The stated bounded capability is implemented and validated.
* **Partial:** A skill or tested component exists, but the full scenario or its new-workflow integration is incomplete.
* **Planned:** The scenario is retained but lacks an accepted end-to-end implementation.
* **Optional:** An original extension idea remains visible but requires a separate priority decision.

The milestone column assigns every scenario a delivery home. It does not imply that optional work is approved.

| ID | User scenario and intended result | Status and remaining gap | Milestone |
|---|---|---|---|
| S01 | Verify factual and behavioral claims in an article or docs PR, including settings, commands, defaults, shortcuts, and version claims. | Partial: whole-article review has an accepted live pilot. Section review has scoped integration and browser tests. PR discovery and a pinned-data review procedure are available through chat; full PR review acceptance remains. | M1 |
| S02 | Check Preview and Experimental labels against actual product lifecycle. | Partial: lifecycle ID validation exists. Product-state comparison is not automatic. | M1 |
| S03 | Detect documentation for internal, unavailable, or wrong-channel functionality. | Partial: source-verification guidance exists. Captured inventories are not authoritative availability checks. | M1 |
| S04 | Validate links, anchors, media paths, command links, tryout references, TOCs, and sitemap coverage. | Partial overall: local structural checks are available. Canvas navigation coverage and product registration verification remain separate. | M1 |
| S05 | Audit merged product changes and propose necessary documentation follow-ups. | Partial: daily audit skill and proposal state exist. New inbox integration is missing. | M5 |
| S06 | Review the existing corpus in rotating slices, not only changed PR files. | Partial: batch structural checks work. Semantic rotation and coverage policy remain to implement. | M5 |
| S07 | Follow an article's instructions and identify missing, incorrect, or confusing steps. | Planned: scripted replay is infrastructure, not this scenario. | M4 |
| S08 | Verify documented menu paths, UI labels, settings locations, and platform-specific shortcuts. | Partial: selected UI assertions work on Windows. Article-derived and cross-platform coverage is missing. | M4 |
| S09 | Execute documented commands, task and debug configurations, and code or extension samples. | Planned: needs explicit execution boundaries and controlled fixtures. The replay runner is not a shell executor. | M4 |
| S10 | Attempt a tutorial or quickstart as a fresh reader and report friction and missing prerequisites. | Planned: requires a defined starting state and recording of assistance. | M6 |
| S11 | Give an agent a goal and only approved documentation, then assess task success and discoverability. | Planned: docs-as-eval needs goal-based outcomes and a documented evidence policy. | M6 |
| S12 | Create or refresh a documentation screenshot. | Partial overall: one independent screenshot refresh has an attended capture-to-approval-to-disposable-replacement proof. Multi-image and production acceptance remain separate. | M3 |
| S13 | Detect stale media by comparing current product captures with existing assets. | Planned: regeneration and hashes exist, but visual drift detection does not. Text assertions are not pixel comparison. | M5 |
| S14 | Create a short demonstration video with visible actions. | Available for the bounded single-video journey: launcher, attended capture, full MP4 playback, approval, and disposable-copy handoff. Multi-video acceptance remains. | M3 |
| S15 | Write descriptive screenshot alt text and video titles. | Available in the bounded screenshot and video pilots: human-approved descriptions and corresponding references were verified in disposable article copies. | M3 |
| S16 | Crop, frame, optimize, and convert media without destroying the source. | Available through tested helpers. Integrate these operations into candidate review. | M3 |
| S17 | Produce theme variants where the reader benefits. | Optional: fixed-theme capture is proven, not a multi-theme workflow. | O1 |
| S18 | Add annotated callouts to direct attention. | Available for reviewed red rectangles. Broader annotation styles remain optional. | M3, O1 |
| S19 | Document a feature from an author's request, with optional issue or PR context, from approved plan to reviewed changes. | Partial: request/issue planning and a scoped draft have a live proof. Screenshot handoff has fixture/browser proof. New-article, TPI, and direct revision journeys still need acceptance. | M2 |
| S20 | Draft and review release notes from milestone features, issues, and TPIs. | Partial: release-note skills exist. Preserve their distinct channel and milestone rules in the workflow. | M2 |
| S21 | Draft and review a blog announcement from product context. | Partial: blog-writer exists. Its human-only image guardrail still differs from doc-writer's approved-candidate policy. | M2 |
| S22 | Perform cross-article terminology changes, page moves, redirects, and navigation maintenance. | Partial: existing skills and checks help. Multi-file impact planning and acceptance need integration. | M7 |
| S23 | Generate settings and command reference tables from product evidence. | Planned: capture and manifest helpers are not an authoritative reference-generation pipeline. | M7 |
| S24 | Turn docs issues and page feedback into assessed, deduplicated proposed fixes. | Partial: issues and planning flows exist. Feedback-to-fix triage is not integrated in the new experience. | M2 |
| S25 | Identify competitive coverage, keyword, and discoverability gaps for human and AI readers. | Partial: product-alignment guidance exists. Evidence-backed gap proposals need a repeatable workflow. | M7 |
| S26 | Review accessibility, heading structure, descriptions, terminology, and editorial consistency. | Partial: whole-article editorial review is integrated and included in the accepted combined-review pilot. Multi-file maintenance remains. This is not a full accessibility audit. | M1, M7 |
| S27 | Flag locale-dependent instructions, UI strings, and screenshots before localization. | Optional: retain localization preparation as a distinct scenario, not a translation commitment. | O1 |
| S28 | Review coverage, unresolved findings, stale media, and evaluation outcomes in periodic digests. | Partial: current check coverage exists. Combined reporting and evaluation denominators are missing. | M5, M6 |
| S29 | Find and organize work across docs PRs, issues, release TPIs, and media tasks. | Partial: Release TPIs supports milestone discovery, doc-writer chat launch, and a manual Documented flag. Review PRs supports repository selection, open-PR discovery, and read-only review chat. Broader queues/boards remain legacy or later work; no migration is required. | M8 |
| S30 | Track plans, approved implementation, artifacts, completion, and explicit GitHub follow-up. | Partial: legacy flows exist. Keep work-item lifecycle separate from execution history and GitHub state. | M2, M8 |

### Cross-cutting delivery options

These are ways to run or review scenarios, not extra documentation tasks:

* Ad hoc chat and host sessions remain valid entry points. A workflow must not depend on a canvas being visible throughout execution.
* UX option to assess: select a block of text in the editor, right-click, and choose **Review** or another documentation action. This might be simpler than selecting a section through the canvas. Keep it as an exploration, not an approved implementation change.
* The findings inbox handles evidence review. Diffs and media previews handle proposed content changes. GitHub remains authoritative for public issue and PR state.
* Manual repeatable launchers can reuse skills and host capabilities when useful.
* Scheduled local audits, rotating repo-only checks, and deterministic GitHub Actions remain optional and require explicit configuration approval. No schedules or CI are enabled by this plan.
* Old nightly replay and media-capture proposals are superseded by attended-only UI. Old screenshot-bearing replay reports are superseded by structural replay evidence and a separate media workflow.
* Work-item archive and restore remain optional organization features. They must not recreate run-history navigation or silently retire live private records.

## Proposed implementation sequence

Keep one bounded implementation slice active. This order replaces the previous broad M1-to-M8 progression. M IDs remain delivery homes, not a requirement to finish every scenario in a milestone before moving on.

| Order | Slice and user-visible outcome | Prerequisites and acceptance |
|---|---|---|
| 1 | Finish the writing/issue chat-launcher slice (W1, W8) and preserve saved work. | The current approved implementation. Verify brief-only and issue-only intake, correct skill/context handoff, no background planning task or edits, and accessible existing drafts. |
| 2 | Validate remaining writing journeys (W1, W8). | The bounded W2 review pilot is accepted. Next validate a new article with navigation and an issue/TPI update through separately approved pilots. Cross-article revision can be exercised when a real need arises, not manufactured to complete a test. |
| 3 | Validate complete media journeys (W3, W4). | Separately approved attended pilots: new and replacement screenshots, several assets with mixed decisions, and short video playback/title review through exact-byte handoff. No new media orchestration UI. |
| 4 | Validate data-only PR accuracy (W7). | A scoped live pilot completed source-backed review with explicit limitations and final freshness. Failure paths, including moved-head rejection, remain separate validation. |
| 5 | Extend batch accuracy where useful (W5). | Bounded editorial batches and a two-article live pilot validate execution and persistence. Row actions and focused fix-chat handoff have integration/browser coverage. The additional live finding-fix pilot was explicitly skipped. Broader technical/product-evidence integration is separate. |
| 6 | Check article instructions in chat (W6). | Article-first intake and optional source maps reuse the attended replay runner. A bounded Stable Find pilot passed. Derive and review each procedure from actual article steps, reuse the reviewed sample workspace and profile, and report only observed outcomes. Deliberately faulty instructions are not an acceptance requirement. |

Before any next implementation or pilot, describe its end-to-end journey and obtain approval. The order above is a recommendation, not permission to write articles, capture media, or execute UI.

### M1: Review documentation

**Current:** Interactive article review uses doc-writer and its specialists in chat. Review PRs has one scoped live technical pass. Findings supports local checks and editorial batches of up to five articles, reusing persistent review results and triage. The additional live finding-fix pilot was explicitly skipped. Human triage of editorial judgments, PR failure paths, and broader technical batch review remain.

* W2 uses **Review in chat** and doc-writer to propose grouped corrections in the conversation. Do not restore a competing single-article review launcher on Findings. Saved finding decisions remain context, not permission to edit.
* For W5, review presets already support interactive assessment. Future batch check choices can add product or editorial scope, but must keep deterministic failures, agent judgments, and unverified claims distinct. Identify the channel, build, platform, and mode where relevant.
* Local link checks must not imply that external URLs were checked. Verify permitted external targets read-only or explicitly report the missing coverage. Captured settings/keybinding evidence assists research but does not prove behavior or public availability.
* W7 accepts a PR URL and captures the exact base/head, changed passages, complete article context, and relevant discussion as untrusted data. Reuse applicable checks against those captured inputs, never an unrelated checkout. Missing dependencies produce limitations, not a clean result.
* Reject stale PR heads and changed evidence. Do not check out the PR, run its scripts, install its dependencies, or post review comments without separate authorization.

**Acceptance:** Source-located, actionable results with chosen-scope coverage and preserved decisions. A grammar-only request does not imply a product audit. A PR fixture identifies a changed-line problem using full-article context, rejects a changed head, and performs no checkout or execution. No agent-review silence automatically marks old findings fixed.

### M2: Plan and implement documentation changes

**Current:** New writing and issue/TPI requests launch doc-writer in chat. Existing structured plans/drafts remain secondary saved work. The earlier one-paragraph live pilot and structured fixture tests remain evidence for those helpers, not proof of a new-article or TPI-driven chat journey.

* W1 starts with the author's goal, audience, context, and constraints. A GitHub issue is optional. Research relevant existing content and availability, then propose the smallest useful plan before writing.
* W8 uses the same flow with an issue or TPI as supporting context. Present the interpreted feature, relevant discussion, open questions, and proposed content. Do not assume the source is complete or reproduce test setup as user documentation. Default to documentation articles; release-note and blog variants are later work.
* W2 carries the article, review, concerns, and relevant evidence into a short grouped plan in the same chat. Agree the scope and authoring location before edits; do not ask for each routine correction.
* Discuss adjustments in that conversation. Recheck current inputs before editing and preserve existing/manual work outside the approved scope. Do not recreate the older one-draft-attempt state machine as a requirement for chat.
* Use native editor diffs and relevant existing checks. The canvas launches the task, not a separate implementation agent or mandatory plan-file exchange.
* Media remains optional and uses docs-media where needed. Capture and exact-asset approval remain explicit; neither a feature plan nor an unfinished draft is a prerequisite for independent media work.

**Acceptance:** Prove a description-only new article with its required navigation, an issue/TPI-driven update, and an article-level correction plan leading to a checked editor diff. Verify the compared baseline, file/line navigation, and return to the same tracked work after manual edits. Rejected, stale, or cancelled plans make no edits. A no-change recommendation is valid. Rechecks report remaining issues rather than automatically treating a revised article as correct.

### M3: Create and refresh media

**Current:** Independent screenshot/video launchers start docs-media in chat. One screenshot replacement and one annotated video insertion are validated through attended capture, full candidate review, exact-asset approval, and disposable-copy diffs. Version-controlled recipes now associate stable outputs with published paths and reusable storyboards/preparation. New private captures retain exact storyboard bytes. Approved refresh plans use new versioned filenames and update Markdown references and recipe ownership together. The two pilot inputs are portable examples; registering them does not publish pilot media or approve another run. Multi-asset journeys still need bounded live acceptance; no further canvas-owned media pipeline is required.

* Start from an article, regardless of whether it has a feature plan or draft. List its current media and allow selecting replacements or describing new screenshots/videos. Accept one or several assets in the same request.
* Let the agent propose what each asset shows, why it helps, its article placement, and a capture procedure. For video, show a short scene/action sequence and intended duration. Keep storyboard JSON as implementation evidence, not author homework.
* Reuse attended capture and preparation. Native prompts remain human work. Unsupported UI, unavailable tools, or account requirements produce a clear pending/blocked item, not a fabricated candidate.
* Track candidates with per-asset status and an action to open the exact asset. Compare images in existing preview surfaces and use a compatible player for video. Add only the minimal preview missing from those tools, not a custom gallery or media editor. Propose alt text or titles from the actual candidate and let the author edit them.
* Approve or reject exact prepared assets individually. Multiple candidates can have different outcomes. A requested crop, annotation, or recapture creates a new candidate requiring new approval; preserve the original and prior decisions.
* Separately confirm the exact insertions or replacements and affected Markdown. Bind replacements to both the existing asset and article hashes, verify approved output bytes, and rerun relevant checks. Do not overwrite a changed destination.
* Reuse this workflow and its artifact handoffs from W1/W2/W8. Do not require a shared media page, duplicate feature-media and article-media implementations, or add batch scheduling.

**Acceptance:** Without creating a feature plan, complete a new screenshot, a replacement, and a multi-image request. In a mixed-result fixture, approving two candidates and rejecting another changes only the two explicitly authorized assets and references; the rejected replacement leaves its original intact. Prove one short video and a multi-video selection through playback, title review, and exact-byte handoff. Any failed capture or preparation stays failed. Include reload persistence and a separately authorized attended proof. No production rollout.

### M4: Validate article instructions and examples

**Current:** Check instructions starts from an article and optional section or task in chat. The agent prepares a reviewed source-linked procedure and reuses the attended runner. One Stable 1.147.0 pilot verified opening Find, finding three matches without Enter, and next and previous navigation. That pilot predates source-map output. A subsequent Stable Source Control quickstart check validated the source-linked results for local repository initialization, README review, staging, and unstaging without losing content. Its reusable sample profile retains human-managed trust, extension state, and normal sign-in storage. The first Git attempt stopped at an incorrect welcome-button locator and remains preserved as incomplete. The corrected procedure passed, with an empty index, unchanged files, no commits or remotes, and successful application cleanup.

* W6 starts with one non-AI article section in an approved disposable sample workspace, not a storyboard picker. Reuse its dedicated profile to retain the human's Workspace Trust decision. The explicit replay-only sample environment also retains extensions and normal sign-in storage, without repeatedly asking for the same setup authorization. Keep media captures isolated. Map article steps and expected outcomes to exact source spans. Keep environment setup separate from documented reader steps.
* Have the agent derive a readable action plan from the article. Screen it and obtain approval before execution. Article text is not permission to run commands, install tools, change accounts, or access services.
* Add bounded observation and action support only where the selected procedure needs it. Existing scripted replay can execute compatible reviewed actions but must not silently repair or replace the article's instructions.
* Record source-linked expected and observed outcomes, missing prerequisites, assistance, and unsupported steps in private replay evidence. Show passed, mismatch, blocked, and not-checked results in chat. Do not automatically import chat results into Findings. Environment failures and agent failures are not automatically documentation bugs.
* Add terminal commands, task and debug configurations, and extension samples as separately approved execution slices. Do not expand the current replay runner into an arbitrary shell executor. Cross-platform claims require corresponding platform evidence.

**Acceptance:** Follow an actual article procedure, not a pre-authored passing storyboard, and verify the described outcomes. The bounded Find pilot is complete. Further checks should address real reader tasks when useful, not manufactured faulty instructions or extra pilots as prerequisites. Source maps cite the exact article lines, and unobserved claims remain explicit. No unapproved downloads, sign-in, model requests, application execution, or changes outside the approved sample workspace.

## Later backlog

Retain the following delivery homes and all scenario IDs. They are not requirements for the eight-workflow release: scheduled or rotating audits, media drift detection, reader-goal evaluations, executable samples beyond approved UI-check prerequisites, broad corpus maintenance, reference generation, work queues, release-note/blog variants, feedback triage, and optional extensions. Reprioritize them explicitly after the daily workflows are useful.

Release notes (S20) and blogs (S21) keep their existing skills and distinct policies under M2. Their presence in the inventory does not make them prerequisites for documenting an issue or TPI as an article.

### M5: Audit changes, corpus coverage, and drift

* Reuse daily-docs-audit for merged product changes and proposal deduplication. Connect validated findings and proposals without merging or discarding unrelated private stores.
* Add manual rotating article scopes and distinct structural, semantic, and product-evidence coverage. Preserve successful coverage outside the selected slice.
* Implement visual drift comparison as a separate slice: controlled recapture, comparable regions and framing, and a reviewable difference. Theme, layout, and rendering noise must not become automatic content bugs.
* Produce a digest covering reviewed scope, never-reviewed content, current and stale evidence, open findings, and media candidates. Include links to evidence, not another transcript or run-history interface.

**Acceptance:** Repeating an audit does not duplicate findings or proposals. A partial or failed slice cannot imply clean corpus coverage. A deliberately changed visual fixture produces a reviewable difference while equivalent captures do not produce an asserted documentation defect. Measure corpus responsiveness before claiming large-scale acceptance. Do not launch another optimization project without agreeing its scope and budget.

Scheduling is a later delivery option. Media recapture remains attended.

### M6: Evaluate reader journeys

* Distinguish a fresh-reader walkthrough of a supplied tutorial from a goal-based evaluation where the agent must discover and use approved documentation.
* Specify the starting environment, allowed sources and tools, goal, expected end state, and assistance policy before running.
* Record completion, friction, unsupported steps, and assistance. A model's prior knowledge cannot be erased, so do not claim a perfectly knowledge-free reader.
* Add outcomes to reporting with explicit denominators: attempted, completed, failed, blocked, and assisted tasks. Do not count blocked tasks as either successful evaluations or confirmed content bugs.

**Acceptance:** One tutorial and one docs-only goal have reproducible setup and independently observable end states. A reviewer can distinguish documentation evidence from agent behavior and environmental limitations.

### M7: Broader maintenance and reference workflows

* Implement cross-article changes as impact plan, approval, bounded edits, and checks for incoming links, redirects, navigation, and terminology consistency.
* Turn competitive, keyword, accessibility, and consistency assessments into evidence-backed proposals tied to reader needs. Do not optimize for exhaustive coverage or unsupported accessibility claims.
* For reference generation, start with one bounded reference type and target build. Establish source coverage, public registration, extension scope, mode, platform, and regeneration policy before emitting an authoritative table.
* Continue treating inventory absence as inconclusive. Never invent a settings CLI export or treat manually supplied build metadata as independent product verification.

**Acceptance:** A fixture refactor updates dependent references without unrelated edits. A gap proposal explains the reader problem. A generated reference can be traced to verified product evidence and regenerated without manual correction. These are separate slices, not one broad maintenance agent.

### M8: Work discovery and follow-up

* Support direct article, issue, PR, and milestone-TPI inputs first. Add queues and filters only where they reduce effort for shipped workflows.
* Preserve work-item status, approved plans, artifacts, and related work. Keep these distinct from finding decisions, host execution state, and live GitHub state.
* Provide drafts and previews for issue proposals, comments, labels, and closures. Require explicit action-specific approval. A multi-step public operation must report partial success and reconcile before retrying.
* Preserve the use cases of completion and optional archive or restore without requiring the old board UI, copying private state, or recreating execution-history navigation.

**Acceptance:** A closed product TPI is not automatically marked documentation-complete. A task can be found through its source context and final artifact. Cancelling a public-action preview makes no GitHub write. Fixture tests cover partial failure without blind retry. Retiring the old canvas requires separate approval.

### O1: Optional extensions and delivery

Choose individual extensions only after their base workflow is accepted:

* Theme variants and broader callouts after M3.
* Localization preparation after a scoped locale policy is agreed.
* Work-item archive and restore after M8.
* Saved manual launchers when a repeated task warrants them.
* Scheduled report-only repo checks or deterministic CI after the permission, cadence, scope, and budget are approved.

None of these options is a hidden prerequisite for the core workflows.

## Decision gates and risks

| Decision or risk | When it matters | Default until decided |
|---|---|---|
| Delivery order | Before starting the next slice. | Finish the approved writing/issue launchers, then choose a bounded acceptance pilot or the next missing capability. Describe that journey and obtain approval before implementation or execution. |
| Editor, viewer, and session integration | Before adding an open/continue action. | Verify supported host capabilities, exact target identity, and behavior in the intended editor. Report unavailable integration and provide an explicit artifact handoff; do not invent deep links or recreate the tool in the canvas. |
| Meaning of workflow implementation complete | Before production article or media rollout. | W1-W8 are the proposed core release boundary, not all 30 scenarios. Each needs the stated end-to-end acceptance and visible supported limits. Production rollout still requires separate authorization. |
| Qualitative evidence and freshness | During M1. | Preserve source references and uncertainty. Do not label model judgments as deterministic verification. |
| Dynamic execution permissions and isolation | Before M4 or M6 execution. | Report unsupported steps. A disposable profile is not a sandbox. Approve the exact fixture, actions, resources, and cleanup policy. |
| Live AI, accounts, extensions, and native UI | Before a scenario needs them. | No live AI or sign-in in the current runner. Human handles native prompts. No implied permission to download dependencies. |
| Blog media policy | Before integrating captured assets into S21. | Keep the existing blog-writer guardrail. Ask before aligning it with doc-writer's human-approved candidate policy. |
| Platforms, locales, and themes | Before expanding the proven baseline. | Claim only evidence from the actual configuration tested. |
| Repository automation and CI | Before creating or enabling an automation. | No new automation. UI remains attended regardless of repo-only scheduling decisions. |
| Corpus performance | Before corpus-scale acceptance in M5. | Keep bounded scopes usable. Set and measure separate render, filter, execution, and verification budgets before optimization. |
| Private state and old workbench retirement | Before replacing an existing experience. | No implicit migration, deletion, archive, or task cancellation. |

## Acceptance and scope maintenance

A component test is not proof that a user scenario is delivered. For every completed slice:

1. Identify the scenario IDs covered and the exact supported scope.
2. Run the smallest relevant existing tests, plus focused regressions for newly introduced behavior. UI workflows need an attended proof when authorized, not only mocks.
3. Verify preserved evidence and decisions, reload behavior where relevant, and cleanup of owned resources.
4. Demonstrate the user-visible result: actionable findings, an approved plan and diff, reviewed media, or a measured reader outcome.
5. Record remaining limits and update both this inventory and the operating guide. Link to checked-in tests or guidance, keeping private evidence and captures outside the repository.

Keep scenario IDs stable. Do not remove a row because it is deferred, combined with another workflow, or absent from the current sprint. Record an explicit decision for any scope reduction. Mark a scenario available only for its verified boundary, and retain unimplemented portions in its status.

At each milestone handoff, state what is complete, what remains, and the next bounded task. Keep one active implementation slice. If a blocker requires a new capability, add only what that slice needs or return for a scope decision. Do not silently turn a pilot into another architecture or performance project.
