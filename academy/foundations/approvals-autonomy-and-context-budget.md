---
ContentId: 9a8f0a40-f4f9-4d2b-b7b2-c1d54ef4c002
DateApproved: 03/30/2026
MetaDescription: Manage approvals, autonomy, and context budget for coding agents in VS Code, including scoped approvals and compaction.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Approvals, autonomy, and context budget

<!-- TODO update with the actual video id once published on youtube -->
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0&amp;disablekb=0&amp;modestbranding=1&amp;showinfo=0" frameborder="0" allowfullscreen title="Approvals, autonomy, and context budget"></iframe>

Every action an agent takes on your machine, running a command, writing a file, or launching a server, happens through its tools. By default, terminal commands require explicit approval before they run. This guide covers how approvals work, how to set the right autonomy level for a session, and how to monitor context budget as work builds up.

## Understanding tool call approvals

When the agent wants to run a terminal command, it shows an approval dialog with the exact command it intends to run. Review it. If it looks right, approve it. If something looks off, select **Skip** and send a message to correct the direction.

### Scoped approvals

The approval dropdown gives fine-grained control over how broadly an approval applies.

![Expanded approvals menu showing approval specificity and scope options in VS Code chat.](images/expanded-approvals.png)

Specificity:

* Command prefix, approve any command that starts with a specific prefix.
* Exact command, approve only the precise command line.
* All commands, approve all terminal commands.

Scope:

* This session, applies for the rest of the current conversation.
* This workspace, persists for the project.
* Always, applies across future sessions.

For example, if `uv` commands are trusted in a project, use an approval that covers `uv` in the workspace. If tighter control is needed, allow only the exact command in the current session.

You can also manage these rules in VS Code settings through **Configure Auto Approve**.

## Permission levels

Beyond individual approvals, the permissions picker in the chat input area controls how much overall autonomy the agent has for the session.

### Default approvals

Copilot follows configured settings and shows confirmation dialogs where required. This is the right starting point when learning what the agent does or when working on something sensitive.

### Bypass approvals

Auto-approves all tool calls and automatically retries when it hits errors. The agent still stops when it has a blocking question that requires a decision.

### Autopilot

Autopilot goes further than Bypass. It auto-approves tool calls, auto-retries on errors, and resolves blocking questions on its own until it decides the task is complete.

> [!NOTE]
> The first time you enable Bypass approvals or Autopilot, VS Code shows a warning. Both modes skip manual confirmations for actions that can modify files and run commands.

![Screenshot showing the approval picker in VS Code chat with Default approvals, Bypass approvals, and Autopilot options.](images/approval-picker.png)

## Tool calls

Every action the agent takes shows up in the chat panel as a tool call. A tool call is simply the agent using one of its available tools.

The agent decides which tools to use based on your prompt and gathered context. You can also reference tools explicitly in your prompt with `#`.

* `#fetch`, pull in a specific web page.
* `#codebase`, search across your project.
* `#file`, attach a specific file.

## The context window

The model can only hold so much information in memory at one time. This limit is the context window, measured in tokens. When the context window fills up, the model starts losing track of earlier parts of the conversation.

Select the token usage indicator in the chat panel to see a live breakdown of how the budget is being used.

![Screenshot showing the context window indicator in VS Code chat with token usage and context breakdown details.](images/context-window.png)

### What's in your context budget

The breakdown is split into two groups.

System, fixed overhead per request:

* System instructions.
* Tool definitions.

User context, grows as you work:

* Messages, conversation history.
* Tool results, output from tool calls.

On short sessions, system overhead takes most of the budget. As sessions grow, tool results and messages start to dominate.

### Managing a full context window

When the context window fills up, VS Code automatically compacts the conversation by summarizing earlier messages.

You can also compact manually.

* Select **Compact Conversation** in the context window popup.
* Type `/compact` in the chat input.
* Add instructions such as `/compact focus on the encoder implementation decisions`.

If you want a full reset, start a new chat session.

## What's next

You now understand how to stay in control while the agent works, using scoped approvals, choosing the right autonomy level, and keeping an eye on context budget. In the [next guide](reviewing-and-controlling-agent-changes.md), you will review the changes the agent made, accept or undo them at any granularity, and use checkpoints and forks to explore different directions without losing work.

## Learn more

* [Choose agents and configure permissions](https://code.visualstudio.com/docs/copilot/agents/overview)
* [Chat overview in VS Code](https://code.visualstudio.com/docs/copilot/chat/copilot-chat)
* [Managing context for AI in VS Code](https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context)
* [Create and manage chat sessions](https://code.visualstudio.com/docs/copilot/chat/chat-sessions)
* [Agent mode in GitHub Copilot docs](https://docs.github.com/copilot/how-tos/chat-with-copilot/chat-in-ide#agent-mode)