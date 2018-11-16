---
---

# Extending Workbench

"Workbench" refers to the overall VS Code UI that encompasses the following UI components:

- Title Bar
- Activity Bar
- Side Bar
- Panel
- Editor Group
- Status Bar

As mentioned in [Principles and Patterns](../references/principle-and-patterns), VS Code does not provide access to the underlying DOM. Instead, various API points allow you to add your own components to the VS Code Workbench:

![workbench-contribution](./images/extending-workbench/workbench-contribution.png)

- Activity Bar: The [Azure App Service extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) adds a [View Container](#view-container)
- Side Bar: The built-in [NPM extension](https://github.com/Microsoft/vscode/tree/master/extensions/npm) adds a [Tree View](#tree-view) to the Explorer View
- Editor Group: The built-in [Markdown extension](https://github.com/Microsoft/vscode/tree/master/extensions/markdown-language-features) adds a [Webview](#webview) next to other editors in the Editor Group
- Status Bar: The [VSCodeVim extension](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) adds a [Status Bar Item](#status-bar-item) in the Status Bar

## View Container

With the [`contributes.viewContainers`](/api/references/contribution-points#contributes.viewsContainers) Contribution Point, you can add new View Containers that display next to the five built-in View Containers. Learn more at the [Tree View](/api/extension-guides/tree-view) topic.

## Tree View

With the [`contributes.views`](/api/references/contribution-points#contributes.views) Contribution Point, you can add new Views that display in any of the View Containers. Learn more at the [Tree View](/api/extension-guides/tree-view) topic.

## Webview

Webviews are highly customizable views built with HTML/CSS/JavaScript. They display next to text editors in the Editor Group areas. Read more about Webview in the [Webview Guide](/api/extension-guides/webview).

## Status Bar Item

Extensions can create custom [`StatusBarItem`](/api/references/vscode-api#StatusBarItem) that display in the Status Bar. Status Bar Items can show text and icons and run commmands on click events.

- Show text and icons
- Run a command on click

A Status Bar extension sample can be found [here](https://github.com/Microsoft/vscode-extension-samples/tree/master/statusbar-sample).
