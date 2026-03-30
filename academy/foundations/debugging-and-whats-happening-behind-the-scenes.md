---
ContentId: 9a8f0a40-f4f9-4d2b-b7b2-c1d54ef4c005
DateApproved: 03/30/2026
MetaDescription: Diagnose agent behavior in VS Code with Agent Debug Logs, Chat Debug view, debug event snapshots, and troubleshooting.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Debugging and what's happening behind the scenes

<!-- TODO update with the actual video id once published on youtube -->
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0&amp;disablekb=0&amp;modestbranding=1&amp;showinfo=0" frameborder="0" allowfullscreen title="Debugging and what's happening behind the scenes"></iframe>

When the agent does something unexpected, calls the wrong tool, produces an odd response, or ignores a customization file, you want to understand why. This guide covers the Agent Debug Log panel, the Chat Debug view, and how to use both to diagnose agent behavior.

## The Agent Debug Log panel

The Agent Debug Log panel is the primary diagnostic tool. Open it from the overflow menu at the top of the Chat view and select **Show Agent Debug Logs**, or run **Developer: Open Agent Debug Panel** from the Command Palette.

The panel opens as an editor tab. The breadcrumb at the top shows which session you are inspecting.

### The logs view

The Logs view shows a chronological list of every event that happened during the session. Each row has:

* A timestamp.
* An event name.
* A summary in the details column.

At the start of each request, you see customization events such as loading instructions, agents, hooks, and skills. After that, you see tool calls and LLM requests.

Use List View for a flat timeline or Tree View to group by sub-agent. Use the filter bar to narrow to specific event types.

### Expanding event details

Select any row in the Logs view to open a detail panel on the right.

Depending on the event type, the panel shows:

* Which skill paths were searched and loaded.
* The exact tool input payload and returned output.
* The full system prompt that was sent to the model.

### The summary view

Select the session name in the breadcrumb to navigate to the Summary view. It shows aggregate stats for the session.

* Model turns.
* Tool calls.
* Total tokens.
* Errors.
* Total events.

From the Summary view, you can also open the Agent Flow Chart.

### The agent flow chart

The Flow Chart visualizes the event sequence as a navigable diagram. It is useful for understanding how sub-agents were invoked and how work was structured.

## The chat debug view

Where the Agent Debug Log panel shows the sequence of events, the Chat Debug view shows the raw content of each LLM request and response.

Open it from the Chat view overflow menu and select **Show Chat Debug View**.

The sidebar lists every AI request made during the session, grouped by agent. Select a request to inspect:

* The full system prompt.
* The user prompt.
* All attached context.
* Complete tool invocation payloads.

## `#debugEventsSnapshot` and `/troubleshoot`

Once you are looking at the debug panel for a session, you can attach a snapshot of those events directly to a chat message.

### `#debugEventsSnapshot`

Type `#debugEventsSnapshot` in the chat input to attach a snapshot of the current debug events as context.

Examples:

```prompt
#debugEventsSnapshot how many tokens did this session use?
```

```prompt
#debugEventsSnapshot which customization files were loaded?
```

```prompt
#debugEventsSnapshot why did it call that tool twice?
```

### `/troubleshoot`

`/troubleshoot` is a dedicated slash command for in-depth log analysis.

Examples:

```prompt
/troubleshoot list all paths you tried to load customizations from
```

```prompt
/troubleshoot the agent made an unexpected file edit in the last response, why?
```

This command requires the `github.copilot.chat.agentDebugLog.enabled` setting.

## What to look for

### Token usage

Check the Summary view first if responses start getting vague or repetitive. A filling context window is a common cause of degraded output.

### Tool invocation order

Look at the Logs view to confirm the agent followed a sensible sequence, such as reading a file before editing it or running tests after making changes.

### Customization file discovery

If custom instructions, skills, or prompt files do not seem to take effect, inspect the load events to see every path that was searched.

### Errors

Failed tool calls, model timeouts, and missing dependencies show up inline in the Logs view.

## Important log persistence note

Log data is not persisted across VS Code sessions. Use these tools while you are actively working.

## What's next

The Agent Debug Log panel and Chat Debug view provide complete visibility into what the agent is doing. In the [final guide](build-your-first-app-with-agent-mode.md), you will put everything together and build a real application from scratch.

## Learn more

* [Debug chat interactions](https://code.visualstudio.com/docs/copilot/chat/chat-debug-view)