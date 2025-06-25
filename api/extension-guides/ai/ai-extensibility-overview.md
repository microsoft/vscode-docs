---
ContentId: e375ec2a-43d3-4670-96e5-fd25a6aed272
DateApproved: 06/12/2025
MetaDescription: Overview of how to extend the AI features in your Visual Studio Code extension by using the Language Model, Tools, and Chat APIs.
---
# AI extensibility in VS Code

This article provides an overview of AI extensibility options in Visual Studio Code, helping you choose the right approach for your extension.

VS Code includes powerful AI features that enhance the coding experience:

- **Code completion**: Offers inline code suggestions as you type
- **Agent mode**: Enables AI to autonomously plan and execute development tasks with specialized tools
- **Chat**: Lets developers use natural language to ask questions or make edits in codebase through chat interfaces
- **Smart actions**: Use AI-enhanced actions for common development tasks, integrated throughout the editor

You can extend and customize each of these built-in capabilities to create tailored AI experiences that meet the specific needs of your users.

## Why extend AI in VS Code?

Adding AI capabilities to your extension brings several benefits:

- **Enhanced user experience**: Provide intelligent assistance tailored to your extension's domain
- **Improved productivity**: Automate repetitive tasks and provide contextual help
- **Rich context awareness**: Use workspace understanding to deliver relevant assistance
- **Domain specialization**: Create AI features specific to a programming language, framework, or domain

## Extend the chat experience

### Language model tool

Language model tools enable you to extend agent mode in VS Code with domain-specific capabilities. In agent mode, these tools are automatically invoked based on the user's chat prompt to perform specialized tasks or retrieve information from a data source or service. Users can also reference these tools explicitly in their chat prompt by #-mentioning the tool.

To implement a language model tool, use the [Language Model Tools API](/api/extension-guides/ai/tools) within your VS Code extension. A language model can access all VS Code extension APIs and provide deep integration with the editor.

**Key benefits**:

- Domain-specific capabilities as part of an autonomous coding workflow
- Automatic tool invocation in agent mode, depending on user intent
- Deep VS Code integration through extension APIs
- Easy distribution and deployment via the Visual Studio Marketplace

**Key considerations**:

- Remote deployment requires the extension to implement the client-server communication
- Reuse across different tools requires modular design and implementation

### MCP tool

Model Context Protocol (MCP) tools provide a way to integrate external services with language models by using a standardized protocol. In agent mode, these tools are automatically invoked based on the user's chat prompt to perform specialized tasks or retrieve information from external data sources.

MCP tools run outside of VS Code, either locally on the user's machine or as a remote service. Users can add MCP tools through JSON configuration or VS Code extension can configure them programmatically. You can implement MCP tools through various language SDKs and deployment options.

As MCP tools run outside of VS Code, they do not have access to the VS Code extension APIs.

**Key benefits**:

- Domain-specific capabilities as part of an autonomous coding workflow
- Automatic tool invocation in agent mode, depending on user intent
- Local and remote deployment options
- Share implementations across different tools and platforms

**Key considerations**:

- No access to VS Code extension APIs
- Distribution and deployment require users to set up the MCP server

### Chat participant

Chat participants are specialized assistants that enable users to extend ask mode with domain-specific experts. In ask mode, users can invoke a chat participant by @-mentioning it and passing in a natural language prompt about a particular topic or domain. The chat participant is responsible for handling the entire chat interaction.

To implement a chat participant, use the [Chat API](/api/extension-guides/ai/chat) within your VS Code extension. A chat participant can access all VS Code extension APIs and provide deep integration with the editor.

**Key benefits**:

- Provide domain-specific expertise in ask mode
- Control interaction flow and customize response behavior
- Deep VS Code integration through extension APIs
- Easy distribution and deployment via the Visual Studio Marketplace

**Key considerations**:

- Only available in ask mode
- Remote deployment requires the extension to implement the client-server communication
- Reuse across different tools requires modular design and implementation

## Build your own AI-powered features

VS Code gives you direct programmatic access to AI models for creating custom AI-powered features in your extensions. This approach enables you to build editor-specific interactions that use AI capabilities without relying on the chat interface.

To use language models directly, use the [Language Model API](/api/extension-guides/ai/language-model) within your VS Code extension. You can incorporate these AI capabilities into any extension feature, such as code actions, hover providers, custom views, and more.

**Key benefits**:

- Create custom workflows and experiences that target specific use cases
- Integrate AI capabilities into existing extension features
- Deep VS Code integration through extension APIs
- Easy distribution and deployment via the Visual Studio Marketplace

**Key considerations**:

- Reuse across chat or different tools requires modular design and implementation

## Decide which option to use

When choosing the right approach for extending AI in your VS Code extension, consider the following guidelines:

1. **Choose Language Model Tool when**:
    - You want to extend chat in VS Code with specialized capabilities
    - You want automatic invocation based on user intent in agent mode
    - You want access to VS Code APIs for deep integration in VS Code
    - You want to distribute your tool through the VS Code Marketplace

1. **Choose MCP Tool when**:
    - You want to extend chat in VS Code with specialized capabilities
    - You want automatic invocation based on user intent in agent mode
    - You don't need to integrate with VS Code APIs
    - Your tool needs to work across different environments (not just VS Code)
    - Your tool should run remotely or locally

1. **Choose Chat Participant when**:
    - You want to extend ask mode with a specialized assistant with domain expertise
    - You need to customize the entire interaction flow and response behavior
    - You want access to VS Code APIs for deep integration in VS Code
    - You want to distribute your tool through the VS Code Marketplace

1. **Choose Language Model API when**:
    - You want to integrate AI capabilities into existing extension features
    - You're building UI experiences outside the chat interface
    - You need direct programmatic control over AI model requests

## Next steps

Choose the approach that best fits your extension's goals:

- [Implement a language model tool](/api/extension-guides/ai/tools)
- [Register MCP tools in your VS Code extension](/api/extension-guides/ai/mcp)
- [Integrate AI in your extension with the Language Model API](/api/extension-guides/ai/language-model)
- [Implement a chat participant](/api/extension-guides/ai/chat)

### Sample projects

- [Chat sample](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample): Extension with agent mode tool and chat participant
- [Code tutor chat participant tutorial](/api/extension-guides/ai/chat-tutorial): Building a specialized chat assistant
- [AI-powered code annotations tutorial](/api/extension-guides/ai/language-model-tutorial): Step-by-step guide for using the Language Model API
- [MCP extension sample](https://github.com/microsoft/vscode-extension-samples/blob/main/mcp-extension-sample): Extension that registers an MCP tool
