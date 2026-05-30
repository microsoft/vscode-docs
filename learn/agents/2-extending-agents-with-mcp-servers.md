---
ContentId: 7a2e1d9c-4b8f-4a3d-8e0c-2f5d6b7c8a02
DateApproved: 05/21/2026
MetaDescription: Install, use, configure, and sandbox an MCP server to give VS Code agents focused external capabilities.
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

MCP servers connect agents to external tools and data sources. In this guide, you will install an MCP server, use one of its tools in chat, choose the right configuration scope, and decide when to sandbox the server.

## Prerequisites

Before you start, install VS Code Insiders, enable AI features, and sign in to GitHub Copilot. You also need access to an MCP server or the ability to add one from the marketplace.

* [Download VS Code](https://code.visualstudio.com/)
* [Set up GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview#_step-1-set-up-copilot)

## Start with a concrete server

For this lesson, use the Playwright MCP server as the example. It gives the agent browser tools so it can open pages, interact with them, and capture screenshots.

1. Open the Extensions view.

1. Search for `@mcp playwright`.

1. Select **Install** to install the Playwright MCP server in your user profile.

1. When VS Code asks whether you trust the server, review the publisher and server details, then confirm if you trust it.

When the server starts, VS Code discovers its tools and makes them available in chat.

![Screenshot showing the MCP servers in the Extensions view.](../../docs/copilot/images/mcp-servers/extensions-view-mcp-servers.png)

## Use the server in chat

Now give the agent a task that actually needs browser access.

1. Open the Chat view.

1. Select **Agent**.

1. Select **Configure Tools**.

1. Enable the Playwright tools.

1. Send this prompt:

    ```prompt
    Go to code.visualstudio.com, decline the cookie banner if it appears, and describe the main navigation items on the homepage.
    ```

The agent should call the Playwright MCP tools because the task requires browser interaction. If it asks for approval before a tool call, review the action and approve it when it matches the task.

![Screenshot showing an MCP tool invocation in chat with the input and output shown.](../../docs/copilot/images/mcp-servers/chat-agent-mode-tool-invocation.png)

## Decide where the configuration belongs

Installing a server writes configuration to an `mcp.json` file. Choose the scope based on who should use the server.

| Scope | Use it when | Example |
| --- | --- | --- |
| User profile | The server is useful across your own workspaces. | A browser automation server or documentation lookup server. |
| Workspace | The server is part of how the project works. | A project-specific API server or database inspection tool. |
| Remote user profile | The server must run on a remote machine. | A server that needs access to tools installed in a dev container or remote environment. |

Use **MCP: Open User Configuration** to inspect your user profile configuration. Use **MCP: Open Workspace Folder Configuration** when you want a `.vscode/mcp.json` file for the current project.

For servers that need credentials, do not hardcode secrets in a workspace file. Store sensitive values with input variables or environment files.

> [!TIP]
> VS Code provides IntelliSense and inline actions for `mcp.json`, which makes it easier to start, stop, and inspect servers.

![MCP server configuration with lenses to manage server.](../../docs/copilot/images/mcp-servers/mcp-server-config-lenses.png)

## Learn what MCP can provide

MCP is built around a few capabilities. Each one solves a different problem.

* **Tools** let the agent take actions, such as opening a browser or querying an API.
* **Resources** provide read-only context that you attach to a request, such as a database schema or document.
* **Prompts** provide reusable templates from the server, such as a standard research prompt.
* **MCP Apps** render interactive UI in chat when a server supports richer input or output.

Use tools when the agent needs to do something. Use resources when it needs to read something. Use prompts when your team wants a repeatable interaction pattern.

## Sandbox a local server

Treat local MCP servers as code that can run on your machine. Review the publisher and configuration before you install one.

By default, MCP tool calls prompt for approval before running, which keeps a human in the loop. For local stdio servers on macOS and Linux, you can enable sandboxing to restrict file system and network access.

Add sandboxing when a server needs useful powers but should stay inside clear boundaries. For example, with the Playwright MCP server, sandboxing lets the agent navigate pages and run browser tasks without prompting on every step because the work is isolated from your host.

To enable sandboxing for a local stdio server, set `sandboxEnabled` to `true` in the server configuration. If the server needs more access, update the sandbox rules for that server instead of widening access for the whole machine.

```json
{
  "servers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@microsoft/mcp-server-playwright"],
      "sandboxEnabled": true
    }
  }
}
```

![Screenshot showing the MCP server trust prompt.](../../docs/copilot/images/mcp-servers/mcp-server-trust-dialog.png)

## Practice with a second server

After you try Playwright, install a documentation or API-focused MCP server and compare the workflow.

1. Search for `@mcp` in the Extensions view.

1. Pick a server that connects to documentation, issue tracking, or another system you use.

1. Install it in your user profile if it is personal tooling, or in the workspace if the project should share it.

1. Enable its tools in Chat.

1. Ask a prompt that requires that external source.

For example, with a documentation MCP server enabled, ask a question that should be grounded in that documentation instead of the model's general knowledge.

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
