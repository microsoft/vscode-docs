---
ContentId: 3a7e9c4f-5d1b-4e8f-a2c6-8b0d3f5e7a9c
DateApproved: 8/26/2026
MetaDescription: Learn how agents in {% data variables.product.prodname_vscode_shortname %} use the memory tool to retain context, learn preferences, and improve across conversations.
MetaSocialImage: ../../images/shared/github-copilot-social.png
---

# Memory in {% data variables.product.prodname_vscode_shortname %} agents

Agents in {% data variables.product.prodname_vscode %} use memory to retain context across conversations. Rather than starting from scratch each session, agents recall your preferences, apply lessons from previous tasks, and build up knowledge about your codebase over time.

For background on how memory fits into the agent architecture, see [Agents concepts](/docs/agents/concepts/agents.md#memory).

This article explains how to use the memory tool in {% data variables.product.prodname_vscode_shortname %} and manage memory files.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Try memory in action">
Launch a chat prompt that asks the agent to remember a coding preference.

* [Open in {% data variables.product.prodname_vscode_shortname %}](vscode://GitHub.Copilot-Chat/chat?agent=agent%26prompt=Remember%20that%20I%20prefer%20arrow%20functions%20over%20function%20declarations%20in%20JavaScript.)

</div>

## Memory tool

> [!NOTE]
> The memory tool is currently in preview.

The memory tool is a built-in agent tool that allows agents to save and recall notes as they work. You can also explicitly ask the agent to remember something. User, repository, and session memory are stored locally on your machine.

You can turn the memory tool on or off with the `setting(chat.tools.memory.enabled)` setting.

### Memory scopes

Each scope serves a different purpose, depending on how long the information should persist and where it applies.

| Scope | Path | Persists across sessions | Persists across workspaces | Use for |
|---|---|---|---|---|
| **User** | `/memories/` | Yes | Yes | Preferences, patterns, frequently used commands |
| **Repository** | `/memories/repo/` | Yes | No (workspace-scoped) | Codebase conventions, project structure, build commands |
| **Session** | `/memories/session/` | No (cleared when chat ends) | No | Task-specific context, in-progress plans |

#### User memory

User memory persists across all workspaces and conversations. The first 200 lines are automatically loaded into the agent's context at the start of every session. Use user memory for general preferences and insights that apply regardless of which project you're working in.

For example, ask the agent to remember a coding preference:

```prompt
Remember that I prefer tabs over spaces and always use single quotes in JavaScript
```

In a later conversation, even in a different workspace, the agent recalls this preference and applies it to generated code.

#### Repository memory

Repository memory is scoped to the current workspace and persists across conversations in that workspace. Use repository memory for facts about a specific codebase, such as architecture decisions, naming conventions, or build commands.

For example:

```prompt
Remember that this project uses the repository pattern for data access and all API endpoints require authentication
```

Repository memory is stored locally on your machine.

#### Session memory

Session memory is scoped to the current conversation and cleared when the conversation ends. Use session memory for temporary working notes or task-specific context that the agent tracks while working through a multi-step task.

The Plan agent uses session memory to persist its implementation plans in a `plan.md` file. This plan is available during the session and can be viewed with the **Chat: Show Memory Files** command, but is not available in subsequent sessions. Learn more about [planning with agents](/docs/agents/run/planning.md).

### Store and retrieve memories

To store a memory, ask the agent to remember something in natural language. The agent determines the appropriate scope and creates or updates the corresponding memory file.

```prompt
Remember that our team uses conventional commits for all commit messages
```

To retrieve a memory, ask about it in a new conversation. The agent checks its memory files and recalls the relevant information.

```prompt
What are our commit message conventions?
```

Memory file references in the agent's chat responses are clickable, so you can view the contents of the memory file directly.

### Manage memory files

{% data variables.product.prodname_vscode_shortname %} provides commands to view and manage your memory files:

* **Chat: Show Memory Files**: opens a list of all memory files across scopes. Select a file to view its contents.
* **Chat: Clear All Memory Files**: removes all memory files across all scopes.

> [!NOTE]
> Deleting individual memory files is not yet supported. Use **Chat: Clear All Memory Files** to remove all memories, or ask the agent to update a specific memory file to remove outdated information.

## Related resources

* [Planning with agents](/docs/agents/run/planning.md)
* [Agent tools](/docs/agents/run/tools.md)
