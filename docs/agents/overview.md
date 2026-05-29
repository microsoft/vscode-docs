---
ContentId: 7c4b8b5e-2d3f-4e8a-9b2c-1a5d6f8e9c0b
DateApproved: 5/28/2026
MetaDescription: Learn about different types of AI agents in VS Code, including local agents, Copilot CLI for running in the background, and cloud agents.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- agents
- autonomous
- multi-file editing
- architecture
- refactoring
- deep context
- background agent
- cloud agent
- copilot coding agent
- copilot cli
- third-party agents
---

# Using agents in Visual Studio Code

An agent is an AI assistant that works autonomously to complete a coding task. Give it a high-level goal, and it breaks the goal into steps, edits files across your project, runs commands, and self-corrects when something goes wrong. For example, instead of suggesting a fix for a failing test, an agent identifies the root cause across files, updates the code, reruns the tests, and commits the changes.

Agents handle tasks end-to-end. Use them to build features across multiple files, debug and fix failing tests, refactor between frameworks, [test web apps with the integrated browser](/docs/agents/guides/browser-agent-testing-guide.md), or [ship a pull request](/docs/agents/agent-types/cloud-agents.md) for team review.

This article walks through the choices you make when working with agents: which agent type to use, which agent to give the task to, how much autonomy to grant, and where to do the work.

<div class="docs-action" data-show-in-doc="true" data-show-in-sidebar="true" title="How agents work">
Understand the agent loop, how agents plan and execute tasks, and how memory and subagents work.

* [Learn about agent concepts](/docs/agents/concepts/agents.md)

</div>

![Screenshot of an agent session in VS Code showing code changes and chat interaction.](images/agents-overview/chat-sessions-view.png)

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Create a basic game">
Use agents in VS Code to generate a tic-tac-toe game in your language of choice.

