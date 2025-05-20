---
# DO NOT TOUCH — Managed by doc writer
ContentId: e655f324-ed0b-452d-aff3-52cdca3978a5
DateApproved: 05/08/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to registering an MCP server in a VS Code extension.
---

# MCP servers

Model Context Protocol (MCP) is an open standard that enables AI models to interact with external tools and services through a unified interface. Visual Studio Code can act as an MCP client, which enables users to [access MCP tools in agent mode](/docs/copilot/chat/mcp-servers.md). This article guides you through registering an MCP server in a VS Code extension.

VS Code retrieves MCP server configurations from `.vscode/mcp.json` files in workspace folders and the `mcp` section of workspace, remote, and user settings. It can also automatically discover them from other tools' configuration, including Claude Desktop.

VS Code extensions can also register MCP server configurations programmatically to avoid that users need to manually configure them. This is useful if you already have an MCP server and want to register it as part of your extension activation, or if your extension has a dependency on an MCP server.

Instead of using MCP servers to extend the chat functionality, you can also [contribute language model tools](/api/extension-guides/tools.md) directly within your extension. This approach is useful if you want to deeply integrate with VS Code by using extension APIs or to avoid that users have to install and run an MCP server in a separate process.

> [!IMPORTANT]
> MCP support in VS Code is in preview and the API for registering an MCP server in a VS Code extension is currently in a proposed state.

## Register an MCP server

To register an MCP server in your extension, use the `vscode.lm.registerMcpServerDefinitionProvider` API to provide the [MCP configuration](/docs/copilot/chat/mcp-servers.md#configuration-format) for the server. The API takes a `providerId` string and a `McpServerDefinitionProvider` object.

Before calling this method, extensions must register the `contributes.mcpServerDefinitionProviders` extension point in the `package.json` with the `id` of the provider.

The `McpServerDefinitionProvider` object has two properties:

- `onDidChangeMcpServerDefinitions`: event that is triggered when the MCP server configurations change.
- `provideMcpServerDefinitions`: function that returns an array of MCP server configurations (`vscode.McpServerDefinition[]`).

An `McpServerDefinition` object can be one of the following types:

- `vscode.McpStdioServerDefinition`: represents an MCP server available by running a local process and operating on its stdin and stdout streams.
- `vscode.McpHttpServerDefinition`: represents an MCP server available using the Streamable HTTP transport.

The following example demonstrates how to register an MCP server in an extension.

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const didChangeEmitter = new vscode.EventEmitter<void>();

    context.subscriptions.push(vscode.lm.registerMcpServerDefinitionProvider('exampleProvider', {
        onDidChangeMcpServerDefinitions: didChangeEmitter.event,
        provideMcpServerDefinitions: async () => {
            let servers: vscode.McpServerDefinition[] = [];

            let apiKey = vscode.workspace.getConfiguration().get<string>('apikey') || '';

            // Example of a simple stdio server definition
            servers.push(new vscode.McpStdioServerDefinition(
            {
                label: 'my-server',
                command: 'node',
                args: ['server.js'],
                cwd: vscode.Uri.file('/path/to/server'),
                env: {
                    API_KEY: apiKey
                },
                version: '1.0.0'
            });

            // Example of an HTTP server definition
            servers.push(new vscode.McpHttpServerDefinition(
            {
                label: 'my-http-server',
                uri: 'http://localhost:3000',
                headers: {
                    Authorization: `Bearer ${apiKey}`
                },
                version: '1.0.0'
            }));

            return servers;
        }
    }));
}
```

The `package.json` file should include the corresponding `contributes/mcpServerDefinitionProviders` section:

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

## Getting started

Get started with a full example of how to register an MCP server in a VS Code extension:

- [MCP extension sample](https://github.com/microsoft/vscode-extension-samples/blob/main/mcp-extension-sample)

## Related content

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Use MCP tools in agent mode](/docs/copilot/chat/mcp-servers.md)
- [Contribute a language model tool](/api/extension-guides/tools.md)
- [Language Model API reference](/api/references/vscode-api.md#lm)
