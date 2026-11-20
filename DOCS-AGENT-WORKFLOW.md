# Docs agent workflow

Use this guide to run agent-assisted documentation checks, retain findings and review decisions, replay reviewed procedures, and prepare media for human approval.

Run commands from the repository root. For general contribution, formatting, and local preview instructions, see [Contributing to VS Code documentation](CONTRIBUTING.md).

* [Agent writing hooks](#agent-writing-hooks)
* [Check documentation claims](#check-documentation-claims)
  * [Check internal links and media](#check-internal-links-and-media)
  * [Check TOCs and sitemap coverage](#check-tocs-and-sitemap-coverage)
  * [Check tryout references](#check-tryout-references)
  * [Choose report output](#choose-report-output)
  * [Check a separate review worktree](#check-a-separate-review-worktree)
  * [Retain audit findings and review decisions](#retain-audit-findings-and-review-decisions)
  * [Add captured product evidence](#add-captured-product-evidence)
* [Capture an editor screenshot candidate](#capture-an-editor-screenshot-candidate)
  * [Replay a reviewed procedure](#replay-a-reviewed-procedure)
  * [Create an attended storyboard](#create-an-attended-storyboard)
  * [Highlight screenshot controls](#highlight-screenshot-controls)
  * [Use an existing workspace with chat confirmation](#use-an-existing-workspace-with-chat-confirmation)
  * [Record an editor video candidate](#record-an-editor-video-candidate)
  * [Prepare saved media without changing the source](#prepare-saved-media-without-changing-the-source)
  * [Record an exact-asset review](#record-an-exact-asset-review)
* [Use the docs workbench](#use-the-docs-workbench)

## Agent writing hooks

The repository's hooks target the Copilot harness used by the CLI and Agents window. They use Node.js to check Markdown edits and remind agents about the writing guidelines, and run only for Copilot's editing tools: `create`, `edit`, `str_replace_editor`, and `apply_patch`. Bash and PowerShell launch the same Node.js hook on their respective platforms. If Node.js is unavailable or a hook fails, the hook reports a warning and allows the tool call. A successful check still blocks newly inserted en dashes and em dashes in Markdown.

## Check documentation claims

Run the report-only claim checker to find unknown data variables and feature lifecycle IDs, and collect product references for review:

```powershell
npm run check-claims -- --files docs\agents
```

Without `--files`, the checker scans `docs`, `api`, `remote`, and `release-notes`. It emits JSON and never edits articles. Exit code 1 indicates an invalid variable, lifecycle marker, malformed tryout link, invalid command-ID encoding, or execution error. Product existence and availability claims remain `unverified` and do not fail the run.

### Check internal links and media

Add `--links`, or use `npm run check-links`, to include internal Markdown links, reference-style links, fragments, and media paths:

```powershell
npm run check-links -- --format console --files docs\agents
```

This opt-in check follows local redirects and maps published `/updates/` routes to release notes. It checks Markdown images and HTML anchor, image, audio, video, source, and poster attributes. Code examples and HTML comments are not interpreted as links. External sites are not contacted.

Published `/assets/docs/`, `/assets/api/`, `/assets/learn/`, `/assets/remote/`, and `/assets/updates/` image and video paths are mapped back to source `images` directories. Unsupported asset routes remain unverified rather than being reported as missing local files.

Invalid data variables still produce claim errors. Link analysis for an affected article or target is explicitly marked incomplete or unverified; it does not discard the rest of the report.

Missing relative local targets, fragments in known pages, and media files are errors. Root-relative published routes (including `.md` links) and `code.visualstudio.com` URLs without a local page or repository redirect remain unverified: the website can define additional redirects outside this repository. This also applies to TOC and sitemap target checks. Known website landing routes are accepted without a network request. Generated references, directory routes without a backing page, and fragments that may depend on conditional content or code imports remain unverified. Anchor checks use the website's documentation and API heading conventions, plus in-product release-note anchors. Finding lines identify the enclosing Markdown block, table row, or HTML tag. File existence follows the checkout's filesystem semantics; media contents are not validated or loaded. Findings describe this checkout, not historical releases or server-side redirects absent from the repository.

These checks do not modify articles or redirects. Use the navigation check for TOCs and sitemap coverage. Generated content still requires separate validation.

### Check TOCs and sitemap coverage

Add `--navigation`, or use `npm run check-navigation`, to include navigation diagnostics:

```powershell
npm run check-navigation -- --format console --files docs\agents
```

Navigation checks always cover the repository's Docs, API, and Learn root TOCs, their imported TOCs, and `build/sitemap.xml`. The `--files` option limits article checks, not navigation coverage. Combine `--links` and `--navigation` to run both checks.

* TOC checks validate section and topic structure, resolve data variables, follow nested groups and TOC imports, and check article targets and fragments with the shared link resolver. Missing imports, import cycles, and paths outside the repository are errors. Repeated article links, including secondary navigation shortcuts, are allowed.
* Sitemap checks reuse the standalone sitemap verifier's rules for duplicate URLs, standalone pages missing from the sitemap, and redirecting URLs. Redirecting sitemap entries are warnings; confirmed sitemap problems are errors. Published targets without local evidence remain unverified in the shared report. The standalone verifier still reports them as missing local coverage; neither result proves that a live website URL is broken.

Results use the shared JSON, console, and annotation formats, with locations in the relevant TOC, sitemap, or missing page. Freshness checking includes imported TOCs, navigation targets, and the standalone-page inventory. No navigation files are rewritten, and external sites are not contacted. The existing `node build/verify-sitemap.js --json` command remains available.

### Check tryout references

The checker extracts tryout IDs from `vscode://tryout/<id>`, `vscode-insiders://tryout/<id>`, and `command:workbench.action.onboarding.tryFeature?<encoded-arguments>` links. Command arguments must be a URI-encoded JSON array containing exactly one ID. IDs must start with a letter or digit and contain at most 128 letters, digits, dots, underscores, or hyphens. External tryout links cannot include a nonempty query or fragment. Equivalent links to the same ID produce one finding per article. A bare mention of the command ID does not imply a tryout link. Valid syntax does not verify that a tryout is registered or available.

Examples containing angle-bracket placeholders or template expressions remain unverified instead of producing syntax errors.

### Choose report output

JSON is the default output. Use `--format console` for readable file and line diagnostics, or `--format github` to emit GitHub workflow annotation syntax. Annotation output maps unverified findings to notices, not warnings or errors. These options only write to stdout; they do not enable a workflow, post comments, or publish findings.

```powershell
npm run check-claims -- --format console --files docs\agents
```

Reports use [findings schema version 5](build/findings.schema.json), which records the enabled `checks`. Claim-report freshness checks rerun the same checks; replay freshness checks never launch UI. Version 4 claim reports remain readable, including retained triage state. The checker validates each report before returning it. Findings retain their stable IDs and include the article's SHA-256 hash and `firstSeen` and `lastSeen` timestamps. Each run is a new observation: both timestamps equal `generatedAt`, and review status starts as `open`. The checker does not persist triage decisions or merge observation history.

The report's `inputHash` covers the enabled checks, scan scope, all scanned article contents (including articles with no findings), resolved data variables, and lifecycle data. Link and navigation checks also cover their dependencies: linked Markdown contents, redirect files, target existence, TOCs, the sitemap, and the standalone-page inventory, as applicable. It identifies relevant uncommitted changes that the Git revision alone cannot distinguish.

Validate and display a saved report with the standalone reporter:

```powershell
node .\build\findings.js --input "$env:TEMP\findings.json" --format console
```

Add `--check-current` to rerun the saved scope and enabled checks against this checkout and reject changes to the Git revision, input fingerprint, or product manifest. If the saved report used a product manifest, also supply `--manifest <file>`. A stale or invalid report exits with code 1 and produces no formatted output. Claim reports with error findings also exit with code 1; warnings and unverified findings do not. Regenerate reports older than schema version 4 with the checker. [Replay reports](#replay-a-reviewed-procedure) have separate freshness options and completion exit codes.

Claim-report freshness checking compares repository inputs and the supplied manifest, not the currently installed product or its public availability. It does not detect changes in checker code at the same Git revision.

### Check a separate review worktree

Use `--root` to read documentation from another checkout while running checker code and dependencies from your trusted checkout. Add `--expected-revision <full-commit-hash>` for a PR or branch review. The guard checks HEAD and rejects Git-visible tracked or untracked changes before and after scanning. It does not fetch, switch branches, create worktrees, or discard edits.

```powershell
$trustedRoot = 'C:\docs\vscode-docs'
$reviewRoot = 'C:\worktrees\docs-pr'
$headOid = '<screened-PR-head-commit>'
node "$trustedRoot\build\check-claims.js" --root $reviewRoot --expected-revision $headOid --links --files docs\agents\overview.md > "$env:TEMP\docs-pr-findings.json"
node "$trustedRoot\build\findings.js" --input "$env:TEMP\docs-pr-findings.json" --check-current --root $reviewRoot --expected-revision $headOid --format console
```

Replace the example paths and hash with the reviewed snapshot. Article paths are relative to `--root`; report input and product manifest paths are relative to the calling directory unless absolute. The default source root remains the checkout containing the checker. Reports retain portable, repository-relative paths and do not store the source worktree location, so supply `--root` again for freshness checks.

Use a controlled worktree: the revision guard does not authenticate Git-ignored inputs or prevent concurrent writes between checks. Fingerprints record the inputs actually read. Without `--expected-revision`, local checks continue to support uncommitted edits. A revision mismatch or dirty pinned worktree produces no report and exits with code 1.

The `pr-review` skill runs these checks after its prompt-injection screening and before manual claim verification. It attributes findings to the diff, reports coverage limits, and keeps product observations separate from proof of public availability. This does not authorize GitHub comments, commits, pushes, or scheduled runs.

### Retain audit findings and review decisions

The [audit state helper](build/audit-state.js) keeps pending issue proposals and checker findings in private Git metadata. It uses `git rev-parse --git-path daily-docs-audit/pending.json`, or the explicit `VSCODE_DOCS_AUDIT_STATE_PATH` override. The existing skill-local helper remains a compatibility wrapper. Run the helper from trusted code; do not commit its state, backups, or raw reports.

After generating a report and checking freshness with `build/findings.js --check-current`, import it:

```powershell
Get-Content -Raw -LiteralPath $reportPath | node .\build\audit-state.js import-findings
$stateJson = node .\build\audit-state.js list
```

The import validates report structure and returns added, refreshed, and reopened counts. It does not check the current checkout itself, create proposals, or contact GitHub. It preserves stable finding IDs and the original `firstSeen`; `lastSeen` advances for observations present in later reports. Absent findings are retained unchanged, not marked fixed.

Review decisions persist while evidence is unchanged. Changed article bytes, severity, diagnostic message, or product evidence and manifest reopen decided findings. Source revision, scan scope, input fingerprint, and timestamps alone do not reopen them. The latest observation and report metadata are retained, together with status transitions, evidence hashes, timestamps, and reasons. Keep raw reports separately if you need every prior observation's contents.

For an explicit review decision, pass `id`, the current record's `evidenceHash`, a `status` (`open`, `accepted`, `dismissed`, or `fixed`), and a nonempty `reason` as JSON on standard input to `node .\build\audit-state.js triage`. Changed evidence rejects a stale decision. Triage is local state only; it does not authorize content changes or issue creation.

Pending proposals can include optional `findingIds` referencing imported findings. Existing proposal IDs, source PR markers, deduplication rules, and per-issue confirmation requirements remain unchanged. Removing a proposal retains its findings and history.

Version 1 state is read without modification. The first successful mutation creates an exact `.v1.bak` backup and writes version 2. Corrupt state, unsupported versions, conflicting backups, older observations, and concurrent writers fail explicitly. Writes use an exclusive `.lock` and atomic replacement. Do not remove a lock until you have established that its writer is no longer active; the helper never clears locks automatically.

Run the state migration and persistence tests with `npm run test:audit-state`. These tests use temporary state, not your pending proposals.

### Add captured product evidence

The checker can attach settings and keybinding evidence from a particular product build. Capture both the editor and the Agents window, using the same build and intended extension set:

* **Settings:** In each window, run **Preferences: Open Default Settings (JSON)** from the Command Palette (`workbench.action.openRawDefaultSettings`). Save the entire generated document as a separate JSONC file. Do not use user or workspace settings files. There is no CLI settings export.
* **Keybindings and commands:** On Insiders, run the `--export-default-keybindings <output-directory>` CLI option once for the editor and once with `--agents`, using separate output directories. Keep the raw `doc.keybindings.win.json`, `doc.keybindings.osx.json`, and `doc.keybindings.linux.json` files, including their trailing `// Here are other available commands:` lists. Do not use the cleaned files, which omit conditions, arguments, and these command lists.

Use an isolated local profile and record the product channel, version, full build revision, and capture platform. Settings captures describe only the platform and registered extensions in that window. Keep raw captures, capture descriptions, manifests, and reports outside the repository.

Create a capture description beside the captured files. For example, a Windows settings-only description has this shape; replace the version and revision placeholders with the captured build's values:

```json
{
  "schemaVersion": 1,
  "product": {
    "channel": "insiders",
    "version": "<version>",
    "revision": "<full-build-revision>"
  },
  "sources": [
    {
      "kind": "settings",
      "mode": "editor",
      "platform": "win",
      "file": "editor-default-settings.jsonc"
    },
    {
      "kind": "settings",
      "mode": "agents",
      "platform": "win",
      "file": "agents-default-settings.jsonc"
    }
  ]
}
```

For keybinding captures, add sources with `"kind": "keybindings"` and the appropriate file, mode, and platform (`win`, `osx`, or `linux`). Each kind and platform requires both window modes. File paths are relative to the capture description.

Generate a manifest, then pass it to the checker with an explicit matching channel. This PowerShell 7 example uses an existing capture directory under your temporary directory:

```powershell
$capture = Join-Path $env:TEMP 'vscode-docs-capture'
node .\build\product-manifest.js --input "$capture\capture.json" > "$capture\manifest.json"
node .\build\check-claims.js --channel insiders --manifest "$capture\manifest.json" --files docs\agents > "$capture\findings.json"
```

The manifest preserves defaults, keybinding conditions and arguments, unbound command IDs and their capture line numbers, mode, platform, and hashes of the raw captures. The report identifies the manifest by its hash and records the supplied product build. Build metadata is supplied by the person capturing the files, not inferred or independently verified.

Command evidence comes from bound commands and the exported trailing command lists. This is a partial inventory: the exporter filters some commands, including unbound IDs prefixed with `_` or `vscode.` and some commands that take arguments. It does not evaluate every command's context or prove public availability. Existing manifests without command lists still provide evidence from their keybindings; regenerate them from raw exports to include unbound commands.

Product findings include `productEvidence.status`:

* `observed`: The setting ID, default keybinding, or command ID appears in a capture. Matches reference a source in `productManifest.sources` and retain its default value, binding, or unbound `command` and capture `line`.
* `not-observed`: Captures cover this kind of reference, but do not contain the ID.
* `not-covered`: No capture covers this kind of reference. Tryout registrations are not captured by these exports.

All three remain `unverified`: presence does not establish public availability or validate surrounding prose, suggested setting values, or applicability to another mode or platform. Absence can reflect missing extensions, conditional registrations, or a different release rather than an invalid reference. Captures can become stale; recapture for the build you intend to check, especially when reviewing older release notes.

Run the focused tests with `npm run test:claims`.

Run link and navigation tests with `npm run test:links` and `npm run test:navigation`.

## Capture an editor screenshot candidate

The attended capture runner uses an installed VS Code executable and a version-controlled storyboard. The default [editor Find storyboard](build/storyboards/editor-find.json) targets Insiders. Each storyboard declares its channel, generated fixture or reviewed workspace entry, UI targets, actions, and expected outcomes. The runner supports bounded editor workflows without sign-in or AI requests, not arbitrary scripts or native UI automation.

Screenshot and video capture is attended-only. Keep the capture window visible and remain available throughout the run. Unattended media capture, scheduled capture jobs, and lock-screen or sleep-state testing are out of scope.

The pilot baseline is Windows, Dark Modern, a 1920 by 1080 pixel capture, 100% instance display scale, default fonts, and `window.zoomLevel: 2` (about 144%) for readability. For wide content, set `profile.wideContent: true` and `profile.zoomLevel: 1.5` (about 131%) in the storyboard. The runner requires this explicit exception rather than guessing content width.

Window zoom reduces the CSS viewport to about 1333 by 750 at level 2, or 1461 by 822 at level 1.5, while the saved image remains 1920 by 1080. The runner verifies display scale and window zoom separately; it does not change Windows display settings. Raw output must go to an existing private directory outside the repository and its ancestors.

After approving the local run, use PowerShell with the installed executable and the full build commit from **Help > About**:

```powershell
node .\build\capture.js --executable '<absolute-path-to-Code-Insiders.exe>' --revision '<full-build-commit>' --output '<existing-private-capture-directory>'
```

The runner creates a new run directory, isolated user-data and extension directories, a separate Copilot home, and the storyboard's synthetic file. The default workflow searches for `total` with case matching and requires three matches. The runner verifies the product revision and channel, theme, viewport dimensions, scale, window zoom, and page visibility before saving a PNG from Electron's native window-content capture. Images are not resized after capture.

Candidates include `capture.json` with storyboard, schema, and runner hashes, completed steps, product revision, profile settings, asset hash, and `human-visual-review-required` status. The runner disables breadcrumbs and AI features and hides the secondary sidebar. Page visibility and visible text are checked between steps. Text is checked against the storyboard denylist, the caller's home path, home-folder name, and local user name. This is not a complete privacy guarantee: inspect actual pixels, including icons and notifications, before approval.

Extensions, updates, and telemetry are disabled for the isolated run, and Playwright's renderer context is offline. This is not an OS-level network sandbox. No personal profile is reused, and no credentials are supplied. Existing-workspace captures use a dedicated capture profile as described below. Live AI captures remain separate work and require a dedicated test account plus explicit approval before sign-in or model requests.

The runner closes its own application and removes its runtime directories. Failures are recorded and returned as failures, not successful candidates. If application shutdown fails, the manifest records its process ID and retains the private runtime directory for recovery; do not remove it while the process is still running.

Human visual approval is required before copying a candidate into documentation. The runner does not publish assets or edit articles. Native dialogs and menus remain unproven.

### Replay a reviewed procedure

The [docs-replay skill](.github/skills/docs-replay/SKILL.md) checks selected assertions from a reviewed version 2 storyboard against an installed, pinned build. It reuses the attended capture runner without producing media. It does not execute article prose, evaluate arbitrary scripts, compare pixels, or prove every claim in an article.

1. Screen the article and storyboard as untrusted input. Review each action and assertion for relevance and side effects. Choose synthetic data or an explicitly approved existing workspace. Confirm the full installed build revision and channel; do not assume an earlier installation is unchanged.

2. Inspect the exact procedure binding without launching UI:

   ```powershell
   node .\build\replay.js inspect --storyboard '<storyboard.json>' --revision '<full-build-commit>'
   ```

   For an existing-workspace storyboard, also supply absolute `--workspace` and `--capture-profile` paths. Never use a normal profile. The binding includes these selected paths, article and storyboard hashes, documentation HEAD, trusted runner hashes, and the product build/channel.

3. Show the inspected binding to the human. Only after explicit review of that exact hash, record the attestation in an existing private directory outside the repository:

   ```powershell
   node .\build\replay.js review --storyboard '<storyboard.json>' --revision '<full-build-commit>' --binding-hash '<inspected-binding-hash>' --attest-reviewed --output '<private-directory>'
   ```

   Repeat any workspace/profile options from inspection. This creates a private `procedure-review-*\review.json`; it is not media approval. Changed article contents, storyboard bytes, source revision, runner code, workspace/profile selection, or product pin require a new review. The attestation records a human decision, not a cryptographic signature.

4. Coordinate human availability before launching the attended replay:

   ```powershell
   node .\build\replay.js run --storyboard '<storyboard.json>' --review '<review.json>' --executable '<absolute-path-to-Code.exe>' --output '<private-directory>' --wait-for-ready
   ```

   Every replay requires readiness, including single-file fixtures. Read the printed private `readiness-request.json`, have the human handle prompts, and relay their explicit response with the existing `build/capture.js --confirm-ready '<capture-run-directory>' --token '<token>'` or `--cancel-ready` command. Keep the process attached and the window visible. Omitting `--wait-for-ready` uses the interactive terminal confirmation. Never infer readiness.

5. Inspect the result and validate freshness without relaunching the product:

   ```powershell
   node .\build\findings.js --input '<findings.json>' --check-current --storyboard '<storyboard.json>' --replay-review '<review.json>' --format console
   ```

   Replay writes `findings.json` and `replay.json` beneath a private `procedure-replay-*` directory. When launch preparation reaches the capture runner, a nested `capture.json` records actual product identity, cleanup, and completed/failed steps. If that manifest cannot be saved, replay records `environment/capture-manifest-write-failed` and preserves its in-memory state in `replay.json` as `captureState`, without a reference to the missing manifest. If the parent output is also unwritable, the command fails explicitly; partial files might remain.

   Reports bind the private evidence hashes. Offline freshness verifies the reviewed inputs and saved evidence, not a subsequently updated installation, current workspace contents, or a new UI observation. The `inspect` command does not probe the installed executable. To cover a new build, independently confirm its revision and channel, inspect and review the new binding, and coordinate another attended run. Freshness checking never silently reruns a procedure. Use the existing [audit import and triage commands](#retain-audit-findings-and-review-decisions) after this check. Do not discard a valid mismatch/incomplete report because its exit code is nonzero.

Replay reports use `checks: ["replay"]`, separate from claim checks. `replay.status` is `passed`, `mismatch`, or `incomplete`. Both replay and saved-report commands return 0 for passed assertions, 1 for a mismatch, and 2 for incomplete replay. Invalid replay command inputs or stale procedure reviews exit 2 without launching; the standalone reporter retains exit 1 for invalid or stale saved reports. Unavailable output/report inputs can prevent report creation and are explicit command failures, not successful runs.

* **Mismatch:** A unique visible assertion target contradicts the expected text or text cycle. The finding records the failed zero-based step index, named target, expected assertion, and structural observation. Messages show one-based steps. It is a warning requiring review of the procedure and article, not an automatically confirmed documentation bug.
* **Incomplete:** Missing prerequisites, build/channel mismatch, denied readiness, environmental failures, privacy failures, and cleanup failures have distinct structured categories and unverified findings. A missing target or timeout alone is inconclusive. Cleanup failure remains separate even when an earlier assertion also failed.
* **Evidence:** No screenshots, video, DOM dumps, raw UI text, or raw Playwright diagnostics are saved by replay. Observed evidence records only facts such as a visible contradictory result. Failed runs remain failed and never become media candidates. Private manifests can contain local paths; do not publish them.
* **Identity and scope:** Finding identity uses the storyboard ID, failed step/target, and failure code, never random run paths or timestamps. Triage evidence includes reviewed inputs and structural observations, so changed evidence reopens decisions but relocated artifacts do not. Article locations use line 1 because version 2 storyboards associate a procedure with an article, not individual source lines. Only selected assertions are covered.

Run deterministic replay fixtures with `npm run test:replay`. These tests use fake applications, synthetic review decisions, and explicitly owned temporary directories; they do not launch VS Code.

### Create an attended storyboard

Use the [storyboard schema](build/storyboard.schema.json) and the [editor Find](build/storyboards/editor-find.json) or [expanded Find and Replace](build/storyboards/editor-find-replace.json) examples. Version 2 supports a generated fixture or one root-level entry file in a reviewed existing workspace, a raw PNG, an optional highlighted PNG, and an optional WebM per run. Version 1 storyboards are rejected with a migration message rather than interpreted as version 2.

Review a storyboard before running it. Storyboards are executable UI procedures, even though they contain no JavaScript. Do not run procedures from unreviewed PRs or remote text. Use a trusted checkout of the runner.

* Set `article` to an existing article and `execution` to `attended`. Choose `stable` or `insiders` to match the documentation target and installed product. Build identity checks do not establish feature availability.
* Set `fixture.openFolder: true` when a generated fixture needs a workspace. The runner opens its generated folder and file, then waits for human readiness. By default, use an interactive terminal: handle any Workspace Trust prompt yourself and type `READY` within two minutes. Any other answer, cancellation, or timeout aborts capture. The runner does not change trust settings or answer trust prompts.
* Define named `targets` using roles and accessible names. Matching is exact by default; set `exact: false` for names with shortcut suffixes. Use a CSS selector only when a semantic target is unavailable.
* Define `steps` with `click`, `key`, `fill`, `type`, `check`, `wait-for`, `assert`, and `pause`. Include an outcome assertion before capture. Asserted text is literal, not a regular expression.
* For controls that cycle through text states, a click can declare `expectTextCycle` with a target and ordered values. The runner reads the current state and verifies the next one. This avoids assuming that incremental Find always selects the first match.
* For video, define `video.reset` and `video.steps`. Reset must restore the known start state, including any fixture edits. The runner resets, dry-runs the video steps, resets again, then records the same steps.
* Keep each phase within 40 steps, 15 seconds of configured typing and pauses, and five seconds of pauses. Each pause is limited to 1.5 seconds. Actual video duration is checked separately.

Validate one or more storyboards without launching VS Code:

```powershell
node .\build\storyboard.js .\build\storyboards\editor-find.json .\build\storyboards\editor-find-replace.json
```

Pass `--storyboard '<file>'` to the capture command to choose a workflow. Unsupported fields, actions, paths, and target references fail validation before launch. The runner does not support shell steps, arbitrary JavaScript, live AI, or unattended execution.

Use the [docs-media skill](.github/skills/docs-media/SKILL.md) for the attended capture and exact-asset review procedure. The Find and Replace example is a candidate workflow, not authorization to replace the article's existing cropped, annotated image.

### Highlight screenshot controls

Add `capture.highlights` to draw red rectangles around named storyboard targets. This is optional and applies only to the screenshot, not the video. For example, the [debug-configuration storyboard](build/storyboards/debug-create-configuration.json) sets `capture.highlights` to:

```json
{
  "strokeWidth": 2,
  "targets": [
    {"target": "createConfiguration", "padding": 8},
    {"target": "picker", "padding": -4}
  ]
}
```

Rectangles are opaque red (`#FF0000`). Stroke width defaults to two pixels and must be an integer from one to three. Width and padding are output-image pixels, not CSS pixels, so editor zoom does not make the stroke thicker. Padding defaults to six pixels; a negative value insets the rectangle, which can help frame a container near the window edge. Leave enough space around text and controls, and do not obscure their content.

The runner measures the live target bounds and converts them using the verified display scale and zoom. Missing, clipped, too-small, or moving targets fail capture rather than being skipped or silently clamped. Use assertions and waits to settle the UI before capturing.

The raw PNG remains unchanged. A separate `-highlighted.png` candidate is saved without resizing, and `capture.json` records its source hash, target rectangles, color, stroke width, renderer hash, and pixel-verification results. Encoding is checked against the expected bitmap, including every pixel outside the rectangle borders. No decorations are inserted into the running application.

Review the raw and highlighted images before choosing an asset. If you crop afterward, preserve the complete rectangles and comfortable margins. The exact final annotated or cropped bytes still require human approval before documentation use; the runner never replaces an article image automatically.

### Use an existing workspace with chat confirmation

The [debug-configuration picker storyboard](build/storyboards/debug-create-configuration.json) uses `workspace.entry` instead of `fixture`. Supply the reviewed folder with `--workspace` and a separate, absolute `--capture-profile` directory whose parent exists. The runner creates a marked profile or reuses one bound to that workspace and channel. It refuses to adopt a nonempty unmarked directory, so never supply your personal VS Code profile.

The dedicated profile retains its own home directory as well as user-data. Workspace Trust uses application-shared storage under that home, so retaining user-data alone is insufficient. Trust only the selected workspace yourself; the runner never copies or writes trust decisions. It disables automatic tasks, MCP access and autostart, Git integration, and automatic TypeScript type acquisition for the capture profile, and rejects conflicting workspace settings. It does not write an entry file into an existing project. Use only reviewed, non-editing UI steps. The entry and known workspace configuration files are hashed before and after the run; detected changes fail capture and are not automatically reverted. This check is not a filesystem sandbox or a complete project-change audit.

Agents can launch the capture with `--wait-for-ready`, keeping terminal commands as an optional manual interface:

```powershell
node .\build\capture.js --storyboard .\build\storyboards\debug-create-configuration.json --executable '<absolute-path-to-Code.exe>' --revision '<full-build-commit>' --output '<existing-private-directory>' --workspace '<reviewed-workspace>' --capture-profile '<dedicated-profile-directory>' --wait-for-ready
```

The runner writes a private `readiness-request.json` and waits up to five minutes. After the human handles any prompts and explicitly confirms readiness in chat, relay that decision with the request's run directory and token:

```powershell
node .\build\capture.js --confirm-ready '<run-directory>' --token '<request-token>'
```

Use `--cancel-ready` instead to relay cancellation. Never infer readiness from an open window or a previous trust decision. Stale, mismatched, or duplicate responses are rejected. Readiness is permission to proceed with capture, not approval of the resulting media.

The capture profile persists after successful shutdown; temporary runtime directories do not. A failed shutdown retains the profile lock and runtime for recovery. Inspect the owning run and application process before removing a stale lock, and never reuse a profile while that application is still running.

### Record an editor video candidate

To record the same synthetic task, add `--video --ffmpeg '<absolute-path-to-encoder.exe>'`. Screenshot-only behavior remains the default. Video capture requires a Playwright build with `page.screencast` and its matching FFmpeg binary. Obtain missing dependencies through an approved source before running the pilot. The runner does not download tools or substitute older cached binaries.

```powershell
node .\build\capture.js --executable '<absolute-path-to-Code-Insiders.exe>' --revision '<full-build-commit>' --output '<existing-private-capture-directory>' --video --ffmpeg '<absolute-path-to-playwright-ffmpeg.exe>'
```

The default video shows opening Find, typing the query, matching case, and moving through all three results. The runner checks visible text between actions and finalizes recording even if an action fails. Failed partial recordings remain private and are marked as failed in `capture.json`.

The video check requires 1920 by 1080 pixels, 25 frames per second, and a duration of four to 30 seconds. It rejects source frames that would need padding or scaling, decodes the complete bounded WebM, and checks every decoded frame's dimensions. A sampled pixel-change check rejects nearly static clips. This heuristic does not establish that the video is useful or free of private information.

Successful runs retain `editor-find.webm`, four full-resolution frames in `video-review`, and video hashes, action timestamps, decoding results, and motion measurements in `capture.json`. Review the entire video, not only the sample frames, before approving the exact asset. Native UI capture remains unproven.

Run `npm run test:capture` for unit tests of isolation, guards, recording failure paths, output validation, and cleanup. Those tests use fake launchers, media headers, and decoders. They do not prove that real Electron screenshot or video capture works.

### Prepare saved media without changing the source

Use [the media helper](build/media.js) after capture to crop, frame, or convert a saved candidate without launching the editor. It never changes source bytes, replaces article media, or updates Markdown. Keep the source, capture manifest, recipes, and candidates in private storage outside the repository. Do not run the in-place `optimize-images.sh` or `optimize-videos.sh` scripts on these candidates.

Save a reusable JSON recipe. Coordinates refer to the source pixels, before padding:

```json
{
  "format": "png",
  "crop": {"x": 0, "y": 0, "width": 1460, "height": 312},
  "padding": {"top": 8, "right": 8, "bottom": 8, "left": 8},
  "background": "#1F1F1F"
}
```

`crop`, `padding`, and `background` are optional. Defaults preserve the full image with no padding and use an opaque `#1F1F1F` background for any added padding. Crops must fit entirely inside the source. Supply all four padding edges, each from zero to 256 pixels. Dimensions are limited to 4096 pixels per side and eight megapixels; media files are limited to 50 MiB. There is no resizing, automatic clipping, trim, frame-rate change, annotation, or audio support. MP4 crop coordinates, crop dimensions, top and left padding, and final dimensions must be even. No rounding is applied.

```powershell
node .\build\media.js prepare --input '<private-source.png>' --sha256 '<source-sha256>' --recipe '<recipe.json>' --output '<existing-private-parent>' --capture '<capture.json>' --capture-sha256 '<capture-manifest-sha256>'
```

For runner captures, supply both capture options to retain storyboard provenance, check successful capture and cleanup, verify source hashes, and reject crops that clip recorded highlight rectangles. Other saved sources can omit both options, but have no capture provenance. Review margins yourself.

Supported operations:

* **PNG to PNG:** Lossless crop, solid padding, and adaptive-filter compression using Node built-ins. Supports noninterlaced, eight-bit RGB and RGBA PNGs from the runner. Palette, grayscale, transparency-key, and animated PNGs fail explicitly. Preparation removes ancillary metadata, preserves retained RGBA pixel values, and verifies the entire encoded bitmap. Review color appearance as well as geometry.
* **PNG to WebP:** The same framing, followed by lossless `libwebp` conversion. Final decoded pixels must match the framed PNG exactly.
* **WebM or MP4 to MP4:** Crop and padding, `libx264` at CRF 25, `yuv420p`, no audio, and fast-start metadata. This reuses the repository optimizer's codec and quality convention without its destructive replacement behavior. Input and output must have one video stream, 25 frames per second, and a duration of four to 30 seconds. Full decoding checks every frame, dimensions, and preserved duration and frame count.
* **WebM to unchanged WebM:** Use `{"format":"webm"}` to preserve the VP9 capture bytes and validate the complete recording for private review or handoff. This is not MP4 conversion or permission to embed WebM in an article.

WebP and video validation buffers concatenated PNG frames from FFmpeg in memory instead of writing frame files. Each decode has a 256 MiB output-buffer budget, a 120-second subprocess timeout, and the existing per-frame size and dimension limits. Every complete PNG is validated. Exceeding the buffer budget, a truncated frame, or trailing partial output fails validation; a valid prefix is never accepted as a complete recording. A compressed source smaller than 50 MiB can still exceed the decoded-output budget.

WebP and MP4 operations require explicit `--ffmpeg '<absolute-path>'` and `--ffprobe '<absolute-path>'` options for approved, full installations with the required codecs. PNG requires neither. Unchanged WebM validation needs only `--ffmpeg`; the matching minimal Playwright build supports it. That minimal build cannot perform these WebP or H.264 conversions. Missing capabilities fail with a prerequisite error; the helper does not install tools, substitute encoders, or rename incompatible bytes.

Each preparation creates a new `media-<id>` directory containing `prepared.<format>` and `media.json`. The manifest records source and final hashes, normalized framing, validation results, tool and implementation hashes, capture provenance when supplied, and byte-size change. Compression does not guarantee a smaller file. Raw and previously approved files remain untouched. Existing outputs are never overwritten.

Preparation errors identify the private run path when available. Failed runs retain a manifest with `status: failed` and any partial candidate for diagnosis when the manifest can be written. Cleanup or finalization failures fail the operation rather than producing a reviewable success. A missing or incomplete manifest is not success. Do not approve failed outputs. Run `npm run test:media` for focused preparation and approval tests. Synthetic conversion tests do not prove an installed encoder works.

### Record an exact-asset review

Inspect the final image or the entire final video. Check privacy, readability, color, framing, preserved highlights, visible actions, and relevance to the article. Share the exact final path, its SHA-256 hash, and the preparation manifest hash from the `prepare` result. Automated validation, sampled frames, capture readiness, and earlier approvals are not human review.

Only after an explicit human decision, record it:

```powershell
node .\build\media.js review --manifest '<media.json>' --manifest-sha256 '<preparation-sha256>' --sha256 '<final-asset-sha256>' --decision approved --reviewer '<human-name>' --evidence '<explicit-human-response-and-context>' --confirm-reviewed
node .\build\media.js verify --manifest '<media.json>'
```

Use `--decision rejected` to record rejection. Add the required media-tool options for WebP or video to both commands. The review command revalidates the final bytes before creating an exclusive `review.json`, bound to both the asset and manifest hashes. It records an attestation, not authenticated identity or permission to publish. Agents must never infer a human decision.

`verify` revalidates the media, source and capture hashes, preparation record, and any review record. It returns `human-visual-review-required`, `approved`, or `rejected`; malformed or stale records fail. A successful exit alone is not approval. There is one immutable decision per candidate. To revise a decision or transform the media again, prepare a new candidate and review it; approvals are never inherited, even for byte-identical new candidates. Keep the sources and manifests available for verification. A separate, authorized article update must use the exact approved bytes and follow Git LFS and media-format conventions. These commands do not copy media into documentation, publish, or commit.

## Use the docs workbench

The workspace-scoped Docs workbench canvas brings together open documentation PRs, documentation issues, release test plan items (TPIs), and private media tasks. It requires a Copilot host that supports SDK canvas extensions, background-agent tasks, and approval dialogs, plus an authenticated `gh` CLI.

Ask Copilot to open the **Docs workbench** canvas. Reload workspace extensions after updating its implementation. The extension does not require a separate SDK installation.

* Use queue navigation, search, and filters to find work. Issue and PR rows show the creator's GitHub handle; select an item for a profile link and more details. Change the milestone explicitly for release TPIs. This queue searches all repositories accessible to your GitHub account with `is:issue milestone:<selected milestone> label:testplan-item`. It excludes only titles containing 'Verification TPI' (case-insensitive), not items with verification or invalid labels. Closed TPIs remain visible because testing completion does not mean documentation is complete.
* Select **Task board** for a combined view of PRs, TPIs from the selected milestone, docs issues, and media tasks. Drag a card into its target status column, or use its **Move to** menu with a keyboard or touch device. Moves save private workflow status only; they do not close GitHub items, start agents, or cancel running work. **Not needed** requires a recorded reason.
* Use board search and **Filters** to narrow cards by source queue, workflow status, label, or GitHub state. Filters do not remove visible status columns, and completed work is included on the board. A moved card can disappear from the results if its new status does not match the current filter.
* Use **Columns** to hide status columns you do not use and **Show all columns** to restore them. These choices are saved privately for your account and workspace. Hiding a column hides its cards on the board without changing task statuses or the queue lists. Hidden statuses remain available in **Move to**, with a hidden-column label.
* Use **Archive completed** on the board or in **History** during your weekly cleanup. Review and confirm the preview of all **Done** and **Not needed** items across queues, regardless of board filters, hidden columns, or milestone. Items with active or uncertain agent work remain active. Archiving does not close or delete anything on GitHub.
* If work changes after the archive preview, or the preview expires, no items are archived. Preview the completed work again before retrying. Older tracked items without saved source titles are listed by their canonical identity.
* Use **History** to search archived work by title, identity, creator, or notes, and filter by source queue or status. Saved metadata, notes, media, and task results remain available even after a source item leaves the pending queues. GitHub state shown from saved metadata is not a live check.
* Select **Restore to active board** to restore an archived item with its previous status. Tracked work remains accessible on the board even if its source item leaves the pending queues. Column visibility choices still apply. Documentation issues and PRs do not need a release assignment to be archived or restored.
* Select **Review PR** for separate technical-accuracy and writing-guidelines findings, or **Plan documentation** for a plan that stops before editing files.
* Review the plan before selecting **Implement approved plan**. Confirm its product channel and local base branch (`main` or `vnext`); implementation uses a separate worktree.
* Use **Actions** for related work, screenshots, recordings, closing-comment drafts, and confirmed issue or PR closures. Close actions apply only to `microsoft/vscode-docs`, require triage permission, and never merge PRs or delete branches.
* Media tasks use real captures. Until the separate desktop recorder is available in this checkout, desktop tasks provide guided capture instructions. Capture tools, private sign-in, and live AI requests require their own approval. Copy completed captures into the task's private media directory, attach them, and inspect the preview before approving them.

GitHub remains authoritative for issue and PR state. Workflow status, links, task results, and raw media are private to the authenticated user and workspace. They are stored under `extension-data\vscode-docs-workbench\` in `COPILOT_HOME`, or `~\.copilot` when that variable is unset. Do not commit this data, capture profiles, or credentials.

Background tasks belong to the host session that started them. Resume that session to continue a task; **Update task results** reads its actual host state. Refresh failures retain cached work and display an error. If a launch has an uncertain outcome, check host task history before resolving the launch blocker or starting again.

Closing comments, optional labels, and closure are separate GitHub operations. If a step fails, inspect the recorded outcome before explicitly retrying the remaining steps. Do not assume that a failed request means nothing changed remotely.

Run the extension's targeted tests with `npm run test:workbench`. No GitHub writes are needed for these tests.

HTTP diagnostics include the request method, path, and status code. Request failures are reported without failing the agent session. Unexpected server failures retain their error severity in the diagnostic text and return an HTTP error to the page. The server handles favicon requests and page readiness checks without reporting an error.
