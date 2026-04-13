---
ContentId: 9a8f0a40-f4f9-4d2b-b7b2-c1d54ef4c005
DateApproved: 03/30/2026
MetaDescription: Diagnose agent behavior in VS Code with Agent Debug Logs, Chat Debug view, debug event snapshots, and troubleshooting.
MetaSocialImage: ../images/shared/agent-first-development-social.png
---
# Debugging agent work

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/aW2jlbbUREc?si=EmrRxM6eNywWK7sK" title="Video for debugging and what's happening behind the scenes." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

When the agent does something unexpected, calls the wrong tool, produces an odd response, or ignores a customization file, you want to understand why. VS Code and GitHub Copilot Chat are open source, and that transparency extends to what happens at runtime. This guide covers the Agent Debug Log panel, the Chat Debug view, and how to use both to diagnose agent behavior.

## The Agent Debug Log panel

The Agent Debug Log panel is the primary diagnostic tool. Open it from the overflow menu at the top of the Chat view and select **Show Agent Debug Logs**, or run **Developer: Open Agent Debug Panel** from the Command Palette.

The panel opens as an editor tab. The breadcrumb at the top shows which session you are inspecting.

### The logs view

The Logs view shows a chronological list of every event that happened during the session. Each row has:

* A timestamp.
* An event name.
* A summary in the details column.

At the start of each request, you'll see a cluster of customization events:

* **Load Instructions** - which instruction files were found and applied
* **Load Agents** - which agent configurations were loaded
* **Load Hooks** - which hook definitions were found
* **Load Skills** - which skills were found and loaded

These show you exactly what the agent loaded before it started working. After that cluster, you'll see the tool calls and LLM requests as the session progressed.

Switch between List View (flat, chronological) and Tree View (grouped by sub-agent) using the toggle at the top. Use the filter bar to narrow down to specific event types - for example, if you only want to see tool calls.

### Expanding event details

Select any row in the Logs view to open a detail panel on the right.

Depending on the event type, the panel shows:

* **Load Skills** - the full list of paths that were searched (in order) and which skills were found and loaded
* **Tool call** - the exact input payload and the returned output
* **LLM Request** - the full system prompt that was sent to the model

This is where most of the diagnostic value lives. If a customization is not taking effect, the load details show the exact paths that were searched and whether your file was found.

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

This is the exact data that went to the model and the exact data that came back. It's useful for answering questions like: Did the agent have the right file contents when it wrote that function? Was the system prompt shaped the way I expected?

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

The agent reads the snapshot and answers based on what actually happened - not based on general knowledge, but on the actual event data from your session.

You can also click the sparkle icon in the top-right corner of the Agent Debug panel to attach the snapshot to the chat composer automatically.

### `/troubleshoot`

`/troubleshoot` is a dedicated slash command for in-depth log analysis.

Examples:

```prompt
/troubleshoot list all paths you tried to load customizations from
```

```prompt
/troubleshoot the agent made an unexpected file edit in the last response, why?
```

> [!NOTE]
> This command requires the `github.copilot.chat.agentDebugLog.enabled` setting.

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

Log data is not persisted across VS Code sessions. The Agent Debug Log panel and Chat Debug view only show data from your current VS Code session, and the Chat Debug view only captures LLM requests made during the active window. Use these tools while you're actively working - they won't be available after you restart VS Code.

## What's next

The Agent Debug Log panel and Chat Debug view give you complete visibility into what the agent is doing: the Logs view for the timeline, the Summary for the numbers, the Flow Chart for the structure, and the Chat Debug view for the raw payloads. And when you need to ask questions about a session in plain language, `#debugEventsSnapshot` and `/troubleshoot` let you do exactly that.

That's the full foundation: harness, model, context, tools, prompt, sessions, and the debugging layer. In the [final guide](/learn/foundations/build-your-first-app-with-agent-mode.md), you will put everything together and build a real application from scratch.

## Learn more

* [Debug chat interactions](https://code.visualstudio.com/docs/copilot/chat/chat-debug-view)