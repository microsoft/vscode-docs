---
ContentId: 7a2e1d9c-4b8f-4a3d-8e0c-2f5d6b7c8a02
DateApproved: 05/21/2026
MetaDescription: Learn how MCP servers extend agents in VS Code with tools, resources, prompts, and apps.
MetaSocialImage: ../images/shared/agent-first-development-social.png
Keywords:
  - mcp
  - model context protocol
  - agents
  - tools
  - api
  - customization
---

# Extending agents with MCP servers

MCP servers connect agents to external tools and data sources. In VS Code, they extend an agent with capabilities such as file operations, database access, API calls, resources, and prompts.

This course shows how to install an MCP server, configure it in your workspace or user profile, secure it with sandboxing, and manage it from VS Code.

## Prerequisites

Before you start: you'll need VS Code Insiders installed and the GitHub Copilot and GitHub Copilot Chat extensions set up and signed in. You also need access to an MCP server or the ability to add one from the marketplace.

* [Download VS Code](https://code.visualstudio.com/)
* [Set up GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview#_step-1-set-up-copilot)

## What MCP adds

[Model Context Protocol](https://modelcontextprotocol.io/) is an open standard maintained by the Linux Foundation, and VS Code has full spec support. Think of MCP as the connector between agents and the external tools, data, and prompts they need.

MCP is built around three primitives:

* **Tools**: actions the agent can invoke.
* **Resources**: context the agent can read.
* **Prompts**: reusable prompt templates that standardize interactions.

Servers can also expose interactive UI through MCP Apps, which render forms or visualizations inline in chat.

## Install an MCP server

Use the Extensions view and search for `@mcp` to browse the MCP server gallery. From there, you can install a server in your user profile or in your workspace.

When you install a server, VS Code writes the configuration into `mcp.json` and discovers the server's tools for use in chat.

![Screenshot showing the MCP servers in the Extensions view.](../../docs/copilot/images/mcp-servers/extensions-view-mcp-servers.png)

## Configure MCP servers

There are two common configuration scopes:

* **Workspace**: `.vscode/mcp.json`
* **User profile**: the user-level `mcp.json` file

Use workspace configuration when you want a server tied to a project. Use user profile configuration when you want the server available across workspaces.

You can also add a server through **MCP: Add Server** or open the user configuration with **MCP: Open User Configuration**. For servers that need credentials, store them in inputs in the user `mcp.json` so secrets are not committed to the workspace.

> [!TIP]
> VS Code provides IntelliSense and inline actions for `mcp.json`, which makes it easier to start, stop, and inspect servers.

![MCP server configuration with lenses to manage server.](../../docs/copilot/images/mcp-servers/mcp-server-config-lenses.png)

## Use an MCP server in chat

Once a server is installed and enabled, open Chat, switch to **Agent**, and select the server's tools in the tools picker.

The agent can then call the server's tools when your prompt needs external context or actions. For example, with the Microsoft Learn MCP server enabled, a prompt like "What are the Microsoft Python best practices?" grounds the answer in official documentation by calling the server's tools.

![Screenshot showing an MCP tool invocation in chat with the input and output shown.](../../docs/copilot/images/mcp-servers/chat-agent-mode-tool-invocation.png)

## Secure MCP servers

Treat local MCP servers as code that can run on your machine. Review the publisher and configuration before you install one.

By default, MCP tool calls prompt for approval before running, which keeps a human in the loop. For local stdio servers on macOS and Linux, you can enable sandboxing to restrict file system and network access. Sandboxed servers are auto-approved because they already run in a controlled environment.

For example, with the Playwright MCP server, enabling sandboxing lets the agent navigate pages and run browser tasks without prompting on every step, because the work is isolated from your host.

If a server needs more access, update the sandbox rules instead of widening access for the whole machine.

![Screenshot showing the MCP server trust prompt.](../../docs/copilot/images/mcp-servers/mcp-server-trust-dialog.png)

## Manage MCP servers

You can manage servers from several places in VS Code:

* The Extensions view.
* The `mcp.json` editor.
* The Command Palette, including **MCP: List Servers**.
* The Agent Customizations view from the cog in the Chat view.

Use these surfaces to start or stop a server, browse the marketplace, and install additional servers.

![Screenshot showing the actions for an MCP server in the Command Palette.](../../docs/copilot/images/mcp-servers/mcp-list-servers-actions.png)

To debug a server, select **Show Output** from the server's actions to see logs from every request the server handles.

![Screenshot showing the MCP server output panel with logs.](../../docs/copilot/images/mcp-servers/mcp-server-error-output.png)

## Why this matters

MCP gives agents a standard way to reach outside the model and work with the systems you already use. That means less ad hoc prompting and more repeatable workflows.

## What's next

Next, you will see how agent plugins package skills, agents, hooks, and MCP servers into a single installable bundle.

## Learn more

* [Add and manage MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
* [MCP configuration reference](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration)
* [MCP sandbox configuration](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration#sandbox-configuration)
* [Use tools with agents](https://code.visualstudio.com/docs/copilot/agents/agent-tools)
