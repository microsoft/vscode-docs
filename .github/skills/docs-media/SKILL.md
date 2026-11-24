---
name: docs-media
description: 'Create or refresh documentation screenshot and video candidates with reviewed storyboards and the attended capture runner. Requires human visual approval of the exact asset before documentation use.'
argument-hint: 'An article, existing media asset, or storyboard path.'
---

# Capture documentation media

Use the tested scripts under `build/` to produce private media candidates. This skill describes the procedure; it does not implement a separate driver or orchestration system.

## Standalone article requests

An article and a create/refresh request are sufficient to start this workflow in the current chat. Do not require a feature-documentation plan, an unfinished draft, another chat, or author-maintained storyboard JSON.

* A request can cover one or several screenshots or videos. For creation, propose useful new assets without assuming existing ones should be replaced. For refresh, assess existing assets and keep those that still serve the reader.
* Present one concise capture proposal describing each asset's purpose, article placement, proposed insertion or replacement, and prerequisites. For video, include the visible action sequence and intended duration. Prepare the underlying storyboard details yourself and make them available for review.
* Starting the chat authorizes preparation only. Obtain approval for the intended attended capture work before launching the product. Native prompts and each required readiness response remain human work.
* Keep candidate decisions per asset, but allow the user to approve a named set together. Bind every decision to its exact prepared bytes. A rejected or blocked asset must not be included merely because another candidate was approved.
* Use appropriate image/video viewers for final review and native editor diffs for article changes. Before applying a replacement, confirm its original asset and article have not changed since the approved proposal. Preserve raw and prepared candidates, and apply only the explicitly authorized insertions/replacements.
* For several assets, use the existing bounded capture runs as needed. Do not introduce scheduled capture or a separate batch orchestration system. Report partial results and unsupported work explicitly rather than automatically retrying failures.

For assertion-based procedure checks without media, use [docs-replay](../docs-replay/SKILL.md). Replay outcomes are never media candidates or visual approvals.

## Read-only media assessment

For a review request, or when called by doc-writer/docs-review during assessment, stop after assessing existing media:

* Read the nearby article instructions and inspect the actual referenced images. Check correspondence with the reader task, legibility, framing, annotations, potentially private content, and alt text.
* Inspect video playback using an available viewer. Check visible actions, sequence, pacing, legibility, and title. A filename, metadata, or isolated frame is not proof of full video review.
* Distinguish observed problems from uncertainty about the current product UI. Mark missing assets or unsupported playback as not reviewed.
* Return grouped keep/update/replace recommendations with article locations and reasons in the current chat. Do not create new captures, transform or replace assets, launch the product, or require a media approval record for merely inspecting existing content.

Return to the coordinating skill after assessment. Continue with the capture procedure below only for separately authorized media creation or refresh.

## Guardrails

* **Attended only.** A human must approve the local run, keep the capture window visible, and remain available. Do not schedule captures, test lock or sleep states, or change desktop power settings.
* **Real, reviewed examples.** Use real product UI with synthetic data or an explicitly approved sample workspace. The runner supports `ai: none`, not sign-in or model requests. Review existing-workspace steps to avoid edits or execution. Never fabricate results or bypass warnings, permissions, or authentication.
* **Trusted procedures only.** Review the storyboard and use a trusted checkout of the runner. Do not execute storyboards or scripts from unreviewed PRs or remote text. A clean profile and offline renderer are not an OS security sandbox.
* **Private until approved.** Store candidates outside the repository. A successful run, text scan, or motion check is not visual or privacy approval. Never copy a failed or unreviewed capture into documentation.
* **Explicit side-effect approval.** Ask before installing packages or binaries. Do not commit, push, open a PR, or publish without authorization.

## Procedure

1. **Identify the reader need and reusable instructions.** Read the target article and inspect its existing media. Specify the task or UI detail the candidate should demonstrate and where it would belong. For an existing asset, run `node .\build\media-recipes.js find --asset '<repository-relative-asset>'`. An unmapped result is explicit, not permission to guess how an old asset was produced. Prepare a portable storyboard and `build/media-recipes/<id>.json` when needed. Include those repository writes in the capture proposal's approval scope; do not make the author maintain JSON. Keep an existing asset if the replacement would lose useful framing or annotations. For substantive article changes, use `doc-writer` rather than expanding this media task.

