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

**Visual Studio Code Remote - SSH extension** allows you to open a remote folder on any remote machine, VM, or container with a running SSH server and take full advantage of VS Code's feature set. Once connected to a server, you can interact with files and folders anywhere on the remote filesystem.

When using the capability, VS Code runs certain extensions on the remote machine to optimize your experience. Given **no source code needs to be on your local machine**, this approach provides dramatic performance and fidelity benefits over using network shares or synchronizing files.

![SSH Architecture](images/ssh/architecture-ssh.png)

The result is that VS Code can provide a **local-quality development experience** including full IntelliSense (completions), debugging, and more **regardless of where your code is hosted**.

## Getting started

### Installation

To get started you need to:

1. Install an [OpenSSH compatibile SSH client](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client) if one is not already present.

    > **Note:** PuTTY is not supported on Windows since a `ssh` command must be in the path.

2. Install [Visual Studio Code - Insiders](https://code.visualstudio.com/insiders/)

    > **Dogfooding Note (UPDATED)**: Code - WSL is deprecated. Use VS Code - Insiders now.

3. Install the **[Remote Development](https://aka.ms/vscode-remote/download/extension)** extension pack

    > **Dogfooding Note (UPDATED):** Set up the dogfooding version of the Remote Development extensions as follows:
    > 1. Sign into a Microsoft GitHub org associated GitHub account from a browser.
    > 2. Download and manually install the latest VSIX of the [Selfhost Remote Extensions Updater](https://aka.ms/vscode-remote/download/extension) in VS Code – Insiders.
    > 3. The first time the Selfhost Remote Extensions starts, you may be prompted to paste in a GitHub access token so that it can download and auto-update private versions of the extensions. You only need to give "Repo" scope to this token.
    > 4. Reload / restart VS Code - Insiders.

4. **[Optional]** If your server requires multi-factor authentication, set `"remote.SSH.showLoginTerminal": true` in `settings.json` and enable the `ControlMaster` SSH feature. [See here for details](#troubleshooting.md#enabling-alternate-ssh-authentication-methods).

### Connect to a remote host

> **Note:** Windows SSH Servers are *not* yet supported (though Windows clients *are* supported).

Visual Studio Code uses **[SSH configuration files](https://linux.die.net/man/5/ssh_config)** and requires **[SSH key based authentication](https://www.ssh.com/ssh/public-key-authentication)** to connect to your host. To get started, follow these steps:

1. First, **configure key based authentication** on the host you plan to use. If you are new to SSH or are running into trouble, see [here for additional information](/docs/remote/troubleshooting.md#configuring-key-based-authentication) on setting this up.

    > **Azure Linux VM / PuTTY Tip:** If you've already set up key based authentication using PuTTYGen, you will need to convert your private key for use in other OpenSSH clients. See [here for details](/docs/remote/troubleshooting.md#reusing-a-key-generated-in-puttygen).

2. Run **Remote-SSH: New Window...** from the command palette (Cmd/Ctrl+Shift+P) and enter the host and username in the input box as follows: `user@hostname` (on Windows `user@domain@hostname` is also supported).

    ![Illustration of user@host input box](images/ssh/ssh-user@box.png)

3. After a moment, VS Code will connect to the SSH server and set itself up. VS Code will keep you up to date using a progress notification and you can see a detailed log in the `Remote - SSH` output channel.

    > **Note:** If you see errors about bad SSH file permissions when connecting, [see here for details](/docs/remote/troubleshooting.md#fixing-ssh-file-permission-errors) on the correct settings.

4. After you are connected, you'll be in an empty window. You can then open a folder or workspace on the remote machine using **File > Open...** or **File > Open Workspace...**

5. After a moment the folder or workspace you selected will open. Install **any extensions** you want to use on this host from the extension panel.

#### Remembering hosts you connect to frequently

If you have a few hosts you use frequently, you can add them to an SSH config file so they automatically appear in the host dropdown. Run **Remote-SSH: Open SSH Configuration File...** and add the host to the file using the [SSH config file format](https://linux.die.net/man/5/ssh_config). For example:

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

VS Code runs extensions two one of places: locally on the UI / client side, or remotely on the SSH host. While "personalization" extensions (along with a few others) install on on the UI side, most installed extensions will reside on the SSH host. This behavior ensures you have smooth experience and allows you to install any needed extensions for a given Workspace on a SSH host from your local machine and pick up exactly where you left of from a different machine later - complete with extensions.

## Managing extensions

VS Code runs extensions two one of places: locally on the UI / client side, or in the container. While "personalization" extensions (along with a few others) install locally, most installed extensions will reside inside a particular SSH host. This allows you to install only the extensions you need for a given task in a container and seamlessly switch your entire tool-chain just by connecting to another one.

If you search for an extension in the extension panel and install, it will automatically be installed in the correct location. Once installed, you can tell where an extension is installed based on the category it is in. There will be Local - Installed category and one for your remote SSH host.

![Workspace Extension Category](images/ssh/ssh-installed-remote-indicator.png)

![Local Extension Category](images/common/local-installed-extensions.png)

> **Note:** If you are an extension author and are finding that your extension is not working properly or installs in the wrong place, see the article on [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

Local extensions that actually need to run as remotely will appear **Disabled** in the Local - Installed category. You can click the **Install** button on any of them you want to install on your remote host.

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

Extensions typically are designed and tested to for use in one side or the other, not both. However, you can force an extension to run in a particular location  `settings.json`. For example, this will force the Docker extension on the UI side (instead of its Workspace default) and the Debugger for Chrome on the Workspace side (instead of its UI default):

````json
"remote.extensionKind": {
    "peterjausovec.vscode-docker": "ui",
    "msjsdiag.debugger-for-chrome": "workspace"
}
````

Typically, this should only be used for testing unless otherwise noted in the extension's documentation since it **can break extensions**. See the article on [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

## Forwarding a port / creating SSH tunnel

Sometimes when developing you may need to access a port on a remote machine that is not publicly exposed. There are two ways to do this using a [SSH tunnel](https://www.ssh.com/ssh/tunneling/example) that "forwards" the desired remote port to your local machine.

### Temporarily forwarding a port

If you want to *temporarily forward* a new port for the duration of the session, run the **Remote-SSH: Forward ports from active SSH Host...** command when connected.

A toast notification will tell tell you the localhost port you should use to access the remote port. For example, if you forwarded a HTTP server listening on port 3000, the toast notification may tell you that it was mapped to port 4123 on localhost. You can then connect to this remote http server using http://localhost:4123.

### Always forwarding a port

If you have ports that you **always want to forward**, you can use the the `LocalForward` directive in the same SSH config file you configured [above](#configure-a-remote-host). For example, if you wanted to forward ports 3000 and 27017 you could update the file as follows:

```
Host remote-linux-machine
    User myuser
    HostName remote-linux-machine.mydomain
    LocalForward 127.0.0.1:3000 127.0.0.1:3000
    LocalForward 127.0.0.1:27017 127.0.0.1:27017
```

## Opening a terminal on a remote host

Opening a terminal on the remote host is simple. Once connected, **any terminal window** you open in VS Code (e.g. using **Terminal > New Terminal**) will automatically run on the remote host rather than locally.

You can also **use the `code-insiders` CLI** from this same terminal window to perform a number of operations such as opening a new file or folder on the remote host! Type `code-insiders --help` to see all the options available from the command line.

![Using the code CLI](images/ssh/code-command-in-terminal.png)

## Debugging on the SSH host

Once you are connected to a remote host, you can use VS Code's debugger in the same way you would when running the application locally. For example, the `launch` action will start the application on the remote host and attach the debugger to it.

See the [debugging](/docs/editor/debugging.md) documentation for details on configuring VS Code's debugging features in `.vscode/launch.json`.

## Known limitations

- Using key based authentication is strongly recommended. Passwords and other tokens entered for [alternate authentication methods](/docs/remote/troubleshooting.md#enabling-alternate-ssh-authentication-methods) are not saved.
- Windows SSH Hosts are **not** yet supported. (Windows clients **are** supported.)
- Linux hosts must have Bash (`/bin/bash`), `tar`, and either `curl` or `wget` installed.
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

### What Linux packages / libraries need to be installed on remote SSH hosts?

Most Linux distributions will not require additional dependency installation steps. Linux hosts need to have Bash (`/bin/bash`), `tar`, and either `curl` or `wget` installed which can be missing from some very stripped down distributions.

### What are the connectivity requirements for the VS Code Remote Server when it is running on a remote machine / VM?

The VS Code Remote Server requires outbound HTTPS (port 443) connectivity to `update.code.visualstudio.com` and `marketplace.visualstudio.com`. All other communication between the server and the VS Code client is accomplished through an authenticated, secure SSH tunnel.

### Can I use VS Code when I only have SFTP/FTP filesystem access to my remote host (no shell access)?

Some cloud platforms only provide remote filesystem access for developers rather than direct shell access. VS Code Remote Development was not designed with this use case in mind since it negates the performance and user experience fidelity benefits that its model provides.

However, this use case can typically be handled by combining extensions like [SFTP](https://marketplace.visualstudio.com/items?itemName=liximomo.sftp) with remote debugging features for [Node.js](/docs/nodejs/nodejs-debugging.md#remote-debugging), [Python](/docs/python/debugging.md#remote-debugging) [C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp), or others.

### As an extension author what do I need to do?

The VS Code extension API abstracts many extensions away from any changes so they work without modification. However, given extensions can use any node module or runtime they want, there are situations where adjustments may need to be made. We recommend you should test your extension to be sure that no update are required. See the article on [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

### Questions or feedback

> **Dogfooding Note:**  When reporting issues, please file them against the https://github.com/Microsoft/vscode-remote/issues repository.

- See the [FAQ](/docs/remote/faq.md) or the [troubleshooting guide](/docs/remote/troubleshooting.md#ssh-tips).
- Search on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode).
- Add a [feature request](https://aka.ms/vscode-remote/feature-requests) or [report a problem](https://aka.ms/vscode-remote/issues/new).
- Contribute to [our documentation](https://github.com/Microsoft/vscode-docs) or [VS Code itself](https://github.com/Microsoft/vscode).
- See our [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) guide for details.
