---
Order: 16
Area: editor
TOCTitle: Workspace Trust
ContentId: 51280c26-f78b-4f9c-997f-8350bd6ed07f
PageTitle: Visual Studio Code Workspace Trust security
DateApproved: 5/5/2021
MetaDescription: Visual Studio Code workspace trust folder security
---
# Workspace Trust

Visual Studio Code takes security seriously and wants to help you safely browse and edit code no matter the source or original authors. The Workspace Trust feature lets you decide whether your project folders should allow or restrict automatic code execution.

![Trust this folder dialog](images/workspace-trust/workspace-trust-dialog.png)

>**Note**: When in doubt, leave a folder in [Restricted Mode](#restricted-mode). You can always enable trust later.

## Safe code browsing

It's great that there is so much source code available on public repositories and file shares. No matter the coding task or problem, there is probably already a good solution somewhere in open source. It is also great that there are so many powerful coding tools available to help you understand, debug, and optimizes your code. However, using open source code and tools does have risks and you can leave yourself open to malicious code execution and exploits.

Workspace Trust provides an extra layer of security when working with unfamiliar code by preventing automatic code execution in "Restricted Mode".

> **Note**: The terms "workspace" and "folder" are used widely in the VS Code UI and documentation. You can think of a "workspace" as a folder with extra metadata that VS Code understands.

## Restricted Mode

When prompted by the Workspace Trust dialog, if you choose **No, I don't trust the authors**
### What you see

Restricted Mode banner **Manage** and **Learn More**

Restricted Mode Status bar badge and text. "Some features are disabled because this workspace is not trusted".

What is restricted:

### Tasks

Tasks can run excute scripts and tool binaries and so

Will cause a prompt to show where you can trust the folder and continue

### Debugging

Debug extensions can execute code

Will cause a prompt to show where you can trust the folder and continue

### Workspace settings - added by workspace author, not your user settings

Link to Settings editor with disabled settings displayed with `@tag:requireTrustedWorkspace` tag.

![alt](https://link)

Workspace settings in `.vscode\settings.md` committed to the repository and shared.
    versus user settings under your personal AppData folder

### Extensions

**Disabled in Restricted Mode** section

Extension authors has not updated their extensions for Workspace Trust or set a not supporting Workspace Trust

**Limited in Restricted Mode** section

Badge showing "This extension has limited features because the current workspace is not trusted".

Installing extensions will cause a prompt. You can install an extension without enabling Workspace Trust but the extension will be disabled.

## Trusting a workspace

Initial dialog "Do you trust the authors of the files in this folder?"

Yes, I trust the authors

No, I don't trust the authors

Trust the parent option

### Bring up the Workspace Trust editor

When trusted:

Gear - **Manage Workspace Trust**
Command Palette - **Workspaces: Manage Workspace Trust**

When in Restricted Mode:

Restricted Mode banner **Manage** link.
Restricted Mode Status bar item

### Trusting an empty window

A trusted window (only lasts for the session) unless use the `security.workspace.trust.emptyWindow` setting.

## Selecting folders

Folders added to the list as you trust a folder. You can also manually add or modify the trusted folder list.

**Add Folder** button brings up platform Folder dialog with **Trust Folder** button.
Can not edit folder path directly? Could in earlier demo video, now goes to platform folder dialog

example for selecting parent folders

See a different message in Restricted Mode square and not **Don't Trust** button.

### Folder configurations

You can trust a parent folder and all subfolders will be trusted. This allows you to control Workspace Trust via a repository's location on disk.

For example you could put all trusted repos unter a "TrustedRepos" parent folder and unfamiliar repos under another parent folder. You would trust the "TrustedRepos" folder and never trust any folders unter "UntrustedRepos".

* TrustedRepos - Clone trusted repositories under this parent folder
* UntrustedRepos - Clone experimental or unfamiliar repositories under this parent folder

You also group and set trust on your repositories by grouping them under organization-base parent folders.

* github/microsoft - Clone an organizations repositories under this parent folder
* github/{myforks} - place your forks under this parent folder
* local

## Enabling extensions

Talk about `extensions.supportUntrustedWorkspaces`

## Installing new extensions (need this??)

## Settings

* `security.workspace.trust.enabled` - Enable Workspace Trust feature. Default is true.
* `security.workspace.trust.startupPrompt` - Whether to show the Workspace Trust dialog on startup. Default is to only show once per distinct workspace.
* `security.workspace.trust.emptyWindow` - Whether to always trust an empty window (no open folder). Default is false.
* `security.workspace.trust.untrustedFiles` - TBD
* `extensions.supportUntrustedWorkspaces` - Override extension Workspace Trust declarations. Either true or false. TBD requires a reload?

## Special configurations

### Remote extensions

SSH - paths are relative to the remote machine

WSL - paths are relative to WSL instance (/mnt/) (might map to already trusted local path)

Containers

### Codespaces (move to docs/remote/codespaces?)

Paths a little weird

## Next steps

Read on to find out about:

* [Workspace Trust for extension authors](/api/extension-guides/workspace-trust.md) - TBD

## Common questions

### Can I still edit my source code in Restricted Mode?

Yes, you can still browse and edit source code in Restricted Mode and VS Code's built-in Git integration works the same.

### Where did my installed extensions go?

In Restricted Mode, any extension that doesn't support Workspace Trust will be disabled and all UI elements such as Activity bar icons and commands will not be displayed.

Mention `extensions.supportUntrustedWorkspaces` setting but emphasize to use with care.

List of popular extensions that currently need this override.

### Can I disable the Workspace Trust feature?

You can but it is not recommended. If you don't want VS Code to check for Workspace Trust when opening a new folder or repository, you can set `security.workspace.trust.enabled` to false. VS Code will then behave as it did before release version 1.57.

### How do I untrust a folder/workspace?

Bring up Workspace Trust editor (**Workspaces: Manage Workspace Trust** from the Command Palette) and select **Don't Trust** button. You can also remove the folder from the **Trusted Folders & Workspaces** list.

### Why don't I see the "Don't Trust" button?

Mention trust via parent folders
