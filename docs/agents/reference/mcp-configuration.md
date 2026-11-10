---
ContentId: a3e1f7c2-8d4b-4f9a-b6e5-2c8d3f1a9b7e
DateApproved: 11/11/2026
MetaDescription: Configure MCP servers for the {% data variables.product.prodname_copilot_short %} harness with portable files, authentication, and tool controls.
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

Configure MCP servers for the {% data variables.product.prodname_copilot_short %} harness with the portable `mcpServers` format. This reference covers configuration locations, fields, authentication, and relevant controls.

* **Connect a server to Copilot:** [choose a configuration destination](#configure-mcp-for-copilot), then use the [portable examples and fields](#portable-configuration).
* **Reuse an existing editor configuration:** check [forwarding and migration](#editor-forwarding-to-copilot).
* **Maintain a deprecated Local configuration:** use the separate [Local compatibility reference](#editor-managed-configuration-for-local-harness-compatibility).

For a complete first-time walkthrough, see [Add MCP servers](/docs/agent-customization/mcp-servers.md). To operate an existing server, see [Manage and troubleshoot MCP servers](/docs/agents/run/manage-mcp-servers.md).

Configuration compatibility is separate from protocol support. For tools, prompts, resources, roots, sampling, elicitation, and MCP Apps, see [MCP support and limitations](/api/extension-guides/ai/mcp.md#mcp-features-supported-by-vs-code).

## Configure MCP for Copilot

Use the Agent Customizations editor to add a server to the intended Copilot session:

1. Select the **Copilot** harness in a chat session, then run **Chat: Open Customizations** and select **MCP Servers**.

1. Select **Add Server**, provide the publisher's command or endpoint, and choose a destination below. For personal configuration, select **Global** > **Copilot Global**.

1. Complete any authentication prompts and [verify a tool call](/docs/agent-customization/mcp-servers.md#verify-the-first-tool-call). Adding a configuration alone doesn't confirm that the session can use the server.

### Configuration file

Choose a native Copilot destination. Both files use a top-level `mcpServers` object, and the harness reads them directly.

| Your goal | Configuration file | Guided setup destination |
|-----------|--------------------|--------------------------|
| Use a server across your workspaces | `$COPILOT_HOME/mcp-config.json`, or `~/.copilot/mcp-config.json` when `COPILOT_HOME` is unset | **Global** > **Copilot Global** |
| Share server definitions with your team | `.mcp.json` at the workspace root | Workspace-root `.mcp.json`, offered when the Experimental `setting(chat.mcp.workspaceRootConfig.enabled)` setting is on |

As an alternative to guided setup, edit the native file using the [portable configuration examples](#portable-configuration). Existing workspace-root `.mcp.json` files remain available when the guided-setup setting is off.

> [!IMPORTANT]
> For new Copilot configurations, use these native destinations, not `.vscode/mcp.json` or profile `mcp.json`. Those files use the deprecated Local harness's `feature(local-harness)` editor-managed `servers` format. Eligible existing definitions can be [forwarded](#editor-forwarding-to-copilot), but the harness doesn't read those files directly.

[Plugin-provided servers](/docs/agents/reference/agent-plugin-reference.md#mcp-servers-in-plugins) travel with their plugin. Installing a plugin is different from copying its server definitions into a personal or workspace configuration.

For remote and Dev Container sessions, native user configuration refers to the home directory where the harness runs. The connected client's `$COPILOT_HOME/mcp-config.json` (or `~/.copilot/mcp-config.json`) isn't forwarded to another host or harness. Configure the server in the execution environment or use an eligible forwarded configuration instead. See [remote session customization sources](/docs/agent-customization/overview.md#manage-customizations-for-remote-sessions).

For other providers, use the provider's MCP configuration documentation. Their configuration locations and schemas can differ.

The guided setup and configuration form support a subset of the native file's options. Both native destinations have a configuration form in the Agent Customizations editor:

| Destination | Transports offered in the form | Working-directory field |
|-------------|--------------------------------|-------------------------|
| Copilot user `mcp-config.json` | stdio, HTTP, and legacy SSE | Yes |
| Workspace-root `.mcp.json` | stdio and HTTP | No |

The configuration form preserves properties that it doesn't display. Select **Other Properties** in the form to open the complete server entry in JSON.

### Portable configuration

Use a top-level `mcpServers` object in workspace-root `.mcp.json` or Copilot user `mcp-config.json`. This example configures one local Playwright server:

```json
{
    "mcpServers": {
        "playwright": {
            "type": "stdio",
            "command": "npx",
            "args": ["-y", "@playwright/mcp@latest"],
            "tools": ["*"]
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
            "url": "https://mcp.context7.com/mcp",
            "tools": ["*"]
        }
    }
}
```

Follow the [Context7 setup instructions](https://context7.com/docs/resources/all-clients) for authentication and service limits. An endpoint alone doesn't grant access to a service.

These are common fields in a portable server entry:

| Field | Applies to | Purpose |
|-------|------------|---------|
| `type` | All servers | `stdio` for a command, `http` for Streamable HTTP, or `sse` for a legacy SSE endpoint. Prefer HTTP when the server supports it. |
| `command`, `args` | stdio | Executable and its arguments. Install the runtime where the harness runs. |
| `env` | stdio | Environment-variable values or references. Use strings for values. |
| `cwd` | stdio | Working directory. The Copilot user configuration form supports this field; the workspace-root form does not. |
| `url`, `headers` | HTTP and SSE | Endpoint and optional request headers. Don't store literal credentials in shared files. |
| `tools` | All servers | Tool names to make available. `["*"]` makes all server tools available; use specific names to limit the selection. This doesn't bypass tool approvals. |
| `oauthClientId` | HTTP and SSE | Client ID for a server that requires a pre-registered OAuth client. This is a flat field, not the editor format's nested `oauth` object. |

For additional runtime-specific options, see the [Copilot CLI MCP configuration guidance](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers). Don't copy editor-only fields such as `inputs`, `envFile`, `dev`, or `sandboxEnabled` into a portable file.

### Environment-variable references

Portable configurations support environment variables independently of {% data variables.product.prodname_vscode_shortname %} input prompts. Use `${NAME}` to reference a value, or `${NAME:-default}` for a non-secret default. Stdio servers can use references in `command`, `args`, and `env` values. HTTP servers can use them in header values.

Provide variables in the environment of the host that runs or connects to the server. For remote sessions, that is the remote host or container. Use the braced `${NAME}` form for compatibility across the Copilot runtime and the {% data variables.product.prodname_vscode_shortname %} MCP client, which treats bare `$NAME` as literal text.

You can edit environment variables and HTTP headers in the Copilot user [MCP configuration form](/docs/agents/run/manage-mcp-servers.md#edit-an-mcp-server-configuration). Enter references rather than literal credentials. The workspace-root form rejects `${...}` expressions, so use **Other Properties** to edit references in the source `.mcp.json` instead. A form restriction does not mean that the Copilot runtime cannot read the reference.

Support for environment variables does not include `envFile`, input prompting, or a bridge to {% data variables.product.prodname_vscode_shortname %} `SecretStorage`. For a worked example, see [Replace input prompts with environment variables](/docs/agent-customization/migrate-customizations.md#replace-input-prompts-with-environment-variables).

### Authentication and secrets

Authentication grants access to an external service. It is separate from trusting a server to start and approving individual tool calls.

| Server requirement | Copilot guidance |
|--------------------|------------------|
| Browser sign-in or OAuth | Follow the publisher's instructions and complete authorization when prompted. Use **Authenticate** in the session's server actions when offered. The editor coordinates authentication for Copilot sessions in {% data variables.product.prodname_vscode_shortname %}; don't assume another client shares its saved credentials. |
| A pre-registered OAuth client | Use supported flat Copilot fields such as `oauthClientId`, not the editor format's nested `oauth` object. See the [Copilot CLI guidance](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers). |
| An API key or fixed token | Use [environment-variable references](#environment-variable-references) if they meet your requirements. Provide credentials in the environment of the host that runs or connects to the server. |
| {% data variables.product.prodname_vscode_shortname %} input prompts or an environment file | These are editor-managed options, not native Copilot configuration. Review the [migration limitations](/docs/agent-customization/migrate-customizations.md#check-mcp-values-before-migration). |

Do not commit tokens, passwords, or populated authentication headers. A personal configuration file is not a secret store.

The Copilot harness has no built-in MCP configuration option to forward a `${input:...}` secret or read an existing {% data variables.product.prodname_vscode_shortname %} `SecretStorage` value into an HTTP authentication header. OAuth can be an alternative when the server supports it, but it does not substitute a prompted API key. If your integration requires a static bearer token without environment variables or credentials in files, see the [migration FAQ](/docs/agent-customization/migrate-customizations.md#can-copilot-pass-a-prompted-secret-to-an-http-mcp-server-without-an-environment-variable-or-a-file).

### Server naming conventions

Use a descriptive, unique name for each server you use together, such as `github` or `database`. Avoid whitespace and special characters. For multi-word names, use camelCase, such as `uiTesting` or `githubIntegration`.

### Commands

Use these commands for Copilot setup and management from the Command Palette (`kb(workbench.action.showCommands)`).

| Command | Copilot workflow |
|---------|------------------|
| **Chat: Open Customizations** | Open **MCP Servers** in the intended session's context to add, edit, or manage servers. |
| **MCP: Add Server** | Start guided setup. Choose **Copilot Global** for native user configuration or workspace-root `.mcp.json` when offered. |
| **MCP: Browse MCP Servers** | Open [MCP discovery](/docs/agent-customization/mcp-servers.md#find-another-server). With marketplace discovery enabled, continue in the Agent Customizations editor. |
| **MCP: Install Server from Manifest** | Install from an MCP manifest. Review the destination rather than assuming it uses native Copilot configuration. |
| **MCP: List Servers** | Open available server controls. Use the intended session's context because Copilot runtime and editor-managed connections have different actions. |

Commands that open profile `mcp.json` or `.vscode/mcp.json`, and `code --add-mcp`, target [editor-managed configuration](#editor-managed-commands), not the portable Copilot files.

### Settings

These settings are relevant to Copilot setup or its connected editor. They don't replace the server entries in the native configuration file.

| Setting | Copilot workflow |
|---------|------------------|
| `setting(chat.mcp.access)` | Manage which MCP servers can be used in {% data variables.product.prodname_vscode_shortname %}. |
| `setting(chat.mcp.workspaceRootConfig.enabled)` | (Experimental) Offer workspace-root `.mcp.json` in **MCP: Add Server**. Existing `.mcp.json` files remain available when this setting is off. |
| `setting(chat.mcp.apps.enabled)` `feature(mcp-apps)` | Control whether the connected editor displays MCP Apps, which provide interactive tool UI. |
| `setting(chat.agent.sandbox.mcpServers)` | Configure MCP server inclusion in the [Copilot harness sandbox](/docs/agents/run/agent-sandboxing.md). Review the required session sandbox settings; this is separate from Local per-server sandboxing. |
| `setting(accessibility.verbosity.mcpServerConfiguration)` | Control whether the MCP configuration form announces information about opening Accessibility Help. |

Copilot reads its native configuration independently of the editor's discovery setting. The editor's autostart and sampling-model settings also don't control the native runtime. Use [server enablement](/docs/agents/run/manage-mcp-servers.md#enable-or-disable-mcp-servers) to prevent a server from starting, and review the [Copilot sampling approval flow](/api/extension-guides/ai/mcp.md#sampling) for model requests.

For the full settings list, see the [AI Settings Reference](/docs/agents/reference/ai-settings.md). Settings for the deprecated Local path are listed under [editor-managed settings](#editor-managed-settings).

## Editor forwarding to Copilot

Editor forwarding reuses an eligible server definition in a Copilot session. It does not move the original file or turn an editor-managed server connection into the runtime's connection. Prefer [native configuration](#portable-configuration) for integrations that must work without the editor.

* Workspace `.vscode/mcp.json`, profile configurations, and eligible extension-provided definitions can be forwarded. Extension discovery and definition resolution require the contributing extension and editor.
* Configurations requiring `${input:...}` or `${command:...}` are rejected before variable resolution. Resolving or caching the value in Local first does not make the configuration eligible.
* Editor development mode, per-server sandbox rules, and `envFile` behavior do not transfer. Review authentication options and working-directory paths in the destination environment.
* Copilot user configuration is read on the host where the harness runs, not forwarded from a different host. Plugin servers are delivered with their plugin rather than duplicated as standalone definitions.

Forwarding is not [automatic migration](/docs/agent-customization/migrate-customizations.md#migrate-mcp-servers). Migration writes native files and can remove successfully migrated source entries; forwarding leaves the source configuration in place.

When reusing an existing configuration, check these differences:

| Capability | Portable Copilot configuration | Editor-managed configuration |
|------------|--------------------------------|------------------------------|
| Top-level server object | `mcpServers` | `servers` |
| Copilot delivery | Read by the runtime | Eligible definitions forwarded by the editor |
| Environment-variable references | `${NAME}` or `${NAME:-default}` | `${env:NAME}` |
| Environment file and input prompts | Not supported | `envFile` and `${input:...}` |
| Development mode and per-server sandboxing | Not supported in this format | `dev`, `sandboxEnabled`, and `sandbox` |

## Editor-managed configuration for Local harness compatibility

`feature(local-harness)`

The Local harness is deprecated. Use this section only to maintain an existing editor-managed configuration, not to set up a new native Copilot server.

The following schemas and examples apply to the `servers` format in workspace `.vscode/mcp.json` or [user-profile](/docs/configure/profiles.md) `mcp.json`. These files appear as read-only JSON in the Agent Customizations editor; edit their source file instead. A server using this format might be [eligible for forwarding](#editor-forwarding-to-copilot), but editor-specific behavior does not automatically carry over.

### Configuration structure

The following structure applies to the {% data variables.product.prodname_vscode_shortname %} format. The portable Copilot format uses a separate schema with a top-level `mcpServers` object.

The configuration file has three main sections:

* **`"servers": {}`**: an object that maps server names to their configurations. Each key is the server name, and the value is the server configuration object. Depending on the server type, different fields are required.

* **`"inputs": []`**: an optional array of input variable definitions for sensitive information like API keys.

* **`"sandbox": {}`**: an optional object that defines file system and network access rules for sandboxed servers. See [Sandbox configuration](#sandbox-configuration). Only applies on macOS and Linux.

You can use [predefined variables](/docs/reference/variables-reference.md) in the server configuration, for example to refer to the workspace folder (`${workspaceFolder}`).

### Standard I/O (stdio) servers

Use this editor-managed configuration for servers that communicate through standard input and output streams.

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

Editor-managed sandboxing restricts file system and network access for stdio MCP servers on macOS and Linux. It does not configure the [Copilot harness sandbox](/docs/agents/run/agent-sandboxing.md) and its `setting(chat.agent.sandbox.mcpServers)` setting.

To enable sandboxing for a server, set `"sandboxEnabled": true` in its configuration. Add a `sandbox` object to the server to define its file system and network permissions. You can also add a top-level `sandbox` object as a sibling of `servers` and `inputs` to define deny rules that apply to all sandboxed servers in the file.

Allow rules are supported only in a server's `sandbox` object. Top-level `allowWrite` and `allowedDomains` rules are ignored.

> [!NOTE]
> In Local harness `feature(local-harness)` sessions, editor-sandboxed MCP tools are auto-approved. This does not describe the Copilot harness's approval behavior.

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

Use this editor-managed configuration for servers that communicate over HTTP. The editor's MCP client first tries the Streamable HTTP transport and falls back to SSE if HTTP is not supported.

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

> [!NOTE]
> A client secret is not part of `mcp.json`. If the server's OAuth client is confidential, select the **Set Client Secret** CodeLens that appears above `oauth.clientId` in `mcp.json`. {% data variables.product.prodname_vscode_shortname %} keeps the secret in its secret storage. To change it later, select **Replace Client Secret**.

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

### Input variables for sensitive data

Input variables in the {% data variables.product.prodname_vscode_shortname %} format let you define placeholders for values such as API keys or passwords. They aren't supported in portable configuration files, and servers that require them aren't forwarded to Copilot harness sessions.

Forwarding rejects input and command variables before resolving them. Entering or caching the secret in a Local session `feature(local-harness)` first does not make the server available to Copilot. Keep the original configuration until a supported authentication method works in the destination harness.

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

For editor-managed servers, add a `dev` key to the server configuration to use _development mode_. This does not configure a server started independently by the Copilot runtime. The object has two properties:

* `watch`: A glob pattern, or an array of glob patterns, to watch for file changes that restart the MCP server. Available for all server types.
* `debug`: Enables you to set up a debugger with the MCP server. Currently, {% data variables.product.prodname_vscode_shortname %} supports debugging Node.js and Python MCP servers. Available for stdio servers only.

Learn more about [MCP development mode](/api/extension-guides/ai/mcp.md#mcp-development-mode-in-vs-code) in the MCP Dev Guide.

### Automatic MCP server discovery

The editor can automatically detect and reuse MCP server configurations from supported applications. Use `setting(chat.mcp.discovery.enabled)` to select these discovery sources. This is separate from native Copilot discovery and [plugin-provided servers](/docs/agents/reference/agent-plugin-reference.md#mcp-servers-in-plugins).

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

### Editor-managed commands

These commands operate on editor-managed configuration or connections. They aren't the native Copilot configuration workflow.

| Command | Scope and purpose |
|---------|-------------------|
| **MCP: Browse Resources** | Browse resources from editor-managed server connections. This is not a list of every native Copilot server's resources. |
| **MCP: Open Remote User Configuration** | Open the editor-managed remote `mcp.json`, not the Copilot user file. |
| **MCP: Open User Configuration** | Open the editor-managed profile `mcp.json`, not the Copilot user file. |
| **MCP: Open Workspace Folder MCP Configuration** | Open the editor-managed `.vscode/mcp.json`, not workspace-root `.mcp.json`. |
| **MCP: Reset Cached Tools** | Clear the editor's cached tool lists. This doesn't reset a Copilot runtime connection. |
| **MCP: Reset Trust** | Reset separate editor MCP trust decisions for non-workspace sources, not Workspace Trust or runtime tool approvals. |
| **MCP: Show Installed Servers** | Show installed servers in the editor's Extensions view. |

### Command-line installation

Use `code --add-mcp` with a JSON object containing a unique `name` and the server configuration. The command adds a server to the {% data variables.product.prodname_vscode_shortname %} user-profile configuration.

For example, from a Bash shell:

```bash
code --add-mcp '{"name":"playwright","type":"stdio","command":"npx","args":["-y","@playwright/mcp@latest"]}'
```

This uses the {% data variables.product.prodname_vscode_shortname %} format, not the portable Copilot user file. To choose a portable destination, use the [guided connection flow](/docs/agent-customization/mcp-servers.md#connect-a-server). After installation, [verify a tool call](/docs/agent-customization/mcp-servers.md#verify-the-first-tool-call).

### Editor-managed settings

These settings control the editor's MCP client, which the deprecated Local harness uses. They don't configure native Copilot discovery, startup, or sampling.

| Setting | Description |
|---------|-------------|
| `setting(chat.mcp.discovery.enabled)` | Configure automatic discovery of MCP server configuration from other applications. |
| `setting(chat.mcp.autostart)` `feature(mcp-autostart)` | Control which MCP servers {% data variables.product.prodname_vscode_shortname %} starts automatically when you submit a chat message. This setting doesn't prevent a Copilot harness session from starting servers it manages independently. See [MCP autostart behavior](/docs/agents/run/manage-mcp-servers.md#automatically-start-mcp-servers). |
| `setting(chat.mcp.serverSampling)` | Configure model access for editor-managed sampling. Copilot runtime sampling has a separate [approval flow](/api/extension-guides/ai/mcp.md#sampling). |

## Related resources

* [Add MCP servers](/docs/agent-customization/mcp-servers.md)
* [Manage and troubleshoot MCP servers](/docs/agents/run/manage-mcp-servers.md)
* [MCP tool extensibility overview](/api/extension-guides/ai/ai-extensibility-overview.md#mcp-tool)
