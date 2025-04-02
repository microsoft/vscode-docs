---
Order: 13
Area: copilot
TOCTitle: Copilot Extensibility
ContentId: e375ec2a-43d3-4670-96e5-fd25a6aed272
PageTitle: GitHub Copilot extensibility overview
DateApproved: 03/05/2025
MetaDescription: Overview of how to extend GitHub Copilot in your Visual Studio Code extension by using the Chat API or Language Model API.
MetaSocialImage: images/shared/github-copilot-social.png
---
# GitHub Copilot extensibility in VS Code

Use GitHub Copilot extensibility to expand the functionality of Copilot Chat in Visual Studio Code or add AI-powered features to your VS Code extension. To extend Copilot in VS Code, you build a VS Code extension and use the extension APIs to interact with GitHub Copilot.

Depending on your use case, you have the following options to use Copilot in your VS Code extension:

- **VS Code Chat extension**: use the Chat API to create a chat participant that gives users a natural-language interface and provides domain-specific help via the Chat view in VS Code. Optionally, you can use the Copilot Large Language Model (LLM) to interpret user prompts and generate responses.

- **Use Copilot's LLM**: use the Language Model API and the VS Code extension APIs to build AI-powered features into your extension and enhance editor-specific interactions.

Alternatively, you can also build a **Copilot Extension**, implemented as a GitHub App with additional capabilities. Copilot Extensions work across all supported IDEs and GitHub, but don't have access to functionalities specific to VS Code. Get more info about [Copilot Extensions](https://docs.github.com/en/copilot/building-copilot-extensions/about-building-copilot-extensions) in the GitHub documentation.

## Use cases

You can use Copilot's capabilities to enhance the development experience in VS Code by integrating AI-powered features into your extension. Here are some examples of how you can use Copilot in your VS Code extension:

- **Docs querying**: A chat participant could allow Copilot Chat to use Retrieval-Augmented Generation (RAG) to query a third-party documentation service and generate responses based on the retrieved information.

- **AI-assisted coding**: Use the Copilot LLM to provide editor annotations to provide coding suggestions.

- **AI-powered reviews**: Use the Copilot LLM to review your code for security vulnerabilities or performance improvements.

- **Data retrieval**: A chat participant could allow Copilot Chat to query a database or third-party data service to retrieve information about a specific topic.

- **Enterprise coding assistant**: a chat participant that is grounded in the data of your enterprise and that is aware of the specific coding guidelines your company follows.

- **Enhance extensions**: Use the Language Model API to add AI-powered features to your existing VS Code extensions.

These are some examples of extensions in the Visual Studio Marketplace that contribute a chat participant to the Chat view in VS Code.

<div class="marketplace-extensions-chat"></div>

Go to the [Marketplace](https://marketplace.visualstudio.com/search?term=tag%3Achat-participant&target=VSCode&category=All%20categories&sortBy=Relevance) or use the integrated [Extensions view](/docs/configure/extensions/extension-marketplace.md) and search for more extensions by using the `chat-participant` tag.

## Get started with Copilot extensibility in VS Code

To get started with extending Copilot in your VS Code extension, explore the following resources:

- [**Tutorial: AI-powered code annotations**](/api/extension-guides/language-model-tutorial.md): step-by-step guide to implement a VS Code extension that uses the Language Model API to generate code annotations in the editor to help improve your code.

- [**Tutorial: Code tutor chat participant**](/api/extension-guides/chat-tutorial.md): step-by-step guide to implement a code tutor chat participant that enables users to ask for explaining a technical topic by using natural language in the Chat view in VS Code.

- [**Chat participant sample**](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample): sample code for getting started with building a VS Code Chat extension that uses the Chat API and Language Model API.

- **Extension guides**: Learn how to use the [Chat API](/api/extension-guides/chat.md) and [Language Model API](/api/extension-guides/language-model.md) to extend Copilot in your VS Code extension.

## Related content

- [Get started with Copilot Extensions](https://github.com/features/copilot/extensions)
- [Enhancing VS Code extensions with GitHub Copilot](https://www.youtube.com/watch?v=YI7kjWzIiTM) Microsoft Build session
