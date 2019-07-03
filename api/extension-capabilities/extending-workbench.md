---
# DO NOT TOUCH — Managed by doc writer
ContentId: e0d5bd37-f020-4235-ad81-c977baaeb24f
DateApproved: 7/3/2019

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Explain how to extend Visual Studio Code's workbench area with custom UI components
---

# Extending Workbench

"Workbench" refers to the overall Visual Studio Code UI that encompasses the following UI components:

- Title Bar
- Activity Bar
- Side Bar
- Panel
- Editor Group
- Status Bar

VS Code provides various APIs that allow you to add your own components to the Workbench. For example, in the image below:

![workbench-contribution](images/extending-workbench/workbench-contribution.png)

- Activity Bar: The [Azure App Service extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) adds a [View Container](#view-container)
- Side Bar: The built-in [NPM extension](https://github.com/Microsoft/vscode/tree/master/extensions/npm) adds a [Tree View](#tree-view) to the Explorer View
- Editor Group: The built-in [Markdown extension](https://github.com/Microsoft/vscode/tree/master/extensions/markdown-language-features) adds a [Webview](#webview) next to other editors in the Editor Group
- Status Bar: The [VSCodeVim extension](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) adds a [Status Bar Item](#status-bar-item) in the Status Bar

## Views Container

With the [`contributes.viewsContainers`](/api/references/contribution-points#contributes.viewsContainers) Contribution Point, you can add new Views Containers that display next to the five built-in Views Containers. Learn more at the [Tree View](/api/extension-guides/tree-view) topic.

## Tree View

With the [`contributes.views`](/api/references/contribution-points#contributes.views) Contribution Point, you can add new Views that display in any of the View Containers. Learn more at the [Tree View](/api/extension-guides/tree-view) topic.

## Webview

Webviews are highly customizable views built with HTML/CSS/JavaScript. They display next to text editors in the Editor Group areas. Read more about Webview in the [Webview Guide](/api/extension-guides/webview).

## Status Bar Item

Extensions can create custom [`StatusBarItem`](/api/references/vscode-api#StatusBarItem) that display in the Status Bar. Status Bar Items can show text and icons and run commands on click events.

- Show text and icons
- Run a command on click

A Status Bar extension sample can be found [here](https://github.com/Microsoft/vscode-extension-samples/tree/master/statusbar-sample).
