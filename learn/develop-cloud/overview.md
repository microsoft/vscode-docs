---
Order: 1
Area: developcloud
TOCTitle: Overview
ContentId: 13cba808-cf1c-425d-af8e-330acb96a799
PageTitle: Custom development environments with Visual Studio Code
DateApproved: 10/22/2020
MetaDescription: Learn to use custom development environments with Visual Studio Code
---
# Custom development environments

## What are custom development environments?

Your development environment is where you do your coding. Visual Studio Code allows you to use a development environment different than your local computer through a container, a separate (or remote) machine, or the Windows Subsystem for Linux (WSL). These configurations are known as [remote development](/docs/remote/remote-overview.md).

Remote development has benefits such as:

- Avoid having to download different dependencies or manage multiple versions of them.
- Connect to a machine with characteristics different than your own.
  - This could include greater compute power, which can make your programs run faster, or a different operating system, which will make sure your apps behave consistently when run in different locations.
- Develop Linux-based apps and use Linux commands while on Windows.
- Access existing development environments or code bases from multiple computers or locations.

### Example scenario

As an example scenario, you could have different dev environments for Python 2.7 and 3.7. Rather than having to worry about managing different versions of Python on your computer, you can connect to separate environments with the appropriate versions of Python already set up for you.

Since you may be working with teammates using Linux or deploying to a Linux production environment, you could also connect to development environments that use a different operating system than your own, or harness the power of the Windows Subsystem for Linux.

## How do I get started with remote development?

To get started with remote development in VS Code, you can download the [Remote Development extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) from the Extension Marketplace.

![Remote Development Extension Pack](images/overview/remote-dev-pack.png)

This extension pack includes three extensions (which can also be downloaded individually):

- [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) - Connect to any location by opening folders on a remote computer or virtual machine (VM) using SSH.
- [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) - Develop within a container, which is a piece of software that includes your app and any dependencies your app needs to run.
- [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) - Get a Linux-powered development experience while on Windows using the Windows Subsystem for Linux (WSL).

Check out the topics in this section to learn more about each of the remote development extensions in Visual Studio Code.
