---
ContentId: d4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a
DateApproved: 9/9/2026
MetaDescription: Understand how tools let AI agents act in {% data variables.product.prodname_vscode_shortname %}, including built-in, MCP, and extension tools.
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

# Understand tools in AI agents

A tool is a capability that lets an [agent](/docs/agents/concepts/agents.md) gather information or take an action. Without tools, a [language model](/docs/agents/concepts/language-models.md) can only generate text. With tools, an agent can read files, edit code, run terminal commands, search your codebase, and connect to external services.

When the agent uses a tool, it makes a **tool call** with the inputs that the tool needs. The tool runs and returns **tool output**, which becomes part of the [context](/docs/agents/concepts/context.md) for the next step in the [agent loop](/docs/agents/concepts/agents.md#agent-loop).

This article explains how tools fit into the agent loop, the types of tools available in {% data variables.product.prodname_vscode_shortname %}, and how you control their use.

## Tools in the agent loop

For example, when you ask an agent to fix a failing test, it might:

1. Call search and file-reading tools to find the test and related code.
1. Use the returned file contents to decide what to change.
1. Call an editing tool to apply the change.
1. Call the terminal tool to run the test.
1. Use the test output to decide whether the task is complete or another change is needed.

Each call gives the agent new information or changes the development environment. Depending on your [permission level](/docs/agents/run/approvals.md#permission-levels), {% data variables.product.prodname_vscode_shortname %} might ask you to approve a tool call before it runs.

## Types of tools

{% data variables.product.prodname_vscode_shortname %} supports three types of tools:

* **Built-in tools**: tools that ship with {% data variables.product.prodname_vscode_shortname %} for common development tasks, like reading and writing files, running terminal commands, searching your codebase, and navigating the editor. These are available immediately without any setup.
* **MCP tools**: tools provided by [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) servers, an open standard for connecting AI models to external tools and data sources. MCP servers can run locally on your machine or be hosted remotely. Use MCP tools to connect to databases, APIs, and other external services.
* **Extension tools**: tools contributed by {% data variables.product.prodname_vscode_shortname %} extensions through the Language Model Tools API. Extension tools integrate deeply with the editor and are available when you install the extension.

## How agents choose tools

By default, the agent chooses from the enabled tools based on your request and the current context. You can give the agent a high-level goal without naming each tool that it should use.

To direct the agent to a specific tool or group of tools, add a `#` reference to your prompt. Learn how to [use tools in a request](/docs/agents/run/tools.md#use-tools-in-a-request).

## Control which tools are available

An available tool comes from {% data variables.product.prodname_vscode_shortname %}, an MCP server, or an installed extension. An enabled tool is one that the agent is permitted to choose for a request.

Limit enabled tools to the capabilities that are relevant to your task. A focused set helps the agent choose appropriate tools, reduces the chance of unnecessary actions, and limits the tool output added to the [context window](/docs/agents/concepts/language-models.md#context-window).

The scope of a tool selection depends on where the agent session runs. For the Local harness on the extension host, the selection applies to one chat request. For the Copilot harness on the Agent Host, the selection persists in your [user profile](/docs/configure/profiles.md). Tools can also be fixed for a reusable [custom agent](/docs/agent-customization/custom-agents.md).

## Tool approval and trust

Tools can edit files, modify your environment, or access external services. {% data variables.product.prodname_vscode_shortname %} provides controls for reviewing and limiting these actions:

* **Approval prompts**: based on your permission level, a tool call can require confirmation before it runs.
* **URL approval**: when a tool accesses a URL, a two-step process verifies both the request and the response content.
* **Permission levels**: the [permissions picker](/docs/agents/run/approvals.md#permission-levels) controls how much autonomy the agent has, from requiring manual approval to fully autonomous operation.

Review the tool name and inputs before you approve a call. Learn more about [trust and safety](/docs/agents/concepts/trust-and-safety.md).

## Related resources

* [Use tools with agents](/docs/agents/run/tools.md)
* [Manage approvals and permissions](/docs/agents/run/approvals.md)
* [Add and manage MCP servers](/docs/agent-customization/mcp-servers.md)
