---
ContentId: d4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a
DateApproved: 3/25/2026
MetaDescription: Learn about the different types of tools that extend AI agents in VS Code, including built-in tools, MCP servers, and extension tools.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- tools
- MCP
- model context protocol
- built-in tools
- extension tools
- tool approval
---

# Tools

Tools are the mechanism that lets the model act on your development environment. Without tools, a [language model](/docs/copilot/concepts/language-models.md) can only generate text. With tools, an [agent](/docs/copilot/concepts/agents.md) can read files, write code, run terminal commands, search your codebase, and connect to external services.

During the [agent loop](/docs/copilot/concepts/agents.md#agent-loop), the model decides which tools to call based on the task. Each tool call produces output that becomes part of the [context](/docs/copilot/concepts/context.md) for the next iteration.

This article explains the types of tools available, how the agent selects and uses them, and how you can control which tools are enabled.

## Types of tools

VS Code supports three types of tools:

* **Built-in tools**: tools that ship with VS Code for common development tasks, like reading and writing files, running terminal commands, searching your codebase, and navigating the editor. These are available immediately without any setup.
* **MCP tools**: tools provided by [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) servers, an open standard for connecting AI models to external tools and data sources. MCP servers can run locally on your machine or be hosted remotely. Use MCP tools to connect to databases, APIs, and other external services.
* **Extension tools**: tools contributed by VS Code extensions through the Language Model Tools API. Extension tools integrate deeply with the editor and are available when you install the extension.

## How tools work

When an agent processes a task, the model examines the available tools and decides which ones to call. This happens autonomously: you give the agent a high-level task, and it determines the right tools to use at each step.

You can also explicitly reference tools in your prompts by typing `#` followed by the tool name. This is useful when you want to ensure a specific tool is used.

## Control which tools are available

Use the **Configure Tools** button in the chat input field to enable or disable individual tools for the current request. This gives you direct control over which tools the agent can use.

Limiting the available tools can help in several ways:

* **Preserve context**: every tool call produces output that consumes space in the [context window](/docs/copilot/concepts/language-models.md#context-window). Fewer tools means the agent is less likely to make unnecessary calls that fill up the context.
* **Get more relevant results**: when fewer tools are available, the agent focuses on the most appropriate ones rather than choosing from a large set.
* **Improve performance**: a smaller tool set reduces the decision space for the model, which can speed up responses.

You can also control tool availability through [prompt files](/docs/copilot/customization/prompt-files.md) and [custom agents](/docs/copilot/customization/custom-agents.md), which let you define a fixed set of tools for specific tasks or workflows.

Learn more about [enabling tools for chat](/docs/copilot/agents/agent-tools.md#enable-tools-for-chat).

## Tool approval and trust

Tools can perform actions that modify files, your environment, or access external services. VS Code includes security controls to keep you in charge:

* **Approval prompts**: tools with side effects show a confirmation dialog before running. You can approve for a single use, the current session, or all future invocations.
* **URL approval**: when a tool accesses a URL, a two-step process verifies both the request and the response content.
* **Permission levels**: the permissions picker controls how much autonomy the agent has, from requiring manual approval to fully autonomous operation.

Learn more about [trust and safety](/docs/copilot/concepts/trust-and-safety.md).

## Related resources

* [Use tools with agents](/docs/copilot/agents/agent-tools.md)
* [Add and manage MCP servers](/docs/copilot/customization/mcp-servers.md)
* [Agents](/docs/copilot/concepts/agents.md)
