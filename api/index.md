---
---

# Visual Studio Code Extension API

Visual Studio Code is built with extensibility in mind. From the UI to the editing experience, almost every part of VS Code can be customized and enhanced through the Extension API. In fact, many core features of VS Code are built as [extensions](https://github.com/Microsoft/vscode/tree/master/extensions) and use the same Extension API.

This documentation describes:

- How to build, run, debug, test and publish an extension
- How to take advantage of VS Code's rich Extension API
- Where to find guides and code samples to help get you started

If you are looking for published extensions, head to the [VS Code Marketplace](https://marketplace.visualstudio.com/).

## What can extensions do?

Here are some examples of what you can achieve with extensions:

- Change the look of VS Code with a theme— [Theming](/api/extension-capabilities/theming)
- Support a new programming language — [Language Extensions Overview](/api/language-extensions/overview)
- Add custom components & views in the UI — [Extending the Workbench](/api/extension-capabilities/extending-workbench)
- Define a Webview to display a custom webpage built with HTML/CSS/JS — [Webview Guide](/api/extension-guides/webview)
- Task Definition Provider for auto-detecting build tasks — [Task Provider Guide](/api/extension-guides/task-provider)
- Support debugging a specific runtime — [Debug Extension Guide](/api/extension-capabilities/debugger)

If you'd like to learn more about the Extension API, refer to the [Extension Capabilities / Overview](/api/extension-capabilities/overview) page.

We also have a list of guides / samples that you can play with and use as a starting point for your own extensions at: [Extension Guides / Overview](/api/extension-guides/overview).

## How to build extensions?

Now that you have seen some of the cool things you can do using VS Code API, it's time to build an extension! Building a good extension, however, could take a lot of effort. Here is how each section could help you with writing extension:

- `Get Started`: teaches fundamental concepts for building VS Code extensions with the [Hello Code](https://github.com/Microsoft/vscode-extension-samples/tree/master/hellocode-sample) sample.
- `Advanced Topics`: includes in-depth guides for specific areas of VS Code extension development, such as [publishing](/api/advanced-topics/publishing-extension), [testing](/api/advanced-topics/testing-extension) and [profiling](/api/advanced-topics/profiling-extension) extensions.
- `Extension Capabilities`: dissects VS Code's vast API into smaller categories and points you to more detailed guides.
- `Extension Guides`: contains guides and code samples that illustrate a specific part of VS Code API.
- `Language Extensions`: contains guides and code samples that illustrate how to add support for a programming language using VS Code API.
- `References`: contains exhaustive references for [VS Code API](/api/references/vscode-api), [Contribution Points](/api/references/contribution-points) and many other topics.

## Looking for help

If you have questions for extension development, try asking on:

- [Stack Overflow](https://stackoverflow.com/questions/tagged/visual-studio-code): There are 11k questions tagged `visual-studio-code`, and over half of them already have answers. Search for your issue, ask questions or help your fellow developers by answering VS Code extension development questions!
- [Gitter Channel](https://gitter.im/Microsoft/vscode) and [VS Code Dev Slack](https://join.slack.com/t/vscode-dev-community/shared_invite/enQtMjIxOTgxNDE3NzM0LWU5M2ZiZDU1YjBlMzdlZjA2YjBjYzRhYTM5NTgzMTAxMjdiNWU0ZmQzYWI3MWU5N2Q1YjBiYmQ4MzY0NDE1MzY): Public chatroom for extension developers. Some VS Code team members chime in conversations.

For feedback on documentation, create new issues at https://github.com/Microsoft/vscode-docs/issues. If you have questions that you cannot find answer for, or issues with VS Code's Extension API, please open new issues at https://github.com/Microsoft/vscode/issues.