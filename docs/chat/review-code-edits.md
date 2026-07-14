---
ContentId: 8d3f4a2e-9b1c-4f5e-a8d7-2c4b6e9f1a3d
DateApproved: 7/15/2026
MetaDescription: Learn how to review and manage AI-generated code edits in Visual Studio Code chat.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Review AI-generated code edits

When you interact with chat in Visual Studio Code, the agent can generate code edits across multiple files in your project. This article explains how to review, accept, or discard these AI-generated code edits.

> [!NOTE]
> You can review AI-generated edits in both the [Chat view](/docs/agents/chat-view.md) and the [Agents window](/docs/agents/agents-window.md). The review experience follows the same concepts but the user interface might differ between the two surfaces.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to experience local, background, and cloud agents in VS Code.

* [Start tutorial](/docs/agents/agents-tutorial.md)

</div>

## Pending changes

After the agent updates your files, VS Code applies and saves the edits to disk. VS Code keeps track of which files have pending edits and lets you review them individually or all at once.

{% tabs id="chat-surface" %}
{% tab label="Agents window" %}

In the Agents window, the dedicated **Changes** panel lists the edited files and shows their diff stats. Select a file to open its diff view.

![Screenshot showing the Changes panel in the Agents window, highlighting the Changes and Files tabs and the list of edited files.](images/agents-window/agents-window-changes.png)

For more information about the Changes panel, see [Manage and review file changes](/docs/agents/agents-window.md#manage-and-review-file-changes).

{% /tab %}
{% tab label="Chat view" %}

The Chat view shows the list of files that were edited and are pending your review. Files with pending edits also have a squared-dot icon indicator in the Explorer view and editor tabs.

![Screenshot that shows the Chat view, highlighting the changed files list and the indicator in the Explorer view and editor tabs.](images/review-code-edits/copilot-edits-changed-files-full.png)

When you open a file that was changed, the editor shows an inline diff of the applied changes.

{% /tab %}
{% /tabs %}

When you close VS Code, the status of the pending edits is remembered and restored when you reopen VS Code.

## Review changes

How you review AI-generated edits depends on which surface you use. In the Chat view, you review edits directly in the editor. In the Agents window, you review edits in the dedicated Changes panel.

{% tabs id="chat-surface" %}
{% tab label="Agents window" %}

In the Agents window, you review edits in the dedicated **Changes** panel instead of the editor overlay:

1. Select a file in the **Changes** tab to open a diff view of the agent's edits.

    ![Screenshot showing the Changes panel in the Agents window, highlighting the list of edited files and the diff view.](images/review-code-edits/agents-window-diff-view.png)

    By default, selecting a file opens a multi-file diff editor with all the changes. To open a focused single-file diff editor for the selected file instead, enable the `setting(sessions.changes.openSingleFileDiff)` setting.

1. Select a range of code in a changed file, select **Add Feedback**, and enter a comment that describes the change you want. Add more comments on other selections or files, and then select **Submit Feedback** to send them to the agent.

    ![Screenshot showing the Add Feedback button in the Changes diff view.](images/review-code-edits/agents-window-add-feedback.png)

    The agent reads your comments, makes the requested edits, and resolves each comment. Resolved comments disappear from the diff view.

1. Use the **Commit**, **Merge**, **Checkout**, or **Discard** actions to act on the edits.

For more information, see [Manage and review file changes](/docs/agents/agents-window.md#manage-and-review-file-changes).

{% /tab %}
{% tab label="Chat view" %}

To review the AI-generated code edits in a file:

1. Open a file with pending edits by selecting it from the changed files list in the Chat view or from the Explorer view.

    ![Screenshot showing the Editor with proposed changes, highlighting the review controls in the editor overlay controls.](images/review-code-edits/copilot-edits-file-review-controls.png)

1. Use the `kbstyle(Up)` and `kbstyle(Down)` controls in the editor overlay to navigate between individual edits within the file.

1. For each edit, choose one of the following actions:
    * Select **Keep** to accept the edit.
    * Select **Undo** to reject the edit and revert the change.
    * Hover over an inline change to accept or reject that specific change without affecting other edits in the file.

1. Alternatively, accept or reject all changes across all files at once from the Chat view.

The following keyboard shortcuts help you navigate and review edits:

| Action | Shortcut |
|---|---|
| Navigate to next edit | `kbstyle(Down)` in the editor overlay |
| Navigate to previous edit | `kbstyle(Up)` in the editor overlay |

When you keep or undo an edit in a file, the editor automatically navigates to the next edit with pending changes, which might be in a different file. To disable this auto-navigation and stay in the current file, set `setting(chat.editing.revealNextChangeOnResolve)` to `false`.

{% /tab %}
{% /tabs %}

## Source Control integration

If you stage your changes in the Source Control view, any pending edits are automatically accepted. If you discard your changes, any pending edits are also discarded.

## Auto-accept edits

You can configure VS Code to automatically accept AI-generated code edits after a configurable delay with the `setting(chat.editing.autoAccept)` setting. Hover over the editor overlay controls to stop the auto-accept countdown.

> [!IMPORTANT]
> If you automatically accept all edits, review the changes before you commit them in source control. Learn more about the [security considerations of using AI in VS Code](/docs/agents/security.md).

## Edit sensitive files

To prevent inadvertent edits to sensitive files, such as workspace configuration settings or environment settings, VS Code prompts you to approve edits before they are applied. In chat, you can see a diff view of the proposed changes and choose to approve or reject them.

Use the `setting(chat.tools.edits.autoApprove)` setting to configure which files require approval. The setting uses glob patterns to match file paths in your workspace.

The following example configuration automatically allows edits to all files except for JSON files in the `.vscode` folder and files named `.env`, which you are prompted to approve:

```json
"chat.tools.edits.autoApprove": {
  "**/*": true,
  "**/.vscode/*.json": false,
  "**/.env": false
}
```

## Review file changes from the sessions list

When a session completes and makes code changes to your project, the [sessions list](/docs/chat/chat-sessions.md#sessions-list) shows the file change statistics for that session. To review the changes, select the session from the list to open the session details.

![Screenshot of the file changes diff editor in an agent session.](images/agents-overview/agent-file-changes-v2.png)

Depending on the agent type, you have options to apply the changes to your local workspace, or to check out the branch from the session (for cloud agents).

## Related resources

* [Revert changes with checkpoints](/docs/chat/chat-checkpoints.md)
* [Use chat in VS Code](/docs/chat/chat-overview.md)
* [Chat sessions](/docs/chat/chat-sessions.md)
* [Security considerations for using AI in VS Code](/docs/agents/security.md)
