---
Order: 95
Area: editor
TOCTitle: Workspaces
ContentId: fae59562-2d6c-429d-9179-ab8487c62007
PageTitle: Workspaces in Visual Studio Code
DateApproved: 
MetaDescription: Defines the concept of workspace in Visual Studio Code
---
# Workspaces

In Visual Studio Code, a "Workspace" means a collection of one or more
filesystem folders (and their children) and all of the VS Code
configurations that take effect when that "Workspace" is open in VS
Code.  Configurations can include, but are not limited to, data such as:

* [settings](/docs/getstarted/settings) that should be applied when that
  workspace is open
  
* [recommended extensions](/docs/editor/extension-gallery#_workspace-recommended-extensions) 
  for the workspace (useful when sharing the configuration files with colleagues)

* [debugging configurations](/docs/editor/multi-root-workspaces#_debugging) specific to that workspace

**Only one Workspace at a time can be open in VS Code**, but 
[multi-root workspaces](/docs/editor/multi-root-workspaces) fully accommodate the
use case of having a single Workspace that includes multiple folders
from disparate parts of the file system.

![workspace hero](images/workspaces/hero.png)

## Two kinds of "Workspace"

There are two kinds of "Workspaces" in VS code, "folder workspaces" and
"multi-root workspaces".

A "folder workspace" is presented by VS Code when you open a filesystem
folder (also called a directory) using the **Open folder...** link on
the Start page, or by selecting a folder in the **File** > **Open...**
menu option.  When you open a "folder workspace" in VS code the first
time, it will create some dotfiles so that configurations that pertain
to that folder workspace can be persisted.  You are given the option to
hide these dotfiles.  Opening the same folder workspace again will cause
VS code to apply the settings.

![folder workspace](images/workspaces/folder-workspace.png)

A "multi-root workspace", so called because it can refer to multiple
folders (aka directories) from disparate parts of the file system, lets
VS Code easily expose the contents the folder(s) of the workspace in the
[Side Bar](/docs/getstarted/userinterface#_basic-layout).  As with
folder workspaces, the configurations that pertain to the workspace are
persisted, but in contrast to folder workspaces, the configurations are
persisted to a `.code-workspace` file.  For complete details on
multi-root workspaces see 
[the definitive documentation of the feature](/docs/editor/multi-root-workspaces).

![multi-root workspace](/docs/editor/multi-root-workspaces/named-folders.png)

## Next steps

* [Multi-root workspaces](/docs/editor/multi-root-workspaces) - Multi-root workspaces let you work with multiple filesystem folders in a clean way within VS Code.

