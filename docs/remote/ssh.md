---
Order: 2
Area: remote
TOCTitle: SSH
PageTitle: Developing on Remote Machines using SSH and Visual Studio Code
ContentId: 42e65445-fb3b-4561-8730-bbd19769a160
MetaDescription: Developing on Remote Machines or VMs using Visual Studio Code Remote Development and SSH
DateApproved: 4/11/2019
---
# Remote Development using SSH

The **Visual Studio Code Remote - SSH** extension allows you to open a remote folder on any remote machine, virtual machine, or container with a running SSH server and take full advantage of VS Code's feature set. Once connected to a server, you can interact with files and folders anywhere on the remote filesystem.

Given **no source code needs to be on your local machine**, this approach provides dramatic performance and fidelity benefits over using network shares or synchronizing files.

![SSH Architecture](images/ssh/architecture-ssh.png)

The result is that VS Code can provide a **local-quality development experience** including full IntelliSense (completions), code navigation, and debugging, **regardless of where your code is hosted**.

## Getting started

### Installation

To get started you need to:

1. Install an [OpenSSH compatible SSH client](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client) if one is not already present.

    > **Note:** PuTTY is not supported on Windows since a `ssh` command must be in the path.

2. Install [Visual Studio Code Insiders](https://code.visualstudio.com/insiders/).

3. Install the [Remote Development](https://aka.ms/vscode-remote/download/extension) extension pack.

4. [Optional] If your server requires multi-factor authentication, set `"remote.SSH.showLoginTerminal": true` in `settings.json` and enable the `ControlMaster` SSH feature. [See here for details](/docs/remote/troubleshooting.md#enabling-alternate-ssh-authentication-methods).

### Connect to a remote host

> **Note:** The remote host must be running a 64-bit Linux-based OS.

Visual Studio Code uses [SSH configuration files](https://linux.die.net/man/5/ssh_config) and requires [SSH key based authentication](https://www.ssh.com/ssh/public-key-authentication) to connect to your host. If you do not have a host yet, you can create a [Linux VM on Azure](https://docs.microsoft.com/azure/virtual-machines/linux/quick-create-portal?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json).

To get started, follow these steps:

1. First, **configure key based authentication** on the host you plan to use. If you are new to SSH or are running into trouble, see [here for additional information](/docs/remote/troubleshooting.md#configuring-key-based-authentication) on setting this up. If you followed the Azure VM tutorial, you can skip this step.

    > **PuTTY Tip:** If you've already set up key based authentication using PuTTYGen, you will need to convert your private key for use in other OpenSSH clients. See [here for details](/docs/remote/troubleshooting.md#reusing-a-key-generated-in-puttygen).

2. Run **Remote-SSH: Connect to Host...** from the Command Palette (`kbstyle(F1)`) and enter the host and your user on the host in the input box as follows: `user@hostname`.

    ![Illustration of user@host input box](images/ssh/ssh-user@box.png)

    > **Note:** If you see errors about bad SSH file permissions when connecting, [see here for details](/docs/remote/troubleshooting.md#fixing-ssh-file-permission-errors) on the correct settings.

3. After a moment, VS Code will connect to the SSH server and set itself up. VS Code will keep you up to date using a progress notification and you can see a detailed log in the `Remote - SSH` output channel.

4. After you are connected, you'll be in an empty window. You can then open a folder or workspace on the remote machine using **File > Open...** or **File > Open Workspace...**

5. After a moment, the folder or workspace you selected will open. Install **any extensions** you want to use on this host from the Extensions view.

### Remembering hosts you connect to frequently

If you have a few hosts you use frequently, you can add them to an SSH config file so they automatically appear in the host dropdown. Run **Remote-SSH: Open Configuration File...** and add the host to the file using the [SSH config file format](https://linux.die.net/man/5/ssh_config).

For example, here are two example hosts:

```text
Host example-remote-linux-machine
    User your-user-name-here
    HostName host-fqdn-or-ip-goes-here

Host example-remote-linux-machine-with-identity-file
    User your-user-name-on-host
    HostName another-host-fqdn-or-ip-goes-here
    IdentityFile ~/.ssh/id_rsa-remote-ssh
```

Set the `"remote.SSH.configFile"` property in `settings.json` if you want to use a different config file than those listed.

## Managing extensions

VS Code runs extensions in one of two places: locally on the UI / client side, or remotely on the SSH host. While extensions that affect the VS Code UI, like themes and snippets, are installed locally, most extensions will reside on the SSH host. This ensures you have smooth experience and allows you to install any needed extensions for a given workspace on a SSH host from your local machine. This way, you can pick up exactly where you left off, from a different machine complete with your extensions.

If you search for and install an extension in the Extensions view, it will automatically be installed in the correct location. Once installed, you can tell where an extension is installed based on the category it is in. There will be a category for your remote SSH host and a **Local - Installed** category.

![Workspace Extension Category](images/ssh/ssh-installed-remote-indicator.png)

![Local Extension Category](images/common/local-installed-extensions.png)

> **Note:** If you are an extension author and find that your extension is not working properly or installs in the wrong place, see the article on [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

Local extensions that actually need to run remotely will appear **Disabled** in the **Local - Installed** category. You can click the **Install** button on any of them you want to install on your remote host.

![Disabled Extensions w/Install Button](images/ssh/ssh-disabled-extensions.png)

### "Always installed" extensions

If there are extensions that you would like to always have installed on any SSH host, you can specify which ones using the `remote.SSH.extensions` property in `settings.json`. For example, if you wanted to install the [GitLens](https://marketplace.visualstudio.com/itemdetails?itemName=eamodio.gitlens) and [Resource Monitor](https://marketplace.visualstudio.com/itemdetails?itemName=mutantdino.resourcemonitor) extensions, specify their extension IDs as follows:

```json
"remote.SSH.defaultExtensions": [
    "eamodio.gitlens",
    "mutantdino.resourcemonitor"
]
```

### Advanced: Forcing an extension to run locally / remotely

Extensions are typically designed and tested for use in one side or the other, not both. However, you can force an extension to run in a particular location in your `settings.json` file. For example, the setting below will force the Azure Cosmos DB extension on the UI side (instead of its Workspace default) and the Debugger for Chrome on the Workspace side (instead of its UI default):

```json
"remote.extensionKind": {
    "ms-azuretools.vscode-cosmosdb": "ui",
    "msjsdiag.debugger-for-chrome": "workspace"
}
```

Typically, this should only be used for testing unless otherwise noted in the extension's documentation since it **can break extensions**. See the article on [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

## Forwarding a port / creating SSH tunnel

Sometimes when developing, you may need to access a port on a remote machine that is not publicly exposed. There are two ways to do this using an [SSH tunnel](https://www.ssh.com/ssh/tunneling/example) that "forwards" the desired remote port to your local machine.

### Temporarily forwarding a port

If you want to **temporarily forward** a new port for the duration of the session, run the **Remote-SSH: Forward Port from Active Host...** command when connected.

After entering a port number, a notification will tell you the localhost port you should use to access the remote port. For example, if you forwarded an HTTP server listening on port 3000, the notification may tell you that it was mapped to port 4123 on localhost. You can then connect to this remote HTTP server using http://localhost:4123.

### Always forwarding a port

If you have ports that you **always want to forward**, you can use the the `LocalForward` directive in the same SSH config file you created above in [Remembering hosts](#remembering-hosts-you-connect-to-frequently).

For example, if you wanted to forward ports 3000 and 27017, you could update the file as follows:

```text
Host remote-linux-machine
    User myuser
    HostName remote-linux-machine.mydomain
    LocalForward 127.0.0.1:3000 127.0.0.1:3000
    LocalForward 127.0.0.1:27017 127.0.0.1:27017
```

## Opening a terminal on a remote host

Opening a terminal on the remote host from VS Code is simple. Once connected, **any terminal window** you open in VS Code (**Terminal > New Terminal**) will automatically run on the remote host rather than locally.

You can also use the `code-insiders` CLI from this same terminal window to perform a number of operations such as opening a new file or folder on the remote host. Type `code-insiders --help` to see all the options available from the command line.

![Using the code CLI](images/ssh/code-command-in-terminal.png)

## Debugging on the SSH host

Once you are connected to a remote host, you can use VS Code's debugger in the same way you would when running the application locally. For example, if you select a launch configuration in `launch.json` and start debugging (`kbstyle(F5)`), the application will start on remote host and attach the debugger to it.

See the [debugging](/docs/editor/debugging.md) documentation for details on configuring VS Code's debugging features in `.vscode/launch.json`.

## SSH host specific settings

VS Code's local user settings are also reused when you are connected to a SSH host. While this keeps your user experience consistent, you may want to vary some of these settings between your local machine and each host. Fortunately, once you have connected to a host, you can also set host specific settings by running the **Preferences: Open Remote Settings** command from the command palette (`kbstyle(F1)`) or by clicking on the "Remote" tab in the settings editor. These will override any local settings you have in place whenever you connect to the host.

## Known limitations

### Remote - SSH limitations

- Using key based authentication is strongly recommended. Passwords and other tokens entered for [alternate authentication methods](/docs/remote/troubleshooting.md#enabling-alternate-ssh-authentication-methods) are not saved.
- Windows and macOS SSH Hosts are **not** yet supported. (Windows and macOS clients **are** supported.)
- Linux hosts must have Bash (`/bin/bash`), `tar`, and either `curl` or `wget` installed.
- PuTTY is not supported on Windows.
- You cannot drag files out of the File Explorer to your local filesystem to copy them.
- Local proxy settings are not reused on the remote host which can prevent extensions from working unless the appropriate proxy information is configured on the remote host (for example global `HTTP_PROXY` or `HTTPS_PROXY` environment variables with the appropriate proxy information).
- See [here for a list of active issues](https://aka.ms/vscode-remote/ssh/issues) on GitHub that are tagged with SSH.

### Extension limitations

Many extensions will work on remote SSH hosts modification. However, in some cases, certain features may require changes. If you run into an extension issue, [see here for a summary of common problems and solutions](/docs/remote/troubleshooting.md#extensiont-tips) that you can mention to the extension author when reporting the issue.

## Common questions

### How do I setup a SSH client on ...?

See [Installing a supported SSH client](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client) for details.

### How do I setup a SSH server on ...?

See [Installing a supported SSH server](/docs/remote/troubleshooting.md#installing-a-supported-ssh-server) for details on setting up a SSH server for your host.

### Can I sign into my SSH server with another/additional authentication mechanism like a password?

Yes, with some additional configuration. See [Enabling alternate SSH authentication methods](/docs/remote/troubleshooting.md#enabling-alternate-ssh-authentication-methods) for information on the correct settings.

### How do I fix SSH errors about "bad permissions"?

See [Fixing SSH file permission errors](/docs/remote/troubleshooting.md#fixing-ssh-file-permission-errors) for details on resolving these types of errors.

### What Linux packages / libraries need to be installed on remote SSH hosts?

Most Linux distributions will not require additional dependency installation steps. Linux hosts need to have Bash (`/bin/bash`), `tar`, and either `curl` or `wget` installed which can be missing from some stripped down distributions.

### What are the connectivity requirements for the VS Code Server when it is running on a remote machine / VM?

The VS Code Server requires outbound HTTPS (port 443) connectivity to `update.code.visualstudio.com` and `marketplace.visualstudio.com`. All other communication between the server and the VS Code client is accomplished through an authenticated, secure, SSH tunnel.

### Can I use VS Code when I only have SFTP/FTP filesystem access to my remote host (no shell access)?

Some cloud platforms only provide remote filesystem access for developers rather than direct shell access. VS Code Remote Development was not designed with this use case in mind since it negates the performance and user experience benefits.

However, this use case can typically be handled by combining extensions like [SFTP](https://marketplace.visualstudio.com/items?itemName=liximomo.sftp) with remote debugging features for [Node.js](/docs/nodejs/nodejs-debugging.md#remote-debugging), [Python](/docs/python/debugging.md#remote-debugging), [C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp), or others.

### As an extension author, what do I need to do?

The VS Code extension API abstracts many extensions away from any changes so they work without modification. However, given extensions can use any node module or runtime they want, there are situations where adjustments may need to be made. We recommend you test your extension to be sure that no updates are required. See the article on [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

### Questions or feedback

- See [Tips and Tricks](/docs/remote/troubleshooting.md#ssh-tips) or the [FAQ](/docs/remote/faq.md).
- Search on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode).
- Add a [feature request](https://aka.ms/vscode-remote/feature-requests) or [report a problem](https://aka.ms/vscode-remote/issues/new).
- Contribute to [our documentation](https://github.com/Microsoft/vscode-docs) or [VS Code itself](https://github.com/Microsoft/vscode).
- See our [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) guide for details.
