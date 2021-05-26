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

TBD general description of the feature TL;DR

![Trust this folder dialog](https://link)

When in doubt, leave a folder in [Restricted Mode](#restricted-mode).

## Safe code browsing

Why Workspace Trust? - value prop

Great to be able to share code on public repositories. With so much open source code available also comes some risk.

It is also great that there are so many powerful tools for code understanding, debugging, and correctness that can run on your projects.

> **Note**: The term "workspace" is used widely in the VS Code UI and documentation. You can think of a "workspace" as a folder with extra metadata that VS Code understands.

## Restricted Mode

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

### How do I untrust a folder/workspace?

Bring up Workspace Trust editor and select **Don't Trust** button.

Or remove folder entry

### Why don't I see the "Don't Trust" button?

Mention trust via parent folders
