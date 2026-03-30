---
ContentId: 9a8f0a40-f4f9-4d2b-b7b2-c1d54ef4c003
DateApproved: 03/30/2026
MetaDescription: Review AI-generated changes in VS Code with diff controls, checkpoints, forks, and session steering for safe agent workflows.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Reviewing and controlling agent changes

<!-- TODO update with the actual video id once published on youtube -->
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0&amp;disablekb=0&amp;modestbranding=1&amp;showinfo=0" frameborder="0" allowfullscreen title="Reviewing and controlling agent changes"></iframe>

When an agent finishes a round of work, it leaves behind proposed changes, edits to files, new files, and deleted files. Nothing is permanent until you say so. This guide covers how to review what the agent did, accept or undo changes at any granularity, and use the tools available to steer the agent, correct mistakes, and explore multiple directions without losing work.

## The files changed bar

After every agent response that includes file edits, a files changed bar appears above the chat input. It lists every file the agent touched in that response.

Select any file in the list to open the inline diff. Removals are highlighted in red and additions in green.

Nothing is permanent yet. The agent has proposed these changes, but they are not saved until you explicitly accept them.

## Per-change controls

Inside the diff view, you will find **Keep** and **Undo** controls on each individual edit. This lets you keep the correct changes and undo only the incorrect ones.

### Accept all or undo all

When all changes look good, the top-level **Keep** button accepts everything at once. **Undo All** rolls back every file the agent touched in that round.

## Editing a previous message

If your original prompt was missing a requirement, edit the prompt directly instead of sending a chain of follow-up corrections.

Hover over any message in the chat and select the edit icon. Update the requirement and resend. The agent reruns from that point, replacing the conversation history after that message.

For example, instead of sending a second message, rewrite the original prompt like this.

```prompt
Using Python 3.13 and uv, implement a base62 encoder/decoder.

Accept a number to encode or a base62 string to decode as a command-line argument.
```

## Steering while the agent runs

While the agent is working, the Send button becomes a dropdown with three options.

### Add to queue

Holds your message and delivers it after the current response finishes.

### Steer with message

Signals the agent to yield after it finishes its current tool call, then processes your message immediately.

### Stop and send

Cancels the current request entirely and sends your message as a fresh start.

Most of the time, Steer with message is the right option for course correction.

## Checkpoints and restore

Every agent response in the chat is a checkpoint. Hover over any response to find **Restore Checkpoint**.

Restoring a checkpoint rolls your workspace back to the state it was in at that point in the conversation. The code reverts and the conversation history rolls back.

## Forking a session

Next to Restore Checkpoint is **Fork**.

* Restore takes you back. Everything after that checkpoint is gone, and you continue in the same session.
* Fork creates a new independent session starting from that checkpoint. The original session stays intact.

You can also type `/fork` in the chat input to fork from the current point.

When to fork:

* Explore a different architectural direction without losing current work.
* Take the project toward an API while keeping a CLI version intact.
* Compare two approaches side by side.

## Common patterns

### Cleaning up a prompt retroactively

Edit the original message and resend instead of stacking corrections.

### Mid-run change of plans

Use **Steer with Message** so the agent adjusts without stopping.

### Something went wrong and needs a clean rollback

Use **Restore Checkpoint**.

### Exploring two approaches at once

Use **Fork**.

## What's next

With the files changed view, per-change controls, message editing, steering, and checkpoints, you have complete control over what the agent produces and where the session goes. In the [next guide](agent-sessions-and-where-agents-run.md), you will manage multiple agents at the same time and compare local, background, and cloud execution.

## Learn more

* [Reviewing AI-generated code edits in VS Code](https://code.visualstudio.com/docs/copilot/chat/review-code-edits)
* [Checkpoints and editing requests in VS Code](https://code.visualstudio.com/docs/copilot/chat/chat-checkpoints)
* [Create and manage chat sessions](https://code.visualstudio.com/docs/copilot/chat/chat-sessions)
* [Chat overview in VS Code](https://code.visualstudio.com/docs/copilot/chat/copilot-chat)