---
ContentId: 8d3f4a2e-9b1c-4f5e-a8d7-2c4b6e9f1a3d
DateApproved: 10/21/2026
MetaDescription: Review and undo agent edits in {% data variables.product.prodname_vscode %} with working sets, diffs, and checkpoints.
---
# Review and revert agent changes

Use this guide to review agent changes, request revisions, and undo unwanted edits in a folder, worktree, or cloud session.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to build an app with AI agents in {% data variables.product.prodname_vscode_shortname %}.

* [Start agentic coding tutorial](/docs/agents/agents-tutorial.md)

</div>

<a name="review-agent-changes"></a>

## Choose your review approach

You can review agent changes in diffs. Depending on your harness and window, a working set also lets you keep or undo individual changes, files, or all pending edits. Use the table to find the review controls available for your setup.

| Setup | Primary review approach |
|-------|-------------------------|
| {% data variables.product.prodname_copilot_short %} harness in the editor window | [Review pending edits in the working set](#review-pending-edits-with-the-working-set). You can also [compare diffs](#review-changes-by-comparing-diffs). |
| Claude or Codex harness in the editor window | [Compare saved changes in diffs](#compare-editor-session-changes). |
| {% data variables.copilot.agents_window %} | [Compare diffs in the **Changes** view](#review-changes-in-the-agents-window). |
| Cloud session | [Review pull request diffs](#review-sessions-and-cloud-pull-requests). |
| Local harness | [Review pending edits](#review-pending-edits-with-the-working-set). See also [Local-specific behavior](#local-harness-specific-behavior). |

To check which harness your session uses, see [Identify your current agent harness](/docs/agents/run/agent-harnesses.md#identify-your-current-harness).

Agents can change files through editing tools, terminal commands, scripts, and MCP tools. Review the resulting files before you commit or integrate them, including changes that might not appear in a tool-specific list.

For keyboard and screen reader access to a diff, use the [Accessible Diff Viewer](/docs/configure/accessibility/accessibility.md#diff-editor-accessibility), which presents changes in a unified patch format.

<a name="review-copilot-working-set-changes"></a>

## Review pending edits with the working set

When you use {% data variables.product.prodname_copilot_short %} and Local harness sessions in the editor window, supported file edits are tracked as pending review (working set). **Keep** retains the changes and clears their pending-review state. **Undo** reverts them without rewinding the agent conversation.

Pending edits are already saved to disk, so running your application or tests uses the changed files. You don't need Git to review them, and **Keep** doesn't stage or commit them.

To review pending edits:

1. Open a file from the changed-files list in the {% data variables.copilot.chat_view %}.

1. Review the highlighted changes in the editor. Use the `kbstyle(Up)` and `kbstyle(Down)` controls in the editor overlay to navigate between edits.

1. Select **Keep** or **Undo** beside an individual change, or use the file-level or all-files review controls to resolve multiple pending edits at once.

<!-- TODO: Add a screenshot showing the Copilot working set above the chat input and the inline Keep and Undo controls in the editor. -->

Staging changes in the Source Control view automatically keeps the corresponding pending edits.

> [!NOTE]
> The working set only tracks changes from supported agent edit tools. Changes made through terminal commands, scripts, or other untracked tools don't appear. Review these changes separately, and use Source Control to inspect changed and untracked files when the folder uses Git.

### Configure review controls

* `setting(chat.editor.workingSet.enabled)` `feature(editor-working-set)` ({% data variables.product.prodname_copilot_short %} only): Show the working set. Defaults to `true`.

* `setting(chat.editing.revealNextChangeOnResolve)`: Set to `false` to stay at the current change after keeping or undoing an edit, instead of navigating to the next pending change.

## Review changes by comparing diffs

For Claude or Codex harness sessions in the editor window, the {% data variables.copilot.agents_window %}, and cloud sessions, compare diffs instead of keeping or undoing pending edits.

<a name="compare-editor-session-changes"></a>

In the editor window, a pill above the chat input shows the number of affected files and diff statistics. {% data variables.product.prodname_copilot_short %} harness sessions can use this presentation by selecting **Show Pill** from the working set context menu.

Use any of these review options:

* Select the changed-files pill to open a multi-diff editor with all changes.

* Select a changed file in the agent's response to open its diff.

* In the editor, use the [Source Control view](/docs/sourcecontrol/staging-commits.md) to review changed and untracked files when the folder uses Git.

### Review changes in the {% data variables.copilot.agents_window %}

1. Open the **Changes** view in the side panel by using the layout controls in the title bar, or use the `kb(workbench.action.toggleAuxiliaryBar)` keyboard shortcut.

1. Select a file in the **Changes** view to open a diff of the agent's edits.

    **Other Files** groups edits outside the workspace, such as session plans, which aren't committed with workspace changes. Also check Source Control for untracked files and changes made outside tracked edit tools.

    > [!TIP]
    > Use the **Branch Changes** dropdown to choose which changeset to review.

1. Select **Mark as Reviewed** in a file's toolbar to track files you've reviewed in the **Branch Changes** changeset.

The reviewed state clears if you or the agent changes the file again.

<a name="review-sessions-and-cloud-pull-requests"></a>

### Review cloud changes

Review the session's pull request on GitHub, or check out its branch locally to inspect and revise the changes.

### Customize change review in the {% data variables.copilot.agents_window %}

By default, selecting a file in the **Changes** view opens a multi-file diff editor with all the session changes. To open a focused single-file diff, enable `setting(sessions.changes.openSingleFileDiff)`.

Use the diff toolbar to show the editor beside chat or in a modal window. Select **More Actions** (**...**) > **Diff View** to choose **Inline**, **Side by Side**, or **Automatic**. **Automatic** switches to inline when the editor is too narrow for side-by-side diffs.

#### Configure word wrap in diff editors

`feature(agents-window-word-wrap)`

Control how diff editors in the **Changes** view wrap long lines with `setting(sessions.diffEditor.wordWrap)`. This setting has the following values:

* `inherit` (default): Follow the `setting(editor.wordWrap)` setting.
* `on`: Wrap lines at the editor viewport width.
* `off`: Never wrap lines.

This setting is independent of [word wrap in code editors](/docs/agents/run/agents-window-configuration.md#configure-word-wrap-for-code-editors).

To change it from a diff editor, select **More Actions** (**...**) > **Word Wrap**.

#### Review changes in the single-pane layout (Experimental)

When you enable the [experimental single-pane editor panel](/docs/agents/run/agents-window-configuration.md#use-the-single-pane-editor-panel-experimental), the **Changes** view and diff editor share one docked pane.

Use **Expand All Diffs** or **Collapse All Diffs** to control all files at once. The `kb(toggle.diff.renderSideBySide)` keybinding toggles the preferred diff view in the {% data variables.copilot.agents_window %}.

The Changes editor restores each file's expanded or collapsed state when you switch sessions or reload the window. The editor tab title shows the next integration action, such as **Create Pull Request**, and switches to an icon when space is limited.

## Provide feedback and request revisions

You can ask the agent to revise its work from any review workflow. Send a follow-up prompt, edit the files directly, or provide inline feedback in the {% data variables.copilot.agents_window %}.

### Provide inline feedback to the agent

1. In the {% data variables.copilot.agents_window %}, open a file from the **Changes** view.

1. Select a range of code in the diff, and enter feedback in the inline comment box.

1. Add feedback to other changes as needed, and then select **Submit Feedback** to send all comments to the agent.

The agent reads your comments, makes the requested edits, and resolves each comment. Resolved comments disappear from the diff view.

### Add pull request review comments

`feature(agents-window-pr-comments)`

In the {% data variables.copilot.agents_window %}, publish review comments to a session's open GitHub pull request when it uses the {% data variables.product.prodname_copilot_short %} or Claude harness, or the [experimental Codex integration](/docs/agents/run/agent-harnesses.md#codex).

1. Enable the `setting(chat.experimental.agentsWindowPRComments)` setting.

1. Open a changed file from the **Changes** view and select a range of code.

1. Select **Add Feedback** and enter your comment.

1. Select **Add PR Comment** to publish the review comment. If the session is associated with multiple pull requests, the action identifies the target as `owner/repository#number`.

The selected range must contain only lines that are part of the pull request diff. If the range isn't eligible, {% data variables.product.prodname_vscode_shortname %} reports that a pull request comment can't be added to the line.

**Add PR Comment** publishes the comment to GitHub and doesn't send it to the agent. To request a code change, add the comment as feedback and select **Submit Feedback**.

### Get a second opinion with Rubber Duck

`feature(rubber-duck)`

In a [{% data variables.product.prodname_copilot_short %} harness session](/docs/agents/run/agent-harnesses.md#copilot), Rubber Duck uses a complementary model to review plans, code, and tests for substantive issues. It is read-only and doesn't edit files or run commands that change your environment.

The harness might consult Rubber Duck automatically during non-trivial work. To request a review yourself, ask:

```prompt
Get a second opinion on the changes made so far.
```

You can also enter `/rubber-duck <question>`, such as `/rubber-duck What edge cases are missing?`. The harness summarizes the critique and decides how to act on it.

> [!NOTE]
> Rubber Duck requires a Claude or GPT model in the main session and an available complementary model. The additional model pass adds latency and model usage.

Learn more about the [Rubber Duck agent](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/rubber-duck).

<a name="edit-requests-and-restore-checkpoints"></a>

## Undo changes at the right scope

Choose a recovery action based on how much work you want to undo:

| Action | Applies to | Effect |
|--------|------------|--------|
| [**Undo** pending edits](#review-copilot-working-set-changes) | {% data variables.product.prodname_copilot_short %} editor working sets | Reverts an individual change, a file, or all pending edits without rewinding the conversation. |
| [Edit a previous request](#edit-a-previous-chat-request) | Sessions that support request editing | Reverts file changes from that request and later requests, then resends the revised request. |
| [Restore a checkpoint](#restore-a-checkpoint) | Sessions with **Restore Checkpoint** | Restores affected workspace files to the checkpoint and removes subsequent conversation turns. |
| [Discard with Source Control](/docs/sourcecontrol/staging-commits.md#discard-changes) | Folders that use Git | Reverts selected repository changes without changing the conversation. |
| Use an external service's recovery controls | Deployments, issues, databases, and other external state | Reverses effects that checkpoints and Git don't control. |
| [**Undo** pending edits](#review-pending-edits-with-the-working-set) | Local harness sessions | Reverts an individual change, a file, or all pending edits without rewinding the conversation. |

For help choosing an action, see [Get an agent back on track](/docs/agents/guides/get-agent-back-on-track.md#choose-a-recovery-action).

### Edit a previous chat request

In sessions that support request editing, you can edit a previous request in your conversation history. {% data variables.product.prodname_vscode_shortname %} reverts file changes made by that request and subsequent requests, and then sends the updated request to the language model.

Before you resend the request, review the affected changes so you understand which work will be removed. Select the request in the conversation, modify it, and resend it. Configure or turn off request editing with `setting(chat.editRequests)`.

<video src="../images/chat-checkpoints/chat-edit-request.mp4" title="Video showing the editing of a previous chat request in the {% data variables.copilot.chat_view %}." loop controls muted></video>

### Restore a checkpoint

Checkpoints are enabled by default for supported chat sessions. Before processing each request, {% data variables.product.prodname_vscode_shortname %} creates a snapshot of affected workspace files. Set `setting(chat.checkpoints.enabled)` to control checkpoints.

To restore your workspace to an earlier checkpoint:

1. Navigate to a previous request in the conversation.

1. Hover over the request and select **Restore Checkpoint**.

    ![Screenshot showing the Restore Checkpoint action in the {% data variables.copilot.chat_view %}.](../images/chat-checkpoints/chat-restore-checkpoint.png)

1. Confirm that you want to restore the checkpoint.

{% data variables.product.prodname_vscode_shortname %} removes subsequent requests from the conversation history and restores the workspace files to their state at the checkpoint.

> [!IMPORTANT]
> A checkpoint restores affected workspace files and chat history. It doesn't reverse completed terminal commands, network requests, deployments, or changes that tools made to external services. Use Git and the external service's recovery controls for those effects.

## Require approval before sensitive edits

Sensitive-file approval happens before the agent saves an edit, rather than during review. Use `setting(chat.tools.edits.autoApprove)` with glob patterns to require a diff and approval for edits to sensitive files.

This example automatically approves edits except to JSON files in the `.vscode` folder and files named `.env`:

```json
"chat.tools.edits.autoApprove": {
  "**/*": true,
  "**/.vscode/*.json": false,
  "**/.env": false
}
```

## Local harness-specific behavior

Local harness sessions and existing extension-host sessions use the [shared review process](#review-pending-edits-with-the-working-set). In these sessions, discarding changes in Source Control also discards their pending edits.

### Auto-accept edits

For Local harness sessions, use `setting(chat.editing.autoAcceptDelay)` to automatically keep pending edits after a configurable delay. Hover over the editor overlay controls to stop the countdown.

> [!IMPORTANT]
> If you automatically keep all edits, review the changes before you commit them in Source Control. Learn more about the [security considerations of using AI in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/run/security.md).

## Related resources

* [Delegate two tasks without mixing their changes](/docs/agents/guides/delegate-two-tasks.md)
* [Agent sessions](/docs/agents/run/sessions/manage-sessions.md)
* [Security considerations for using AI in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/run/security.md)
