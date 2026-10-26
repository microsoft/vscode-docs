---
ContentId: 3a7e9c4f-5d1b-4e8f-a2c6-8b0d3f5e7a9c
DateApproved: 10/28/2026
MetaDescription: Use cloud-backed and local memory in {% data variables.product.prodname_vscode_shortname %} to retain coding preferences and repository knowledge.
---

# Use memory with agents in {% data variables.product.prodname_vscode_shortname %}

Memory helps agents reuse coding preferences and repository knowledge without asking you to repeat them in every conversation. The memory system depends on your [agent harness](/docs/agents/run/agent-harnesses.md):

* **{% data variables.product.prodname_copilot_short %} harness**: Use [{% data variables.copilot.copilot_memory %} (Preview)](#copilot-memory-preview) to store repository facts and user preferences in the cloud.

* **Local harness**: Use [memory files](#local-memory-files) for persistent notes and temporary session context.

For background on how memory fits into the agent architecture, see [Agents concepts](/docs/agents/concepts/agents.md#memory).

This article shows how to set up cloud-backed memory, review or delete stored information, and manage local memory files.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Try memory in action">
Launch a chat prompt that asks the agent to remember a coding preference.

* [Open in {% data variables.product.prodname_vscode_shortname %}](vscode://GitHub.Copilot-Chat/chat?agent=agent%26prompt=Remember%20that%20I%20prefer%20arrow%20functions%20over%20function%20declarations%20in%20JavaScript.)

</div>

## {% data variables.copilot.copilot_memory %} (Preview)

Sessions that use the {% data variables.product.prodname_copilot_short %} harness locally can use {% data variables.copilot.copilot_memory %}, the same cloud memory service used by {% data variables.copilot.copilot_cli_short %}, {% data variables.copilot.copilot_cloud_agent %}, and code review. Memories captured by one supported feature can inform another, although supported scopes vary. For example, code review uses repository facts, not user preferences.

### Set up cloud-backed memory

{% data variables.copilot.copilot_memory %} is off by default in {% data variables.product.prodname_vscode_shortname %}. To use it:

1. [Sign in to {% data variables.product.prodname_copilot %}](/docs/setup/copilot.md) with your {% data variables.product.prodname_github %} account.

1. In your [personal {% data variables.product.prodname_copilot_short %} settings on {% data variables.product.prodname_github %}](https://github.com/settings/copilot/features), check that **{% data variables.copilot.copilot_memory %}** is **Enabled**. If your plan is managed by an organization or enterprise, its policies must permit both memory and preview features.

1. Turn on `setting(chat.copilot.memory.enabled)` in {% data variables.product.prodname_vscode_shortname %} Settings.

1. Create or resume a local {% data variables.product.prodname_copilot_short %} session in the {% data variables.copilot.chat_view %} or {% data variables.copilot.agents_window %}. The setting applies to sessions created or resumed after it changes.

Repository memories require a {% data variables.product.prodname_github %}-hosted repository. User preferences are tied to your signed-in {% data variables.product.prodname_github %} account and can apply across repositories.

If the setting is on but memory isn't available, check your {% data variables.product.prodname_github %} account settings and organization policies. Contact your administrator if a required feature is unavailable or locked. For account eligibility and default billing-entity requirements when you have multiple licenses, see [Managing {% data variables.copilot.copilot_memory %} for your personal account](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-memory/manage-for-yourself).

### Choose what to remember

Cloud-backed memory has two scopes:

| Scope | What it stores | Where it applies |
|---|---|---|
| **Repository** | Durable codebase facts and conventions, supported by citations to the code. | Shared with people who have access to the repository and {% data variables.copilot.copilot_memory %}. Used only for that repository. |
| **User** | Coding and workflow preferences that apply across repositories. | Used in your own supported {% data variables.product.prodname_copilot_short %} interactions, not other contributors' interactions. |

Storing repository facts requires write access to the repository and memory enabled for your account. On organization- or enterprise-managed plans, administrators can also review and delete user preferences. See [Managing {% data variables.copilot.copilot_memory %} for an organization or enterprise](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-memory/manage-as-administrator).

> [!CAUTION]
> Don't store credentials, secrets, or sensitive personal information in memory. Repository facts are shared, not private notes. Keep reviewed team requirements in source-controlled project documentation or [custom instructions](/docs/agent-customization/custom-instructions.md).

### Store, recall, and correct memories

Ask the agent to remember a durable convention or preference. State the scope when it matters:

```prompt
Find how this repository verifies changes, and remember the command for this repository.
```

```prompt
Across all my repositories, remember that I prefer concise commit message subjects.
```

The agent recalls relevant repository facts and user preferences when a session starts. It uses **Store Memory** to save new information. When it verifies an existing memory, it can upvote it instead of storing a duplicate. It can downvote an outdated memory and store a corrected replacement.

If a remembered convention is wrong, point the agent to the current code and ask it to correct the memory. Use persistent memory for durable information, not temporary task status.

### Review and delete cloud memories

Review stored information on {% data variables.product.prodname_github %}:

* **User preferences**: Open your [personal memory settings](https://github.com/settings/copilot/memory) to view and delete preferences.
* **Repository facts**: With repository administration access, open the repository's **Settings** > **Copilot** > **Memory**. Deleting a repository fact removes it for everyone who uses memory in that repository.

Asking the agent to forget a cloud memory downvotes it rather than permanently deleting it. To permanently delete it, use the {% data variables.product.prodname_github %} settings above. The local memory-file commands below don't delete cloud memories.

Facts and preferences that go unused are automatically deleted after 28 days. Successful validation and use can reset that timer. Learn more about [memory retention and validation](https://docs.github.com/en/copilot/concepts/prompting-and-context/copilot-memory#retention-and-validation).

To stop using cloud memory in newly created or resumed {% data variables.product.prodname_vscode_shortname %} sessions, turn off `setting(chat.copilot.memory.enabled)`. Your personal memory setting on {% data variables.product.prodname_github %} controls its use across supported {% data variables.product.prodname_copilot_short %} features. To remove stored information, delete it on {% data variables.product.prodname_github %}.

<a name="memory-tool"></a>

## Local memory files

The Local harness has a separate file-based memory tool that saves and recalls notes as the agent works. You can also explicitly ask the agent to remember something. By default, user, repository, and session memory are stored locally on your machine.

The following sections describe local memory files. If repository memory is backed by {% data variables.product.prodname_github %} instead, manage those repository facts on {% data variables.product.prodname_github %}, not with the local file-management commands.

### Memory scopes

Each scope serves a different purpose, depending on how long the information should persist and where it applies.

| Scope | Path | Persists across sessions | Persists across workspaces | Use for |
|---|---|---|---|---|
| **User** | `/memories/` | Yes | Yes | Preferences, patterns, frequently used commands |
| **Repository** | `/memories/repo/` | Yes | No (workspace-scoped) | Codebase conventions, project structure, build commands |
| **Session** | `/memories/session/` | No (current conversation only) | No | Task-specific context, in-progress plans |

#### Memory or shared project guidance

The memory files in this section are stored locally. Use them for personal preferences, temporary task context, or emerging project knowledge that your team hasn't reviewed. Repository memory files are associated with the current workspace, but aren't shared project files.

Put reviewed architecture decisions, commands, conventions, and workflows that contributors depend on in source-controlled project documentation or [custom instructions](/docs/agent-customization/custom-instructions.md). This makes the guidance available for your team's normal review and maintenance process.

When repository memory becomes stable and useful to the team:

1. Verify the information against the repository's code and configuration.
1. Move it to the appropriate project document or instructions file.
1. Review the change through your repository's normal process.
1. Update or remove the local memory to avoid stale or conflicting copies.

For a workflow that creates, verifies, and shares project instructions, see [Configure AI for your codebase](/docs/agents/guides/customize-copilot-guide.md).

#### User memory

Local user memory persists across all workspaces and conversations. The first 200 lines are automatically loaded into the agent's context at the start of every session. Use user memory for general preferences and insights that apply regardless of which project you're working in.

For example, ask the agent to remember a coding preference:

```prompt
Remember that I prefer a short summary before detailed code examples
```

In a later conversation, even in a different workspace, the agent recalls this preference and applies it to the response.

#### Repository memory

Repository memory is scoped to the current workspace and persists across conversations in that workspace. Use repository memory for facts about a specific codebase, such as architecture decisions, naming conventions, or build commands.

For example:

```prompt
Remember that the legacy API routes in this workspace use the repository pattern for data access
```

Repository memory files are stored locally on your machine.

#### Session memory

Session memory is available only in the current conversation. Use session memory for temporary working notes or task-specific context that the agent tracks while working through a multi-step task.

The Plan agent uses session memory to persist its implementation plans in a `plan.md` file. This plan is available in the current conversation and can be viewed with the **Chat: Show Memory Files** command. Learn more about [planning with agents](/docs/agents/run/planning.md).

### Store and retrieve memories

To store a memory, ask the agent to remember something in natural language. The agent determines the appropriate scope and creates or updates the corresponding memory file.

```prompt
Remember that I prefer concise commit message subjects
```

To retrieve a memory, ask about it in a new conversation. The agent checks its memory files and recalls the relevant information.

```prompt
What are our commit message conventions?
```

Memory file references in the agent's chat responses are clickable, so you can view the contents of the memory file directly.

### Manage memory files

{% data variables.product.prodname_vscode_shortname %} provides commands to view and manage local memory files in Local harness sessions:

* **Chat: Show Memory Files**: opens a list of all memory files across scopes. Select a file to view its contents.
* **Chat: Clear All Memory Files**: removes all memory files across all scopes.

> [!NOTE]
> To update or delete an individual memory file, ask the agent. Use **Chat: Clear All Memory Files** to remove all memory files.

## Related resources

* [Planning with agents](/docs/agents/run/planning.md)
* [Agent tools](/docs/agents/run/tools.md)
