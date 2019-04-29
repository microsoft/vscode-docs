---
Order: 1
Area: remote
TOCTitle: Overview
PageTitle: Visual Studio Code Remote Development
ContentId: eceea3f0-feee-47c2-8b65-1f1b0825355b
MetaDescription: Visual Studio Code Remote Development
DateApproved: 1/30/2019
---
# VS Code Remote Development

VS Code Remote Development allows you to use a container, remote machine, or the [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/windows/wsl) as a full-featured development environment. You can:

- Develop on the **same operating system** you deploy to or use **larger or more specialized** hardware.
- **Sandbox** your development environment to avoid impacting your local **machine configuration**.
- Make it easy for new contributors to **get started** and keep everyone on a **consistent environment**.
- Use tools or runtimes **not available** on your local OS or manage **multiple versions** of them.
- Develop your Linux-deployed applications using the **Windows Subsystem for Linux**.
- Access an **existing** development environment from **multiple machines or locations**.
- Debug an **application running somewhere else** such as a customer site or in the cloud.

Better yet, **no source code** needs to be on your local machine to get these benefits. Each extension in the [Remote Development extension pack](https://aka.ms/vscode-remote/download/extension) can run commands and other extensions directly inside a container, in WSL, or on a remote machine. This approach is a big improvement over using network shares or synchronizing files since everything feels like it does when you run locally.

![Architecture](images/remote-overview/architecture.png)

## Getting started

> **Dogfooding Notes (UPDATED):**

> 1. You currently need to install private versions of the VS Code Remote Development extensions. First download [Visual Studio Code Insiders](https://code.visualstudio.com/insiders).
> 2. Next, sign into a Microsoft GitHub org associated GitHub account from a browser.
> 3. Download and manually install the latest VSIX of the [Selfhost Remote Extensions Updater](https://aka.ms/vscode-remote/download/extension) in VS Code Insiders.
> 4. The first time the Selfhost Remote Extensions starts, you may be prompted to paste in a GitHub access token so that it can download and auto-update private versions of the extensions. You only need to give "Repo" scope to this token.
> 5. Reload / restart VS Code Insiders.

### Remote Development extension pack

The [Remote Development extension pack](https://aka.ms/vscode-remote/download/extension) includes three extensions that unlock the power of VS Code in a variety of situations.

Click on the links below to learn more:

- [Remote - SSH](/docs/remote/ssh.md) - Connect to any location by opening folders on a remote machine/VM using SSH.
- [Remote - Containers](/docs/remote/containers.md) - Work with a sandboxed toolchain or container-based application inside (or mounted into) a container.
- [Remote - WSL](/docs/remote/wsl.md) - Get a Linux-powered development experience in the Windows Subsystem for Linux.

While most VS Code extensions should work unmodified in a remote environment, extension authors can learn more at [Supporting Remote Development](/api/advanced-topics/remote-extensions.md).

## Questions or feedback

> **Dogfooding Note:**  When reporting issues, please file them against the [vscode-remote](https://github.com/Microsoft/vscode-remote/issues) repository.

- See [Tips and Tricks](https://aka.ms/vscode-remote/troubleshooting) or the [FAQ](/docs/remote/faq).
- Search on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode).
- Add a [feature request](https://aka.m/vscode-remote/feature-requests) or [report a problem](https://aka.ms/vscode-remote/issues/new).
