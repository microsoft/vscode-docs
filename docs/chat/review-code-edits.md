---
ContentId: 8d3f4a2e-9b1c-4f5e-a8d7-2c4b6e9f1a3d
DateApproved: 7/29/2026
MetaDescription: Review AI-generated code changes in VS Code with Agent Host diffs, checkpoints, Source Control, and legacy extension-host edit controls.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Review AI-generated code edits

When you interact with chat in Visual Studio Code, the agent can change multiple files in your project. This article explains how to inspect, revise, integrate, or discard these AI-generated changes.

> [!NOTE]
> You can review AI-generated changes in both the [Chat view](/docs/agents/chat-view.md) and the [Agents window](/docs/agents/agents-window.md). The review experience follows the same concepts, but the user interface differs between the two surfaces.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to experience local, background, and cloud agents in VS Code.

* [Start tutorial](/docs/agents/agents-tutorial.md)

</div>

## Review agent changes

The agent applies and saves edits directly in the session's folder or isolated Git worktree. These edits don't have a pending approval state, so you don't need to keep or undo each edit before you continue.

Review the changes as you would other workspace or branch changes through the diff view, Source Control, or pull request workflow.

{% tabs id="chat-surface" %}
{% tab label="Chat view" %}

1. Select a changed file in the agent's response to open its diff or select it from the Source Control view.

1. To see a summary after each completed request, set `setting(chat.checkpoints.showFileChanges)` to `true`. Expand the changed-files summary to see the files and diff statistics, or select **View All File Changes** to open a multi-file diff.

    <!-- TODO: Add a screenshot showing the Agent Host changed-files summary and View All File Changes action in the Chat view. -->

1. If you want to make further changes, send a follow-up prompt or edit the files directly. To revert a request and all later changes, [restore a checkpoint](/docs/chat/chat-checkpoints.md#restore-a-checkpoint).

1. Run tests and use the debugger or other editor tools to validate the result.

1. When you're satisfied with the changes:

    * For folder-isolated sessions, stage and commit the changes with Source Control.

    * For worktree-isolated sessions, apply or merge the worktree changes into your main workspace.

    * For cloud sessions, review the pull request or check out its branch locally.

{% /tab %}
{% tab label="Agents window" %}

1. Select a file in the **Changes** tab to open a diff view of the agent's edits.

    ![Screenshot showing the Changes panel in the Agents window, highlighting the list of edited files and the diff view.](images/review-code-edits/agents-window-diff-view.png)

    By default, selecting a file opens a multi-file diff editor with all the changes. To open a focused single-file diff editor for the selected file instead, enable the `setting(sessions.changes.openSingleFileDiff)` setting.

1. Select a range of code in a changed file, select **Add Feedback**, and enter a comment that describes the change you want. Add more comments on other selections or files, and then select **Submit Feedback** to send them to the agent.

    ![Screenshot showing the Add Feedback button in the Changes diff view.](images/review-code-edits/agents-window-add-feedback.png)

    Markdown files follow the same feedback flow. Open the file from the **Changes** tab and use **Locked** mode in the Markdown editor to add range-based feedback.

    The agent reads your comments, makes the requested edits, and resolves each comment. Resolved comments disappear from the diff view.

1. Use the **Commit**, **Merge**, **Checkout**, or **Discard** actions to act on the edits.

For more information, see [Manage and review file changes](/docs/agents/agents-window.md#manage-and-review-file-changes).

{% /tab %}
{% /tabs %}

<details>
<summary>Review extension-host changes</summary>

If you don't have the agent host enabled (`setting(chat.agentHost.enabled)` is `false`) or are working with an older session, the agent uses the extension host to make edits, which has a different workflow for reviewing changes.

After the agent edits and saves a file, VS Code marks the edits as pending. Files with pending edits have a squared-dot indicator in the Explorer view and editor tabs. The pending state is restored when you reopen VS Code.

![Screenshot that shows the Chat view, highlighting the changed files list and the indicator in the Explorer view and editor tabs.](images/review-code-edits/copilot-edits-changed-files-full.png)

To review pending edits:

1. Open a file from the changed-files list in the Chat view or from the Explorer view.

    ![Screenshot showing the Editor with proposed changes, highlighting the review controls in the editor overlay controls.](images/review-code-edits/copilot-edits-file-review-controls.png)

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
> If you automatically accept all edits, review the changes before you commit them in source control. Learn more about the [security considerations of using AI in VS Code](/docs/agents/security.md).

</details>

## Edit sensitive files

Sensitive-file approval is separate from reviewing changes after the agent makes them. To prevent inadvertent edits to files such as workspace configuration or environment settings, VS Code can show a diff and ask you to approve or reject the edit before it is applied.

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

When a session completes and makes code changes to your project, the [sessions list](/docs/chat/chat-sessions.md#sessions-list) shows the file change statistics for that session. To review the changes, select the session from the list to open the session details.

![Screenshot of the file changes diff editor in an agent session.](images/agents-overview/agent-file-changes-v2.png)

Depending on the agent harness and isolation mode, you can apply or merge changes into your local workspace, or check out the branch from a cloud session.

## Related resources

* [Revert changes with checkpoints](/docs/chat/chat-checkpoints.md)
* [Use chat in VS Code](/docs/chat/chat-overview.md)
* [Chat sessions](/docs/chat/chat-sessions.md)
* [Security considerations for using AI in VS Code](/docs/agents/security.md)
