---
ContentId: e375ec2a-43d3-4670-96e5-fd25a6aed272
DateApproved: 06/25/2025
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
- **Rich context awareness**: Leverage workspace understanding to deliver relevant assistance
- **Domain specialization**: Create AI features specific to a programming language, framework, or domain

## Extend the chat experience

### Language model tool

Language model tools enable you to extend agent mode in VS Code with domain-specific capabilities. In agent mode, these tools are automatically invoked based on the user's chat prompt to perform specialized tasks or retrieve information from a data source or service. Users can also reference these tools explicitly in their chat prompt by #-mentioning the tool.

To implement a language model tool, use the [Language Model Tools API](/api/extension-guides/ai/tools) within your VS Code extension. A language model can access all VS Code extension APIs and provide deep integration with the editor.

**Key benefits**:

- Add domain-specific capabilities as part of an autonomous coding workflow
- Automatic tool invocation in agent mode, depending on user intent
- Deep VS Code integration through extension APIs
- Easy distribution and deployment via the Visual Studio Marketplace

**Key considerations**:

- Remote deployment requires the extension to implement the client-server communication
- Reuse across different tools requires modular design and implementation

**Examples**:

TODO

### MCP tool

Model Context Protocol (MCP) tools provide a way to integrate external services with language models by using a standardized protocol. In agent mode, these tools are automatically invoked based on the user's chat prompt to perform specialized tasks or retrieve information from external data sources.

MCP tools run outside of VS Code, either locally on the user's machine or as a remote service. Users can add MCP tools through JSON configuration or VS Code extension can configure them programmatically. You can implement MCP tools through various language SDKs and deployment options.

As MCP tools run outside of VS Code, they do not have access to the VS Code extension APIs.

**Key benefits**:

- Add domain-specific capabilities as part of an autonomous coding workflow
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

To choose the right extensibility option, consider these factors:

| If you want to... | Consider using... |
|-------------------|-------------------|
| Execute actions based on user intent in chat | Language Model Tool |
| Run complex or resource-intensive AI tasks | MCP Tool |
| Create a specialized assistant with domain expertise | Chat Participant |
| Add AI capabilities to existing extension features | Language Model API |

**Decision guidance**:

1. **Language Model Tool**: Best for extensions that need to perform tasks in response to natural language requests and require access to VS Code APIs.

2. **MCP Tool**: Ideal when you need to run tools outside VS Code or want to leverage existing REST APIs and services.

3. **Chat Participant**: Choose when you want to create a specialized assistant that can answer domain-specific questions.

4. **Language Model API**: Best for building custom AI-powered features integrated with your extension's existing functionality.

## Use cases

Here are examples of how AI can enhance your VS Code extension:

- **Docs querying**: Use Retrieval-Augmented Generation (RAG) to query documentation and generate contextual responses.

- **AI-assisted coding**: Provide editor annotations with coding suggestions and improvements.

- **AI-powered reviews**: Review code for security vulnerabilities or performance issues.

- **Data retrieval**: Query databases or services to retrieve topic-specific information.

- **Enterprise coding assistant**: Create a chat experience grounded in enterprise data and coding guidelines.

- **Enhanced extensions**: Add AI capabilities to existing VS Code extensions.

## Next steps

Choose the approach that best fits your extension's goals:

- For task automation via chat: Explore the [Language Model Tools API](/api/extension-guides/ai/tools)
- For offloading AI tasks to external services: Learn about [MCP tools](/api/extension-guides/ai/mcp)
- For specialized chat assistants: Read the [Chat API guide](/api/extension-guides/ai/chat)
- For custom AI features: Dive into the [Language Model API](/api/extension-guides/ai/language-model)

### Sample projects

- [**Chat sample**](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample): Extension with agent mode tool and chat participant
- [**MCP extension sample**](https://github.com/microsoft/vscode-extension-samples/blob/main/mcp-extension-sample): Extension that registers an MCP tool
- [**AI-powered code annotations tutorial**](/api/extension-guides/ai/language-model-tutorial): Step-by-step guide for using the Language Model API
- [**Code tutor chat participant tutorial**](/api/extension-guides/ai/chat-tutorial): Building a specialized chat assistant

[!TIP]
Looking for examples? Visit the [Marketplace](https://marketplace.visualstudio.com/search?term=tag%3Alanguage-model-tools&target=VSCode&category=All%20categories&sortBy=Relevance) or search for extensions with the `language-model-tools` or `chat-participant` tags in the Extensions view.
