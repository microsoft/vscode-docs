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

>**Note**: When in doubt, leave a folder in [Restricted Mode](#restricted-mode). You can always [enable trust](#trusting-a-workspace) later.

## Safe code browsing

It's great that there is so much source code available on public repositories and file shares. No matter the coding task or problem, there is probably already a good solution available somewhere. It is also great that there are so many powerful coding tools available to help you understand, debug, and optimizes your code. However, using open source code and tools does have risks and you can leave yourself open to malicious code execution and exploits.

Workspace Trust provides an extra layer of security when working with unfamiliar code by preventing automatic code execution when a workspace is open in "Restricted Mode".

> **Note**: The terms "workspace" and "folder" are used widely in the VS Code UI and documentation. You can think of a "workspace" as a folder with extra metadata created and used by VS Code.

## Restricted Mode

When prompted by the Workspace Trust dialog, if you choose **No, I don't trust the authors**, VS Code will go into Restricted Mode to prevent code execution. The workbench will display a banner at the top with links to **Manage** your folder via the Workspace Trust editor and **Learn More** taking you to documentation.

![Workspace Trust Restricted Mode banner](images/workspace-trust/restricted-mode-banner.png)

You will also see a Restricted Mode badge in the Status bar.

![Workspace Trust Restricted Mode Status bar badge](images/workspace-trust/restricted-mode-status-bar.png)

Restricted Mode tries to prevent automatic code execution by disabling or limiting the operation of several VS Code features: tasks, debugging, workspace settings, and extensions.

To see the full list of features disabled in Restricted Mode, you can open the Workspace Trust editor via the **Manage** link in the banner or by clicking the Restricted Mode badge in the Status bar.

![Workspace Trust editor](images/workspace-trust/workspace-trust-editor.png)

### Tasks

[Tasks](/docs/editor/tasks.md) can run scripts and tool binaries and because tasks definitions are defined in the workspace `.vscode` folder, they are part of the committed source code for a repo and shared to every user of that repo. Were someone to create a malicious task, it could be unknownly run by anyone who cloned that repository.

If you try to run or even enumerate tasks (**Terminal** > **Run Task...**) while in Restricted Mode, VS Code will display a prompt to trust the folder and continue executing the task. Cancelling the dialog, leaves VS Code in Restricted Mode.

![Workspace Trust Restricted Mode tasks dialog](images/workspace-trust/restricted-mode-tasks-dialog.png)

### Debugging

Similar to running a VS Code task, debug extensions can run debugger binaries when launching a debug session. For that reason, [debugging](/docs/editor/debugging.md) is also disabled when a folder is open in Restricted Mode.

If you try to start a debug session (**Run** > **Start Debugging**) while in Restricted Mode, VS Code will display a prompt to trust the folder and continue launching the debugger. Cancelling the dialog, leave VS Code in Restricted Mode and does not start the debug session.

![Workspace Trust Restricted Mode debugging dialog](images/workspace-trust/restricted-mode-debugging-dialog.png)

### Workspace settings

Workspace [settings](/docs/getstarted/settings.md) are stored in the `.vscode` folder at the root of your workspace and are therefore shared by anyone who clones the workspace repository. Some settings contain paths to executables (for example, linter binaries), which if set to point to malicious code, could do damage. For this reason, there are a set of workspace settings that are disabled when running in Restricted Mode.

![Workspace Trust editor workspace settings link](images/workspace-trust/workspace-settings-link.png)

In the Workspace Trust editor, there is a link to display the workspace settings that aren't being applied by bringing up the Settings editor scoped by the `@tag:requireTrustedWorkspace` tag.

![Settings editor scoped by the requireTrustedWorkspace tag](images/workspace-trust/requireTrustedWorkspace-settings.png)

### Extensions

The VS Code [extensions](/docs/editor/extension-marketplace.md) ecosystem is incredibly rich and diverse. People have created extensions to help with just about any programming task or editor customization. Some extensions provide full programming language support (IntelliSense, debugging, code analysis) and others let you play music or
have virtual [pets](https://marketplace.visualstudio.com/items?itemName=tonybaloney.vscode-pets).

Most extensions run code on your behalf and so could potentially do harm. And some extensions have settings that could cause them to act maliciously if configured to run an unexpected executable. For this reason, extensions, if they have not explicitly opted into Workspace Trust, are disabled by default in Restricted Mode.

![Workspace Trust disabled extensions link](images/workspace-trust/disabled-extensions-link.png)

You can review installed extension status by clicking the **extensions are disabled or have limited functionality** link in the Workspace Trust editor and this will disply the Extensions view scoped with the `@workspaceUnsupported` filter.

![Extensions view filtered by workspaceUnsupported showing disabled and limited extensions](images/workspace-trust/workspaceUnsupported-extensions-view.png)

**Disabled in Restricted Mode**

Extensions that have either not explicitly indicated that they support running in Restricted Mode are shown in the **Disabled in Restricted Mode** section. An extension author can also indicate that they never want to be enabled in Restricted Mode if they determine that their extension could be misused by modifications (settings or files) in a workspace.

**Limited in Restricted Mode**

Extension authors can also evaluate their extensions for possible security vulnerabilites and declare that they have **limited** support when running in Restricted Mode. This means they may disable some features or functionality to prevent a possible exploit.

Extensions can add custom text to the Extensions view Workspace Trust badge explaining the limitation when running in an untrusted folder.

For example, the VS Code built-in PHP extension limits the use of the `

![PHP extension limited in Restricted Mode hover](images/workspace-trust/php-limited-hover.png)

You can override an extension's Workspace Trust support level using the `extensions.supportUntrustedWorkspaces` setting described in the [Enabling extensions](#enabling-extensions) section below.

If you try to install an extension in Restricted Mode, you will be prompted to either trust the workspace or just install the extension. If the extension doesn't support Workspace Trust, it will be installed but be disabled or running with limited functionality.

![Workspace Trust install an extension in Restricted Mode dialog](images/workspace-trust/workspace-trust-install-extension.png)

## Trusting a workspace

If you trust the authors and maintainers of a project, you can trust the project's folder on your local machine. For example, it is usually safe to trust repositories from well-known GitHub organizations such as github.com/microsoft or github.com/docker.

The initial Workspace Trust prompt when you open a new folder allows you to trust the folder when you first open VS Code.

![Trust this folder dialog](images/workspace-trust/workspace-trust-dialog.png)

You can also bring up the Workspace Editor and quickly toggle a folder's trusted state.

There are several ways to bring up the Workspace Editor Initial dialog.

When in Restricted Mode:

* Restricted Mode banner **Manage** link
* Restricted Mode Status bar item

You can also at any time use:

* **Workspaces: Manage Workspace Trust** command from the Command Palette (`kb(workbench.actions.showCommands)`)
* **Manage Workspace Trust** from the **Manage** gear in the Activity bar

![Manage Workspace Trust command in the Manage gear context menu](images/workspace-trust/gear-manage-workspace-trust.png)

<!--
### Trusting an empty window

A trusted window (only lasts for the session) unless use the `security.workspace.trust.emptyWindow` setting.
 -->
## Selecting folders

When you trust a folder, it is added to the  **Trusted Folders & Workspaces** list displayed in the Workspace Trust editor.

![Workspace Trust editor Trusted Folders and Workspaces list](images/workspace-trust/trusted-folders-workspaces-list.png)

You can manually add, edit, and remove folders from this list and the active folder enabling trust is highlights in bold.

### Selecting a parent folder

TBD See a different message in Restricted Mode square and not **Don't Trust** button.

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
