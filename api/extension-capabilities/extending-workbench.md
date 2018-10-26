---
Order: 5
Area: extension-capabilities
TOCTitle: Extending Workbench
PageTitle: Extending Workbench
---

# Extending Workbench

As described in the [principles and patterns section](../references/principle-and-patterns.md) we do not provide direct access to the underlying UI DOM to extension writers and VS Code includes a built-in set of UI components for common scenarios. In this section we will describe the workbench specific UI components that are extensible.

VS Code Workbench consits of different areas as shown in the picture:

![workbench](./images/extending-workbench/hero.png)


If you would like to have a more customizable UX component in VS Code you should use Webviews. More about Webviews can be found [here](../extension-guides/webview.md).


## Status Bar

The status bar can be extended by custom [StatusBarItem](../references/vscode-api#StatusBarItem) that can show text and icons and run a command on click.

An example status bar extension can be found [here](https://github.com/Microsoft/vscode-extension-samples/tree/master/statusbar-sample).

## Activity Bar

The Activity Bar on the left can be extended by custom views which can be contributed to an existing view container or to a brand new container. More about tree views can be found [here](../extension-guides/tree-view.md).

## Progress

`Progress` is a used for reporting progress updates to the user.
Progress can be shown in different locations using the `ProgressLocation` option:
* in the notifications area
* in the source control view
* general progress in the VS Code window


An example progress extension can be found [here](https://github.com/Microsoft/vscode-extension-samples/tree/master/progress-sample).
