---
# DO NOT TOUCH — Managed by doc writer
ContentId: AD26EFB1-FFC6-4284-BAB8-F3BCB8294728
DateApproved: 08/01/2024

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Visual Studio Code has a rich extension API. Learn how to create your own extensions for VS Code.
---

# Extension API

Visual Studio Code is built with extensibility in mind. From the UI to the editing experience, almost every part of VS Code can be customized and enhanced through the Extension API. In fact, many core features of VS Code are built as [extensions](https://github.com/microsoft/vscode/tree/main/extensions) and use the same Extension API.

This documentation describes:

* How to build, run, debug, test, and publish an extension
* How to take advantage of VS Code's rich Extension API
* Where to find [guides](https://code.visualstudio.com/api/extension-guides/overview) and [code samples](https://github.com/microsoft/vscode-extension-samples) to help get you started
* Following our [UX guidelines](/api/ux-guidelines/overview) for best practices

Code samples are available at [Microsoft/vscode-extension-samples](https://github.com/microsoft/vscode-extension-samples).

If you are looking for published extensions, head to the [VS Code Extension Marketplace](https://marketplace.visualstudio.com/vscode).

## What can extensions do?

Here are some examples of what you can achieve with the Extension API:

* Change the look of VS Code with a color or file icon theme - [Theming](/api/extension-capabilities/theming)
* Add custom components & views in the UI - [Extending the Workbench](/api/extension-capabilities/extending-workbench)
* Create a Webview to display a custom webpage built with HTML/CSS/JS - [Webview Guide](/api/extension-guides/webview)
* Support a new programming language - [Language Extensions Overview](/api/language-extensions/overview)
* Support debugging a specific runtime - [Debugger Extension Guide](/api/extension-guides/debugger-extension)

If you'd like to have a more comprehensive overview of the Extension API, refer to the [Extension Capabilities Overview](/api/extension-capabilities/overview) page. [Extension Guides Overview](/api/extension-guides/overview) also includes a list of code samples and guides that illustrate various Extension API usage.

## How to build extensions?

Building a good extension can take a lot of time and effort. Here is what each section of the API docs can help you with:

* **Get Started** teaches fundamental concepts for building extensions with the [Hello World](https://github.com/microsoft/vscode-extension-samples/tree/main/helloworld-sample) sample.
* **Extension Capabilities** dissects VS Code's vast API into smaller categories and points you to more detailed topics.
* **Extension Guides** includes guides and code samples that explain specific usages of VS Code Extension API.
* **UX Guidelines** showcases best practices for providing a great user experience in an extension.
* **Language Extensions** illustrates how to add support for a programming language with guides and code samples.
* **Testing and Publishing** includes in-depth guides on various extension development topics, such as [testing](/api/working-with-extensions/testing-extension) and [publishing](/api/working-with-extensions/publishing-extension) extensions.
* **Advanced Topics** explains advanced concepts such as [Extension Host](/api/advanced-topics/extension-host), [Supporting Remote Development and GitHub Codespaces](/api/advanced-topics/remote-extensions), and [Proposed API](/api/advanced-topics/using-proposed-api).
* **References** contains exhaustive references for the [VS Code API](/api/references/vscode-api), [Contribution Points](/api/references/contribution-points), and many other topics.

## What's new?

VS Code updates on a monthly cadence, and that applies to the Extension API as well. New features and APIs become available every month to increase the power and scope of VS Code extensions.

To stay current with the Extension API, you can review the monthly release notes, which have dedicated sections covering:

* [Extension authoring](https://code.visualstudio.com/updates#_extension-authoring) - Learn what new extension APIs are available in the latest release.
* [Proposed extension APIs](https://code.visualstudio.com/updates#_proposed-extension-apis) - Review and give feedback on upcoming proposed APIs.

## Looking for help

If you have questions for extension development, try asking on:

* [VS Code Discussions](https://github.com/microsoft/vscode-discussions): GitHub community to discuss VS Code's extension platform, ask questions, help other members of the community, and get answers.
* [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode-extensions): There are [thousands of questions](https://stackoverflow.com/questions/tagged/vscode-extensions) tagged `vscode-extensions`, and over half of them already have answers. Search for your issue, ask questions, or help your fellow developers by answering VS Code extension development questions!
* [VS Code Dev Slack](https://vscode-dev-community.slack.com): Public chatroom for extension developers. VS Code team members often join in the conversations.

To provide feedback on the documentation, create new issues at [Microsoft/vscode-docs](https://github.com/microsoft/vscode-docs/issues).
If you have extension questions that you cannot find an answer for, or issues with the VS Code Extension API, please open new issues at [Microsoft/vscode](https://github.com/microsoft/vscode/issues).
