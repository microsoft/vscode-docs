---
Order: 6
Area: remote
TOCTitle: VS Code Server
PageTitle: Visual Studio Code Server
ContentId: d750ab6d-82c2-4e64-8fbb-7888e1374381
MetaDescription: Using Visual Studio Code Server
DateApproved: 7/7/2022
---
# Visual Studio Code Server

The Visual Studio Code Server is a service you can run on a remote development machine, like your desktop PC or a virtual machine (VM). It allows you to securely connect to that remote machine from anywhere through a vscode.dev URL, without the requirement of SSH.

## What is the VS Code Server?

In VS Code, we want users to seamlessly leverage the environments that make them the most productive. The [VS Code Remote Development extensions](/docs/remote/remote-overview.md) allow you to work in the Windows Subsystem for Linux (WSL), remote machines via SSH, and dev containers directly from VS Code. These extensions install a server on the remote environment, allowing local VS Code to smoothly interact with remote source code and runtimes.

We are now providing a standalone "VS Code Server," which is a service built off the same underlying server used by the remote extensions, plus some additional functionality, like an interactive CLI and facilitating secure connections to vscode.dev.

![vscode.dev connected to the VS Code Server](images/vscode-server/server-connected.png)

### A preview of a larger journey

The VS Code Server is currently a private preview. In this early preview, the `code-server` CLI is distinct from the `code` CLI [you use today](/docs/editor/command-line.md#launching-from-command-line) to launch the desktop VS Code, to install extensions, and more (run `code -h` from the terminal to review the possible commands).

This is just the first step along the path towards a fully unified `code` CLI that lets you manage both the desktop and the server.

## Architecture

The VS Code Server's CLI establishes a tunnel between a VS Code client (vscode.dev) and your remote machine. Tunneling, also known as port forwarding, securely transmits data from one network to another.

![The VS Code Server architecture](images/vscode-server/server-arch.png)

The VS Code Server experience includes a few components:

* The VS Code Server: Backend server that makes VS Code remote experiences possible, plus a CLI that makes it easy to install, update, manage, and connect to the server.
* Remote-Server extension: Automatically loaded in your local VS Code client, it facilitates the connection to the remote machine.

## Scenarios

The VS Code Server allows you to use VS Code in new ways, such as:

* Developing on a remote machine where SSH support may be limited, or you need web-based access.
* Developing on a machine that doesn't support the installation of VS Code desktop, such as an iPad / tablet or Chromebook.
* Experiencing the client-side security benefit that all code can be executed in the browser sandbox.

Continue reading to learn how to get started with the VS Code Server.

## Quick Start

As the service that you use to securely connect to the VS Code Server is in private preview, you'll need to request access through a [signup form](https://aka.ms/vscode-server-signup). You'll receive an email, hopefully only within a few weeks, once you can start using the service.

At that point, here are step-by-step instructions to quickly get up and running:

1. Install the VS Code Server on your remote machine. You can install and host it in a machine on-premises or in the cloud, as long as it meets the necessary [system requirements](/docs/remote/linux.md).

There are different install commands for different architectures:

**Linux or macOS:**

```bash
wget -O- https://aka.ms/install-vscode-server/setup.sh | sh
```

**Windows (x64):**

Run the following commands in a non-elevated PowerShell. You may need to restart your terminal for the PATH changes to apply.

```bash
New-Item "${HOME}\.vscode-server-launcher\bin" -Force -ItemType "directory"
Invoke-WebRequest "https://aka.ms/vscode-server-launcher/x86_64-pc-windows-msvc" -OutFile "${HOME}\.vscode-server-launcher\bin\code-server.exe"
[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path", "User") + ";${HOME}\.vscode-server-launcher\bin", "User")
```

**Windows (ARM):**

Run the following commands in a non-elevated PowerShell. You may need to restart your terminal for the PATH changes to apply.

```bash
New-Item "${HOME}\.vscode-server-launcher\bin" -Force -ItemType "directory"
Invoke-WebRequest "https://aka.ms/vscode-server-launcher/aarch64-pc-windows-msvc" -OutFile "${HOME}\.vscode-server-launcher\bin\code-server.exe"
[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path", "User") + ";${HOME}\.vscode-server-launcher\bin", "User")
```

2. Start the VS Code Server by running the following in a remote terminal:

```bash
code-server
```

3. Your remote machine will communicate with vscode.dev through a secure tunnel, which allows you to connect to your computer from vscode.dev, no matter what network you're on.

You'll be provided a device code and URL to authenticate your GitHub account into the VS Code Server's secure tunneling service.

![GitHub auth prompt in the VS Code Server CLI](images/vscode-server/cli-auth.png)

Authenticate into the tunneling service by entering the device code at the provided auth URL.

4. If this is your first time launching the VS Code Server on this remote machine, you'll be prompted to enter a machine name. The CLI will suggest a fun default "adjective-noun" name (examples shown below), which you can choose to accept too.

![Example adjective-noun name for the remote](images/vscode-server/server-name.png)

5. After authenticating and providing a machine name, the CLI spins up a server instance and generates a vscode.dev URL. To connect to your remote machine, you can open this URL on any device.

> **Note:** You can also connect to your remote machine directly from vscode.dev: Open the command palette (`F1`) in vscode.dev and run the command **Remote Server: Connect to Remote**.

Congratulations, you've successfully installed and run the VS Code Server! The connection is fully established once you visit the generated vscode.dev link. Your remote machine's files should be present in the VS Code Explorer, and you can start coding against it from vscode.dev.

## Things to try

### Licensing and other commands

Upon first run of the VS Code Server, you'll be prompted to accept the terms of the license. You can view the license for the VS Code Server [here](https://aka.ms/vscode-server-license).

```bash
"Do you accept the terms in the License Agreement (Y/n)?"
```

You can explore the CLI's other commands by running `code-server -h`. One of the many things you can do is automatically accept the license, by launching with `--accept-server-license-terms`.

![The VS Code Server help commands](images/vscode-server/server-help.png)

### Extension commands

As with the VS Code Server's CLI, the Remote-Server extension in VS Code has additional commands you can explore by opening the Command Palette (`F1`) in VS Code and typing **Remote Server**. Like the other Remote Development Extensions, the name of your remote machine will be listed in the lower left green remote indicator. Clicking on this indicator is another way to explore server commands, along with options to close your remote connection or install desktop VS Code.

![VS Code remote indicator connected to a remote server](images/vscode-server/remote-indicator-server.png)

**Remote Server: Connect to Remote...** allows you to connect to existing remote machines right from your local VS Code instance, rather than grabbing the vscode.dev link in the remote terminal. You can connect to a remote machine as long as the server is still running on it.

![VS Code command palette with remote servers listed](images/vscode-server/remote-servers.png)

You can also view your existing remote machines in the Remote Explorer view (which you can display with the command **View: Show Remote Explorer**).

## Telemetry

If you want to disable telemetry, you can pass in `--disable-telemetry` when launching the VS Code Server, `code-server serve --disable-telemetry`. Alternatively, if you would like to specify an initial telemetry level, such as only collecting errors, you can pass in `--telemetry-level` followed by the level (for example, `error`).

If telemetry is not disabled via the CLI, the VS Code Server will begin respecting the client telemetry settings (your telemetry setting in vscode.dev) upon successful connection.

## Common Questions

### How can I get access to the VS Code Server?

The VS Code Server is a private preview, so you'll need to request access through its [signup form](https://aka.ms/vscode-server-signup). It may take a few weeks to get access, and you'll receive an email once you have access and can start using it.

### Is the VS Code Server designed for multiple users to access the same remote instance?

No, an instance of the server is designed to be accessed by a single user.

### Can I host VS Code / the VS Code Server myself?

In the quick start, we ran the VS Code Server with `code-server`, which generated a vscode.dev link connected to your remote machine. The connection was facilitated by the VS Code Server's secure tunneling service. You can achieve the same experience by running `code-server serve`.

If your scenario has other requirements, such as needing to use a custom domain (not vscode.dev), or a security policy that blocks the tunneling service, you can use a different command to run the VS Code Server: `code-server serve-local`.

This will allow you to host VS Code's web bits yourself. It will install the VS Code web UI on your remote machine and generate a localhost URL.

We highly recommend using `serve` mode for most scenarios as it automatically addresses challenges that may be present with `serve-local`. For instance, there are as security considerations with `serve-local` like:

* Don't use HTTP remotely: always use HTTPS.
* You may need to configure TLS / SSL on your remote machine.

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

### Is there a limit to the number of remote machines I can connect to?

Right now, you can only have 10 remote machines actively running the VS Code Server. If you'd like to connect to a new remote machine, and already have 10 others running, you'll need to stop the server on one of your other machines.

### How can I keep the VS Code Server up-to-date?

You will get a notification in vscode.dev when you connect to your remote machine if an update is available, and you'll be able to update directly through this notification.

### Will my app's ports be forwarded automatically?

Beyond the automatic tunnel creation from your remote machine to vscode.dev, there is not additional port forwarding at this time.

### I see an error about keyring storage. What should I do?

Settings Sync requires authentication against a Settings Sync server. The corresponding secret is persisted on the server. This requires to set up a keyring on the server. When the keyring is not set up, the VS Code Server falls back to an in-memory secret stored on the server. In this case, secrets are only persisted during the lifetime of the server.

If you're using `serve-local` mode, you can run the following:

```bash
# Get gnome-keyring
apt update && apt install -y gnome-keyring

# Get the VS Code Server
# < Uncomment this line and replace it with an install command from above quick start >

# Run a dbus session, which unlocks the gnome-keyring and runs the VS Code Server inside of it
dbus-run-session -- sh -c "(echo 'somecredstorepass' | gnome-keyring-daemon --unlock) && code-server serve-local --host 0.0.0.0"
```

### How do I uninstall the VS Code Server?

Run `code-server uninstall`.

### Where can I provide feedback or report an issue?

If you have any issues or feedback, please file an issue in the [VS Code Remote GitHub repo](https://github.com/microsoft/vscode-remote-release/issues). When filing an issue, include verbose logging, which you can enable by launching the VS Code Server with the `-v` flag: `server-launcher -v serve`.
