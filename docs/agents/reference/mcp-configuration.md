---
ContentId: a3e1f7c2-8d4b-4f9a-b6e5-2c8d3f1a9b7e
DateApproved: 10/28/2026
MetaDescription: Configure MCP servers in {% data variables.product.prodname_vscode %} with reference details for file formats, commands, settings, and sandboxing.
MetaSocialImage: ../../agent-customization/images/mcp-servers/mcp-server-configuration-form.png
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

This article provides the MCP configuration formats, supported fields, commands, and settings in {% data variables.product.prodname_vscode_shortname %}. To connect your first server, see [Add MCP servers](/docs/agent-customization/mcp-servers.md). For operational tasks, see [Manage and troubleshoot MCP servers](/docs/agents/run/manage-mcp-servers.md).

## Configuration file

MCP server configuration uses one of the following file formats:

* The {% data variables.product.prodname_vscode_shortname %} format is stored in `.vscode/mcp.json` in your workspace or in your [user profile](/docs/configure/profiles.md). It defines servers in a top-level `servers` object. {% data variables.product.prodname_vscode_shortname %} provides IntelliSense for this format.
* The portable {% data variables.product.prodname_copilot_short %} format is stored in `.mcp.json` at the root of your workspace or in `$COPILOT_HOME/mcp-config.json` for your user, with `~/.copilot/mcp-config.json` as the fallback location. It defines servers in a top-level `mcpServers` object.

Copilot harness sessions read the portable format directly. {% data variables.product.prodname_vscode_shortname %} forwards eligible servers from the {% data variables.product.prodname_vscode_shortname %} format to the session, except servers that require interactive input, such as `${input:...}` variables. The agent doesn't read `.vscode/mcp.json` directly. For setup steps, see [Choose a configuration destination](/docs/agent-customization/mcp-servers.md#choose-a-configuration-destination).

For other providers, use the provider's MCP configuration documentation. Their configuration locations and schemas can differ from the two formats described here.

The formats and locations differ in the capabilities they support:

| Capability | Workspace or profile `mcp.json` | Workspace-root `.mcp.json` | Copilot user `mcp-config.json` |
|------------|---------------------------------|----------------------------|--------------------------------|
| Top-level server object | `servers` | `mcpServers` | `mcpServers` |
| Agent Customizations editor | Read-only JSON | Configuration form | Configuration form |
| Server transports | stdio, HTTP, and SSE | stdio and HTTP | stdio, HTTP, and SSE |
| Environment-variable references | `${env:NAME}` | `${NAME}` or `${NAME:-default}` | `${NAME}` or `${NAME:-default}` |
| Working directory | Yes | No | Yes |
| Environment file | Yes | No | No |
| {% data variables.product.prodname_vscode_shortname %} input variables | Yes | No | No |
| Development mode and per-server sandboxing | Yes | No | No |

The configuration form preserves properties that it doesn't display. Select **Other Properties** in the form to open the complete server entry in JSON.

### Portable configuration

Use a top-level `mcpServers` object in workspace-root `.mcp.json` or Copilot user `mcp-config.json`. This example configures one local Playwright server:

```json
{
    "mcpServers": {
        "playwright": {
            "command": "npx",
            "args": ["-y", "@playwright/mcp@latest"]
        }
    }
}
```

Install the publisher's runtime prerequisites before starting the server. The [Playwright setup requirements](https://github.com/microsoft/playwright-mcp#requirements) include Node.js 18 or newer.

For an HTTP server, replace the server entry with the publisher's endpoint:

```json
{
    "mcpServers": {
        "context7": {
            "type": "http",
            "url": "https://mcp.context7.com/mcp"
        }
    }
}
```

