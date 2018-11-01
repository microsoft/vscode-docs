---
PageTitle: Overview
---

# VS Code Extension API

VS Code is built with extensibility in mind. From the Workbench UI to the editing experience, almost every part of VS Code can be customized and enhanced through the Extension API. In fact, many core functionalties of VS Code are built as [extensions](https://github.com/Microsoft/vscode/tree/master/extensions), too.

This documentation has information for:

- How to build, run, debug, test and publish an extension
- How to take advantage of VS Code's rich Extension API
- Various guides and code samples that you can learn and adapt from

If you are looking for published extensions, head over to the [VS Code Marketplace](https://marketplace.visualstudio.com/).

## What Can Extensions Do?

VS Code is an Electron based app, so its UI is built using HTML, CSS and JavaScript using the usual browser DOM API. However, VS Code does not provide DOM access to extension authors in order to ensure its responsiveness and performance. Instead, an extensive Extension API is exposed in order to customize the editor. Here are some examples of what you can achieve using this API, each with link to a more detailed topic:

- A theme or icon theme that changes the look of VS Code — [Theming](/api/extension-capabilities/theming)
- Static Language Support such as syntax highlighting and snippets for a programming language — [Language Extensions Overview](/api/language-extensions/overview)
- Dynamic Language Support such as auto completion, linting errors and go to definitino for a programming language — [Dynamic Language Features](/api/language-extensions/dynamic-language-features)
- Customized components & views in the Workbench UI — [Extending Workbench](/api/extension-capabilities/extending-workbench)
- A Webview that displays custom webpage built with HTML/CSS/JS — [Webview Guide](/api/extension-guides/webview)
- Task Definition Provider for auto-detecing build tasks — [Task Provider Guide](/api/extension-guides/task-provider)
- A Debug Adapter to support debugging a specific runtime — [Debug Extension Guide](/api/extension-guides/debug-extension)

If you'd like to learn more about the Extension API, refer to the [Extension Capabilities / Overview](/api/extension-capabilities/overview) page.

## Resources

Here are some high-level descriptions for each section to help you quickly locate the information you need.

### Hello Code

The [Hello Code](/api/get-started/your-first-extension) tutorial explains important concepts for building VS Code Extensions. You will learn:

- Basic concepts such as Contribution Points and Activation Points
- How to write, run and debug a basic extension
- How to use the tools and resources such as [Yeoman Code Generator](https://github.com/Microsoft/vscode-generator-code), [vsce](https://github.com/Microsoft/vscode-vsce), [VS Code Extension Samples](https://github.com/Microsoft/vscode-extension-samples) and our [API Reference](/api/references/vscode-api)

### Advanced Topics

Through the [Hello Code](/api/get-started/your-first-extension) tutorial, you have gained enough knowledge for writing extensions. This section discusses more advanced topics for making high-quality extensions.

- Publishing / Distributing extensions
- Testing extensions / CI Integration
- Profiling Extensions
- Using Proposed API

### Extension Capabilities

Once you have become familiar with VS Code extension development through the [Hello Code](/api/get-started/your-first-extension) tutorial, the [Extension Capabilities](/api/extension-capabilities/overview) section helps you discover the possibilities that VS Code API offers. This section focuses on explaining high-level concepts and point you to more detailed resources and guides.

### Extension Guides

The [Extension Guides](/api/extension-guides/overview) section includes guides that illlustrate how to build various VS Code extensions. In each topic, you can find:

- Sample code from [VS Code Extension Sample](https://github.com/Microsoft/vscode-extension-samples)
- Listing of VS Code API usage
- Real-world Extensions following this model

Some samples in the [vscode-extension-samples](https://github.com/Microsoft/vscode-extension-samples) do not yet have accompanying guides, but the source code are mostly well-documented.

### References

Not sure what to include in the [Extension Manifest](/api/references/extension-manifest)? Confused by an unknown term? The References section includes an interactive [API reference](/api/references/vscode-api) for the `vscode` NPM module and exhaustive references on various topics such as [Contributiong Points](/api/references/contribution-points), [Theme Color](/api/references/theme-color) and [Document Selector](/api/references/document-selector).