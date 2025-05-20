---
ContentId: 7c550054-4ade-4665-b368-215798c48673
DateApproved: 05/08/2025
MetaDescription: Learn how to configure and use Model Context Protocol (MCP) servers with GitHub Copilot in Visual Studio Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
---

# Use MCP servers in VS Code (Preview)

Model Context Protocol (MCP) is an open standard that enables AI models to interact with external tools and services through a unified interface. In VS Code, MCP support enhances GitHub Copilot's agent mode by allowing you to connect any MCP-compatible server to your agentic coding workflow. This article guides you through setting up MCP servers and using tools with agent mode in Visual Studio Code.

> [!NOTE]
> MCP support in agent mode in VS Code is currently in preview.

## Prerequisites

* Install the latest version of [Visual Studio Code](/download)
* Access to [Copilot](/docs/copilot/setup.md)

## What is MCP?

Model Context Protocol (MCP) provides a standardized way for AI models to discover and interact with external tools, applications, and data sources. When you enter a chat prompt to a language model with agent mode in VS Code, the model can invoke various tools to perform tasks like file operations, accessing databases, or calling APIs in response to your request.

MCP follows a client-server architecture:

- **MCP clients** (like VS Code) connect to MCP servers and request actions on behalf of the AI model
- **MCP servers** provide one or more tools that expose specific functionalities through a well-defined interface
- **The Model Context Protocol (MCP)** defines the message format for communication between clients and servers, including tool discovery, invocation, and response handling

For example, a file system MCP server might provide tools for reading, writing, or searching files and directories. GitHub's MCP server offers tools to list repositories, create pull requests, or manage issues. MCP servers can run locally on your machine or be hosted remotely, and VS Code supports both configurations.

By standardizing this interaction, MCP eliminates the need for custom integrations between each AI model and each tool. This allows you to extend your AI assistant's capabilities by simply adding new MCP servers to your workspace. Learn more about the [Model Context Protocol specification](https://modelcontextprotocol.io/).

### Supported MCP capabilities

