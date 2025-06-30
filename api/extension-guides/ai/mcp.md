---
# DO NOT TOUCH — Managed by doc writer
ContentId: e655f324-ed0b-452d-aff3-52cdca3978a5
DateApproved: 06/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to registering an MCP server in a VS Code extension.
---

# MCP servers

Model Context Protocol (MCP) is an open standard that enables AI models to interact with external tools and services through a unified interface. Visual Studio Code can act as an MCP client, which enables users to [access MCP tools in agent mode](/docs/copilot/chat/mcp-servers). This article guides you through registering an MCP server in a VS Code extension.

VS Code retrieves MCP server configurations from `.vscode/mcp.json` files in workspace folders and the `mcp` section of workspace, remote, and user settings. It can also automatically discover them from other tools' configuration, including Claude Desktop.

VS Code extensions can also register MCP server configurations programmatically to avoid that users need to manually configure them. This is useful if you already have an MCP server and want to register it as part of your extension activation, or if your extension has a dependency on an MCP server.

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

## Related content

- [Contribute a language model tool](/api/extension-guides/ai/tools)
- [Use MCP tools in agent mode](/docs/copilot/chat/mcp-servers)
- [VS Code curated list of MCP servers](https://code.visualstudio.com/mcp)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
