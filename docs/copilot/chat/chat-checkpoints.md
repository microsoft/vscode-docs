---
ContentId: 8f4d3e2a-9b7c-4e1d-a6f5-3c2b1d8e9f0a
DateApproved: 02/04/2026
MetaDescription: Learn how to edit previous chat requests, restore your workspace to earlier states using checkpoints, and undo changes made by chat in Visual Studio Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Revert changes with checkpoints and editing requests

A chat session in Visual Studio Code might result in changes to one or more files in your workspace. VS Code provides two ways to undo or revise these changes:

* **Edit a previous request**: modify a prompt you already sent. VS Code reverts any changes made by that request and all subsequent requests, then resends the edited prompt. Use this when you want to rephrase a request and get different results.
* **Restore a checkpoint**: roll back all file changes to a specific point in the conversation. Use this when you want to return to a known good state without modifying your prompts.

Both features complement the [review workflow](/docs/copilot/chat/review-code-edits.md), where you accept or reject individual edits. Use checkpoints and editing when you want to undo an entire batch of changes at once.

## Edit a previous chat request

Each chat request in your conversation history is editable. When you edit a previous chat request, the edited request is sent to the language model as a new request, and any file changes made by the original request and subsequent requests are reverted.

To edit a previous chat request, select the request in the Chat view to modify and then resend it. You can configure or disable the editing experience with the `setting(chat.editRequests)` setting.

<video src="../images/chat-checkpoints/chat-edit-request.mp4" title="Video showing the editing of a previous chat request in the Chat view." autoplay loop controls muted></video>

## Use checkpoints to revert file changes

Chat checkpoints provide a way to restore the state of your workspace to a previous point in time, and are useful when chat interactions resulted in changes across multiple files.

When checkpoints are enabled, VS Code automatically creates a snapshot of affected files before each chat request is processed. This means each chat request in your conversation has a corresponding checkpoint you can restore to.

To enable checkpoints, configure the `setting(chat.checkpoints.enabled)` setting.

### Restore a checkpoint

When you restore a checkpoint, VS Code reverts the workspace to the state it was in at the time of that checkpoint. This means that _all_ changes made to files after that checkpoint will be undone.

To restore your workspace to a previous checkpoint:

1. In the Chat view, navigate to previous chat request in the chat session.

1. Hover over the chat request and select **Restore Checkpoint**.

    ![Screenshot of the Chat view, showing the Restore Checkpoint action in the Chat view.](../images/chat-checkpoints/chat-restore-checkpoint.png)

1. Confirm that you want to restore the checkpoint and undo any file changes made after that point.

    Notice that the chat request is removed from the conversation history, and the workspace files are restored to their state at the time of the checkpoint.

### Redo after restoring

After restoring to a previous checkpoint, you can redo the changes that were undone. This might be useful if you inadvertently restored to a checkpoint.

To redo changes after restoring a checkpoint, select **Redo** in the Chat view.

![Screenshot of the Chat view, showing the Redo button to redo the changes after restoring a checkpoint to a previous state.](../images/chat-checkpoints/chat-redo-checkpoint.png)

### View file changes in checkpoints

To help you understand the effect of each chat request and make it easier to decide which checkpoint to restore to, enable the `setting(chat.checkpoints.showFileChanges)` setting. This shows the list of files that were modified at the end of each chat request, along with the number of lines added and removed in each file.

![Screenshot of the Chat view, showing the file changes at the end of a chat request.](../images/chat-checkpoints/chat-checkpoint-changed-files.png)

## Frequently asked questions

### Do checkpoints replace Git version control?

No. Checkpoints are designed for quick iteration within a chat session and are temporary. They complement Git but don't replace it. Use Git for permanent version control and collaboration. Checkpoints are ideal for experimenting during active chat sessions.

## Related resources

* [Review AI-generated code edits](/docs/copilot/chat/review-code-edits.md)
* [Chat sessions](/docs/copilot/chat/chat-sessions.md)
* [Chat overview](/docs/copilot/chat/copilot-chat.md)
