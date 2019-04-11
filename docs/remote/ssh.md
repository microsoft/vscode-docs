---
Order: 2
Area: remote
TOCTitle: SSH
PageTitle: Developing on Remote Machines using SSH and Visual Studio Code
ContentId: 42e65445-fb3b-4561-8730-bbd19769a160
MetaDescription: Developing on Remote Machines or VMs using Visual Studio Code Remote Development and SSH
DateApproved: 2/25/2019
---
# Developing using SSH

**Visual Studio Code Remote - SSH extension** allows you to open a remote folder on any remote machine, VM, or container with a running SSH server and take full advantage of VS Code's feature set. The SSH extension supports a large number of scenarios given nearly every desktop and server operating system has an optional SSH server that can be configured. Once connected to a server, you can interact with files, folders, and workspaces sitting anywhere on the remote filesystem and install extensions that will be available from any machine you use to connect to it.

When using the capability, VS Code selectively runs certain extensions on the remote machine to optimize your experience. Given **no source code needs to be on your local machine** to use the capability, the approach provides dramatic performance and fidelity benefits over using network shares or synchronizing files.

![SSH Architecture](images/ssh/architecture-ssh.png)

The result is that VS Code can provide a **local-quality development experience** including full IntelliSense, debugging, and more **regardless of where your code is hosted**.

## Getting started

### Installation

To get started you need to:

