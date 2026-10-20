---
ContentId: 8d3f4a2e-9b1c-4f5e-a8d7-2c4b6e9f1a3d
DateApproved: 10/21/2026
MetaDescription: Review, revise, and revert AI changes in {% data variables.product.prodname_vscode %} with diffs, checkpoints, and Source Control.
---
# Review and revert agent changes

When you work with an agent in {% data variables.product.prodname_vscode %}, it can change multiple files in your project. This article explains how to inspect, revise, integrate, or discard these AI-generated changes.

The available review controls depend primarily on the agent harness:

| Session | How changes are tracked | Review workflow |
|---------|-------------------------|-----------------|
| Copilot, Claude, and Codex harness sessions | Edits are saved directly in the session's folder or isolated Git worktree. They don't wait in a pending review state. | Inspect diffs in the {% data variables.copilot.chat_view %}, {% data variables.copilot.agents_window %}, or Source Control. Use checkpoints or Git to revert unwanted changes. |
| Local harness sessions and existing extension-host sessions | Edits are saved directly. Supported edits are also marked as pending. | Inspect each pending edit in the editor. Use **Keep** to acknowledge it or **Undo** to revert it. |
| Cloud sessions | Changes are committed to a branch and returned through a pull request. | Review the pull request on GitHub or check out the branch locally. |