* [Open in VS Code](vscode://GitHub.Copilot-Chat/chat?agent=agent%26prompt=%23newWorkspace%20Create%20a%20basic%20tic-tac-toe%20game.%20Ask%20the%20user%20about%20their%20language%20of%20choice)

</div>

> [!TIP]
> Enable agents in your VS Code settings (`setting(chat.agent.enabled)`). Your organization might also disable agents - contact your admin to enable this functionality.

## Key choices when working with agents

Working with agents comes down to a few decisions. You can adjust each one per task and change your mind at any time:

* [**Choose where to work**](#where-to-work-with-agents): work in the editor window or the dedicated Agents window.
* [**Choose an agent type**](#types-of-agents): decide where and how the agent runs, on your machine, in the background, in the cloud, or through a third-party provider.
* [**Choose an agent**](#choose-an-agent): pick the agent persona that matches the task, such as building, planning, or answering questions, and the language model that fits.
* [**Choose a permission level**](#choose-a-permission-level): decide how much autonomy the agent has to run tools and commands.

You can also [hand off a session](#hand-off-a-session-to-another-agent) from one agent to another to take advantage of their different strengths.

## Where to work with agents

VS Code gives you different surfaces for working with agents, and you can pick the one that matches your workflow or move freely between them:

* **[Agents window](/docs/agents/agents-window.md) (agent-first, Preview)**: a dedicated window for working across multiple projects from a single place. Chat and the sessions list are the primary interface, where you prompt agents and describe the functional tasks you want accomplished. Best when your primary workflow is thinking in prompts and orchestrating agents across workspaces.

* **Main VS Code window (code-first)**: the full editor experience with debugging, notebooks, the extension ecosystem, and remote development. AI assists your coding through chat, inline suggestions, and agent sessions in the Chat view. Best when you're primarily writing and editing code in a single workspace.

Both surfaces share agent sessions and VS Code configuration like settings and keybindings, making transitions smooth. Open the Agents window with the **Open in Agents** button in the title bar. Learn more about the [Agents window](/docs/agents/agents-window.md).

## Types of agents

Agents run in different environments depending on when you need results and how much oversight you want. Learn more about the [agent types and how they work](/docs/agents/concepts/agents.md#agent-types).

* [**Local**](/docs/agents/agent-types/local-agents.md): use the VS Code agent loop to run the agent interactively in the editor with full access to your workspace, tools, and models.
* [**Copilot CLI**](/docs/agents/agent-types/copilot-cli.md): use the Copilot CLI to run in the background on your machine, optionally using Git worktrees for isolation.
* [**Cloud**](/docs/agents/agent-types/cloud-agents.md): use GitHub Copilot to run remotely and integrate with GitHub pull requests for team collaboration.
* [**Third-party**](/docs/agents/agent-types/third-party-agents.md): use the third-party agent harness and SDK from Anthropic and OpenAI to run either locally on your machine or in the cloud.

Select the agent type from the agent target dropdown in the Chat view.

![Screenshot showing agent target dropdown in the Chat view.](images/agents-overview/agent-type-dropdown.png)

You can also run agent sessions on a remote machine you own and monitor them from anywhere, whether from the [Agents window](/docs/agents/agents-window.md), a [browser](https://insiders.vscode.dev/agents), or your phone. Sessions keep running on the remote even when you disconnect, so you can close your laptop and check back later. Learn more about [remote agent sessions](/docs/agents/concepts/agents.md#remote-agent-sessions).

### Which agent type should I use?

Use the following table to find the right agent type for your task:

| I want to... | Use |
|---|---|
| Brainstorm, explore, or iterate on an idea interactively | [Local agent](/docs/agents/agent-types/local-agents.md) |
| Get answers about my codebase | [Local agent](/docs/agents/agent-types/local-agents.md) (Ask) |
| Create a structured implementation plan | [Local agent](/docs/agents/agent-types/local-agents.md) (Plan) |
| Fix an issue that needs editor context (test failures, linting errors, debug output) | [Local agent](/docs/agents/agent-types/local-agents.md) |
| Build and test web apps with the integrated browser _(Experimental)_ | [Local agent](/docs/agents/agent-types/local-agents.md). See the [browser agent testing guide](/docs/agents/guides/browser-agent-testing-guide.md). |
| Use specific VS Code extension tools or MCP servers | [Local agent](/docs/agents/agent-types/local-agents.md) |
| Implement a well-defined task while I keep working | [Copilot CLI](/docs/agents/agent-types/copilot-cli.md) or [Cloud agent](/docs/agents/agent-types/cloud-agents.md) |
| Explore multiple variants or proof of concepts | [Copilot CLI](/docs/agents/agent-types/copilot-cli.md) or [Cloud agent](/docs/agents/agent-types/cloud-agents.md) |
| Orchestrate agent sessions across multiple projects in a single, agent-first surface | [Agents window](/docs/agents/agents-window.md) |
| Create a PR for team review and collaboration | [Cloud agent](/docs/agents/agent-types/cloud-agents.md) |
| Assign a GitHub issue to an agent | [Cloud agent](/docs/agents/agent-types/cloud-agents.md) |
| Use a specific AI provider (Anthropic, OpenAI) | [Third-party agent](/docs/agents/agent-types/third-party-agents.md) |

## Choose an agent

If the agent type is _where_ the agent runs, the agent determines _how_ to perform the task based on its role or persona. For example, an agent with a code reviewer persona focuses on reviewing code changes for quality and style and providing feedback, instead of making code changes. The agent's definition determines which tools it can use, how it executes tasks, and potential handoff points to other agents.

Select an agent from the agents dropdown in the Chat view. You can switch between agents at any time during a session.

![Screenshot showing the agent picker in the Chat view.](images/getting-started/agent-mode-selection-2.png)

VS Code has three [built-in agents](/docs/agents/agent-types/local-agents.md):

* **Agent**: autonomously plans and implements changes across files, runs terminal commands, and invokes tools.
* **Plan**: creates a structured, step-by-step implementation plan before writing any code. Hands the plan off to an implementation agent when it looks right.
* **Ask**: answers questions about coding concepts, your codebase, or VS Code itself without making file changes.

For more specialized workflows, create your own [custom agents](/docs/agent-customization/custom-agents.md) that define a specific role, available tools, and a language model.

Within a session, you can also pick the language model that best fits the task. Use a fast model for quick edits and questions, or a model with stronger reasoning for complex, multi-step work. Switch models at any time from the model picker in the Chat view. Learn more about [language models](/docs/agent-customization/language-models.md).

## Choose a permission level

Agents perform tasks autonomously, but you can control how much autonomy they have for invoking tools and terminal commands. Giving agents more autonomy can increase efficiency but may reduce oversight. The permissions picker in the Chat view lets you choose a permission level for each session, from approving every tool call to letting the agent work fully on its own.

| Permission level | Description |
|---|---|
| **Default Approvals** | Uses the approvals as specified in VS Code settings. By default, only read-only and safe tools don't require explicit approval. |
| **Bypass Approvals** | Auto-approves all tool calls without confirmation dialogs. The agent might ask clarifying questions as it works. |
| **Autopilot** (Preview) | Auto-approves all tool calls, auto-responds to questions, and the agent continues working autonomously until the task is complete. |

To persist your preferred permission level across sessions, configure the `setting(chat.permissions.default)` setting.

Learn more about [permission levels and Autopilot](/docs/agents/agent-tools.md#permission-levels).

## Hand off a session to another agent

You can hand off an existing task from one agent to another agent to take advantage of their unique strengths. For example, create a plan with a local agent, hand off to Copilot CLI for proof of concepts, and then continue with a cloud agent to submit a pull request for team review.

To hand off a local agent session, select a different agent type from the session type dropdown in the chat input box. VS Code creates a new session, carrying over the full conversation history and context. The original session is archived after handoff.

![Screenshot showing the session type dropdown for handing off to another agent.](images/copilot-cli/continue-in-cli.png)

In a Copilot CLI session, delegate to a cloud agent by entering the `/delegate` command in the chat input box. You can provide additional instructions after the `/delegate` command.

## Related resources

* [Manage chat sessions](/docs/chat/chat-sessions.md): Create, switch between, and organize your agent sessions.

* [Agents tutorial](/docs/agents/agents-tutorial.md): Hands-on tutorial for working with different agent types.

* [Agent customization](/docs/agent-customization/overview.md): Tailor agents to your project and workflow.
