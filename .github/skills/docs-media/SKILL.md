---
name: docs-media
description: 'Create or refresh documentation screenshot and video candidates with reviewed storyboards and the attended capture runner. Requires human visual approval of the exact asset before documentation use.'
argument-hint: 'An article, existing media asset, or storyboard path.'
---

# Capture documentation media

Use the tested scripts under `build/` to produce private media candidates. This skill describes the procedure; it does not implement a separate driver or orchestration system.

## Guardrails

* **Attended only.** A human must approve the local run, keep the capture window visible, and remain available. Do not schedule captures, test lock or sleep states, or change desktop power settings.
* **Real, synthetic examples.** Use real product UI with synthetic fixture data. The current runner supports `ai: none`, not sign-in, model requests, or existing user projects. Never fabricate results or bypass warnings, permissions, or authentication.
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

6. **Inspect the result.** Read `capture.json`, verify the file hashes and cleanup state, and inspect the actual screenshot or entire video. Check privacy, readability, framing, visible actions, and correspondence with the article. Sample frames and motion measurements are diagnostic evidence, not substitutes for full review. Keep failed partial recordings private and report the failure.

7. **Obtain exact-asset approval.** Show the candidate and identify its path and SHA-256 hash. Record the human's explicit decision in the handoff. Any crop, annotation, conversion, optimization, or recapture changes the asset and requires approval of the resulting bytes. Follow the repository's existing media-format and Git LFS conventions; never rename WebM bytes to an MP4 extension. If approved conversion tools are unavailable, hand off the candidate rather than inserting an incompatible file.

8. **Apply only the approved media change.** After approval, copy the exact approved asset into the article's media directory and update its reference, descriptive alt text or video title. Follow the writing guidelines and validate the affected reference. Return links to the candidate, storyboard, manifest, and changed article, with validation results and remaining limitations. Do not treat this handoff as permission to commit or publish.