VS Code supports local standard input/output (`stdio`), server-sent events (`sse`), and streamable HTTP (`http`) for MCP server transport. Currently of the [three primitives](https://modelcontextprotocol.io/specification/2025-03-26#features) (`tools`, `prompts`, `resources`), servers can only provide `tools` to Copilot's agent mode. The list and descriptions of tools can be updated dynamically using *list changed* events. VS Code provides servers with the current workspace folders using `roots` ([spec](https://modelcontextprotocol.io/docs/concepts/roots)).

### Finding MCP servers

MCP's [official server repository](https://github.com/modelcontextprotocol/servers) is a great starting point for reference, official, and community-contributed servers that showcase MCP's versatility. You can explore servers for various functionalities, such as file system operations, database interactions, and web services.

In addition to the official repository, several community-maintained directories can help you discover a wider range of MCP servers:

- [Glama MCP Server Directory](https://glama.ai/mcp/servers) - A curated collection of MCP servers organized by functionality and use case
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers/) - A GitHub repository listing community-contributed MCP servers with descriptions and examples

MCP is still a relatively new standard, and the ecosystem is rapidly evolving. As more developers adopt MCP, you can expect to see an increasing number of servers and tools available for integration with your projects.

## Enable MCP support in VS Code

> [!NOTE]
> MCP support in agent mode in VS Code is currently in preview.

MCP support is available starting in VS Code release 1.99. To enable MCP support in VS Code, enable the `setting(chat.mcp.enabled)` setting. This setting is enabled by default.

## Add an MCP server

You have multiple options to add an MCP server in VS Code:

- **Workspace settings**: add a `.vscode/mcp.json` file in your workspace to configure MCP servers for a workspace and share configurations with team members.
- **User settings**: specify the server in your user settings to enable the MCP server across all workspaces.
- **Automatic discovery**: enable autodiscovery of MCP servers defined in other tools, such as Claude Desktop.

> [!CAUTION]
> MCP servers can run arbitrary code on your machine. Only add servers from trusted sources, and review the publisher and server configuration before starting it.

To view and manage the list of configured MCP servers, run the **MCP: List Servers** command from the Command Palette.

After you add an MCP server, you can [use the tools it provides in agent mode](#use-mcp-tools-in-agent-mode).

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

> [!IMPORTANT]
> Follow the naming conventions for the server, as specified in the [Configuration format](#configuration-format) section.

### Add an MCP server to your user settings

To configure an MCP server for all your workspaces, you can add the server configuration to your user settings. This allows you to reuse the same server configuration across multiple projects.

Specify the server in the `setting(mcp)` VS Code [user settings](/docs/getstarted/personalize-vscode.md#configure-settings) to enable the MCP server across all workspaces.

```json
// settings.json
{
    "mcp": {
        "servers": {
            "my-mcp-server": {
                "type": "stdio",
                "command": "my-command",
                "args": []
            }
        }
    },
}
```

Alternatively, use the **MCP: Add Server** command from the Command Palette, provide the server information, and then select **User Settings** to add the server configuration to your user settings.

### Automatic discovery of MCP servers

VS Code can automatically detect and reuse MCP servers that you defined in other tools, such as Claude Desktop.

Enable autodiscovery with the `setting(chat.mcp.discovery.enabled)` setting.

## Configuration format

Use the following JSON configuration format to define MCP servers.

* The `"servers": {}` field holds the list of MCP servers, and follows Claude Desktop's configuration format.

    Specify the server name as the key and provide the server configuration as the value. VS Code shows the server name in the MCP server list. Follow these naming conventions for the server name:

    * Use camelCase for the server name, such as "uiTesting".
    * Avoid using whitespace or special characters.
    * Use a unique name for each server to avoid conflicts.
    * Use a descriptive name that reflects the server's functionality or brand, such as "github" or "database".

    Provide the following fields in the server configuration. You can use [predefined variables](/docs/reference/variables-reference.md) in the server configuration, for example to refer to the workspace folder (`${workspaceFolder}`).

    **Connect with `stdio`:**

    | Field | Description | Examples |
    |-------|-------------|----------|
    | `type` | Server connection type.  | `"stdio"` |
    | `command` | Command to start the server executable. The command needs to be available on your system path or contain its full path.<br/>If you use docker, don't use the detach option. | `"npx"`,`"node"`, `"python"`, `"docker"` |
    | `args` | Array of arguments passed to the command. | `["server.py", "--port", "3000"]` |
    | `env` | Environment variables for the server. | `{"API_KEY": "${input:api-key}"}` |
    | `envFile` | Path to an `.env` from which to load additional environment variables. | `"${workspaceFolder}/.env"` |

    **Connect with `sse` or `http`:**

    | Field | Description | Examples |
    |-------|-------------|----------|
    | `type` | Server connection type. VS Code first tries the streamable HTTP transport and falls back to SSE if HTTP is not supported. | `"sse"`, `"http"` |
    | `url` | URL of the server. | `"http://localhost:3000"` |
    | `headers` | HTTP headers for the server. | `{"API_KEY": "${input:api-key}"}` |

* The `"inputs": []` field lets you define custom placeholders for configuration values, avoiding hardcoding sensitive information.

    VS Code prompts you for these values when the server starts for the first time, and securely stores them for subsequent use. To avoid showing the typed value, set the `password` field to `true`.

    Learn more about how to configure [input variables](/docs/reference/variables-reference.md#input-variables) in VS Code.

### Configuration example

The following code snippet shows an example MCP server configuration that specifies three servers and defines an input placeholder for the API key.

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
        // https://github.com/modelcontextprotocol/servers/tree/main/src/fetch
        "fetch": {
            "type": "stdio",
            "command": "uvx",
            "args": ["mcp-server-fetch"]
        },
        "my-remote-server": {
            "type": "sse",
            "url": "http://api.contoso.com/sse",
            "headers": { "VERSION": "1.2" }
        }
    }
}
```

## Use MCP tools in agent mode

Once you have added an MCP server, you can use the tools it provides in agent mode. To use MCP tools in agent mode:

1. Open the **Chat** view (`kb(workbench.action.chat.open)`), and select **Agent** mode from the dropdown.

    ![Agent mode dropdown option](images/mcp-servers/chat-mode-agent.png)

1. Select the **Tools** button to view the list of available tools.

    Optionally, select or deselect the tools you want to use. You can search tools by typing in the search box.

    ![MCP tools list](images/mcp-servers/agent-mode-select-tools.png)

    > [!TIP]
    > You can also directly reference a tool in your prompt by typing `#` followed by the tool name. You can do this in all chat modes (ask, edit, and agent mode).

1. You can now enter a prompt in the chat input box and notice how tools are automatically invoked as needed.

    By default, when a tool is invoked, you need to confirm the action before it is run. This is because tools might run locally on your machine and might perform actions that modify files or data.

    Use the **Continue** button dropdown options to automatically confirm the specific tool for the current session, workspace, or all future invocations.

    ![MCP Tool Confirmation](images/mcp-servers/mcp-tool-confirmation.png)

1. Optionally, verify and edit the tool input parameters before running the tool.

    Select the chevron next to the tool name to view its details and input parameters. You can edit the input parameters before running the tool.

    ![MCP Tool Input Parameters](images/mcp-servers/mcp-tool-edit-parameters.png)

## Managing tools

Run the **MCP: List Servers** command from the Command Palette to view the list of configured MCP servers.

![MCP server list](images/mcp-servers/mcp-list-servers.png)

When you select a server, you can start, stop, or restart the server. You can also view the server configuration and server logs to diagnose issues.

> [!TIP]
> When you open the `.vscode/mcp.json` file, VS Code shows commands to start, stop, or restart a server directly from the editor.

![MCP server configuration with lenses to manage server.](images/mcp-servers/mcp-server-config-lenses.png)

### Command-line configuration

You can also use the VS Code command-line interface to add an MCP server to your user profile or to a workspace.

To add an MCP server to your user profile, use the `--add-mcp` command line option, and provide the JSON server configuration in the form `{\"name\":\"server-name\",\"command\":...}`.

```bash
code --add-mcp "{\"name\":\"my-server\",\"command\": \"uvx\",\"args\": [\"mcp-server-fetch\"]}"
```

#### URL handler

VS Code also includes a URL handler that you can use to install an MCP server. To form the URL, construct an `obj` object in the same format as you would provide to `--add-mcp`, and then create the link by using the following logic:

```typescript
// For Insiders, use `vscode-insiders` instead of `code`
const link = `vscode:mcp/install?${encodeURIComponent(JSON.stringify(obj))`;
```

This link can be used in a browser, or opened on the command line, for example via `xdg-open $LINK` on Linux.

## Troubleshooting

When VS Code encounters an issue with an MCP server, it shows an error indicator in the Chat view.

![MCP Server Error](images/mcp-servers/mcp-error-loading-tool.png)

Select the error notification in the Chat view, and then select the **Show Output** option to view the server logs. Alternatively, run **MCP: List Servers** from the Command Palette, select the server, and then choose **Show Output**.

![MCP Server Error Output](images/mcp-servers/mcp-server-error-output.png)

## Create an MCP server

VS Code has all the tools you need to develop your own MCP server. While MCP servers can be written in any language that can handle `stdout`, the MCP's official SDKs are a good place to start:

- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk)
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)

## Frequently asked questions

### Can I control which MCP tools are used?

Yes, you have several options to control which tools are active:

- Select the **Tools** button in the Chat view when in agent mode, and toggle specific tools on/off as needed.
- Add specific tools to your prompt by using the **Add Context** button or by typing `#`.
- For more advanced control, you can use `.github/copilot-instructions.md` to fine-tune tool usage.

### The MCP server is not starting when using Docker

Verify that the command arguments are correct and that the container is not running in detached mode (`-d` option). You can also check the MCP server output for any error messages (see [Troubleshooting](#troubleshooting)).

## Related resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Model Context Protocol Server repository](https://github.com/modelcontextprotocol/servers)
- [Use agent mode in Visual Studio Code](/docs/copilot/chat/chat-agent-mode.md)
