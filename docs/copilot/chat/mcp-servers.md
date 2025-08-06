---
ContentId: 7c550054-4ade-4665-b368-215798c48673
DateApproved: 08/07/2025
MetaDescription: Learn how to configure and use Model Context Protocol (MCP) servers with GitHub Copilot in Visual Studio Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use MCP servers in VS Code

Model Context Protocol (MCP) servers enable you to expand your chat experience in VS Code with extra tools for connecting to databases, invoking APIs, or performing specialized tasks.
Model Context Protocol (MCP) is an open standard that enables AI models to interact with external tools and services through a unified interface.
This article guides you through setting up MCP servers and using tools with agent mode in Visual Studio Code.

## Prerequisites

* Install the latest version of [Visual Studio Code](/download)
* Access to [Copilot](/docs/copilot/setup.md)

## What is MCP?

Model Context Protocol (MCP) provides a standardized way for AI models to discover and interact with external tools, applications, and data sources. When you enter a chat prompt to a language model with agent mode in VS Code, the model can invoke various tools to perform tasks like file operations, accessing databases, or calling APIs in response to your request.

<details>
<summary>How does MCP work?</summary>

MCP follows a client-server architecture:

* **MCP clients** (like VS Code) connect to MCP servers and request actions on behalf of the AI model
* **MCP servers** provide one or more tools that expose specific functionalities through a well-defined interface
* **The Model Context Protocol (MCP)** defines the message format for communication between clients and servers, including tool discovery, invocation, and response handling

For example, a file system MCP server might provide tools for reading, writing, or searching files and directories. GitHub's MCP server offers tools to list repositories, create pull requests, or manage issues. MCP servers can run locally on your machine or be hosted remotely, and VS Code supports both configurations.

By standardizing this interaction, MCP eliminates the need for custom integrations between each AI model and each tool. This allows you to extend your AI assistant's capabilities by simply adding new MCP servers to your workspace. Learn more about the [Model Context Protocol specification](https://modelcontextprotocol.io/).

</details>

<details>
<summary>Supported MCP capabilities in VS Code</summary>

VS Code supports the following MCP capabilities:

* MCP Server transport: local standard input/output (`stdio`), streamable HTTP (`http`), and server-sent events (`sse`, legacy support).
* [MCP features](https://modelcontextprotocol.io/specification/2025-03-26#features): tools, prompts, resources, elicitation, sampling, and authentication.
* VS Code provides servers with the current workspace folders using `roots` ([spec](https://modelcontextprotocol.io/docs/concepts/roots)).

</details>

<details>
<summary>Finding MCP servers</summary>

The [curated list of MCP servers](https://code.visualstudio.com/mcp) on the VS Code website is a great starting point. Choose from different categories and directly install MCP servers in VS Code.

MCP's [official server repository](https://github.com/modelcontextprotocol/servers) provides official, and community-contributed servers that showcase MCP's versatility. You can explore servers for various functionalities, such as file system operations, database interactions, and web services.

MCP is still a relatively new standard, and the ecosystem is rapidly evolving. As more developers adopt MCP, you can expect to see an increasing number of servers and tools available for integration with your projects.

</details>

## Enable MCP support in VS Code

> [!NOTE]
> MCP support in VS Code is generally available starting from VS Code 1.102, but can be [disabled by your organization](#centrally-manage-mcp-support).

### Centrally manage MCP support

You have two options to centrally manage MCP support in your organization:

* **Device management**: Centrally enable or disable MCP support in your organization via group policies or configuration profiles. Learn more about [managing VS Code settings with device management](/docs/setup/enterprise.md#centrally-manage-vs-code-settings).

* **GitHub Copilot policy**: Control the availability of MCP servers in your organization with a GitHub Copilot policy. Learn more about [Managing policies and features for Copilot in your enterprise](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer/enterprises/managing-policies-and-features-for-copilot-in-your-enterprise) in the GitHub Copilot documentation.

## Add an MCP server

You have multiple options to add an MCP server in VS Code:

* **Direct installation**: visit the [curated list of MCP servers](https://code.visualstudio.com/mcp) and select **Install** on any MCP server to automatically add it to your VS Code instance.
* **Workspace settings**: add a `.vscode/mcp.json` file in your workspace to configure MCP servers scoped to a workspace.
* **User settings**: specify the server in your user configuration (**MCP: Open User Configuration**) to enable the MCP server across all workspaces, synchronized via [Settings Sync](/docs/configure/settings-sync.md).
* **Automatic discovery**: enable autodiscovery (`setting(chat.mcp.discovery.enabled)`) of MCP servers defined in other tools, such as Claude Desktop.

To view and manage the list of configured MCP servers, run the **MCP: Show Installed Servers** command from the Command Palette or visit the **MCP SERVERS - INSTALLED** section in the Extensions view.

When VS Code starts the MCP server for the first time, it discovers the server's capabilities and tools. You can then [use these tools in agent mode](#use-mcp-tools-in-agent-mode). VS Code caches the list of tools for an MCP server. To clear the cached tools, use the **MCP: Reset Cached Tools** command in the Command Palette.

> [!CAUTION]
> MCP servers can run arbitrary code on your machine. Only add servers from trusted sources, and review the publisher and server configuration before starting it. VS Code prompts you to confirm that you [trust the MCP server](#mcp-server-trust) when you start an MCP server for the first time.

### Add an MCP server to your workspace

To configure an MCP server for a specific workspace, you can create a `.vscode/mcp.json` file in your workspace folder. This allows you to share the server configuration with project team members.

> [!IMPORTANT]
> Make sure to avoid hardcoding sensitive information like API keys and other credentials by using input variables or environment files.

To add an MCP server to your workspace:

1. Create a `.vscode/mcp.json` file in your workspace.

1. Select the **Add Server** button to add a template for a new server. VS Code provides IntelliSense for the MCP server configuration file.

    The following example shows how to configure a [Perplexity MCP server](https://github.com/ppl-ai/modelcontextprotocol/), where VS Code prompts you for the API key when the server starts. Learn more about the [Configuration format](#configuration-format).

    ```json
    {
        // 💡 Inputs are prompted on first server start, then stored securely by VS Code.
        "inputs": [
            {
                "type": "promptString",
                "id": "perplexity-key",
                "description": "Perplexity API Key",
                "password": true
            }
        ],
        "servers": {
            // https://github.com/github/github-mcp-server/
            "Github": {
                "url": "https://api.githubcopilot.com/mcp/"
            },
            // https://github.com/ppl-ai/modelcontextprotocol/
            "Perplexity": {
                "type": "stdio",
                "command": "npx",
                "args": [
                    "-y",
                    "server-perplexity-ask"
                ],
                "env": {
                    "PERPLEXITY_API_KEY": "${input:perplexity-key}"
                }
            }
        }
    }
    ```

1. Alternatively, run the **MCP: Add Server** command from the Command Palette, choose the type of MCP server to add and provide the server information. Next, select **Workspace Settings** to create the `.vscode/mcp.json` file in your workspace if it doesn't already exist.

### Add an MCP server to your user configuration

To configure an MCP server for all your workspaces, you can add the server configuration to your user configuration. This allows you to reuse the same server configuration across multiple projects.

To add an MCP to your user configuration, run the **MCP: Open User Configuration** command, which opens the `mcp.json` file in your user profile. If the file does not exist, VS Code creates it for you.

Alternatively, use the **MCP: Add Server** command from the Command Palette, provide the server information, and then select **Global** to add the server configuration to your profile.

When you use multiple VS Code [profiles](/docs/configure/profiles.md), this allows you to switch between different MCP server configurations based on your active profile. For example, the [Playwright MCP server](https://github.com/microsoft/playwright-mcp) could be configured in a web development profile, but not in a Python development profile.

### Dev Container support

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

### Automatic discovery of MCP servers

VS Code can automatically detect and reuse MCP servers that you defined in other tools, such as Claude Desktop.

Enable autodiscovery with the `setting(chat.mcp.discovery.enabled)` setting.

## Configuration format

Use the following JSON configuration format to define MCP servers.

* **`"servers": {}`**

    Contains the list of MCP servers, and follows Claude Desktop's configuration format.

    Specify the server name as the key and provide the server configuration as the value. VS Code shows the server name in the MCP server list. Follow these naming conventions for the server name:

    * Use camelCase for the server name, such as "uiTesting".
    * Avoid using whitespace or special characters.
    * Use a unique name for each server to avoid conflicts.
    * Use a descriptive name that reflects the server's functionality or brand, such as "github" or "database".

    Provide the following fields in the server configuration. You can use [predefined variables](/docs/reference/variables-reference.md) in the server configuration, for example to refer to the workspace folder (`${workspaceFolder}`).

    <details>
    <summary>Server configuration for `stdio`</summary>

    | Field | Description | Examples |
    |-------|-------------|----------|
    | `type` | Server connection type.  | `"stdio"` |
    | `command` | Command to start the server executable. The command needs to be available on your system path or contain its full path.<br/>If you use docker, don't use the detach option. | `"npx"`,`"node"`, `"python"`, `"docker"` |
    | `args` | Array of arguments passed to the command. | `["server.py", "--port", "3000"]` |
    | `env` | Environment variables for the server. | `{"API_KEY": "${input:api-key}"}` |
    | `envFile` | Path to an `.env` from which to load additional environment variables. | `"${workspaceFolder}/.env"` |

    </details>

    <details>
    <summary>Server configuration for `sse` or `http`</summary>

    | Field | Description | Examples |
    |-------|-------------|----------|
    | `type` | Server connection type. VS Code first tries the streamable HTTP transport and falls back to SSE if HTTP is not supported. | `"http"`, `"sse"` |
    | `url` | URL of the server. | `"http://localhost:3000"` |
    | `headers` | HTTP headers for the server. | `{"API_KEY": "${input:api-key}"}` |

    </details>

* **`"inputs": []`**

    Lets you define custom placeholders for configuration values to avoid hardcoding sensitive information, such as API keys or passwords in the server configuration.

    VS Code prompts you for these values when the server starts for the first time, and securely stores them for subsequent use. To avoid showing the typed value, set the `password` field to `true`.

    Learn more about how to configure [input variables](/docs/reference/variables-reference.md#input-variables) in VS Code.

### Configuration example

The following code snippet shows an example MCP server configuration that specifies three servers and defines an input placeholder for the API key.

<details>
<summary>View `.vscode/mcp.json`</summary>

```json
// Example .vscode/mcp.json
{
    // 💡 Inputs will be prompted on first server start,
    //    then stored securely by VS Code.
    "inputs": [
        {
            "type": "promptString",
            "id": "perplexity-key",
            "description": "Perplexity API Key",
            "password": true
        },
    ],
    "servers": {
        // https://github.com/ppl-ai/modelcontextprotocol/
        "Perplexity": {
            "type": "stdio",
            "command": "docker",
            "args": [
                "run",
                "-i",
                "--rm",
                "-e",
                "PERPLEXITY_API_KEY",
                "mcp/perplexity-ask"
            ],
            "env": {
                "PERPLEXITY_API_KEY": "${input:perplexity-key}"
            }
        },
        // https://github.com/github/github-mcp-server/
        "Github": {
            "url": "https://api.githubcopilot.com/mcp/"
        },
        // https://github.com/modelcontextprotocol/servers/tree/main/src/fetch
        "fetch": {
            "type": "stdio",
            "command": "uvx",
            "args": ["mcp-server-fetch"]
        }
    }
}
```

</details>

## Use MCP tools in agent mode

Once you have added an MCP server, you can use the tools it provides in agent mode.

To use MCP tools in agent mode:

1. Open the **Chat** view (`kb(workbench.action.chat.open)`), and select **Agent** mode from the dropdown.

    ![Agent mode dropdown option](images/mcp-servers/chat-mode-agent.png)

1. Select the **Tools** button to view the list of available tools.

    Optionally, select or deselect the tools you want to use. You can search tools by typing in the search box.

    ![MCP tools list](images/mcp-servers/agent-mode-select-tools.png)

    > [!IMPORTANT]
    > A chat request can have a maximum of 128 tools enabled at a time. If you have more than 128 tools selected, reduce the number of tools by deselecting some tools in the tools picker, or ensure that virtual tools are enabled (`setting(github.copilot.chat.virtualTools.threshold)`).

1. You can now enter a prompt in the chat input box and notice how tools are automatically invoked as needed.

    By default, when a tool is invoked, you need to confirm the action before it is run. This is because tools might run locally on your machine and might perform actions that modify files or data.

    Use the **Continue** button dropdown options to automatically confirm the specific tool for the current session, workspace, or all future invocations.

    ![MCP Tool Confirmation](images/mcp-servers/mcp-tool-confirmation.png)

    > [!TIP]
    > You can also directly reference a tool in your prompt by typing `#` followed by the tool name. You can do this in all chat modes (ask, edit, and agent mode).

1. Optionally, verify and edit the tool input parameters before running the tool.

    ![MCP Tool Input Parameters](images/mcp-servers/mcp-tool-edit-parameters.png)

## Use MCP elicitations

MCP servers can request additional input from you through elicitations. When an MCP server needs more information to complete a task, it can prompt you for specific details, such as confirmations, configuration values, or other parameters required for the operation.

When an MCP server sends an elicitation request, VS Code presents you with a dialog or input field where you can provide the requested information. This allows MCP servers to gather necessary data dynamically without requiring all configuration to be set up in advance.

## Use MCP resources

In addition to tools, MCP servers can also provide resources that you can use as context in your chat prompts. For example, a file system MCP server might provide access to files and directories, or a database MCP server might provide access to database tables.

To add a resource from an MCP server to your chat prompt:

1. In the Chat view, select **Add Context** > **MCP Resources**

1. Select a resource type from the list and provide optional resource input parameters.

    ![Screenshot of the MCP resource Quick Pick, showing resource types provided by the GitHub MCP server.](images/mcp-servers/mcp-resources-quick-pick.png)

To view the list of available resources for an MCP server, use the **MCP: Browse Resources** command or use the **MCP: List Servers** > **Browse Resources** command to view resources for a specific server.

MCP tools can return resources as part of their response. You can view or save these resources to your workspace with the **Save** button or by dragging and dropping the resource to the Explorer view.

## Use MCP prompts

MCP servers can provide preconfigured prompts for common tasks, so you don't have to type an elaborate chat prompt. You can directly invoke these prompts in the chat input box by typing `/` followed by the prompt name, formatted as `mcp.servername.promptname`. Optionally, the prompt might ask you for additional input parameters.

![Screenshot of the Chat view, showing an MCP prompt invocation and a dialog asking for additional input parameters.](images/mcp-servers/mcp-prompt-invocation.png)

## Group related tools in a tool set

As you add more MCP servers, the list of tools can become long. This can make it tedious to manage individual tools, for example when you want to define a [reusable prompt file](/docs/copilot/copilot-customization.md#prompt-files-experimental) or a [custom chat mode](/docs/copilot/chat/chat-modes.md).

To help you manage tools, you can group related tools into a tool set. A tool set is a collection of individual tools that you can refer to as a single entity. A tool set can contain built-in tools, MCP tools, or tools provided by extensions.

Learn more about how to [create and use tool sets in VS Code](/docs/copilot/chat/chat-agent-mode.md#define-tool-sets).

## Manage MCP servers

You can manage the list of installed MCP servers from the **MCP SERVERS - INSTALLED** section in the Extensions view (`kb(workbench.view.extensions)`) in VS Code. This dedicated view makes it easy to monitor, configure, and control your installed MCP servers.

![Screenshot showing the MCP servers in the Extensions view.](images/mcp-servers/extensions-view-mcp-servers.png)

Right-click on an MCP server or select the gear icon to perform the following actions:

* **Start/Stop/Restart**: Start, stop, or restart the MCP server.
* **Disconnect Account**: Disconnect the account for authentication with the MCP server.
* **Show Output**: View the server logs to diagnose issues.
* **Show Configuration**: View the MCP server configuration.
* **Configure Model Access**: Configure which models the MCP server can access (sampling).
* **Show Sampling Requests**: View the sampling requests made by the MCP server.
* **Browse Resources**: View the resources provided by the MCP server.
* **Uninstall**: Uninstall the MCP server from your environment.

Alternatively, run the **MCP: List Servers** command from the Command Palette to view the list of configured MCP servers. You can then select a server and perform actions on it.

> [!TIP]
> When you open the `.vscode/mcp.json` file via **MCP: Open Workspace Folder MCP Configuration**, VS Code shows commands to start, stop, or restart a server directly from the editor.

![MCP server configuration with lenses to manage server.](images/mcp-servers/mcp-server-config-lenses.png)

### Automatically start MCP servers

When you add an MCP server or change its configuration, VS Code needs to (re)start the server to discover the tools it provides.

You can manually restart the MCP server from the Chat view, or by using the [other start options](#manage-mcp-servers).

![Screenshot showing the Refresh button in the Chat view.](images/mcp-servers/chat-view-mcp-refresh.png)

Alternatively, configure VS Code to automatically restart the MCP server when configuration changes are detected by using the `setting(chat.mcp.autostart)` setting (Experimental).

### Command-line configuration

You can also use the VS Code command-line interface to add an MCP server to your user profile or to a workspace.

To add an MCP server to your user profile, use the `--add-mcp` command line option, and provide the JSON server configuration in the form `{\"name\":\"server-name\",\"command\":...}`.

```bash
code --add-mcp "{\"name\":\"my-server\",\"command\": \"uvx\",\"args\": [\"mcp-server-fetch\"]}"
```

### URL handler

VS Code also includes a URL handler that you can use to install an MCP server. To form the URL, construct an `obj` object in the same format as you would provide to `--add-mcp`, and then create the link by using the following logic:

```typescript
// For Insiders, use `vscode-insiders` instead of `code`
const link = `vscode:mcp/install?${encodeURIComponent(JSON.stringify(obj))}`;
```

This link can be used in a browser, or opened on the command line, for example via `xdg-open $LINK` on Linux.

## MCP server trust

MCP servers can run arbitrary code on your machine. Only add servers from trusted sources, and review the publisher and server configuration before starting it.

When you add an MCP server to your workspace or change its configuration, you need to confirm that you trust the server and its capabilities before starting it. VS Code shows a dialog to confirm that you trust the server when you start a server for the first time. Select the link to MCP server in the dialog to review the MCP server configuration in a separate window.

![Screenshot showing the MCP server trust prompt.](images/mcp-servers/mcp-server-trust-dialog.png)

If you don't trust the server, it is not started, and chat requests will continue without using the tools provided by the server.

You can reset trust for your MCP servers by running the **MCP: Reset Trust** command from the Command Palette.

> [!NOTE]
> If you start the MCP server directly from the `mcp.json` file, you are not prompted to trust the server configuration.

## Synchronize MCP servers across devices

With [Settings Sync](/docs/configure/settings-sync.md) enabled, you can synchronize settings and configurations across devices, including MCP server configurations. This allows you to maintain a consistent development environment and access the same MCP servers on all your devices.

To enable MCP server synchronization with Settings Sync, run the **Settings Sync: Configure** command from the Command Palette, and ensure that **MCP Servers** is included in the list of synchronized configurations.

## Troubleshoot and debug MCP servers

### MCP output log

When VS Code encounters an issue with an MCP server, it shows an error indicator in the Chat view.

![MCP Server Error](images/mcp-servers/mcp-error-loading-tool.png)

Select the error notification in the Chat view, and then select the **Show Output** option to view the server logs. Alternatively, run **MCP: List Servers** from the Command Palette, select the server, and then choose **Show Output**.

![MCP Server Error Output](images/mcp-servers/mcp-server-error-output.png)

### Debug an MCP server

You can enable _development mode_ for MCP servers by adding a `dev` key to the MCP server configuration. This is an object with two properties:

* `watch`: A file glob pattern to watch for files change that will restart the MCP server.
* `debug`: Enables you to set up a debugger with the MCP server.

```json
{
  "servers": {
    "gistpad": {
      "command": "node",
      "args": ["build/index.js"],
     "dev": {
       "watch": "build/**/*.js",
       "debug": { "type": "node" }
     },
```

> [!NOTE]
> We currently only support debugging Node.js and Python servers launched with `node` and `python` respectively.

## Frequently asked questions

### Can I control which MCP tools are used?

Yes, you have several options to control which tools are active:

* Select the **Tools** button in the Chat view when in agent mode, and toggle specific tools on/off as needed.
* Add specific tools to your prompt by using the **Add Context** button or by typing `#`.
* For more advanced control, you can use `.github/copilot-instructions.md` to fine-tune tool usage.

### The MCP server is not starting when using Docker

Verify that the command arguments are correct and that the container is not running in detached mode (`-d` option). You can also check the MCP server output for any error messages (see [Troubleshooting](#troubleshoot-and-debug-mcp-servers)).

### I'm getting an error that says "Cannot have more than 128 tools per request."

A chat request can have a maximum of 128 tools enabled at a time due to model constrains. If you have more than 128 tools selected, reduce the number of tools by deselecting some tools or whole servers in the tools picker in the Chat view, or ensure that virtual tools are enabled (`setting(github.copilot.chat.virtualTools.threshold)`).

![Screenshot showing the Chat view, highlighting the Tools icon in the chat input and showing the tools Quick Pick where you can select which tools are active.](images/copilot-edits/agent-mode-select-tools.png)

## Related resources

* [VS Code curated list of MCP servers](https://code.visualstudio.com/mcp)
* [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
* [Model Context Protocol Server repository](https://github.com/modelcontextprotocol/servers)
* [Use agent mode in Visual Studio Code](/docs/copilot/chat/chat-agent-mode.md)