> [!NOTE]
> The change-review experience for Copilot harness sessions is [under active development](https://github.com/microsoft/vscode/issues/339363#issuecomment-6134276862). The user interface and available controls might change in upcoming releases.

> [!NOTE]
> Claude and Codex harnesses are disabled when [{% data variables.product.prodname_copilot_short %} enterprise-managed settings apply](/docs/enterprise/manage-ai-settings.md#claude-and-codex-availability). Contact the IT team that deployed the settings to discuss access.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to build an app with AI agents in {% data variables.product.prodname_vscode_shortname %}.

* [Start agentic coding tutorial](/docs/agents/agents-tutorial.md)

</div>

## Review agent changes

Agents can change files through editing tools, terminal commands, scripts, and MCP tools. Review the resulting files before you commit or integrate them, including changes that might not appear in a tool-specific list of edits.

For keyboard and screen reader access to a diff, use the [Accessible Diff Viewer](/docs/configure/accessibility/accessibility.md#diff-editor-accessibility), which presents changes in a unified patch format.

The {% data variables.copilot.chat_view %} and {% data variables.copilot.agents_window %} provide different ways to inspect saved changes.

{% tabs id="chat-surface" %}
{% tab label="{% data variables.copilot.chat_view %}" %}

1. Above the chat input, a pill indicates the number of affected files and diff statistics. Select the pill to view a multi-diff editor with all the changes.

1. Select a changed file in the agent's response to open its diff in the editor.

1. Use the [Source Control view](/docs/sourcecontrol/staging-commits.md) to see the list of changed files and any untracked files. Select a file to open its diff in the editor.

1. To request revisions, send a follow-up prompt or edit the files directly in the editor.

<!-- To see a summary after each completed request, set `setting(chat.checkpoints.showFileChanges)` to `true`. Expand the changed-files summary to see the files and diff statistics, or select **View All File Changes** to open a multi-file diff. -->

{% /tab %}
{% tab label="{% data variables.copilot.agents_window %}" %}

1. Open the **Changes** view in the side panel by using the layout controls in the title bar, or using the `kb(workbench.action.toggleAuxiliaryBar)` keyboard shortcut.

1. Select a file in the **Changes** view to open a diff of the agent's edits.

    The **Changes** view groups edits outside the workspace under **Other Files**. These files, such as plans in the session-state folder, aren't committed with workspace changes. Files changed only through terminal commands or scripts might not appear in tool-specific change tracking. Review the session's folder or worktree in Source Control as well, including untracked files.

    > [!TIP]
    > Use the **Branch Changes** dropdown to choose which changeset to review.

1. To provide feedback, select a range of code in a changed file, and enter feedback in the inline comment box that appears.

1. Continue reviewing and providing feedback on other changes as needed. Select **Submit Feedback** to send them to the agent.

    The agent reads your comments, makes the requested edits, and resolves each comment. Resolved comments disappear from the diff view.

1. Select **Mark as Reviewed** in a file's toolbar to track files you've reviewed in the **Branch Changes** changeset. The reviewed state clears if you or the agent changes the file again.

{% /tab %}
{% /tabs %}

### Review changes from the sessions list

When a session completes and makes code changes to your project, the [sessions list](/docs/agents/run/sessions/manage-sessions.md#sessions-list) shows the file change statistics for that session. Select the session to open its details and review the changes.

![Screenshot of the file changes diff editor in an agent session.](../images/agents-overview/agent-file-changes-v2.png)

Depending on the agent harness and isolation mode, you can apply or merge changes into your local workspace, or check out the branch from a cloud session.

### Add pull request review comments

`feature(agents-window-pr-comments)`

For a session that uses the Copilot or Claude harness, or the [experimental Codex integration](/docs/agents/run/agent-harnesses.md#codex), you can add a review comment to its open GitHub pull request directly from the **Changes** view in the {% data variables.copilot.agents_window %}. This is different from agent feedback, which asks the agent to revise its changes.

1. Enable the `setting(chat.experimental.agentsWindowPRComments)` setting.

1. Open a changed file from the **Changes** view and select a range of code.

1. Select **Add Feedback** and enter your comment.

1. Select **Add PR Comment** to add the review comment to the pull request. If the session is associated with multiple pull requests, the action identifies the target as `owner/repository#number`.

The selected range must contain only lines that are part of the pull request diff. If the range isn't eligible, {% data variables.product.prodname_vscode_shortname %} reports that a pull request comment can't be added to the line.

**Add PR Comment** adds the comment to GitHub and doesn't send it to the agent. To ask the agent to change the code instead, add the comment as feedback and select **Submit Feedback**.

### Customize change review in the {% data variables.copilot.agents_window %}

By default, selecting a file in the **Changes** view opens a multi-file diff editor with all the session changes. To open a focused single-file diff, enable `setting(sessions.changes.openSingleFileDiff)`.

Use the diff toolbar to show the editor side by side with chat or in a modal window. To change the diff layout, select **More Actions** (**...**) > **Diff View**, and then select **Inline**, **Side by Side**, or **Automatic**. With **Automatic**, the Changes editor shows files side by side when there is enough space and switches to inline when the editor is narrow.

#### Configure word wrap in diff editors

`feature(agents-window-word-wrap)`

Control how diff editors in the **Changes** view wrap long lines with `setting(sessions.diffEditor.wordWrap)`. This setting has the following values:

* `inherit` (default): Follow the `setting(editor.wordWrap)` setting.
* `on`: Wrap lines at the editor viewport width.
* `off`: Never wrap lines.

This setting only affects diff editors and doesn't affect code editors in the {% data variables.copilot.agents_window %}. To configure word wrapping in code editors, see [Configure word wrap for code editors](/docs/agents/run/agents-window-configuration.md#configure-word-wrap-for-code-editors).

To change this setting from a diff editor, select **More Actions** (**...**) > **Word Wrap**. This action updates `setting(sessions.diffEditor.wordWrap)` independently of the code editor setting.

#### Review changes in the single-pane layout (Experimental)

When you enable the [experimental single-pane editor panel](/docs/agents/run/agents-window-configuration.md#use-the-single-pane-editor-panel-experimental), the **Changes** view and diff editor share one docked pane.

Use **Expand All Diffs** or **Collapse All Diffs** to control all files at once. The `kb(toggle.diff.renderSideBySide)` keybinding toggles the preferred diff view in the {% data variables.copilot.agents_window %}.

The Changes editor restores each file's expanded or collapsed state when you switch sessions or reload the window. The editor tab title shows the next integration action, such as **Create Pull Request**, and switches to an icon when space is limited.

<a name="review-local-session-changes"></a>

## Review Local harness session changes

The following controls apply when you select **Local** from the **Session Target** UI control or continue an existing extension-host session in the {% data variables.copilot.chat_view %}. These sessions track supported file edits as pending changes that you can keep or undo individually.

After the agent edits and saves a file, {% data variables.product.prodname_vscode_shortname %} marks the edits as pending. Pending means that you can keep or undo the saved edit. It doesn't mean that the edit is waiting to be written to disk. Files with pending edits have a squared-dot indicator in the Explorer view and editor tabs. The pending state is restored when you reopen {% data variables.product.prodname_vscode_shortname %}.

![Screenshot showing the {% data variables.copilot.chat_view %}, highlighting the changed files list and the indicator in the Explorer view and editor tabs.](../images/review-code-edits/copilot-edits-changed-files-full.png)

To review pending edits:

1. Open a file from the changed-files list in the {% data variables.copilot.chat_view %} or from the Explorer view.

    ![Screenshot showing the Editor with proposed changes, highlighting the review controls in the editor overlay controls.](../images/review-code-edits/copilot-edits-file-review-controls.png)

1. Use the `kbstyle(Up)` and `kbstyle(Down)` controls in the editor overlay to navigate between edits.

1. For each edit, choose one of the following actions:

    * Select **Keep** to acknowledge the saved edit and clear its pending-review state.
    * Select **Undo** to reject and revert the edit.
    * Hover over an inline change to keep or undo that specific change without affecting other edits in the file.

You can also keep or undo all pending edits from the {% data variables.copilot.chat_view %}. When you resolve an edit, the editor automatically opens the next file with pending edits. To stay in the current file, set `setting(chat.editing.revealNextChangeOnResolve)` to `false`.

### Source Control integration

If you stage your changes in the Source Control view, any pending edits are automatically kept. If you discard your changes, any pending edits are also discarded.

### Auto-accept edits

Use `setting(chat.editing.autoAcceptDelay)` to automatically keep pending edits after a configurable delay. Hover over the editor overlay controls to stop the countdown.

> [!IMPORTANT]
> If you automatically keep all edits, review the changes before you commit them in source control. Learn more about the [security considerations of using AI in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/run/security.md).

## Validate and revise changes

Before you integrate agent changes:

1. Review all changed and untracked files in Source Control.

1. Run the relevant tests.

1. Use the debugger, language diagnostics, or other editor tools to validate the result.

1. Send a follow-up prompt, add feedback in the {% data variables.copilot.agents_window %}, or edit the files directly to correct issues.

### Get a second opinion with Rubber Duck

`feature(rubber-duck)`

In a [Copilot harness session](/docs/agents/run/agent-harnesses.md#copilot), use Rubber Duck to get a second opinion on the agent's plans, code, and tests. This built-in, read-only critic uses a complementary model to look for substantive issues, such as logic errors, design flaws, security vulnerabilities, and missing test coverage. Rubber Duck groups its feedback into blocking issues, non-blocking issues, and suggestions. The Copilot harness summarizes the critique and decides how to act on it, but Rubber Duck doesn't edit files or run commands that change your environment.

For non-trivial work, the Copilot harness might consult Rubber Duck automatically at key points, such as:

* After creating a plan, before implementation.
* During a complex implementation.
* After writing tests.
* After repeated failures or unexpected results.

For smaller tasks, the Copilot harness typically skips this review. To request a review at any time, ask the agent in natural language:

```prompt
Get a second opinion on the changes made so far.
```

You can also enter `/rubber-duck <question>` in the chat input. For example, enter `/rubber-duck What edge cases are missing?`.

> [!NOTE]
> Rubber Duck is available only when the main session uses a Claude or GPT model and a suitable complementary model is available. The additional model pass adds latency and model usage.

Learn more about the [Rubber Duck agent](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/rubber-duck) in the GitHub documentation.

<a name="edit-requests-and-restore-checkpoints"></a>

## Undo changes at the right scope

Choose a recovery action based on how much work you want to undo:

| Action | Scope | What happens |
|--------|-------|--------------|
| [**Undo** in a Local harness session](#review-local-harness-session-changes) | One pending edit, an inline change, or all pending edits | Reverts the selected saved edits without rewinding the conversation. |
| [Edit a previous request](#edit-a-previous-chat-request) | The selected request and every later request | Reverts their file changes and resends the revised request. |
| [Restore a checkpoint](#restore-a-checkpoint) | A request and all later file changes and conversation turns | Restores affected workspace files and removes subsequent conversation turns. |
| [Discard with Source Control](/docs/sourcecontrol/staging-commits.md#discard-changes) | The files or changes you select | Reverts repository changes without changing the conversation. |
| Use an external service's recovery controls | Deployments, issues, pull requests, databases, or other external state | Reverses effects that {% data variables.product.prodname_vscode_shortname %} checkpoints and Git don't control. |

For help choosing an action, see [Get an agent back on track](/docs/agents/guides/get-agent-back-on-track.md#choose-a-recovery-action).

### Edit a previous chat request

Each request in your conversation history is editable. When you edit a previous request, {% data variables.product.prodname_vscode_shortname %} reverts file changes made by the original request and subsequent requests, and then sends the updated request to the language model.

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

## Integrate approved changes

After you review and validate the result, choose the integration workflow for the session:

* **Folder-isolated session**: stage and commit the intended changes with Source Control.
* **Worktree-isolated session**: apply the changes to your current workspace, merge or check out the session branch, or discard the worktree.
* **Cloud session**: review and merge the pull request, or check out its branch locally for more changes.

### Integrate worktree changes

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

The available actions and labels depend on the selected harness and whether you use the {% data variables.copilot.chat_view %} or {% data variables.copilot.agents_window %}. Keep the session until you verify that the changes are present on the intended destination branch.

For a walkthrough of reviewing two results separately, integrating them one at a time, and testing the combined change, follow [Delegate two tasks without mixing their changes](/docs/agents/guides/delegate-two-tasks.md).

<a name="edit-sensitive-files"></a>

## Require approval before sensitive edits

Sensitive-file approval is separate from reviewing changes after the agent saves them. To prevent inadvertent edits to files such as workspace configuration or environment settings, {% data variables.product.prodname_vscode_shortname %} can show a diff and ask you to approve or reject the edit before it is applied.

Use the `setting(chat.tools.edits.autoApprove)` setting to configure which files require approval. The setting uses glob patterns to match file paths in your workspace.

The following example configuration automatically allows edits to all files except for JSON files in the `.vscode` folder and files named `.env`, which you are prompted to approve:

```json
"chat.tools.edits.autoApprove": {
  "**/*": true,
  "**/.vscode/*.json": false,
  "**/.env": false
}
```

## Related resources

* [Use chat in {% data variables.product.prodname_vscode_shortname %}](/docs/chat/chat-overview.md)
* [Agent sessions](/docs/agents/run/sessions/manage-sessions.md)
* [Security considerations for using AI in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/run/security.md)
