---
Order:
Area: copilot
TOCTitle: Copilot Extensibility
ContentId: e375ec2a-43d3-4670-96e5-fd25a6aed272
PageTitle: GitHub Copilot extensibility overview
DateApproved: 10/03/2024
MetaDescription: Overview of how to extend GitHub Copilot in your Visual Studio Code extension by using the Chat API or Language Model API.
MetaSocialImage: images/shared/github-copilot-social.png
---
# GitHub Copilot extensibility in VS Code

GitHub Copilot is an AI coding assistant that helps you write code faster and with less effort. You can get code suggestions as you type in the editor, chat with Copilot to ask for help with your code, or get help with writing tests, fixing bugs, or refactoring code.

Visual Studio Code is built with extensibility in mind. Almost every part of VS Code can be customized and enhanced through the Extension API. You can extend GitHub Copilot in your own Visual Studio Code extensions to enhance the experience for your users by adding AI-powered features to your extension. For example, let users ask domain-specific questions to your extension by using natural language, or combine large language models with your own business logic to provide intelligent code editing features, and much more.

You have different options to extend GitHub Copilot in your VS Code extension:

- Use the [Chat API](/api/extension-guides/chat.md) to create a **chat participant** to give users a natural-language interface and provide domain-specific help via the Chat view in VS Code.

- Use the [**Language Model API**](/api/extension-guides/language-model.md) and the VS Code extension API to build AI-powered features into VS Code.

With GitHub Copilot, you can expand the capabilities of your extension by using the power of AI and give developers a richer and more productive experience.

## Get started

Get started with GitHub Copilot extensibility by taking the following tutorials:

- [Tutorial: Create a code tutor chat participant with the Chat API](/api/extension-guides/chat-tutorial.md)
- [Tutorial: Generate code annotations by using the Language Model API](/api/extension-guides/language-model-tutorial.md)

## Related content

- [VS Code Chat API reference](/api/extension-guides/chat.md)
- [VS Code Language Model API reference](/api/extension-guides/language-model.md)

- [Copilot Chat extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample)
- Make sure to watch our Build session about [Enhancing VS Code extensions with GitHub Copilot](https://www.youtube.com/watch?v=YI7kjWzIiTM) to learn all about these APIs.

- [GitHub Copilot extensions are all you need](https://code.visualstudio.com/blogs/2024/06/24/extensions-are-all-you-need) blog post

- Join the [Copilot Partner Program](https://github.com/features/preview/copilot-partner-program) to extend GitHub Copilot with a GitHub App
- Watch our [Build session](https://www.youtube.com/watch?v=RXaLlCeaBIA) about extending GitHub Copilot to see it in action.
