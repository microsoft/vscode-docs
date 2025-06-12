---
ContentId: e375ec2a-43d3-4670-96e5-fd25a6aed272
DateApproved: 06/12/2025
MetaDescription: Overview of how to extend the AI features in your Visual Studio Code extension by using the Chat API or Language Model API.
MetaSocialImage: images/shared/github-copilot-social.png
---
# AI extensibility in VS Code

Visual Studio Code has many AI features to improve your coding experience, such as code completions, or natural language chat. You can further extend the built-in capabilities, for example by contributing tools for [agent mode](/docs/copilot/chat/chat-agent-mode.md), or adding AI-powered features to your VS Code extension.

Depending on your use case, you have the following options for extending AI in your VS Code extension:

- **Agent mode tool**: use the [Language Model Tool API](/api/extension-guides/tools.md) to contribute a tool for [agent mode](/docs/copilot/chat/chat-agent-mode.md) that is invoked automatically based on the user's prompt. Integrate deeply in VS Code by using other extension APIs in your tool.

- **MCP tool**: automatically register external [MCP tools](/docs/copilot/chat/mcp-servers.md) that can then be used in [agent mode](/docs/copilot/chat/chat-agent-mode.md). As an extension developer, you can [register an MCP tool](/api/extension-guides/mcp.md) as part of your extension. MCP tools run outside of the VS Code extension host and don't have access to the VS Code extension APIs.

- **Chat participant**: use the [Chat](/api/extension-guides/chat.md) and [Language Model](/api/extension-guides/language-model.md) APIs to create a chat participant for [ask mode](/docs/copilot/chat/chat-ask-mode.md) that enables users to ask domain-specific questions by using natural language.

- **Use AI model**: use the [Language Model API](/api/extension-guides/language-model.md) and the [VS Code extension APIs](/api/extension-guides/overview.md) to build custom AI-powered features into your extension and enhance editor-specific interactions.

Alternatively, you can also build a GitHub Copilot Extension, implemented as a GitHub App with additional capabilities. Copilot Extensions work across all supported IDEs and GitHub, but don't have access to functionalities specific to VS Code. Get more info about [Copilot Extensions](https://docs.github.com/en/copilot/building-copilot-extensions/about-building-copilot-extensions) in the GitHub documentation.

## Use cases

Here are some examples of how you can use AI in your VS Code extension:

- **Docs querying**: use Retrieval-Augmented Generation (RAG) to query a third-party documentation service and generate responses based on the retrieved information.

- **AI-assisted coding**: use the AI model to provide editor annotations to provide coding suggestions.

- **AI-powered reviews**: use the AI model to review your code for security vulnerabilities or performance improvements.

- **Data retrieval**: query a database or third-party data service to retrieve information about a specific topic.

- **Enterprise coding assistant**: get chat responses that are grounded in the data of your enterprise and are aware of the specific coding guidelines your company follows.

- **Enhance extensions**: use the Language Model API to add AI-powered features to your existing VS Code extensions.

There are several examples already available in the Visual Studio Marketplace that extend AI in VS Code:

- Agent mode tools: Go to the [Marketplace](https://marketplace.visualstudio.com/search?term=tag%3Alanguage-model-tools&target=VSCode&category=All%20categories&sortBy=Relevance) or search for the `language-model-tools` tag in the [Extensions view](/docs/getstarted/extensions.md).

- Chat participants: Go to the [Marketplace](https://marketplace.visualstudio.com/search?term=tag%3Achat-participant&target=VSCode&category=All%20categories&sortBy=Relevance) or search for the `chat-participant` tag in the [Extensions view](/docs/getstarted/extensions.md).

## Get started with AI extensibility in VS Code

To get started with extending AI in your VS Code extension, explore the following resources:

- [**Chat sample**](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample): sample code for building a VS Code extension that contributes an agent mode tool and chat participant.

- [**MCP extension sample**](https://github.com/microsoft/vscode-extension-samples/blob/main/mcp-extension-sample): sample code for building a VS Code extension that registers an MCP tool.

- [**Tutorial: AI-powered code annotations**](/api/extension-guides/language-model-tutorial.md): step-by-step guide to implement a VS Code extension that uses the Language Model API to generate code annotations in the editor to help improve your code.

- [**Tutorial: Code tutor chat participant**](/api/extension-guides/chat-tutorial.md): step-by-step guide to implement a code tutor chat participant that enables users to ask for explaining a technical topic by using natural language in the Chat view in VS Code.

- **Extension guides**: Learn how to use the [Tools API](/api/extension-guides/tools.md) [Chat API](/api/extension-guides/chat.md) and [Language Model API](/api/extension-guides/language-model.md).
