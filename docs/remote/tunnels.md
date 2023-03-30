---
Order: 7
Area: remote
TOCTitle: Tunnels
PageTitle: Remote Tunnels
ContentId: 5d33c1af-b4e6-4894-aae1-acf95ee3ffa8
MetaDescription: Using the Visual Studio Code Remote Tunnels extension
DateApproved: 3/30/2023
---
# Developing with Remote Tunnels

The Visual Studio Code [Remote - Tunnels](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-server) extension lets you connect to a remote machine, like a desktop PC or virtual machine (VM), via a secure tunnel. You can connect to that machine from a VS Code client anywhere, without the requirement of SSH.

Tunneling securely transmits data from one network to another.

This can eliminate the need for source code to be on your VS Code client machine since the extension runs commands and other extensions directly on the remote machine.

![Architecture](images/vscode-server/server-arch-latest.png)

VS Code can provide a **local-quality development experience** - including full IntelliSense (completions), code navigation, and debugging - **regardless of where your code is hosted**.

## Getting Started

You have two paths to work with tunnels:

* Run the `tunnel` command of the `code` [command-line interface (CLI)](/docs/editor/command-line.md#create-remote-tunnel).
* Enable tunneling through the VS Code Desktop UI.

Both of these paths result in the same tunneling functionality – you can use whichever tooling works best for you. The CLI is a great option if you can't install the full VS Code Desktop on your remote machine. Using the VS Code Desktop UI is convenient if you're already doing some work in VS Code and would then like to enable tunneling for your current machine.

We'll describe both paths in the sections below.

## Using the 'code' CLI

You may create and use tunnels through the `code` [CLI](/docs/editor/command-line.md).

1. Install the `code` CLI on a remote machine you'd like to develop against from a VS Code client. The CLI establishes a tunnel between a VS Code client and your remote machine. The CLI is automatically built into VS Code Desktop – no additional setup required.

    ### Alternative downloads

    Alternatively, you can grab the CLI through a [standalone install](https://code.visualstudio.com/#alt-downloads) on our download page, which is separate from a VS Code Desktop installation:

    ![VS Code download options with CLI highlighted](images/tunnels/tunneling-download.png)

    You can also install and unpack the CLI through the terminal of your remote machine. This may be especially helpful if your remote doesn't have a UI:

    ```bash
    curl -Lk 'https://code.visualstudio.com/sha/download?build=stable&os=cli-alpine-x64' --output vscode_cli.tar.gz

    tar -xf vscode_cli.tar.gz
    ```

    > **Note:** If you're using the standalone or terminal install, the commands in the following section will start with `./code` rather than `code`.

2. Create a secure tunnel with the `tunnel` command:

    ```bash
    code tunnel
    ```

    This command downloads and starts the VS Code Server on this machine and then creates a tunnel to it.

    >**Note:** You will be prompted to accept the server license terms when you first start a tunnel on a machine. You can also pass `--accept-server-license-terms` on the command line to avoid the prompt.

3. This CLI will output a vscode.dev URL tied to this remote machine, such as `https://vscode.dev/tunnel/<machine_name>/<folder_name>`. You can open this URL on a client of your choosing.

4. When opening a vscode.dev URL for the first time on this client, you'll be prompted to log into your GitHub account at a `https://github.com/login/oauth/authorize...` URL. This authenticates you to the tunneling service to ensure you have access to the right set of remote machines.

## Using the VS Code UI

1. Open VS Code on the remote machine where you'd like to turn on tunnel access.

2. In the VS Code Account menu, select the option to **Turn on Remote Tunnel Access**, as demonstrated in the image below. You may also open the Command Palette (`kbstyle(F1)`) in VS Code and run the command **Remote Tunnels: Turn on Remote Tunnel Access...**.

    ![Turn on Remote Tunnel Access via the VS Code Account menu](images/tunnels/tunnel-access.png)

3. You'll be prompted to log into GitHub. Once you're logged in, a tunnel will start up on your current machine, and you'll be able to connect to this machine remotely.

    ![Prompt that remote tunnel access is enabled](images/tunnels/tunneling-enabled.png)

4. In a client of your choice, you may open the vscode.dev link from the notification above and start coding!

>**Note:** The remote machine will only be reachable through a tunnel while VS Code remains running there. Once you exit VS Code it will no longer be possible to tunnel to it until you start VS Code there again or run the `code tunnel` CLI command.

## Remote - Tunnels extension

The vscode.dev instances you open through the `code` CLI or VS Code UI come with the Remote - Tunnels extension preinstalled.

If you're already working in VS Code (desktop or web) and would like to connect to a remote tunnel, you can install and use the [Remote - Tunnels](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-server) extension directly. Once you install the extension, open the Command Palette (`kbstyle(F1)`) and run the command **Remote Tunnels: Connect to Tunnel**. You'll be able to connect to any remote machines with an active tunnel.

You can also view your remote machines in the Remote Explorer, which you may focus on through the command **Remote Explorer: Focus on Remote View**:

![Remote Explorer view with Tunnels](images/tunnels/tunneling-remote-explorer.png)

Like the other Remote Development extensions, the name of your remote machine will be listed in the lower left green remote indicator. Clicking on this indicator is another way to explore Remote Tunnels commands, along with options to close your remote connection or install VS Code Desktop.

![VS Code remote indicator connected to a remote tunnel](images/vscode-server/remote-indicator-server.png)

## Common questions

### What is the relationship between the Remote Tunnels, VS Code Server, and Remote Development?

Visual Studio Code [Remote Development](/docs/remote/remote-overview.md) allows you to use a container, remote machine, or the Windows Subsystem for Linux (WSL) as a full-featured development environment.

Remote Development lets your local VS Code installation transparently interact with source code and runtime environments on other machines (whether virtual or physical) by moving the execution of certain commands to a "remote server", the VS Code Server. The VS Code Server is quickly installed by VS Code when you connect to a remote endpoint and can host extensions that interact directly with the remote workspace, machine, and file system.

We've released this VS Code Server backend component as a service you can run yourself (which you may read more about in [its documentation](/docs/remote/vscode-server.md)), rather than it only being solely installed and managed by the Remote Development extensions.

Accessing the VS Code Server involves a few components:

* The VS Code Server: Backend server that makes VS Code remote experiences possible.
* Remote - Tunnels extension: Extension that facilitates the connection to the remote machine, where you have an instance of the server running.

### As an extension author, what do I need to do?

The VS Code extension API abstracts away local/remote details so most extensions will work without modification. However, given extensions can use any node module or runtime they want, there are situations where adjustments may need to be made. We recommend you test your extension to be sure that no updates are required. See [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

### Can multiple users or clients access the same remote instance simultaneously?

No, an instance of the server is designed to be accessed by one user or client at a time.

### How do I remove a tunnel or machine?

If you'd like to stop a tunnel you're running via the CLI, you may use `kbstyle(Ctrl + C)` to end the active tunnel. If you've enabled tunneling through the VS Code UI, you can run the command **Remote Tunnels: Turn off Remote Tunnel Access...** in VS Code.

You can remove a machine's association with tunneling by running `code tunnel unregister` on that machine. You can also open any VS Code client, select the Remote Explorer view, right-click on the machine you'd like to remove, and select **unregister**.

### How are tunnels secured?

Both hosting and connecting to a tunnel requires authentication with the same Github or Microsoft account on each end. In both cases, VS Code will make outbound connections to a service hosted in Azure; no firewall changes are generally necessary, and VS Code doesn't set up any network listeners.

Once you connect from a remote VS Code instance, an SSH connection is created over the tunnel in order to provide end-to-end encryption. The current preferred cipher for this encryption is AES 256 in CTR mode, and the code that implements this is [open source](https://github.com/microsoft/dev-tunnels).

If you're part of an organization who wants to control access to Remote Tunnels, you can do so by allowing or denying access to the domain `global.rel.tunnels.api.visualstudio.com`.
