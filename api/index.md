---
PageTitle: Overview
---

# Visual Studio Code Extension API

Visual Studio Code is built with extensibility in mind. From the Workbench UI to the editing experience, almost every part of VS Code can be customized and enhanced through the Extension API. In fact, many core features of VS Code are built as [extensions](https://github.com/Microsoft/vscode/tree/master/extensions) and use the same Extension APIs.

This documentation describes:

- How to build, run, debug, test and publish an extension
- How to take advantage of VS Code's rich Extension API
- Where to find guides and code samples to help get you started

If you are looking for published extensions, see the [VS Code Marketplace](https://marketplace.visualstudio.com/).

## What can extensions do?

VS Code is an Electron based application and its UI is built using HTML, CSS and JavaScript using the usual browser DOM API. However, VS Code does not provide DOM access to extension authors in order to ensure its responsiveness and performance. Instead, an extensive Extension API is exposed in order to customize the editor.

Here are some examples of what you can achieve with extensions:

- A theme or icon theme that changes the look of VS Code — [Theming](/api/extension-capabilities/theming)
- Basic programming language support such as syntax highlighting and snippets — [Language Extensions Overview](/api/language-extensions/overview)
- Advanced language features such as auto completion, linting errors, and Go to Definition — [Dynamic Language Features](/api/language-extensions/dynamic-language-features)
- Customized components & views in the Workbench UI — [Extending the Workbench](/api/extension-capabilities/extending-workbench)
- Webview to display a custom webpage built with HTML/CSS/JS — [Webview Guide](/api/extension-guides/webview)
- Task Definition Provider for auto-detecting build tasks — [Task Provider Guide](/api/extension-guides/task-provider)
- Debug Adapter to support debugging a specific runtime — [Debug Extension Guide](/api/extension-guides/debug-extension)

If you'd like to learn more about the Extension API, refer to the [Extension Capabilities / Overview](/api/extension-capabilities/overview) page.

## Resources

Here are high-level descriptions for each section to help you quickly locate the information you need.

### Hello Code

The [Hello Code](/api/get-started/your-first-extension) tutorial explains important concepts for building VS Code extensions. You will learn:

- Basic concepts such as Contribution Points and Activation Events
- How to write, run and debug a basic extension
- How to use the tools and resources such as:
  - [Yeoman code generator](https://github.com/Microsoft/vscode-generator-code)
  - [vsce](https://github.com/Microsoft/vscode-vsce) publishing tool
  - [VS Code extension samples](https://github.com/Microsoft/vscode-extension-samples)
  - [API Reference](/api/references/vscode-api)

### Advanced Topics

After working through the [Hello Code](/api/get-started/your-first-extension) tutorial, you will have gained enough knowledge to start writing extensions. The [Advanced Topics](/api/advanced-topics/publishing-extensions) section discusses more details for making high-quality extensions.

- Publishing / distributing extensions
- Testing extensions / CI build integration
- Profiling extensions
- Using Proposed APIs

### Extension Capabilities

The [Extension Capabilities](/api/extension-capabilities/overview) section helps you learn how to extend specific parts of VS Code through the Extension API. This section focuses on explaining high-level concepts and points you to more detailed resources and guides.

### Extension Guides

The [Extension Guides](/api/extension-guides/overview) section describes in detail how to build various VS Code extensions. In each topic, you can find:

- Sample code from [VS Code Extension Sample](https://github.com/Microsoft/vscode-extension-samples) repository
- A listing of the VS Code APIs used
- Real-world extensions using the APIs

Some samples in [vscode-extension-samples](https://github.com/Microsoft/vscode-extension-samples) do not yet have accompanying guides, but the source code is well-documented.

### References

Not sure what to include in the [Extension Manifest](/api/references/extension-manifest)? Confused by an unknown term? The [References](/api/references/vscode-api) section includes an interactive [API reference](/api/references/vscode-api) for the `vscode` npm module and exhaustive references on various topics such as [Contribution Points](/api/references/contribution-points), [Theme Color](/api/references/theme-color), and [Document Selector](/api/references/document-selector).