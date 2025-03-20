---
Order: 21
Area: editor
TOCTitle: Workspace Trust
ContentId: 51280c26-f78b-4f9c-997f-8350bd6ed07f
PageTitle: Visual Studio Code Workspace Trust security
DateApproved: 03/05/2025
MetaDescription: Visual Studio Code Workspace Trust folder security
---
# Workspace Trust

Visual Studio Code takes security seriously and wants to help you safely browse and edit code no matter the source or original authors. The Workspace Trust feature lets you decide whether code in your project folder can be executed by VS Code and extensions without your explicit approval.

![Trust this folder dialog](images/workspace-trust/workspace-trust-dialog.png)

>**Note**: When in doubt, leave a folder in [Restricted Mode](#restricted-mode). You can always [enable trust](#trusting-a-workspace) later.

## Safe code browsing

It's great that there is so much source code available on public repositories and file shares. No matter the coding task or problem, there is probably already a good solution available somewhere. It is also great that there are so many powerful coding tools available to help you understand, debug, and optimize your code. However, using open-source code and tools does have risks, and you can leave yourself open to malicious code execution and exploits.

Workspace Trust provides an extra layer of security when working with unfamiliar code, by preventing automatic code execution of any code in your workspace if the workspace is open in "Restricted Mode".

> **Note**: The terms "workspace" and "folder" are used widely in the VS Code UI and documentation. You can think of a ["workspace"](/docs/editing/workspaces/workspaces.md) as a folder with extra metadata created and used by VS Code.

## Restricted Mode

When prompted by the Workspace Trust dialog, if you choose **No, I don't trust the authors**, VS Code goes into Restricted Mode to prevent code execution.

The workbench displays a banner at the top with a link to **Manage** your folder via the Workspace Trust editor. In the Status Bar, you can also see a badge that indicates that the workspace is in Restricted Mode.

![Workspace Trust Restricted Mode banner](images/workspace-trust/restricted-mode-banner.png)

Restricted Mode tries to prevent automatic code execution by disabling or limiting the operation of several VS Code features: tasks, debugging, workspace settings, and extensions.

To see the full list of features disabled in Restricted Mode, you can open the Workspace Trust editor via the **Manage** link in the banner, or by selecting the Restricted Mode badge in the Status Bar.

![Workspace Trust editor](images/workspace-trust/workspace-trust-editor.png)

> **Important**: Workspace Trust can't prevent a malicious extension from executing code and ignoring **Restricted Mode**. You should only install and run extensions that come from a well-known publisher that you trust.

### Tasks

VS Code [tasks](/docs/debugtest/tasks.md) can run scripts and tool binaries. Because task definitions are defined in the workspace `.vscode` folder, they are part of the committed source code for a repo, and shared to every user of that repo. If someone would create a malicious task, it could be unknowingly run by anyone who cloned that repository.

If you try to run or even enumerate tasks (**Tasks** > **Run Task**) while in Restricted Mode, VS Code displays a prompt to confirm that you trust the folder and can continue executing the task. If you cancel the dialog, VS Code stays in Restricted Mode.

![Workspace Trust Restricted Mode tasks dialog](images/workspace-trust/restricted-mode-tasks-dialog.png)

### Debugging

Similar to running a VS Code task, debug extensions can run debugger binaries when launching a debug session. For that reason, [debugging](/docs/debugtest/debugging.md) is also disabled when a folder is open in Restricted Mode.

If you try to start a debug session (**Debug** > **Start Debugging**) while in Restricted Mode, VS Code displays a prompt to confirm that you trust the folder and can continue launching the debugger. If you cancel the dialog, VS Code stays in Restricted Mode, and does not start the debug session.

![Workspace Trust Restricted Mode debugging dialog](images/workspace-trust/restricted-mode-debugging-dialog.png)

### Workspace settings

Workspace [settings](/docs/configure/settings.md) are stored in the `.vscode` folder at the root of your workspace, and are therefore shared by anyone who clones the workspace repository. Some settings contain paths to executables (for example, linter binaries), which if set to point to malicious code, could cause damage. For this reason, VS Code disables a set of workspace settings when running in Restricted Mode.

![Workspace Trust editor workspace settings link](images/workspace-trust/workspace-settings-link.png)

In the Workspace Trust editor, select the link for workspace settings that aren't being applied to bring up the Settings editor scoped by the `@tag:requireTrustedWorkspace` tag.

![Settings editor scoped by the requireTrustedWorkspace tag in a restricted workspace](images/workspace-trust/requireTrustedWorkspace-settings.png)

### Extensions

The VS Code [extensions](/docs/configure/extensions/extension-marketplace.md) ecosystem is incredibly rich and diverse. People have created extensions to help with just about any programming task or editor customization. Some extensions provide full programming language support (IntelliSense, debugging, code analysis), and others let you play music or have virtual [pets](https://marketplace.visualstudio.com/items?itemName=tonybaloney.vscode-pets).

Most extensions run code on your behalf and could potentially do harm. Some extensions have settings that could cause them to act maliciously if configured to run an unexpected executable. For this reason, extensions that have not explicitly opted into Workspace Trust are disabled by default in Restricted Mode.

![Workspace Trust disabled extensions link](images/workspace-trust/disabled-extensions-link.png)

You can review an installed extension's status by selecting the **extensions are disabled or have limited functionality** link in the Workspace Trust editor, which displays the Extensions view scoped with the `@workspaceUnsupported` filter.

![Extensions view filtered by workspaceUnsupported showing disabled and limited extensions](images/workspace-trust/workspaceUnsupported-extensions-view.png)

Extensions that have not opted into Workspace Trust can be either disabled or limited in Restricted Mode.

**Disabled in Restricted Mode**

Extensions that have either not explicitly indicated that they support running in Restricted Mode are shown in the **Disabled in Restricted Mode** section. An extension author can also indicate that they never want to be enabled in Restricted Mode if they determine that their extension could be misused by modifications (settings or files) in a workspace.

**Limited in Restricted Mode**

Extension authors can also evaluate their extensions for possible security vulnerabilities and declare that they have **limited** support when running in Restricted Mode. This mode means the extension may disable some features or functionality to prevent a possible exploit.

Extensions can add custom text to the Workspace Trust badge in the Extensions view, explaining the limitation when running in an untrusted folder. For example, the VS Code built-in PHP extension limits the use of the `setting(php.validate.executablePath)` setting to trusted folders since overriding this setting could run a malicious program.

![PHP extension limited in Restricted Mode hover](images/workspace-trust/php-limited-hover.png)

You can override an extension's Workspace Trust support level using the `setting(extensions.supportUntrustedWorkspaces)` setting, described in the [Enabling extensions](#enabling-extensions) section below.

If you try to install an extension in Restricted Mode, you are prompted to either trust the workspace or just install the extension. If the extension doesn't support Workspace Trust, it is installed, but is disabled or runs with limited functionality.

![Workspace Trust install an extension in Restricted Mode dialog](images/workspace-trust/workspace-trust-install-extension.png)

> **Note**: Extension authors can learn how to update their extensions to support Workspace Trust by reading the [Workspace Trust Extension Guide](/api/extension-guides/workspace-trust.md).

## Trusting a workspace

If you trust the authors and maintainers of a project, you can trust the project's folder on your local machine. For example, it is usually safe to trust repositories from well-known GitHub organizations such as github.com/microsoft or github.com/docker.

When you open a new folder, the initial Workspace Trust prompt enables you to trust that folder and its subfolders.

![Trust this folder dialog](images/workspace-trust/workspace-trust-dialog.png)

You can also bring up the Workspace Editor and quickly toggle a folder's trusted state by selecting the **Trust** or **Trust Parent** button.

![Workspace Trust editor Trust buttons](images/workspace-trust/workspace-trust-buttons.png)

There are several ways to bring up the Workspace Trust editor dialog.

When in Restricted Mode:

* Restricted Mode banner **Manage** link
* Restricted Mode Status Bar item

You can also at any time use:

* **Workspaces: Manage Workspace Trust** command from the Command Palette (`kb(workbench.action.showCommands)`)

## Selecting folders

When you trust a folder, it is added to the **Trusted Folders & Workspaces** list that is displayed in the Workspace Trust editor.

![Workspace Trust editor Trusted Folders and Workspaces list](images/workspace-trust/trusted-folders-workspaces-list.png)

You can manually add, edit, and remove folders from this list to enable or disable workspace trust. The active folder is highlighted in bold in this list.

### Selecting a parent folder

When you trust a folder via the Workspace Trust editor, you have the option to also trust the parent folder. This applies trust to the parent folder and all its subfolders.

![Workspace Trust editor showing the Trust Parent button](images/workspace-trust/trust-parent-folder.png)

Trusting the parent folder can be helpful if you have many folders with trusted content co-located under one folder.

When you open a subfolder under a trusted parent, you won't see the usual **Don't Trust** button to put you back in Restricted Mode. Instead, there is text mentioning that your folder is trusted due to another folder.

You can add, modify, and remove a parent folder entry from the **Trusted Folders & Workspaces** list.

### Folder configurations

When you trust a parent folder, all subfolders are trusted, which enables you to control Workspace Trust via a repository's location on disk.

For example, you could put all trusted repos under a "TrustedRepos" parent folder, and unfamiliar repos under another parent folder, such as "ForEvaluation". You would trust the "TrustedRepos" folder, and selectively trust folders under "ForEvaluation".

```text
├── TrustedRepos - Clone trusted repositories under this parent folder
└── ForEvaluation - Clone experimental or unfamiliar repositories under this parent folder
```

You can also group and set trust on your repositories by grouping them under organization-specific parent folders.

```text
├── github/microsoft - Clone a specific organization's repositories under this parent folder
├── github/{myforks} - Place your forked repositories under this parent folder
└── local - Local un-published repositories
```

## Enabling extensions

What happens if you want to use Restricted Mode but your favorite extension doesn't support Workspace Trust? This can happen if an extension, while useful and functional, isn't being actively maintained and hasn't declared their Workspace Trust support. To handle this scenario, you can override the extension's trust state with the `setting(extensions.supportUntrustedWorkspaces)` setting.

> **Important**: Be careful with overriding an extension's Workspace Trust support. It's possible that the extension author has a good reason for disabling their extension in Restricted Mode. If in doubt, reach out to the extension author or review recent changelogs to get more context.

In the Settings editor (`kb(workbench.action.openSettings)`), you can override the Workspace Trust for individual extensions via the **Extensions: Support Untrusted Workspaces** setting (`setting(extensions.supportUntrustedWorkspaces)`).

![Extension support](images/workspace-trust/extensions-support-untrusted.png)

Select the **Edit in settings.json** link to manage the list of extension IDs and their support status and version. You can select any of your installed extensions via IntelliSense suggestions.

Below you can see a `settings.json` entry for the Prettier extension.

```json
  "extensions.supportUntrustedWorkspaces": {
    "esbenp.prettier-vscode": {
      "supported": true,
      "version": "6.4.0"
    },
  },
```

You can either enable or disable Workspace Trust support with the `supported` attribute. The `version` attribute specifies the exact extension version applicable and you can remove the version field if you want to set the state for all versions.

If you'd like to learn more about how extension authors evaluate and determine which features to limit in Restricted Mode, you can read the [Workspace Trust Extension Guide](/api/extension-guides/workspace-trust.md).

## Opening untrusted files

If you open a file that is located outside of a trusted folder, VS Code detects that the file comes from somewhere outside the folder root and prompts you with the option to continue to open the file or open the file in a new window in Restricted Mode. Opening in Restricted Mode is the safest option and you can always reopen the file in your original VS Code window once you determine the file is trustworthy.

![Untrusted files dialog](images/workspace-trust/untrusted-file-dialog.png)

If you would prefer to not be prompted when opening files from outside trusted workspaces, you can set `setting(security.workspace.trust.untrustedFiles)` to `open`. You can also set `setting(security.workspace.trust.untrustedFiles)` to `newWindow` to always create a new window in Restricted Mode. Checking the **Remember my decision for all workspaces** option in the untrusted files dialog applies your choice to the `setting(security.workspace.trust.untrustedFiles)` user setting.

### Opening untrusted folders

When working with [multi-root workspaces](/docs/editing/workspaces/multi-root-workspaces.md) with multiple folders, if you try to add a new folder to a trusted multi-root workspace, you are prompted to decide if you trust the files in that folder or if not, the entire workspace will switch to Restricted Mode.

![Untrusted folder dialog](images/workspace-trust/untrusted-folder-dialog.png)

### Empty windows (no open folder)

By default, if you open a new VS Code window (instance) without opening a folder or workspace, VS Code runs the window with full trust. All installed extensions are enabled and you can use the empty window without restrictions.

When you open a file, you are prompted whether you want to open an [untrusted file](#opening-untrusted-files), since there is no folder to parent it.

You can switch an empty window to Restricted Mode by using the Workspace Trust editor (select **Workspaces: Manage Workspace Trust** in the Command Palette), and then selecting **Don't Trust**. The empty window remains in Restricted Mode for your current session but reverts back to trusted if you restart or create a new window.

If you want all empty windows to be in Restricted Mode, you can set `setting(security.workspace.trust.emptyWindow)` to `false`.

## Settings

Below are the available Workspace Trust settings:

* `setting(security.workspace.trust.enabled)` - Enable Workspace Trust feature. Default is true.
* `setting(security.workspace.trust.startupPrompt)` - Whether to show the Workspace Trust dialog on startup. Default is to only show once per distinct folder or workspace.
* `setting(security.workspace.trust.emptyWindow)` - Whether to always trust an empty window (no open folder). Default is true.
* `setting(security.workspace.trust.untrustedFiles)` - Controls how to handle loose files in a workspace. Default is to prompt.
* `setting(extensions.supportUntrustedWorkspaces)` - Override extension Workspace Trust declarations. Either true or false.
* `setting(security.workspace.trust.banner)` - Controls when the Restricted Mode banner is displayed. Default is `untilDismissed`.

## Command-line switch

You can disable Workspace Trust via the VS Code command line by passing `--disable-workspace-trust`. This switch only affects the current session.

<!-- ## Special configurations

### Remote extensions

SSH - paths are relative to the remote machine

WSL - paths are relative to WSL instance (/mnt/) (might map to already trusted local path)

Containers

### Codespaces (move to docs/remote/codespaces?)

Paths a little weird

-->

## Next steps

Learn more at:

* [Workspace Trust Extension Guide](/api/extension-guides/workspace-trust.md) - Learn how extension authors can support Workspace Trust.
* [What is a VS Code "workspace"?](/docs/editing/workspaces/workspaces.md) - Find out more details about the VS Code "workspace" concept.
* [GitHub Repositories extension](/docs/sourcecontrol/github.md#github-repositories-extension) - Work directly on a repository without cloning the source code to your local machine.

## Common questions

### Can I still edit my source code in Restricted Mode?

Yes, you can still browse and edit source code in Restricted Mode. Some language features may be disabled, but text editing is always supported.

### Where did my installed extensions go?

In Restricted Mode, any extension that doesn't support Workspace Trust will be disabled, and all UI elements such as Activity bar icons and commands will not be displayed.

You can override an extension's Workspace Trust support level with the `setting(extensions.supportUntrustedWorkspaces)` setting but do so with care. [Enabling extensions](#enabling-extensions) has more details.

<!-- List of popular extensions that currently need this override. -->

### Can I disable the Workspace Trust feature?

You can but it is not recommended. If you don't want VS Code to check for Workspace Trust when opening a new folder or repository, you can set `setting(security.workspace.trust.enabled)` to false. VS Code will then behave as it did before the 1.57 release.

### How do I untrust a folder/workspace?

Bring up Workspace Trust editor (**Workspaces: Manage Workspace Trust** from the Command Palette) and select the **Don't Trust** button. You can also remove the folder from the **Trusted Folders & Workspaces** list.

### Why don't I see the "Don't Trust" button?

If you don't see the **Don't Trust** button in the Workspace Trust dialog, the folder's trust level may be inherited from a parent folder. Review the **Trusted Folders & Workspaces** list to check if a parent folder has enabled Workspace Trust.

Some workflows such as connecting to a [GitHub Codespace](/docs/remote/codespaces.md) or [attaching to a running Docker container](/docs/remote/attach-container.md) are automatically trusted since these are managed environments to which you should already have a high level of trust.

### What does Workspace Trust protect against?

Many features of VS Code allow third-party tools and extensions to run automatically, such as linting or format on save, or when you do certain operations like compiling code or debugging. An unethical person could craft an innocent looking project that would run malicious code without your knowledge and harm your local machine. Workspace Trust provides an extra layer of security by trying to prevent code execution while you are evaluating the safety and integrity of unfamiliar source code.
