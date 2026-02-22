---
ContentId: 7c550054-4ade-4665-b368-215798c48673
DateApproved: 02/04/2026
MetaDescription: Learn how to add and manage Model Context Protocol (MCP) servers with GitHub Copilot in Visual Studio Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- mcp
- model context protocol
- tools
- copilot
- ai
- agents
- chat
- customization
- api
---
# Add and manage MCP servers in VS Code

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open standard for connecting AI models to external tools and services. In Visual Studio Code, MCP servers provide [tools](/docs/copilot/agents/agent-tools.md) for tasks like file operations, databases, or external APIs. MCP servers can also provide [resources, prompts, and interactive apps](#other-mcp-capabilities).

VS Code lets you install MCP servers from an MCP server gallery. By default, this gallery shows servers from the [GitHub MCP server registry](https://github.com/mcp). Alternatively, you can manually add MCP servers by updating the `mcp.json` configuration file in your workspace or user profile.

When you add an MCP server, VS Code automatically makes the MCP server [tools](/docs/copilot/agents/agent-tools.md), prompts, and resources available in chat.

This article covers how to add, configure, and manage MCP servers. To learn about using tools in chat, see [Use tools with agents](/docs/copilot/agents/agent-tools.md).

## Quickstart: use an MCP server in chat

Follow these steps to install an MCP server and use its tools in chat. This example uses the [Playwright](https://github.com/mcp/servers-playwright) MCP server to interact with web pages through a browser.

1. Open the Extensions view (`kb(workbench.view.extensions)`) and enter `@mcp playwright` in the search field.

1. Select **Install** to install the Playwright MCP server in your user profile.

1. When prompted, confirm that you trust the server to start it. VS Code discovers the server's tools and makes them available in chat.

1. Open the Chat view (`kb(workbench.action.chat.open)`) and enter a prompt that uses the Playwright tools. For example:

    ```prompt
    Go to code.visualstudio.com, decline the cookie banner, and give me a screenshot of the homepage.
    ```

    VS Code invokes the Playwright tools to open the page in a browser, and take a screenshot. You might be asked to confirm each tool invocation.

> [!TIP]
> Select the **Configure Tools** button in the chat input to see all available tools for the Playwright MCP server and toggle specific tools on or off.

## Add an MCP server

To install an MCP server from the MCP server gallery:

1. Open the Extensions view (`kb(workbench.view.extensions)`) and enter `@mcp` in the search field. This shows the list of available MCP servers in the gallery.

1. You can install an MCP server in your user profile or in your workspace:

    * To install in your user profile, select **Install**.

    * To install in your workspace, right-click the MCP server and select **Install in Workspace**. This updates the `.vscode/mcp.json` file in your workspace.

1. To view the MCP server details, select the MCP server in the list to open the details page.

> [!CAUTION]
> Local MCP servers can run arbitrary code on your machine. Only add servers from [trusted sources](#mcp-server-trust), and review the publisher and server configuration before starting it. Read the [Security documentation](/docs/copilot/security.md) for using AI in VS Code to understand the implications.

### Configure the `mcp.json` file

You can manually configure MCP servers by editing the `mcp.json` file. There are two locations for this file:

* **Workspace**: create or open `.vscode/mcp.json` in your project. Include this file in source control to share MCP server configurations with your team.
* **User profile**: run the **MCP: Open User Configuration** command to open the `mcp.json` file in your [user profile](/docs/configure/profiles.md). Servers configured here are available across all your workspaces. When you use multiple profiles, each profile can have its own MCP server configuration.

You can also run **MCP: Add Server** in the Command Palette (`kb(workbench.action.showCommands)`) to add a server through a guided flow, choosing either **Workspace** or **Global** as the target.

> [!IMPORTANT]
> Avoid hardcoding sensitive information like API keys. Use [input variables](/docs/copilot/reference/mcp-configuration.md#input-variables-for-sensitive-data) or environment files instead.

The following example shows an `mcp.json` file that configures a remote MCP server and a local MCP server:

```json
{
    "servers": {
        "github": {
            "type": "http",
            "url": "https://api.githubcopilot.com/mcp"
        },
        "playwright": {
            "command": "npx",
            "args": ["-y", "@microsoft/mcp-server-playwright"]
        }
    }
}
```

VS Code provides IntelliSense for the configuration file. For the full configuration schema and field reference, see the [MCP configuration reference](/docs/copilot/reference/mcp-configuration.md).

> [!NOTE]
> MCP servers run wherever they are configured. Servers in your user profile run locally. If you're connected to a [remote](/docs/remote/remote-overview.md) and want a server to run on the remote machine, define it in the workspace settings or remote user settings (**MCP: Open Remote User Configuration**).

### Other options to add an MCP server

<details>
<summary>Add an MCP server to a dev container</summary>

MCP servers can be configured in Dev Containers through the `devcontainer.json` file. This allows you to include MCP server configurations as part of your containerized development environment.

To configure MCP servers in a Dev Container, add the server configuration to the `customizations.vscode.mcp` section:

```json
{
    "image": "mcr.microsoft.com/devcontainers/typescript-node:latest",
    "customizations": {
        "vscode": {
            "mcp": {
                "servers": {
                    "playwright": {
                        "command": "npx",
                        "args": ["-y", "@microsoft/mcp-server-playwright"]
                    }
                }
            }
        }
    }
}
```

When the Dev Container is created, VS Code automatically writes the MCP server configurations to the remote `mcp.json` file, making them available in your containerized development environment.

</details>

<details>
<summary>Automatically discover MCP servers</summary>

VS Code can automatically detect and reuse MCP server configurations from other applications, such as Claude Desktop.

With the `setting(chat.mcp.discovery.enabled)` setting, you can select one or more tools from which to discover their MCP server configuration.

</details>

<details>
<summary>Install an MCP server from the command line</summary>

You can also use the VS Code command-line interface to add an MCP server to your user profile or to a workspace.

To add an MCP server to your user profile, use the `--add-mcp` VS Code command line option, and provide the JSON server configuration in the form `{\"name\":\"server-name\",\"command\":...}`.

```bash
code --add-mcp "{\"name\":\"my-server\",\"command\": \"uvx\",\"args\": [\"mcp-server-fetch\"]}"
```

</details>

## Other MCP capabilities

Beyond tools, MCP servers can provide other capabilities:

| Capability | Description | How to use |
|------------|-------------|------------|
| **Resources** | Access data from MCP servers as context in your prompts, such as files, database tables, or API responses. | In the Chat view, select **Add Context** > **MCP Resources**. You can also use the **MCP: Browse Resources** command. |
| **Prompts** | Use preconfigured prompts from MCP servers for common tasks. | Type `/<MCP server>.<prompt>` in the chat input. |
| **MCP Apps** | Get interactive UI components like forms, visualizations, and drag-and-drop lists rendered directly in chat. | MCP Apps appear inline when an MCP server supports them. |

## Manage MCP servers

VS Code provides several options to manage your MCP servers, such as starting or stopping a server, viewing logs, uninstalling, or clearing cached tools.

| Method | Description | |
|--------|-------------|---|
| **Extensions view** | Right-click a server in the **MCP SERVERS - INSTALLED** section or select the gear icon. | ![Screenshot showing the MCP servers in the Extensions view.](../images/mcp-servers/extensions-view-mcp-servers.png) |
| **`mcp.json` editor** | Open the configuration file and use the inline actions (code lenses). Use **MCP: Open User Configuration** or **MCP: Open Workspace Folder Configuration** to open the file. | ![MCP server configuration with lenses to manage server.](../images/mcp-servers/mcp-server-config-lenses.png) |
| **Command Palette** | Run **MCP: List Servers**, select a server, and choose an action. | ![Screenshot showing the actions for an MCP server in the Command Palette.](../images/mcp-servers/mcp-list-servers-actions.png) |

## Centrally manage access to MCP servers in VS Code

Organizations can centrally manage access to MCP servers via GitHub policies. Learn more about [enterprise management of MCP servers](/docs/enterprise/ai-settings.md#configure-mcp-server-access).

## Automatically start MCP servers

When you add an MCP server or change its configuration, VS Code needs to (re)start the server to discover the tools it provides.

You can configure VS Code to automatically restart the MCP server when configuration changes are detected by using the `setting(chat.mcp.autoStart)` setting (Experimental).

## MCP server trust

When you add an MCP server to your workspace or change its configuration, you need to confirm that you trust the server and its capabilities before starting it. VS Code shows a dialog to confirm that you trust the server when you start a server for the first time. In the dialog, select the link to the MCP server to review its configuration.

![Screenshot showing the MCP server trust prompt.](../images/mcp-servers/mcp-server-trust-dialog.png)

If you don't trust the MCP server, it will not be started, and chat requests will continue without using the tools provided by the server.

You can reset trust for your MCP servers by running the **MCP: Reset Trust** command from the Command Palette.

> [!WARNING]
> If you start the MCP server directly from the `mcp.json` file, you will not be prompted to trust the server configuration.

## Synchronize MCP configuration across devices

With [Settings Sync](/docs/configure/settings-sync.md) enabled, you can synchronize settings and configurations across devices, including MCP server configurations. This enables you to maintain a consistent development environment and access the same MCP servers on all your devices.

To synchronize MCP server configuration with Settings Sync:

1. Run the **Settings Sync: Configure** command from the Command Palette

1. Enable the **MCP Servers** option in the list of synchronized configurations

## Troubleshoot and debug MCP servers

### MCP output log

When VS Code encounters an issue with an MCP server, it shows an error indicator in the Chat view.

![MCP Server Error](../images/mcp-servers/mcp-error-loading-tool.png)

Select the error notification in the Chat view, and then select the **Show Output** option to view the server logs. Alternatively, run **MCP: List Servers** from the Command Palette, select the server, and then choose **Show Output**.

![MCP Server Error Output](../images/mcp-servers/mcp-server-error-output.png)

## Frequently asked questions

<details>
<summary>The MCP server is not starting when using Docker</summary>

Verify that the command arguments are correct and that the container is not running in detached mode (`-d` option). You can also check the MCP server output for any error messages (see [Troubleshooting](#troubleshoot-and-debug-mcp-servers)).

</details>

## Related resources

* [MCP configuration reference](/docs/copilot/reference/mcp-configuration.md)
* [Use tools with agents](/docs/copilot/agents/agent-tools.md)
* [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
* [MCP Apps support in VS Code](https://code.visualstudio.com/blogs/2026/01/26/mcp-apps-support)
