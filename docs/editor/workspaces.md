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

A Visual Studio Code "workspace" is usually just your project root folder. VS Code uses the "workspace" concept in order to scope useful editor state such as open files and editor groups and persist configurations such as project-specific [settings](/docs/getstarted/settings.md) and [tasks](/docs/editor/tasks.md).

You don't have to do anything for a folder to become a VS Code "workspace" other than open the folder with VS Code. Once a folder has been opened, VS Code will automatically keep track of things such as your open files and editor layout so the editor will be as you left it when you reopen that folder. You can also manually add other folder specific configurations such as project-specific settings (versus global user settings) and task definition and debugging launch files.

You may see the terms "folder" and "workspace" used interchangeably in VS Code documentation, issues, and community discussions. If you think of a "workspace" as the root folder of a project that has extra VS Code knowledge, you will be correct in most cases. Depending on your development workflow, you can also have more than one folder in a "workspace", using an advanced configuration called [Multi-root workspaces](#multi-root-workspaces).

## Workspace state

List some of the metadata and state persisted per folder TBD

## Workspace settings

Workspace files are stored at the project root in a `.vscode` folder. TBD

### settings

Describe workspace settings, Settings UI tab, why you would use workspace settings versus user settings

### debugging

Briefly describe `launch.json` and link to other docs TBD

### tasks

Briefly describe `tasks.json` and link to other docs TBD

## Multi-root workspaces

You can also have more than one root folder in a VS Code workspace through a feature called [Multi-root workspaces](/docs/editor/multi-root-workspaces.md). TBD Why you would use multi-root workspaces, briefly show UI and `.code-workspace` file. Leave details to existing doc.

## Common questions

### Is a VS Code workspace the same as an Eclipse workspace? TBD

### Does VS Code support Visual Studio projects and solutions? TBD

### How do I reset a VS Code workspace?

TBD some users might want to clear out per folder metadata?
