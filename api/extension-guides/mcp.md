---
# DO NOT TOUCH — Managed by doc writer
ContentId: e655f324-ed0b-452d-aff3-52cdca3978a5
DateApproved: 04/03/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to registering an MCP server in a VS Code extension.
---

# MCP servers

Model Context Protocol (MCP) is an open standard that enables AI models to interact with external tools and services through a unified interface. Visual Studio Code can act as an MCP client, which enables users to [access MCP tools in agent mode](/docs/copilot/chat/mcp-servers.md). This article guides you through registering an MCP server in a VS Code extension.

VS Code retrieves MCP server configurations from an `.vscode/mcp.json` file in the workspace, user settings, or can automatically discover them from other tools like Claude Desktop. VS Code extensions can also register MCP server configurations programmatically. This is useful if you already have an MCP server and want to register it as part of your extension.

Alternatively, you can [contribute language model tools](/api/extension-guides/tools.md) directly within your extension. This approach is useful if you want to deeply integrate with VS Code by using extension APIs or to avoid that users have to install and run an MCP server in a separate process. Learn more about why you might want to [contribute a language model tool](/api/extension-guides/tools.md#why-implement-a-language-model-tool-in-your-extension).

> [!IMPORTANT]
> MCP support in VS Code is in preview and the API for registering an MCP server in a VS Code extension is currently in a proposed state.

## Register an MCP server

To register an MCP server in your extension, use the `vscode.lm.registerMcpConfigurationProvider` API to provide the [MCP configuration](/docs/copilot/chat/mcp-servers.md#configuration-format) for the server. The API takes a `providerId` string and a `McpConfigurationProvider` object.

The `McpConfigurationProvider` object has two properties:

- `onDidChange`: An event that is triggered when the MCP server configurations change.
- `provideMcpServerDefinitions`: A function that returns an array of MCP server configurations (`vscode.McpServerDefinition[]`).

The following example demonstrates how to register an MCP server in an extension.

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const didChangeEmitter = new vscode.EventEmitter<void>();

    context.subscriptions.push(vscode.lm.registerMcpConfigurationProvider('exampleGist', {
        onDidChange: didChangeEmitter.event,
        provideMcpServerDefinitions: async () => {
            let servers: vscode.McpServerDefinition[] = [
                {
                    label: 'my-server',
                    command: 'node',
                    args: ['server.js'],
                    cwd: vscode.Uri.file('/path/to/server'),
                    env: {
                        API_KEY: process.env['API_KEY'] || ''
                    }
                }
            ];
            return servers;
        }
    }));
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
