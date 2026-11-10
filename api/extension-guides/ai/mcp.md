---
# DO NOT TOUCH — Managed by doc writer
ContentId: e655f324-ed0b-452d-aff3-52cdca3978a5
DateApproved: 11/11/2026

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Integrate MCP servers with {% data variables.product.prodname_copilot_short %} across compatible clients, with configuration and editor guidance.
---

# Integrate MCP servers with {% data variables.product.prodname_copilot_short %}

This reference helps Model Context Protocol (MCP) server and plugin authors integrate their tools with {% data variables.product.prodname_copilot_short %} in {% data variables.product.prodname_vscode_shortname %}. It covers configuration, supported capabilities, and editor-specific integrations.

The [{% data variables.product.prodname_copilot_short %} harness](/docs/agents/run/agent-harnesses.md#copilot) uses the {% data variables.copilot.copilot_sdk_short %}, the shared agent runtime used by {% data variables.product.prodname_vscode_shortname %}, [{% data variables.copilot.copilot_cli %}](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers), and the [{% data variables.copilot.github_copilot_app %}](https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app#configuring-mcp-servers). Building for its MCP support makes the same server usable across these compatible {% data variables.product.prodname_copilot_short %} experiences, not only in the editor. Your server implements MCP and doesn't need to depend on the {% data variables.copilot.copilot_sdk_short %}.

* **Make your server available:** choose a [delivery method](#make-your-server-available-to-copilot).
* **Check compatibility:** review [Copilot capability support](#mcp-support-in-copilot) and connected-client requirements.
* **Maintain an existing Local integration:** expand the [deprecated Local compatibility appendix](#local-harness-compatibility-deprecated) `feature(local-harness)`.

For protocol and server implementation guidance, use the [MCP documentation and SDKs](https://modelcontextprotocol.io/docs/sdk).

> [!TIP]
> For information about using MCP servers as an end user, see [Use MCP servers in VS Code](/docs/agent-customization/mcp-servers.md).

## Make your server available to {% data variables.product.prodname_copilot_short %}

Use a managed connection for a supported service, or distribute your own server configuration or integration:

| Delivery method | When to use it |
|-----------------|----------------|
| **{% data variables.product.prodname_copilot_short %} connector** `feature(copilot-connectors)` | Use a [{% data variables.product.prodname_github %}-managed MCP connection](/docs/agent-customization/copilot-connectors.md) for a supported service. {% data variables.product.prodname_github %} handles configuration and authentication, with no local server setup. |
| **Native configuration** | Provide a launch command or HTTP endpoint that compatible {% data variables.product.prodname_copilot_short %} clients can use without an editor extension. |
| **Agent plugin** | [Bundle the server with skills and other customizations](/docs/agents/reference/agent-plugin-reference.md#mcp-servers-in-plugins) for a reusable workflow. Servers load through the plugin, not as copies in an editor profile. |
| **Connected-editor integration** | Offer an [installation URL](#create-an-mcp-installation-or-lookup-url) or [register the server from an extension](#register-an-mcp-server-in-your-extension). Eligible editor-provided definitions can be forwarded to the runtime. |

Connectors reuse the managed connection across supported {% data variables.product.prodname_copilot_short %} clients signed in with the same account. For self-managed servers, prefer native configuration or an agent plugin for cross-client reuse. Each execution host needs the required dependencies, credentials, and service access. Editor-dependent features don't automatically transfer to another client.

### Native configuration

In {% data variables.product.prodname_vscode_shortname %}, users add servers through **Chat: Open Customizations** > **MCP Servers** > **Add Server**. **Global** > **Copilot Global** selects the native user configuration. Link your installation instructions to the [connection walkthrough](/docs/agent-customization/mcp-servers.md#add-a-server-by-url-or-command).

For manual configuration, provide an entry using the portable `mcpServers` format. This example connects to an HTTP server:

```json
{
    "mcpServers": {
        "myService": {
            "type": "http",
            "url": "https://example.com/mcp",
            "tools": ["*"]
        }
    }
}
```

Replace the example URL with your server's MCP endpoint and document any authentication requirements. Don't include credentials in shared configuration.

The harness reads native configuration directly on the host where it runs:

* **Workspace:** `.mcp.json` at the workspace root.
* **User:** `$COPILOT_HOME/mcp-config.json`, or `~/.copilot/mcp-config.json` when `COPILOT_HOME` is unset.

For stdio commands, supported fields, secrets, and remote hosts, see the [MCP configuration reference](/docs/agents/reference/mcp-configuration.md). Don't use the deprecated Local `servers` format for new native configurations.

Before distributing an integration, [verify an actual tool call](/docs/agent-customization/mcp-servers.md#verify-the-first-tool-call) in the intended {% data variables.product.prodname_copilot_short %} experience. Adding configuration alone doesn't confirm that the session can use its tools. For failures, see [MCP troubleshooting](/docs/agents/run/manage-mcp-servers.md#troubleshoot-mcp-servers).

## MCP support in Copilot

Start with tools, then add capabilities that your integration needs. Support depends on both the {% data variables.product.prodname_copilot_short %} harness that runs the session and the client that presents it. Some capabilities require a connected client, such as the editor that renders MCP Apps or handles authentication.

| Capability | Support and limitations in Copilot |
|------------|------------------------------------|
| [Tools](#tools) | Invokes server tools under the session's tool availability and approval policies. |
| [Sampling](#sampling) | Deprecated in MCP. Supported on compatible connections during an active turn, with per-server approval. |
| [Elicitation](#elicitation) | Presents form and URL requests through host-rendered input during an active turn. |
| [MCP Apps](#mcp-apps) | Displays interactive tool UI in a connected client that renders MCP Apps. This integration is Experimental. |
| [Authorization](#authorization) | Supports MCP OAuth with authentication handled by the connected client. |
| [Resources](#resources) | Reads resources for MCP Apps. Native servers don't automatically appear in the editor's resource browser. |
| [Roots](#workspace-roots) | Deprecated in MCP. Existing integrations must check the runtime's negotiated capability and returned roots. |
| [Prompts](#prompts) | The editor's `/mcp.<server>.<prompt>` completion flow isn't exposed in Copilot sessions. Use skills to distribute reusable workflows. |

This table describes available integrations, not full MCP specification conformance. Check the capabilities negotiated with the target client and match your implementation to the [SDK's protocol-version guidance](https://ts.sdk.modelcontextprotocol.io/v2/protocol-versions). Sampling and roots are [deprecated in MCP 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28/deprecated), so prefer their alternatives for new integrations.

For `stdio`, Streamable HTTP, and legacy SSE transport configuration, see the [MCP configuration reference](/docs/agents/reference/mcp-configuration.md#configuration-file).

### Tools

For native servers, tool availability depends on the server's `tools` filter and the controls for the selected harness. See [native MCP configuration](/docs/agents/reference/mcp-configuration.md#portable-configuration) and [tool management](/docs/agents/run/tools.md#manage-available-tools).

Tool approval depends on session permissions, organization policy, and existing approvals. Don't assume every call prompts the user or that `readOnlyHint` bypasses approval. [Tool annotations](https://modelcontextprotocol.io/docs/concepts/tools#tool-annotations) describe behavior, not permission grants.

If your server uses [dynamic tool discovery](https://modelcontextprotocol.io/docs/concepts/tools#tool-discovery-and-updates), verify tool-list changes in each target {% data variables.product.prodname_copilot_short %} client. Clients can refresh their tool catalogs differently, and discovered tools still need to pass the session's availability filters.

### Resources

In {% data variables.product.prodname_copilot_short %} sessions, [MCP Apps](#mcp-apps) can read resources, but native servers don't automatically appear in the editor's resource browser. Return content in a tool result when the agent needs it to complete a task, rather than relying on resource discovery. For editor-managed browsing, see the [Local compatibility appendix](#local-harness-compatibility-deprecated).

### Prompts

To distribute reusable workflows for {% data variables.product.prodname_copilot_short %}, bundle [skills in an agent plugin](/docs/agent-customization/agent-plugins.md). Skills are separate from the MCP prompts protocol.

The editor's `/mcp.<server>.<prompt>` picker and argument dialogs aren't exposed in Copilot sessions. For existing integrations that still need this workflow, expand the Local compatibility appendix and see [Local prompt commands](#local-harness-prompt-commands).

### Authorization

{% data variables.product.prodname_copilot_short %} sessions support MCP servers that require OAuth authentication. For directly configured servers, the runtime requests authentication through the connected client. {% data variables.product.prodname_vscode_shortname %} stores these credentials, rather than relying on the runtime's keychain store.

Choose an authentication method that works with your configuration source. An editor input variable or an extension's `SecretStorage` value isn't automatically forwarded to a native server. See [authentication and secrets](/docs/agents/reference/mcp-configuration.md#authentication-and-secrets).

#### Connected-editor OAuth integration

The connected editor provides OAuth integration for {% data variables.product.prodname_copilot_short %} sessions, including built-in authentication support for {% data variables.product.prodname_github %} and Microsoft Entra. It also supports other OAuth identity providers through [Dynamic Client Registration (DCR)](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization#dynamic-client-registration) or a pre-registered OAuth client.

For your server integration:

1. Implement the [MCP authorization specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization).
1. Choose an identity provider that supports DCR, or provide instructions for a pre-registered client ID and, when required, a client secret. This isn't the OAuth client credentials grant.
1. Include `http://127.0.0.1:33418` and `https://vscode.dev/redirect` in the client's allowed redirect URLs.
1. Test sign-in from the intended Copilot session. For setup and credential handling, follow [authentication and secrets](/docs/agents/reference/mcp-configuration.md#authentication-and-secrets).

### Sampling

{% data variables.product.prodname_copilot_short %} handles [sampling](https://ts.sdk.modelcontextprotocol.io/v2/servers/sampling) during an active turn with per-server approval. Autopilot requires prior approval. Handle rejected or canceled requests without blocking the server.

The runtime executes the model request. Treat `modelPreferences` as hints, not a guarantee of a particular model or access to every model configured in the editor. The Local harness's model-access controls don't configure this runtime path.

### Elicitation

{% data variables.product.prodname_copilot_short %} supports form and URL [elicitation](https://ts.sdk.modelcontextprotocol.io/v2/servers/elicitation) during an active turn. Requests are canceled in Autopilot and declined when there is no active turn. Handle both outcomes without continuing the action that needs input.

The connected host renders the input UI. For your own HTML interface, use [MCP Apps](#mcp-apps). Keep sensitive input, such as credentials, in a browser-based flow rather than a form.

If you're replacing a chat participant that collects user input, see the [participant migration guidance](/docs/agent-customization/migrate-customizations.md#if-you-maintain-a-participant) for choosing between elicitation and MCP Apps.

### Workspace roots

For existing integrations using [roots](https://modelcontextprotocol.io/specification/2025-11-25/client/roots), check the runtime's negotiated capability and returned roots. The editor's workspace folders don't establish which roots a native {% data variables.product.prodname_copilot_short %} connection receives. Don't treat those roots, the server's working directory, and the harness's working directory as interchangeable.

### MCP Apps

Use MCP Apps (Experimental) when a tool needs an interactive visualization or custom form. {% data variables.product.prodname_vscode_shortname %} renders the UI for {% data variables.product.prodname_copilot_short %} sessions. A connected client with MCP Apps support is required.

Include a useful text result for clients that don't render Apps. For ordinary questions, use [elicitation](#elicitation) instead.

For implementation, use the MCP Apps SDK's [server helpers](https://apps.extensions.modelcontextprotocol.io/api/modules/server-helpers.html) and [plain JavaScript example](https://github.com/modelcontextprotocol/ext-apps/tree/main/examples/basic-server-vanillajs).

#### VS Code behavior and limitations

The following describes the editor renderer, including when it displays an App from a {% data variables.product.prodname_copilot_short %} session. Other MCP clients can provide different UI capabilities.

| Feature | VS Code Support |
| ------- | --------------- |
| Display modes | `inline` only (not `fullscreen` or `pip`) |
| Send message | Fills chat input box; does not auto-send |
| Context updates | Appear as attachments |
| Clipboard write | Supported |
| Camera, microphone, geolocation | Not supported |

#### Security

MCP Apps run in sandboxed iframes with Content Security Policy (CSP) enforcement. Declare only the domains the UI resource needs: `connectDomains` for network requests, `resourceDomains` for assets, and `frameDomains` for embedded frames.

## Create an MCP installation or lookup URL

VS Code provides URL handlers for installing an MCP server directly from configuration or looking it up in an active MCP registry or gallery.

### Install an MCP server from configuration

Use `vscode:mcp/install?{json-configuration}` (Insiders: `vscode-insiders:mcp/install?{json-configuration}`) to prompt the user to add an MCP server configured with JSON:

Provide the JSON server configuration in the form `{\"name\":\"server-name\",\"command\":...}` and then perform a JSON-stringify and URL encode on it. For example, use the following logic to create the installation URL:

```typescript
// For Insiders, use `vscode-insiders` instead of `vscode`
const link = `vscode:mcp/install?${encodeURIComponent(JSON.stringify(obj))}`;
```

This link opens the MCP server details editor in VS Code so the user can review the configuration before choosing to install.

### Open an MCP server from a registry or gallery

If your MCP server is listed in an active MCP registry or gallery, you can provide deep links that resolve the server against the gallery and open its details view in VS Code:

* **Lookup by name:**

  ```text
  vscode:mcp/by-name/<registry-server-name>
  ```

  Resolves the exact registry name against the active MCP gallery and opens the server details page for user review. For example, GitHub's server uses the registry name `io.github.github/github-mcp-server`:

  ```text
  vscode:mcp/by-name/io.github.github/github-mcp-server
  ```

* **Lookup by gallery metadata URL:**

  ```text
  vscode:mcp/<https-server-url-without-scheme>
  ```

  Opens a server using its HTTPS metadata URL in the active MCP gallery (omitting the `https://` prefix). The URL must be within the configured gallery's origin and path; it is not the server's MCP connection endpoint or an arbitrary project website. For example, for a gallery hosted at `https://example.com/mcp`, a server metadata resource might be:

  ```text
  vscode:mcp/example.com/mcp/server
  ```

Both lookup routes open the server details page in VS Code so the user can review tools and permissions before choosing to install; they do not silently install the server or execute tools.

### Shareable web badges and redirect wrapper

To embed installation or lookup links on websites or documentation badges, use the HTTPS redirect wrapper:

```text
https://vscode.dev/redirect?url=<url-encoded-vscode-URL>
```

For example, to link to the GitHub server by its exact registry name:

```text
https://vscode.dev/redirect?url=vscode%3Amcp%2Fby-name%2Fio.github.github%2Fgithub-mcp-server
```

> [!NOTE]
> For {% data variables.product.prodname_vscode_shortname %} Insiders, use the `vscode-insiders:` scheme prefix (for example, `vscode-insiders:mcp/by-name/<registry-server-name>`). For more information about URL schemes across extensions, plugins, and workspaces, see [URL handling](/docs/configure/command-line.md#opening-vs-code-with-urls).

## Register an MCP server in your extension

Use this API when your server needs integration with an installed {% data variables.product.prodname_vscode_shortname %} extension. Registration requires a connected editor and its extension host. Eligible extension-provided definitions can be forwarded to {% data variables.product.prodname_copilot_short %} sessions. The extension isn't available in a standalone runtime.

For an integration that must work independently of the editor, prefer native configuration or an agent plugin. For forwarding limitations, see [editor forwarding to Copilot](/docs/agents/reference/mcp-configuration.md#editor-forwarding-to-copilot).

To register an MCP server in your extension, you need to perform the following steps:

1. Define the MCP server definition provider in the `package.json` file of your extension.
1. Implement the MCP server definition provider in your extension code by using the [`vscode.lm.registerMcpServerDefinitionProvider`](/api/references/vscode-api#lm.registerMcpServerDefinitionProvider) API.

You can get started with a basic [example of how to register an MCP server in a VS Code extension](https://github.com/microsoft/vscode-extension-samples/blob/main/mcp-extension-sample).

### 1. Static configuration in `package.json`

Extensions that want to register MCP servers must contribute the `contributes.mcpServerDefinitionProviders` extension point in the `package.json` with the `id` of the provider. This `id` should match the one used in the implementation.

```json
{
    ...
    "contributes": {
        "mcpServerDefinitionProviders": [
            {
                "id": "exampleProvider",
                "label": "Example MCP Server Provider"
            }
        ]
    }
    ...
}
```

### 2. Implement the provider

To register an MCP server in your extension, use the [`vscode.lm.registerMcpServerDefinitionProvider`](/api/references/vscode-api#lm.registerMcpServerDefinitionProvider) API to provide the [MCP configuration](/docs/agents/reference/mcp-configuration.md) for the server. The API takes a `providerId` string and a `McpServerDefinitionProvider` object.

The `McpServerDefinitionProvider` object has three properties:

* `onDidChangeMcpServerDefinitions`: An event that signals a change to the server definitions.
* `provideMcpServerDefinitions`: A function that returns server definitions (`vscode.McpServerDefinition[]`). Keep discovery noninteractive.
* `resolveMcpServerDefinition`: An optional function for an editor-managed launch. Don't use it as the setup path for a native Copilot server. See [interactive resolution for Local](#interactive-extension-provider-resolution).

Don't rely on an interactive resolver running during background forwarding to {% data variables.product.prodname_copilot_short %}. Provide a complete, safely usable definition, or perform setup through an explicit user action before publishing the updated definition. Input and command variables aren't a workaround: forwarding rejects configurations that require them before resolving variables.

An `McpServerDefinition` object can be one of the following types:

- `vscode.McpStdioServerDefinition`: represents an MCP server available by running a local process and operating on its stdin and stdout streams.
- `vscode.McpHttpServerDefinition`: represents an MCP server available using the Streamable HTTP transport.

## Local harness compatibility (deprecated)

`feature(local-harness)`

Use this appendix only to maintain an existing Local harness integration. For new integrations, use the [Copilot delivery methods](#make-your-server-available-to-copilot).

<details>
<summary>Maintain an editor-managed Local integration</summary>

The Local harness uses the editor's MCP client directly. The workflows below describe that editor-managed connection, not a native Copilot connection. Some editor UI can also be available outside Local harness sessions; its availability doesn't imply that native servers use the same connection or discovery path.

Shared integrations that serve Copilot, including [OAuth](#authorization), [MCP Apps](#mcp-apps), and [extension registration](#register-an-mcp-server-in-your-extension), remain in the main guidance.

### Local harness configuration

Users can retain `.vscode/mcp.json` and user-profile `mcp.json`. These are deprecated destinations in the guided flow, not native {% data variables.product.prodname_copilot_short %} configuration files. Eligible definitions can be forwarded by the connected editor, but editor-specific behavior doesn't automatically carry over. See [editor forwarding and its restrictions](/docs/agents/reference/mcp-configuration.md#editor-forwarding-to-copilot).

### Local harness tool controls

The following screenshots show the Local harness's `feature(local-harness)` editor-managed tools picker and confirmation UI. They aren't the native {% data variables.product.prodname_copilot_short %} tool controls for other harnesses.

![Screenshot showing the Local harness tools picker with tools from an MCP server.](../images/ai/mcp/mcp-tools-picker.png)

![Screenshot showing the Local harness confirmation dialog with input parameters for an MCP tool.](../images/ai/mcp/mcp-tool-input-parameters.png)

In Local harness `feature(local-harness)` sessions, `readOnlyHint` affects default pre-execution confirmation, and `openWorldHint` affects confirmation of tool results. The editor's MCP client also supports dynamic tool discovery. Don't infer identical approval or refresh behavior in another harness.

### Editor resource browsing

These browsing, attachment, and template workflows use servers discovered by the editor's MCP client in Local harness `feature(local-harness)` sessions. They are separate from native resource reads for MCP Apps.

For an editor-discovered server, the resource name appears in the MCP Resources picker. Users can open resources with **MCP: Browse Resources**. In sessions that support MCP resource attachments, users can also select **Add Context** > **MCP Resources**. Resources can contain text or binary content.

![Screenshot showing the editor's MCP Resources picker.](../images/ai/mcp/mcp-resources-picker.png)

The editor client supports resource updates so users can see changes to a resource's contents in the editor.

#### Resource templates

The editor client also supports [resource templates](https://modelcontextprotocol.io/docs/concepts/resources#resource-templates), which collect input parameters when referencing a resource. For example, a database resource can ask for the table name.

When accessing a resource with a template, users are prompted for the required parameters in a Quick Pick. You can provide completions to suggest values for the parameter.

### Editor-managed workspace roots

The editor's MCP client provides workspace root folders to servers it connects to and notifies them when the roots change. This describes the editor-managed connection used by Local. It doesn't establish which roots a separate native Copilot connection receives.

### Icons

The editor's MCP client supports `icons` provided on servers, resources, and tools. Don't rely on the same presentation in every harness or client. MCP icons have a `src` property that identifies the image:

* MCP servers using the HTTP or SSE transports can serve images from the same authority the MCP server is hosted on. For example, a server configured at `https://example.com/mcp` can serve images from `example.com`.
* MCP servers using the stdio transport can serve images from the file system using `file:///` URIs.
* Any MCP server can embed images as data URIs beginning with `data:`.

### Interactive extension-provider resolution

For an editor-managed launch used by the Local harness `feature(local-harness)`, an extension can use `resolveMcpServerDefinition` to request missing information, such as an API key, before starting its server:

1. Return the server definitions from `provideMcpServerDefinitions` without prompting the user.
1. In `resolveMcpServerDefinition`, complete any required authentication or input collection and update the definition before returning it.
1. If resolution is canceled or credentials are unavailable, return `undefined` or throw an appropriate error rather than starting an incomplete definition.

Don't write secrets to a workspace configuration or log them. This interactive launch flow isn't a native {% data variables.product.prodname_copilot_short %} setup mechanism. For Copilot forwarding, [publish a complete definition](#register-an-mcp-server-in-your-extension) after an explicit setup action instead.

### Local harness prompt commands

Prompts are reusable templates that can introduce your server's tools or describe a workflow. In Local harness `feature(local-harness)` sessions, users invoke `/mcp.<server>.<prompt>` and supply any arguments in the editor.

Define [completions](https://modelcontextprotocol.io/specification/2025-06-18/server/utilities/completion) to suggest values in the editor's prompt argument dialog:

```typescript
server.prompt(
    "teamGreeting", "Generate a greeting for team members",
    {
        name: completable(z.string(), (value) => {
            return ["Alice", "Bob", "Charlie"].filter(n => n.startsWith(value));
        })
    },
    async ({ name }) => ({
        messages: [{
            role: "assistant",
            content: { type: "text", text: `Hello ${name}, welcome to the team!` }
        }]
    })
);
```

![Screenshot showing the Local harness dialog for an MCP prompt with input parameters.](../images/ai/mcp/mcp-prompt-argument.png)

> [!NOTE]
> Users can enter a terminal command in the prompt dialog and use the command output as input for the prompt.

When you include a resource type in the prompt response, this editor workflow attaches the resource as context to the chat prompt in Local harness `feature(local-harness)` sessions.

### Local harness sampling controls

For editor-managed sampling in the Local harness `feature(local-harness)`, the user authorizes access to models. **MCP: List Servers** > **Configure Model Access** restricts the models available to that server. The editor selects from the allowed models when applying `modelPreferences`.

![Screenshot showing the Local harness authorization prompt for an MCP server to access models.](../images/ai/mcp/mcp-allow-sampling.png)

![Screenshot showing the Local harness Configure Model Access dialog for an MCP server.](../images/ai/mcp/mcp-configure-model-access.png)

**MCP: List Servers** > **Show Sampling Requests** opens the editor-managed sampling log. These controls don't configure {% data variables.product.prodname_copilot_short %} runtime sampling in other harnesses.

### MCP development mode in VS Code

For editor-managed server development, add a `dev` key to the {% data variables.product.prodname_vscode_shortname %} configuration format. These restart and debugger controls apply to the editor-managed process used by Local, not to the native {% data variables.product.prodname_copilot_short %} runtime. Forwarding a definition doesn't transfer this development mode.

The `dev` object has two properties:

* `watch`: A glob pattern, or an array of glob patterns, to watch for file changes that restart the MCP server.
* `debug`: Enables you to set up a debugger with the MCP server. Currently, {% data variables.product.prodname_vscode_shortname %} supports debugging Node.js and Python MCP servers.

    <details>
    <summary>Node.js MCP server</summary>

    To debug a Node.js MCP server, set the `debug.type` property to `node`.

    ```json
    {
        "servers": {
            "my-mcp-server": {
                "type": "stdio",
                "command": "node",
                "cwd": "${workspaceFolder}",
                "args": [ "./build/index.js" ],
                "dev": {
                    "watch": "src/**/*.ts",
                    "debug": { "type": "node" }
                }
            }
        }
    }
    ```

    </details>

    <details>
    <summary>Python MCP server</summary>

    To debug a Python MCP server, set the `debug.type` property to `debugpy`, and optionally set the `debug.debugpyPath` property to the path of the `debugpy` module if it is not installed in the default Python environment.

    ```json
    {
        "servers": {
            "my-python-mcp-server": {
                "type": "stdio",
                "command": "python",
                "cwd": "${workspaceFolder}",
                "args": [ "./server.py" ],
                "dev": {
                    "watch": "**/*.py",
                    "debug": {
                        "type": "debugpy",
                        "debugpyPath": "/path/to/debugpy"
                    }
                }
            }
        }
    }
    ```

    </details>

### Local server output

The following screenshots show errors and output for an editor-managed Local harness `feature(local-harness)` connection:

![Screenshot showing an MCP server error in a Local chat session.](../images/ai/mcp/mcp-error-loading-tool.png)

Select the error notification and **Show Output**, or run **MCP: List Servers**, select the editor-managed server, and choose **Show Output**. Its log doesn't describe a separate native connection to the same server.

![Screenshot showing output from an editor-managed MCP server.](../images/ai/mcp/mcp-server-error-output.png)

</details>

## Related content

* [Author an agent plugin](/docs/agents/reference/agent-plugin-reference.md).
* [MCP configuration reference](/docs/agents/reference/mcp-configuration.md).
* [Model Context Protocol documentation](https://modelcontextprotocol.io/).
