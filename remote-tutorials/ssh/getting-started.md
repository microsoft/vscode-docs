---
Order: 1
Area: ssh
TOCTitle: Getting started
PageTitle: Connect over SSH with Visual Studio Code
MetaDescription: Connect over SSH with Visual Studio Code
DateApproved: 7/26/2019
---
# Remote development over SSH

This tutorial walks you through creating and connecting to a virtual machine (VM) on Azure using the Visual Studio Code Remote - SSH extension. You'll create a Node.js Express web app to show how you can edit and debug on a remote machine with VS Code just like you could if the source code was local.

## Prerequisites

You need [Visual Studio Code](https://code.visualstudio.com/) installed.

## Install the extension

The Remote - SSH extension is used to connect to SSH hosts.

> <a class="tutorial-install-extension-btn" href="vscode:extension/ms-vscode-remote.remote-ssh">Install the Remote - SSH extension</a>

![Remote - SSH extension](images/ssh/remote-ssh-extension.png)

## Remote - SSH

With the Remote - SSH extension installed, you see a new Status bar item in the far left.

![Remote Status bar item](images/ssh/remote-status-bar.png)

The Remote Status bar item can quickly show you in which context VS Code is running (local or remote) and clicking on the item will bring up the Remote - SSH commands.

![Remote - WSL commands](images/ssh/remote-ssh-commands.png)

----

<a class="tutorial-next-btn" href="/remote-tutorials/ssh/create-vm">I've installed the Remote - SSH extension</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-ssh', 'getting-started')" href="javascript:void(0)">I ran into an issue</a>
