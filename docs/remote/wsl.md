---
Order: 4
Area: remote
TOCTitle: WSL
PageTitle: Developing in the Windows Subsystem for Linux with Visual Studio Code
ContentId: 79bcdbf9-d6a5-4e04-bbee-e7bb71f09f0a
MetaDescription: Using Visual Studio Code Remote Development with the Windows Subsystem for Linux (WSL)
DateApproved: 7/3/2019
---
# Developing in WSL

The **Visual Studio Code Remote - WSL** extension lets you use the [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/windows/wsl) as your full-time development environment right from VS Code. You can develop in a Linux-based environment, use Linux specific toolchains and utilities, and run and debug your Linux-based applications all from the comfort of Windows.

The extension runs commands and other extensions directly in WSL so you can edit files located in WSL or the mounted Windows filesystem (for example `/mnt/c`) without worrying about pathing issues, binary compatibility, or other cross-OS challenges.

![WSL Architecture](images/wsl/architecture-wsl.png)

This lets VS Code provide a **local-quality development experience** — including full IntelliSense (completions), code navigation, and debugging — **regardless of where your code is hosted**.

## Getting started

### Installation

To get started you need to:

1. Install the [Windows Subsystem for Linux](https://docs.microsoft.com/windows/wsl/install-win10) along with your preferred Linux distribution.

    > **Note:** WSL does have some [known limitations](#known-limitations) for certain types of development that can also affect your VS Code experience.

2. Install [Visual Studio Code](https://code.visualstudio.com/) on the **Windows** side (not in WSL).

    > **Note:** When prompted to **Select Additional Tasks** during installation, be sure to check the **Add to PATH** option so you can easily open a folder in WSL using the `code` command.

3. Install the [Remote Development](https://aka.ms/vscode-remote/download/extension) extension pack.

4. Consider adding a `.gitattributes` file to your repos or disabling automatic line ending conversion for Git on the **Windows side** by using a command prompt to run: `git config --global core.autocrlf input` If left enabled, this setting can cause files that you have not edited to appear modified due to line ending differences. See [tips and tricks](/docs/remote/troubleshooting.md#resolving-git-line-ending-issues-in-containers-resulting-in-many-modified-files) for details.

### Open a folder in WSL

Opening a folder inside the Windows Subsystem for Linux in VS Code is very similar to opening up a Windows folder from the command prompt.

1. Open a **WSL terminal window** (using the start menu item or by typing `wsl` from the command prompt).

2. Navigate to a folder you'd like to open in VS Code (including, but not limited to, Windows filesystem mounts like `/mnt/c`)

3. Type **`code .`** in the terminal. When doing this for the first time, you should see VS Code fetching components needed to run in WSL. This should only take short while, and is only needed once.

    > **Note:** If this command does not work, you may not have added VS Code to your path when it was installed.


4. After a moment, a new VS Code window will appear, and you'll see a notification that VS Code is opening the folder in WSL.

   ![WSL Starting notification](images/wsl//wsl-starting-notification.png)

    VS Code will now continue to configure itself in WSL and keep you up to date as it makes progress.

5. Once finished, you now see a WSL indicator in the bottom left corner, and you'll be able to use VS Code as you would normally!

    ![WSL Status Bar Item](images/wsl/wsl-statusbar-indicator.png)

That's it! Any VS Code operations you perform in this window will be executed in the WSL environment, everything from editing and file operations, to debugging, using terminals, and more.

Alternatively, you can open a Remote WSL window directly from VS Code:

1. Start VS Code.
2. Press `kbstyle(F1)`, select **Remote-WSL: New Window** for the default distro or **Remote-WSL: New Window using Distro**.
3. Use the File menu to open your folder.

If you already have a folder open, you can also use the **Remote-WSL: Reopen in WSL** command. You will be prompted which distro to use.

If you are in a WSL window and want to open the current input in a local window, use **Remote-WSL: Reopen in Windows**.

## Managing extensions

VS Code runs extensions in one of two places: locally on the UI / client side, or in WSL. While extensions that affect the VS Code UI, like themes and snippets, are installed locally, most extensions will reside inside WSL.

If you install an extension from the Extensions view, it will automatically be installed in the correct location. Once installed, you can tell where an extension is installed based on the category grouping. There will be **Local - Installed** category and one for WSL.

![Workspace Extension Category](images/wsl/wsl-installed-remote-indicator.png)

![Local Extension Category](images/wsl/wsl-local-installed-extensions.png)

> **Note:** If you are an extension author and your extension is not working properly or installs in the wrong place, see [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

Local extensions that actually need to run remotely will appear **Disabled** in the **Local - Installed** category. You can click the **Install** button to install an extension on your remote host.

![Disabled Extensions w/Install Button](images/wsl/wsl-disabled-extensions.png)

### Advanced: Forcing an extension to run locally / remotely

Extensions are typically designed and tested to either run locally or remotely, not both. However, if an extension supports it, you can force it to run in a particular location in your `settings.json` file.

For example, the setting below will force the Docker and Debugger for Chrome extensions to run remotely instead of their local defaults:

```json
"remote.extensionKind": {
    "msjsdiag.debugger-for-chrome": "workspace",
    "ms-azuretools.vscode-docker": "workspace"
}
```

A value of `"ui"` instead of `"workspace"` will force the extension to run on the local UI/client side instead. Typically, this should only be used for testing unless otherwise noted in the extension's documentation since it **can break extensions**. See the article on [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

## Opening a terminal in WSL

Opening a terminal in WSL from VS Code is simple. Once folder is opened in WSL, **any terminal window** you open in VS Code (**Terminal > New Terminal**) will automatically run in WSL rather than locally.

You can also use the `code` command line from this same terminal window to perform a number of operations such as opening a new file or folder in WSL. Type `code --help` to see what options are available from the command line.

![Using the code CLI](images/wsl/code-command-in-terminal.png)

## Debugging in WSL

Once you've opened a folder in WSL, you can use VS Code's debugger in the same way you would when running the application locally. For example, if you select a launch configuration in `launch.json` and start debugging (`kbstyle(F5)`), the application will start on remote host and attach the debugger to it.

See the [debugging](/docs/editor/debugging.md) documentation for details on configuring VS Code's debugging features in `.vscode/launch.json`.

## WSL specific settings

VS Code's local user settings are also reused when you have opened a folder in WSL. While this keeps your user experience consistent, you may want to vary some of these settings between your local machine and WSL. Fortunately, once you have connected to WSL, you can also set WSL specific settings by running the **Preferences: Open Remote Settings** command from the Command Palette (`kbstyle(F1)`) or by selecting the **Remote** tab in the settings editor. These will override any local settings you have in place whenever you open a folder in WSL.

## Known limitations

This section contains a list of common know issues with WSL. The intent is not to provide a complete list of issues but to highlight some of the common problems seen with WSL.

See [here for a list of active issues](https://aka.ms/vscode-remote/wsl/issues) related to WSL.

### Common limitations in WSL

Opening a remote WSL window on a non-default WSL distro requires Windows 10, May 2019 Update (version 1903). With older WSL versions, VS Code will use your **default distro**, so use [wslconfig.exe](https://docs.microsoft.com/windows/wsl/wsl-config) to change your default as needed.

The `Alpine WSL` distro is not yet supported with VS Code.

### Golang in WSL

| Issue | Existing issues |
|---|---|
Delve debugger doesn't work under WSL | [go-delve/delve#810](https://github.com/go-delve/delve/issues/810),  [Microsoft/vscode-go#926](https://github.com/Microsoft/vscode-go/issues/926) |

### Node.js in WSL

| Issue | Existing issues |
|---|---|
NodeJS Error: spawn EACCES (different variants of this error) | [Microsoft/WSL#3886](https://github.com/Microsoft/WSL/issues/3886) |
Webpack HMR not working | [Microsoft/WSL#2709](https://github.com/Microsoft/WSL/issues/2709) |
Firebase via node unusably slow only on WSL | [Microsoft/WSL#2657](https://github.com/Microsoft/WSL/issues/2657) |

### Git limitations

If you clone a Git repository using SSH and your SSH key has a passphrase, VS Code's pull and sync features may hang when running remotely. Either use an SSH key without a passphrase, clone using HTTPS, or run `git push` from the command line to work around the issue.

### Docker Extension limitations

The Docker extension is configured to run as a local "UI" extension that runs on the Windows side by default. This enables the extension to work with your local Docker installation when you are developing in WSL or [inside a container](/docs/remote/containers.md) since the Docker CLI is not available by default in these environments. However, commands invoked from the Docker extension that rely on the Docker command line, for example **Docker: Show Logs**, fail.

Fortunately, if you've [installed the Docker CLI in WSL and configured it to work with your local Docker host](https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly), you can install the Docker extension inside WSL to solve this problem. Just add the following to `settings.json`:

```json
"remote.extensionKind": {
    "ms-azuretools.vscode-docker": "workspace"
}
```

### Extension limitations

Many extensions will work in WSL without modification. However, in some cases, certain features may require changes. If you run into an extension issue, [see here for a summary of common problems and solutions](/docs/remote/troubleshooting.md#extension-tips) that you can mention to the extension author when reporting the issue.

## Common questions

### How do I change the distribution Remote - WSL uses?

Use **Remote-WSL: New Window using Distro** but note that VSCode requires Windows 10, May 2019 Update (version 1903) for this to work. For older WSL versions, the Remote - WSL extension uses your **default distribution**, which you can change using [wslconfig.exe](https://docs.microsoft.com/windows/wsl/wsl-config).

For example:

```bash
wslconfig /setdefault Ubuntu
```

You can see which distributions you have installed using:

```bash
wslconfig /l
```

### I'm seeing an error about a missing library or dependency

Some extensions rely on libraries not found in the vanilla install of certain WSL Linux distributions. You can add additional libraries into your Linux distribution by using its package manager.  For Ubuntu and Debian based distributions, run `sudo apt-get install <package>` to install the needed libraries. Check the documentation for your extension or the runtime that is mentioned for additional installation details.

### I see EACCESS: permission denied error trying to rename a folder in the open workspace

That's a known problem with the WSL file system implementation ([Microsoft/WSL#3395](https://github.com/Microsoft/WSL/issues/3395), [Microsoft/WSL#1956](https://github.com/Microsoft/WSL/issues/1956)) caused by the file watcher active by VSCode. The issue will only be fixed in WSL2.

To avoid the issue, set `remote.WSL.fileWatcher.polling` to true. However, polling based has a performance impact for large workspaces.

For large workspace you want to increase the polling interval: `remote.WSL.fileWatcher.pollingInterval` and control the folders that are watched: `files.watcherExclude`.

WSL2 does not have that file watcher problem is also not affected by the new setting.

### What are the connectivity requirements for the VS Code Server when it is running in WSL?

The VS Code Server requires outbound HTTPS (port 443) connectivity to:

- `update.code.visualstudio.com`
- `marketplace.visualstudio.com`
- `vscode.blob.core.windows.net`
- `*.vo.msecnd.net` (Azure CDN)
- `*.gallerycdn.vsassets.io` (Azure CDN)

All other communication between the server and the VS Code client is accomplished through an authenticated, random, local TCP port. You can find a list of locations VS Code itself needs access to [in the network connections article](/docs/setup/network.md#common-hostnames).

Finally, some extensions (like C#) download secondary dependencies from `download.microsoft.com` or `download.visualstudio.microsoft.com`. Others (like [VS Live Share](https://docs.microsoft.com/en-us/visualstudio/liveshare/reference/connectivity#requirements-for-connection-modes)) may have additional connectivity requirements. Consult the extension's documentation for details if you run into trouble.

### As an extension author, what do I need to do?

The VS Code extension API abstracts away local/remote details so most extensions will work without modification. However, given extensions can use any node module or runtime they want, there are situations where adjustments may need to be made. We recommend you test your extension to be sure that no updates are required. See [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

## Questions or feedback

- See [Tips and Tricks](/docs/remote/troubleshooting.md#wsl-tips) or the [FAQ](/docs/remote/faq.md).
- Search on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode-remote).
- Add a [feature requests](https://aka.ms/vscode-remote/feature-requests) or [report a problem](https://aka.ms/vscode-remote/issues/new).
- Contribute to [our documentation](https://github.com/Microsoft/vscode-docs) or [VS Code itself](https://github.com/Microsoft/vscode).
- See our [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) guide for details.
