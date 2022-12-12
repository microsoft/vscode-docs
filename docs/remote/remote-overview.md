---
Order: 1
Area: remote
TOCTitle: Overview
PageTitle: Visual Studio Code Remote Development
ContentId: eceea3f0-feee-47c2-8b65-1f1b0825355b
MetaDescription: Visual Studio Code Remote Development
DateApproved: 12/7/2022
---
# VS Code Remote Development

**Visual Studio Code Remote Development** allows you to use a container, remote machine, or the [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl) (WSL) as a full-featured development environment. You can:

- Develop on the **same operating system** you deploy to or use **larger or more specialized** hardware.
- **Separate** your development environment to avoid impacting your local **machine configuration**.
- Make it easy for new contributors to **get started** and keep everyone on a **consistent environment**.
- Use tools or runtimes **not available** on your local OS or manage **multiple versions** of them.
- Develop your Linux-deployed applications using the **Windows Subsystem for Linux**.
- Access an **existing** development environment from **multiple machines or locations**.
- Debug an **application running somewhere else** such as a customer site or in the cloud.

**No source code** needs to be on your local machine to get these benefits. Each extension in the [Remote Development extension pack](https://aka.ms/vscode-remote/download/extension) can run commands and other extensions directly inside a container, in WSL, or on a remote machine so that everything feels like it does when you run locally.

![Architecture](images/remote-overview/architecture.png)

## Getting started

### Remote Development extension pack

The [Remote Development extension pack](https://aka.ms/vscode-remote/download/extension) includes three extensions. See the following articles to get started with each of them:

- [Remote - SSH](/docs/remote/ssh.md) - Connect to any location by opening folders on a remote machine/VM using SSH.
- [Dev Containers](/docs/devcontainers/containers.md) - Work with a separate toolchain or container-based application inside (or mounted into) a container.
- [WSL](/docs/remote/wsl.md) - Get a Linux-powered development experience in the Windows Subsystem for Linux.

While most VS Code extensions should work unmodified in a remote environment, extension authors can learn more at [Supporting Remote Development](/api/advanced-topics/remote-extensions.md).

## Remote tutorials

The tutorials below will walk you through running Visual Studio Code with the Remote Development extensions.

Tutorial | Description
--- | ---
[Remote via SSH](/docs/remote/ssh-tutorial.md) | Connect to remote and virtual machines with Visual Studio Code via SSH.
[Work in WSL](/docs/remote/wsl-tutorial.md) | Run Visual Studio Code in Windows Subsystem for Linux.
[Develop in Containers](/docs/devcontainers/tutorial.md) | Run Visual Studio Code in a Docker Container.
[GitHub Codespaces](https://docs.github.com/github/developing-online-with-codespaces/using-codespaces-in-visual-studio-code) | Connect to a codespace with Visual Studio Code.

## GitHub Codespaces

[GitHub Codespaces](/docs/remote/codespaces.md) provides remote development environments that are managed for you. You can configure and create a development environment hosted in the cloud, which is spun up and available when you need it.

## The VS Code Server (private preview)

[The VS Code Server](https://aka.ms/vscode-server-doc) is a private preview service you can run on a remote development machine, like your desktop PC or a virtual machine (VM). It allows you to securely connect to that remote machine from anywhere through a vscode.dev URL, without the requirement of SSH.

## Questions or feedback

- See [Tips and Tricks](/docs/remote/troubleshooting.md) or the [FAQ](/docs/remote/faq.md).
- Search on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode-remote).
- Add a [feature request](https://aka.ms/vscode-remote/feature-requests) or [report a problem](https://aka.ms/vscode-remote/issues/new).
