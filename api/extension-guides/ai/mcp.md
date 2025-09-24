---
# DO NOT TOUCH — Managed by doc writer
ContentId: e655f324-ed0b-452d-aff3-52cdca3978a5
DateApproved: 09/11/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A comprehensive guide for developers building MCP servers that work with Visual Studio Code.
---

# MCP developer guide

Model Context Protocol (MCP) is an open standard that enables AI models to interact with external tools and services through a unified interface. Visual Studio Code implements the full MCP specification, enabling you to create MCP servers that provide tools, prompts, and resources for extending the capabilities of AI agents in VS Code.

This guide covers everything you need to know to build MCP servers that work seamlessly with VS Code and other MCP clients.

> [!IMPORTANT]
> MCP support in VS Code is currently in preview.

## Why use MCP servers?

Implementing an MCP server to extend chat in VS Code with language model tools has the following benefits:

- **Extend agent mode** with specialized, domain-specific, tools that are automatically invoked as part of responding to a user prompt. For example, enable database scaffolding and querying to dynamically provide the LLM with relevant context.
- **Flexible deployment options** for local and remote scenarios.
- **Reuse** your MCP server across different tools and platforms.

You might consider implementing a language model tool with the [Language Model API](/api/extension-guides/ai/tools) in the following scenarios:

- You want to deeply integrate with VS Code by using extension APIs.
- You want to distribute your tool and updates by using the Visual Studio Marketplace.

## MCP features supported by VS Code

VS Code supports the following MCP capabilities:

* [Transports](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports):
    * Local standard input/output (`stdio`)
    * Streamable HTTP (`http`)
    * Server-sent events (`sse`) - legacy support.

