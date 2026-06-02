---
ContentId: a3e1f7c2-8d4b-4f9a-b6e5-2c8d3f1a9b7e
DateApproved: 6/3/2026
MetaDescription: Reference for MCP server configuration format, commands, and settings in Visual Studio Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- mcp
- model context protocol
- mcp.json
- configuration
- sandbox
- tools
- copilot
- reference
- ai
---
# MCP configuration reference

This article provides a reference for the MCP server configuration file format, related commands, and settings in VS Code. For information about adding and managing MCP servers, see [Add and manage MCP servers](/docs/agent-customization/mcp-servers.md).

## Configuration file

MCP server configuration is stored in the `mcp.json` JSON file. This file can be in your workspace (`.vscode/mcp.json`) or in your [user profile](/docs/configure/profiles.md). VS Code provides IntelliSense for the configuration file.

### Configuration structure

The configuration file has three main sections:

* **`"servers": {}`**: an object that maps server names to their configurations. Each key is the server name, and the value is the server configuration object. Depending on the server type, different fields are required.

* **`"inputs": []`**: an optional array of input variable definitions for sensitive information like API keys.

* **`"sandbox": {}`**: an optional object that defines file system and network access rules for sandboxed servers. See [Sandbox configuration](#sandbox-configuration). Only applies on macOS and Linux.

You can use [predefined variables](/docs/reference/variables-reference.md) in the server configuration, for example to refer to the workspace folder (`${workspaceFolder}`).

### Standard I/O (stdio) servers

Use this configuration for servers that communicate through standard input and output streams. This is the most common type for locally-run MCP servers.

| Field | Required | Description | Examples |
|-------|----------|-------------|----------|
| `type` | Yes | Server connection type | `"stdio"` |
| `command` | Yes | Command to start the server executable. Must be available on your system path or contain its full path. | `"npx"`, `"node"`, `"python"`, `"docker"` |
| `args` | No | Array of arguments passed to the command | `["server.py", "--port", "3000"]` |
| `cwd` | No | Working directory for the server command. Defaults to the workspace folder when run in a workspace. | `"${workspaceFolder}"` |
| `env` | No | Environment variables for the server. Values can be strings, numbers, or null. | `{"API_KEY": "${input:api-key}"}` |
| `envFile` | No | Path to an environment file to load more variables | `"${workspaceFolder}/.env"` |
| `dev` | No | Development mode settings to watch for file changes and debug the server. See [Development mode](#development-mode). | `{"watch": "src/**/*.ts"}` |
| `sandboxEnabled` | No | Run the server in a sandboxed environment. Only supported on macOS and Linux. | `true` |

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

### Sandbox configuration

You can enable sandboxing for locally-running stdio MCP servers to restrict their access to the file system and network. Sandboxed servers can only access the file system paths and network domains that you explicitly permit. Sandboxing is available on macOS and Linux only.

To enable sandboxing for a server, set `\"sandboxEnabled\": true` in its configuration. Then, define a top-level `sandbox` object to specify the file system and network access rules. The `sandbox` object is a sibling of `servers` and `inputs`, and its rules apply to all sandboxed servers. When a sandboxed server needs access that the current rules don't permit, check the server output for error messages and update the `sandbox` configuration accordingly.

> [!NOTE]
> When sandboxing is enabled, tool confirmations are auto-approved because the server runs in a controlled environment.

The `sandbox` object supports the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `filesystem.allowWrite` | string[] | File paths that the server is allowed to write to. |
| `filesystem.denyRead` | string[] | File paths that the server is not allowed to read. |
| `filesystem.denyWrite` | string[] | File paths that the server is not allowed to write to. |
| `network.allowedDomains` | string[] | Domains that the server is allowed to access. Wildcards are supported, for example `*.example.com`. |
| `network.deniedDomains` | string[] | Domains that the server is not allowed to access. |

You can use [predefined variables](/docs/reference/variables-reference.md), such as `${workspaceFolder}`, in file system path values.

<details>
<summary>Example sandbox configuration</summary>

This example enables sandboxing and grants write access to the workspace, denies read access to the `.ssh` directory, and allows network access to specific domains:

```json
{
    "servers": {
        "myServer": {
            "type": "stdio",
            "command": "npx",
            "args": ["-y", "@example/mcp-server"],
            "sandboxEnabled": true
        }
    },
    "sandbox": {
        "filesystem": {
            "allowWrite": ["${workspaceFolder}"],
            "denyRead": ["${userHome}/.ssh"]
        },
        "network": {
            "allowedDomains": ["api.example.com", "*.cdn.example.com"]
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
| `oauth` | No | OAuth configuration for authenticating with the server | `{"clientId": "example-client-id"}` |

In addition to servers available over the network, VS Code can connect to MCP servers listening for HTTP traffic on Unix sockets or Windows named pipes by specifying the socket or pipe path in the form `unix:///path/to/server.sock` or `pipe:///pipe/named-pipe` on Windows. You can specify subpaths by using a URL fragment, such as `unix:///tmp/server.sock#/mcp/subpath`.

The `oauth` object supports the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `clientId` | string | Yes | The OAuth client ID to use when authenticating with the server. |
| `enterpriseManaged` | boolean | No | (Preview) Authenticate through the enterprise single sign-on (SSO) issuer configured by the `mcp.enterpriseManagedAuth.idp` setting, using the OAuth Identity Assertion Authorization Grant (ID-JAG). After a one-time sign-in, subsequent enterprise-managed servers connect silently. Default is `false`. |

> [!NOTE]
> When `oauth` is configured, VS Code handles the OAuth flow automatically. A browser window opens for authorization on the first connection to the server.

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

<details>
<summary>Example HTTP server with OAuth</summary>

This example shows the configuration for an MCP server that uses OAuth for authentication. On first use, VS Code opens a browser window to complete the OAuth flow.

```json
{
    "servers": {
        "slack": {
            "type": "http",
            "url": "https://mcp.slack.com/mcp",
            "oauth": {
                "clientId": "example-client-id"
            }
        }
    }
}
```

</details>

### Input variables for sensitive data

Input variables let you define placeholders for configuration values, avoiding the need to hardcode sensitive information like API keys or passwords directly in the server configuration.

When you reference an input variable using `${input:variable-id}`, VS Code prompts you for the value when the server starts for the first time. The value is then securely stored for subsequent use. Learn more about [input variables](/docs/reference/variables-reference.md#input-variables) in VS Code.

Each input variable has a `type` that determines how VS Code prompts for the value. The following input types are supported:

* `promptString`: opens an input box to ask the user for a free-text value.
* `pickString`: shows a list of options for the user to choose from.
* `command`: runs a command and uses its result as the input value.

**Common properties:**

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `type` | Yes | Type of input prompt: `promptString`, `pickString`, or `command` | `"promptString"` |
| `id` | Yes | Unique identifier to reference in server config | `"api-key"`, `"database-url"` |

**`promptString` properties:**

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `description` | Yes | User-friendly prompt text | `"GitHub Personal Access Token"` |
| `default` | No | Default value for the input | `"https://localhost"` |
| `password` | No | Hide typed input (default: false) | `true` for API keys and passwords |

**`pickString` properties:**

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `description` | Yes | User-friendly prompt text | `"Select an environment"` |
| `options` | Yes | Array of options to choose from. Each option is a string, or an object with `label` and `value` properties. | `["dev", "prod"]` |
| `default` | No | Default value for the input | `"dev"` |

**`command` properties:**

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `command` | Yes | Command ID to run to obtain the input value | `"myExtension.getApiKey"` |
| `args` | No | Arguments passed to the command. Can be a string, array, or object. | `{ "scope": "global" }` |

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

* `watch`: A glob pattern, or an array of glob patterns, to watch for file changes that restart the MCP server. Available for all server types.
* `debug`: Enables you to set up a debugger with the MCP server. Currently, VS Code supports debugging Node.js and Python MCP servers. Available for stdio servers only.

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

For a full list of VS Code AI settings, see the [AI Settings Reference](/docs/agents/reference/copilot-settings.md). The following settings are specific to MCP servers.

| Setting | Description |
|---------|-------------|
| `setting(chat.mcp.access)` | Manage which MCP servers can be used in VS Code. |
| `setting(chat.mcp.discovery.enabled)` | Configure automatic discovery of MCP server configuration from other applications. |
| `setting(chat.mcp.autostart)` (Experimental) | Automatically start MCP servers when configuration changes are detected. |
| `setting(chat.mcp.serverSampling)` | Configure which models are exposed to MCP servers for sampling (making requests in the background). |
| `setting(chat.mcp.apps.enabled)` (Experimental) | Enable or disable MCP Apps, which are rich user interfaces provided by MCP servers. |

## Related resources

* [Add and manage MCP servers](/docs/agent-customization/mcp-servers.md)
* [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
* [MCP Dev Guide](/docs/agents/guides/mcp-developer-guide.md)
