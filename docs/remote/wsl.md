---
Order: 4
Area: remote
TOCTitle: WSL
PageTitle: Developing in the Windows Subsystem for Linux with Visual Studio Code
ContentId: 79bcdbf9-d6a5-4e04-bbee-e7bb71f09f0a
MetaDescription: Using Visual Studio Code Remote Development with the Windows Subsystem for Linux (WSL)
DateApproved: 4/11/2019
---
# Developing in WSL

The [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/windows/wsl) allows you to take advantage of a Linux based tool-chain right from the comfort of Windows. Historically Windows-based developer tools have had to interact with WSL through mounted file shares (for example `/mnt/c`). While this works in concept, differences between Windows and Linux can make this workflow difficult. Conversely, Linux-based developer tools do not work unless they are text based since WSL was not intended to house a full Linux desktop operating system.

The **Visual Studio Code Remote - WSL** extension allows you take advantage of VS Code's full feature set from anywhere in WSL - regardless of whether the files you want to edit exist on the Linux side or a mounted Windows filesystem. You'll have a rich development experience with IntelliSense (smart completions), code navigation, and debugging, while working on source code in Linux.

![WSL Architecture](images/wsl/architecture-wsl.png)

## Getting started

### Installation

To get started you need to:

1. Install the [Windows Subsystem for Linux](https://docs.microsoft.com/windows/wsl/install-win10) along with your preferred Linux distribution. VS Code will use your **default distro**, so use `wslconfig.exe` to change your default as needed.

    > **Note:** WSL does have some [known limitations](#known-limitations) for certain types of development that can also affect your VS Code experience.

2. Install [Visual Studio Code Insiders](https://code.visualstudio.com/insiders/) on the **Windows** side (not in WSL).

3. Install the [Remote Development](https://aka.ms/vscode-remote/download/extension) extension pack.

4. Disable automatic line ending conversion for Git on the **Windows side** by using a command prompt to run: `git config --global core.autocrlf false` (If left enabled, this setting can cause files that you have not edited to appear modified due to line ending differences.)

### Open a folder in WSL

Opening a folder inside the Windows Subsystem for Linux in VS Code is very similar to opening up a Windows folder from the command prompt.

1. Open a **WSL terminal window** (using the start menu item or by typing `wsl` from the command prompt).

2. Navigate to a folder you'd like to open in VS Code (including, but not limited to, Windows filesystem mounts like `/mnt/c`)

3. Type **`code-insiders .`** in the terminal. When doing this for the first time you should see VS Code fetching components needed to run in WSL. This should only take short while, and is only needed once.

4. After a moment, a new VS Code window will appear, and you'll see a notification letting you know VS Code is opening the folder in WSL.

   ![WSL Starting notification](images/wsl//wsl-starting-notification.png)

    VS Code will now continue to configure itself in WSL, and install any VS Code extensions you are running locally inside WSL to optimize performance. VS Code will keep you up to date as it makes progress.

5. Once finished, you now see a WSL indicator in the bottom left corner, and you'll be able to use VS Code as you would normally!

    ![WSL Status Bar Item](images/wsl/wsl-statusbar-indicator.png)

That's it! Any VS Code operations you perform in this window will be executed in the WSL environment including everything from editing and file operations, to debugging, terminals, and more.

## Managing extensions

VS Code runs extensions in one of two places: locally on the UI / client side, or in WSL. While extensions that affect the VS Code UI, like themes and snippets, are installed locally, most extensions will reside inside WSL.

If you search for an extension in the Extensions view and install, it will automatically be installed in the correct location. Once installed, you can tell where an extension is installed based on the category it is in. There will be **Local - Installed** category and one for WSL.

![Workspace Extension Category](images/wsl/wsl-installed-remote-indicator.png)

![Local Extension Category](images/wsl/wsl-local-installed-extensions.png)

> **Note:** If you are an extension author and are finding that your extension is not working properly or installs in the wrong place, see the article on [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

Local extensions that actually need to run remotely will appear **Disabled** in the **Local - Installed** category. You can click the **Install** button on any of them you want to install on your remote host.

![Disabled Extensions w/Install Button](images/wsl/wsl-disabled-extensions.png)

### Advanced: Forcing an extension to run locally / remotely

VS Code runs extensions in one of two places: locally on the UI / client side, or remotely on the Workspace / WSL side. Extensions typically are designed and tested for use in one side or the other, not both. However, you can force an extension to run in a particular location  in your `settings.json` file. For example, the setting below will force the Azure Cosmos DB extension on the UI side (instead of its Workspace default) and the Debugger for Chrome on the Workspace side (instead of its UI default):

````json
"remote.extensionKind": {
    "ms-azuretools.vscode-cosmosdb": "ui",
    "msjsdiag.debugger-for-chrome": "workspace"
}

````

Typically, this should only be used for testing unless otherwise noted in the extension's documentation since it **can break extensions**. See the article on [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

## Opening a terminal in WSL

Opening a terminal in WSL from VS Code is simple. Once folder is opened in WSL, **any terminal window** you open in VS Code (**Terminal > New Terminal**) will automatically run in WSL rather than locally.

You can also **use the `code-insiders` CLI** from this same terminal window to perform a number of operations such as opening a new file or folder in WSL! Type `code-insiders --help` to what is available from the command line.

![Using the code CLI](images/wsl/code-command-in-terminal.png)

## Debugging in WSL

Once you've opened a folder in WSL, you can use VS Code's debugger in the same way you would when running the application locally. For example, if you select a launch configuration in `launch.json` and start debugging (`kbstyle(F5)`), the application will start on remote host and attach the debugger to it.

See the [debugging](/docs/editor/debugging.md) documentation for details on configuring VS Code's debugging features in `.vscode/launch.json`.

## WSL specific settings

VS Code's user settings will apply to both folders opened locally and in WSL. For most settings, this is really useful, but some settings are absolute paths that may vary between your local machine and WSL. You may also want to alter settings like the active theme based on whether you are connected to WSL or not.

Fortunately, you can add WSL specific user settings to `~/.vscode-remote/data/Machine/settings.json` in WSL that will override any local settings you have in place. You can quickly access them by running the **Preferences: Open Remote Settings** command from the command palette (`kbstyle(F1)`) or by clicking on the "Remote" tab in the settings editor.

## Known limitations

This section contains a list of common know issues with WSL. The intent is not to provide a complete list of issues but to highlight some of the common problems seen with WSL.

For a more complete list, see [here for a list of active issues](https://aka.ms/vscode-remote/wsl/issues) on GitHub that are tagged with WSL.

### Common limitations in WSL

| Issue | Existing issues |
|---|---|
Non-empty folders in the open workspace can't be renamed | https://github.com/Microsoft/WSL/issues/3395, https://github.com/Microsoft/WSL/issues/1956
Local proxy settings are not reused by VS Code running in WSL which can prevent extensions from working without adding a global `HTTP_PROXY` and `HTTPS_PROXY` environment variable with the appropriate proxy information. |

### Golang in WSL

| Issue | Existing issues |
|---|---|
Delve debugger doesn't work under WSL | https://github.com/go-delve/delve/issues/810 https://github.com/Microsoft/vscode-go/issues/926 |

### Node.js in WSL

| Issue | Existing issues |
|---|---|
NodeJS Error: spawn EACCES (different variants of this error) | https://github.com/Microsoft/WSL/issues/3886 |
Webpack HMR not working | https://github.com/Microsoft/WSL/issues/2709 |
Firebase via node unusably slow only on WSL | https://github.com/Microsoft/WSL/issues/2657 |

### Extension limitations

Many extensions will work in WSL without modification. However, in some cases, certain features may require changes. If you run into an extension issue, [see here for a summary of common problems and solutions](/docs/remote/troubleshooting.md#extensiont-tips) that you can mention to the extension author when reporting the issue.

## Common questions

### How do I change the distribution Remote - WSL uses?

The Remote - WSL extension uses your **default distribution** which you can change using `wslconfig.exe`. For example:

```bash
wslconfig /setdefault Ubuntu
```

You can see which distributions you have installed using:

```bash
wslconfig /l
```

### I'm seeing an error about a missing library or dependency, how do I fix this?

Some extensions rely on libraries not found in the vanilla install of certain WSL Linux distributions. You can add additional libraries into your Linux distribution by using its package manager.  For Ubuntu and Debian based distributions, run `sudo apt-get install <package>` to install the needed libraries. Check the documentation for your extension or the runtime that is mentioned for additional installation details.

### What are the connectivity requirements for the VS Code Server when it is running in WSL?

The VS Code Server requires outbound HTTPS (port 443) connectivity to `update.code.visualstudio.com` and `marketplace.visualstudio.com`. All other communication between the server and the VS Code client is accomplished through am authenticated, random, local TCP port.

### As an extension author, what do I need to do?

The VS Code extension API abstracts many extensions away from any changes so they work without modification. However, given extensions can use any node module or runtime they want, there are situations where adjustments may need to be made. We recommend you test your extension to be sure that no updates are required. See the article on [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

## Questions or feedback

- See [Tips and Tricks](/docs/remote/troubleshooting.md#wsl-tips) or the [FAQ](/docs/remote/faq.md).
- Search on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode).
- Add a [feature requests](https://aka.ms/vscode-remote/feature-requests) or [report a problem](https://aka.ms/vscode-remote/issues/new).
- Contribute to [our documentation](https://github.com/Microsoft/vscode-docs) or [VS Code itself](https://github.com/Microsoft/vscode).
- See our [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) guide for details.
