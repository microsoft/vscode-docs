---
ContentId: 5d7a2a1e-9f1c-4d2a-8c6a-1c2a8f7d4a01
DateApproved: 05/21/2026
MetaDescription: Learn how to use built-in tools, MCP tools, extension tools, approvals, and sandboxing with agents in VS Code.
MetaSocialImage: ../images/shared/agent-first-development-social.png
Keywords:
  - copilot
  - agents
  - tools
  - tool sets
  - approvals
  - sandboxing
---

# Using tools with agents

Tools give agents in VS Code access to the workspace, the web, APIs, and other capabilities they need to finish real tasks. This course shows how to choose tools, group them into tool sets, and keep agent work safe with approvals and sandboxing.

## Prerequisites

Before you start, install VS Code and sign in to GitHub Copilot. You also need access to the tools you want to use, such as MCP servers or extensions that contribute tools.

## What tools do

Agents use tools to search code, read files, run commands, fetch content, and call services. VS Code supports three kinds of tools:

* Built-in tools, such as read, edit, search, execute, and web.
* MCP tools from installed Model Context Protocol servers.
* Extension tools contributed by VS Code extensions.

The agent selects tools from the enabled set based on your prompt and context. If you want to force a specific tool, type `#` and the tool name in chat.

## Choose the right tools

Open the Chat view, switch to **Agent**, and use the **Configure Tools** button in the chat input to choose the tools for the current session.

Select only the tools you need. A smaller tool set gives the model less to sort through and usually leads to better results.

![Screenshot showing the Chat view with the Configure Tools button in the chat input.](../../docs/copilot/images/chat-tools/agent-mode-select-tools.png)

> [!TIP]
> Start with the fewest tools that can complete the task, then add more only when the agent needs them.

## Group related tools with tool sets

Tool sets let you save related tools as a single reusable group. You can use them in chat prompts, prompt files, and custom agents.

Create a tool set from the Command Palette with **Chat: Configure Tool Sets**. Then add the tools you want in the generated `.jsonc` file.

Use tool sets when you want a repeatable setup for a task such as Python work, web research, or repository changes.

## Manage approvals

The permissions picker controls how much autonomy the agent has during a session.

* **Default Approvals** asks before sensitive actions.
* **Bypass Approvals** auto-approves tool calls.
* **Autopilot** (Preview) auto-approves tool calls and continues working until the task is done.

You can keep your preferred mode across sessions with `setting(chat.permissions.default)`. Autopilot is available when `setting(chat.autopilot.enabled)` is on.

> [!CAUTION]
> Higher autonomy levels reduce the amount of review you do before tools run. Use them with care, especially when the agent can edit files or run terminal commands.

![Screenshot of a tool confirmation dialog showing tool details and approval options.](../../docs/copilot/images/chat-tools/chat-approve-tool.png)

## Use sandboxing for risky commands

Agent sandboxing adds OS-level isolation for terminal commands run by the agent. It limits file system and network access, and sandboxed commands are auto-approved because they already run in a controlled environment.

Enable it with `setting(chat.agent.sandbox.enabled)`. On macOS and Linux, you can choose full isolation or file system isolation with network access.

Sandboxing is a good fit for tasks that need terminal access but should not reach beyond the workspace or approved domains.

## Why this matters

The right tool mix keeps agents focused. A smaller set reduces noise, while approvals and sandboxing help you keep control when the agent can make changes or reach outside the workspace.

## What's next

Now that you know how to use tools, the next course shows how MCP servers add external data and actions to an agent session.

## Learn more

* [Use tools with agents](https://code.visualstudio.com/docs/copilot/agents/agent-tools)
* [Tools concepts](https://code.visualstudio.com/docs/copilot/concepts/tools)
* [Agent sandboxing](https://code.visualstudio.com/docs/copilot/concepts/trust-and-safety#agent-sandboxing)
* [Agent approvals and permissions](https://code.visualstudio.com/docs/copilot/agents/agent-tools#permission-levels)
