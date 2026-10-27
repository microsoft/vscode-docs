---
ContentId: 7c550054-4ade-4665-b368-215798c48673
DateApproved: 10/28/2026
MetaDescription: Connect MCP servers in {% data variables.product.prodname_vscode_shortname %} to give agents external tools, then verify the first tool call.
MetaSocialImage: images/mcp-servers/mcp-server-configuration-form.png
Keywords:
- mcp
- model context protocol
- tools
- copilot
- ai
- agents
- setup
---
# Add MCP servers in {% data variables.product.prodname_vscode_shortname %}

Add an MCP server when your agent needs a capability its existing tools don't provide, such as querying a database or retrieving information from an external service. [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) connects agents to these tools and data sources. If your existing tools meet your needs, you don't need another server.

For supported services, [{% data variables.product.prodname_copilot_short %} connectors](/docs/agent-customization/copilot-connectors.md) `feature(copilot-connectors)` provide {% data variables.product.prodname_github %}-managed MCP connections for {% data variables.product.prodname_copilot_short %} harness sessions without local server setup or manual MCP configuration.

This article takes you from adding a server to verifying its first tool call. Choose your starting point:

* **Connect a supported service without server setup:** [Use a {% data variables.product.prodname_copilot_short %} connector](/docs/agent-customization/copilot-connectors.md) `feature(copilot-connectors)`.
* **Use tools from a packaged workflow:** [Install an agent plugin](/docs/agent-customization/agent-plugins.md#discover-and-install-plugins) that bundles MCP servers.
* **I have a server URL or command:** [Connect a server](#connect-a-server).
* **Help me find a server:** [Choose a server to try](#choose-a-server-to-try).
* **My server is configured but isn't working:** [Check the connection](#if-the-server-does-not-work).

## Before you start

* [Enable AI features](/docs/getstarted/overview.md#enable-ai-features) and open a local project folder in {% data variables.product.prodname_vscode_shortname %}.
* For manually configured servers, check the server publisher's prerequisites. A remote HTTP server can require an account or sign-in. A server launched by a command needs its runtime installed on the machine that runs it.

> [!CAUTION]
> Local MCP servers can run code on your machine, and tools can access external services using your permissions. Review the publisher, command or endpoint, and requested access before installing or starting a server. Only trust configurations you have reviewed. Learn about [MCP server trust](/docs/agents/run/manage-mcp-servers.md#mcp-server-trust).

## Choose a server to try

For a concrete local example, use the [Playwright MCP server](https://github.com/microsoft/playwright-mcp). It requires **Node.js 18 or newer**, with `npx` available. Check your installation in a terminal:

```bash
node --version
npx --version
```

The walkthrough uses Playwright to demonstrate connecting an external tool provider. For everyday browser interaction, try the [built-in browser tools](/docs/agents/run/browser-tools.md) first: they don't require an MCP server.

To try a remote documentation server instead, follow the [Context7 setup requirements](https://context7.com/docs/resources/all-clients) for its current authentication requirements and service limits. Use the HTTP endpoint `https://mcp.context7.com/mcp` in the connection steps below. A remote server doesn't require a local Node.js installation.

<a name="add-an-mcp-server"></a>
<a name="add-a-server-from-the-agent-customizations-editor"></a>

## Connect a server

Use the publisher's URL or launch command. For the Playwright example, use the command in step two.

1. Open the Command Palette (`kb(workbench.action.showCommands)`) and run **MCP: Add Server**.

1. Choose the option that matches what the publisher provides:

    | What you have | Choose | Enter |
    |---------------|--------|-------|
    | A server URL | **HTTP (HTTP or Server-Sent Events)** | The publisher's MCP endpoint. |
    | A launch command | **Command (stdio)** | The command and its arguments. The server communicates through standard input and output. |

    For Playwright, choose **Command (stdio)** and enter:

    ```bash
    npx -y @playwright/mcp@latest
    ```

1. Enter a server ID, such as `playwright` or `context7`, that isn't already used in the destination configuration. Use distinct IDs for different servers you plan to use together.

1. For a personal configuration, select **Global**, and then **Copilot Global** when prompted. This stores the server outside your project. For team configurations or other harnesses, [choose a configuration destination](#choose-a-configuration-destination).

    If **Copilot Global** isn't available, check the [Copilot harness requirements](/docs/agents/run/agent-harnesses.md#copilot) before continuing with this walkthrough.

1. Review any server trust or authentication prompts before accepting them. Follow the publisher's sign-in instructions if the service requires authentication. Do not paste credentials into chat or commit them to your project.

You can also start the guided flow from **Chat: Open Customizations** > **MCP Servers** > **Add Server**. The editor is scoped to the selected agent harness.

For other ways to add a server, see [Find another server](#find-another-server).

## Verify the first tool call

Adding a configuration isn't proof that the agent can use the server. Complete a request and inspect the tool call:

1. In the agent session, enter a prompt that explicitly names the server and a low-impact action. For Playwright:

    ```prompt
    Use the Playwright MCP server to open <your URL here> and report the page title. Use its tools, not the built-in browser tools. Do not change files.
    ```

    For Context7:

    ```prompt
    Use the Context7 MCP tools to look up the React documentation for useState. Summarize the basic usage and cite the documentation returned by the tool. Do not change files.
    ```

1. Review startup, sign-in, and tool approval requests as they appear. Approve only actions you understand.

1. Expand the tool call in the conversation. Check that it belongs to the server you added and inspect its returned output.

**Your connection works when all three checks pass:**

* A tool from the intended MCP server was called in your session.
* The tool returned the requested page or documentation without a connection error.
* The agent's answer reflects that tool output. A plausible answer alone isn't sufficient.

To control available tools in a Copilot session, open **Chat: Open Customizations** > **Tools**. For Local harness sessions, use **Configure Tools** in the chat input. See [Manage available tools](/docs/agents/run/tools.md#manage-available-tools) for the differences.

## Find another server

Use the MCP server gallery (Preview) to browse publishers and capabilities:

1. Open the Extensions view (`kb(workbench.view.extensions)`) and search for `@mcp`.

1. Select a server and review its publisher, capabilities, and installation requirements.

1. Select **Install** for a personal installation, or right-click and select **Install in Workspace** to share its configuration with the project.

1. Complete the publisher's setup, and then [verify a tool call](#verify-the-first-tool-call).

If the gallery isn't available, use a publisher-provided URL or command with [MCP: Add Server](#connect-a-server). Your organization can restrict which servers are available.

You can also open the gallery with **MCP: Add Server** > **Browse MCP Servers...**. Choose **Add from another application...** in the same picker to [discover existing server configurations](/docs/agents/reference/mcp-configuration.md#automatic-mcp-server-discovery).

<details>
<summary>Add from a package or Docker image (model-assisted)</summary>

If you have a package or image name instead of a launch command, use model assistance to generate the server configuration:

1. Run **MCP: Add Server** and select **NPM Package**, **Pip Package**, or **Docker Image**.
1. [Choose a configuration destination](#choose-a-configuration-destination), then enter the package or image name when prompted. For example, enter `@playwright/mcp` for **NPM Package**.
1. Review the package name, version, and publisher shown in the confirmation. Select **Allow** only if you trust the source, then follow the model-assisted setup prompts.
1. Confirm a server ID that isn't already used in the destination configuration. Review the generated command, arguments, and credential requirements before accepting any server trust or tool approval prompts.
1. [Verify a tool call](#verify-the-first-tool-call) from the added server.

These options appear only when model-assisted setup is supported in your current configuration. If they aren't available, use the publisher's launch command with **Command (stdio)**. Runtime prerequisites still apply: generating a configuration doesn't replace installing the required runtime.

</details>

<details>
<summary>Discover servers in the Customization Marketplace (Preview)</summary>

For a Copilot session, open **Chat: Open Customizations** and select **Browse**. Select **GitHub Feed** from the source menu and search by name or with `@type:mcp`. Review the server and select **Install**.

Marketplace discovery is enabled by default. Availability depends on the harness and your organization's preview-feature and marketplace policies. If automatic installation isn't supported, follow the publisher's instructions. Learn about [marketplace discovery](/docs/agent-customization/overview.md#discover-marketplace-customizations-preview).

</details>

## Choose a configuration destination

Choose a destination based on who needs the server and which harness runs it:

| Your goal | Configuration |
|-----------|---------------|
| Use a server across your workspaces | **Global** > **Copilot Global** writes to `$COPILOT_HOME/mcp-config.json`, or `~/.copilot/mcp-config.json` when `COPILOT_HOME` is unset. |
| Share a server with a team using compatible Copilot tools | Workspace-root `.mcp.json`. The guided flow offers this destination when the Experimental `setting(chat.mcp.workspaceRootConfig.enabled)` setting is on. |
| Use a Local harness configuration with input variables or per-server sandboxing | Workspace `.vscode/mcp.json` or user-profile `mcp.json`. These destinations remain available for compatibility and are labeled deprecated in the guided flow. |

Portable files use a top-level `mcpServers` object. The {% data variables.product.prodname_vscode_shortname %} format uses `servers`. Don't copy a configuration between them without checking the [format and capability reference](/docs/agents/reference/mcp-configuration.md#configuration-file).

> [!IMPORTANT]
> Portable configurations don't support {% data variables.product.prodname_vscode_shortname %} input variables or environment files. Servers requiring interactive inputs aren't forwarded to Copilot harness sessions. Use the [authentication guidance for your configuration](/docs/agents/reference/mcp-configuration.md#authentication-and-secrets), rather than adding unsupported credential placeholders.

To reuse an existing setup from other applications, see [automatic discovery](/docs/agents/reference/mcp-configuration.md#automatic-mcp-server-discovery). For [Dev Containers](/docs/agents/run/manage-mcp-servers.md#remote-workspaces-and-dev-containers) or [command-line installation](/docs/agents/reference/mcp-configuration.md#command-line-installation), follow the environment-specific instructions.

## Use context and prompts from your server

Servers can provide more than tools. Available capabilities depend on the server and your session:

* **Resources:** attach server-provided data to a request from **Add Context** > **MCP Resources**, or run **MCP: Browse Resources**.

* **Prompts:** use a server's prompt template by typing `/<server>.<prompt>` in chat.

* **MCP Apps (Experimental):** supported servers can display interactive forms or visualizations in chat. See [MCP Apps support](https://code.visualstudio.com/blogs/2026/01/26/mcp-apps-support).

## If the server does not work

| What you observe | Next step |
|------------------|-----------|
| The server doesn't appear or cannot start | Check its configuration scope, runtime requirements, and [server output](/docs/agents/run/manage-mcp-servers.md#view-server-output). |
| Sign-in or a connection fails | Check the publisher's authentication instructions and your organization's access restrictions. See [MCP troubleshooting](/docs/agents/run/manage-mcp-servers.md#troubleshoot-mcp-servers). |
| The server runs, but no tool from it is called | Check [tool availability and invocation](/docs/agents/agent-troubleshooting/chat-debug-view.md#an-mcp-tool-is-not-being-invoked). |

After correcting the problem, repeat the request and inspect the tool output again.

## Manage an existing server

Continue with [Manage and troubleshoot MCP servers](/docs/agents/run/manage-mcp-servers.md) to change a connection, stop or remove a server, review trust and startup behavior, or share configuration across environments.

For specific tasks, see [MCP sandboxing](/docs/agents/run/manage-mcp-servers.md#sandbox-mcp-servers), [configuration synchronization](/docs/agents/run/manage-mcp-servers.md#synchronize-mcp-configuration-across-devices), or [enterprise access management](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist).

## Related resources

* [Use tools with agents](/docs/agents/run/tools.md)
* [MCP configuration reference](/docs/agents/reference/mcp-configuration.md)
