---
Order:
Area: editor
TOCTitle:
ContentId: 0144ad9a-14df-41b5-9629-cbba7dbfc396
PageTitle: Workspaces in Visual Studio Code
DateApproved: 12/11/2020
MetaDescription: Learn about Visual Studio Code workspaces
---
# What is a VS Code "workspace"?

A Visual Studio Code "workspace" is the collection of one or more folders that are opened in a VS Code window. In most cases you will have a single folder opened as workspace but depending on your development workflow, you can also have more than one folder opened, using an advanced configuration called [Multi-root workspaces](#multi-root-workspaces).

The notion of a workspace enables VS Code to:
- configure settings that only apply to this workspace but not others
- persist task and launch configurations that are only valid in the context of that workpsace
- store and restore UI state associated with that workspace (e.g. the files that are opened)
- selectively enable or disable extensions only for that workspace

You may see the terms "folder" and "workspace" used interchangeably in VS Code documentation, issues, and community discussions. Think of a workspace as the root of a project that comes with extra VS Code knowledge and capabilities.

**Note:** it is also possible to open VS Code without a workspace. For example, when you open a new window from the "File" menu, you will not be inside a workspace until you open one. In this mode some of VS Code's capabilities are reduced but you can still open text files and edit them.

## How do I open a VS Code "workspace"

You don't have to do anything for a folder to become a VS Code workspace other than open the folder with VS Code. Once a folder or has been opened, VS Code will automatically keep track of things such as your open files and editor layout so the editor will be as you left it when you reopen that folder. You can also add other folder specific configurations such as workspace-specific settings (versus global user settings) and task definition and debugging launch files (see below in the [workspace settings](#workspace-settings) chapter).

![Single-folder workspace](images/workspaces/single-folder-workspace.png)

*A single folder workspace opened inside VS Code*

## Multi-root workspaces

[Multi-root workspaces](/docs/editor/multi-root-workspaces.md) are an advanced capability of VS Code that allow you to configure multiple distinct folders to be part of the workspace. Instead of opening a folder as workspace, you will open a `<name>.code-workspace` JSON file that lists the folders of the workspace. For example:

```json
{
	"folders": [
		{
			"path": "my-folder-a"
		},
		{
			"path": "my-folder-b"
		}
	]
}
```

![Multi-root workspace](images/workspaces/multi-root-workspace.png)

*A multi-root workspace opened in VS Code*

**Note:** The visual difference of having a folder opened vs. opening a `.code-workspace` file can be very subtle. To give you a hint that a `.code-workspace` file has been opened, some pieces of the user interface (e.g. the root of the explorer) show an extra "(Workspace)" suffix next to the name.

### Untitled multi-root workspaces

We try to make it very easy for you to add or remove folders in your workspace. Most often you start off with opening a single folder in VS Code, only then to add more folders as you see fit. Unless you already have opened a `.code-workspace`, the very first time you add a second folder to a workspace with only one folder, VS Code will automatically enter an "untitled" workspace. In the background we automatically maintain a `untitled.code-workspace` file for you that already contains all the folders and workspace settings from your current session. The workspace will remain "untitled" until you decide to save it anywhere on disk.

![Untitled multi-root workspace](images/workspaces/untitled-workspace.png)

*An untitled multi-root workspace opened in VS Code*

**Note:** There is really no difference between an untitled workspace and a saved workspace other than the fact that an untitled workspace is automatically created for you for your convinience and will always restore until you save it. We automatically delete untitled workspaces (after asking you for confirmation) when you close a window where the untitled workspace is opened in.

## Workspace settings

Workspace settings enable you to configure settings in the context of the workspace you have opened and thus will always override global settings. They are physically stored in JSON file and their location depends on wether you have opened a folder as workspace or wether you have opened a `.code-workspace` file.

We only briefly touch on the concept of settings, please refer to [settings](/docs/getstarted/settings.md) chapter for a comprehensive explanation.

### Single folder workspace settings

Workspace settings will be stored in `.vscode/settings.json` when you open a folder as workspace.

![Single folder settings](images/workspaces/single-folder-settings.png)

*The settings editor when a folder is opened as workspace*

### Multi-root workspace settings

When you open a `.code-workspace` as workspace, all workspace settings will be added into the `.code-workspace` file.

We still allow you to configure settings per root folder though and as such the settings editor will present a third entry to you called "folder settings":

![Multi-root settings](images/workspaces/multi-root-settings.png)

*The settings editor when a multi-root workspace is opened*

Settings configured per folder will override settings defined in the `.code-workspace` if possible (some settings are not configurable on the level of the folder, for example the workbench color theme).

## Workspace tasks and launch configurations

If you have read and understood how [workspace settings](#workspace-settings) work, you can apply that knowledge to tasks and launch configurations. Depending on wether you have a folder opened as workspace or a `.code-workspace`, the location of workspace task and launch configurations will either be inside the `.vscode` folder or inside the `.code-workspace` file. On top of that, task and launch configurations can always be defined on the level of a folder too, even when you have opened a `.code-workspace` file.

Please refer to [tasks](docs/editor/tasks.md) and [debugging](docs/editor/debugging.md) chapters for a more comprehensive overview of how to use tasks and launch configurations in VS Code.

## Common questions

### Why is VS Code restoring all untitled workspaces on a restart?

We consider untitled workspaces as something you explicitly decided to setup. The first time an untitled workspace is created, we not only add the correct set of folders into the workspace file, but also all existing workspace settings. We consider this user data that we enforce to restore until the untitled workspace is saved or deleted.

### How do I delete an untitled workspace?

You can delete an untitled workspace by closing it's window and confirming the prompt to not save the untitled workspace.

### Can I use a multi-root workspace without folders

It is possible to leave the `folders` section of a `.code-workspace` file empty so that you end up with a instance of VS Code that does not show any root folders. You can still store workspace settings and even tasks or launch configurations in this case.