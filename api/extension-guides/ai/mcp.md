---
# DO NOT TOUCH — Managed by doc writer
ContentId: e655f324-ed0b-452d-aff3-52cdca3978a5
DateApproved: 11/11/2026

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Build MCP servers for {% data variables.product.prodname_copilot_short %} with native configuration, plugins, and editor integration.
---

# MCP developer guide

Build a Model Context Protocol (MCP) server to give {% data variables.product.prodname_copilot_short %} in {% data variables.product.prodname_vscode_shortname %} access to your tools and services. MCP is an open standard that lets you reuse the same server across compatible clients.

This guide helps server and plugin authors choose capabilities, distribute a server, and integrate with the editor. Start with the **Copilot** harness:

* **Build for Copilot:** choose [capabilities](#mcp-features-supported-by-vs-code), [distribute your server](#add-mcp-servers-to-vs-code), and [test it in a session](#troubleshoot-and-debug-mcp-servers).
* **Integrate with the connected editor:** use [OAuth](#authorization), [MCP Apps](#mcp-apps), or [extension registration](#register-an-mcp-server-in-your-extension) where your integration needs them. These features can serve Copilot sessions.
* **Maintain an existing Local integration:** use the separate [Local harness compatibility section](#local-harness-compatibility-deprecated) `feature(local-harness)`.

MCP servers provide one of the [tool types](/docs/agents/concepts/tools.md#types-of-tools) available to agents. Protocol support depends on both the harness that runs the session and the client that presents it, as described in [MCP support and limitations](#mcp-features-supported-by-vs-code).

> [!TIP]
> For information about using MCP servers as an end user, see [Use MCP servers in VS Code](/docs/agent-customization/mcp-servers.md).

## Why use MCP servers?

Use an MCP server when you want to:

* Give {% data variables.product.prodname_copilot_short %} domain-specific tools, such as database queries or access to a service's API.
* Distribute tools independently or bundle them with skills and instructions in an [agent plugin](/docs/agent-customization/agent-plugins.md#author-a-plugin).
* Run a server as a local process or connect to a remote service.
* Reuse the server across MCP clients.

If your integration requires editor APIs, consider an [extension-contributed language model tool](/api/extension-guides/ai/tools.md) or [register an MCP server from an extension](#register-an-mcp-server-in-your-extension). Extension APIs require a connected editor. A plugin or native MCP configuration doesn't have that dependency.

## MCP features supported by VS Code

Use the following capabilities when building for the {% data variables.product.prodname_copilot_short %} harness. The runtime reads native configuration and plugin-provided servers. Some capabilities also require a connected client, such as the editor that renders MCP Apps or handles authentication.

| Capability | Support and limitations in Copilot |
|------------|------------------------------------|
| [Tools](#tools) | Invokes server tools under the session's tool availability and approval policies. |
| [Sampling](#sampling) | Executes server sampling requests during an active turn, with per-server approval. |
| [Elicitation](#elicitation) | Presents form and URL requests through host-rendered input during an active turn. |
| [MCP Apps](#mcp-apps) | Displays interactive tool UI in a connected client that renders MCP Apps. This integration is Experimental. |
| [Authorization](#authorization) | Supports MCP OAuth with authentication handled by the connected client. |
| [Resources](#resources) | Reads resources for MCP Apps. Native servers don't automatically appear in the editor's resource browser. |
| [Roots](#workspace-roots) | Use the runtime's negotiated roots capability and returned roots, rather than assuming it receives the editor's workspace folders. |
| [Prompts](#prompts) | The editor's `/mcp.<server>.<prompt>` completion flow isn't exposed in Copilot sessions. Use skills to distribute reusable workflows. |

This table describes available integrations, not full MCP specification conformance. Check the capabilities negotiated with the target client and provide a tool-based workflow when your integration needs to work without editor features.

For existing integrations that still use the Local harness `feature(local-harness)`, see [Local harness compatibility (deprecated)](#local-harness-compatibility-deprecated).

For `stdio`, Streamable HTTP, and legacy SSE transport configuration, see the [MCP configuration reference](/docs/agents/reference/mcp-configuration.md#configuration-file).

### Tools

#### Tool definition

Define tools with clear names, descriptions, and input schemas so {% data variables.product.prodname_copilot_short %} can select them for a task. Users control tool availability through the server configuration and the controls for their harness. See [native MCP configuration](/docs/agents/reference/mcp-configuration.md#portable-configuration) and [tool management](/docs/agents/run/tools.md#manage-available-tools).

Tool approval depends on the harness, session permissions, organization policy, and existing approvals. Don't assume every tool call prompts the user or that a read-only annotation bypasses approval. Validate inputs on the server rather than relying on users to edit model-generated parameters in a confirmation dialog.

#### Dynamic tool discovery

If your server uses [dynamic tool discovery](https://modelcontextprotocol.io/docs/concepts/tools#tool-discovery-and-updates), test tool-list changes in your target {% data variables.product.prodname_copilot_short %} client. Don't assume that every client refreshes its tool catalog in the same way. A tool still needs to pass the session's availability filters before the agent can call it.

#### Tool annotations

To provide extra metadata about a tool's behavior, you can use [tool annotations](https://modelcontextprotocol.io/docs/concepts/tools#tool-annotations):

* `title`: A human-readable title for the tool.
* `readOnlyHint`: A hint that the tool doesn't modify its environment. It isn't a permission grant or a guarantee of automatic approval.
* `openWorldHint`: A hint that the tool can interact with external entities.

Annotations describe behavior. They don't replace authentication, authorization, input validation, or the host's approval policy.

### Resources

Resources provide structured data and content, such as screenshots or log files. In {% data variables.product.prodname_copilot_short %} sessions, [MCP Apps](#mcp-apps) can read server resources. This doesn't make every native server available in the editor's resource browser.

For the editor-managed browsing and template workflows used by existing Local integrations, see [editor resource browsing](#editor-resource-browsing). Don't use those workflows as evidence of native Copilot resource discovery.

### Prompts

To distribute reusable workflows for {% data variables.product.prodname_copilot_short %}, bundle [skills in an agent plugin](/docs/agent-customization/agent-plugins.md). Skills are separate from the MCP prompts protocol.

The editor's `/mcp.<server>.<prompt>` picker and argument dialogs aren't exposed in Copilot sessions. For integrations that still need this workflow, see [Local prompt commands](#local-prompt-commands).

### Authorization

{% data variables.product.prodname_copilot_short %} sessions support MCP servers that require OAuth authentication. The runtime requests authentication through the connected client. {% data variables.product.prodname_vscode_shortname %} owns durable credential storage, rather than relying on the runtime's keychain store.

Choose an authentication method that works with your configuration source. An editor input variable or an extension's `SecretStorage` value isn't automatically forwarded to a native server. See [authentication and secrets](/docs/agents/reference/mcp-configuration.md#authentication-and-secrets).

The [authorization specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) cleanly separates MCP servers as Resource Servers from Authorization Servers, allowing developers to delegate authentication to existing identity providers (IdPs) rather than building their own OAuth implementations from scratch.

#### Connected-editor OAuth integration

The connected editor provides OAuth integration for {% data variables.product.prodname_copilot_short %} sessions. It has built-in authentication support for {% data variables.product.prodname_github %} and Microsoft Entra. With a compatible authorization server, users can manage MCP access through **Accounts menu** > **Manage Trusted MCP Servers** for that account.

![Screenshot showing the editor's Accounts menu with the Manage Trusted MCP Servers action.](../images/ai/mcp/manage-trusted-mcp.png)

The editor also supports other OAuth identity providers. It can use [Dynamic Client Registration (DCR)](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization#dynamic-client-registration) or a pre-registered OAuth client. If the provider doesn't support DCR, users can supply a client ID and, when required, a client secret. This isn't the OAuth client credentials grant.

Users can then view their authentication status also through the **Accounts menu**. To remove dynamic client registrations, users can use the **Authentication: Remove Dynamic Authentication Providers** command in the Command Palette.

Below is a checklist to ensure your MCP server and VS Code's OAuth workflows will work:

1. The MCP server defines the [MCP authorization specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization).
2. The IdP supports DCR or a pre-registered OAuth client.
3. The redirect URL list must include these URLs: `http://127.0.0.1:33418` and `https://vscode.dev/redirect`

The following screenshots show the editor's prompts for a pre-registered OAuth client:

![Screenshot showing the editor's authorization prompt when an MCP server requires a pre-registered OAuth client.](../images/ai/mcp/mcp-auth-dynamic-client-required.png)

![Screenshot showing the editor requesting an OAuth client ID for an MCP server.](../images/ai/mcp/mcp-auth-client-id.png)

![Screenshot showing the editor requesting an OAuth client secret for an MCP server.](../images/ai/mcp/mcp-auth-client-secret.png)

> [!NOTE]
> VS Code still supports MCP servers that behave as an authorization server, but it is recommended to use the latest specification for new servers.

### Sampling

[Sampling](https://modelcontextprotocol.io/docs/concepts/sampling) lets an MCP server request a language model response. For example, your server can summarize a large data set before returning a tool result.

#### Copilot sampling

{% data variables.product.prodname_copilot_short %} handles server sampling during an active turn. Unless the server already has sampling approval, the host offers **Allow Once**, **Always Allow for This Server**, or **Skip**. In Autopilot, server sampling requires prior approval. Handle rejected or canceled requests without blocking your server.

The {% data variables.product.prodname_copilot_short %} runtime executes the request. Treat `modelPreferences` as hints, not a guarantee of a particular model or access to every model configured in the editor. The [Local sampling controls](#local-sampling-controls) don't configure this runtime path.

### Elicitation

Use [elicitation](https://modelcontextprotocol.io/specification/2025-11-25/client/elicitation) when your server needs user input during a task. Form elicitation supplies a schema for the host to render as questions. URL elicitation asks the user to complete an interaction at a server-provided URL.

{% data variables.product.prodname_copilot_short %} presents these requests through the connected host's input UI during an active turn. MCP elicitation is canceled in Autopilot and declined when there is no active turn. Handle decline and cancellation as normal outcomes.

Elicitation doesn't let your server supply a custom chat interface. Use [MCP Apps](#mcp-apps) for your own HTML-based forms, visualizations, or interactive tool results. The host renders elicitation questions; your server supplies the UI for an MCP App.

### Workspace roots

Check the client's negotiated `roots` capability and use the roots it returns. Don't treat the editor's workspace, a server process's working directory, and the harness's working directory as interchangeable.

The [editor-managed roots behavior](#editor-managed-workspace-roots) used by the Local harness `feature(local-harness)` doesn't establish which roots a native {% data variables.product.prodname_copilot_short %} connection receives.

### MCP Apps

MCP Apps are an Experimental integration that lets tools provide interactive UI alongside their output, such as a visualization or a custom form. {% data variables.product.prodname_vscode_shortname %} renders MCP Apps for {% data variables.product.prodname_copilot_short %} sessions. Rendering requires a connected client with MCP Apps support; a server running in the native runtime alone doesn't provide a UI.

Include a useful text result for clients that don't render Apps. For ordinary questions with host-rendered input controls, use [elicitation](#elicitation) instead.

#### Architecture

MCP Apps use a Tool + UI Resource pattern:

1. Declare `_meta.ui.resourceUri` on the tool definition to identify its UI resource.
1. Create the resource with the `ui://` URI scheme and MIME type `text/html;profile=mcp-app`.
1. Use the MCP Apps SDK in the HTML resource to communicate with the host. The editor renders it in a sandboxed iframe.

#### SDK

Use the [`@modelcontextprotocol/ext-apps`](https://github.com/modelcontextprotocol/ext-apps) package to build MCP Apps. The SDK provides:

- **`App` class**: Main interface for communicating with the host
    - `connect()`: Establish connection with VS Code
    - `callServerTool(name, args)`: Call tools on the originating MCP server
    - `sendMessage(content)`: Send a message to the chat input
    - `updateModelContext(context)`: Provide context for future conversation turns
    - `openLink(url)`: Request to open a URL in the browser
    - `sendLog(level, message)`: Send debug logs (not added to conversation)

- **Notification handlers**: Set these to receive events from VS Code
    - `ontoolinput`: Receive complete tool arguments
    - `ontoolinputpartial`: Receive streaming partial arguments
    - `ontoolresult`: Receive tool execution results
    - `ontoolcancelled`: Handle tool cancellation
    - `onhostcontextchanged`: Respond to theme or locale changes
    - `onteardown`: Clean up before unmounting

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

MCP Apps run in sandboxed iframes with Content Security Policy (CSP) enforcement. When defining a UI resource, declare the domains your app needs to access:

- `connectDomains`: Domains for fetch/XHR requests
- `resourceDomains`: Domains for images, fonts, and other resources
- `frameDomains`: Domains that can be embedded in iframes

#### Learn more

- [MCP Apps specification](https://modelcontextprotocol.github.io/ext-apps/api/)
- [MCP Apps SDK and examples](https://github.com/modelcontextprotocol/ext-apps)
- [MCP Apps announcement blog post](https://code.visualstudio.com/blogs/2026/01/26/mcp-apps-support)

## Add MCP servers to VS Code

For {% data variables.product.prodname_copilot_short %}, distribute your server in one of these ways:

* **Native configuration:** Provide a launch command or HTTP endpoint for workspace-root `.mcp.json` or `$COPILOT_HOME/mcp-config.json` (`~/.copilot/mcp-config.json` when `COPILOT_HOME` is unset). The runtime reads these files on the host where it runs, independently of editor discovery.
* **Agent plugin:** [Bundle MCP servers with a plugin](/docs/agents/reference/agent-plugin-reference.md) when your integration also provides skills, instructions, or other customizations. Plugin-provided servers are loaded through the plugin, not copied into an editor profile.
* **Connected-editor integration:** Offer an [installation URL](#create-an-mcp-installation-or-lookup-url) or [register servers from an extension](#register-an-mcp-server-in-your-extension). Eligible editor-provided definitions can be forwarded to the runtime.

Link users to the [connection walkthrough](/docs/agent-customization/mcp-servers.md#connect-a-server), [configuration reference](/docs/agents/reference/mcp-configuration.md), and [first-tool-call verification](/docs/agent-customization/mcp-servers.md#verify-the-first-tool-call) rather than assuming that adding a configuration makes its tools available in every session.

## Manage MCP servers

For {% data variables.product.prodname_copilot_short %}, select the intended session and open **Chat: Open Customizations** > **MCP Servers**. Manage native servers in their configuration source and plugin-provided servers through their plugin. See [server controls](/docs/agents/run/manage-mcp-servers.md#control-or-remove-a-server) for supported actions and removal instructions.

Server startup and tool availability belong to the runtime that owns the connection. Stopping an editor-managed server doesn't stop a separate native connection, and a later request can restart a stopped server. See [automatic startup](/docs/agents/run/manage-mcp-servers.md#automatically-start-mcp-servers).

**MCP: List Servers** also provides server actions. The available actions depend on the owning harness and configuration source. For existing Local integrations, see [Local harness compatibility (deprecated)](#local-harness-compatibility-deprecated) `feature(local-harness)`.

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
> For VS Code Insiders, use the `vscode-insiders:` scheme prefix (for example, `vscode-insiders:mcp/by-name/<registry-server-name>`). For more information about URL schemes across extensions, plugins, and workspaces, see [URL handling](/docs/configure/command-line.md#url-handling).

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

## Troubleshoot and debug MCP servers

First test your server in its intended {% data variables.product.prodname_copilot_short %} session and [verify a tool call](/docs/agent-customization/mcp-servers.md#verify-the-first-tool-call). For startup, authentication, and runtime output, follow [MCP troubleshooting](/docs/agents/run/manage-mcp-servers.md#troubleshoot-mcp-servers).

### MCP output log

For {% data variables.product.prodname_copilot_short %} server logs, use the [output controls for the selected session](/docs/agents/run/manage-mcp-servers.md#view-server-output).

For editor-managed connections, see [Local server output](#local-server-output) and [development mode](#mcp-development-mode-in-vs-code). Those controls don't apply to a separate native runtime connection.

## Best practices

* **Naming conventions** to ensure unique and descriptive names
* **Implement proper error handling and validation** with descriptive error messages
* **Use progress reporting** to inform users about long-running operations
* **Keep tool operations focused and atomic** to avoid complex interactions
* **Document your tools clearly** with descriptions that help users understand when to use them
* **Handle missing input parameters gracefully** by providing default values or clear error messages
* **Set MIME types for resources** to ensure proper handling of different content types in VS Code
* **Use resource templates where supported by the target client** to collect parameters when accessing resources
* **Cache resource content** to improve performance and reduce unnecessary network requests
* **Set reasonable token limits** for sampling requests to avoid excessive resource usage
* **Validate sampling responses** before using them

### Naming conventions

Apply the following naming conventions to the components your integration uses. A naming convention doesn't imply that every client exposes the component.

| Component | Naming Convention Guidelines |
|-----------|----------------------------|
| Tool name | <ul><li>Unique within the MCP server</li><li>Describes the action and the target of the action</li><li>Use snake case, structured as `{verb}_{noun}`</li><li>Examples: `generate_report`, `fetch_data`, `analyze_code`</li></ul> |
| Tool input parameter | <ul><li>Describes the purpose of the parameter</li><li>Use camelCase for multi-word parameters</li><li>Examples: `path`, `queryString`, `userId`</li></ul> |
| Resource name | <ul><li>Unique within the MCP server</li><li>Describes the content of the resource</li><li>Use title case</li><li>Examples: `Application Logs`, `Database Table`, `GitHub Repository`</li></ul> |
| Resource template parameter | <ul><li>Describes the purpose of the parameter</li><li>Use camelCase for multi-word parameters</li><li>Examples: `name`, `repo`, `fileType`</li></ul> |
| Prompt name | <ul><li>Unique within the MCP server</li><li>Describes the intended use of the prompt</li><li>Use camelCase for multi-word parameters</li><li>Examples: `generateApiRoute`, `performSecurityReview`, `analyzeCodeQuality`</li></ul> |
| Prompt input parameter | <ul><li>Describes the purpose of the parameter</li><li>Use camelCase for multi-word parameters</li><li>Examples: `filePath`, `queryString`, `userId`</li></ul> |

## Get started to create an MCP server

VS Code has all the tools you need to develop your own MCP server. While MCP servers can be written in any language that can handle `stdout`, the MCP's official SDKs are a good place to start:

* [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
* [Python SDK](https://github.com/modelcontextprotocol/python-sdk)
* [Java SDK](https://github.com/modelcontextprotocol/java-sdk)
* [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)
* [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)

You might also find the [MCP for Beginners curriculum](https://github.com/microsoft/mcp-for-beginners) helpful to get started with building your first MCP server.

## Local harness compatibility (deprecated)

`feature(local-harness)`

Use this section when maintaining an integration for the deprecated Local harness . The Local harness uses the editor's MCP client directly. The workflows below describe that editor-managed connection, not a native Copilot connection. Some editor UI can also be available outside Local harness sessions; its availability doesn't imply that native servers use the same connection or discovery path.

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

## Related content

* [Author an agent plugin](/docs/agents/reference/agent-plugin-reference.md).
* [MCP configuration reference](/docs/agents/reference/mcp-configuration.md).
* [Model Context Protocol documentation](https://modelcontextprotocol.io/).
