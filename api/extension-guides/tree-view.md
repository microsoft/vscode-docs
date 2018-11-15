---
Order: 4
Area: extension-guides
TOCTitle: Tree View
PageTitle: Tree View
---

# Tree View Guide

This guide teaches you how to write an extension that contribute tree views to Visual Studio Code. You can find a sample extension with source code at: https://github.com/Microsoft/vscode-extension-samples/tree/master/tree-view-sample.

## Contribution Point: contributes.views

To contribute a view, you should first register it using [`contributes.views`](/api/references/vscode-api) Contribution Point in `package.json`. You must specify an identifier and name for the view, and you can contribute to following locations

- `explorer`: Explorer view in the Side Bar
- `debug`: Debug view in the Side Bar
- `scm`: Source Control view in the Side Bar

Example:

```json
"contributes": {
    "views": {
        "tree-view": [
            {
                "id": "nodeDependencies",
                "name": "Node Dependencies",
                "when": "explorer"
            }
        ]
    }
}
```

When the user opens the view, VS Code will then emit an activationEvent [`onView:${viewId}`](/api/references/activation-events#activationEvents.onView) (e.g. `onView:nodeDependencies` for the example above). You can also control the visibility of the view by providing the `when` context value.

## Contributino Point: contributes.viewsContainers

You can contribute your views to your own view container which will show up in the activity bar.

To do such, extension writers can add a [`contributes.viewContainers`](/api/references/contribution-points#contributes.viewsContainers) object in the Extension Manifest. Each object has three required fields:

- `id`: The name of the new view container you're creating
- `title`: The name which will show up at the top of the view container
- `icon`: an image which will be displayed for the view container in the activity bar

```json
"contributes": {
    "viewContainers": {
        "activitybar": [
            {
                "id": "package-explorer",
				"title": "Package Explorer",
				"icon": "media/dep.svg"
            }
        ]
    },
    "views": {
        "tree-view": [
            {
                "id": "nodeDependencies",
                "name": "Node Dependencies",
                "when": "workspaceHasPackageJSON"
            }
        ]
    }
}
```

## View Actions

You can contribute actions at the following locations in the view

- `view/title`: Location to show actions in the view title. Primary or inline actions use `"group": "navigation"` and rest are secondary actions which are in `...` menu.
- `view/item/context`: Location to show actions for the tree item. Inline actions use `"group": "inline"` and rest are secondary actions which are in `...` menu.

You can control the visibility of these actions using the `when` property.

Examples:

```json
"contributes": {
    "commands": [
        {
            "command": "nodeDependencies.refreshEntry",
            "title": "Refresh",
            "icon": {
                "light": "resources/light/refresh.svg",
                "dark": "resources/dark/refresh.svg"
            }
        }
    ],
    "menus": {
        "view/title": [
            {
                "command": "nodeDependencies.refreshEntry",
                "when": "view == nodeDependencies",
                "group": "navigation"
            }
        ]
    }
}
```

**Note:** If you want to show an action for specific items, you can do it by defining context of a tree item using `TreeItem.contextValue` and you can specify the context value for key `viewItem` in `when` expression.

Examples:

```json
"contributes": {
  "menus": {
    "view/item/context": [
      {
        "command": "nodeDependencies.deleteEntry",
        "when": "view == nodeDependencies && viewItem == dependency"
      }
    ]
  }
}
```

## TreeDataProvider

Extension writers should register a [`TreeDataProvider`](/api/references/vscode-api#TreeDataProvider) programmatically to populate data in the view.

```typescript
vscode.window.registerTreeDataProvider('nodeDependencies', new DepNodeProvider());
```

See [nodeDependencies.ts](https://github.com/Microsoft/vscode-extension-samples/tree/master/tree-view-sample/src/nodeDependencies.ts) for the implementation.


## TreeView

If you would like to perform some UI operations on the view programatically, you can use `window.createTreeView` instead of `window.registerTreeDataProvider`. This will give access to the view which you can use for performing view operations.

```typescript
vscode.window.createTreeView('ftpExplorer', { treeDataProvider: new FtpTreeDataProvider() });
```

See [ftpExplorer.ts](https://github.com/Microsoft/vscode-extension-samples/tree/master/tree-view-sample/src/ftpExplorer.ts) for the implementation.