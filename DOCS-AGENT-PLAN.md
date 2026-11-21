# Docs agent implementation plan

Assessment date: 2026-11-20. Implementation baseline: `0f660576b`.

Current slice: M2 has a live request-to-plan-to-text-draft proof. After separate write approval, the pilot updates one paragraph in the confirmed checkout and branch, saves its diff and checks, and appears in the actual canvas after reload. Checks report no errors or warnings and seven unverified product references. Nothing is staged, committed, or published. Media was not needed for this pilot and continues to use the existing attended workflow. M1 article and section review remain available. PR review stays deferred.

This is the scope inventory and delivery plan for the documentation-agent workflow. It reconciles the original scenario brainstorm, the phased implementation plan, and subsequent decisions. Keep the full inventory even when only one workflow is being implemented.

The delivery order below is proposed, not authorization to execute tasks or change existing approval policies. Use [Docs agent workflow](DOCS-AGENT-WORKFLOW.md) for current operating procedures.

* **Primary persona:** Documentation maintainers and authors who review, write, and maintain VS Code content.
* **Reader intent:** Choose the next useful workflow, understand its prerequisites, and distinguish delivered behavior from supporting infrastructure.
* **Purpose:** Preserve scope and guide bounded implementation through evidence-backed acceptance.

## Assessment

There is enough shared infrastructure to implement author-facing workflows now. Do not start another general infrastructure phase. Existing writing, review, and audit skills remain usable independently of the findings canvas.

The current canvas supports deterministic article checks, reviewed scripted replay, and an accepted whole-article review slice. It is not yet a general PR-review, authoring, media, or article-evaluation interface. Some remaining work is integration, but article-driven execution, visual drift detection, and authoritative reference generation need additional workflow-specific capabilities.

| Foundation | Current evidence | Remaining boundary |
|---|---|---|
| Deterministic checks | [Claims](build/check-claims.js), [links](build/check-links.js), and [navigation](build/check-navigation.js) have validators and tests. Claims and links run from the findings canvas. | Navigation is not included in the canvas check. Syntax and captured IDs do not prove product behavior or availability. |
| Captured product evidence | [Manifest generation](build/product-manifest.js) and [reference analysis](build/product-references.js) retain build, mode, platform, and source hashes. | Inventories are partial. `observed`, `not-observed`, and `not-covered` remain unverified. Tryout registrations and authoritative public availability need separate evidence. |
| Findings and review | [Reports](build/findings.js), [audit decisions](build/audit-findings.js), and the [inbox](.github/extensions/vscode-docs-workbench/article-inbox.mjs) support provenance, deduplication, freshness, filters, and explicit decisions. Version 6 supports [whole-article and section reviews](build/review.js), with a live whole-article pilot and scoped browser tests. | PR selection is deferred by request. Other reserved finding kinds do not constitute implemented evaluation, media-drift, or audit workflows. |
| Host execution | The [workflow adapter](.github/extensions/vscode-docs-workbench/article-workflow.mjs) uses host tasks and guarded private artifacts. Real host execution is verified. | The SDK is experimental and session-scoped. Saved evidence survives a session, but host recovery remains tied to its owner. |
| Attended UI and media | [Capture](build/capture.js), [video](build/capture-video.js), [preparation](build/media.js), and [highlights](build/capture-highlights.js) have tests and bounded live proofs. | Windows, reviewed procedures, and no live AI are the proven baseline. Dedicated profiles are not OS security sandboxes. |
| Scripted replay | The [runner](build/replay.js) and [inbox adapter](.github/extensions/vscode-docs-workbench/article-replay.mjs) passed a real debugger-picker procedure. The final focused replay and audit suite passed 17 tests. | Eight scripted actions passed, not eight article instructions. Script success does not establish that its associated article is correct. |
| Existing author workflows | [PR review](.github/skills/pr-review/SKILL.md), [feature documentation](.github/skills/doc-writer/SKILL.md), [audits](.github/skills/daily-docs-audit/SKILL.md), and [media](.github/skills/docs-media/SKILL.md) define reusable procedures. | Connect them to the new experience rather than duplicating their prompts in JavaScript. Existing skill presence is not integrated-workflow acceptance. |
| Scale | Small scopes and batch checking are usable. Progressive loading separates saved findings from current verification. | Full-corpus rendering, filtering, and verification still miss performance budgets. Further optimization is parked, not silently complete. |

### Decisions already made

