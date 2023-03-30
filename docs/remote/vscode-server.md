---
Order: 6
Area: remote
TOCTitle: VS Code Server
PageTitle: Visual Studio Code Server
ContentId: d750ab6d-82c2-4e64-8fbb-7888e1374381
MetaDescription: Using Visual Studio Code Server
DateApproved: 3/30/2023
---
# Visual Studio Code Server

The Visual Studio Code Server is a service you can run on a remote development machine, like your desktop PC or a virtual machine (VM). It allows you to securely connect to that remote machine from anywhere through a local VS Code client, without the requirement of SSH.

## What is the VS Code Server?

In VS Code, we want users to seamlessly leverage the environments that make them the most productive. The [VS Code Remote Development extensions](/docs/remote/remote-overview.md) allow you to work in the Windows Subsystem for Linux (WSL), remote machines via SSH, and dev containers directly from VS Code. These extensions install a server on the remote environment, allowing local VS Code to smoothly interact with remote source code and runtimes.

We now provide a standalone "VS Code Server," which is a service built off the same underlying server used by the remote extensions, plus some additional functionality, like an interactive CLI and facilitating secure connections to vscode.dev.

![vscode.dev connected to the VS Code Server](images/vscode-server/server-connected.png)

## Architecture

We want to provide a unified VS Code experience no matter how you use the editor, whether it's local or remote, in the desktop or in the browser.

Access to the VS Code Server is built in to the existing [`code` CLI](/docs/editor/command-line.md#launching-from-command-line).

The CLI establishes a tunnel between a VS Code client and your remote machine. Tunneling securely transmits data from one network to another.

![The VS Code Server architecture](images/vscode-server/server-arch-latest.png)

The VS Code Server experience includes a few components:

* The VS Code Server: Backend server that makes VS Code remote experiences possible.
* [Remote - Tunnels extension](/docs/remote/tunnels.md): Automatically loaded in your local VS Code client, it facilitates the connection to the remote machine.

## Scenarios

The VS Code Server allows you to use VS Code in new ways, such as:

* Developing on a remote machine where SSH support may be limited, or you need web-based access.
* Developing on a machine that doesn't support the installation of VS Code desktop, such as an iPad / tablet or Chromebook.
* Experiencing the client-side security benefit that all code can be executed in the browser sandbox.

## Getting Started

You can choose from two paths to enable tunneling, which are described in greater details in their respective docs content:

* [Run the `tunnel` command in the `code` CLI](/docs/remote/tunnels.md#using-the-code-cli)
* [Enable tunneling through the VS Code UI](/docs/remote/tunnels.md#using-the-vs-code-ui)

## Things to try

### Licensing and other commands

Upon first run of the VS Code Server, you'll be prompted with the terms of the license. You can view the license for the VS Code Server [here](https://aka.ms/vscode-server-license).

```bash
* Visual Studio Code Server
*
* By using the software, you agree to
* the Visual Studio Code Server License Terms (https://aka.ms/vscode-server-license) and
* the Microsoft Privacy Statement (https://privacy.microsoft.com/en-US/privacystatement).
```

You can explore the CLI's other commands by running `code -h`, and specifically the tunneling commands by running `code tunnel -help`:

![Output of tunnel help CLI command](images/vscode-server/tunnel-help.png)

### Extension commands

As with the CLI, the VS Code Remote Tunnels extension has additional commands you can explore by opening the Command Palette (`F1`) in VS Code and typing **Remote Tunnels**. You may learn more in the [Remote Tunnels documentation](/docs/remote/tunnels.md).

## Telemetry

If you want to disable telemetry, you can pass in `--disable-telemetry` when launching the VS Code Server: `code tunnel --disable-telemetry`. Alternatively, if you would like to specify an initial telemetry level, such as only collecting errors, you can pass in `--telemetry-level` followed by the level (for example, `error`).

If telemetry is not disabled via the CLI, the VS Code Server will begin respecting the client telemetry settings (your telemetry setting in vscode.dev or desktop) upon successful connection.

## Common Questions

### Is the VS Code Server designed for multiple users to access the same remote instance?

No, an instance of the server is designed to be accessed by a single user.

### Can I host the VS Code Server as a service?

No, hosting it as a service is not allowed, as specified in the [VS Code Server license](https://aka.ms/vscode-server-license).

### Is there a list of endpoints the VS Code Server uses?

If you're working in a restricted environment, you may need to ensure the VS Code Server has access to the following endpoints:

* https://code.visualstudio.com/docs/setup/network#_common-hostnames
* https://code.visualstudio.com/docs/remote/ssh#_what-are-the-connectivity-requirements-for-the-vs-code-server-when-it-is-running-on-a-remote-machine-vm

### Can I use the Remote Development Extensions or a dev container with the VS Code Server?

Not at this time.

### Are there any other extension limitations?

Pure UI extensions are not supported when using a web-based instance of VS Code, which you can learn more about in the extension authors [Remote Development](/api/advanced-topics/remote-extensions.md#architecture-and-extension-kinds) guide.

### Are there browser limitations?

While working in the browser, there are certain limitations and configuration steps to consider. You can read more about this in the [VS Code for the Web](/docs/editor/vscode-web.md#additional-browser-setup) documentation.

### How can I keep the VS Code Server up-to-date?

You will get a notification in VS Code when you connect to your remote machine if an update is available, and you'll be able to update directly through this notification.

### I see an error about keyring storage. What should I do?

Settings Sync requires authentication against a Settings Sync server. The corresponding secret is persisted on the server. This requires to set up a keyring on the server. When the keyring is not set up, the VS Code Server falls back to an in-memory secret stored on the server. In this case, secrets are only persisted during the lifetime of the server.

### Where can I provide feedback or report an issue?

If you have any issues or feedback, please file an issue in the [VS Code Remote GitHub repo](https://github.com/microsoft/vscode-remote-release/issues). When filing an issue, include verbose logging, which you can enable by launching the VS Code Server with the `-v` flag: `code -v tunnel`.

You may filter just for VS Code Server issues with the [`code-server` label](https://github.com/microsoft/vscode-remote-release/issues?q=is%3Aissue+is%3Aopen+label%3Acode-server).

### Is there a limit to the number of remote machines I can connect to?

Right now, you can have 10 remote machines registered with the VS Code Server. If you'd like to connect to a new remote machine, and already have 10 others registered, the CLI will pick a random unused tunnel and delete it. Please note this limit is subject to change.
