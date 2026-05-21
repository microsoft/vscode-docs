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

Before you start, install VS Code and sign in to GitHub Copilot. You also need access to an MCP server or the ability to add one from the marketplace.

## What MCP adds

Model Context Protocol is built around three primitives:

* **Tools**: actions the agent can invoke.
* **Resources**: context the agent can read.
* **Prompts**: reusable prompt templates that standardize interactions.

That combination turns MCP into a flexible way to ground agents in external systems.

## Install an MCP server

Use the Extensions view and search for `@mcp` to browse the MCP server gallery. From there, you can install a server in your user profile or in your workspace.

When you install a server, VS Code writes the configuration into `mcp.json` and discovers the server's tools for use in chat.

![Screenshot showing the MCP servers in the Extensions view.](../../docs/copilot/images/mcp-servers/extensions-view-mcp-servers.png)

## Configure MCP servers

There are two common configuration scopes:

* **Workspace**: `.vscode/mcp.json`
* **User profile**: the user-level `mcp.json` file

Use workspace configuration when you want a server tied to a project. Use user profile configuration when you want the server available across workspaces.

You can also add a server through **MCP: Add Server** or open the user configuration with **MCP: Open User Configuration**.

> [!TIP]
> VS Code provides IntelliSense and inline actions for `mcp.json`, which makes it easier to start, stop, and inspect servers.

![MCP server configuration with lenses to manage server.](../../docs/copilot/images/mcp-servers/mcp-server-config-lenses.png)

## Use an MCP server in chat

Once a server is installed and enabled, open Chat, switch to **Agent**, and select the server's tools in the tools picker.

The agent can then call the server's tools when your prompt needs external context or actions. For example, an MCP server can ground a question in product documentation or call a browser tool to work with a web page.

## Secure MCP servers

Treat local MCP servers as code that can run on your machine. Review the publisher and configuration before you install one.

For local stdio servers on macOS and Linux, you can enable sandboxing to restrict file system and network access. Sandboxed servers are auto-approved because they already run in a controlled environment.

If a server needs more access, update the sandbox rules instead of widening access for the whole machine.

![Screenshot showing the MCP server trust prompt.](../../docs/copilot/images/mcp-servers/mcp-server-trust-dialog.png)

## Manage MCP servers

You can manage servers from several places in VS Code:

* The Extensions view.
* The `mcp.json` editor.
* The Command Palette.
* The Agent Customizations view.

Use these surfaces to start or stop a server, inspect output, and install additional servers from the marketplace.

## Why this matters

MCP gives agents a standard way to reach outside the model and work with the systems you already use. That means less ad hoc prompting and more repeatable workflows.

## What's next

Next, you will see how agent plugins package skills, agents, hooks, and MCP servers into a single installable bundle.

## Learn more

* [Add and manage MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
* [MCP configuration reference](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration)
* [MCP sandbox configuration](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration#sandbox-configuration)
* [Use tools with agents](https://code.visualstudio.com/docs/copilot/agents/agent-tools)