1. Install a [supported SSH client](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client).

    > **Note:** PuTTY is not supported on Windows since an [OpenSSH compatible](troubleshooting.md#installing-a-supported-ssh-client) `ssh` command must be in the path.

2. Install [Visual Studio Code - Insiders](https://code.visualstudio.com/insiders/)

    > **Dogfooding Note:** You currently need to install a private build called [Code-WSL from here](https://aka.ms/vscode-remote/download) by clicking on the latest version for your OS with the  `Released` column checked. This version can live side-by-side with other VS Code versions. However, we will be sun-setting this build soon and replacing it with VS Code - Insiders.

3. Install the **[Remote Development](https://aka.ms/vscode-remote/download/extension)** extension pack

    > **Dogfooding Note (UPDATED):** Set up the dogfooding version of the Remote Development extensions as follows:
    > 1. Sign into a Microsoft associated GitHub account from a browser and download and manually install the latest VSIX of the [Selfhost Remote Extensions Updater](https://aka.ms/vscode-remote/download/extension) in Code - WSL.
    > 2. The first time the Selfhost Remote Extensions starts, you will be prompted to paste in a [GitHub access token](https://github.com/settings/tokens) so that it can download and auto-update private versions of the extensions. You only need to give "Repo" scope and this token will not be required once we release.

4. [Optional] If your server requires multi-factor authentication, set `"remote.SSH.showLoginTerminal": true` in `settings.json` and enable the `ControlMaster` SSH feature. [See here for details](#troubleshooting.md#enabling-alternate-ssh-authentication-methods).

### Connect to a remote host

> **Note:** Windows SSH Servers are *not* yet supported (though Windows clients *are* supported).

Visual Studio Code uses **[SSH configuration files](https://linux.die.net/man/5/ssh_config)** and requires **[SSH key based authentication](https://www.ssh.com/ssh/public-key-authentication)** to connect to your host. To get started, follow these steps:

1. First, **configure key based authentication** on the host you plan to use. If you are new to SSH or are running into trouble, see [here for additional information](/docs/remote/troubleshooting.md#configuring-key-based-authentication) on setting this up.

    > **Azure Linux VM / PuTTY Tip:** If you've already set up key based authentication using PuTTYGen, you will need to convert your private key for use in other OpenSSH clients. See [here for details](/docs/remote/troubleshooting.md#reusing-a-key-generated-in-puttygen).

2. Run **Remote-SSH: New Window...** from the command palette (Cmd/Ctrl+Shift+P) and enter the host and username in the input box as follows: `user@hostname` (on Windows `user@domain@hostname` is also supported).

    ![Illustration of user@host input box](images/ssh/ssh-user@box.png)

3. After a moment, VS Code will connect to the SSH server and set itself up. VS Code will keep you up to date using a progress notification and you can see a detailed log in the `Dev Containers` terminal window.

    > **Note:** If you see errors about bad SSH file permissions when connecting, [see here for details](/docs/remote/troubleshooting.md#fixing-ssh-file-permission-errors) on the correct settings.

4. After you are connected, you'll see a empty window and you can then open a folder or workspace on the remote machine using **File > Open...** or **File > Open Workspace...**

5. After a moment the folder or workspace you selected will open. Install **any extensions** you want to use on this host from the extension panel.

#### Remembering hosts you connect to frequently

If you have a few hosts you use frequently, you can add them to a SSH config fie so they automatically appear in the host dropdown.

Just run **Remote-SSH: Open SSH Configuration File...** and add the host to the file using the [SSH config file format](https://linux.die.net/man/5/ssh_config). For example:

```
Host example-remote-linux-machine
    User myuser
    HostName remote-linux-machine.mydomain.or.ip

Host example-remote-windows-machine
    User myuser@mydomain
    HostName remote-windows-machine.mydomain.or.ip
```

Set the `"remote.SSH.configFile"` property in `settings.json` if you want to use a different config file than those listed.

## Managing extensions

While "personalization" extensions (along with a few others) install on your local VS Code instance, most installed extensions will reside on a particular remote host. This allows you to install whatever extensions you need for a given task now and jump back later at the exact same place  where you left off - even when connecting from another machine.

You can install additional extensions in on the SSH host at any time by using the extensions panel. VS Code automatically infers whether the extension should be run locally or remotely based on a set of extension characteristics. If you are an extension author and are finding that your extension is not working properly, see [Adding Remote Support to Extensions](/api/advanced-topics/remote-extensions.md) for details on resolving these issues.

### "Always installed" extensions

If there are extensions that you would like to always have installed on any SSH host, you can update the `remote.SSH.extensions` property in `settings.json`. For example, if you wanted to install the [GitLens](https://marketplace.visualstudio.com/itemdetails?itemName=eamodio.gitlens) and [Resource Monitor](https://marketplace.visualstudio.com/itemdetails?itemName=mutantdino.resourcemonitor) extensions, you would specify their extension IDs as follows:

```json
"remote.SSH.defaultExtensions": [
    "eamodio.gitlens",
    "mutantdino.resourcemonitor"
]
```

## Forwarding a port / creating SSH tunnel

Sometimes when developing you may need to access a port on a remote machine that is not publicly exposed. There are two ways to do this using a [SSH tunnel](https://www.ssh.com/ssh/tunneling/example) that "forwards" the desired remote port to your local machine.

### Temporarily forwarding a port

If you want to *temporarily forward* a new port for the duration of the session, run the **Remote-SSH: Forward ports from active SSH Host...** command when connected.

A toast notification will tell tell you the localhost port you should use to connect access the remote port. For example, if you forwarded a HTTP server running port 3000, the toast notification may tell you that it was mapped to port 4123 on localhost. You can then connect to this remote http server using http://localhost:4123.

### Always forwarding a port

If you have ports that you **always want to forward** , you can use the the `LocalForward` directive in the same SSH config file you configured [above](#configure-a-remote-host). For example, if you wanted to forward ports 3000 and 27017 you could update the file as follows:

```
Host remote-linux-machine
    User myuser
    HostName remote-linux-machine.mydomain
    LocalForward 127.0.0.1:3000 127.0.0.1:3000
    LocalForward 127.0.0.1:27017 127.0.0.1:27017
```

## Opening a terminal on a remote host

If you've already connected to a remote host, **any terminal window** you open in VS Code will automatically run remotely. You can also **use the `code` CLI from a remote terminal** to perform a number of operations such as opening a new file or folder on the remote host! Type `code --help` to what is available from the command line.

![Using the code CLI](images/ssh/code-command-in-terminal.png)

## Debugging on the SSH host

Once you are connected to a remote host, you can use VS Code's debugger in the same way you would when running the application locally. For example, the `launch` action will start the application up on the remote host and attach the debugger to it.

See the [debugging](/docs/editor/debugging.md) documentation for details on configuring VS Code's debugging features in `.vscode/launch.json`.

## Known limitations

- Using key based authentication is strongly recommended. Passwords and other tokens entered for [alternate authentication methods](/docs/remote/troubleshooting.md#enabling-alternate-ssh-authentication-methods) are not saved.
- Windows SSH Hosts are **not** yet supported. (Windows clients **are** supported.)
- Linux hosts must have Bash (`/bin/bash`) installed.
- PuTTY is not supported on Windows.
- You cannot drag files out of the file explorer to your local filesystem to copy them.
- Local proxy settings are not reused on the remote host which can prevent extensions from working unless the appropriate proxy information is configured on the remote host (e.g. global `HTTP_PROXY` or `HTTPS_PROXY` environment variables with the appropriate proxy information).
- See [here for a list of active issues](https://aka.ms/vscode-remote/ssh/issues) on GitHub that are tagged with SSH.

## Common questions

### How do I setup a SSH client on ...?

See [here](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client) details on installing supported clients.

### How do I setup a SSH server on ...?

See [here](/docs/remote/troubleshooting.md#installing-a-supported-ssh-server) for details on setting up a SSH server for your host.

### Can I sign into my SSH server with another/additional authentication mechanism like a password?

Yes, with some additional configuration. See [here](/docs/remote/troubleshooting.md#enabling-alternate-ssh-authentication-methods) for information on the correct settings.

### How do I fix SSH errors about "bad permissions"?

See [here](/docs/remote/troubleshooting.md#fixing-ssh-permission-errors) for details on resolving these types of errors.

### Can I use VS Code when I only have SFTP/FTP filesystem access to my remote host (no shell access)?

Some cloud platforms only provide remote filesystem access for developers rather than direct shell access. VS Code Remote Development was not designed with this use case in mind since it negates the performance and user experience fidelity benefits that its model provides.

However, this use case can typically be handled by combining extensions like [SFTP](https://marketplace.visualstudio.com/items?itemName=liximomo.sftp) with remote debugging features for [Node.js](/docs/nodejs/nodejs-debugging.md#remote-debugging), [Python](/docs/python/debugging.md#remote-debugging) [C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp), or others.

### As an extension author what do I need to do?

The VS Code extension API abstracts many extensions away from any changes so they work without modification. However, given extensions can use any node module or runtime they want, there are situations where adjustments may need to be made. We recommend you should test your extension to be sure that no update are required. See [Adding Remote Development Support to Extensions](/api/advanced-topics/remote-extensions.md) for details.

## Reporting Issues

When reporting issues please file them against the https://github.com/Microsoft/vscode-remote/issues repository.
