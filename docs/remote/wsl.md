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

The **[Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl)** allows you to take advantage of a Linux based tool-chain right from the comfort of Windows. Historically Windows-based developer tools have had to interact with WSL through mounted file shares (e.g.` /mnt/c`). While this works in concept, differences between Windows and Linux can make this workflow difficult. Conversely, Linux-based developer tools do not work unless they are text based since WSL was not intended to house a full Linux desktop operating system.

The optimized **Visual Studio Code Remote - WSL extension** allows you take advantage of VS Code's full feature set from anywhere in WSL - regardless of whether the files you want to edit exist on the Linux side or a mounted Windows filesystem. When using the capability, VS Code selectively runs certain extensions inside WSL to optimize your experience.

![WSL Architecture](images/wsl/architecture-wsl.png)

Given source code **does not even need to exist on the Windows filesystem** for it to work, the approach provides a **local-quality development experience** including full IntelliSense, debugging, and more **regardless of where your code is located**.

## Getting started

### Installation

To get started you need to:

1. Install the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) along with your preferred Linux distribution. The Remote - WSL extension will use your **default distro** and use `wslconfig.exe` to configure the default as needed.

    > **Note:** WSL does have some [known limitations](#known-limitations) for certain types of development that can also affect your VS Code experience.

2. Install [Visual Studio Code - Insiders](https://code.visualstudio.com/insiders/) on the **Windows** side (not in WSL).

    > **Dogfooding Note (UPDATED)**: The Code - WSL build is deprecated. Use VS Code - Insiders now.

3. Install the **[Remote Development](https://aka.ms/vscode-remote/download/extension)** extension pack

    > **Dogfooding Note (UPDATED):** Set up the dogfooding version of the Remote Development extensions as follows:
    > 1. Sign into a Microsoft GitHub org associated GitHub account from a browser.
    > 2. Download and manually install the latest VSIX of the [Selfhost Remote Extensions Updater](https://aka.ms/vscode-remote/download/extension) in VS Code – Insiders.
    > 3. The first time the Selfhost Remote Extensions starts, you may be prompted to paste in a GitHub access token so that it can download and auto-update private versions of the extensions. You only need to give "Repo" scope to this token.
    > 4. Reload / restart VS Code - Insiders.

4. Disable automatic line ending conversion for Git on the **Windows side** (given Linux and Windows use different line endings). Run: `git config --global core.autocrlf false`

### Open a folder in WSL

Opening a folder inside the Windows Subsystem for Linux in VS Code is very similar to opening up a Windows folder from the command prompt.

1. Open a **WSL terminal window** (using the start menu item or by typing `wsl` from the command prompt).

2. Navigate to a folder you'd like to open in VS Code (including, but not limited to, Windows filesystem mounts like `/mnt/c`)

3. Type **`code-insiders .`** in the terminal. When doing this for the first time you should see VS Code fetching components needed to run in WSL. This should only take short while, and is only needed once.

4. After a moment, a new VS Code window will appear and you'll see a notification letting you know VS Code is opening the folder in WSL.

   ![WSL Starting notification](images/wsl//wsl-starting-notification.png)

    VS Code will now continue to configure itself in WSL, and install any VS Code extensions you are running locally inside WSL to optimize performance. VS Code will keep you up to date as it makes progress.

5. Once finished, you now see a WSL indicator in the bottom left corner, and you'll be able to use VS Code as you would normally!

    ![WSL Status Bar Item](images/wsl/wsl-statusbar-indicator.png)

That's it! Any VS Code operations you perform in this window will executed in the WSL environment including everything from editing and file operations, to debugging, terminals, and more.

### Managing extensions

You can install additional extensions at any time by using the extensions panel. VS Code automatically infers whether the extension should be run locally or in WSL based on a set of extension characteristics. If you are an extension author and are finding that your extension is not working properly, see the article on [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

### Advanced: Forcing an extension to run locally / remotely

VS Code runs extensions two one of places: locally on the UI / client side, or remotely on the Workspace / WSL side. Extensions typically are designed and tested to for use in one side or the other, not both. However, you can force an extension to run in a particular location  `settings.json`. For example, this will force the Docker extension on the UI side (instead of its Workspace default) and the Debugger for Chrome on the Workspace side (instead of its UI default):

````json
"remote.extensionKind": {
    "peterjausovec.vscode-docker": "ui",
    "msjsdiag.debugger-for-chrome": "workspace"
}

````

Typically, this should only be used for testing unless otherwise noted in the extension's documentation since it **can break extensions**. See the article on [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

### Opening a terminal in WSL

Opening a terminal in a container is simple. Once connected, **any terminal window** you open in VS Code (e.g. using **Terminal > New Terminal**) will automatically run in WSL than locally.

You can also **use the `code-insiders` CLI** from this same terminal window to perform a number of operations such as opening a new file or folder in WSL! Type `code-insiders --help` to what is available from the command line.

![Using the code CLI](images/wsl/code-command-in-terminal.png)

### Debugging in WSL

Once you've connected to WSL, you can use VS Code's debugger in the same way you would when running the application locally. For example, the `launch` action will start the application up inside WSL and attach the debugger to it.

See the [debugging](/docs/editor/debugging.md) documentation for details on configuring VS Code's debugging features in `.vscode/launch.json`.

## Known limitations

This section contains a list of common know issues with WSL. The intent is not to provide a complete list of issues, but to highlight some of the commonly problems seen with WSL.

For a more complete list see [here for a list of active issues](https://aka.ms/vscode-remote/wsl/issues) on GitHub that are tagged with WSL.

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
Node.js auto-attach don't work under WSL | https://github.com/Microsoft/vscode/issues/47497 |
Debugging doesn't work in multi root workspaces | https://github.com/Microsoft/vscode/issues/44451 |
Debugging doesn't work | https://github.com/Microsoft/vscode/issues/44906 |
Node process is left hanging on WSL when debugger is stopped | https://github.com/Microsoft/vscode/issues/48755 |
Unable to debug with integrated terminal (WSL) | https://github.com/Microsoft/vscode/issues/50445 |
NodeJS Error: spawn EACCES (different variants of this error) | https://github.com/Microsoft/WSL/issues/3886 |
Webpack HMR not working | https://github.com/Microsoft/WSL/issues/2709 |
Firebase via node unusably slow only on WSL | https://github.com/Microsoft/WSL/issues/2657 |

## Common questions

### I'm seeing an error about a missing library or dependency, how do I fix this?

Some extensions rely on libraries not found in the vanilla install of certain WSL Linux distributions. You can add additional libraries into your Linux distribution by using its package manager.  For Ubuntu and Debian based distributions, run `sudo apt-get install <package>` to install the needed libraries. Check the documentation for your extension or the runtime that is mentioned for additional installation details.

### What are the connectivity requirements for the VS Code Remote Server when it is running in WSL?

The VS Code Remote Server requires outbound HTTPS (port 443) connectivity to `update.code.visualstudio.com` and `marketplace.visualstudio.com`. All other communication between the server and the VS Code client is accomplished through am authenticated, random local TCP port.

### As an extension author, what do I need to do?

The VS Code extension API abstracts many extensions away from any changes so they work without modification. However, given extensions can use any node module or runtime they want, there are situations where adjustments may need to be made. We recommend you should test your extension to be sure that no update are required. See the article on [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

## Questions or feedback

> **Dogfooding Note:**  When reporting issues, please file them against the https://github.com/Microsoft/vscode-remote/issues repository.

- See the [FAQ](/docs/remote/faq.md) or the [troubleshooting guide](/docs/remote/troubleshooting.md#wsl-tips).
- Search on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode).
- Add a [feature requests](https://aka.ms/vscode-remote/feature-requests) or [report a problem](https://aka.ms/vscode-remote/issues/new).
- Contribute to [our documentation](https://github.com/Microsoft/vscode-docs) or [VS Code itself](https://github.com/Microsoft/vscode).
- See our [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) guide for details.
