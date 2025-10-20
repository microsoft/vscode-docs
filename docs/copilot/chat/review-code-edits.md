---
ContentId: 8d3f4a2e-9b1c-4f5e-a8d7-2c4b6e9f1a3d
DateApproved: 10/09/2025
MetaDescription: Learn how to review and manage AI-generated code edits in Visual Studio Code chat.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Review AI-generated code edits

When you interact with chat in Visual Studio Code, the AI can generate code edits across multiple files in your project. This article explains how to review, accept, or discard these AI-generated code edits.

## Pending changes

Once the AI has made changes to your files, they are directly applied and saved to disk. VS Code keeps track of which files have pending edits and lets you review them individually or all at once.

The Chat view shows the list of files that were edited and are pending your review. Files with pending edits also have an indicator in the Explorer view and editor tabs with a squared-dot icon.

![Screenshot that shows the Chat view, highlighting the changed files list and the indicator in the Explorer view and editor tabs.](../images/review-code-edits/copilot-edits-changed-files-full.png)

When you open a file that was changed, the editor shows an inline diff of the applied changes.

When you close VS Code, the status of the pending edits is remembered and restored when you reopen VS Code.

## Review changes

With the editor overlay controls, you can navigate between the suggested edits by using the `kbstyle(Up)` and `kbstyle(Down)` controls. Use the **Keep** or **Undo** button to accept or reject the edits for a given file.

![Screenshot showing the Editor with proposed changes, highlighting the review controls in the editor overlay controls.](../images/review-code-edits/copilot-edits-file-review-controls.png)

When you hover over an inline change, the overlay controls let you accept or reject individual changes. In the Chat view, you can accept or reject all changes across all files at once.

## Source Control integration

If you stage your changes in the Source Control view, any pending edits are automatically accepted. On the other hand, if you discard your changes, any pending edits are also discarded.

## Auto-accept edits

You can configure VS Code to automatically accept AI-generated code edits after a specific delay with the `setting(chat.editing.autoAccept)` setting. By hovering over the editor overlay controls, you can cancel the auto-accept countdown.

If you automatically accept all edits, it's strongly recommended to still review the changes before committing them in source control. Learn more about the [security considerations of using AI in VS Code](/docs/copilot/security.md).

## Edit sensitive files

To prevent inadvertent edits to sensitive files, such as workspace configuration settings or environment settings, VS Code prompts you to approve edits before they are applied.

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

* [Learn more about using chat in VS Code](/docs/copilot/chat/copilot-chat.md)
