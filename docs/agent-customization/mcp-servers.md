---
ContentId: 7c550054-4ade-4665-b368-215798c48673
DateApproved: 11/11/2026
MetaDescription: Add MCP servers to {% data variables.product.prodname_copilot_short %} in {% data variables.product.prodname_vscode_shortname %} and use their tools.
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
# Add and use MCP servers in {% data variables.product.prodname_vscode_shortname %}

Add an MCP server when {% data variables.product.prodname_copilot_short %} needs tools or data that aren't already available, such as querying a database or searching a documentation service. [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) connects agents to these tools and data sources.

Choose how to add the capability you need:

* **Connect a supported service:** use a [{% data variables.product.prodname_copilot_short %} connector](/docs/agent-customization/copilot-connectors.md) `feature(copilot-connectors)`. {% data variables.product.prodname_github %} manages configuration and authentication without local server setup.
* **Find a published integration:** [browse servers](#find-and-install-a-server) or [install an agent plugin](/docs/agent-customization/agent-plugins.md#discover-and-install-plugins) that bundles MCP tools.
* **Add a server directly:** [use a publisher's URL or launch command](#add-a-server-by-url-or-command).

## Before you start

* [Enable AI features](/docs/getstarted/overview.md#enable-ai-features) and open a local project folder in {% data variables.product.prodname_vscode_shortname %}.
* Select **Copilot** in the **Session Target** dropdown. The connection example below uses a personal configuration.

> [!CAUTION]
> Local MCP servers can run code on your machine, and tools can access services using your permissions. Review the publisher, command or endpoint, and requested access before installing or starting a server. Learn about [MCP server trust](/docs/agents/run/manage-mcp-servers.md#mcp-server-trust).

## Find and install a server

### Discover servers in the Customization Marketplace (Preview)

Use the [Customization Marketplace](/docs/agent-customization/overview.md#discover-and-install-existing-customizations-preview) to find existing server integrations:

1. Run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`) and select **Browse**.

1. Select **GitHub Feed** from the source menu and search by name or with `@type:mcp`.

1. Review the publisher, server capabilities, and setup requirements, then select **Install** when available.

1. Complete the publisher's setup and [use the server's tools](#use-your-servers-tools).

GitHub Feed is Experimental and requires a harness that provides marketplace search. Availability also depends on organization policy. If discovery or automatic installation isn't available, [add the publisher's URL or command](#add-a-server-by-url-or-command) instead.

You can also select a plugin marketplace and [install a plugin that bundles MCP servers](/docs/agent-customization/agent-plugins.md#install-a-plugin-from-a-marketplace). Adding a marketplace makes its plugins available to browse but doesn't install them.

<details>
<summary>Other discovery and installation options</summary>

* Run **MCP: Browse MCP Servers** to open server discovery.
* To import configuration from another application, run **MCP: Add Server** and choose **Add from another application**. See [supported discovery sources](/docs/agents/reference/mcp-configuration.md#automatic-mcp-server-discovery).
* If you have a package or image name, run **MCP: Add Server** and choose **NPM Package**, **Pip Package**, or **Docker Image** when available. Model assistance generates a configuration. Review its command, publisher, and credential requirements before accepting it, and install the required runtime.

</details>

<a name="add-an-mcp-server"></a>
<a name="add-a-server-from-the-agent-customizations-editor"></a>

## Add a server by URL or command

Provide the publisher's URL or launch command so {% data variables.product.prodname_copilot_short %} knows how to access an existing MCP server. Use a URL for a remote server or a command to start a local server process.

If you already installed a server or connected a connector, continue to [use its tools](#use-your-servers-tools).

For a first server, try the [Microsoft Learn MCP server](https://learn.microsoft.com/en-us/training/support/mcp). It searches official Microsoft documentation and requires no authentication or local runtime.

1. With **Copilot** selected, run **Chat: Open Customizations** and select **MCP Servers**. Select **Add Server** (**+**) in the **User** group.

1. Choose **HTTP (HTTP or Server-Sent Events)** and enter the server endpoint. For the Microsoft Learn MCP server, use `https://learn.microsoft.com/api/mcp`.

1. Enter a unique server ID, such as `microsoftLearn`.

1. Select **Global**, then **Copilot Global**. This personal configuration is shared across your workspaces and compatible {% data variables.product.prodname_copilot_short %} experiences on the same host, including {% data variables.copilot.copilot_cli_short %}. For sharing within a workspace, see [Choose a configuration destination](#choose-a-configuration-destination).

    If **Copilot Global** isn't available, check the [Copilot harness requirements](/docs/agents/run/agent-harnesses.md#copilot).

1. Review any server trust requests before accepting them.

For another HTTP server, substitute the publisher's endpoint and follow its authentication instructions. Don't paste credentials into chat or put them in shared configuration. For API keys or configuration copied from another client, check the [authentication and compatibility guidance](/docs/agents/reference/mcp-configuration.md#authentication-and-secrets).

<details>
<summary>Add a server with a launch command (stdio)</summary>

For a server that runs as a local process, choose **Command (stdio)** instead of HTTP and enter the publisher's launch command. Install its runtime where the server runs.

For example, the [Playwright MCP server](https://github.com/microsoft/playwright-mcp) requires Node.js 18 or newer with `npx` available:

```bash
npx -y @playwright/mcp@latest
```

Use `playwright` as the server ID and follow the remaining connection steps. For browser tasks that don't require an MCP server, consider the [built-in browser tools](/docs/agents/run/browser-tools.md).

</details>

As an alternative to the Agent Customizations editor, run **MCP: Add Server** from the Command Palette to start the guided flow.

## Use your server's tools

Ask {% data variables.product.prodname_copilot_short %} for a task that needs the connected service, such as finding official documentation for an API. {% data variables.product.prodname_copilot_short %} selects relevant tools, so you don't need to name the server in every request. Naming it explicitly can help when testing a connection or directing a request to a specific service.

Review startup, sign-in, or tool approval requests as they appear. Approve only actions you understand. Depending on the server, you might also encounter:

* **Input requests:** the server asks for missing information, such as a filter or date range. Don't enter passwords or API keys in these forms. Learn about [server input requests](/api/extension-guides/ai/mcp.md#elicitation).
* **Interactive results (Experimental):** [MCP Apps](/api/extension-guides/ai/mcp.md#mcp-apps) display forms, visualizations, or other controls alongside a tool result.

### Verify the first tool call

To check your setup, name the server and a low-impact task. For Microsoft Learn:

```prompt
Use the Microsoft Learn MCP tools to find the official documentation for the Kusto Query Language where operator. Summarize its syntax and link to the documentation. Do not change files.
```

Expand the tool call in the conversation. Confirm that it used Microsoft Learn and returned documentation for the Kusto `where` operator, not a similarly named operator in another language. The answer should reflect that result. A plausible answer without a tool call doesn't verify the connection.

For another server, choose a low-impact task supported by its tools and inspect the result in the same way.

## If the server does not work

| What you observe | Next step |
|------------------|-----------|
| The server doesn't appear or cannot start. | Check its configuration scope, runtime requirements, and [server output](/docs/agents/run/manage-mcp-servers.md#view-server-output). |
| Sign-in or a connection fails. | Check the publisher's authentication instructions and your organization's access restrictions. See [MCP troubleshooting](/docs/agents/run/manage-mcp-servers.md#troubleshoot-mcp-servers). |
| The server runs, but no tool from it is called. | Check [tool availability and invocation](/docs/agents/agent-troubleshooting/chat-debug-view.md#an-mcp-tool-is-not-being-invoked). |

After correcting the problem, repeat the request and inspect the tool output again.

## Choose a configuration destination

The connection example uses a personal configuration. Choose a different destination when you need to share a server:

| Your goal | Destination |
|-----------|-------------|
| Use a server across your workspaces and compatible {% data variables.product.prodname_copilot_short %} experiences, including {% data variables.copilot.copilot_cli_short %}. | **Global** > **Copilot Global** on the same host. |
| Share server configuration with teammates working in the same workspace. | Workspace-root `.mcp.json`, when offered in the guided flow. Share the file with the workspace, for example through source control. |

**Copilot Global** applies to clients that read the same personal {% data variables.product.prodname_copilot_short %} configuration. It doesn't synchronize configuration across machines or guarantee shared authentication credentials.

See the [configuration reference](/docs/agents/reference/mcp-configuration.md#configuration-file) for workspace setup availability, file locations, supported fields, and authentication. For remote hosts or containers, follow the [remote setup guidance](/docs/agents/run/manage-mcp-servers.md#remote-workspaces-and-dev-containers).

For existing Local harness `feature(local-harness)` configurations, use the [compatibility reference](/docs/agents/reference/mcp-configuration.md#editor-managed-configuration-for-local-harness-compatibility) instead of copying their settings into a new configuration.

## Manage an existing server

Open **Chat: Open Customizations** > **MCP Servers** to manage your servers. If you only wanted to try a server, use its ellipsis (**...**) menu to **Disable** or **Uninstall** it. Stopping a server only ends its current run, and a later request can start it again.

For connectors, [disconnect the service](/docs/agent-customization/copilot-connectors.md#disconnect-a-service) instead. If **Uninstall** isn't available for another server, follow the [removal instructions for its configuration source](/docs/agents/run/manage-mcp-servers.md#control-or-remove-a-server).

For editing connections, server output, and sharing configuration, see [Manage and troubleshoot MCP servers](/docs/agents/run/manage-mcp-servers.md). To control which tools the agent can use, see [Manage available tools](/docs/agents/run/tools.md#manage-available-tools).

## Related resources

* [Use tools with agents](/docs/agents/run/tools.md)
* [MCP configuration reference](/docs/agents/reference/mcp-configuration.md)