* Execution and review are separate. Findings are durable review objects, not a run-history browser. Keep provenance and independent coverage behind the results.
* Preserve useful scenarios from the old workbench, not its implementation or migration compatibility. Existing private state must not be deleted or overwritten without authorization.
* Put reusable logic in tested scripts under `build/`. Keep skills procedural. Use host sessions, tasks, and worktrees rather than another orchestration engine.
* PR review must not check out a PR or execute its contents. Read commit-pinned articles, diffs, and discussion through GitHub as untrusted data. Review changed passages by default, using full articles as context. This does not prohibit host-managed worktrees for separately approved authoring.
* Use a thin, task-centered visual interface. Technical replay belongs under advanced tooling, not as a substitute for **Validate article instructions**.
* Keep separate pages in the **Docs workflow** canvas: **Docs writing** (`/writing`) for requests, plans, approvals, drafts, and media proposals, and **Findings** (`/findings`) for checks, article review, replay, findings, and coverage. Share the existing workflow services and private state, not one combined screen. Give each page its own progress and recovery controls.
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
| S01 | Verify factual and behavioral claims in an article or docs PR, including settings, commands, defaults, shortcuts, and version claims. | Partial: whole-article review has an accepted live pilot. Section review has scoped integration and browser tests. Data-only PR review is deferred by request. | M1 |
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
| S12 | Create or refresh a documentation screenshot. | Partial: capture and exact-asset approval work. Candidate review and authorized article handoff need integration. | M3 |
| S13 | Detect stale media by comparing current product captures with existing assets. | Planned: regeneration and hashes exist, but visual drift detection does not. Text assertions are not pixel comparison. | M5 |
| S14 | Create a short demonstration video with visible actions. | Partial: video capture and validation work. Author-facing selection, preview, and handoff are missing. | M3 |
| S15 | Write descriptive screenshot alt text and video titles. | Partial: guidance and skill procedures exist. Bind the proposed text to the actual candidate and article context. | M3 |
| S16 | Crop, frame, optimize, and convert media without destroying the source. | Available through tested helpers. Integrate these operations into candidate review. | M3 |
| S17 | Produce theme variants where the reader benefits. | Optional: fixed-theme capture is proven, not a multi-theme workflow. | O1 |
| S18 | Add annotated callouts to direct attention. | Available for reviewed red rectangles. Broader annotation styles remain optional. | M3, O1 |
| S19 | Document a feature from an author's request, with optional issue or PR context, from approved plan to reviewed changes. | Partial: planning, separate draft authorization, a scoped text edit, saved diff, and checks have a live proof. Human review and a media-bearing handoff remain separate steps. | M2 |
| S20 | Draft and review release notes from milestone features, issues, and TPIs. | Partial: release-note skills exist. Preserve their distinct channel and milestone rules in the workflow. | M2 |
| S21 | Draft and review a blog announcement from product context. | Partial: blog-writer exists. Its human-only image guardrail still differs from doc-writer's approved-candidate policy. | M2 |
| S22 | Perform cross-article terminology changes, page moves, redirects, and navigation maintenance. | Partial: existing skills and checks help. Multi-file impact planning and acceptance need integration. | M7 |
| S23 | Generate settings and command reference tables from product evidence. | Planned: capture and manifest helpers are not an authoritative reference-generation pipeline. | M7 |
| S24 | Turn docs issues and page feedback into assessed, deduplicated proposed fixes. | Partial: issues and planning flows exist. Feedback-to-fix triage is not integrated in the new experience. | M2 |
| S25 | Identify competitive coverage, keyword, and discoverability gaps for human and AI readers. | Partial: product-alignment guidance exists. Evidence-backed gap proposals need a repeatable workflow. | M7 |
| S26 | Review accessibility, heading structure, descriptions, terminology, and editorial consistency. | Partial: whole-article editorial review is integrated and included in the accepted combined-review pilot. Multi-file maintenance remains. This is not a full accessibility audit. | M1, M7 |
| S27 | Flag locale-dependent instructions, UI strings, and screenshots before localization. | Optional: retain localization preparation as a distinct scenario, not a translation commitment. | O1 |
| S28 | Review coverage, unresolved findings, stale media, and evaluation outcomes in periodic digests. | Partial: current check coverage exists. Combined reporting and evaluation denominators are missing. | M5, M6 |
| S29 | Find and organize work across docs PRs, issues, release TPIs, and media tasks. | Partial: the existing workbench supports queues and a board. Preserve the use case without requiring its layout or state migration. | M8 |
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

Only one milestone should be active at a time unless independent parallel work is explicitly useful. Dependencies below are actual prerequisites, not inferred from row order. Each milestone should ship its smallest useful slice before expanding its corpus or supported environments.

