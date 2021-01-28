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

A Visual Studio Code "workspace" is the collection of one or more folders that are opened in a VS Code instance. The concept of a workspace enables VS Code to scope useful application state such files that were opened or the editor layout and persist configurations such as workspace-specific [settings](/docs/getstarted/settings.md) and [tasks](/docs/editor/tasks.md).

Depending on your development workflow, you can also have more than one folder in a workspace, using an advanced configuration called [Multi-root workspaces](#multi-root-workspaces).

You may see the terms "folder" and workspace used interchangeably in VS Code documentation, issues, and community discussions. Think of a workspace as the root of a project that comes with extra VS Code knowledge.

## How do I open a VS Code "workspace"

You don't have to do anything for a folder to become a VS Code workspace other than open the folder with VS Code. Once a folder or has been opened, VS Code will automatically keep track of things such as your open files and editor layout so the editor will be as you left it when you reopen that folder. You can also manually add other folder specific configurations such as workspace-specific settings (versus global user settings) and task definition and debugging launch files.

The same is true for multi-root workspaces that you can open easily by selecting the `<name>.code-workspace` file for opening.

## Workspace state
**bpasero>** I would leave this paragraph out as we already gave some examples of workspace state before
List some of the metadata and state persisted per folder TBD

## Workspace settings
**bpasero>** see my note in [1]
Workspace files are stored at the project root in a `.vscode` folder. TBD

### settings
**bpasero>** see my note in [1]
Describe workspace settings, Settings UI tab, why you would use workspace settings versus user settings

### debugging
**bpasero>** see my note in [1]
Briefly describe `launch.json` and link to other docs TBD

### tasks
**bpasero>** see my note in [1]
Briefly describe `tasks.json` and link to other docs TBD

[1] **bpasero>**
I am trying to distill what we need to explain for settings, debugging and tasks in the context of explaining what a "workspace" is. My initial reaction is that all of this should have already been explained in the respective doc pages so I would not make this very detailed here to not repeat everything. However, I think one important concept is worthwhile to mention here: if you open a `.code-workspace` file (or actually when you are inside an "untitled" workspace), you get a third dimension of settings that you don't have otherwise:
- `.code-workspace` / untitled workspace: user, workspace, folder
- folder: user, workspace & folder (is the same)

## Multi-root workspaces

[Multi-root workspaces](/docs/editor/multi-root-workspaces.md) are an advanced capability of VS Code that allow to configure multiple distinct folders to be part of your workspace. Instead of opening a folder as workspace, you will open a `<name>.code-workspace` file that lists the folders of the workspace. For example:

```json
{
	"folders": [
		{
			"path": "my-folder-a"
		},
		{
			"path": "my-folder-b"
		}
	],
    "settings": {
        ...
    }
}
```

The presence of this `.code-workspace` file makes it even possible to include workspace specific settings (or launch / task configurations) that should apply to all folders of the workspace.


## Common questions

### What is an untitled workspace?

We try to make it very easy for you to add or remove folders in your workspace. Most often you start off with opening a single folder in VS Code, only then to add more folders as you see fit. The very first time you add a folder to a workspace, VS Code will automatically enter an "untitled" workspace. In the background we automatically maintain a `.code-workspace` file for you that already contains all the folders and workspace settings from your current session. The workspace will remain "untitled" until you decide to save it anywhere on disk.

There is really no difference between an untitled workspace and a saved workspace other than the fact that an untitled workspace is automatically created for you for your convinience. We automatically delete untitled workspaces (after asking you for confirmation) when you close a window where the untitled workspace is opened in.

### Is a VS Code workspace the same as an Eclipse workspace? TBD

### Does VS Code support Visual Studio projects and solutions? TBD

### How do I reset a VS Code workspace?

TBD some users might want to clear out per folder metadata?
