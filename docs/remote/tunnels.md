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

You can choose from two paths to enable tunneling:
* Enable tunneling through the VS Code UI
* Run the `tunnel` command in the `code` CLI

We'll describe these two paths in the sections below.

> **Note:** Both paths above result in the same tunneling access – you may use whichever path works best for you. The CLI is a great choice if you don’t want to install the full VS Code desktop on your remote machine.

### VS Code UI

1. Open VS Code on the machine where you'd like to turn on tunnel access

2. In the VS Code Account menu, select the option to **Turn on Remote Tunnel Access**, as demonstrated in the image below. You may also open the Command Palette (`F1`) in VS Code and run the command **Remote Tunnels: Turn on Remote Tunnel Access...**.

![Turn on Remote Tunnel Access via the VS Code Account menu](./images/tunnels/tunnel-access.png)

3. You'll be prompted to log into GitHub. Once logged in, a tunnel will start up on your current machine, and you'll be able to connect to this machine remotely.

![Prompt that remote tunnel access is enabled](./images/tunnels/tunneling-enabled.png)

4. You can now connect to this machine remotely!

In a local machine of your choice, you may connect to this machine:

* You can open the vscode.dev link from the notification
* Or, you may open any VS Code instance (web or desktop), run the command **Remote Tunnels: Connect to Tunnel...**, and select a remote machine where you've enabled tunneling or installed the VS Code Server

You can also view your remote machines in the Remote Explorer, which you may access through the command **Remote Explorer: Focus on Remote View**:

![Remote Explorer view with Tunnels](./images/tunnels/tunneling-remote-explorer.png)

### `code` CLI

As an alternative to enabling tunneling through the UI steps above, you may create and use tunnels through the `code` CLI.

1. Install the `code` CLI on a remote machine you'd like to develop against locally. The CLI establishes a tunnel between a VS Code client and your remote machine. Tunneling, also known as port forwarding, securely transmits data from one network to another.

You have a couple of options to install the CLI:
* It's automatically included in your existing VS Code installation – no additional install or setup required if you have VS Code installed already
* Alternatively, you can grab the CLI through a [standalone install](https://code.visualstudio.com/#alt-downloads) on our download page, which is separate from a VS Code desktop installation:

![VS Code download options with CLI highlighted](./images/tunnels/tunneling-download.png)

2. Launch a secure tunnel with the command: `code tunnel`

3. You'll be provided a device code and URL to authenticate your GitHub account into the secure tunneling service:

``` bash
Please enter the code 7644-1186 on https://github.com/login/device
```

Authenticate into the tunneling service by entering the device code at the provided URL.

After authenticating, you'll be able to connect to and develop against this remote machine from anywhere!

#### Connecting with the Remote Tunnels extension

You have 2 options for connecting to your remote machine:

1. Use the vscode.dev link that's printed in your remote machine when you launch a tunnel. This vscode.dev instance will automatically have the Remote Tunnels extension installed.
2. Start in VS Code (desktop or web) and install the [Remote Tunnels extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-server). You may then connect to existing remote machines from your local VS Code instance via the command in the Command Palette (`F1`): `Remote-Tunnels: Connect to Tunnel...`.

![VS Code Command Palette with remote machines listed](images/vscode-server/remote-servers.png)

### Using the Remote Tunnels extension

Like the other Remote Development Extensions, the name of your remote machine will be listed in the lower left green remote indicator. Clicking on this indicator is another way to explore Remote Tunnels commands, along with options to close your remote connection or install desktop VS Code.

![VS Code remote indicator connected to a remote tunnel](images/vscode-server/remote-indicator-server.png)

You can also view your existing remote machines in the Remote Explorer view, which you can display with the command **View: Show Remote Explorer**.

## Common questions

### What is the relationship between the Remote Tunnels extension, the VS Code Server, and Remote Development in VS Code?

Visual Studio Code [Remote Development](./remote-overview.md) allows you to use a container, remote machine, or the Windows Subsystem for Linux (WSL) as a full-featured development environment.

Visual Studio Code Remote Development allows your local VS Code installation to transparently interact with source code and runtime environments on other machines (whether virtual or physical) by moving the execution of certain commands to a "remote server", aka the VS Code Server. The VS Code Server is quickly installed by VS Code when you connect to a remote endpoint and can host extensions that interact directly with the remote workspace, machine, and file system.

We've released this VS Code Server backend component as a service you can run yourself (which you may read more about in [its documentation](./vscode-server.md)), rather than it being solely installed and managed by the Remote Development extensions.

Accessing the VS Code Server involves a few components:

* The VS Code Server: Backend server that makes VS Code remote experiences possible.
* [Remote Tunnels extension](./tunnels.md): Extension that facilitates the connection to the remote machine, where you have an instance of the server running.

### As an extension author, what do I need to do?

The VS Code extension API abstracts away local/remote details so most extensions will work without modification. However, given extensions can use any node module or runtime they want, there are situations where adjustments may need to be made. We recommend you test your extension to be sure that no updates are required. See [Supporting Remote Development](../../api/advanced-topics/remote-extensions.md) for details.

### TODO: Usage limits