| Milestone | Author-facing outcome | Prerequisites |
|---|---|---|
| M1 | Review an article or docs PR and retain actionable findings. | Existing check, skill, host, and inbox foundation. |
| M2 | Turn a feature or feedback item into an approved plan and reviewed change. Include release-note and blog variants. | M1's available article-review capability, not its deferred PR selection. |
| M3 | Create or refresh media, inspect candidates, approve exact bytes, and prepare an authorized handoff. | Existing capture and preparation foundation. Independent of M1 and M2. |
| M4 | Validate article instructions and selected executable examples. | M1's evidence-backed qualitative results. Additional execution approval for each pilot. |
| M5 | Audit product changes and corpus slices, detect media drift, and produce a coverage digest. | M1 for semantic findings. M3 only for the visual-drift slice. |
| M6 | Evaluate tutorials and docs-only reader goals. | M4's controlled execution and outcome recording. |
| M7 | Maintain content across articles, identify gaps, and generate bounded references. | M1 for assessment. M2 for approved multi-file changes. Reference generation also requires verified product-source coverage. |
| M8 | Organize work and support explicit follow-up across integrated workflows. | At least one completed workflow to drive the design. Integrate additional task types only as they ship. |
| O1 | Add selected theme, annotation, locale, archive, or delivery options. | Explicit prioritization and the relevant accepted workflow. Scheduling also needs its own permission decision. |

### M1: Review documentation

**Article review delivered; PR scope deferred.** Whole-article review now delivers author value using a procedural skill and evidence-bound judgments in the inbox. Section selection is implemented and tested. Hold PR-review implementation until the user resumes it. When resumed, review changed passages using GitHub data without a checkout. The earlier instruction-validation proposal remains M4, not dropped scope or a prerequisite for every other workflow.

1. Accept one article, section, or pinned docs PR as input, plus its intended product channel and review focus.
2. Run applicable deterministic checks first. Reuse the PR-review procedure for source verification and article-review guidance for editorial assessment. Do not execute commands from the article during this review.
3. Add the minimal report and ingestion support for qualitative findings. Record article location, reviewed scope, source revision, product evidence where relevant, explanation, and suggested correction. Distinguish structural errors, supported judgments, and unresolved questions.
4. Reuse existing filtering, decision history, and freshness behavior. Define model-review coverage explicitly rather than labeling the whole article correct because no findings were returned.

**Acceptance:** One bounded real review produces source-located, evidence-backed findings without editing content or writing to GitHub. Fixtures cover valid ingestion, changed evidence, incomplete review, and rejected stale reports. An unchanged dismissal survives re-review. A human inspects the pilot findings for usefulness.

**Do not add:** A generic workflow engine, automatic source-wide inventory, UI execution, automatic fixes, or corpus scheduling.

The PR slice must capture the exact head, diff, complete article context, and relevant discussion as data, screen that content, and reject stale or incomplete evidence. Do not run scripts or install dependencies from the PR. Reuse trusted deterministic checks only where their required inputs are available from the captured snapshot. Missing repository context must be reported as unverified or unavailable, never replaced with checks against an unrelated checkout or silently counted as clean.

### M2: Plan and implement documentation changes

**Approved next slice:** One feature-documentation workflow, from an issue or feature description through plan approval, optional media generation, an authorized draft, and review of the changed articles. Reuse doc-writer, the existing media pipeline, and the available article-review workflow. PR review, release-note and blog variants, and production rollout are not prerequisites for this bounded implementation.

**Keep v1 simple:** Start with the author's request, propose a short plan, discuss adjustments, obtain approval, then draft in the agreed location and run existing checks. Recommend media only when useful and reuse the existing attended capture and exact-asset approval steps. Use conversation for clarifications and plan adjustments initially. Do not add a workflow engine, elaborate task management, revision-comparison UI, or additional dashboards to deliver this first process. Retain those ideas for later refinement rather than making them prerequisites.

The authoring process lives on the dedicated **Docs writing** page, not inside the findings inbox or its task picker. Page navigation must preserve unfinished request text, plan feedback, and findings filters without launching tasks or saving decisions.

Keep the writing layout focused on the current plan or draft and its next action. Use a full-width request field, grouped secondary inputs, concise status summaries, and expandable supporting evidence. An approved plan's original research and notes should not obscure the draft or appear to be its current operational status.

Delivery checkpoints:

