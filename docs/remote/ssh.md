---
Order: 2
Area: remote
TOCTitle: SSH
PageTitle: Developing on Remote Machines using SSH and Visual Studio Code
ContentId: 42e65445-fb3b-4561-8730-bbd19769a160
MetaDescription: Developing on Remote Machines or VMs using Visual Studio Code Remote Development and SSH
DateApproved: 6/25/2019
---
# Remote Development using SSH

The **Visual Studio Code Remote - SSH** extension allows you to open a remote folder on any remote machine, virtual machine, or container with a running SSH server and take full advantage of VS Code's feature set. Once connected to a server, you can interact with files and folders anywhere on the remote filesystem.

No source code needs to be on your local machine to gain these benefits since the extension runs commands and other extensions directly on the remote machine.

![SSH Architecture](images/ssh/architecture-ssh.png)

This lets VS Code provide a **local-quality development experience** — including full IntelliSense (completions), code navigation, and debugging — **regardless of where your code is hosted**.

## Getting started

### System requirements

**Local:** See minimum requirements for [VS Code](/docs/supporting/requirements.md). A supported [OpenSSH compatible SSH client](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client) must also be installed.

**Remote SSH Host**: A running [SSH server](/docs/remote/troubleshooting.md#installing-a-supported-ssh-server) on:

- **Full support:** x86_64 Debian 8+, Ubuntu 16.04+, CentOS / RHEL 7+.

- **Experimental support:** ARMv7l Raspbian 8+ (32-bit) in [Visual Studio Code Insiders](https://code.visualstudio.com/insiders/) only.

Other `glibc` based Linux distributions for x86_64 and ARMv7l (in VS Code Insiders) should work if they have the needed prerequisites. See the [Remote Development and Linux](/docs/remote/linux.md) article for information prerequisites and tips for getting community supported distributions up and running.

While experimental ARMv7l support is available in [VS Code - Insiders](https://code.visualstudio.com/insiders/), some extensions installed on ARMv7l devices may not work due to the use of x86 native code in the extension.

### Installation

To get started you need to:

1. Install an [OpenSSH compatible SSH client](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client) if one is not already present.

    > **Note:** PuTTY is not supported on Windows since the `ssh` command must be in the path.

2. Install [Visual Studio Code](https://code.visualstudio.com/) or [Visual Studio Code Insiders](https://code.visualstudio.com/insiders/).

3. Install the [Remote Development](https://aka.ms/vscode-remote/download/extension) extension pack.

4. [Optional] If you are on macOS or Linux and need to enter a token or password when connecting to your host, [you can enable `ControlMaster` in your SSH config](/docs/remote/troubleshooting.md#enabling-alternate-ssh-authentication-methods) to prevent you from having to enter it multiple times.

### Connect to a remote host

Visual Studio Code uses [SSH configuration files](https://linux.die.net/man/5/ssh_config) and requires [SSH key based authentication](https://www.ssh.com/ssh/public-key-authentication) to connect to your host. If you do not have a host yet, you can create a [Linux VM on Azure](https://docs.microsoft.com/azure/virtual-machines/linux/quick-create-portal?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json) or [setup an SSH host on an existing machine](/docs/remote/troubleshooting.md#installing-a-supported-ssh-server).

> **Note:** See [System Requirements](#system-requirements) for information about supported SSH hosts. When using experimental support for ARMv7l `glibc` distributions like Raspbian in [Visual Studio Code Insiders](https://code.visualstudio.com/insiders/), note that some extensions installed on the remote host may not work due the use of x86 native code in the extension.

To get started, follow these steps:

1. First, **configure key based authentication** on the host you plan to connect to by adding your local public SSH key to `~/.ssh/authorized_keys` on the host. If you are new to SSH or are running into trouble, see [here for additional information](/docs/remote/troubleshooting.md#configuring-key-based-authentication) on setting this up. If you followed the Azure VM tutorial, you can skip this step.

    > **Note:** If you skip this step, you will end up needing to enter your password twice due to [vscode-remote-release#642](https://github.com/microsoft/vscode-remote-release/issues/642). Also note that PuTTY for Windows is not a [supported client](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client), but you can [convert your PuTTYGen keys](/docs/remote/troubleshooting.md#reusing-a-key-generated-in-puttygen).

2. Run **Remote-SSH: Connect to Host...** from the Command Palette (`kbstyle(F1)`) and enter the host and your user on the host in the input box as follows: `user@hostname`.

    ![Illustration of user@host input box](images/ssh/ssh-user@box.png)

    > **Note:** If you see errors about bad SSH file permissions when connecting, [see here for details](/docs/remote/troubleshooting.md#fixing-ssh-file-permission-errors) on the correct settings.

3. After a moment, VS Code will connect to the SSH server and set itself up. VS Code will keep you up to date using a progress notification and you can see a detailed log in the `Remote - SSH` output channel.

    > **Note:** If your connection is hanging, you may need to enable TCP forwarding or respond to a server prompt. See [tips and tricks](/docs/remote/troubleshooting.md#troubleshooting-hanging-or-failing-connections) for details.

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

The second example uses an alternate location for your SSH key if you want to use more than one. See [tips and tricks](/docs/remote/troubleshooting.md#improving-your-security-with-a-dedicated-key) for details. You can also set the `"remote.SSH.configFile"` property in `settings.json` if you want to use a different config file than those listed.

## Managing extensions

VS Code runs extensions in one of two places: locally on the UI / client side, or remotely on the SSH host. While extensions that affect the VS Code UI, like themes and snippets, are installed locally, most extensions will reside on the SSH host. This ensures you have smooth experience and allows you to install any needed extensions for a given workspace on an SSH host from your local machine. This way, you can pick up exactly where you left off, from a different machine complete with your extensions.

If you install an extension from the Extensions view, it will automatically be installed in the correct location. Once installed, you can tell where an extension is installed based on the category grouping. There will be a category for your remote SSH host and a **Local - Installed** category.

![Workspace Extension Category](images/ssh/ssh-installed-remote-indicator.png)

![Local Extension Category](images/common/local-installed-extensions.png)

> **Note:** If you are an extension author and find that your extension is not working properly or installs in the wrong place, see [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

Local extensions that actually need to run remotely will appear **Disabled** in the **Local - Installed** category. You can click the **Install** button to install an extension on your remote host.

![Disabled Extensions w/Install Button](images/ssh/ssh-disabled-extensions.png)

### "Always installed" extensions

If there are extensions that you would like to always have installed on any SSH host, you can specify which ones using the `remote.SSH.defaultExtensions` property in `settings.json`. For example, if you wanted to install the [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) and [Resource Monitor](https://marketplace.visualstudio.com/items?itemName=mutantdino.resourcemonitor) extensions, specify their extension IDs as follows:

```json
"remote.SSH.defaultExtensions": [
    "eamodio.gitlens",
    "mutantdino.resourcemonitor"
]
```

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

## Forwarding a port / creating SSH tunnel

Sometimes when developing, you may need to access a port on a remote machine that is not publicly exposed. There are two ways to do this using an [SSH tunnel](https://www.ssh.com/ssh/tunneling/example) that "forwards" the desired remote port to your local machine.

### Temporarily forwarding a port

If you want to **temporarily forward** a new port for the duration of the session, run the **Remote-SSH: Forward Port from Active Host...** command when connected to an active SSH host.

![Forward port input](images/ssh/forward-port-ssh.png)

After entering a port number, a notification will tell you the localhost port you should use to access the remote port. For example, if you forwarded an HTTP server listening on port 3000, the notification may tell you that it was mapped to port 4123 on localhost. You can then connect to this remote HTTP server using http://localhost:4123.

### Always forwarding a port

If you have ports that you **always want to forward**, you can use the `LocalForward` directive in the same SSH config file you created above in the [Remembering hosts](#remembering-hosts-you-connect-to-frequently) section above.

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

You can also use the `code` command line from this same terminal window to perform a number of operations such as opening a new file or folder on the remote host. Type `code --help` to see all the options available from the command line.

![Using the code CLI](images/ssh/code-command-in-terminal.png)

## Debugging on the SSH host

Once you are connected to a remote host, you can use VS Code's debugger in the same way you would when running the application locally. For example, if you select a launch configuration in `launch.json` and start debugging (`kbstyle(F5)`), the application will start on remote host and attach the debugger to it.

See the [debugging](/docs/editor/debugging.md) documentation for details on configuring VS Code's debugging features in `.vscode/launch.json`.

## SSH host-specific settings

VS Code's local user settings are also reused when you are connected to an SSH host. While this keeps your user experience consistent, you may want to vary some of these settings between your local machine and each host. Fortunately, once you have connected to a host, you can also set host-specific settings by running the **Preferences: Open Remote Settings** command from the Command Palette (`kbstyle(F1)`) or by selecting on the **Remote** tab in the settings editor. These will override any local settings you have in place whenever you connect to the host.

![Host specific settings tab](images/ssh/ssh-settings.png)

## Working with local tools

The Remote - SSH extension does not provide direct support for sync'ing source code or using local tools with content on a remote host. However, there are two ways to do this using common tools that will work with most Linux hosts. Specifically, you can:

1. [Mount the remote filesystem using SSHFS](/docs/remote/troubleshooting.md#using-sshfs-to-access-files-on-your-remote-host).
2. [Sync files to/from the remote host to your local machine using `rsync`](/docs/remote/troubleshooting.md#using-rsync-to-maintain-a-local-copy-of-your-source-code).

SSHFS is the most convenient option and does not require any file sync'ing. However, performance will be significantly slower than working through VS Code, so it is best used for single file edits and uploading/downloading content. If you need to use an application that bulk reads/write to many files at once (like a local source control tool), rsync is a better choice.

## Known limitations

### Remote - SSH limitations

- Using key based authentication is strongly recommended. Passwords and other tokens entered for [alternate authentication methods](/docs/remote/troubleshooting.md#enabling-alternate-ssh-authentication-methods) are not saved.
- Windows and macOS SSH hosts are **not** yet supported. (Windows and macOS clients **are** supported.)
- Alpine Linux and non-glibc based Linux SSH hosts are not supported.
- Older (community supported) Linux distributions require workarounds to install the [needed prerequisites](/docs/remote/linux.md).
- PuTTY is not supported on Windows.
- If you clone a Git repository using SSH and your SSH key has a passphrase, VS Code's pull and sync features may hang when running remotely. Either use an SSH key without a passphrase, clone using HTTPS, or run `git push` from the command line to work around the issue.
- Local proxy settings are not reused on the remote host, which can prevent extensions from working unless the appropriate proxy information is configured on the remote host (for example global `HTTP_PROXY` or `HTTPS_PROXY` environment variables with the appropriate proxy information).
- See [here for a list of active issues](https://aka.ms/vscode-remote/ssh/issues) related to SSH.

### Docker Extension limitations

The Docker extension is configured to run as a local "UI" extension by default. This enables the extension to work with your local Docker installation when you are developing inside a container. However, you may want to use the extension with a Docker Machine installed on a remote host instead. Fortunately, you can configure the Docker extension to run on the host by adding the following to `settings.json`:

```json
"remote.extensionKind": {
    "ms-azuretools.vscode-docker": "workspace"
}
```

### Extension limitations

Many extensions will work on remote SSH hosts without modification. However, in some cases, certain features may require changes. If you run into an extension issue, there is [a summary of common problems and solutions](/docs/remote/troubleshooting.md#extension-tips) that you can mention to the extension author when reporting the issue.

In addition, some extensions installed on ARMv7l devices may not work due to native modules or runtimes in the extension that only support x86_64. In these cases, the extensions would need to opt-in to supporting these platforms by compiling / including binaries for ARMv7l.

## Common questions

### How do I set up an SSH client on ...?

See [Installing a supported SSH client](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client) for details.

### How do I set up an SSH server on ...?

See [Installing a supported SSH server](/docs/remote/troubleshooting.md#installing-a-supported-ssh-server) for details on setting up an SSH server for your host.

### Can I sign into my SSH server with another/additional authentication mechanism like a password?

Yes, you should be prompted to enter your token or password automatically.

However, you will end up needing to enter your password twice due to [vscode-remote-release#642](https://github.com/microsoft/vscode-remote-release/issues/642). Enabling `ControlMaster` in your SSH config can help, but we have seen mixed results with this setting on Windows SSH clients. See [Enabling alternate SSH authentication methods](/docs/remote/troubleshooting.md#enabling-alternate-ssh-authentication-methods) for information on the correct settings.

### How do I fix SSH errors about "bad permissions"?

See [Fixing SSH file permission errors](/docs/remote/troubleshooting.md#fixing-ssh-file-permission-errors) for details on resolving these types of errors.

### What Linux packages / libraries need to be installed on remote SSH hosts?

Most Linux distributions will not require additional dependency installation steps. For SSH, Linux hosts need to have Bash (`/bin/bash`), `tar`, and either `curl` or `wget` installed and those utilities could be missing from certain stripped down distributions. Remote Development also requires kernel >= 3.10, glibc >=2.17, libstdc++ >= 3.4.18. Only glibc-based distributions are supported currently, so by extension [Alpine Linux](https://alpinelinux.org) is not supported.

See [Linux Prerequisites](/docs/remote/linux.md) for details.

### What are the connectivity requirements for the VS Code Server when it is running on a remote machine / VM?

The VS Code Server requires outbound HTTPS (port 443) connectivity to:

- `update.code.visualstudio.com`
- `marketplace.visualstudio.com`
- `vscode.blob.core.windows.net`
- `*.vo.msecnd.net` (Azure CDN)
- `*.gallerycdn.vsassets.io` (Azure CDN)

All other communication between the server and the VS Code client is accomplished through an authenticated, secure, SSH tunnel. You can find a list of locations VS Code itself needs access to [in the network connections article](/docs/setup/network.md#common-hostnames).

Finally, some extensions (like C#) download secondary dependencies from `download.microsoft.com` or `download.visualstudio.microsoft.com`. Others (like [VS Live Share](https://docs.microsoft.com/en-us/visualstudio/liveshare/reference/connectivity#requirements-for-connection-modes)) may have additional connectivity requirements. Consult the extension's documentation for details if you run into trouble.

### Can I use local tools on source code sitting on the remote SSH host?

Yes. Typically this is done [using SSHFS](/docs/remote/troubleshooting.md#using-sshfs-to-access-files-on-your-remote-host) or by [using `rsync`](/docs/remote/troubleshooting.md#using-rsync-to-maintain-a-local-copy-of-your-source-code) to get a copy of the files on your local machine. SSHFS mounts the remote filesystem is ideal for scenarios where you need to edit individual files or browse the source tree and requires no sync step to use. However, it is not ideal for using something like a source control tool that bulk manages files. In this case, the `rsync` approach is better since you get a complete copy of the remote source code on your local machine. See [Tips and Tricks](/docs/remote/troubleshooting.md#using-sshfs-to-access-files-on-your-remote-host) for details.

### Can I use VS Code when I only have SFTP/FTP filesystem access to my remote host (no shell access)?

Some cloud platforms only provide remote filesystem access for developers rather than direct shell access. VS Code Remote Development was not designed with this use case in mind since it negates the performance and user experience benefits.

However, this use case can typically be handled by combining extensions like [SFTP](https://marketplace.visualstudio.com/items?itemName=liximomo.sftp) with remote debugging features for [Node.js](/docs/nodejs/nodejs-debugging.md#remote-debugging), [Python](/docs/python/debugging.md#remote-debugging), [C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp), or others.

### As an extension author, what do I need to do?

The VS Code extension API abstracts away local/remote details so most extensions will work without modification. However, given extensions can use any node module or runtime they want, there are situations where adjustments may need to be made. We recommend you test your extension to be sure that no updates are required. See [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

### Questions or feedback

- See [Tips and Tricks](/docs/remote/troubleshooting.md#ssh-tips) or the [FAQ](/docs/remote/faq.md).
- Search on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode-remote).
- Add a [feature request](https://aka.ms/vscode-remote/feature-requests) or [report a problem](https://aka.ms/vscode-remote/issues/new).
- Contribute to [our documentation](https://github.com/Microsoft/vscode-docs) or [VS Code itself](https://github.com/Microsoft/vscode).
- See our [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) guide for details.
