---
Order: 1
Area: ssh
TOCTitle: Getting started
PageTitle: Connect over SSH with Visual Studio Code
MetaDescription: Connect over SSH with Visual Studio Code
DateApproved: 4/8/2020
---
# Remote development over SSH

This tutorial walks you through creating and connecting to a virtual machine (VM) on Azure using the Visual Studio Code [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extension. You'll create a Node.js Express web app to show how you can edit and debug on a remote machine with VS Code just like you could if the source code was local.

**Note**: Your Linux VM can be hosted anywhere - on your local host, on premise, in Azure, or in any other cloud, as long as the chosen Linux distribution meets these [prerequisites](/docs/remote/linux.md#local-linux-prerequisites).

## Prerequisites

To get started, you need to have done the following:

1. Install an [OpenSSH compatible SSH client](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client) (PuTTY is not supported).
2. Install [Visual Studio Code](https://code.visualstudio.com).
3. Have an Azure subscription (If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/free/?WT.mc_id=A261C142F) before you begin).

## Install the extension

The Remote - SSH extension is used to connect to SSH hosts.

> <a class="tutorial-install-extension-btn" href="vscode:extension/ms-vscode-remote.remote-ssh">Install the Remote - SSH extension</a>

![Remote - SSH extension](images/ssh/remote-ssh-extension.png)

## Remote - SSH

With the Remote - SSH extension installed, you will see a new Status bar item at the far left.

![Remote Status bar item](images/ssh/remote-status-bar.png)

The Remote Status bar item can quickly show you in which context VS Code is running (local or remote) and clicking on the item will bring up the Remote - SSH commands.

![Remote - SSH commands](images/ssh/remote-ssh-commands.png)

----

<a class="tutorial-next-btn" href="/remote-tutorials/ssh/create-vm">I've installed the Remote - SSH extension</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-ssh', 'getting-started')" href="javascript:void(0)">I ran into an issue</a>
