---
# DO NOT TOUCH — Managed by doc writer
ContentId: B32601A8-27ED-4D97-BA83-F1C8C945C635
DateApproved: 12/6/2018

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn from Visual Studio Code extension guides and code samples
---

# Extension Guides

Once you have learned the basics of Visual Studio Code Extension API in the [Hello World](/api/get-started/your-first-extension) sample, it's time to build some real-world extensions. While the [Extension Capabilities](/api/extension-capabilities/overview) section offers high-level overviews of what extension **can** do, this section contains a list of detailed code guides and samples that explains **how** to use a specific VS Code API.

In each guide-sample combo, you can expect to find:

- Thoroughly commented source code.
- A gif or image showing the usage of the sample extension.
- Instructions for running the sample extension.
- Listing of VS Code API being used.
- Listing of Contribution Points being used.
- Real-world extensions resembling the sample.
- Explanation of API concepts.

## Guides & Samples

Here is a list of guides and samples. While each guide comes with sample code, some samples do not have a matching guide yet.

Each sample illustrates one [VS Code API](/api/references/vscode-api) usage or a [Contribution Point](/api/references/contribution-points).

| Sample | Guide on VS Code Website | API & Contribution |
| ------ | ----- | --- |
| [Webview Sample](webview-sample) | [/api/extension-guides/webview](/api/extension-guides/webview) | [window.createWebviewPanel](/api/references/vscode-api#window.createWebviewPanel)<br>[window.registerWebviewPanelSerializer](/api/references/vscode-api#window.registerWebviewPanelSerializer) |
| [Status Bar Sample](statusbar-sample) | [/api/extension-guides/status-bar](/api/extension-guides/status-bar) | [window.createStatusBarItem](/api/references/vscode-api#window.createStatusBarItem)<br>[StatusBarItem](/api/references/vscode-api#StatusBarItem) |
| [Tree View Sample](tree-view-sample) | [/api/extension-guides/tree-view](/api/extension-guides/tree-view) | [window.createTreeView](/api/references/vscode-api#window.createTreeView)<br>[window.registerTreeDataProvider](/api/references/vscode-api#window.registerTreeDataProvider)<br>[TreeView](/api/references/vscode-api#TreeView)<br>[TreeDataProvider](/api/references/vscode-api#TreeDataProvider)<br>[contributes.views](/api/references/contribution-points#contributes.views)<br>[contributes.viewsContainers](/api/references/contribution-points#contributes.viewsContainers) |
| [Task Provider Sample](task-provider-sample) | [/api/extension-guides/task-provider](/api/extension-guides/task-provider) | [tasks.registerTaskProvider](/api/references/vscode-api#tasks.registerTaskProvider)<br>[Task](/api/references/vscode-api#Task)<br>[ShellExecution](/api/references/vscode-api#ShellExecution)<br>[contributes.taskDefinitions](/api/references/contribution-points#contributes.taskDefinitions) |
| [Multi Root Sample](basic-multi-root-sample) | N/A | [workspace.getWorkspaceFolder](/api/references/vscode-api#workspace.getWorkspaceFolder)<br>[workspace.onDidChangeWorkspaceFolders](/api/references/vscode-api#workspace.onDidChangeWorkspaceFolders) |
| [Completion Provider Sample](completions-sample) | N/A | [languages.registerCompletionItemProvider](/api/references/vscode-api#languages.registerCompletionItemProvider)<br>[CompletionItem](/api/references/vscode-api#CompletionItem)<br>[SnippetString](/api/references/vscode-api#SnippetString) |
| [File System Provider Sample](fsprovider-sample) | N/A | [workspace.registerFileSystemProvider](/api/references/vscode-api#workspace.registerFileSystemProvider) |
| [Editor Decorator Sample](decorator-sample) | N/A | [TextEditor.setDecorations](/api/references/vscode-api#TextEditor.setDecorations)<br>[DecorationOptions](/api/references/vscode-api#DecorationOptions)<br>[DecorationInstanceRenderOptions](/api/references/vscode-api#DecorationInstanceRenderOptions)<br>[ThemableDecorationInstanceRenderOptions](/api/references/vscode-api#ThemableDecorationInstanceRenderOptions)<br>[window.createTextEditorDecorationType](/api/references/vscode-api#window.createTextEditorDecorationType)<br>[TextEditorDecorationType](/api/references/vscode-api#TextEditorDecorationType)<br>[contributes.colors](/api/references/contribution-points#contributes.colors) |
| [I18n Sample](i18n-sample) | N/A |  |
| [Terminal Sample](terminal-sample) | N/A | [window.createTerminal](/api/references/vscode-api#window.createTerminal)<br>[window.onDidChangeActiveTerminal](/api/references/vscode-api#window.onDidChangeActiveTerminal)<br>[window.onDidCloseTerminal](/api/references/vscode-api#window.onDidCloseTerminal)<br>[window.onDidOpenTerminal](/api/references/vscode-api#window.onDidOpenTerminal)<br>[window.Terminal](/api/references/vscode-api#window.Terminal)<br>[window.terminals](/api/references/vscode-api#window.terminals) |
| [Vim Sample](vim-sample) | N/A | [commands](/api/references/vscode-api#commands)<br>[StatusBarItem](/api/references/vscode-api#StatusBarItem)<br>[window.createStatusBarItem](/api/references/vscode-api#window.createStatusBarItem)<br>[TextEditorCursorStyle](/api/references/vscode-api#TextEditorCursorStyle)<br>[window.activeTextEditor](/api/references/vscode-api#window.activeTextEditor)<br>[Position](/api/references/vscode-api#Position)<br>[Range](/api/references/vscode-api#Range)<br>[Selection](/api/references/vscode-api#Selection)<br>[TextEditor](/api/references/vscode-api#TextEditor)<br>[TextEditorRevealType](/api/references/vscode-api#TextEditorRevealType)<br>[TextDocument](/api/references/vscode-api#TextDocument) |

## Language Extension Samples

These samples are [Language Extensions](/api/language-extensions/overview) samples:

| Sample | Guide on VS Code Website |
| ------ | ----- |
| [LSP Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/lsp-sample) | [/api/language-extensions/language-server-extension-guide](/api/language-extensions/language-server-extension-guide) |
| [LSP Log Streaming Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/lsp-log-streaming-sample) | N/A |
| [LSP Multi Root Server Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/lsp-multi-server-sample) | https://github.com/Microsoft/vscode/wiki/Extension-Authoring:-Adopting-Multi-Root-Workspace-APIs#language-client--language-server |