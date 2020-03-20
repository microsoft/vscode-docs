---
# DO NOT TOUCH — Managed by doc writer
ContentId: 9b10cda2-4eb0-4989-8f82-23a46b96c1bb
DateApproved: 3/9/2020

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to using Tree View in Visual Studio Code extension (plug-in).
---

# Tree View API

The treeview API allows extensions to contribute views within Visual Studio Code. For example, the built-in References Search View extension show reference search results as a separate view. This guide teaches you how to write an extension that contributes tree views and view containers to Visual Studio Code.

## Links

- [Treeview Samples](https://github.com/Microsoft/vscode-extension-samples/tree/master/tree-view-sample/README.md)
- [Built-in Views](/docs/getstarted/userinterface#views)

## Tree View API Basics

To explain the treeview api, we are going to build a sample extension called **Node Dependencies**. This extension will use a treeview to display all node dependencies in the current folder.

First you have to say VS Code that you are contributing a view using the [`contributes.views`](/api/references/vscode-api) Contribution Point in `package.json`. Following snippet contributes `nodeDependencies` view at the `explorer` location.

```json
"contributes": {
  "views": {
    "explorer": [
      {
        "id": "nodeDependencies",
        "name": "Node Dependencies",
      }
    ]
  }
}
```

You must specify an identifier and name for the view, and you can contribute to following locations:

- `explorer`: Explorer view in the Side Bar
- `debug`: Run and Debug view in the Side Bar
- `scm`: Source Control view in the Side Bar
- `test`: Test explorer view in the Side Bar
- [Custom View Containers](#view-Container)


### Tree Data Provider

Second step is to provide data to the view you registered so that VS Code can display the data in the view. To do so, you should first implement the [`TreeDataProvider`](/api/references/vscode-api#TreeDataProvider) that provides node dependencies data.

There are two necessary methods in this API which you should be aware of and implement.

- `getChildren(element?: T): ProviderResult<T[]>` - Implement this to return the children for the given `element` or root (if no element is passed).
- `getTreeItem(element: T): TreeItem | Thenable<TreeItem>` - Implement this to return the UI representation ([`TreeItem`](/api/references/vscode-api#TreeItem)) of the element that gets displayed in the view.

Here is an example of `TreeDataProvider` implementation that provides node dependencies data.

```ts
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class NodeDependenciesProvider implements vscode.TreeDataProvider<Dependency> {

	constructor(private workspaceRoot: string) {}

	getTreeItem(element: Dependency): vscode.TreeItem {
		return element;
	}

	getChildren(element?: Dependency): Thenable<Dependency[]> {
		if (!this.workspaceRoot) {
			vscode.window.showInformationMessage('No dependency in empty workspace');
			return Promise.resolve([]);
		}

		if (element) {
			return Promise.resolve(this.getDepsInPackageJson(path.join(this.workspaceRoot, 'node_modules', element.label, 'package.json')));
		} else {
			const packageJsonPath = path.join(this.workspaceRoot, 'package.json');
			if (this.pathExists(packageJsonPath)) {
				return Promise.resolve(this.getDepsInPackageJson(packageJsonPath));
			} else {
				vscode.window.showInformationMessage('Workspace has no package.json');
				return Promise.resolve([]);
			}
		}

	}

	/**
	 * Given the path to package.json, read all its dependencies and devDependencies.
	 */
	private getDepsInPackageJson(packageJsonPath: string): Dependency[] {
		if (this.pathExists(packageJsonPath)) {
			const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

			const toDep = (moduleName: string, version: string): Dependency => {
				if (this.pathExists(path.join(this.workspaceRoot, 'node_modules', moduleName))) {
					return new Dependency(moduleName, version, vscode.TreeItemCollapsibleState.Collapsed);
				} else {
					return new Dependency(moduleName, version, vscode.TreeItemCollapsibleState.None);
				}
			};

			const deps = packageJson.dependencies
				? Object.keys(packageJson.dependencies).map(dep => toDep(dep, packageJson.dependencies[dep]))
				: [];
			const devDeps = packageJson.devDependencies
				? Object.keys(packageJson.devDependencies).map(dep => toDep(dep, packageJson.devDependencies[dep]))
				: [];
			return deps.concat(devDeps);
		} else {
			return [];
		}
	}

	private pathExists(p: string): boolean {
		try {
			fs.accessSync(p);
		} catch (err) {
			return false;
		}
		return true;
	}
}

class Dependency extends vscode.TreeItem {

	constructor(
		public readonly label: string,
		private version: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
	) {
		super(label, collapsibleState);
	}

	get tooltip(): string {
		return `${this.label}-${this.version}`;
	}

	get description(): string {
		return this.version;
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
	};

}

```

Next is to register the above data provider to your view and this can be done in following two ways:

- `vscode.window.createTreeView` - Creates the tree view by providing the registered view id and above data provider. This will give access to the [`TreeView`](/api/references/vscode-api#TreeView) which you can use for performing other view operations.

```typescript
vscode.window.createTreeView('nodeDependencies', { treeDataProvider: new NodeDependenciesProvider(vscode.workspace.rootPath)});
```

- `vscode.window.registerTreeDataProvider` - Simply register the tree data provider by providing the registered view id and above data provider.

```typescript
vscode.window.registerTreeDataProvider('nodeDependencies', new NodeDependenciesProvider(vscode.workspace.rootPath));
```

## Activation

It is important that your extension is activated only when user starts using the view. VS Code emits an activationEvent [`onView:${viewId}`](/api/references/activation-events#onView) (e.g. `onView:nodeDependencies` for the example above) when user opens the view and you can register to this activation event in `package.json` and VS Code will activate your extension on this event.

```json
"activationEvents": [
		"onView:nodeDependencies",
],
```

Here's the extension in action:

![View](images/tree-view/view.png)


## View Container

A View Container contains a list of views that is displayed next to the built-in View Containers.

![View Container](images/tree-view/view-container.png)

To contribute a View Container, you should first register it using [`contributes.viewsContainers`](/api/references/contribution-points#contributes.viewsContainers) Contribution Point in `package.json`. You have to specify following required fields:

- `id`: The name of the new view container you're creating
- `title`: The name which will show up at the top of the view container
- `icon`: an image which will be displayed for the view container in the activity bar

```json
"contributes": {
  "viewsContainers": {
    "activitybar": [
      {
        "id": "package-explorer",
        "title": "Package Explorer",
        "icon": "media/dep.svg"
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

![View Actions](images/tree-view/view-actions.png)

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
    },
    {
      "command": "nodeDependencies.addEntry",
      "title": "Add"
    },
    {
      "command": "nodeDependencies.editEntry",
      "title": "Edit",
      "icon": {
        "light": "resources/light/edit.svg",
        "dark": "resources/dark/edit.svg"
      }
    },
    {
      "command": "nodeDependencies.deleteEntry",
      "title": "Delete"
    }
  ],
  "menus": {
    "view/title": [
      {
        "command": "nodeDependencies.refreshEntry",
        "when": "view == nodeDependencies",
        "group": "navigation"
      },
      {
        "command": "nodeDependencies.addEntry",
        "when": "view == nodeDependencies"
      }
    ],
    "view/item/context": [
      {
        "command": "nodeDependencies.editEntry",
        "when": "view == nodeDependencies && viewItem == dependency",
        "group": "inline"
      },
      {
        "command": "nodeDependencies.deleteEntry",
        "when": "view == nodeDependencies && viewItem == dependency"
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
vscode.window.createTreeView('ftpExplorer', {
  treeDataProvider: new FtpTreeDataProvider()
});
```

See [ftpExplorer.ts](https://github.com/Microsoft/vscode-extension-samples/tree/master/tree-view-sample/src/ftpExplorer.ts) for the implementation.
