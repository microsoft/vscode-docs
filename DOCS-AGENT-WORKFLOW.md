# Docs agent workflow

Use this guide for daily documentation writing, revision, media, and accuracy work. The canvas manages and tracks work; the editor, agent conversation, product window, and media viewers provide the appropriate working experience.

Run commands from the repository root. For general contribution, formatting, and local preview instructions, see [Contributing to VS Code documentation](CONTRIBUTING.md).

The [implementation plan](DOCS-AGENT-PLAN.md) defines the eight core workflows, current gaps, and delivery order. The task map below distinguishes today's entry points from the intended experience. Detailed procedures describe implemented behavior unless explicitly labeled as planned.

* [Choose a daily workflow](#choose-a-daily-workflow)
* [Start a documentation-writing chat](#start-a-documentation-writing-chat)
* [Document release TPIs](#document-release-tpis)
* [Review PR accuracy](#review-pr-accuracy)
* [Start a skill-driven review chat](#start-a-skill-driven-review-chat)
* [Start a screenshot or video chat](#start-a-screenshot-or-video-chat)
* [Start a procedure-check chat](#start-a-procedure-check-chat)
* [Target canvas experience](#target-canvas-experience)
* [Use the Docs workflow canvas](#use-the-docs-workflow-canvas)
  * [Saved article-review results](#saved-article-review-results)
  * [Revise the reviewed article](#revise-the-reviewed-article)
  * [Saved documentation plans](#saved-documentation-plans)
  * [Review screenshots before drafting](#review-screenshots-before-drafting)
  * [Prepare an approved draft](#prepare-an-approved-draft)
* [Agent writing hooks](#agent-writing-hooks)
* [Check documentation claims](#check-documentation-claims)
  * [Check internal links and media](#check-internal-links-and-media)
  * [Check TOCs and sitemap coverage](#check-tocs-and-sitemap-coverage)
  * [Check tryout references](#check-tryout-references)
  * [Choose report output](#choose-report-output)
  * [Check a separate review worktree](#check-a-separate-review-worktree)
  * [Retain audit findings and review decisions](#retain-audit-findings-and-review-decisions)
  * [Add captured product evidence](#add-captured-product-evidence)
* [Regenerate media from reusable instructions](#regenerate-media-from-reusable-instructions)
* [Capture an editor screenshot candidate](#capture-an-editor-screenshot-candidate)
  * [Replay a reviewed procedure](#replay-a-reviewed-procedure)
  * [Create an attended storyboard](#create-an-attended-storyboard)
  * [Highlight screenshot controls](#highlight-screenshot-controls)
  * [Use an existing workspace with chat confirmation](#use-an-existing-workspace-with-chat-confirmation)
  * [Record an editor video candidate](#record-an-editor-video-candidate)
  * [Prepare saved media without changing the source](#prepare-saved-media-without-changing-the-source)
  * [Add timed video callouts](#add-timed-video-callouts)
  * [Record an exact-asset review](#record-an-exact-asset-review)
* [Use the docs workbench](#use-the-docs-workbench)

## Choose a daily workflow

The initial planning/drafting checkpoint is `9afaa1905`. The current workflow also includes screenshot handoff, article revisions, native editor actions, and **Review article**.

**Review article is a chat launcher, separate from batch findings.** Use it to continue an interactive task with the relevant skills. Use **Findings** for the batch-like experience: bounded checks, persistent structured results, coverage, filtering, and triage. Both remain first-class; chat output is not automatically imported or treated as resolved findings.

Choose a page from the Docs workflow sidebar. On narrow panels, the page links scroll horizontally above the content. **Saved plans and drafts** remains available separately from new writing requests.

| Task | What you can use today | Remaining handoff |
|---|---|---|
| Write new feature content | Open **Write documentation**, describe the desired content, and [start doc-writer in chat](#start-a-documentation-writing-chat). No existing article or issue is required. | Launcher tests do not prove full new-article creation and navigation; that needs separate end-to-end acceptance. |
| Review and revise an article | Use **Review article** for an interactive skill-driven review and update. Findings retains earlier structured review results, not a competing review launcher. | The author accepted the bounded live review-and-revise pilot as complete and successful. Its automated native-diff inspection limitation remains recorded; native opening is currently Windows VS Code only. |
| Create or refresh screenshots | Open **Screenshots**, select an article and create/refresh, then [start docs-media in chat](#start-a-screenshot-or-video-chat). One request can cover several assets. | A single screenshot refresh and approved disposable-copy handoff are validated. Multi-image acceptance and production use remain separate. |
| Generate short demo videos | Open **Demo videos** and [start docs-media in chat](#start-a-screenshot-or-video-chat) with the article and desired demos. Capture, playback review, and approval happen there. | One annotated MP4 demo and approved disposable-copy insertion are validated. Multi-video acceptance and production use remain separate. |
| Check content accuracy | On **Findings**, choose local claims/links, editorial review, or technical accuracy for a bounded scope. Use **Review article** for interactive assessment. | Review batches support up to five articles. Technical batches share a public release pin and save source-backed agent judgments, not runtime verification. Chat output does not automatically enter the inbox. Local checks do not verify product claims or external URLs. |
| Check article instructions against the actual UI | Choose an article and optional section or task in **Check instructions**, then [review the derived procedure in chat](#start-a-procedure-check-chat). | Bounded non-AI checks reuse the attended runner and a reviewed sample workspace and profile. Source-linked results cover only observed outcomes, not the entire article. Unsupported claims remain explicit. |
| Verify a PR's accuracy | Open **Review PRs**, browse either docs repository or supply a URL, and [start a read-only accuracy review](#review-pr-accuracy) in chat. | Full source-verification acceptance remains a separate pilot. No PR checkout or execution. Deterministic checks require an already available authenticated matching source root; chat results do not automatically enter Findings. |
| Document a GitHub issue or test plan item | Browse **Release TPIs** by release and select **Document**, or paste a direct URL into **Write documentation**. Both continue in the same doc-writer workflow. | A TPI is supporting evidence, not a complete specification or execution permission. Documentation completion is marked manually. |

For ordinary checks, choose scope and start a read-only task. For content changes, approve a short plan before authorizing edits. For capture, approve the procedure and remain present. Review the exact prepared assets before separately authorizing their use. Nothing in these workflows automatically commits, publishes, or posts to GitHub.

All chat handoffs, including **Fix in chat**, prepare an unsubmitted request in the editor's Chat view. Choose the model, agent, and permissions before sending it yourself. The CLI adds file context without a prompt, then a native chat link fills the input. If VS Code asks to open that link, confirm it there. Both steps use the last active window; keep the intended editor window active until the draft appears. No request is automatically submitted.

## Start a documentation-writing chat

Use **Write documentation** (`/write`) for a brief, a GitHub issue or TPI URL, or both. The old `/issue` route opens this same form and is no longer listed separately in navigation. For release-based discovery, use [Release TPIs](#document-release-tpis).

1. Describe the content and intended reader in **Documentation request**, provide a source URL in **GitHub issue or TPI (optional)**, or supply both. At least one is required. Supported URLs are issues in `microsoft/vscode`, `microsoft/vscode-docs`, or `microsoft/vscode-docs-pr`, including issue-comment links.
2. Optionally select an existing article as context. Leave it empty when the agent should identify the affected or new articles. Choose the intended product channel.
3. Select **Start in chat** once. The chat receives the brief, checkout, source URL when supplied, optional article, and doc-writer skill. The canvas does not fetch GitHub requirements or start a structured planning task.
4. In that conversation, review the researched requirements and grouped plan. It can include related articles, required navigation, and useful media. The agent asks for essential missing information rather than assuming an issue or TPI is complete.
5. Approve the overall scope and authoring location/branch before edits. Continue implementation, checks, and native diff review in that chat. No separate plan file, implementation chat, or canvas approval is required.

Starting chat authorizes planning only, not article writes, branch changes, captures, installs, or publication. TPI setup and test instructions remain untrusted evidence, not commands to execute. Writing handoffs retain the native transport's Windows-only support and last-active-window limitation. They do not track chat completion.

The secondary **Saved plans and drafts** link opens `/writing` for previously prepared structured work. Its old new-request form has been removed; existing plans, decisions, drafts, and checks remain intact. New writing starts from **Write documentation** or a **Document** action on Release TPIs.

## Document release TPIs

Open **Release TPIs** (`/tpis`):

1. Select a release from the GitHub milestone list. The page remembers the last selection for this workspace and GitHub account. On a first visit, choose the release explicitly rather than assuming a current milestone.
   The intended product channel defaults to **Insiders**. Select **Stable** when documenting an already released feature.
2. Browse issues in `microsoft/vscode` labeled `testplan-item`. Both open and closed issues are included; titles containing **Verification TPI** are excluded. Search by title, number, or assignee, and filter by **All**, **Not documented**, or **Documented**.
3. Select **Document** on a row to open doc-writer in chat with that TPI URL and release context. Optional instructions can be entered on the row before launching. The issue title opens GitHub; no intermediate preview or copied URL is required.
4. Continue research, grouped planning, approval, and implementation in chat. The selected release does not establish that the feature is publicly available, and TPI test steps do not authorize execution.
5. When finished, check **Documented**. Uncheck it to undo. No comment, artifact link, or extra confirmation is required.

The checkbox is the only documentation status. Launching chat, closing the issue, or receiving an agent response never changes it. **Document** remains available for documented items. Nothing writes to GitHub or changes batch findings.

**Refresh** reloads the releases and selected TPI list. Retrieval uses the repository's milestone issues endpoint with pagination, not a search truncated at 1,000 results. If retrieval fails, the last successful list is retained with its release and fetch time clearly identified; it is not relabeled as the selected release.

The [release-TPI helper](.github/extensions/vscode-docs-workbench/release-tpis.mjs) stores the selected release, last successful list, and documented issue numbers in a private account-scoped file beside the workspace's inbox state. Flags use issue identity rather than milestone/title, so they survive renames and release moves. Legacy workbench records are not read or migrated. Run `npm run test:release-tpis` for the focused checks, with `DOCS_ARTICLE_BROWSER` set to an installed browser for the UI journey.

## Review PR accuracy

Open **Review PRs** (`/prs`):

1. Select `microsoft/vscode-docs` or `microsoft/vscode-docs-pr`. The list includes all open PRs, including drafts, ordered by most recently updated. Search by title, number, or author.
2. Select the intended product channel. Expand a row's **Optional instructions** to narrow the review or identify concerns.
3. Select **Review** to open an interactive pr-review chat. Alternatively, expand **Review a PR by URL** to supply a URL from either repository, including a closed PR.
4. Read the source-backed findings and coverage limitations in that conversation. The review screens untrusted GitHub inputs, records full head and base hashes, reviews changed passages with complete articles as context, and rechecks the revisions before reporting. Suspicious instructions require human confirmation to continue ignoring them.

The list is discovery context, not a pinned review snapshot. **Refresh** retrieves all pages. A failure retains the previous successful list with its original repository, account, and fetch time; a different selected repository is explicitly identified. The provider keeps only this temporary cache, not a persistent PR queue or completion state.

GitHub comment-summary counters can disagree with the available discussion. The review cross-checks fully retrieved REST and GraphQL conversation-comment collections. When their comment IDs agree, the GraphQL total matches, and all returned content is screened, a differing summary count becomes a reported metadata warning, not a blocker. Failed requests, incomplete pagination, unreadable content, and unresolved collection differences still stop the review.

Starting a review does not authorize PR checkout, Git fetch, worktree creation, PR execution, installation, article edits, or GitHub comments and reviews. Trusted deterministic checks can run only against an already available authenticated source root matching the reviewed head. Otherwise, the chat reports them unavailable and continues focused source verification. It must not substitute checks of the current checkout or treat unverified claims as a complete pass.

Results stay in chat rather than automatically entering Findings. Native opening shares the Windows and last-active-window limitations of the other launchers. Check Chat before retrying a failed or timed-out handoff. Run `npm run test:pr-reviews`, with `DOCS_ARTICLE_BROWSER` set to an installed browser for the UI tests. Fixture tests verify retrieval and handoff, not an actual PR's technical accuracy.

## Start a skill-driven review chat

On **Review article** (`/review`):

1. Choose an article and any combination of **Technical accuracy**, **Clarity and grammar**, **Screenshots and videos**, and **Links and references**. Technical and editorial review are selected initially. You can also clear the presets and use only a free-form request.
2. Add any concerns, exclusions, or desired outcomes in **Additional request** and choose the intended product channel.
3. Select **Start review in chat**. The installed Windows VS Code CLI opens the native Chat view with the article and doc-writer skill attached, then a native link prefills the request without submitting it. It uses the last active VS Code window.
4. Choose your chat options and send the request. Doc-writer uses specialized skills as needed, proposes grouped changes in the conversation, and waits for your overall approval before editing. The review can include media and justified changes to related articles. No separate plan file or implementation chat is required.

This launcher does not create a background workflow task or depend on an old task remaining discoverable. Existing reports and decisions remain untouched. It also does not have a chat-session identifier or completion callback: a successful launch means the CLI accepted the request, not that the review completed. Inspect Chat before retrying a failed or timed-out handoff.

Native opening currently requires the Windows VS Code extension host and a CLI supporting `chat --add-file`. Other hosts show an explicit limitation. Starting a review does not authorize documentation edits, captures, UI execution, installs, or publication. Specialized skills retain those boundaries.

The earlier findings-inbox review and structured drafting procedures below remain available; they are not mandatory steps for the chat launcher.

A live one-click proof created a separate interactive chat with the article and skill attached, loaded doc-writer, and returned a handoff acknowledgement without performing a full review or editing files. Run `npm run test:review-chat` for the focused fixture checks; set `DOCS_ARTICLE_BROWSER` to the installed browser path described below to include the browser journey.

A subsequent debug-configuration pilot completed scoped text and screenshot review, Stable-source verification, one grouped update approval, a disposable-copy revision, and trusted local checks. The author accepted that pilot as complete and successful on 22 November 2026. The screenshot and related articles needed no changes, and repository originals remained unchanged. Automated native-diff inspection was blocked by UI interruptions and dispatch failures; that limitation remains in the execution evidence without blocking the author's acceptance.

## Start a screenshot or video chat

The **Screenshots** (`/screenshots`) and **Demo videos** (`/videos`) pages are independent launchers, not steps in feature drafting:

1. Choose an article and select **Create new** or **Refresh existing**. Add a request if useful, such as "refresh the two setup screenshots while preserving their annotations" or "make short demos for setup and navigation." One request can cover several assets.
2. Select the intended product channel, then **Start in chat**. The native chat receives the article, media type, operation, request, and docs-media skill. No feature plan or existing draft is required.
3. In that chat, agree on a concise proposal: what each asset should show, its placement, the insertions/replacements, and prerequisites. The agent handles the storyboard details and asks only for essential missing context.
4. Approve the intended capture work and remain present for the attended run. Handle native prompts and each required readiness response yourself. Starting chat is not capture permission.
5. Inspect the final candidates in appropriate image/video viewers. Approve the exact assets to use and their scoped application before any originals are replaced or article references are changed. The agent runs relevant checks and uses native editor diffs for article changes.

Create requests do not imply replacing existing assets. Refresh requests keep useful existing media rather than replacing everything. Rejected or unsupported assets remain explicit; approval of one candidate does not approve others. Candidates and raw sources stay private until their authorized handoff.

Both pages share the proven native chat transport and its Windows/last-active-window limitations. They neither create batch workflow tasks nor change findings or review decisions. They also do not track chat completion. Check Chat before retrying a failed or timed-out launch.

The focused launcher tests cover both media types, create/refresh choices, multiple-asset requests, failure handling, narrow layouts, and preserved batch state. They do not generate real media or establish full capture-workflow acceptance.

A separate attended Stable pilot validated one Find/Replace screenshot refresh from the launcher through docs-media chat, capture, crop/callout preservation, human approval, and exact-byte replacement in a disposable article copy. Its scoped alt-text/reference checks and native before/after diff passed. The repository originals remained unchanged. This is not a full website build or proof of video, multi-asset, LFS staging, or production publication workflows.

A subsequent Stable video pilot validated a 10.88-second, 1320 by 280 pixel Find demo with timed red rectangles. The human reviewed and approved the entire final MP4; all 272 frames, callout timing, approval hashes, title/reference, disposable-copy insertion, and native diff were checked. An initial cleanup failure stayed failed; recording was repeated only after explicit approval. Raw WebM playback was unsupported in the integrated viewer, while prepared MP4 playback worked. The repository originals and pre-existing changes remained unchanged. This is a single-video proof, not multi-asset or production acceptance.

## Start a procedure-check chat

Open **Check instructions** (`/instructions`) and choose an article. The **Section** list loads its headings with line ranges. Choose a section to include its nested subsections, optionally describe a task or additional focus, and select **Start check in chat**. You can leave **Section** as **Choose scope in chat** to agree on a bounded scope there. If the article changes after section selection, select **Reload sections** and choose again. No author-maintained storyboard is required.

The chat uses docs-replay to derive a readable procedure from the actual article instructions. It separates setup from documented actions and expected outcomes, prepares source-linked declarative checks, and identifies unsupported claims. Existing media storyboards can supply targeting patterns, but are not proof that the instructions work. The agent must not substitute a different path, add a workaround, or force settings to make the article pass.

Reuse a previously reviewed disposable sample workspace and its matching dedicated profile when suitable. Keep their paths, isolated home, and user-data so the human's Workspace Trust decision persists. Each run has separate private evidence. Review the exact procedure and environment, approve attended execution, and explicitly confirm readiness before the runner starts.

Results link each instruction to its expected outcome, observed assertion or visibility evidence, and passed, mismatch, blocked, or not-checked status. Limitations and run or cleanup failures remain explicit. The launcher does not execute UI or publish findings. Results stay in chat and private replay artifacts, not an automatic Findings import. A passing check does not verify the whole article. No screenshots, article edits, or public writes are authorized.

An attended Stable 1.147.0 pilot verified Ctrl+F, searching for three matches without Enter, and forward and backward match navigation. The sample and dedicated profile were retained. Replacement, visual highlighting, and settings persistence were not checked. That pilot used the earlier scripted report format, not the source-map output described below.

A subsequent Stable Source Control quickstart check verified initialization, README review, staging, and unstaging with source-linked expected and observed outcomes. The first attempt stopped before initialization because the welcome button was incorrectly scoped to the repository tree. Its incomplete evidence was preserved, and a separately approved locator correction passed. Postchecks confirmed unchanged sample files, an empty index, zero commits and remotes, released profile ownership, and application shutdown. The status decoration, commit workflow, graph, and publishing were not checked. The initialized repository is retained for later scenarios rather than automatically reset.

## Target canvas experience

This is the revised design, not a description of additional controls already shipped. The eight workflows remain the scope, but they do not all need to happen inside the canvas.

| Where | What belongs there |
|---|---|
| Canvas | Start and track work, show scope/status/blockers, summarize the current plan and results, retain decisions, and offer the next action with links to artifacts. Keep the findings inbox for durable triage. |
| Agent conversation | Describe the request, answer clarifying questions, adjust the plan, and discuss proposed corrections or capture actions. No replacement chat in the canvas. |
| Editor and diff view | Read and edit articles, jump to a finding's line, inspect proposed changes against the correct baseline, and preview rendered Markdown. Do not build an inline editor or diff viewer in the canvas. |
| Image preview and video player | Inspect exact screenshot/video candidates, compare existing and proposed images, and review full-size pixels or playback. The canvas tracks candidate status and approval; a custom gallery/player is not required. |
| Actual VS Code test window | Perform attended capture and article-instruction checks. Keep readiness and result tracking connected to the task without recreating the product UI. |
| GitHub or supported read-only PR views | Inspect issue/TPI discussion and pinned PR changes. Preserve source identity in the task. Never check out or execute PR contents to provide a review view. |

Keep chat launchers separate from **Findings**. **Saved plans and drafts** is secondary access to earlier structured work, not another new-writing entry point. Do not add a work board or claim tracking for chat execution that the host does not expose.

For example, review an article, request its grouped update plan, approve the overall scope and writes once, and open the native editor diff. Return to the same tracked item to recheck or request adjustments. The article, concerns, baseline, and decisions travel with the task. Individual finding selection and per-edit approval are not required.

Opening an editor or preview is not approval. Asset approval must identify the exact prepared bytes even when reviewed outside the canvas. Manual article changes or new media transformations require freshness checks and renewed approval where relevant. Closing a working view must not lose the task or its artifacts.

Native article/line and draft-diff opening are now implemented through the installed Windows VS Code CLI. The editor compares the captured pre-update article with the current file, which can include subsequent edits. The saved inline diff remains completion-time evidence and a fallback for other hosts, not the direction for further UI expansion. A successful CLI request does not mean the user approved or reviewed the diff.

The [next implementation slice](DOCS-AGENT-PLAN.md#proposed-implementation-sequence) combines that editor handoff with review-to-revision tracking. Independent article media follows, using suitable viewers before adding custom preview UI. Article-derived UI checks and data-only PR accuracy remain core work; broader audits, blogs, release notes, and queues remain later work.

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

The [findings schema](build/findings.schema.json) accepts version 4 and 5 checker reports and version 6 agent-review reports, recording the enabled `checks`. Claim-report freshness checks rerun the same checks. Replay freshness never launches UI, and review freshness never reruns an agent. Retained checker triage remains readable. The checker validates each report before returning it. Findings retain their stable IDs and include the article's SHA-256 hash and `firstSeen` and `lastSeen` timestamps. Each run is a new observation: both timestamps equal `generatedAt`, and review status starts as `open`. The checker does not persist triage decisions or merge observation history.

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

Review decisions persist while evidence is unchanged. Changed article bytes, severity, diagnostic message, or product evidence and manifest reopen decided findings. Source revision, scan scope, input fingerprint, and timestamps alone do not reopen them. The findings canvas also supplies verified per-article absence to the shared audit helper: if a fixed finding reappears after that verification, it reopens even when the evidence is identical. This automatic `finding-reappeared` history event references the intervening verification and is distinct from human triage. Ordinary report imports do not infer verified absence. The latest observation and report metadata are retained, together with status transitions, evidence hashes, timestamps, and reasons. Keep raw reports separately if you need every prior observation's contents.

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

## Regenerate media from reusable instructions

The [media recipe helper](build/media-recipes.js) associates published asset paths with portable instructions under [build/media-recipes](build/media-recipes). The agent maintains these files as part of approved media work, not a separate registry UI or spreadsheet.

Each recipe has a stable `id`, a version 2 `storyboard` path, and named `outputs`. An output contains:

* `id`: stable identity within its recipe.
* `base`: repository-relative directory and unversioned filename stem.
* `source`: `screenshot`, `highlighted`, or `video` from the capture manifest.
* `prepare`: the existing media preparation settings, including crop, padding, format, or timed callouts.
* `assets`: explicit published paths owned by this output. Keep previous versions here so historical references still resolve to the recipe. An empty list means the output is unpublished, not a missing or guessed media association.

Do not store machine-specific executable paths, accounts, credentials, capture profiles, readiness tokens, generated candidates, or approval records in these files. Existing-workspace prerequisites remain separately reviewed inputs. Recipe lookup never launches the product, grants capture permission, or approves an asset.

Validate registered instructions and resolve an existing asset:

```powershell
node .\build\media-recipes.js check
node .\build\media-recipes.js find --asset docs/editing/images/codebasics/search-replace-advanced-options.png
```

`find` returns the owning recipe/output, storyboard, source variant, preparation settings, and original asset hash. Record that hash in the capture proposal; do not silently replace it if the original changes. Existing assets without recipes return **unmapped** with exit code 1. Do not infer their historical generation procedure from the pixels. Draft new instructions for review instead.

The [Find/Replace screenshot recipe](build/media-recipes/editor-find-replace.json) supplies prospective refresh instructions for the existing advanced-options image. The [Find-demo recipe](build/media-recipes/editor-find-demo.json) preserves the video pilot as an unpublished example. Registering these inputs does not copy pilot media, assert that the existing image was generated by them, or approve another capture.

After the human approves the capture proposal, use the returned storyboard with the [attended runner](#capture-an-editor-screenshot-candidate). Confirm the installed full product revision and readiness as usual. Each new private run keeps byte-identical input in `storyboard.json`, referenced and hashed by `capture.json`. The snapshot survives runtime cleanup; the capture and preparation verification detect changes. Older hash-only manifests remain supported historical evidence but are not self-contained regeneration packages.

Prepare a registered output without copying its settings by hand:

```powershell
node .\build\media-recipes.js prepare --recipe-id editor-find-replace --output-id advanced-options --capture '<private-run\capture.json>' --capture-sha256 '<capture-manifest-hash>' --output '<existing-private-parent>'
```

For video, capture with `--video` first and supply the approved full `--ffmpeg` and `--ffprobe` paths where required. This wrapper uses the existing media helper and does not launch UI or write documentation. Recipe and capture inputs must match. Review the final prepared image or full video and record [fresh exact-asset approval](#record-an-exact-asset-review).

For an approved replacement, prepare a private application plan:

```powershell
node .\build\media-recipes.js plan --asset docs/editing/images/codebasics/search-replace-advanced-options.png --asset-sha256 '<original-hash-from-approved-proposal>' --manifest '<private-candidate\media.json>' --articles docs/editing/codebasics.md --output '<existing-private-plan-directory>'
```

Add multiple explicitly approved Markdown paths after `--articles` when needed. The plan reports a new `yyyymmddseq` filename, affected articles, recipe association, other consumers, and its own hash. Names come from the stable base, not from appending another suffix to the old filename. Existing output collisions cause replanning rather than overwrite.

The reference updater preserves inline and reference-style Markdown images/links, HTML image/video/source/poster references, titles, alt text, query strings, fragments, and line endings. It does not edit frontmatter, comments, fenced or inline examples, or raw script/textarea text. Ambiguous paths and unsupported reference forms such as `srcset` stop scoped application. A format change with an incompatible explicit HTML `type` requires a separately approved content migration. Old files and out-of-scope references remain intact.

After the human approves those repository writes and that exact plan hash:

```powershell
node .\build\media-recipes.js apply --plan '<private-plan.json>' --plan-sha256 '<approved-plan-hash>' --confirm-apply
```

Repeat video tool paths when required. Application rechecks the approved candidate, original asset, storyboard, recipe, articles, and review record, creates the new asset exclusively, updates references and association, and verifies lookup. It never deletes old assets, stages, commits, pushes, or publishes. A failed operation reports written or attempted paths and may leave a partial update. Inspect the diff and repair or replan; do not automatically retry or remove another writer's `.apply.lock`.

For a new asset, use an output with no published paths. Obtain approval for the intended article placement, copy the exact reviewed candidate under the agreed filename, insert the reference, and add that concrete path to the output's `assets` list in the same change. The helper validates the resulting registration; it does not choose placement or write new article prose.

Run `npm run test:media-recipes` for isolated lookup, versioning, reference-update, and failure cases. The tests do not launch VS Code or publish media.

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

Candidates include an exact `storyboard.json` input snapshot and `capture.json` with storyboard, schema, and runner hashes, completed steps, product revision, profile settings, asset hash, and `human-visual-review-required` status. The runner disables breadcrumbs and AI features and hides the secondary sidebar. Page visibility and visible text are checked between steps. Text is checked against the storyboard denylist, the caller's home path, home-folder name, and local user name. This is not a complete privacy guarantee: inspect actual pixels, including icons and notifications, before approval.

Extensions, updates, and telemetry are disabled for the isolated run, and Playwright's renderer context is offline. This is not an OS-level network sandbox. No personal profile is reused, and no credentials are supplied. Existing-workspace captures use a dedicated capture profile as described below. Live AI captures remain separate work and require a dedicated test account plus explicit approval before sign-in or model requests.

The runner closes its own application and removes its runtime directories. Failures are recorded and returned as failures, not successful candidates. If application shutdown fails, the manifest records its process ID and retains the private runtime directory for recovery; do not remove it while the process is still running.

Human visual approval is required before copying a candidate into documentation. The runner does not publish assets or edit articles. Native dialogs and menus remain unproven.

### Replay a reviewed procedure

For a chat-oriented entry point, use [Check instructions](#start-a-procedure-check-chat). The commands below remain available as a manual interface. Previously saved results remain accessible in [Findings](#saved-replay-results).

The [docs-replay skill](.github/skills/docs-replay/SKILL.md) checks selected outcomes from a reviewed version 2 storyboard against an installed, pinned build. It reuses the attended capture runner without producing media. The agent derives a declarative procedure from the article for review, rather than executing prose. The runner does not evaluate arbitrary scripts, compare pixels, or prove every claim in an article.

For article-driven checks, prepare an optional `instructions` source map in the storyboard. `instructions.setup` describes the sample and environment separately from reader actions. Each item in `instructions.checks` contains:

* `source`: one-based `line` and `endLine` values and a `quote` matching those complete article lines, with LF line endings.
* `action` and `expected`: the documented reader action and expected outcome in readable language.
* Either `steps`, an increasing list of zero-based action and observation indices ending in an assertion, visibility check, or text-cycle check, or `notChecked`, an explicit reason the claim is not being checked.

Inspection rejects source quotes that do not match the current article. The exact storyboard bytes, including this map, are part of the reviewed binding. Keep unsupported claims visible and do not infer whole-section coverage from selected checks. Legacy storyboards without a source map remain supported as scripted replay only.

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

   Replay writes `findings.json` and `replay.json` beneath a private `procedure-replay-*` directory. With a source map, `replay.json.instructions` retains setup, source quotations, expected outcomes, structural observations, per-check statuses, and run issues. Successful literal assertions record what matched, not arbitrary UI text. A mapped failed step cites its article line in `findings.json`. Completed observations can remain passed when later cleanup fails, but the overall replay stays incomplete and records that failure. Changed reviewed inputs block mapped results. Without a source map, replay does not claim article-step coverage.

   When launch preparation reaches the capture runner, a nested `capture.json` records actual product identity, cleanup, and completed/failed steps. If that manifest cannot be saved, replay records `environment/capture-manifest-write-failed` and preserves its in-memory state in `replay.json` as `captureState`, without a reference to the missing manifest. If the parent output is also unwritable, the command fails explicitly. Partial files might remain.

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

### Reuse a signed-in sample for instruction checks

For an explicitly approved reusable sample workspace, set `workspace.environment` to `sample` in its reviewed storyboard and use the existing replay commands. Keep the workspace, dedicated profile, and per-run evidence in separate private directories. This mode is for replay only. Media capture retains the isolated defaults and refuses sample mode.

The sample profile retains home, user-data, extensions, application data, and Copilot runtime data. It uses normal sign-in storage instead of the isolated runner's in-memory secret storage. Git and AI UI remain enabled, extensions are not globally disabled, and renderer network access is available. The human can trust the selected folder, enable needed extensions, and sign in once. Do not copy trust or credentials from another profile, inspect account secrets, or repeat setup authorization for the same approved sample. An available account does not authorize model requests.

Settings are seeded once and then preserved. Automatic tasks, MCP access and autostart, Git autofetch, and automatic TypeScript acquisition must remain disabled. Conflicting retained settings fail explicitly rather than being silently overwritten. Extension files and user preferences survive runtime cleanup, but the runner still closes its own application after a bounded check. Procedure review and attended readiness remain required.

Reviewed Git actions can change metadata inside the synthetic sample repository. Keep commits, remote operations, and destructive actions outside scope unless explicitly approved. The workspace snapshot is not a complete Git or filesystem audit, and the sample is not a security sandbox. Check the relevant local repository state after each procedure. No extra extensions are downloaded or installed by this mode.

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

`crop`, `padding`, and `background` are optional. Defaults preserve the full image with no padding and use an opaque `#1F1F1F` background for any added padding. Crops must fit entirely inside the source. Supply all four padding edges, each from zero to 256 pixels. Dimensions are limited to 4096 pixels per side and eight megapixels; media files are limited to 50 MiB. MP4 preparation also supports [timed rectangle callouts](#add-timed-video-callouts). There is no resizing, automatic clipping, trim, frame-rate change, text/arrow overlay, or audio support. MP4 crop coordinates, crop dimensions, top and left padding, and final dimensions must be even. No rounding is applied.

```powershell
node .\build\media.js prepare --input '<private-source.png>' --sha256 '<source-sha256>' --recipe '<recipe.json>' --output '<existing-private-parent>' --capture '<capture.json>' --capture-sha256 '<capture-manifest-sha256>'
```

For runner captures, supply both capture options to retain storyboard provenance, check successful capture and cleanup, verify source hashes, and reject crops that clip recorded highlight rectangles. Other saved sources can omit both options, but have no capture provenance. Review margins yourself.

Supported operations:

* **PNG to PNG:** Lossless crop, solid padding, and adaptive-filter compression using Node built-ins. Supports noninterlaced, eight-bit RGB and RGBA PNGs from the runner. Palette, grayscale, transparency-key, and animated PNGs fail explicitly. Preparation removes ancillary metadata, preserves retained RGBA pixel values, and verifies the entire encoded bitmap. Review color appearance as well as geometry.
* **PNG to WebP:** The same framing, followed by lossless `libwebp` conversion. Final decoded pixels must match the framed PNG exactly.
* **WebM or MP4 to MP4:** Crop, padding, optional timed rectangles, `libx264` at CRF 25, `yuv420p`, no audio, and fast-start metadata. This reuses the repository optimizer's codec and quality convention without its destructive replacement behavior. Input and output must have one video stream, 25 frames per second, and a duration of four to 30 seconds. Full decoding checks every frame, dimensions, and preserved duration and frame count.
* **WebM to unchanged WebM:** Use `{"format":"webm"}` to preserve the VP9 capture bytes and validate the complete recording for private review or handoff. This is not MP4 conversion or permission to embed WebM in an article.

WebP and video validation buffers concatenated PNG frames from FFmpeg in memory instead of writing frame files. Each decode has a 256 MiB output-buffer budget, a 120-second subprocess timeout, and the existing per-frame size and dimension limits. Every complete PNG is validated. Exceeding the buffer budget, a truncated frame, or trailing partial output fails validation; a valid prefix is never accepted as a complete recording. A compressed source smaller than 50 MiB can still exceed the decoded-output budget.

WebP and MP4 operations require explicit `--ffmpeg '<absolute-path>'` and `--ffprobe '<absolute-path>'` options for approved, full installations with the required codecs. PNG requires neither. Unchanged WebM validation needs only `--ffmpeg`; the matching minimal Playwright build supports it. That minimal build cannot perform these WebP or H.264 conversions. Missing capabilities fail with a prerequisite error; the helper does not install tools, substitute encoders, or rename incompatible bytes.

Each preparation creates a new `media-<id>` directory containing `prepared.<format>` and `media.json`. The manifest records source and final hashes, normalized framing, validation results, tool and implementation hashes, capture provenance when supplied, and byte-size change. Compression does not guarantee a smaller file. Raw and previously approved files remain untouched. Existing outputs are never overwritten.

Preparation errors identify the private run path when available. Failed runs retain a manifest with `status: failed` and any partial candidate for diagnosis when the manifest can be written. Cleanup or finalization failures fail the operation rather than producing a reviewable success. A missing or incomplete manifest is not success. Do not approve failed outputs. Run `npm run test:media` for focused preparation and approval tests. Synthetic conversion tests do not prove an installed encoder works.

### Add timed video callouts

Add `highlights` to an MP4 preparation recipe to draw brief red rectangles around relevant controls. The raw WebM or MP4 is unchanged; preparation writes a new candidate. This is a post-recording operation, not a decoration inserted into the product UI.

For example, this rectangle appears from one second up to, but not including, two seconds:

```json
{
  "format": "mp4",
  "highlights": [
    {"x": 980, "y": 86, "width": 40, "height": 30, "startFrame": 25, "endFrame": 50}
  ]
}
```

* Coordinates are integer **source-video pixels**, before crop and padding. The helper translates them into the prepared frame and rejects a crop that clips a rectangle.
* Frame indices are zero-based at the supported 25 frames per second. `startFrame` is inclusive; `endFrame` is exclusive and cannot exceed the decoded frame count. No implicit rounding or timing adjustment is applied.
* Rectangles are opaque red (`#FF0000`) with a fixed two-pixel stroke. Width and height must exceed four pixels so the rectangle has an interior. A recipe accepts one to 20 rectangles.
* Choose geometry and intervals from the actual recording and its action timestamps, not the example coordinates. Prefer one or two short-lived callouts that guide attention without hiding content. Rectangles do not track moving targets.
* Only WebM/MP4 input with MP4 output supports this option. Unchanged WebM handoff and image preparation do not. Text labels, arrows, and animated callouts remain unsupported.

Use the existing `build/media.js prepare` command with the recipe and the approved full FFmpeg/ffprobe paths. The preparation manifest records the rectangles and frame ranges. Every transformation creates a new candidate requiring exact-asset review; approval of a raw recording or earlier preparation is not inherited. H.264 encoding is lossy, so the preserved-source guarantee applies to the original file, not identical pixels in the re-encoded video.

The agent should present a readable timing/placement proposal in chat; the author does not need to maintain this JSON. Review the entire final video for correct placement and timing. Automated checks validate geometry, frame bounds, and decodability, not whether a callout identifies the right control.

The optional real-encoder regression uses synthetic footage. Set `DOCS_MEDIA_FFMPEG` and `DOCS_MEDIA_FFPROBE` to approved installed executables before `npm run test:media` to verify exact on/off frames and crop/padding translation. Without those variables, that test is explicitly skipped; no tools are downloaded.

### Record an exact-asset review

Inspect the final image or the entire final video. Check privacy, readability, color, framing, preserved highlights, visible actions, and relevance to the article. Share the exact final path, its SHA-256 hash, and the preparation manifest hash from the `prepare` result. Automated validation, sampled frames, capture readiness, and earlier approvals are not human review.

Only after an explicit human decision, record it:

```powershell
node .\build\media.js review --manifest '<media.json>' --manifest-sha256 '<preparation-sha256>' --sha256 '<final-asset-sha256>' --decision approved --reviewer '<human-name>' --evidence '<explicit-human-response-and-context>' --confirm-reviewed
node .\build\media.js verify --manifest '<media.json>'
```

Use `--decision rejected` to record rejection. Add the required media-tool options for WebP or video to both commands. The review command revalidates the final bytes before creating an exclusive `review.json`, bound to both the asset and manifest hashes. It records an attestation, not authenticated identity or permission to publish. Agents must never infer a human decision.

`verify` revalidates the media, source and capture hashes, preparation record, and any review record. It returns `human-visual-review-required`, `approved`, or `rejected`; malformed or stale records fail. A successful exit alone is not approval. There is one immutable decision per candidate. To revise a decision or transform the media again, prepare a new candidate and review it; approvals are never inherited, even for byte-identical new candidates. Keep the sources and manifests available for verification. A separate, authorized article update must use the exact approved bytes and follow Git LFS and media-format conventions. These commands do not copy media into documentation, publish, or commit.

## Use the Docs workflow canvas

The **Docs workflow** canvas separates chat launchers from batch findings. **Findings** contains local claims/link checks, editorial and technical batch review, and the persistent inbox. It does not expose a separate interactive article-review or replay form. Writing, issue/TPI, review, media, and procedure-check launchers start interactive chats. **Saved plans and drafts** retains earlier structured work. The findings workflow requires a trusted checkout, installed Node.js and checker dependencies, and a Copilot host exposing the experimental session-scoped background-task SDK.

Ask Copilot to open the `vscode-docs-article-checks` canvas from `.github\extensions\vscode-docs-workbench`. Opening it loads the inbox and incorporates eligible saved results, but never launches a task, fetches GitHub, or requires `gh` authentication. After updating the extension, an attended extension reload is needed. Do not reload or change extension configuration automatically.

The `/writing` saved-work route and `/findings` support direct loading, reload, and browser navigation. Moving between these two views preserves existing plan feedback and findings filters without starting work or making decisions. Saved-work progress and recovery stay on the saved-work page; check progress, freshness controls, and coverage stay on Findings.

Findings has a single **Run batch checks** section. Choose **Local claims and links**, **Editorial review (AI)**, or **Technical accuracy (AI)** in **Checks**, then enter the scope. The **Article review** filter includes both review batch types and earlier saved article reviews. **Replay** remains a filter for saved results, not a launch action.

The shared `extension.json` declares both canvases so compatible hosts can list them without starting the provider. The provider starts on the first canvas open or action. Runtime registrations use those same declarations. Article initialization is independent of the existing GitHub queue initialization.

1. On **Findings**, enter one or more Markdown articles or folders in **Check scope**, separated by commas, for example `docs/debugtest, docs/editing/codebasics.md`. Scope paths must be under `docs`, `api`, `remote`, or `release-notes`. The picker shows the resolved article count and rejects traversal, symbolic links, junctions, arbitrary files, and shell text. Local checks support up to 5,000 articles. Editorial and technical reviews support up to five.
2. Select **Run checks** for local claims and links, **Run editorial review** for text review, or **Run technical review** for product-source accuracy. This explicit action authorizes report-only work, private results, and automatic ingestion, and can use host credits. No separate confirmation checkbox or import step is required. Local checks use one host task and the trusted `article-runner.mjs`. Review batches use one independent agent per article, with an optional focus. Editorial channels are context only. Technical reviews pin a public release as described below. All modes resolve and deduplicate scope before launch. Later folder additions are not included. None authorizes edits, public writes, installs, worktrees, media capture, or review decisions.
3. Review the **Findings** inbox while checks run. Each collapsed row shows a type label, such as **Technical**, **Editorial**, **Reference**, **Link**, or **Instruction check**, separately from severity and freshness. Review types follow the individual finding's category, including older mixed technical and editorial reviews. Choose a type in **Finding type** or search by its label. This filter combines with article, check type, severity, review status, and freshness filters. **All types** removes only the type restriction. **Clear filters** resets all filters. Saved findings appear with current freshness marked **Checking** while a local worker validates them. This is historical evidence, not a claim that the source is still current. New results enter the inbox only after full validation and an owning-task observation of idle or completed. Filters do not change execution scope, launch tasks, or create decisions. There is no run-history navigation.
4. Use the action icons on a finding's row: **Dismiss** for an unnecessary observation, **Mark fixed** after reviewing its correction, or **Undo** to reopen it. The actions remain visible when details are collapsed. Tooltips and accessible names identify each action; severity icons also have descriptive labels. These are one-click manual decisions, with no Accepted step, required reason, or separate Save button. The audit log records the action and current article hash automatically. Original report integrity and the finding's current decision are revalidated before saving. Existing history is preserved, and later observed evidence changes can reopen decisions.
5. Use **Refresh** after editing an article. It returns saved evidence without waiting for full source verification. The page updates when verification finishes; source files are not continuously watched. **Evidence and provenance** separates the last accepted scan from current freshness. **Execution details and recovery** contains host observations and unresolved launches, not a transcript or run-history browser.

To address one finding, select **Fix in chat** beside **Open article at finding**. It starts doc-writer with the current article and a private attachment containing only the selected finding, its original evidence, and current article hash. The chat checks whether the finding still applies and proposes a focused correction. Approve the scope and authoring location before edits, then review the checks and diff in that conversation. Related edits need explicit justification in the plan. Starting chat uses AI credits but never changes the finding's state or tracks chat completion.

After an approved fix, return to Findings and select **Mark fixed**. This works even when editing the article made the original report stale. It records a manual decision about the current text, not renewed verification: the original report, freshness, check coverage, and replay outcome remain unchanged. A missing finding in a later review is never treated as an automatic fix. Existing Accepted history and legacy triage integrations remain readable without a state migration.

**Stop verification** stops only the local freshness worker, never a host task. Saved findings remain available. Entries without completed current verification show **Unavailable**; use **Refresh** to retry the full-inbox check. Manual decisions and fix-chat handoffs still require intact original report provenance and a readable current article. Tampered or missing original evidence blocks those actions. Closing the last findings canvas also stops local verification.

Visible views check for saved workflow updates every 10 seconds while idle and refresh when focused or revealed. This discovers findings, plans, and decisions created in another view or host action without starting another task. Hidden views pause polling.

Checks cover data variables, lifecycle IDs, product-reference syntax, internal links, fragments, and media paths. They do not verify prose accuracy, public product availability, external websites, rendered media, generated content, or navigation. No product build or manifest is supplied, so product references remain **unverified**, distinct from errors and warnings. Checker exit 1 with a valid error report is a check result, not an infrastructure failure.

Editorial review assesses clarity, grammar, structure, usefulness, terminology, and text accessibility. It does not contact external sites, research product behavior, inspect media, or execute article instructions. Findings are agent judgments, not verified product claims. The existing deterministic precheck stays separate in coverage.

The whole review scope is preflighted before any agent starts. An unconfirmed launch stops further starts. The notice reports requested, unconfirmed, and not-started counts. **Execution details and recovery** shows each article, while the batch indicator reports accepted reviews and items needing attention. There is no automatic retry. Completed articles can enter the inbox independently. Failed, incomplete, or empty reviews do not erase earlier findings or decisions. A later review's silence does not mark a finding fixed.

### Technical accuracy batches

Select **Technical accuracy (AI)**, choose the **Public product channel**, optionally enter a **Stable version** and **Technical focus**, then select **Run technical review**. A blank Stable version uses the latest public Stable release. Insiders uses the latest published build from the official update-metadata endpoint, not the current `main` commit. Selecting a mode or refreshing the inbox does not fetch metadata or start agents.

The [product-pin helper](build/review-product.js) resolves the public release once before launch and verifies that its full commit is available in `microsoft/vscode`. Stable targets use a non-draft, non-prerelease GitHub release and its resolved tag. Insiders targets use published product metadata and its exact source revision. Missing authentication, unavailable metadata, invalid versions, or unresolved commits fail explicitly before any agent starts. Nothing is downloaded or installed.

Every article receives the same server-owned `binding.product`: channel, version, revision, and public metadata source. The notice, execution details, coverage, and finding provenance identify that target. Requests and reports bind it with their existing hashes. Supported technical findings require commit-pinned source quotations, and the validator rejects citations to a different revision. The importer does not fetch citation contents or certify the agent's conclusions. Different product revisions retain distinct findings and coverage rather than silently inheriting earlier decisions.

Technical agents check relevant public exposure, settings, commands, defaults, shortcuts, prerequisites, and behavior using focused read-only source research. Registration and channel gates matter. The release pin and source-code existence alone are not proof that a feature is publicly available. Summaries describe checked scope, while limitations and unverified questions identify unavailable evidence or claims that need an attended instruction check. No examples, UI, samples, media, or external-link crawl run as part of this batch.

Freshness remains local: it checks captured article bytes, dependencies, guidance, and saved evidence, not whether the pinned release is still latest. Refresh never silently repins the product or reruns research. Existing editorial reports without a product pin remain readable, and editorial behavior is unchanged.

For a selected finding, use **Fix in chat**. Use **Review article** for a broader interactive assessment and grouped revision plan. Batch execution does not authorize article edits. Run `npm run test:article-workflow` with `DOCS_ARTICLE_BROWSER` set to an installed browser to include the review-batch and finding-action UI checks. These fixtures validate execution and result handling, not the quality of a live agent's judgment. The resolver has also been checked against public Stable and published Insiders metadata. A live technical-batch agent pilot remains separately approved work.

### Saved article-review results

Start new interactive reviews on [Review article](#start-a-skill-driven-review-chat), not Findings. The earlier structured review adapter remains available for saved evidence and existing integrations, but its launch form and section picker are no longer exposed on Findings.

Filter **Check type** to **Article review** to inspect saved quotations, suggested corrections, product citations, and review decisions. **Coverage** retains the review summary, limitations, and separate deterministic prechecks. Section findings remain scoped to the originally selected heading and nested subsections; their freshness is bound to the whole article and its dependencies.

The [docs-review skill](.github/skills/docs-review/SKILL.md) defines the procedure. The [review helper](build/review.js) and [workflow adapter](.github/extensions/vscode-docs-workbench/article-review.mjs) validate the captured article, exact source spans, requested focus, channel, guidelines, local dependencies, and completion receipt before ingestion. Private state uses `reviews.json` and `review-runs` beside the existing inbox state, without migrating or overwriting checks, replay, daily audit, or account data.

Supported observations are labeled as agent judgments and use warning severity. Unresolved questions are unverified. Supported technical findings require quotations and line references from commit-pinned `microsoft/vscode` sources. For a pinned batch, citations must match `binding.product.revision`. The agent and human reviewer assess those citations. The importer validates their shape and product pin but does not fetch or independently authenticate their contents or conclusions. A selected channel is review intent, not proof of an installed build or public feature availability. The agent uses the host's existing permissions, not a new security sandbox.

**Agent review completed** means the requested focus was reviewed, not that the article is correct. Incomplete reviews require explicit limitations and retain earlier successful scoped coverage. A later review's silence does not resolve an earlier finding or establish verified absence. Unchanged dismissals persist, and changed evidence reopens decisions.

Freshness checks never rerun the agent or contact GitHub. **Fresh** means local review inputs and saved artifacts remain current, not that a judgment is correct or that the current product still behaves the same way. One-click decisions authenticate the original evidence and record current article bytes without relabeling historical evidence Fresh.

For a saved version 6 report, `node .\build\findings.js --input '<report.json>' --check-current --root '<docs-checkout>'` verifies local freshness. Exit 0 means a completed review with no reported findings, 1 means a completed review with findings, and 2 means an incomplete review. Invalid or stale reports fail explicitly.

Run the focused integration tests with `npm run test:article-workflow`. Set `DOCS_ARTICLE_BROWSER` as described below to include the browser review journey. Live acceptance requires an explicitly selected article and human inspection of the resulting findings.

The accepted live pilot covers a combined technical and editorial review, source-cited findings, separate precheck results, and persistence after reload. Earlier findings and stored check coverage remain intact. The article remains unchanged, and no live triage decision is saved. This verifies the review handoff, not every category of possible documentation issue.

### Revise the reviewed article

New reviews and revisions continue in the [same interactive chat](#start-a-skill-driven-review-chat). The controls below apply to previously prepared structured update plans retained under **Saved plans and drafts**, not a second review entry point on Findings.

1. Open the existing update plan under **Saved plans and drafts**. Its article, review context, and saved decisions remain attached.
2. Review the short plan, grouped into outcomes such as accuracy, clarity, and consistency. Use **Adjust the update plan** to request changes or exclusions. Detailed findings remain available, but the approval is for the article update as a whole.
3. Select **Approve and update article**. The confirmation includes the grouped scope, existing checkout, branch, and allowed file. This single decision authorizes both the plan and its scoped writes. Cancelling saves no approval and launches no update. The agent asks again only for a material ambiguity or scope expansion, not routine edits within the plan.
4. The update preserves captured existing edits outside its scope and automatically runs local claim/link checks. Section updates cannot change content outside the selected section. The result is saved for human review; technical or editorial review findings are not automatically marked fixed.
5. Select **Open diff in editor** to compare the captured baseline with the current editable article. **Open article at finding** navigates from an expanded finding to its source line. Save manual editor changes before selecting **Recheck current files**. The original draft report stays unchanged; new local-check results are separate.
6. Use **Request further adjustments** and **Plan adjustments** to continue the same article-update work item. The new proposal captures current bytes and preserves earlier evidence. Approve that new scope before further edits; there is no need to re-enter the article or create a worktree.

This path currently updates one existing docs article, without generating or adding new media. Stale plans, unconfirmed reviews, incomplete drafts, changed branches, and expanded file scope stop explicitly. A failed update may leave edits; it is never automatically restarted or reverted.

Native editor actions require the extension to run in Windows VS Code with its installed CLI available. They reuse a VS Code window through the CLI; they do not guarantee selection of a particular window when several are open. Other hosts retain the displayed article paths and saved diff with an explicit limitation. Baselines live in private `draft-diffs` storage, are read-only, and are hash-checked before reuse. No source files are staged, committed, or published.

The full grouped-review/update/follow-up flow is covered by synthetic integration and browser tests. Live editor checks separately verified the requested source line and native baseline/current diff. They do not constitute a new live agent-authored article update.

### Saved documentation plans

New plans are proposed in [doc-writer chat](#start-a-documentation-writing-chat). The **Saved plans and drafts** page retains earlier proposals made through [docs-feature-plan](.github/skills/docs-feature-plan/SKILL.md), but no longer offers its new-request form.

Review existing proposals, their sources and limitations, or continue an approved draft. Existing **Approve plan scope**, **Reject plan**, and **Prepare draft** controls keep their original source checks and authorization requirements. Current draft actions appear before the original plan; supporting context, research, and proposal notes remain expandable. These compatibility controls are not prerequisites for new chat-based work.

The [plan validator](build/doc-plan.js) restricts proposals to docs articles, documentation TOCs, and the sitemap. It requires sitemap work for new articles and rejects generated policy output, out-of-scope paths, and fabricated media-approval states. Source references and availability assessments remain agent judgments for human review, not independently authenticated conclusions.

Local source citations must identify files in the captured documentation snapshot. They cannot name arbitrary local or network files. Public citations support GitHub, the VS Code website, Microsoft Learn, and the official update-metadata endpoint. Mutable update metadata describes the research time, not an immutable product version, and should accompany pinned product-source evidence.

Private records use `feature-plans.json` and `feature-plans` beside the existing inbox state. The [adapter](.github/extensions/vscode-docs-workbench/feature-plans.mjs) waits for a validated completion receipt and owning-host confirmation before exposing decision controls. The interface shows the latest proposal for each feature source and channel, not execution-history navigation. Earlier records remain private for provenance.

The source snapshot covers docs Markdown, docs TOCs, the sitemap, lifecycle data, data-variable files, and planning guidance. It is deliberately conservative: unrelated changes within this snapshot can require replanning. Approval records the checked snapshot at that time. A future drafting action must validate its source again and use an explicitly approved authoring location and branch.

Plan approval does not authorize repository edits, worktree creation, capture readiness, media use, commits, or publication. Optional screenshot generation and exact-asset approval are separate decisions on the writing page. The independent M3 media workflow reuses the same capture and preparation tools.

The live description-input pilot verifies plan creation, source evidence, an explicit no-new-media recommendation, plan-scope approval, and persistence after reload. Approval leaves articles, prior findings, and coverage unchanged and starts no additional agent or capture. Issue-source changes, proposed and pending media, rejection, and incomplete plans are covered by isolated tests.

### Review screenshots before drafting

After approving a media-bearing plan, expand **Optional media before drafting**:

1. Select **Set up screenshot**. Choose a checked-in procedure matching the article and channel, an installed build, and a reviewed capture workspace if required. If no procedure or build matches, leave the proposal pending and agree on the missing setup in conversation.
2. Select **Review capture procedure** and inspect the actions and assertions. Select **Generate screenshot** only after confirming that procedure and your availability for an attended run. The host runs the existing capture and preparation tools, using a dedicated profile and private output.
3. Handle native prompts yourself. When a folder or existing-workspace capture waits for readiness, confirm readiness on the writing page or cancel. Readiness is not asset approval.
4. Inspect the preview, including its full-size image, framing, text, and private information. Enter descriptive alt text starting with `Screenshot showing` or `Screenshot of`. Select **Approve screenshot** or **Reject screenshot**. This decision binds the prepared PNG, preparation record, and description, but does not edit documentation.
5. Use **Prepare draft** for the separate write confirmation. It lists the screenshot destinations, exact hashes, and Markdown descriptions alongside the article files.

The first integrated slice supports screenshots before the first draft. It preserves the full captured frame and uses the highlighted candidate when the storyboard provides one. Raw captures and prepared files remain private; the workflow never overwrites an existing article asset. Cropping, alternative preparations, video, and media additions after a draft starts require a separately agreed follow-up. Unsupported proposals remain pending.

One capture attempt is recorded per proposal. Failed or uncertain attempts are retained, never automatically retried. An unresolved launch or cleanup failure blocks further capture and drafting. A confirmed, finished failure with no retained runtime can be left pending while the text draft proceeds. Changed candidates or reviews cannot become draft assets.

Media evidence lives under the canvas's private `media-output` directory, with references in the existing feature-plan state. Isolated integration and browser fixtures exercise the real preparation, review, and draft helpers with synthetic captures; they are not proof of a new live Electron capture.

### Prepare an approved draft

After approving a plan that proposes changes:

1. In **Draft in an existing checkout**, choose the authoring location. The current workspace is prefilled, but no edits are authorized yet. Use an existing named branch and save any open editor changes. The workflow does not create or switch branches or worktrees.
2. Select **Prepare draft**. Review the location, branch, and exact file list in the confirmation. Cancel to leave everything unchanged. Planned files must be clean; unrelated uncommitted work is preserved and checked for unexpected changes.
3. Confirm the draft and any listed approved screenshot copies. If only the commit or planning guidance changed while all captured documentation inputs still match, the confirmation explicitly asks you to reconfirm the plan for drafting. Changed documentation inputs or issue requirements require reassessment instead.
4. Review the saved diff and check results under **Draft**. Errors remain visible as **Draft checks need attention**. A successful check does not replace human review. The report describes completion-time bytes; further manual edits require another check.

The host agent uses [docs-feature-draft](.github/skills/docs-feature-draft/SKILL.md), follows the approved descriptions, and runs trusted preflight and completion helpers. The helpers check the branch, planned files, source inputs, unrelated working-copy content, and known media references. They run the existing claim and link checks, adding navigation checks for new articles or navigation changes. They do not execute package scripts or checker code from the authoring checkout.

This step does not generate media. It preserves existing media and permits new references only for separately approved screenshots included in the write confirmation. Trusted preflight copies those exact bytes; completion verifies the assets, descriptions, and references again. Other proposals remain explicitly pending, with TODO comments where appropriate.

If an agent or check fails after editing starts, edits can remain in the chosen checkout. Inspect them and continue explicitly in the editor or conversation. Do not repeat the draft automatically or reset the checkout. One draft attempt is recorded per approved plan in v1. These checks are safeguards within the host's existing permissions, not an OS sandbox or protection from every concurrent edit.

No staging, commits, GitHub writes, publication, or captures are authorized by drafting.

The bounded live pilot verifies a one-paragraph draft, preserved surrounding content and media, saved checks and diff, and persistence in the actual canvas after reload. It originally left the change unstaged for human review; that approved pilot is now included in `9afaa1905`. New-file diffs, branch changes, scope violations, and pending media are covered by isolated tests, not by that one live edit.

### Saved replay results

Start new scripted procedure work through [Check instructions](#start-a-procedure-check-chat) or docs-replay in chat. Findings no longer offers a replay launch form.

Use the **Replay** check-type filter to inspect previously saved findings and the independent coverage. A passed replay covers only its assertions. A mismatch needs investigation; an incomplete replay reports prerequisites, readiness, privacy, or cleanup problems rather than claiming an article bug.

If a previously launched canvas-owned replay is still waiting, its **I'm ready** and **Cancel waiting replay** controls remain under **Execution details and recovery**. These recover existing work only; they do not start a new replay, change trust decisions, or cancel unrelated tasks.

Replay uses the existing `build/replay.js` runner and readiness protocol. Its private records live in `replay.json` and `replay-runs` beneath the workspace's inbox directory. Capture output and default profiles use shorter, guarded `replay-output` and `replay-profiles` directories beneath the canvas's private extension-data directory to avoid Windows path-length limits. Execution IDs and reviewed bindings retain workspace ownership. They use the shared audit and guarded storage helpers, but do not change the claims/link state or coverage. Existing claims and their review decisions remain intact.

Coverage is tracked per storyboard, separately from claims and links. An incomplete attempt retains earlier successful verification. Only a passed replay can establish that an earlier finding was not observed; absence does not automatically mark it fixed. A fixed finding returning after a passed replay reopens, while unchanged dismissals persist.

Loading and reviewing replay evidence never reruns the UI. Freshness checks bind article, storyboard, runner, source revision, review, and evidence hashes to the selected build. They do not inspect a subsequently updated installation or current workspace contents. The product pin remains visible in the finding's provenance. No media approval or publication is authorized by replay.

Live validation covers all eight steps of the Stable debugger-picker procedure, including explicit procedure review and readiness. It confirms an unchanged workspace, no media capture, application shutdown, and release of the dedicated profile lock. Existing claim and link findings and coverage remain intact. Isolated tests cover replay review decisions and reappearing findings. Live validation does not save review decisions.

### Coverage and retained findings

**Coverage** distinguishes checked-clean articles, articles with observed findings, never-checked articles, checking or unavailable freshness, stale verification, and failed or incomplete attempts. While verification is pending, it shows the last accepted result separately from current freshness. It follows the article-or-folder filter and always describes the supported claims-and-links scope, not a comprehensive article review. Review decisions do not change objective coverage: dismissing every observation does not make an article checked-clean.

Each article has its own source revision and checker input fingerprint, including relevant link dependencies. Editing one article does not automatically invalidate unrelated articles from the same batch. A subset check preserves coverage outside that subset. Files added after scope resolution remain never checked. A later failed attempt retains the last successful verification and its separate freshness status.

Ingestion validates the complete batch, request ownership, request and report hashes, article hashes (including clean articles), schema, check scope, timestamps, and current checker evidence. Missing, invalid, stale, partial, failed, or unconfirmed results do not replace successful coverage or resolve findings. Freshness is evidence at the displayed time, not proof about an installed product.

Findings absent from the latest successful applicable scan stay in the inbox as **Not observed**, with their existing decision. They are never automatically marked fixed. Select **Mark fixed** after confirming a correction, or **Dismiss** for an unnecessary observation. If a fixed finding returns after verified non-observation, it reopens even when the exact original bytes return. Unchanged false-positive dismissals remain dismissed. Reappearance is recorded as an automatic history event, not a human decision.

After ingestion, evidence review is independent of later host lookup failures, task disappearance, or task status changes. These remain visible in execution details and still constrain new launches, but do not invalidate accepted verification. Receipt ownership, accepted report hashes, and report structure are checked before displaying current verification. Full source validation runs in a read-only worker; a pending result is never labeled fresh. Manual actions revalidate the original report and receipt, reject changed evidence or intervening decisions, and bind their audit entry to the current article hash. They can close a historical finding after an edit but do not change verification results. Tampered or missing original artifacts block actions. Legacy verified-triage APIs retain their stricter current-coverage checks.

There is at most one full-inbox verification worker and one independent decision-verification worker. Duplicate opens and refreshes share active work; changed inputs retain only the latest follow-up request. Worker results are bound to coverage, request, receipt, and report identities. Obsolete completions are discarded, and ingestion merges into the latest locked review state rather than replacing it with a worker's copy. Workers cannot write private state or hold its locks. Verification has a two-minute execution deadline, and batch Git metadata commands have a ten-second timeout. Cleanup waits for worker termination; timeout and cancellation are explicit and preserve historical evidence. This introduces no agent scheduler, model call, transcript, persisted verification manifest, or new private-state format.

### Ownership and uncertain launches

Private state lives under `extension-data\vscode-docs-article-checks\<workspace-hash>\inbox-v2\` in `COPILOT_HOME`, or `~\.copilot` when unset. The canonical checkout path identifies the workspace. Separate checkouts do not share state. `inbox.json` atomically stores coverage, hidden execution references, and the existing audit-helper review model. `runs\<run-id>\` holds a request, a bundle of per-article reports, and a receipt. Recent tool activity stays in memory rather than becoming another transcript store.

This redesign starts a separate versioned inbox. It does not read, migrate, reset, or overwrite the previous prototype's sibling `runs.json`, `findings.json`, or `runs` directory. It also never reads or merges per-account workbench records, the live daily audit state, or `VSCODE_DOCS_AUDIT_STATE_PATH`. Previous prototype results do not appear in the new inbox; an explicitly requested new check creates new evidence.

Files are private local data, not repository artifacts, and must not be committed. Atomic replacements and exclusive locks serialize ingestion and decisions; do not remove a lock until its writer is known to have stopped. Corrupt or unsupported records fail instead of being overwritten. This storage assumes a trusted local user and filesystem; it is not protection against another process running as that user.

A reload preserves run IDs, owner session IDs, agent IDs, and artifact references. Host tasks remain owned by their original session. Another session can validate saved evidence in the same workspace but cannot observe or resume the original host task through this canvas. The inspected SDK returns no task or session link, so the canvas does not invent deep links.

If acknowledgement is lost or times out, the run remains blocked and is not retried. Refresh host activity to reconcile its exact run identity. A missing task in host history does not prove that nothing ran. Only after inspecting the owning session can you explicitly confirm **I checked host history: no task started**. This records a local decision, does not cancel anything, and does not start another run.

For report-only claims/link batches and structured article reviews, a validated completion receipt plus a recorded idle/terminal host observation at or after completion identifies finished historical work. The old host task does not have to remain in a transient task list. A later session can start a new independent check without taking ownership of the earlier task. Completion validation checks the owned request, receipt, report scope, and hashes, not current article freshness; stale findings do not prevent a fresh review. A valid execution-failed receipt identifies a finished attempt, not a successful check.

Running, uncertain, and unacknowledged work remains blocked. Missing, malformed, owner-mismatched, scope-mismatched, or hash-mismatched artifacts also block overlapping work. A missing task alone is insufficient: without verified completion and a stopped-host record, the run remains unresolved. Each new launch rereads receipts and queries the current host under a launch reservation. A visible task that resumed running blocks the launch. Host lookup failures and ambiguous task identities are not treated as absence.

Overlap is based on resolved articles, so a folder check cannot bypass an active single-article check. Disjoint scopes can run independently. Historical records and review decisions remain intact; no manual record deletion or automatic retry is required. This historical-completion policy does not apply to authoring, capture, or replay: their existing ownership, approval, and cleanup gates remain. The canvas never automatically cancels an agent, marks documentation complete, or makes a human review decision.

### Validation and integration boundary

The runner and inbox share checker setup within a batch, while retaining a separate report and input fingerprint for every article. They reread the batch's captured article and link inputs before returning results, verify resolved data and lifecycle inputs, and guard Git source identity during the scan. Parsed Markdown is reused only when its content, article identity, and resolved variables match. No persisted freshness cache or timestamp-only shortcut is used. A missing article can make its verification stale without invalidating unrelated articles.

The findings table retains its rows while filters change visibility, and updates changed evidence and review controls in place or replaces the affected row. Filters still apply to every accumulated finding. There is no truncation, pagination, or virtualization. Review drafts remain bound to their evidence, coverage token, and decision history.

Run deterministic tests without a live host or GitHub:

```powershell
npm run test:article-workflow
npm run test:workbench
```

The fixture uses the real checker, reporter, audit helper, verification workers, HTTP server, and UI with a fake host task API. Deterministic assertions can wait for completed verification; progressive tests exercise the immediate historical response and held or cancelled worker completions. Each test exclusively owns a uniquely created directory under the OS temporary directory containing its synthetic checkout and isolated private state. Tests stop their workers before removing fixture directories, including browser profiles. A temporary-directory override inside the checkout is rejected. Tests never use existing private state or generate files in the documentation checkout.

For browser validation, point to an already installed Chromium browser. This creates a separate headless browser profile in the fixture directory and does not download tools:

```powershell
$env:DOCS_ARTICLE_BROWSER = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
npm run test:article-browser
Remove-Item Env:DOCS_ARTICLE_BROWSER
```

Optionally set `DOCS_ARTICLE_SCREENSHOTS` to an existing absolute private directory outside the checkout and its ancestors. The browser test retains synthetic dark and light screenshots in a uniquely named child directory and prints that path in its diagnostics. Relative paths and paths resolving into the checkout are rejected. Screenshot retention is opt-in; fixture and browser-profile cleanup still runs.

Browser tests exercise automatic ingestion, compact rows, all finding filters, direct reasoned review, draft preservation, merged scopes, retained findings, coverage, reload, delayed reports, failed attempts, verified-finished reruns, escaping, narrow layouts, and dark and light appearances. Without `DOCS_ARTICLE_BROWSER`, browser tests are explicitly skipped. This is a plain HTTP SDK canvas using the existing native JavaScript UI approach, not a `*.vscode-app.html` app.

For bounded scaling acceptance on Windows, use the installed browser and an existing OS temporary directory:

```powershell
$env:NODE_DISABLE_COMPILE_CACHE = '1'
$env:DOCS_ARTICLE_BROWSER = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
node .github\extensions\vscode-docs-workbench\article-scale.mjs --output-root ([System.IO.Path]::GetTempPath())
```

The driver checks `docs/agents` and the complete supported corpus read-only. Its synthetic host acknowledges promptly and runs the trusted runner in a separate process. Measurements distinguish scope and request preparation, execution, serialization, ingestion, initial historical display, refresh acknowledgement, time to completed freshness verification, isolated triage, and browser rendering and filtering. A heartbeat measures provider event-loop delay during verification. Browser timings replay the actual historical response, separately from backend freshness costs. Pending snapshots are not compared as completed verification. If execution times out, a combined-report projection can measure rendering, but does not establish accepted inbox coverage.

The command creates one uniquely owned `vscode-docs-article-scale-*` directory. It retains `report.json` and `ownership.json`, and removes its runtime state and browser profiles after its workers stop. It never uses the live inbox or personal audit state. PowerShell cleanup checks owned process identities and uses `Stop-Process -Id`; unverified cleanup retains runtime files and reports a failure. The driver has a ten-minute work budget, bounded phases, and bounded termination grace periods. Run `--help` for the precise limits and interactive targets. Exit 1 means an unmet or unmeasured budget; exit 2 means a harness, equivalence, or cleanup failure.

After a change, add `--compare '<absolute-baseline-report.json>'` to compare semantic hashes for completed matching phases. Keep the checkout revision and article inputs unchanged between comparison runs. The comparison covers findings, per-article fingerprints, provenance, coverage, and triage history where both reports contain those measurements. It does not replace the mutation and recovery regression tests.

A November 2026 Windows baseline contained 69 articles and 535 findings in `docs/agents`, and 630 articles and 4,223 findings in the full corpus. Before shared batch inputs, medium execution took about 25 seconds and each snapshot took 26 to 29 seconds; full execution exceeded the 120-second bound. Coordinator acceptance after shared inputs measured medium execution and ingestion at about 4.3 and 3.5 seconds, and full execution and ingestion at about 48 and 42 seconds. Full accepted coverage was 169 clean articles and 461 with findings, with equivalent completed semantic hashes.

Completed full-corpus freshness still took about 41 to 42 seconds, and the three-snapshot phase exceeded its 120-second bound. That cost is now separated from progressive historical display, not relabeled as an interactive pass. The original completed-verification targets remain visible in the report alongside the new display and acknowledgement timings. The previous full-list clear-filter measurement was 384 ms against a 100 ms target. Progressive display, worker responsiveness, decision latency, and the latest DOM changes require a new coordinator-run comparison; no new performance pass is claimed here.

The adapter imports `@microsoft/copilot-sdk/extension` and registers canvases with `joinSession({ canvases: { definitions: [...] } })`. An offline entry-point regression checks that contract with a test-double SDK, without an installed SDK path or host connection. It is not a test of the installed SDK's `Canvas.declaration` implementation. Automated validation does not start live agents, reload extensions, or change global configuration.

An attended local Windows round-trip on 20 November 2026 verified the previous single-article prototype: canvas discovery, exactly one host task, a fresh report with seven unverified findings, and preserved references on reopen. That check did not exercise ingestion, triage, or this findings-inbox redesign. Its private artifacts remain untouched.

An attended two-article batch also verified this redesign on the local Windows host. One host task returned exit 0 and produced 88 unverified findings, no errors, and no warnings. The completed batch entered the inbox without a separate import action. Provider reload preserved the inbox and per-article coverage; article, check-type, review-status, and freshness filters worked independently of execution scope. Direct review controls were inspected, but no live decisions or public writes were made. Automatic visible-page polling is covered by browser tests; the live browser page was hidden, so **Refresh** reconciled the completed task.

These local checks do not establish compatibility with every host or full-corpus performance. For attended acceptance on another host, approve a workspace-extension reload and reopen **Docs workflow**. On **Findings**, with separate authorization for a live check, select two articles, start one batch, verify ingestion and per-article coverage, and reopen to check persistence. Save a live decision only if authorized. Stop on uncertain acknowledgement; do not repeat the launch.

Feature authoring includes plan decisions, optional attended screenshot review, and separately confirmed drafting with saved diffs and checks. Independent media, video integration, article-derived UI checks, and PR selection are core planned work, not yet delivered. Docs-as-eval and broader audits remain later work. Planned PR review reads GitHub snapshots as data without checking out or executing the PR.

## Use the docs workbench

The workspace-scoped Docs workbench canvas brings together open documentation PRs, documentation issues, release test plan items (TPIs), and private media tasks. It requires a Copilot host that supports SDK canvas extensions, background-agent tasks, and approval dialogs, plus an authenticated `gh` CLI.

This legacy queue canvas is separate from **Docs workflow** and is not the target daily-work experience. Its controls do not establish acceptance of the eight core workflows. Its attachment approval flag is not an [exact-asset review](#record-an-exact-asset-review) and does not authorize documentation use or publication. Do not use a legacy action to bypass the current no-PR-checkout or separate-approval rules.

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