Follow the [Context7 setup instructions](https://context7.com/docs/resources/all-clients) for authentication and service limits. An endpoint alone doesn't grant access to a service.

The property tables below describe the {% data variables.product.prodname_vscode_shortname %} format, not a shared schema for all MCP clients. Check the [capability comparison](#configuration-file) before copying properties into a portable file.

### Environment-variable references

Portable configurations support environment variables independently of {% data variables.product.prodname_vscode_shortname %} input prompts. Use `${NAME}` to reference a value, or `${NAME:-default}` for a non-secret default. Stdio servers can use references in `command`, `args`, and `env` values. HTTP servers can use them in header values.

Provide variables in the environment of the host that runs or connects to the server. For remote sessions, that is the remote host or container. Use the braced `${NAME}` form for compatibility across the Copilot runtime and the {% data variables.product.prodname_vscode_shortname %} MCP client, which treats bare `$NAME` as literal text.

You can edit environment variables and HTTP headers in the [MCP configuration form](/docs/agents/run/manage-mcp-servers.md#edit-an-mcp-server-configuration). The form writes the configured values to the file. Enter references rather than literal credentials.

Support for environment variables does not include `envFile`, input prompting, or a bridge to {% data variables.product.prodname_vscode_shortname %} `SecretStorage`. For a worked example, see [Replace input prompts with environment variables](/docs/agent-customization/migrate-customizations.md#replace-input-prompts-with-environment-variables).

### Configuration structure

The following structure applies to the {% data variables.product.prodname_vscode_shortname %} format. The portable Copilot format uses a separate schema with a top-level `mcpServers` object.

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
| `sandbox` | No | File system and network permissions for this server. Root-level sandbox deny rules also apply. | `{"filesystem": {"allowWrite": ["${workspaceFolder}"]}}` |

> [!NOTE]
> When using Docker with stdio servers, don't use the detach option (`-d`). The server must run in the foreground to communicate with {% data variables.product.prodname_vscode_shortname %}.

<details>
<summary>Example local server configuration</summary>

This example configures the same Playwright server in the {% data variables.product.prodname_vscode_shortname %} format:

```json
{
    "servers": {
        "playwright": {
            "type": "stdio",
            "command": "npx",
            "args": ["-y", "@playwright/mcp@latest"]
        }
    }
}
```

</details>

### Sandbox configuration

You can enable sandboxing for locally-running stdio MCP servers to restrict their access to the file system and network. Sandbox rules can deny file access, grant write access, and grant access to specific network domains. Sandboxing is available on macOS and Linux only.

To enable sandboxing for a server, set `"sandboxEnabled": true` in its configuration. Add a `sandbox` object to the server to define its file system and network permissions. You can also add a top-level `sandbox` object as a sibling of `servers` and `inputs` to define deny rules that apply to all sandboxed servers in the file.

Allow rules are supported only in a server's `sandbox` object. Top-level `allowWrite` and `allowedDomains` rules are ignored.

> [!NOTE]
> When sandboxing is enabled, tool confirmations are auto-approved because the server runs in a controlled environment.

The server-level and top-level `sandbox` objects support the following properties:

| Property | Type | Supported scope | Description |
|----------|------|-----------------|-------------|
| `filesystem.allowWrite` | string[] | Server only | File paths that the server is allowed to write to. |
| `filesystem.denyRead` | string[] | Server and top level | File paths that the server is not allowed to read. |
| `filesystem.denyWrite` | string[] | Server and top level | File paths that the server is not allowed to write to. |
| `network.allowedDomains` | string[] | Server only | Domains that the server is allowed to access. Wildcards are supported, for example `*.example.com`. |
| `network.deniedDomains` | string[] | Server and top level | Domains that the server is not allowed to access. |

You can use [predefined variables](/docs/reference/variables-reference.md), such as `${workspaceFolder}`, in file system path values.

<details>
<summary>Example sandbox configuration</summary>

This example grants one server write access to the workspace and network access to specific domains. The top-level rule denies all sandboxed servers in the file access to the `.ssh` directory:

```json
{
    "servers": {
        "myServer": {
            "type": "stdio",
            "command": "npx",
            "args": ["-y", "@example/mcp-server"],
            "sandboxEnabled": true,
            "sandbox": {
                "filesystem": {
                    "allowWrite": ["${workspaceFolder}"]
                },
                "network": {
                    "allowedDomains": ["api.example.com", "*.cdn.example.com"]
                }
            }
        }
    },
    "sandbox": {
        "filesystem": {
            "denyRead": ["${userHome}/.ssh"]
        }
    }
}
```

</details>

### HTTP and Server-Sent Events (SSE) servers

Use this configuration for servers that communicate over HTTP. {% data variables.product.prodname_vscode_shortname %} first tries the HTTP Stream transport and falls back to SSE if HTTP is not supported.

| Field | Required | Description | Examples |
|-------|----------|-------------|----------|
| `type` | Yes | Server connection type | `"http"`, `"sse"` |
| `url` | Yes | URL of the server | `"http://localhost:3000"`, `"https://api.example.com/mcp"` |
| `headers` | No | HTTP headers for authentication or configuration | `{"Authorization": "Bearer ${input:api-token}"}` |
| `oauth` | No | OAuth configuration for authenticating with the server | `{"clientId": "example-client-id"}` |

In addition to servers available over the network, {% data variables.product.prodname_vscode_shortname %} can connect to MCP servers listening for HTTP traffic on Unix sockets or Windows named pipes by specifying the socket or pipe path in the form `unix:///path/to/server.sock` or `pipe:///pipe/named-pipe` on Windows. You can specify subpaths by using a URL fragment, such as `unix:///tmp/server.sock#/mcp/subpath`.

The `oauth` object supports the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `clientId` | string | Yes | The OAuth client ID to use when authenticating with the server. |

> [!NOTE]
> When `oauth` is configured, {% data variables.product.prodname_vscode_shortname %} handles the OAuth flow automatically. A browser window opens for authorization on the first connection to the server.

<details>
<summary>Example remote server configuration</summary>

This example specifies a remote MCP endpoint. Follow the publisher's authentication instructions before using it:

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

This example shows the configuration for an MCP server that uses OAuth for authentication. On first use, {% data variables.product.prodname_vscode_shortname %} opens a browser window to complete the OAuth flow.

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

### Authentication and secrets

Authentication grants access to an external service. It is separate from trusting a server to start and approving individual tool calls.

Choose an authentication method that both the server and your configuration support:

| Server requirement | Guidance |
|--------------------|----------|
| Browser sign-in or OAuth | Follow the publisher's connection instructions and review the requested permissions. Complete the authorization flow when prompted. The `oauth` fields above apply to the {% data variables.product.prodname_vscode_shortname %} format. |
| Environment variables | Portable configurations support [environment-variable references](#environment-variable-references) in stdio server configuration and HTTP headers. Provide credentials in the environment of the host that runs or connects to the server, not only in an unrelated terminal or on your local machine for a remote session. |
| {% data variables.product.prodname_vscode_shortname %} input prompts | Use the [input variables](#input-variables-for-sensitive-data) supported by the {% data variables.product.prodname_vscode_shortname %} format. Servers requiring these interactive inputs aren't forwarded to Copilot harness sessions. |
| An environment file | `envFile` is supported in the {% data variables.product.prodname_vscode_shortname %} format, not in portable `.mcp.json` or Copilot user `mcp-config.json`. Keep files containing credentials out of source control. |

Do not commit tokens, passwords, or populated authentication headers. A personal configuration file is not a secret store. For a server that requires a fixed token, follow its publisher's secure configuration guidance for your client and harness rather than copying credentials into a shared example.

The Copilot harness has no built-in MCP configuration option to forward a `${input:...}` secret or read an existing {% data variables.product.prodname_vscode_shortname %} `SecretStorage` value into an HTTP authentication header. OAuth can be an alternative when the server supports it, but it does not substitute a prompted API key. If your integration requires a static bearer token without environment variables or credentials in files, see the [migration FAQ](/docs/agent-customization/migrate-customizations.md#can-copilot-pass-a-prompted-secret-to-an-http-mcp-server-without-an-environment-variable-or-a-file).

### Input variables for sensitive data

Input variables in the {% data variables.product.prodname_vscode_shortname %} format let you define placeholders for values such as API keys or passwords. They aren't supported in portable configuration files, and servers that require them aren't forwarded to Copilot harness sessions.

Forwarding rejects input and command variables before resolving them. Entering or caching the secret in a Local session first does not make the server available to Copilot. Keep the original configuration until a supported authentication method works in the destination harness.

When you reference an input variable using `${input:variable-id}`, {% data variables.product.prodname_vscode_shortname %} prompts you for the value when the server starts for the first time. The value is then securely stored for subsequent use. Learn more about [input variables](/docs/reference/variables-reference.md#input-variables) in {% data variables.product.prodname_vscode_shortname %}.

Each input variable has a `type` that determines how {% data variables.product.prodname_vscode_shortname %} prompts for the value. The following input types are supported:

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
* `debug`: Enables you to set up a debugger with the MCP server. Currently, {% data variables.product.prodname_vscode_shortname %} supports debugging Node.js and Python MCP servers. Available for stdio servers only.

Learn more about [MCP development mode](/api/extension-guides/ai/mcp.md#mcp-development-mode-in-vs-code) in the MCP Dev Guide.

### Server naming conventions

When defining MCP servers, follow these naming conventions for the server name:

* Use camelCase for the server name, such as "uiTesting" or "githubIntegration"
* Avoid using whitespace or special characters
* Use a unique name for each server to avoid conflicts
* Use a descriptive name that reflects the server's functionality or brand, such as "github" or "database"

## Automatic MCP server discovery

{% data variables.product.prodname_vscode_shortname %} can automatically detect and reuse MCP server configurations from supported applications. Use `setting(chat.mcp.discovery.enabled)` to select the discovery sources.

| Source | Setting property | Configuration location |
|--------|------------------|------------------------|
| Claude Desktop | `claude-desktop` | Windows: `%APPDATA%\Claude\claude_desktop_config.json`<br/>macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`<br/>Linux: `$XDG_CONFIG_HOME/Claude/claude_desktop_config.json`, or `~/.config/Claude/claude_desktop_config.json` if `XDG_CONFIG_HOME` is not set |
| {% data variables.copilot.copilot_cli %} | `copilot` | `<COPILOT_HOME>/mcp-config.json`, or `~/.copilot/mcp-config.json` if `COPILOT_HOME` is not set |
| Cursor (global) | `cursor-global` | `~/.cursor/mcp.json` |
| Cursor (workspace) | `cursor-workspace` | `<workspace>/.cursor/mcp.json` |
| Windsurf | `windsurf` | `~/.codeium/windsurf/mcp_config.json` |

{% data variables.copilot.copilot_cli %} discovery is on by default. All other discovery sources are off by default. In a remote window, {% data variables.product.prodname_vscode_shortname %} resolves configuration locations and environment variables in the remote environment.

For {% data variables.copilot.copilot_cli %}, setting `COPILOT_HOME` replaces the default `~/.copilot` location. {% data variables.product.prodname_vscode_shortname %} does not check both locations.

> [!NOTE]
> Copilot harness sessions read the {% data variables.copilot.copilot_cli %} MCP configuration independently, whether you use the {% data variables.copilot.chat_view %} or {% data variables.copilot.agents_window %}. The discovery setting does not change how these sessions receive MCP servers. See [configuration formats and forwarding](#configuration-file).

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
| **MCP: Reset Trust** | Reset separate trust decisions for MCP servers from non-workspace sources. Workspace MCP servers inherit Workspace Trust and are unaffected. |
| **MCP: Show Installed Servers** | Show a list of all installed MCP servers. |

### Command-line installation

Use `code --add-mcp` with a JSON object containing a unique `name` and the server configuration. The command adds a server to the {% data variables.product.prodname_vscode_shortname %} user-profile configuration.

For example, from a Bash shell:

```bash
code --add-mcp '{"name":"playwright","type":"stdio","command":"npx","args":["-y","@playwright/mcp@latest"]}'
```

This uses the {% data variables.product.prodname_vscode_shortname %} format, not the portable Copilot user file. To choose a portable destination, use the [guided connection flow](/docs/agent-customization/mcp-servers.md#connect-a-server). After installation, [verify a tool call](/docs/agent-customization/mcp-servers.md#verify-the-first-tool-call).

## Settings

For a full list of {% data variables.product.prodname_vscode_shortname %} AI settings, see the [AI Settings Reference](/docs/agents/reference/ai-settings.md). The following settings are specific to MCP servers.

| Setting | Description |
|---------|-------------|
| `setting(chat.mcp.access)` | Manage which MCP servers can be used in {% data variables.product.prodname_vscode_shortname %}. |
| `setting(chat.mcp.discovery.enabled)` | Configure automatic discovery of MCP server configuration from other applications. |
| `setting(chat.mcp.workspaceRootConfig.enabled)` | (Experimental) Control whether **MCP: Add Server** offers the workspace-root `.mcp.json` destination. Existing `.mcp.json` files remain available when this setting is off. |
| `setting(chat.mcp.autostart)` `feature(mcp-autostart)` | Control which MCP servers {% data variables.product.prodname_vscode_shortname %} starts automatically when you submit a chat message. This setting doesn't prevent a Copilot harness session from starting servers it manages independently. See [MCP autostart behavior](/docs/agents/run/manage-mcp-servers.md#automatically-start-mcp-servers). |
| `setting(chat.mcp.serverSampling)` | Configure which models are exposed to MCP servers for sampling (making requests in the background). |
| `setting(chat.mcp.apps.enabled)` `feature(mcp-apps)` | Enable or disable MCP Apps, which are rich user interfaces provided by MCP servers. |
| `setting(accessibility.verbosity.mcpServerConfiguration)` | Control whether the MCP server configuration form announces information about opening Accessibility Help. |

## Related resources

* [Add MCP servers](/docs/agent-customization/mcp-servers.md)
* [Manage and troubleshoot MCP servers](/docs/agents/run/manage-mcp-servers.md)
* [MCP tool extensibility overview](/api/extension-guides/ai/ai-extensibility-overview.md#mcp-tool)