* **Planning and decisions:** Verified with seven focused planning tests, selected existing-workflow regressions, and a live plan-and-scope-approval pilot. The approved pilot proposes one paragraph correction and explains why no new media is useful. Approval persists after reload and starts no drafting or capture.
* **Authorized drafting:** Verified with 13 focused tests and a separately approved one-paragraph live edit. The actual canvas displays the saved diff and results after reload. Confirm an existing checkout, named branch, and allowed files, preserve unrelated work, and explicitly reconfirm metadata-only changes. No branch or worktree manager is added.
* **Optional media generation and review:** Pending. Reuse attended capture, preparation, and exact-asset approval. Connect approved bytes and descriptions to the draft without treating plan approval as media permission.
* **Integrated acceptance:** Pending. Demonstrate an authorized draft and reviewed media handoff in a fixture or separately approved pilot, preserving the production-rollout hold.

* Start with one documentation request, optionally supported by a feature issue or feedback item. Reuse doc-writer's research and plan approval, then use an explicitly agreed authoring location for implementation.
* Treat the author's free-form documentation request as a first-class starting point. It can describe the desired output, audience, reader goal, known context, and constraints without any GitHub issue. Optional issue links supplement the request and must not replace it or be assumed complete. Ask for essential missing information as the plan develops.
* Keep assessment, proposed plan, approved plan, diff, and review findings distinct. A source change invalidates the relevant approval or requires an explicit reassessment.
* Include media proposals in the plan: whether a screenshot or video helps, what it should show, and where it belongs. After plan approval, offer optional attended candidate generation through the existing tools. Require human approval of the exact prepared asset before including it in a draft, with appropriate alt text or video title. Unsupported captures stay explicitly pending. Plan approval is not capture readiness or asset approval.
* Reuse the same capture and preparation pipeline as M3. M2 integrates media into feature authoring. M3 remains the independent create-or-refresh-media experience, not a prerequisite for these approved M2 media steps.
* Treat release notes and blogs as separate output variants, using their existing skills and conventions. Do not force them through doc-writer's docs-only scope.
* Add feedback triage with duplicate and relevance checks. Support a justified no-change outcome, not an obligation to edit every reported concern.

**Acceptance:** A synthetic or explicitly approved bounded change follows plan approval to diff and review. Rejected or changed plans do not trigger edits. Media proposals appear in the plan, optional generation preserves raw candidates, and rejected or unapproved assets cannot enter the draft. Unsupported capture remains pending rather than fabricated. Public actions remain separate. Validate the release-note and blog variants before marking S20 or S21 complete.

### M3: Create and refresh media

* Present an article or existing asset as input. Let the agent prepare a readable capture proposal, using reviewed storyboards underneath rather than asking the author to maintain JSON.
* Connect attended readiness, real capture, non-destructive preparation, candidate preview, alt text or title, and exact-byte human approval.
* Show the existing asset alongside its replacement when refreshing media. Preserve both raw and prepared sources.
* Prepare the exact approved asset and corresponding Markdown change for a separately authorized handoff. Approval must not copy, publish, or commit automatically.

**Acceptance:** One screenshot and one short video complete the private candidate-to-review flow. Rejection leaves article assets unchanged. Any transformation requires a new approval. An authorized fixture handoff uses exactly the approved bytes. No production rollout.

### M4: Validate article instructions and examples

* Start with one non-AI article section in an approved disposable fixture. Map article steps and expected outcomes to exact source spans. Keep environment setup separate from documented reader steps.
* Have the agent derive a readable action plan from the article. Screen it and obtain approval before execution. Article text is not permission to run commands, install tools, change accounts, or access services.
* Add bounded observation and action support only where the selected procedure needs it. Existing scripted replay can execute compatible reviewed actions but must not silently repair or replace the article's instructions.
* Record expected and actual outcomes, missing prerequisites, assistance, and unsupported steps. Environment failures and agent failures are not automatically documentation bugs.
* Add terminal commands, task and debug configurations, and extension samples as separately approved execution slices. Do not expand the current replay runner into an arbitrary shell executor. Cross-platform claims require corresponding platform evidence.

**Acceptance:** Follow one actual article procedure, not a pre-authored passing storyboard. Include a controlled faulty-instruction fixture, a successful case, and a blocked-prerequisite case. Findings cite the problematic step. No unapproved downloads, sign-in, model requests, application execution, or changes outside the approved fixture.

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
| Delivery order | Before starting the next milestone. | PR review is deferred by request. Recommend the M2 feature-documentation slice next. M3 remains an independent alternative, and M4 can move earlier if instruction validation is the priority. |
| Meaning of workflow implementation complete | Before production article or media rollout. | Keep rollout deferred. Agree a release boundary explicitly rather than equating one completed milestone, all optional ideas, or all future extensions with completion. |
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
