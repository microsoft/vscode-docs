---
ContentId: 8f4d3e2a-9b7c-4e1d-a6f5-3c2b1d8e9f0a
DateApproved: 10/09/2025
MetaDescription: Learn how to edit previous chat requests, restore your workspace to earlier states using checkpoints, and undo changes made by chat in Visual Studio Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Revert changes with checkpoints and editing requests

A chat session in Visual Studio Code might result in changes to one or more files in your workspace, which could be tedious to manually revert. For example, you might want to refine a previous chat request, try a different approach, or recover from unexpected changes.

This article describes how to edit previous chat requests and how to use checkpoints to roll back file changes made by chat.

## Edit a previous chat request

> [!NOTE]
> The ability to edit chat requests is available as of VS Code version 1.102.

Each chat request in your conversation history is editable. When you edit a previous chat request, the edited request is sent to the language model as a new request, and any file changes made by the original request and subsequent requests are reverted.

To edit a previous chat request, select the request in the Chat view to modify and then resend it. You can configure or disable the editing experience with the `setting(chat.editRequests)` setting.

<video src="../images/chat-checkpoints/chat-edit-request.mp4" title="Video showing the editing of a previous chat request in the Chat view." autoplay loop controls muted></video>

## Use checkpoints to revert file changes

> [!NOTE]
> Checkpoints are available as of VS Code release 1.103.

Chat checkpoints provide a way to restore the state of your workspace to a previous point in time, and are useful when chat interactions resulted in changes across multiple files.

When checkpoints are enabled, VS Code automatically creates snapshots of your files at key points during chat interactions, allowing you to return to a known good state if the changes made by chat requests are not what you expected or if you want to try a different approach.

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

* [Get started with chat in VS Code](/docs/copilot/chat/copilot-chat.md)
