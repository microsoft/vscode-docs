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

While many developers edit, build, deploy, and debug on their local machines, there are an increasing number of situations where you may need to interact with a codebase or runtime on the other side of an OS boundary.

For example, you may want to:

- Avoid bugs by editing, building, or debugging an application using its **deployment OS** when your local machine runs a different one.
- **Sandbox** your development environment to avoid accidentally impacting to your local **machine configuration**, allow you to better manage **multiple versions** of the same runtime, access tools or runtimes **not available** on your local OS, or reduce the risk of a **security issue** affecting your local OS.
- Edit, build, or debug your application on **larger, faster, or more specialized hardware** than your local machine.
- Continue to work on your **in-flight** changes or access an **existing** development environment from **multiple machines or locations**.
- Edit, build, or debug an application with a number of network dependencies or frequently changing packages over a **low bandwidth or high latency** network connection by connecting to a machine close to these dependencies.
- Debug a problem with an **application running somewhere else** such as a customer site or in the cloud.
- Develop your Linux-deployed applications using the **Windows Subsystem for Linux**.

The **[Visual Studio Code Remote Development](https://aka.ms/vscode-remote/download/extension)** extension pack addresses these needs by allowing your local VS Code installation and any extension provided features to transparently interact with code and runtime environments sitting on other machines (whether virtual or physical). When using the capability, VS Code selectively runs certain extensions on the remote machine to optimize your experience.

![Architecture](images/remote-overview/architecture.png)

Given **no source code needs to be on your local machine** to use the capability, the approach provides dramatic performance and fidelity benefits over using network shares or synchronizing files.

The result is that VS Code can provide a **local-quality development experience** including full IntelliSense, debugging, and more **regardless of where your code is hosted**.

## Getting started

> **Dogfooding Notes (UPDATED):**
> 1. You currently need to install a private versions of the VS Code Remote Development extensions. First download [Visual Studio Code - Insiders](https://code.visualstudio.com/insiders).
> 2. Next, sign into a Microsoft GitHub org associated GitHub account from a browser.
> 3. Download and manually install the latest VSIX of the [Selfhost Remote Extensions Updater](https://aka.ms/vscode-remote/download/extension) in VS Code – Insiders.
> 4. The first time the Selfhost Remote Extensions starts, you may be prompted to paste in a GitHub access token so that it can download and auto-update private versions of the extensions. You only need to give "Repo" scope to this token.
> 5. Reload / restart VS Code - Insiders.

### Remote Development extension pack

The **[Remote Development extension pack](https://aka.ms/vscode-remote/download/extension)** includes three extensions that will quickly unlock the full power of VS Code in a variety of situations. Click on the links below to learn more.

- **[SSH](/docs/remote/ssh.md)** - Work with source code in any location by opening folders on a remote machine/VM using SSH.
- **[Containers](/docs/remote/containers.md)** - Work with a sandboxed toolchain or container based application by opening any folder inside (or mounted into) a container.
- **[WSL](/docs/remote/wsl.md)** - Get a Linux-powered development experience from the comfort of Windows by opening any folder in the Windows Subsystem for Linux.

While many extensions are expected to work unmodified in a remote environment, extension authors can get more information on testing and fixed remote related problems here: **[Adding Remote Support to Extensions](/api/advanced-topics/remote-extensions.md)**

## Questions, Feedback, Contributing

> **Dogfooding Note:**  When reporting issues, please file them against the https://github.com/Microsoft/vscode-remote/issues repository.

Have a question or feedback? There are many ways to interact with us.

- See the [FAQ](/docs/remote/faq.md) or the [troubleshooting guide](https://aka.ms/vscode-remote/troubleshooting).
- Search for answers on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode).
- [Up-vote a feature or request a new one](https://aka.ms/vscode-remote/feature-requests), search [existing issues](https://aka.ms/vscode-remote/issues), or [report a problem](https://aka.ms/vscode-remote/issues/new)
- Contribute a [development container definition](https://aka.ms/vscode-dev-containers) for others to use.
- Contribute to [our documentation](https://github.com/Microsoft/vscode-docs) or [VS Code itself](https://github.com/Microsoft/vscode).
- ...and more. See our [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) guide for details.
