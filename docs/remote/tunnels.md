---
Order: 7
Area: remote
TOCTitle: Tunnels
PageTitle: Remote Tunnels
ContentId: d750ab6d-82c2-4e64-8fbb-7888e1374381
MetaDescription: Using the Visual Studio Code Remote Tunnels extension
DateApproved: 10/6/2022
---
# Developing with Remote Tunnels

The Visual Studio Code [Remote Tunnels extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-server) lets you connect to a remote machine, like a desktop PC or virtual machine (VM), via a secure tunnel. You can then securely connect to that machine from anywhere, without the requirement of SSH.

No source code needs to be on your local machine to gain these benefits since the extension runs commands and other extensions directly on the remote machine.

![Architecture](images/vscode-server/server-arch-latest.png)

This lets VS Code provide a **local-quality development experience** - including full IntelliSense (completions), code navigation, and debugging - **regardless of where your code is hosted**.

## Getting Started

You'll need to first create a secure tunnel with the VS Code Server on your remote machine. Then, you can use the Remote Tunnels extension to connect to that remote tunnel.

### Tunnel Setup

1. Install the `code` CLI on your remote machine. The CLI establishes a tunnel between a VS Code client and your remote machine. Tunneling, also known as port forwarding, securely transmits data from one network to another.

```bash
TODO: install command
```

2. Initiative a tunnel with the command: `code tunnel`. Follow the steps to authenticate with your GitHub account.

If you have any questions during this process, you may review the [VS Code Server quickstart](./vscode-server.md#quick-start).

### Connecting with the Remote Tunnels extension

You have 2 options for connecting to your remote machine:

1. Use the vscode.dev link that's printed in your remote machine when you launch a tunnel. This vscode.dev instance will automatically have the Remote Tunnels extension installed.
2. Start in VS Code (desktop or vscode.dev) and install the [Remote Tunnels extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-server). You may then connect to existing remote machines right from your local VS Code instance via the command in the Command Palette (`F1`): `Remote-Tunnels: Connect to Tunnel...`.

![VS Code Command Palette with remote servers listed](images/vscode-server/remote-servers.png)

### Using the Remote Tunnels extension

Like the other Remote Development Extensions, the name of your remote machine will be listed in the lower left green remote indicator. Clicking on this indicator is another way to explore server commands, along with options to close your remote connection or install desktop VS Code.

![VS Code remote indicator connected to a remote server](images/vscode-server/remote-indicator-server.png)

You can also view your existing remote machines in the Remote Explorer view, which you can display with the command **View: Show Remote Explorer**.

## Common questions

### What is the relationship between the Remote Tunnels extension, the VS Code Server, and Remote Development in VS Code?

Visual Studio Code [Remote Development](./remote-overview.md) allows you to use a container, remote machine, or the Windows Subsystem for Linux (WSL) as a full-featured development environment.

Visual Studio Code Remote Development allows your local VS Code installation to transparently interact with source code and runtime environments on other machines (whether virtual or physical) by moving the execution of certain commands to a "remote server". The VS Code Server is quickly installed by VS Code when you connect to a remote endpoint and can host extensions that interact directly with the remote workspace, machine, and file system.

We've now released this VS Code Server backend component as a service you can run yourself, rather than it being solely installed and managed by the Remote Development extensions.

The VS Code Server experience includes a few components:

* The VS Code Server: Backend server that makes VS Code remote experiences possible.
* [Remote Tunnels extension](./tunnels.md): Automatically loaded in your local VS Code client, it facilitates the connection to the remote machine.

### As an extension author, what do I need to do?

The VS Code extension API abstracts away local/remote details so most extensions will work without modification. However, given extensions can use any node module or runtime they want, there are situations where adjustments may need to be made. We recommend you test your extension to be sure that no updates are required. See [Supporting Remote Development](../../api/advanced-topics/remote-extensions.md) for details.