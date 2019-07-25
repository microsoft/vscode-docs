---
Order: 1
Area: remote
TOCTitle: Overview
PageTitle: Visual Studio Code Remote Development
ContentId: eceea3f0-feee-47c2-8b65-1f1b0825355b
MetaDescription: Visual Studio Code Remote Development
DateApproved: 7/3/2019
---
# VS Code Remote Development

**Visual Studio Code Remote Development** allows you to use a container, remote machine, or the [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/windows/wsl) as a full-featured development environment. You can:

- Develop on the **same operating system** you deploy to or use **larger or more specialized** hardware.
- **Sandbox** your development environment to avoid impacting your local **machine configuration**.
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
- [Remote - Containers](/docs/remote/containers.md) - Work with a sandboxed toolchain or container-based application inside (or mounted into) a container.
- [Remote - WSL](/docs/remote/wsl.md) - Get a Linux-powered development experience in the Windows Subsystem for Linux.

While most VS Code extensions should work unmodified in a remote environment, extension authors can learn more at [Supporting Remote Development](/api/advanced-topics/remote-extensions.md).

## Questions or feedback

- See [Tips and Tricks](/docs/remote/troubleshooting.md) or the [FAQ](/docs/remote/faq.md).
- Search on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode-remote).
- Add a [feature request](https://aka.ms/vscode-remote/feature-requests) or [report a problem](https://aka.ms/vscode-remote/issues/new).
