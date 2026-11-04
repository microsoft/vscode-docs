---
ContentId: 7a2e1d9c-4b8f-4a3d-8e0c-2f5d6b7c8a02
DateApproved: 10/28/2026
MetaDescription: Install, use, and configure MCP servers to give agents in {% data variables.product.prodname_vscode_shortname %} focused external capabilities.
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

[![Watch Extending Agents With MCP Servers on YouTube (opens in new tab).](images/2-extending-agents-with-mcp-servers/youtube-Sf4qD7SS2NA.jpg)](https://www.youtube.com/watch?v=Sf4qD7SS2NA)

MCP servers connect agents to external tools and data sources. In this guide, you will install an MCP server, use one of its tools in chat, choose the right configuration scope, and decide when to sandbox the server.

## Prerequisites

Before you start, install {% data variables.product.prodname_vscode_shortname %}, enable AI features, and sign in to {% data variables.product.prodname_copilot %}. To use the [Customization Marketplace (Preview)](/docs/agent-customization/overview.md#discover-and-install-existing-customizations-preview) in this lesson, select the **Copilot** harness from the **Session Target** control in a new chat. Check the [harness requirements](/docs/agents/run/agent-harnesses.md#copilot) if it isn't available.

* [Download VS Code](https://code.visualstudio.com/)
* [Set up GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview#_step-1-set-up-copilot)

## Start with a concrete server

For this lesson, use the Playwright MCP server as the example. It gives the agent browser tools so it can open pages, interact with them, and capture screenshots.

1. Run **Chat: Open Customizations** from the Command Palette and select **Browse**.

1. Select **GitHub Feed** from the source menu and search for `playwright` with the `@type:mcp` filter.

1. Open the Playwright MCP server's details and review its publisher, launch command, and prerequisites.

1. Select **Install** when available and choose a supported personal destination when prompted. Complete the publisher's setup, including installing the required runtime.

1. Review any server trust or authentication prompts before accepting them.

If **Browse**, **GitHub Feed**, or automatic installation isn't available, follow the [Playwright connection steps](/docs/agent-customization/mcp-servers.md#connect-a-server) to add the publisher's command directly. Source availability depends on the harness and organization policy.

When the server starts, the agent can discover and use its tools. Verify a tool call rather than relying on installation status alone.

<!-- TODO: Add a screenshot showing Playwright MCP discovery and installation in the Agent Customizations editor. -->

## Use the server in chat

Now give the agent a task that actually needs browser access.

1. Open the {% data variables.copilot.chat_view %} with the same **Copilot** harness selected.

1. Select **Agent**.

1. Open **Chat: Open Customizations** and select **Tools**.

1. Enable the Playwright tools.

1. Return to chat and send this prompt:

    ```prompt
    Go to code.visualstudio.com, decline the cookie banner if it appears, and describe the main navigation items on the homepage.
    ```

The agent should call the Playwright MCP tools because the task requires browser interaction. If it asks for approval before a tool call, review the action and approve it when it matches the task.

![Screenshot showing an MCP tool invocation in chat with the input and output shown.](../images/agents/chat-agent-mode-tool-invocation.png)

## Decide where the configuration belongs

The configuration location and format depend on the harness and installation destination. Choose the scope based on who should use the server:

| Scope | Use it when | Example |
| --- | --- | --- |
| User | The server is useful across your own workspaces. | A browser automation server or documentation lookup server. |
| Workspace | The server is part of how the project works. | A project-specific API server or database inspection tool. |
| Remote environment | The server must run on a remote machine. | A server that needs access to tools installed in a dev container or remote environment. |

For a personal {% data variables.product.prodname_copilot_short %} configuration, the guided **MCP: Add Server** flow offers **Global** > **Copilot Global**. Workspace-root `.mcp.json` uses the portable format, while workspace or user-profile `mcp.json` uses the {% data variables.product.prodname_vscode_shortname %} format. Follow [Choose a configuration destination](/docs/agent-customization/mcp-servers.md#choose-a-configuration-destination) for supported locations and capabilities.

For servers that need credentials, don't hardcode secrets in a workspace file. Use the [authentication options supported by your configuration](/docs/agents/reference/mcp-configuration.md#authentication-and-secrets). Portable {% data variables.product.prodname_copilot_short %} configurations don't support input variables or environment files.

> [!TIP]
> VS Code provides IntelliSense and inline actions for `mcp.json`, which makes it easier to start, stop, and inspect servers.

![MCP server configuration with lenses to manage server.](../images/agents/mcp-server-config-lenses.png)

## Learn what MCP can provide

MCP is built around a few capabilities. Each one solves a different problem.

* **Tools** let the agent take actions, such as opening a browser or querying an API.
* **Resources** provide read-only context that you attach to a request, such as a database schema or document.
* **Prompts** provide reusable templates from the server, such as a standard research prompt.
* **MCP Apps** render interactive UI in chat when a server supports richer input or output.

Use tools when the agent needs to do something. Use resources when it needs to read something. Use prompts when your team wants a repeatable interaction pattern.

## Sandbox a local server

Treat local MCP servers as code that can run on your machine. Review the publisher and configuration before you install one.

This optional exercise uses a **Local** harness session and the {% data variables.product.prodname_vscode_shortname %} `mcp.json` format. Per-server sandboxing isn't a capability of the portable {% data variables.product.prodname_copilot_short %} configuration used earlier. To try it, select **Local** and configure the server in `.vscode/mcp.json`, following the [sandbox configuration reference](/docs/agents/reference/mcp-configuration.md#sandbox-configuration).

By default, MCP tool calls prompt for approval before running, which keeps a human in the loop. For local stdio servers on macOS and Linux, you can enable sandboxing to restrict file system and network access.

Add sandboxing when a server needs useful powers but should stay inside clear boundaries. For example, with the Playwright MCP server, sandboxing lets the agent navigate pages and run browser tasks without prompting on every step because the work is isolated from your host.

To enable sandboxing for a local stdio server, set `sandboxEnabled` to `true` in the server configuration. If the server needs more access, update the sandbox rules for that server instead of widening access for the whole machine.

```json
{
  "servers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"],
      "sandboxEnabled": true
    }
  }
}
```

![Screenshot showing the MCP server trust prompt.](../images/agents/mcp-server-trust-dialog.png)

## Practice with a second server

After you try Playwright, install a documentation or API-focused MCP server and compare the workflow.

1. Select the **Copilot** harness, then run **Chat: Open Customizations** and select **Browse**.

1. Select **GitHub Feed** and use the `@type:mcp` filter to find a server for documentation, issue tracking, or another system you use.

1. Review its publisher and setup requirements, then install it in a supported personal or workspace destination.

1. Complete setup and enable its tools in the **Tools** section of the Agent Customizations editor.

1. Ask a prompt that requires that external source.

For example, with a documentation MCP server enabled, ask a question that should be grounded in that documentation instead of the model's general knowledge.

## Manage MCP servers

Use **Chat: Open Customizations** > **MCP Servers** to manage servers for the selected harness. Select **Browse** to discover and install additional servers.

Other management surfaces remain available:

* The **MCP Servers - Installed** section in the Extensions view.
* The configuration file editor.
* The Command Palette, including **MCP: List Servers**.

With marketplace discovery enabled, searching for `@mcp` in Extensions shows **Find MCP Servers in Customizations**. Select **Browse MCP Servers** to continue in the Customizations editor rather than installing from the Extensions view.

![Screenshot showing the actions for an MCP server in the Command Palette.](../images/agents/mcp-list-servers-actions.png)

To debug a server, select **Show Output** from the server's actions to see logs from every request the server handles.

![Screenshot showing the MCP server output panel with logs.](../images/agents/mcp-server-error-output.png)

## Why this matters

MCP gives agents a standard way to reach outside the model and work with the systems you already use. That means less ad hoc prompting and more repeatable workflows.

## What's next

Next, you will see how agent plugins package skills, agents, hooks, and MCP servers into a single installable bundle.

## Learn more

* [Add and manage MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
* [MCP configuration reference](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration)
* [MCP sandbox configuration](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration#sandbox-configuration)
* [Use tools with agents](https://code.visualstudio.com/docs/agents/run/tools)
