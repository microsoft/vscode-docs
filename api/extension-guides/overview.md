---
Order: 1
Area: extension-guides
TOCTitle: Overview
PageTitle: Overview of Extension Guides
---

# Extension Guides

Once you have learned the basics of VS Code Extension API in the [Hello Code](/api/get-started/hello-code) sample, it's time to build some real-world extensions. While the [Extension Capabilities](/api/extension-capabilities/overview) section offers high-level overviews of what extension **can** do, this section contains a list of detailed code guides and samples that explains **how** to use a specific VS Code API.

In each guide-sample combo, you can expect to find:

- Thoroughly commented source code.
- A gif or image showing the usage of the sample extension.
- Instructions for running the sample extension.
- Listing of vscode API being used.
- Listing of Contribution Points being used.
- Real-world extensions resembling the sample.
- Explanation of API concepts.

## Guide & Sample Combo

All guides in this section and their accompanying sample code.

| Guide | Sample | API & Contribution Points |
| ------ | ----- | --- |
| [Webview Guide](https://vscode-ext-docs.azurewebsites.net/api/extension-guides/webview) | [Webview Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/webview-sample) | [window.createWebviewPanel](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#window.createWebviewPanel)<br>[window.registerWebviewPanelSerializer](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#window.registerWebviewPanelSerializer) |
| [Task Provider Guide](https://vscode-ext-docs.azurewebsites.net/api/extension-guides/task-provider) | [Task Provider Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/task-provider-sample) | [tasks.registerTaskProvider](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#tasks.registerTaskProvider)<br>[Task](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#Task)<br>[ShellExecution](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#ShellExecution)<br>[contributes.taskDefinitions](https://vscode-ext-docs.azurewebsites.net/api/references/contribution-points#contributes.taskDefinitions) |

## Other Samples

These samples illustrate one [vscode API](/api/references/vscode-api) usage or a [Contribution Point](/api/references/contribution-points).

These samples do not contain a guide. However, most of them have well-commented source code:

| Sample | API & Contribution |
| ------ | --- |
| [Multi Root Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/basic-multi-root-sample) | [workspace.getWorkspaceFolder](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#workspace.getWorkspaceFolder)<br>[workspace.onDidChangeWorkspaceFolders](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#workspace.onDidChangeWorkspaceFolders) |
| [Status Bar](https://github.com/Microsoft/vscode-extension-samples/tree/master/statusbar-sample) | [StatusBarItem](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#StatusBarItem) |
| [completions-sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/completions-sample) | [languages.registerCompletionItemProvider](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#languages.registerCompletionItemProvider)<br>[CompletionItem](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#CompletionItem)<br>[SnippetString](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#SnippetString) |
| [File System Provider Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/fsprovider-sample) | [workspace.registerFileSystemProvider](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#workspace.registerFileSystemProvider) |
| [decorator-sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/decorator-sample) | [TextEditor.setDecorations](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#TextEditor.setDecorations)<br>[DecorationOptions](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#DecorationOptions)<br>[DecorationInstanceRenderOptions](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#DecorationInstanceRenderOptions)<br>[ThemableDecorationInstanceRenderOptions](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#ThemableDecorationInstanceRenderOptions)<br>[window.createTextEditorDecorationType](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#window.createTextEditorDecorationType)<br>[TextEditorDecorationType](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#TextEditorDecorationType)<br>[contributes.colors](https://vscode-ext-docs.azurewebsites.net/api/references/contribution-points#contributes.colors) |
| [I18n Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/i18n-sample) | N/A |
| [terminal-sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/terminal-sample) | [window.createTerminal](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#window.createTerminal)<br>[window.onDidChangeActiveTerminal](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#window.onDidChangeActiveTerminal)<br>[window.onDidCloseTerminal](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#window.onDidCloseTerminal)<br>[window.onDidOpenTerminal](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#window.onDidOpenTerminal)<br>[window.Terminal](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#window.Terminal)<br>[window.terminals](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#window.terminals) |
| [tree-view-sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/tree-view-sample) | [window.createTreeView](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#window.createTreeView)<br>[window.registerTreeDataProvider](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#window.registerTreeDataProvider)<br>[TreeView](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#TreeView)<br>[TreeDataProvider](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#TreeDataProvider)<br>[contributes.views](https://vscode-ext-docs.azurewebsites.net/api/references/contribution-points#contributes.views)<br>[contributes.viewsContainers](https://vscode-ext-docs.azurewebsites.net/api/references/contribution-points#contributes.viewsContainers) |

## Language Extension Samples

These samples are [Language Extensions](/api/language-extensions/overview) samples.

You can read more about Language Extensions in [Language Extension Overview](/api/language-extensions/overview), [Static Language Features](/api/extension-capabilities/overview#Static-Language-Features) and [Dynamic Language Features](/api/extension-capabilities/overview#Dynamic-Language-Features).

| Sample | Guide on VS Code Website |
| ------ | ----- |
| [LSP Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/lsp-sample) | [/api/language-extensions/smart-editing-lsp-guide](https://vscode-ext-docs.azurewebsites.net/api/language-extensions/smart-editing-lsp-guide) |
| [LSP Log Streaming Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/lsp-log-streaming-sample) | N/A |
| [LSP Multi Root Server Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/lsp-multi-server-sample) | https://github.com/Microsoft/vscode/wiki/Extension-Authoring:-Adopting-Multi-Root-Workspace-APIs#language-client--language-server |