---
Order: 5
Area: extension-capabilities
TOCTitle: Extending Workbench
PageTitle: Extending Workbench
---

# Extending Workbench

As described in the [Principles and Patterns](../references/principle-and-patterns.md) topic, we do not provide access to the underlying DOM to extension writers. In this section, we will describe the workbench UI components that are extensible.

VS Code Workbench consists of different areas as shown in the picture:

![workbench](./images/extending-workbench/hero.png)

If you would like to have a more customizable UI component with custom HTML/CSS/JavaScript in VS Code, you should use [Webviews](/api/extension-guides/webview). Webviews are fully customizable iframes that exist in the Editor Group area.

## Status Bar

The Status Bar can be extended by custom [`StatusBarItem`](/api/references/vscode-api#StatusBarItem)s that can

- Show text and icons
- Run a command on click.

An example status bar extension can be found [here](https://github.com/Microsoft/vscode-extension-samples/tree/master/statusbar-sample).

## Activity Bar

The Activity Bar on the left can be extended by custom views which can be contributed to an existing view container or to a brand new container. More about tree views can be found [here](https://github.com/Microsoft/vscode-extension-samples/blob/ext-docs/tree-view-sample/USAGE.md).

## Progress API

[`Progress`](/api/references/vscode-api#Progress) is used for reporting progress updates to the user.

Progress can be shown in different locations using the [`ProgressLocation`](/api/references/vscode-api#ProgressLocation) option:

- In the notifications area
- In the source control view
- General progress in the VS Code window

A sample extension that uses the Progress API can be found [here](https://github.com/Microsoft/vscode-extension-samples/tree/master/progress-sample).
