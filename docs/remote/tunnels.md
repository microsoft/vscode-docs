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

Tunneling, also known as port forwarding, securely transmits data from one network to another.

No source code needs to be on your local machine to gain these benefits since the extension runs commands and other extensions directly on the remote machine.

![Architecture](images/vscode-server/server-arch-latest.png)

This lets VS Code provide a **local-quality development experience** - including full IntelliSense (completions), code navigation, and debugging - **regardless of where your code is hosted**.

## Getting Started

You have two paths to work with tunnels:
* Run the `tunnel` command in the [`code` CLI](../editor/command-line.md#create-remote-tunnel)
* Enable tunneling through the VS Code UI

Both of these paths result in the same tunneling functionality – you may use whichever works best for you. The CLI is a great option if you can't install the full VS Code Desktop on your remote machine. The UI is a great option if you're already doing some work in VS Code and would then like to enable tunneling for your current machine.

We'll describe both paths in the sections below.

### `code` CLI

You may create and use tunnels through the [`code` CLI](../editor/command-line.md).

1. Install the `code` CLI on a remote machine you'd like to develop against locally. The CLI establishes a tunnel between a VS Code client and your remote machine.

The CLI is automatically built-in to VS Code Desktop – no additional setup required.

Alternatively, you can grab the CLI through a [standalone install](https://code.visualstudio.com/#alt-downloads) on our download page, which is separate from a VS Code Desktop installation:

![VS Code download options with CLI highlighted](./images/tunnels/tunneling-download.png)

2. Create a secure tunnel with the command: `code tunnel`

This command downloads and starts the VS Code Server on this machine and then creates a tunnel to it.

3.	This CLI will output a vscode.dev URL tied to this remote machine, such as `https://vscode.dev/tunnel/<machine_name>/<folder_name>`. You can open this URL on a machine of your choosing

4.	If opening a vscode.dev URL for the first time on this machine, you'll be prompted to log into your GitHub account at a `https://github.com/login/oauth/authorize...` URL. This authenticates you to the tunneling service to ensure you have access to the right set of remote machines.

### VS Code UI

1. Open VS Code on the remote machine where you'd like to turn on tunnel access

2. In the VS Code Account menu, select the option to **Turn on Remote Tunnel Access**, as demonstrated in the image below. You may also open the Command Palette (`F1`) in VS Code and run the command **Remote Tunnels: Turn on Remote Tunnel Access...**.

![Turn on Remote Tunnel Access via the VS Code Account menu](./images/tunnels/tunnel-access.png)

3. You'll be prompted to log into GitHub. Once logged in, a tunnel will start up on your current machine, and you'll be able to connect to this machine remotely.

![Prompt that remote tunnel access is enabled](./images/tunnels/tunneling-enabled.png)

4. In a local machine of your choice, you may open the vscode.dev link from the notification above and start coding!

### Using the Remote Tunnels extension

The vscode.dev instances you open through the `code` CLI or VS Code UI come with the Remote Tunnels extension preinstalled.

If you're already working in VS Code (desktop or web) and would like to connect to a remote tunnel, you can install and use the Remote Tunnels extension directly. Once you install the extension, open the Command Palette (`F1`) and run the command **Remote Tunnels: Connect to Tunnel**. You'll be able to connect to any remote machines with an active tunnel.

You can also view your remote machines in the Remote Explorer, which you may focus on through the command **Remote Explorer: Focus on Remote View**:

![Remote Explorer view with Tunnels](./images/tunnels/tunneling-remote-explorer.png)

Like the other Remote Development Extensions, the name of your remote machine will be listed in the lower left green remote indicator. Clicking on this indicator is another way to explore Remote Tunnels commands, along with options to close your remote connection or install desktop VS Code.

![VS Code remote indicator connected to a remote tunnel](images/vscode-server/remote-indicator-server.png)

## Common questions

### What is the relationship between the Remote Tunnels extension, the VS Code Server, and Remote Development in VS Code?

Visual Studio Code [Remote Development](./remote-overview.md) allows you to use a container, remote machine, or the Windows Subsystem for Linux (WSL) as a full-featured development environment.

Visual Studio Code Remote Development allows your local VS Code installation to transparently interact with source code and runtime environments on other machines (whether virtual or physical) by moving the execution of certain commands to a "remote server", aka the VS Code Server. The VS Code Server is quickly installed by VS Code when you connect to a remote endpoint and can host extensions that interact directly with the remote workspace, machine, and file system.

We've released this VS Code Server backend component as a service you can run yourself (which you may read more about in [its documentation](./vscode-server.md)), rather than it only being solely installed and managed by the Remote Development extensions.

Accessing the VS Code Server involves a few components:

* The VS Code Server: Backend server that makes VS Code remote experiences possible.
* [Remote Tunnels extension](./tunnels.md): Extension that facilitates the connection to the remote machine, where you have an instance of the server running.

### As an extension author, what do I need to do?

The VS Code extension API abstracts away local/remote details so most extensions will work without modification. However, given extensions can use any node module or runtime they want, there are situations where adjustments may need to be made. We recommend you test your extension to be sure that no updates are required. See [Supporting Remote Development](../../api/advanced-topics/remote-extensions.md) for details.

### How do I remove a tunnel or machine?

If you'd like to stop a tunnel you're running via the CLI, you may use `Ctrl + C` to end the active connection. If you've enabled tunneling through the VS Code UI, you may run the command **Remote Tunnels: Turn of Remote Tunnel Access...**.

You may remove a machine's association with tunneling through the `code tunnel unregister` CLI command, or right-clicking on the machine and selecting "unregister" in the VS Code Remote Explorer UI.