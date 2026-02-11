---
ContentId: 8d3f4a2e-9b1c-4f5e-a8d7-2c4b6e9f1a3d
DateApproved: 02/04/2026
MetaDescription: Learn how to review and manage AI-generated code edits in Visual Studio Code chat.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Review AI-generated code edits

When you interact with chat in Visual Studio Code, the AI can generate code edits across multiple files in your project. This article explains how to review, accept, or discard these AI-generated code edits.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to experience local, background, and cloud agents in VS Code.

* [Start tutorial](/docs/copilot/agents/agents-tutorial.md)

</div>

## Pending changes

Once the AI has made changes to your files, they are directly applied and saved to disk. VS Code keeps track of which files have pending edits and lets you review them individually or all at once.

The Chat view shows the list of files that were edited and are pending your review. Files with pending edits also have an indicator in the Explorer view and editor tabs with a squared-dot icon.

![Screenshot that shows the Chat view, highlighting the changed files list and the indicator in the Explorer view and editor tabs.](../images/review-code-edits/copilot-edits-changed-files-full.png)

When you open a file that was changed, the editor shows an inline diff of the applied changes.

When you close VS Code, the status of the pending edits is remembered and restored when you reopen VS Code.

## Review changes

Follow these steps to review the AI-generated code edits in a file:

1. Open a file with pending edits by selecting it from the changed files list in the Chat view or from the Explorer view.

1. Use the `kbstyle(Up)` and `kbstyle(Down)` controls in the editor overlay to navigate between individual edits within the file.

1. For each edit, choose one of the following actions:
    * Select **Keep** to accept the edit.
    * Select **Undo** to reject the edit and revert the change.
    * Hover over an inline change to accept or reject that specific change without affecting other edits in the file.

1. Alternatively, accept or reject all changes across all files at once from the Chat view.

![Screenshot showing the Editor with proposed changes, highlighting the review controls in the editor overlay controls.](../images/review-code-edits/copilot-edits-file-review-controls.png)

The following keyboard shortcuts help you navigate and review edits:

| Action | Shortcut |
|---|---|
| Navigate to next edit | `kbstyle(Down)` in the editor overlay |
| Navigate to previous edit | `kbstyle(Up)` in the editor overlay |

## Source Control integration

If you stage your changes in the Source Control view, any pending edits are automatically accepted. On the other hand, if you discard your changes, any pending edits are also discarded.

## Auto-accept edits

You can configure VS Code to automatically accept AI-generated code edits after a configurable delay with the `setting(chat.editing.autoAccept)` setting. Hover over the editor overlay controls to stop the auto-accept countdown.

> [!IMPORTANT]
> If you automatically accept all edits, it's strongly recommended to review the changes before committing them in source control. Learn more about the [security considerations of using AI in VS Code](/docs/copilot/security.md).

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

## Related resources

* [Revert changes with checkpoints](/docs/copilot/chat/chat-checkpoints.md)
* [Chat overview](/docs/copilot/chat/copilot-chat.md)
* [Chat sessions](/docs/copilot/chat/chat-sessions.md)
* [Security considerations for using AI in VS Code](/docs/copilot/security.md)
