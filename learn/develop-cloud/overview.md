---
Order: 1
Area: developcloud
TOCTitle: Overview
ContentId: 13cba808-cf1c-425d-af8e-330acb96a799
PageTitle: Custom development environments with Visual Studio Code
DateApproved: 10/8/2020
MetaDescription: Learn to use custom development environments with Visual Studio Code
---
# Custom development environments

## What are custom development environments?

Your development environment is where you do your coding. Visual Studio Code allows you to use a development environment different than your local computer through a container, remote machine, or the Windows Subsystem for Linux (WSL). This is known as [remote development](https://code.visualstudio.com/docs/remote/remote-overview).

Remote development has benefits such as:
- Avoid having to download different dependencies or manage multiple versions of them.
     - i.e. you could have different dev environments for Python 2.7 and 3.7 rather than having to worry about downloading each of them or uninstalling one and installing another on your local computer.
- Connect to a machine with greater compute power, which can make your programs run faster.
- Develop Linux-based apps and use Linux commands while on Windows.
- Access existing development environments or code bases from multiple computers or locations.

## How do I get started with remote development?

To get started with remote development in VS Code, you can download the [Remote Development extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) from the Extension Marketplace. It includes three extensions (which can also be downloaded individually):

- [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) - Connect to any location by opening folders on a remote computer or virtual machine (VM) using SSH.
- [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) - Develop within a container, which is a piece of software that includes your app and any depenencies your app needs to run.
- [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) - Get a Linux-powered development experience while on Windows using the Windows Subsystem for Linux (WSL).