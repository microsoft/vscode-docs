---
Order: 51
TOCTitle: SSH Tips and Tricks
PageTitle: Visual Studio Code Remote SSH Tips and Tricks
MetaDescription: Visual Studio Code Remote-SSH Tips and Tricks
MetaSocialImage: /assets/blogs/2019/10/03/social-remote-ssh.png
Date: 2019-10-03
ShortDescription: Remote SSH Tips and Tricks with Visual Studio Code
Author: Sana Ajani
---
# Remote SSH: Tips and Tricks

October 3, 2019 by Sana Ajani, [@sana_ajani](https://twitter.com/sana_ajani)

In a previous [Remote SSH blog post](/blogs/2019/07/25/remote-ssh.md), we went over how to set up a Linux virtual machine and connect to the VM using the [Remote - SSH extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) in Visual Studio Code. In this blog post, we'll go into some tips and tricks that you can use to get the most out of your remote setup.

## Connect using Remote SSH

The Visual Studio Code Remote - SSH extension allows you to connect to a remote machine or VM using SSH, all from inside VS Code. If you don't already have the extension installed, you can search for "remote ssh" in the Extensions view (`kb(workbench.view.extensions)`).

![Remote - SSH extension](remote-ssh-extension.png)

After you install the extension, you'll notice an indicator on the bottom-left corner of the Status bar. This indicator tells you in which context VS Code is running (local or remote). Click on the indicator to bring up a list of Remote extension commands.

![Remote extension commands](remote-extension-commands.png)

## SSH configuration file

In the earlier Remote SSH blog post, we only connected to a single machine and did so by entering the "user@host" when prompted. If you log in to multiple remote servers or local virtual machines on a regular basis, there's a better way to connect without having to remember all the usernames, addresses, and additional configuration options.

[OpenSSH](https://www.openssh.com/) supports using a [configuration file](https://linuxize.com/post/using-the-ssh-config-file) to store all your different SSH connections. To use an SSH config file, click on the remote indicator to bring up the remote commands, choose **Open Configuration File**, and select the file that follows the path "Users/{yourusername}/.ssh/config".

![Open Configuration File command](open-configuration-file.png)

Here's an example of an SSH config file:

```yaml
# Read more about SSH config files: https://linux.die.net/man/5/ssh_config
Host python-linux-vm
    HostName <vm address>
    User sana
    IdentityFile ~/.ssh/id_python_vm

Host node-vm
    HostName <vm address>
    User sana
    Port 5522
    IdentityFile ~/.ssh/id_node_vm
```

There are many more [configuration options](https://linux.die.net/man/5/ssh_config) you can specify in the SSH config file format. You'll get completions and colorizations in this file and you can press (`kb(editor.action.triggerSuggest)`) for IntelliSense to learn more about the config options.

The options used above are:

Option | Description
--- | ---
Host | An easy-to-remember alias for your host machine.
HostName | The hostname of server (you can use the IP address of the server).
User | The user you've specified to log in to the machine via SSH.
Port | The port used to connect via SSH. The default port is 22, but if you've specified a unique port, you can configure it here.
IdentityFile | The file location where you've stored your private key.

You can add the information for all the hosts you have. Once you've saved the config file, you'll be able to see those hosts in the Remote Explorer, as well as any folders you have opened on that host. You can select the icon next to each host or folder and it will launch a new VS Code window (instance) and connect you to that host. In the screenshot below, I'm connected to my remote machine "python-linux-vm" and the Remote Explorer shows me the folders I have connected to in the past, as well as any forwarded ports from the remote machine.

![Connected to python-linux-vm host machine](python-linux-vm.png)

## ProxyCommand

Sometimes you may need to connect from your desktop or laptop to a remote machine over your company's Intranet or behind a firewall. In this case, you may be using an intermediate server or [jump box](https://en.wikipedia.org/wiki/Jump_server). This kind of setup is useful if you are working within a secure system that is configured to only accept SSH connections from a fixed set of hosts.

To use a jump-box setup with the Remote - SSH extension, you can use the `ProxyCommand` config option. This configuration will open a background SSH connection to the jump box, and then connect via a private IP address to the target.

You can set the `ProxyCommand` config option in the SSH config file like this:

```yaml
# Jump box with public IP address
Host jump-box
    HostName 52.179.157.97
    User sana
    IdentityFile ~/.ssh/jumpbox

# Target machine with private IP address
Host target-box
    HostName <IP address of target>
    User sana
    IdentityFile ~/.ssh/target
    ProxyCommand ssh -q -W %h:%p jump-box
```

## ControlMaster

If you are connecting to a remote SSH host using other authentication methods besides key-based authentication, such as two-factor, password-based, or an SSH key with a passphrase, you may have to enter the required information multiple times.

Instead of opening multiple SSH connections, you can use `ControlMaster` option (only on macOS/Linux clients) to reuse an existing connection and reduce the number of times you must enter your passphrase.

To use this feature, add the following to your SSH config file:

```yaml
Host *
    ControlMaster auto
    ControlPath ~/.ssh/sockets/%r@%h-%p
    ControlPersist 600
```

## Offline remote machine

If you are restricted by a firewall or your company locks down your VMs and they cannot connect to the Internet, the Remote - SSH extension won't be able to connect to your VM because VS Code needs to download a component called the VS Code Server to the remote machine.

However, you can now solve this issue by a new user [setting](/docs/getstarted/settings.md) in the Remote - SSH extension. If you enable the setting `remote.SSH.allowLocalServerDownload`, the extension will install the VS Code Server on the client first and then copy it over to the server via SCP.

**Note**: This is currently an experimental feature but will be turned on by default in the next release.

## Remote - SSH Nightly extension

If you're interested in testing new updates and experimental features as soon as they are available, install the [Remote - SSH Nightly extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh-nightly) (uninstall the Remote-SSH stable extension first). This is the nightly build of the extension where we experiment with new features and settings before releasing them into the stable version.

## We'd like your feedback

Thanks for trying out the Remote - SSH extension! If you run into any issues or would like to suggest new features or scenarios for us, please open an issue on our [GitHub repo](https://github.com/microsoft/vscode-remote-release/issues). If you want to see what features we're currently working on or are upcoming, take a look at our Remote Development [release notes](https://github.com/microsoft/vscode-docs/blob/main/remote-release-notes) and [iteration plans](https://github.com/microsoft/vscode-remote-release/issues?q=is%3Aopen+is%3Aissue+label%3Aiteration-plan). You can also try out the introductory [Remote development over SSH tutorial](https://code.visualstudio.com/docs/remote/ssh-tutorial), which walk you through using the other remote extensions to work inside Docker containers and the [Window Subsystem for Linux](https://learn.microsoft.com/windows/wsl) (WSL).

Happy Remote Coding,

Sana Ajani, VS Code Program Manager
[@sana_ajani](https://twitter.com/sana_ajani)
