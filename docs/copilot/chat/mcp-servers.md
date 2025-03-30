---
ContentId: 7c550054-4ade-4665-b368-215798c48673
DateApproved: 03/05/2025
MetaDescription: Learn how to configure and use Model Context Protocol (MCP) servers with GitHub Copilot in Visual Studio Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
---

# Use MCP servers in Visual Studio Code (Preview)

Model Context Protocol (MCP) support enhances GitHub Copilot's agent mode. It enables you to use any MCP server directly in your agentic coding workflow. This article guides you through setting up MCP servers and using tools with agent mode in Visual Studio Code.

> [!NOTE]
> MCP support in agent mode in VS Code is currently in preview.

## What is MCP?

When you enter a chat prompt to a language model with agent mode in VS Code, the model can invoke various tools to perform tasks like file operations, accessing databases, or calling APIs in response to your request. MCP (Model Context Protocol) provides a standardized way to connect these tools to the language model. Learn more about [Model Context Protocol](https://modelcontextprotocol.info/).

_MCP servers_ are services that provide one or more tools to _MCP clients_ like VS Code. For example, a file system MCP server might provide tools for reading, writing, or searching files and directories. MCP servers can run locally on your machine or be hosted remotely.

VS Code supports both local and remote MCP servers, allowing you to add them to your workspace and use the tools they provide in agent mode.

## Add an MCP server

To add an MCP server to your workspace, follow these steps:

1. Configure an MCP server in the `.vscode/mcp.json` file in your workspace to share configurations with project collaborators.

    Create a `.vscode/mcp.json` file in your workspace and select the **Add Server** button to add a template for a new server. VS Code provides IntelliSense for the MCP server configuration file.

    Alternatively, run the **MCP: Add Server** command from the Command Palette and provide the server information to add a new MCP server configuration. Choose **Workspace Settings** to create the `.vscode/mcp.json` file in your workspace if it doesn't already exist.

    The following example shows how to configure a Perplexity MCP server, where VS Code prompts you for the API key when the server starts. Learn more about the [Configuration format](#configuration-format).

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
                    "@modelcontextprotocol/server-perplexity-ask"
                ],
                "env": {
                    "PERPLEXITY_API_KEY": "${input:perplexity-key}"
                }
            }
        }
    }
    ```

1. Alternatively, specify the server in the `setting(mcp)` VS Code [user settings](/docs/getstarted/personalize-vscode.md#configure-settings) to enable the MCP server across all workspaces.

    If you use the **MCP: Add Server** command from the Command Palette, choose **User Settings** to add a new MCP server configuration in user settings.

1. VS Code can automatically detect and reuse MCP servers that you defined in other tools, such as Claude Desktop.
Enable auto-discovery with the `setting(chat.mcp.discovery.enabled)` setting.

1. Run the **MCP: List Servers** command from the Command Palette to view and manage the configured MCP servers.

## Configuration format

Use the following JSON configuration format to define MCP servers.

- The `"servers": {}` field holds the list of MCP servers, and follows Claude Desktop's configuration format.

    Specify the server name as the key and provide the server configuration as the value. VS Code shows the server name in the MCP server list.

    Provide the following fields in the server configuration. You can use [predefined variables](/docs/reference/variables-reference.md) in the server configuration, for example to refer to the workspace folder (`${workspaceFolder}`).

    **Connect with `stdio`:**

    | Field | Description | Examples |
    |-------|-------------|----------|
    | `type` | Server connection type.  | `"stdio"` |
    | `command` | Command to start the server executable. | `"npx"`, `"python"`, `"docker"` |
    | `args` | Array of arguments passed to the command. | `["server.py", "--port", "3000"]` |
    | `env` | Environment variables for the server. | `{"API_KEY": "${input:api-key}"}` |
    | `envFile` | Path to an `.env` from which to load additional environment variables. | `"${workspaceFolder}/.env"` |

    **Connect with `sse`:**

    | Field | Description | Examples |
    |-------|-------------|----------|
    | `type` | Server connection type.  | `"sse"` |
    | `url` | URL of the server (for `"type": "sse"`). | `"http://localhost:3000"` |
    | `headers` | HTTP headers for the server (for `"type": "sse"`). | `{"API_KEY": "${input:api-key}"}` |

- The `"inputs": []` field lets you define custom placeholders for configuration values, avoiding hardcoding sensitive information.

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
// For Insiders, use `code-insiders` instead of `code`
const link = `code:mcp/install?${encodeURIComponent(JSON.stringify(obj))`;
```

This link can be used in a browser, or opened on the command line, for example via `xdg-open $LINK` on Linux.

## Troubleshooting

When VS Code encounters an issue with an MCP server, it shows a error indicator in the Chat view.

![MCP Server Error](images/mcp-servers/mcp-error-loading-tool.png)

Select the error notification in the Chat view, and then select the **Show Output** option to view the server logs. Alternatively, run **MCP: List Servers** from the Command Palette, select the server, and then choose **Show Output**.

![MCP Server Error Output](images/mcp-servers/mcp-server-error-output.png)

## Related resources

- [Model Context Protocol documentation](https://modelcontextprotocol.info/)
- [Use agent mode in Visual Studio Code](/docs/copilot/chat/chat-agent-mode.md)
