---
ContentId: a3e1f7c2-8d4b-4f9a-b6e5-2c8d3f1a9b7e
DateApproved: 02/04/2026
MetaDescription: Reference for MCP server configuration format, commands, and settings in Visual Studio Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- mcp
- model context protocol
- mcp.json
- configuration
- tools
- copilot
- reference
- ai
---
# MCP configuration reference

This article provides a reference for the MCP server configuration file format, related commands, and settings in VS Code. For information about adding and managing MCP servers, see [Add and manage MCP servers](/docs/copilot/customization/mcp-servers.md).

## Configuration file

MCP server configuration is stored in the `mcp.json` JSON file. This file can be in your workspace (`.vscode/mcp.json`) or in your [user profile](/docs/configure/profiles.md). VS Code provides IntelliSense for the configuration file.

### Configuration structure

The configuration file has two main sections:

* **`"servers": {}`**: an object that maps server names to their configurations. Each key is the server name, and the value is the server configuration object. Depending on the server type, different fields are required.

* **`"inputs": []`**: an optional array of input variable definitions for sensitive information like API keys.

You can use [predefined variables](/docs/reference/variables-reference.md) in the server configuration, for example to refer to the workspace folder (`${workspaceFolder}`).

### Standard I/O (stdio) servers

Use this configuration for servers that communicate through standard input and output streams. This is the most common type for locally-run MCP servers.

| Field | Required | Description | Examples |
|-------|----------|-------------|----------|
| `type` | Yes | Server connection type | `"stdio"` |
| `command` | Yes | Command to start the server executable. Must be available on your system path or contain its full path. | `"npx"`, `"node"`, `"python"`, `"docker"` |
| `args` | No | Array of arguments passed to the command | `["server.py", "--port", "3000"]` |
| `env` | No | Environment variables for the server | `{"API_KEY": "${input:api-key}"}` |
| `envFile` | No | Path to an environment file to load more variables | `"${workspaceFolder}/.env"` |

> [!NOTE]
> When using Docker with stdio servers, don't use the detach option (`-d`). The server must run in the foreground to communicate with VS Code.

<details>
<summary>Example local server configuration</summary>

This example shows the minimal configuration for a basic, local MCP server using `npx`:

```json
{
    "servers": {
        "memory": {
            "command": "npx",
            "args": [
            "-y",
            "@modelcontextprotocol/server-memory"
            ]
        }
    }
}
```

</details>

### HTTP and Server-Sent Events (SSE) servers

Use this configuration for servers that communicate over HTTP. VS Code first tries the HTTP Stream transport and falls back to SSE if HTTP is not supported.

| Field | Required | Description | Examples |
|-------|----------|-------------|----------|
| `type` | Yes | Server connection type | `"http"`, `"sse"` |
| `url` | Yes | URL of the server | `"http://localhost:3000"`, `"https://api.example.com/mcp"` |
| `headers` | No | HTTP headers for authentication or configuration | `{"Authorization": "Bearer ${input:api-token}"}` |

In addition to servers available over the network, VS Code can connect to MCP servers listening for HTTP traffic on Unix sockets or Windows named pipes by specifying the socket or pipe path in the form `unix:///path/to/server.sock` or `pipe:///pipe/named-pipe` on Windows. You can specify subpaths by using a URL fragment, such as `unix:///tmp/server.sock#/mcp/subpath`.

<details>
<summary>Example remote server configuration</summary>

This example shows the minimal configuration for a remote MCP server without authentication:

```json
{
    "servers": {
        "context7": {
            "type": "http",
            "url": "https://mcp.context7.com/mcp"
        }
    }
}
```

</details>

### Input variables for sensitive data

Input variables let you define placeholders for configuration values, avoiding the need to hardcode sensitive information like API keys or passwords directly in the server configuration.

When you reference an input variable using `${input:variable-id}`, VS Code prompts you for the value when the server starts for the first time. The value is then securely stored for subsequent use. Learn more about [input variables](/docs/reference/variables-reference.md#input-variables) in VS Code.

**Input variable properties:**

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `type` | Yes | Type of input prompt | `"promptString"` |
| `id` | Yes | Unique identifier to reference in server config | `"api-key"`, `"database-url"` |
| `description` | Yes | User-friendly prompt text | `"GitHub Personal Access Token"` |
| `password` | No | Hide typed input (default: false) | `true` for API keys and passwords |

<details>
<summary>Example server configuration with input variables</summary>

This example configures a local server that requires an API key:

```json
{
    "inputs": [
        {
            "type": "promptString",
            "id": "perplexity-key",
            "description": "Perplexity API Key",
            "password": true
        }
    ],
    "servers": {
        "perplexity": {
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

</details>

### Development mode

You can enable _development mode_ for MCP servers by adding a `dev` key to the server configuration. This is an object with two properties:

* `watch`: A file glob pattern to watch for file changes that restarts the MCP server.
* `debug`: Enables you to set up a debugger with the MCP server. Currently, VS Code supports debugging Node.js and Python MCP servers.

Learn more about [MCP development mode](/api/extension-guides/ai/mcp.md#mcp-development-mode-in-vs-code) in the MCP Dev Guide.

### Server naming conventions

When defining MCP servers, follow these naming conventions for the server name:

* Use camelCase for the server name, such as "uiTesting" or "githubIntegration"
* Avoid using whitespace or special characters
* Use a unique name for each server to avoid conflicts
* Use a descriptive name that reflects the server's functionality or brand, such as "github" or "database"

## Commands

The following table lists the MCP-related commands available in the Command Palette (`kb(workbench.action.showCommands)`).

| Command | Description |
|---------|-------------|
| **MCP: Add Server** | Add a new MCP server to your workspace or user profile. |
| **MCP: Browse MCP Servers** | Open the MCP server gallery in the Extensions view. |
| **MCP: Browse Resources** | Browse resources provided by MCP servers. |
| **MCP: Install Server from Manifest** | Install an MCP server from an MCP manifest file. |
| **MCP: List Servers** | List all configured MCP servers and perform actions like start, stop, restart, or show output. |
| **MCP: Open Remote User Configuration** | Open the `mcp.json` file for the remote environment. |
| **MCP: Open User Configuration** | Open the `mcp.json` file in your user profile. |
| **MCP: Open Workspace Folder MCP Configuration** | Open the `.vscode/mcp.json` file in your workspace. |
| **MCP: Reset Cached Tools** | Clear the cached list of tools for MCP servers. Use this when a server's tools have changed. |
| **MCP: Reset Trust** | Reset trust decisions for MCP servers, requiring re-confirmation on next start. |
| **MCP: Show Installed Servers** | Show a list of all installed MCP servers. |

## Settings

For a full list of VS Code AI settings, see the [AI Settings Reference](/docs/copilot/reference/copilot-settings.md). The following settings are specific to MCP servers.

| Setting | Description |
|---------|-------------|
| `setting(chat.mcp.access)` | Manage which MCP servers can be used in VS Code. |
| `setting(chat.mcp.discovery.enabled)` | Configure automatic discovery of MCP server configuration from other applications. |
| `setting(chat.mcp.autostart)` (Experimental) | Automatically start MCP servers when configuration changes are detected. |
| `setting(chat.mcp.serverSampling)` | Configure which models are exposed to MCP servers for sampling (making requests in the background). |
| `setting(chat.mcp.apps.enabled)` (Experimental) | Enable or disable MCP Apps, which are rich user interfaces provided by MCP servers. |

## Related resources

* [Add and manage MCP servers](/docs/copilot/customization/mcp-servers.md)
* [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
* [MCP Dev Guide](/docs/copilot/guides/mcp-developer-guide.md)