* [Features](https://modelcontextprotocol.io/specification/2025-06-18#features):
    * Tools: extend [agent mode](/docs/copilot/chat/chat-agent-mode) with extra tools
    * Prompts: add reusable prompts as slash commands in chat
    * Resources: provide data and content that users can add as chat context or interact with directly in VS Code
    * Elicitation: request input from the user
    * Sampling: make language model requests using the user's configured models and subscription
    * Authentication: authorize access to an MCP server using OAuth
    * Server instructions
    * Roots: provide information about the user's workspace root folder(s)

### Tools

#### Tool definition

VS Code supports MCP tools in agent mode, where they are invoked as needed based on the task. Users can enable and configure them with the tools picker. The tool description is shown in the tools picker, alongside the tool name, and in the dialog when asking for confirmation before running a tool.

![Screenshot that shows the tools picker in agent mode, highlighting tools from an MCP server.](../images/ai/mcp/mcp-tools-picker.png)

Users can edit model-generated input parameters in the tool confirmation dialog. The confirmation dialog will be shown for all tools that are not marked with the `readOnlyHint` annotation.

![Screenshot that shows the tool confirmation dialog with input parameters for an MCP tool.](../images/ai/mcp/mcp-tool-input-parameters.png)

#### Dynamic tool discovery

VS Code also supports [dynamic tool discovery](https://modelcontextprotocol.io/docs/concepts/tools#tool-discovery-and-updates), allowing servers to register tools at runtime. For example, a server can provide different tools based on the framework or language detected in the workspace, or in response to the user's chat prompt.

#### Tool annotations

To provide extra metadata about a tool's behavior, you can use [tool annotations](https://modelcontextprotocol.io/docs/concepts/tools#tool-annotations):

- `title`: Human-readable title for the tool, shown in the Chat view when a tool is invoked
- `readOnlyHint`: Optional hint to indicate that the tool is read-only. VS Code doesn't ask for confirmation to run read-only tools.

### Resources

Resources enable you to provide data and content to users in a structured way. Users can directly access resources in VS Code, or use them as context in chat prompts. For example, an MCP server could generate screenshots and make them available as resources, or provide access to log files, which are then updated in real-time.

When you define an MCP resource, the resource name is shown in the MCP Resources Quick Picks. Resources can be opened via the **MCP: Browse Resources** command or attached to a chat request with **Add Context** and then selecting **MCP Resource**. Resources can contain text or binary content.

![Screenshot that shows the MCP Resources Quick Pick.](../images/ai/mcp/mcp-resources-picker.png)

VS Code supports resource updates, enabling users to see changes to the contents of a resource in real-time in the editor.

#### Resource templates

VS Code also supports [resource templates](https://modelcontextprotocol.io/docs/concepts/resources#resource-templates), enabling users to provide input parameters when referencing a resource. For example, a database query tool could ask for the database table name.

When accessing a resource with a template, users are prompted for the required parameters in a Quick Pick. You can provide completions to suggest values for the parameter.

### Prompts

Prompts are reusable chat prompt templates that users can invoke in chat by using a slash command (`mcp.servername.promptname`). Prompts can be useful for onboarding users to your servers by highlighting various tools or providing built-in complex workflows that adapt to the user's local context and service.

If you define [completions](https://modelcontextprotocol.io/specification/2025-06-18/server/utilities/completion) to suggest values for prompt input arguments, then VS Code shows a dialog to collect input from the user.

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

![Screenshot that shows the prompt dialog for an MCP prompt with input parameters.](../images/ai/mcp/mcp-prompt-argument.png)

> [!NOTE]
> Users can enter a terminal command in the prompt dialog and use the command output as input for the prompt.

When you include a resource type in the prompt response, VS Code attaches that resource as context to the chat prompt.

### Authorization

VS Code supports MCP servers that require authentication, allowing users to interact with an MCP server that operates on behalf of their user account for that service.

The [authorization specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) cleanly separates MCP servers as Resource Servers from Authorization Servers, allowing developers to delegate authentication to existing identity providers (IdPs) rather than building their own OAuth implementations from scratch.

VS Code has built-in authentication support for GitHub and Microsoft Entra. If your MCP server implements the latest specification and uses GitHub or Microsoft Entra as the authorization server, users can manage which MCP servers have access to their account through the **Accounts menu** > **Manage Trusted MCP Servers** action for that account.

![Screenshot that shows the Accounts menu with the Manage Trusted MCP Servers action.](../images/ai/mcp/manage-trusted-mcp.png)

VS Code supports authorization using OAuth 2.1 standards and 2.0 standards to other IdPs than GitHub and Microsoft Entra. VS Code first starts with a [Dynamic Client Registration (DCR)](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization#dynamic-client-registration) handshake and then falls back to a client-credentials workflow if the IdP does not support DCR. This gives more flexibility to the various IdPs to create static client IDs or specific client ID-secret pairs for each MCP server accordingly.

Users can then view their authentication status also through the **Accounts menu**. To remove dynamic client registrations, users can use the **Authentication: Remove Dynamic Authentication Providers** command in the Command Palette.

Below is a checklist to ensure your MCP server and VS Code's OAuth workflows will work:

1. The MCP server defines the [MCP authorization specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization).
2. The IdP must support either DCR or client credentials
3. The redirect URL list must include these URLs: `http://127.0.0.1:33418` and `https://vscode.dev/redirect`

When DCR is not supported by the MCP server, users will go through the fallback client-credential flow:

![Screenshot that shows the authorization when DCR is not supported for a MCP server.](../images/ai/mcp/mcp-auth-dynamic-client-required.png)

![Screenshot that shows the authorization when Client ID for a MCP server is requested.](../images/ai/mcp/mcp-auth-client-id.png)

![Screenshot that shows the authorization when Client Secret for a MCP server is requested.](../images/ai/mcp/mcp-auth-client-secret.png)

> [!NOTE]
> VS Code still supports MCP servers that behave as an authorization server, but it is recommended to use the latest specification for new servers.

### Sampling

VS Code provides access to [sampling](https://modelcontextprotocol.io/docs/concepts/sampling) for MCP servers. This allows your MCP server to make language model requests using the user's configured models and subscriptions. For example, use sampling to summarize large data sets, to extract information before sending it to the client, or to implement agentic decision logic in a tool.

The first time an MCP server performs a sampling request, the user is prompted to authorize the server to access their models.

![Screenshot that shows the authorization prompt for an MCP server to access models.](../images/ai/mcp/mcp-allow-sampling.png)

When making sampling requests with specific models, consider that users can restrict which models an MCP server can use with the **MCP: List Servers** > **Configure Model Access** command in the Command Palette. When you specify `modelPreferences` in your MCP server to provide hints about which models to use for sampling, VS Code will pick from the allowed models.

![Screenshot that shows the Configure Model Access dialog for an MCP server.](../images/ai/mcp/mcp-configure-model-access.png)

Users can view the sampling requests made by an MCP server with the **MCP: List Servers** > **Show Sampling Requests** command in the Command Palette.

### Workspace roots

VS Code provides the MCP server with the user's workspace root folder information.

## Add MCP servers to VS Code

Users can add MCP servers within VS Code in several ways:

- Install directly from the web: use a special MCP installation URL (`vscode:mcp/install`) on your website.
- Workspace configuration: Specify the server configuration in a `.vscode/mcp.json` file in the workspace.
- Global configuration: Define servers globally in the user [profile](/docs/configure/profiles).
- Autodiscovery: VS Code can discover servers from other tools like Claude Desktop.
- Extension: VS Code extensions can register MCP servers programmatically.
- Command line: Install MCP servers from the command line with the `--add-mcp` VS Code command-line option.

Learn more about the different ways to [add MCP servers to VS Code](/docs/copilot/customization/mcp-servers#add-an-mcp-server).

## Manage MCP servers

You can manage the list of installed MCP servers from the Extension view (`kb(workbench.view.extensions)`) in VS Code.

![Screenshot showing the MCP servers in the Extensions view.](../images/ai/mcp/extensions-view-mcp-servers.png)

Right-click on an MCP server or select the gear icon to perform different management actions on the server. Alternatively, run the **MCP: List Servers** command from the Command Palette to view the list of configured MCP servers. You can then select a server and perform actions on it.

> [!TIP]
> When you open the `.vscode/mcp.json` file, VS Code shows commands in the editor to start, stop, or restart a server directly from the editor.
>
> ![MCP server configuration with lenses to manage server.](../images/ai/mcp/mcp-server-config-lenses.png)

## Create an MCP installation URL

VS Code provides a URL handler for installing an MCP server from a link: `vscode:mcp/install?{json-configuration}` (Insiders: `vscode-insiders:mcp/install?{json-configuration}`).

Provide the JSON server configuration in the form `{\"name\":\"server-name\",\"command\":...}` and then perform a JSON-stringify and URL encode on it. For example, use the following logic to create the installation URL:

```typescript
// For Insiders, use `vscode-insiders` instead of `code`
const link = `vscode:mcp/install?${encodeURIComponent(JSON.stringify(obj))}`;
```

This link can be used in a browser, or opened on the command line, for example via `xdg-open $LINK` on Linux.

## Register an MCP server in your extension

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

To register an MCP server in your extension, use the [`vscode.lm.registerMcpServerDefinitionProvider`](/api/references/vscode-api#lm.registerMcpServerDefinitionProvider) API to provide the [MCP configuration](/docs/copilot/chat/mcp-servers#_configuration-format) for the server. The API takes a `providerId` string and a `McpServerDefinitionProvider` object.

The `McpServerDefinitionProvider` object has three properties:

- `onDidChangeMcpServerDefinitions`: event that is triggered when the MCP server configurations change.
- `provideMcpServerDefinitions`: function that returns an array of MCP server configurations (`vscode.McpServerDefinition[]`).
- `resolveMcpServerDefinition`: function that the editor calls when the MCP server needs to be started. Use this function to perform additional actions that may require user interaction, such as authentication.

An `McpServerDefinition` object can be one of the following types:

- `vscode.McpStdioServerDefinition`: represents an MCP server available by running a local process and operating on its stdin and stdout streams.
- `vscode.McpHttpServerDefinition`: represents an MCP server available using the Streamable HTTP transport.

<details>
<summary>Example MCP server definition provider</summary>

The following example demonstrates how to register MCP servers in an extension and prompt the user for an API key when starting the server.

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const didChangeEmitter = new vscode.EventEmitter<void>();

    context.subscriptions.push(vscode.lm.registerMcpServerDefinitionProvider('exampleProvider', {
        onDidChangeMcpServerDefinitions: didChangeEmitter.event,
        provideMcpServerDefinitions: async () => {
            let servers: vscode.McpServerDefinition[] = [];

            // Example of a simple stdio server definition
            servers.push(new vscode.McpStdioServerDefinition(
            {
                label: 'myServer',
                command: 'node',
                args: ['server.js'],
                cwd: vscode.Uri.file('/path/to/server'),
                env: {
                    API_KEY: ''
                },
                version: '1.0.0'
            });

            // Example of an HTTP server definition
            servers.push(new vscode.McpHttpServerDefinition(
            {
                label: 'myRemoteServer',
                uri: 'http://localhost:3000',
                headers: {
                    'API_VERSION': '1.0.0'
                },
                version: '1.0.0'
            }));

            return servers;
        },
        resolveMcpServerDefinition: async (server: vscode.McpServerDefinition) => {

            if (server.label === 'myServer') {
                // Get the API key from the user, e.g. using vscode.window.showInputBox
                // Update the server definition with the API key
            }

            // Return undefined to indicate that the server should not be started or throw an error
            // If there is a pending tool call, the editor will cancel it and return an error message
            // to the language model.
            return server;
        }
    }));
}
```

</details>

## Troubleshoot and debug MCP servers

### MCP development mode in VS Code

When developing MCP servers, you can enable _development mode_ for MCP servers by adding a `dev` key to the MCP server configuration. This is an object with two properties:

* `watch`: A file glob pattern to watch for files change that will restart the MCP server.
* `debug`: Enables you to set up a debugger with the MCP server. Currently, VS Code supports debugging Node.js and Python MCP servers.

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

### MCP output log

When VS Code encounters an issue with an MCP server, it shows an error indicator in the Chat view.

![MCP Server Error](../images/ai/mcp/mcp-error-loading-tool.png)

Select the error notification in the Chat view, and then select the **Show Output** option to view the server logs. Alternatively, run **MCP: List Servers** from the Command Palette, select the server, and then choose **Show Output**.

![MCP Server Error Output](../images/ai/mcp/mcp-server-error-output.png)

## Best practices

- **Naming conventions** to ensure unique and descriptive names
- **Implement proper error handling and validation** with descriptive error messages
- **Use progress reporting** to inform users about long-running operations
- **Keep tool operations focused and atomic** to avoid complex interactions
- **Document your tools clearly** with descriptions that help users understand when to use them
- **Handle missing input parameters gracefully** by providing default values or clear error messages
- **Set MIME types for resources** to ensure proper handling of different content types in VS Code
- **Use resource templates** to allow users to provide input parameters when accessing resources
- **Cache resource content** to improve performance and reduce unnecessary network requests
- **Set reasonable token limits** for sampling requests to avoid excessive resource usage
- **Validate sampling responses** before using them

### Naming conventions

The following naming conventions are recommended for MCP servers and their components:

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

- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk)
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)

You might also find the [MCP for Beginners curriculum](https://github.com/microsoft/mcp-for-beginners) helpful to get started with building your first MCP server.

## Related content

- [Contribute a language model tool](/api/extension-guides/ai/tools)
- [Use MCP tools in agent mode](/docs/copilot/chat/mcp-servers)
- [VS Code curated list of MCP servers](https://code.visualstudio.com/mcp)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
