---
ContentId: 8d3f4a2e-9b1c-4f5e-a8d7-2c4b6e9f1a3d
DateApproved: 7/29/2026
MetaDescription: Review, revise, revert, and integrate AI-generated code changes in {% data variables.product.prodname_vscode %} with diffs, feedback, checkpoints, and Source Control.
MetaSocialImage: ../../images/shared/github-copilot-social.png
---
# Review and revert agent changes

When you work with an agent in {% data variables.product.prodname_vscode %}, it can change multiple files in your project. This article explains how to inspect, revise, integrate, or discard these AI-generated changes.

> [!NOTE]
> You can review AI-generated changes in both the [Chat view](/docs/agents/run/chat-view.md) and the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md). The review experience follows the same concepts, but the user interface differs between the two surfaces.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to experience local, background, and cloud agents in {% data variables.product.prodname_vscode_shortname %}.

* [Start agent handoff tutorial](/docs/agents/agents-handoff-tutorial.md)

</div>

## Review agent changes

The agent applies and saves edits directly in the session's folder or isolated Git worktree. These edits don't have a pending approval state, so you don't need to keep or undo each edit before you continue.

Review the changes as you would other workspace or branch changes through the diff view, Source Control, or pull request workflow.

{% tabs id="chat-surface" %}
{% tab label="Chat view" %}

1. Select a changed file in the agent's response to open its diff or select it from the Source Control view.

1. To see a summary after each completed request, set `setting(chat.checkpoints.showFileChanges)` to `true`. Expand the changed-files summary to see the files and diff statistics, or select **View All File Changes** to open a multi-file diff.

