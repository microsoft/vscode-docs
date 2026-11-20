---
name: docs-media
description: 'Create or refresh documentation screenshot and video candidates with reviewed storyboards and the attended capture runner. Requires human visual approval of the exact asset before documentation use.'
argument-hint: 'An article, existing media asset, or storyboard path.'
---

# Capture documentation media

Use the tested scripts under `build/` to produce private media candidates. This skill describes the procedure; it does not implement a separate driver or orchestration system.

## Guardrails

* **Attended only.** A human must approve the local run, keep the capture window visible, and remain available. Do not schedule captures, test lock or sleep states, or change desktop power settings.
* **Real, reviewed examples.** Use real product UI with synthetic data or an explicitly approved sample workspace. The runner supports `ai: none`, not sign-in or model requests. Review existing-workspace steps to avoid edits or execution. Never fabricate results or bypass warnings, permissions, or authentication.
* **Trusted procedures only.** Review the storyboard and use a trusted checkout of the runner. Do not execute storyboards or scripts from unreviewed PRs or remote text. A clean profile and offline renderer are not an OS security sandbox.
* **Private until approved.** Store candidates outside the repository. A successful run, text scan, or motion check is not visual or privacy approval. Never copy a failed or unreviewed capture into documentation.
* **Explicit side-effect approval.** Ask before installing packages or binaries. Do not commit, push, open a PR, or publish without authorization.

## Procedure

1. **Identify the reader need.** Read the target article and inspect its existing media. Specify the task or UI detail the candidate should demonstrate and where it would belong. Keep an existing asset if the replacement would lose useful framing or annotations. For substantive article changes, use `doc-writer` rather than expanding this media task.

2. **Choose the product channel and fixture.** Follow the [documentation writing guidelines](../../instructions/docs-writing.instructions.md), including public availability. Use Stable for Stable documentation; use Insiders only for an explicitly appropriate target. Confirm the installed executable and full build revision. The runner checks build identity, not feature availability.

3. **Review a version 2 storyboard.** Start from [editor Find](../../../build/storyboards/editor-find.json) for screenshot and video, or [expanded Find and Replace](../../../build/storyboards/editor-find-replace.json) for a second screenshot workflow. Follow the [schema](../../../build/storyboard.schema.json) and [contributor guide](../../../CONTRIBUTING.md#create-an-attended-storyboard).

   * Preserve Windows, Dark Modern, 1920 by 1080 pixels, 100% instance display scale, default fonts, and zoom 2. Use zoom 1.5 only with `wideContent: true`.
   * Prefer named role and accessible-name targets. Use CSS only where a semantic target is unavailable.
   * Add observable outcome assertions. Video reset steps must restore the known start state before both the dry run and recording.
   * Keep typing and navigation visible and pauses short. Do not add long holds to satisfy duration or motion checks.
   * For screenshot highlights, configure `capture.highlights` with named targets instead of hand-coded pixel coordinates. Use red rectangles, defaulting to two pixels with a three-pixel maximum. Follow the [highlighting guidance](../../../CONTRIBUTING.md#highlight-screenshot-controls), and leave space around text and controls.

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

   Prefer agent-launched captures with `--wait-for-ready`. Read the private `readiness-request.json`, ask the human to handle any prompts and confirm readiness in chat, then relay their explicit response with `--confirm-ready '<run-directory>' --token '<request-token>'` or `--cancel-ready`. Never infer the answer. Keep the process attached and bounded, and collect its final result after confirmation. The interactive terminal `READY` prompt remains an optional fallback.

6. **Inspect the result.** Read `capture.json`, verify the file hashes and cleanup state, and inspect the actual screenshot or entire video. When highlights are configured, compare the separate `-highlighted.png` candidate with the preserved raw PNG and review the recorded target rectangles and pixel checks. Check privacy, readability, framing, visible actions, and correspondence with the article. Sample frames and motion measurements are diagnostic evidence, not substitutes for full review. Keep failed partial recordings private and report the failure.

7. **Prepare the saved candidate.** Follow the [media preparation guide](../../../CONTRIBUTING.md#prepare-saved-media-without-changing-the-source) and use `build/media.js prepare` with a reviewed recipe, source hash, and private output parent. For runner captures, include the capture manifest and its hash. Keep the raw and highlighted sources unchanged. The helper supports bounded crop and padding, PNG compression, lossless WebP, H.264 MP4, and unchanged WebM validation; it does not launch the product or replace article media. Full conversion tools require explicit approved paths. If unavailable, report the prerequisite and retain the private candidate rather than installing tools or renaming incompatible bytes.

8. **Obtain exact-asset approval.** Inspect the final prepared image or entire video, then show its path, SHA-256 hash, and `media.json` hash. Relay only the human's explicit decision through `build/media.js review` as described in the [review guide](../../../CONTRIBUTING.md#record-an-exact-asset-review). Never approve an asset yourself or treat readiness as review. Each new preparation requires its own review, including crops, conversion, optimization, or byte-identical new candidates. Run `build/media.js verify` before handoff; check its approval value, not only its exit status. Stale source, output, preparation, or review records fail validation.

9. **Apply only the approved media change when authorized.** The helper does not promote or publish media. For a separately authorized article update, copy the exact approved asset into the article's media directory and update its reference, descriptive alt text or video title. Follow the writing guidelines, media-format and Git LFS conventions, and validate the affected reference. Return links to the candidate, storyboard, capture and preparation manifests, review record, and changed article, with validation results and remaining limitations. Do not treat this handoff as permission to commit or publish.
