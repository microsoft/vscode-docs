---
Order: 1
Area: extension-guides
TOCTitle: Overview
PageTitle: Overview of Extension Guides
---

# Extension Guides

Once you have learned the basics of VS Code Extension API in the [Hello Code](/api/get-started/hello-code) sample, it's time to build some real-world extensions. While the [Extension Capabilities](/api/extension-capabilities/overview) section offers high-level overviews of what extension **can** do, this section contains a list of detailed code guides and samples that explains **how** to use VS Code API.

In each guide-sample combo, you can expect to find:

- Thoroughly commented source code.
- A gif or image showing the usage of the sample extension.
- Instructions for running the sample extension.
- Listing of vscode API being used.
- Listing of Contribution Points being used.
- Real-world extensions resembling the sample.
- Explanation of API concepts.

## Guide/Sample Listing

| Sample | Guide on VS Code Website | API & Contribution |
| ------ | ----- | --- |
| [Virtual Documents](/contentprovider-sample/README.md) | [/api/extension-guides/virtual-documents](https://vscode-ext-docs.azurewebsites.net/api/extension-guides/virtual-documents) | [`TextDocumentContentProvider`](https://code.visualstudio.com/docs/extensionAPI/vscode-api#TextDocumentContentProvider)|
| [Editor Decoration](/decorator-sample/README.md) | [/api/extension-guides/editor-decoration](https://vscode-ext-docs.azurewebsites.net/api/extension-guides/editor-decoration) | [`window.createTextEditorDecorationType`](https://code.visualstudio.com/docs/extensionAPI/vscode-api#window.createTextEditorDecorationType) |
| [Status Bar](/statusbar-sample/README.md) | [/api/extension-guides/status-bar](https://vscode-ext-docs.azurewebsites.net/api/extension-guides/status-bar) | [`StatusBarItem`](https://code.visualstudio.com/docs/extensionAPI/vscode-api#StatusBarItem) |
| [Color Theme](/theme-sample/README.md) | [/api/extension-guides/color-theme](https://vscode-ext-docs.azurewebsites.net/api/extension-guides/color-theme) | [`contributes.themes`](https://code.visualstudio.com/docs/extensionAPI/extension-points#_contributesthemes) |
| [File System Provider](/fsprovider-sample/README.md) | N/A | [`vscode.workspace.registerFileSystemProvider`](https://code.visualstudio.com/docs/extensionAPI/vscode-api#workspace.registerFileSystemProvider) |