1. If you want to make further changes, send a follow-up prompt or edit the files directly. To revert a request and all later changes, [restore a checkpoint](#restore-a-checkpoint).

1. Run tests and use the debugger or other editor tools to validate the result.

1. When you're satisfied with the changes:

    * For folder-isolated sessions, stage and commit the changes with Source Control.

    * For worktree-isolated sessions, apply or merge the worktree changes into your main workspace.

    * For cloud sessions, review the pull request or check out its branch locally.

{% /tab %}
{% tab label="{% data variables.copilot.agents_window %}" %}

By default, the {% data variables.copilot.agents_window %} shows these views in a side panel:

* **Files**: a file explorer for the session workspace.
* **Changes**: files that the agent changed, added, or deleted. Use the **Branch Changes** dropdown to choose which changeset to review.

The **Changes** view groups edits outside the workspace under **Other Files**. These files, such as plans in the session-state folder, aren't committed with workspace changes. The list includes files changed through file-edit tools, but not files that the agent only reads or changes through terminal commands.

To review and integrate the changes:

1. Select a file in the **Changes** view to open a diff view of the agent's edits.

    ![Screenshot showing the Changes panel in the {% data variables.copilot.agents_window %}, highlighting the list of edited files and the diff view.](../images/review-code-edits/agents-window-diff-view.png)

    By default, selecting a file opens a multi-file diff editor with all the session changes. To open a focused single-file diff, enable `setting(sessions.changes.openSingleFileDiff)`.

    Use the diff toolbar to show the editor side by side with chat or in a modal window.

1. Select a range of code in a changed file, select **Add Feedback**, and enter a comment that describes the change you want. Add more comments on other selections or files, and then select **Submit Feedback** to send them to the agent.

    ![Screenshot showing the Add Feedback button in the Changes diff view.](../images/review-code-edits/agents-window-add-feedback.png)

    Markdown files follow the same feedback flow. Open a workspace file from the **Changes** tab and use **Locked** mode in the Markdown editor to add range-based feedback. Feedback stays in sync if you reopen the file in the text editor.

    The agent reads your comments, makes the requested edits, and resolves each comment. Resolved comments disappear from the diff view.

1. Select **Mark as Reviewed** in a file's toolbar to track files you've reviewed in the **Branch Changes** changeset. The reviewed state clears if you or the agent changes the file again.

1. Use the **Commit**, **Merge**, **Checkout**, or **Discard** actions to act on the edits.

When you create a session, use the sync button in the **Files** panel to pull upstream changes from the base branch before the agent starts. Starting from the latest branch state reduces merge conflicts when you integrate the result.

### Review changes in the single-pane layout (Experimental)

When you enable the [experimental single-pane editor panel](/docs/agents/run/agents-window.md#use-the-single-pane-editor-panel-experimental), the **Changes** view and diff editor share one docked pane.

Use **Show Side by Side Diff** or **Show Inline Diff** to change the diff layout. Use **Expand All Diffs** or **Collapse All Diffs** to control all files at once. A keybinding for `kb(toggle.diff.renderSideBySide)` also works in the {% data variables.copilot.agents_window %}.

The Changes editor restores each file's expanded or collapsed state when you switch sessions or reload the window. The editor tab title shows the next integration action, such as **Create Pull Request**, and switches to an icon when space is limited.

{% /tab %}
{% /tabs %}

## Integrate worktree changes

A worktree session keeps the agent's branch and working files separate from your primary worktree. After you review and validate the result, choose how to continue:

* **Apply or migrate the changes**: transfer the worktree changes into your current workspace for further editing and commit them with your existing work.
* **Commit or merge the branch**: preserve the work on the session branch and merge it into the destination branch.
* **Check out the branch**: open the session branch in an editor window to continue working on it manually.
* **Discard the changes**: remove changes that you don't want to keep.

Before you apply or merge changes:

1. Confirm the session's base branch and the destination branch in your primary workspace.
1. Commit or stash unrelated changes in the destination workspace.
1. Review all changed files, including untracked files, and run the relevant tests.
1. Select the integration action and resolve any merge conflicts.
1. Test the integrated result before you archive or delete the session.

The available actions and labels depend on the session harness and whether you use the Chat view or {% data variables.copilot.agents_window %}. Keep the session until you verify that the changes are present on the intended destination branch.

## Edit requests and restore checkpoints

Use request editing and checkpoints to revise or undo a batch of changes:

* **Edit a previous request**: modify a prompt you already sent. {% data variables.product.prodname_vscode_shortname %} reverts changes made by that request and all subsequent requests, then resends the edited prompt.
* **Restore a checkpoint**: roll back all file changes to a specific point in the conversation without changing the prompt.

### Edit a previous chat request

Each request in your conversation history is editable. When you edit a previous request, {% data variables.product.prodname_vscode_shortname %} reverts file changes made by the original request and subsequent requests, and then sends the updated request to the language model.

Select the request in the conversation, modify it, and resend it. Configure or turn off request editing with `setting(chat.editRequests)`.

<video src="../images/chat-checkpoints/chat-edit-request.mp4" title="Video showing the editing of a previous chat request in the Chat view." loop controls muted></video>

### Restore a checkpoint

When checkpoints are enabled, {% data variables.product.prodname_vscode_shortname %} creates a snapshot of affected files before processing each request. Set `setting(chat.checkpoints.enabled)` to control checkpoints.

To restore your workspace to an earlier checkpoint:

1. Navigate to a previous request in the conversation.

1. Hover over the request and select **Restore Checkpoint**.

    ![Screenshot showing the Restore Checkpoint action in the Chat view.](../images/chat-checkpoints/chat-restore-checkpoint.png)

1. Confirm that you want to restore the checkpoint.

{% data variables.product.prodname_vscode_shortname %} removes subsequent requests from the conversation history and restores the workspace files to their state at the checkpoint.

#### Redo after restoring

After restoring a checkpoint, select **Redo** to recover the changes that were undone.

![Screenshot showing the Redo button after restoring a checkpoint.](../images/chat-checkpoints/chat-redo-checkpoint.png)

#### View file changes in checkpoints

Set `setting(chat.checkpoints.showFileChanges)` to show the files changed by each request and the number of lines added or removed. Use this summary to understand the effect of a request before restoring its checkpoint.

![Screenshot showing file changes associated with a chat checkpoint.](../images/chat-checkpoints/chat-checkpoint-changed-files.png)

#### Fork from a checkpoint

Hover over a request and select **Fork Conversation** to create an independent session that includes the conversation up to that checkpoint. Learn more about [forking agent sessions](/docs/agents/run/sessions/manage-sessions.md#fork-a-chat-session).

> [!NOTE]
> Checkpoints are temporary and don't replace Git version control. Use Git for permanent version history and collaboration.

<details>
<summary>Review extension-host changes</summary>

If [agent host](/docs/agents/concepts/agent-host.md) is not enabled or you are working with an older session, the agent uses the extension host to make edits, which has a different workflow for reviewing changes.

After the agent edits and saves a file, {% data variables.product.prodname_vscode_shortname %} marks the edits as pending. Files with pending edits have a squared-dot indicator in the Explorer view and editor tabs. The pending state is restored when you reopen {% data variables.product.prodname_vscode_shortname %}.

![Screenshot showing the Chat view, highlighting the changed files list and the indicator in the Explorer view and editor tabs.](../images/review-code-edits/copilot-edits-changed-files-full.png)

To review pending edits:

1. Open a file from the changed-files list in the Chat view or from the Explorer view.

    ![Screenshot showing the Editor with proposed changes, highlighting the review controls in the editor overlay controls.](../images/review-code-edits/copilot-edits-file-review-controls.png)

1. Use the `kbstyle(Up)` and `kbstyle(Down)` controls in the editor overlay to navigate between edits.

1. For each edit, choose one of the following actions:

    * Select **Keep** to accept the edit.
    * Select **Undo** to reject the edit and revert the change.
    * Hover over an inline change to accept or reject that specific change without affecting other edits in the file.

You can also accept or reject all pending edits from the Chat view. When you resolve an edit, the editor automatically opens the next file with pending edits. To stay in the current file, set `setting(chat.editing.revealNextChangeOnResolve)` to `false`.

### Source Control integration

If you stage your changes in the Source Control view, any pending edits are automatically accepted. If you discard your changes, any pending edits are also discarded.

### Auto-accept edits

Use `setting(chat.editing.autoAcceptDelay)` to automatically accept pending edits after a configurable delay. Hover over the editor overlay controls to stop the countdown.

> [!IMPORTANT]
> If you automatically accept all edits, review the changes before you commit them in source control. Learn more about the [security considerations of using AI in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/run/security.md).

</details>

## Edit sensitive files

Sensitive-file approval is separate from reviewing changes after the agent makes them. To prevent inadvertent edits to files such as workspace configuration or environment settings, {% data variables.product.prodname_vscode_shortname %} can show a diff and ask you to approve or reject the edit before it is applied.

Use the `setting(chat.tools.edits.autoApprove)` setting to configure which files require approval. The setting uses glob patterns to match file paths in your workspace.

The following example configuration automatically allows edits to all files except for JSON files in the `.vscode` folder and files named `.env`, which you are prompted to approve:

```json
"chat.tools.edits.autoApprove": {
  "**/*": true,
  "**/.vscode/*.json": false,
  "**/.env": false
}
```

## Review changes from the sessions list

When a session completes and makes code changes to your project, the [sessions list](/docs/agents/run/sessions/manage-sessions.md#sessions-list) shows the file change statistics for that session. To review the changes, select the session from the list to open the session details.

![Screenshot of the file changes diff editor in an agent session.](../images/agents-overview/agent-file-changes-v2.png)

Depending on the agent harness and isolation mode, you can apply or merge changes into your local workspace, or check out the branch from a cloud session.

## Related resources

* [Use chat in {% data variables.product.prodname_vscode_shortname %}](/docs/chat/chat-overview.md)
* [Agent sessions](/docs/agents/run/sessions/manage-sessions.md)
* [Security considerations for using AI in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/run/security.md)