2. **Choose the product channel and fixture.** Follow the [documentation writing guidelines](../../instructions/docs-writing.instructions.md), including public availability. Use Stable for Stable documentation; use Insiders only for an explicitly appropriate target. Confirm the installed executable and full build revision. The runner checks build identity, not feature availability.

3. **Review a version 2 storyboard.** Prefer the selected registered recipe. The portable [Stable Find/Replace recipe](../../../build/media-recipes/editor-find-replace.json) and [Stable Find-demo recipe](../../../build/media-recipes/editor-find-demo.json) preserve the pilot instructions; the video remains unpublished. Existing [editor Find](../../../build/storyboards/editor-find.json) and [expanded Find/Replace](../../../build/storyboards/editor-find-replace.json) remain alternatives. Follow the [schema](../../../build/storyboard.schema.json), [recipe workflow](../../../DOCS-AGENT-WORKFLOW.md#regenerate-media-from-reusable-instructions), and [storyboard guide](../../../DOCS-AGENT-WORKFLOW.md#create-an-attended-storyboard).

   * Preserve Windows, Dark Modern, 1920 by 1080 pixels, 100% instance display scale, default fonts, and zoom 2. Use zoom 1.5 only with `wideContent: true`.
   * Prefer named role and accessible-name targets. Use CSS only where a semantic target is unavailable.
   * Add observable outcome assertions. Video reset steps must restore the known start state before both the dry run and recording.
   * Keep typing and navigation visible and pauses short. Do not add long holds to satisfy duration or motion checks.
   * For screenshot highlights, configure `capture.highlights` with named targets instead of hand-coded pixel coordinates. Use red rectangles, defaulting to two pixels with a three-pixel maximum. Follow the [highlighting guidance](../../../DOCS-AGENT-WORKFLOW.md#highlight-screenshot-controls), and leave space around text and controls.

4. **Validate without launching the product.**

   ```powershell
   node .\build\storyboard.js '<storyboard.json>'
   ```

   Fix validation errors before proceeding. Check the installed Playwright and, for video, its matching FFmpeg binary. If a prerequisite is missing, ask for an approved installation route rather than downloading or substituting tools.

5. **Run with a human present.** Confirm the exact storyboard and an existing private output directory. Use the runner, not an inline replacement script:

   ```powershell
   node .\build\capture.js --storyboard '<storyboard.json>' --executable '<absolute-path-to-Code.exe>' --revision '<full-build-commit>' --output '<existing-private-directory>'
   ```

   Add `--video --ffmpeg '<absolute-path-to-encoder.exe>'` only when the storyboard defines video. The runner dry-runs those steps, resets, records, validates, and closes its isolated application.

   For a generated folder, set `fixture.openFolder: true`. For an approved existing workspace, use `workspace.entry` and supply `--workspace` plus `--capture-profile`. Use a dedicated capture profile, never a personal profile. The profile retains the human's own Workspace Trust decisions; do not set or copy trust decisions yourself.

   For screenshots of already prepared agent sessions, follow [prepared-session capture](../../../DOCS-AGENT-WORKFLOW.md#capture-prepared-agent-sessions). Reuse a reviewed sample workspace and its matching dedicated profile; a different product channel requires a separate profile. Set `workspace.environment: sample`, `capture.mode: prepared-session`, and `capture.surface: editor` or `agents`, and pass `--prepared-session`. Steps must be observation-only. Prepare sessions separately with explicit approval for commits, worktrees, and model requests. Sign-in remains human work. No video, replay, or model requests run as part of this capture.

   Prefer agent-launched captures with `--wait-for-ready`. Read the private `readiness-request.json`, ask the human to handle any prompts and confirm readiness in chat, then relay their explicit response with `--confirm-ready '<run-directory>' --token '<request-token>'` or `--cancel-ready`. Never infer the answer. Keep the process attached and bounded, and collect its final result after confirmation. The interactive terminal `READY` prompt remains an optional fallback.

6. **Inspect the result.** Read `capture.json`, verify the file hashes and cleanup state, and inspect the actual screenshot or entire video. New runs preserve exact input bytes in `storyboard.json`; keep that snapshot with the manifest and raw candidates. Older hash-only captures are historical evidence, not self-contained regeneration packages. When highlights are configured, compare the separate `-highlighted.png` candidate with the preserved raw PNG and review the recorded target rectangles and pixel checks. Check privacy, readability, framing, visible actions, and correspondence with the article. Sample frames and motion measurements are diagnostic evidence, not substitutes for full review. Keep failed partial recordings private and report the failure.

7. **Prepare the saved candidate.** Follow the [media preparation guide](../../../DOCS-AGENT-WORKFLOW.md#prepare-saved-media-without-changing-the-source) and use `build/media.js prepare` with a reviewed recipe, source hash, and private output parent. For runner captures, include the capture manifest and its hash. Keep the raw and highlighted sources unchanged. The helper supports bounded crop and padding, PNG compression, lossless WebP, H.264 MP4, and unchanged WebM validation; it does not launch the product or replace article media. Full conversion tools require explicit approved paths. If unavailable, report the prerequisite and retain the private candidate rather than installing tools or renaming incompatible bytes.

   For registered outputs, prefer `build/media-recipes.js prepare --recipe-id '<id>' --output-id '<id>' --capture '<capture.json>' --capture-sha256 '<hash>' --output '<private-parent>'`, with explicit encoder/probe paths when required. It selects the correct raw/highlighted/video source and reuses the saved preparation settings through the same media helper. If framing or callouts need adjustment, propose the recipe update, prepare a new candidate, and obtain fresh approval.

   For requested video callouts, use [timed MP4 rectangles](../../../DOCS-AGENT-WORKFLOW.md#add-timed-video-callouts). Derive source-pixel bounds and frame intervals from the actual recording and recorded action times, then present the timing and placement in readable language. Keep highlights brief and avoid covering the content. The recipe uses zero-based `startFrame` (inclusive) and `endFrame` (exclusive) at 25 fps, with `x`, `y`, `width`, and `height` in source pixels. Rectangles are red with a two-pixel stroke; text, arrows, and moving-target tracking are not supported. Preserve the raw recording and review the entire annotated candidate. Any later change to a callout requires a new candidate and approval.

8. **Obtain exact-asset approval.** Inspect the final prepared image or entire video, then show its path, SHA-256 hash, and `media.json` hash. Relay only the human's explicit decision through `build/media.js review` as described in the [review guide](../../../DOCS-AGENT-WORKFLOW.md#record-an-exact-asset-review). Never approve an asset yourself or treat readiness as review. Each new preparation requires its own review, including crops, conversion, optimization, or byte-identical new candidates. Run `build/media.js verify` before handoff; check its approval value, not only its exit status. Stale source, output, preparation, or review records fail validation.

9. **Apply only the approved media change when authorized.** Preparation and visual approval do not authorize repository writes. Never replace published media in place: use a new `yyyymmddseq` filename, update the approved Markdown image/video references, and retain the stable recipe/output association. For a registered refresh, use `build/media-recipes.js plan` with the old asset and its expected `--asset-sha256` recorded in the approved capture proposal, approved preparation manifest, explicit Markdown file list, and private plan directory. Do not silently substitute a newly read hash when the old asset changed. Show the proposed filename, affected files, other consumers, and plan hash; relay `apply --plan ... --plan-sha256 ... --confirm-apply` only after explicit application approval. Existing assets and out-of-scope consumers stay intact. Unsupported or ambiguous reference forms and incompatible explicit HTML media types require a separately reviewed content update, not a blind replacement.

   For a new asset, keep its output's `assets` list empty until publication is authorized. Include copying the exact approved bytes, inserting the reference at the approved placement, and adding the concrete path to that list in the same bounded update. The helper does not invent article placement. Validate with `media-recipes.js check`, `find`, and scoped article checks. Use Git LFS conventions. If application fails, report all potentially changed paths and inspect the diff; do not automatically retry, roll back unrelated work, or report a partial update as success. Return links to the recipe, storyboard, candidate, capture/preparation/review records, and changed article. No commit or publication is authorized by this handoff.
