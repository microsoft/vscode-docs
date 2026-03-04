---
ContentId: 3a7e9c4f-5d1b-4e8f-a2c6-8b0d3f5e7a9c
DateApproved: 3/4/2026
MetaDescription: Learn how agents in VS Code use the memory tool and Copilot Memory to retain context, learn preferences, and improve over time across conversations.
MetaSocialImage: ../images/shared/github-copilot-social.png
---

# Memory in VS Code agents

Agents in Visual Studio Code use memory to retain context across conversations. Rather than starting from scratch each session, agents recall your preferences, apply lessons from previous tasks, and build up knowledge about your codebase over time.

VS Code supports two complementary memory systems:

* **Memory tool**: a built-in tool that stores notes locally on your machine, organized in three scopes (user, repository, and session). Agents both read and write to memory as they work.
* **Copilot Memory**: a GitHub-hosted memory system that captures repository-specific insights across Copilot agents like coding agent, code review, and CLI. Copilot Memory is shared across GitHub Copilot surfaces beyond VS Code.

This article explains how to use the memory tool in VS Code, how to manage memory files, and how Copilot Memory extends memory across your development workflow.

## Memory tool

> [!NOTE]
> The memory tool is currently in preview. You can enable or disable it with the `setting(github.copilot.chat.tools.memory.enabled)` setting.

The memory tool is a built-in agent tool that allows agents to save and recall notes as they work. You can also explicitly ask the agent to remember something. All data is stored locally on your machine. The memory tool is enabled by default.

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

#### Session memory

Session memory is scoped to the current conversation and cleared when the conversation ends. Use session memory for temporary working notes or task-specific context that the agent tracks while working through a multi-step task.

The Plan agent uses session memory to persist its implementation plans in a `plan.md` file. This plan is available during the session and can be viewed with the **Chat: Show Memory Files** command, but is not available in subsequent sessions. Learn more about [planning with agents](/docs/copilot/agents/planning.md).

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

VS Code provides commands to view and manage your memory files:

* **Chat: Show Memory Files**: opens a list of all memory files across scopes. Select a file to view its contents.
* **Chat: Clear All Memory Files**: removes all memory files across all scopes.

> [!NOTE]
> Deleting individual memory files is not yet supported. Use **Chat: Clear All Memory Files** to remove all memories, or ask the agent to update a specific memory file to remove outdated information.

## Copilot Memory

> [!NOTE]
> Copilot Memory is in preview and is separate from the local memory tool described above.

[Copilot Memory](https://docs.github.com/copilot/how-tos/use-copilot-agents/copilot-memory) is a GitHub-hosted memory system that lets Copilot learn and retain repository-specific insights as it works. Unlike the local memory tool, Copilot Memory is shared across multiple GitHub Copilot surfaces, including Copilot coding agent, Copilot code review, and Copilot CLI.

### How Copilot Memory works

As Copilot agents work in your repositories, they automatically capture tightly scoped insights called "memories". These memories are:

* **Repository-scoped**: memories are tied to a specific repository and can only be created by contributors with write access.
* **Cross-agent**: what one Copilot agent learns is available to other agents. For example, a pattern discovered by Copilot code review can later guide Copilot coding agent.
* **Verified before use**: agents validate memories against the current codebase before applying them, preventing stale or incorrect information from affecting results.
* **Automatically expired**: memories are deleted after 28 days to avoid outdated information.

### Enable Copilot Memory

Copilot Memory is turned off by default and must be enabled in your GitHub settings:

* **Individual users** (Copilot Pro or Pro+): enable Copilot Memory in your [personal Copilot settings](https://github.com/settings/copilot) on GitHub.
* **Organizations and enterprises**: enable through policy settings in your organization or enterprise settings.

In addition, you need to enable Copilot Memory integration in VS Code with the `setting(github.copilot.chat.copilotMemory.enabled)` setting.

Repository owners can review and delete stored memories in **Repository Settings** > **Copilot** > **Memory**.

For detailed setup instructions, see [Enabling and curating Copilot Memory](https://docs.github.com/copilot/how-tos/use-copilot-agents/copilot-memory) in the GitHub documentation.

### Memory tool vs. Copilot Memory

| | Memory tool | Copilot Memory |
|---|---|---|
| **Storage** | Local (on your machine) | GitHub-hosted (remote) |
| **Scopes** | User, repository, session | Repository only |
| **Shared across Copilot surfaces** | No (VS Code only) | Yes (coding agent, code review, CLI) |
| **Created by** | You or the agent during chat | Copilot agents automatically |
| **Enabled by default** | Yes | No (opt-in) |
| **Expiration** | Manual management | Automatic (28 days) |

The two systems are complementary. Use the local memory tool for personal preferences and session-specific context in VS Code. Use Copilot Memory for repository knowledge that benefits all Copilot agents across your development workflow.

## Related resources

* [Planning with agents](/docs/copilot/agents/planning.md)
* [Agent tools](/docs/copilot/agents/agent-tools.md)
* [Enabling and curating Copilot Memory](https://docs.github.com/copilot/how-tos/use-copilot-agents/copilot-memory) (GitHub documentation)
* [Building an agentic memory system for GitHub Copilot](https://github.blog/ai-and-ml/github-copilot/building-an-agentic-memory-system-for-github-copilot/) (GitHub blog)
