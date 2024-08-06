---
Order: 17
Area: remote
TOCTitle: FAQ
PageTitle: Visual Studio Code Remote Development Frequently Asked Questions
ContentId: 66bc3337-5fe1-4dac-bde1-a9302ff4c0cb
MetaDescription: Visual Studio Code Remote Development Frequently Asked Questions (FAQ) for SSH, Containers, and WSL
DateApproved: 08/01/2024
---
# Remote Development FAQ

This article covers frequently asked questions for each of the **Visual Studio Code Remote Development** extensions. See the [SSH](/docs/remote/ssh.md), [Containers](/docs/devcontainers/containers.md), and [WSL](/docs/remote/wsl.md) articles for more details on setting up and working with each of their respective capabilities. Or try the introductory [Tutorials](/docs/remote/ssh-tutorial.md) to help get you running quickly in a remote environment.

For questions about [GitHub Codespaces](https://github.com/features/codespaces), see the [GitHub Codespaces documentation](https://docs.github.com/github/developing-online-with-codespaces).

## General

### What is Visual Studio Code Remote Development?

The Visual Studio Code [Remote Development extension pack](https://aka.ms/vscode-remote/download/extension) allows you to open any folder in a container, on a remote machine (via SSH), or in the Windows Subsystem for Linux and take advantage of VS Code's full feature set. This means that VS Code can provide a local-quality development experience — including full IntelliSense (completions), debugging, and more — regardless of where your code is located or hosted.

### What advantages does VS Code Remote Development provide over local editing?

Some benefits of remote development include:

* Being able to edit, build, or debug on a different OS than you are running locally.
* Being able to develop in an environment that matches the target deployment environment.
* Using larger or more specialized hardware than your local machine for development.
* The ability to edit code stored in another location, such as in the cloud or at a customer site.
* Separating developer environments to avoid conflicts, improve security, and speed up on-boarding.

Compared to using a network share or synchronizing files, VS Code Remote Development provides dramatically better performance along with better control over your development environment and tools.

### How do the Remote Development extensions relate to GitHub Codespaces?

[GitHub Codespaces](https://github.com/features/codespaces) is a service that provides managed cloud-hosted development environments accessible from both VS Code and a new browser-based editor. The service also allows VS Code and the browser-based editor to access self-hosted environments (desktop or server) without requiring an SSH server or even a direct network route. You can read more in the [GitHub Codespaces documentation](https://docs.github.com/github/developing-online-with-codespaces).

While the Remote Development and Codespaces extensions share technology and features, the Remote Development extensions are released separately and can operate independently from GitHub Codespaces.

### How do the Remote Development extensions work?

Visual Studio Code Remote Development allows your local VS Code installation to transparently interact with source code and runtime environments on other machines (whether virtual or physical) by moving the execution of certain commands to a "remote server". The **VS Code Server** is quickly installed by VS Code when you connect to a remote endpoint and can host extensions that interact directly with the remote workspace, machine, and file system.

![Architecture summary](images/troubleshooting/architecture.png)

See [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for additional details about extensions.

### How do the Remote Development extensions secure access to a remote machine, VM, or container?

Visual Studio Code Remote Development uses existing, well known transports like [secure shell](https://en.wikipedia.org/wiki/Secure_Shell) to authenticate and secure traffic. No ports need to be publicly opened beyond those used by these well-known, secure transports.

The VS Code Server that is injected runs as the same user you used to sign in to the machine, ensuring that VS Code and its extensions are not given improper elevated access without permission. The server is started and stopped by VS Code and is not wired into any user or global login or startup scripts. VS Code manages the server's lifecycle so you do not need to worry about whether or not it is running.

### Can VS Code Server be installed or used on its own?

No. The VS Code Server is a component of the Remote Development extensions and is managed by a VS Code client. It is installed and updated automatically by VS Code when it connects to an endpoint and if installed separately could become quickly out of date. It is not intended or [licensed](#license-and-privacy) for use by other clients.

### What are the connectivity requirements for VS Code Server?

Installation of VS Code Server requires that your local machine have outbound HTTPS (port 443) connectivity to:

* `update.code.visualstudio.com`
* `*.vo.msecnd.net` (Azure CDN)

By default, the Remote - SSH will attempt to download on the remote host, but if you enable `remote.SSH.allowLocalServerDownload`, the extension will fall back to downloading VS Code Server locally and transferring it remotely once a connection is established.

The Dev Containers extension always downloads locally and transfers into the container.

You can install extensions manually without an internet connection using the **Extensions: Install from VSIX...** command, but if you use the extension panel or `devcontainer.json` to install extensions, your local machine and VS Code Server will need outbound HTTPS (port 443) access to:

* `marketplace.visualstudio.com`
* `vscode.blob.core.windows.net`
* `*.vo.msecnd.net` (Azure CDN)
* `*.gallerycdn.vsassets.io` (Azure CDN)

Finally, some extensions (like C#) download secondary dependencies from `download.microsoft.com` or `download.visualstudio.microsoft.com`. Others (like [Visual Studio Live Share](https://learn.microsoft.com/visualstudio/liveshare/reference/connectivity#requirements-for-connection-modes)) may have additional connectivity requirements. Consult the extension's documentation for details if you run into trouble.

All other communication between the server and the VS Code client is accomplished through the following transport channels depending on the extension:

* SSH: An authenticated, secure SSH tunnel.
* Containers: Docker's configured communication channel (via `docker exec`).
* WSL: A random local port.

You can find a list of locations VS Code itself needs access to in the [network connections article](/docs/setup/network.md#common-hostnames).

### Why can't I see my local containers in the Docker extension when using the Remote - extensions?

By default, the Docker extension will run remotely. While this is a sensible default in some cases, it means the extension may not show local containers when VS Code is connected to a remote SSH host, container, or WSL.

You can use one of the following solutions to resolve this problem:

* Open a new local window (**File > New Window**) and use it to work with local containers.

* Install the [Dev Containers](https://aka.ms/vscode-remote/download/containers) extension and use the [Remote Explorer](/docs/devcontainers/containers.md#managing-containers) in situations when you need to see your local containers.

* **WSL only**:  Use the [Docker Technical Preview for WSL 2](https://docs.docker.com/docker-for-windows/wsl-tech-preview/) or [configure Docker Desktop for use in WSL 1](https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly).

* **Dev Containers only**: Forward the [Docker socket and install the Docker CLI](https://aka.ms/vscode-remote/samples/docker-from-docker) (only) in the container.

* Use the [extensionKind property](/docs/devcontainers/containers.md#advanced-forcing-an-extension-to-run-locally-or-remotely) to force the extension to be `ui`. However, this will prevent some commands from working.

### What Linux packages or libraries need to be installed on a host to use Remote Development?

Remote Development requires kernel >= 4.18, glibc >=2.28, and libstdc++ >= 3.4.25. Recent x86_64 glibc-based distributions have the best support, but exact requirements can vary by distribution.

Support for musl-based [Alpine Linux](https://alpinelinux.org) is available for the Dev Containers and WSL extensions and ARMv7l (AArch32) / ARMv8l (AArch64) is available in Remote - SSH. However, native dependencies in certain extensions may cause them not to function on non-x86_64 glibc distributions. Note that experimental ARMv8l (AArch64) is available in [VS Code Insiders](https://code.visualstudio.com/insiders/) only.

See [Remote Development with Linux](/docs/remote/linux.md) for additional details.

### Can I run VS Code Server on older Linux distributions?

Starting with VS Code release 1.86.1 (January 2024), the minimum requirements for the build toolchain of the remote server were raised. The prebuilt servers distributed by VS Code are compatible with Linux distributions based on glibc 2.28 or later, for example, Debian 10, RHEL 8, or Ubuntu 20.04. VS Code will still allow users to connect to an OS that is not supported by VS Code (OS that does not provide glibc >= 2.28 and libstdc++ >= 3.4.25) until February 2025. This allows time for you and your companies to migrate to newer Linux distributions. VS Code will show a dialog and banner message when you connect to an OS version that is not supported by VS Code.

### Can I install individual extensions instead of the extension pack?

Yes. The [Remote Development extension pack](https://aka.ms/vscode-remote/download/extension) provides a convenient way for you to access all of the latest remote capabilities as they are released. However, you can always install the individual extensions from the Marketplace or VS Code Extensions view.

* [Remote - SSH](https://aka.ms/vscode-remote/download/ssh)
* [Dev Containers](https://aka.ms/vscode-remote/download/containers)
* [WSL](https://aka.ms/vscode-remote/download/wsl)

## How can I review and configure extension settings?

As with [other parts of Visual Studio Code](/docs/getstarted/settings.md), you can customize each of the Remote Development extensions through their settings. Using Dev Containers as an example, you may review a list of all Dev Containers settings by opening the extension in the Extensions view (`kb(workbench.view.extensions)`), and navigating to **Feature Contributions**:

![List of settings in Feature Contributions](images/faq/feature-contributions.png)

## WSL

### What is the advantage of the extension over using WSL as the terminal?

You can think of WSL as a Linux machine running on Windows, where you can install Linux specific frameworks/tools (for example Python, Go, Rust, etc.) without impacting your Windows setup. You can then use VS Code and the WSL extension to develop in the context of what is installed in WSL, isolated from what is installed on Windows.

For example, you might install the Go stack in WSL (compiler, debugger, linters, etc.). If you run VS Code only on Windows, you must also install the same Go stack there to get features like smart completions, debugging, Go to Definition navigation. And because the language services are running on Windows, they don’t know what is in WSL.

It’s true that you can run binaries in WSL from Windows and vice-versa, but regular VS Code extensions don’t know how to do this. This is how we started out supporting debugging in WSL, but quickly realized we would have to update all extensions to know about WSL.

We decided instead to make parts of VS Code run in WSL and let the UI running on Windows talk to the VS Code server running in WSL. This is what the WSL extension enables and with it, the Go extension runs in WSL along with the rest of the Go tools (compiler, debugger, linters), while VS Code runs on Windows.

With this approach, language features like smart completions just work against what is in WSL without having to set up anything on Windows. You don't have to worry about path issues or set up different versions of development stacks on Windows. If you are deploying applications to Linux, you can set up your WSL instances to look like your runtime environment while still getting a rich editing experience on Windows.

## Extensions authors

### As an extension author, what do I need to do?

The VS Code extension API abstracts away local/remote details so most extensions will work without modification. However, given extensions can use any node module or runtime they want, there are situations where adjustments may need to be made. We recommend you should test your extension (particularly in a container) to be sure that no updates are required. See [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

### Can an extension access local resources or APIs when a user is connected remotely?

When VS Code connects to a remote environment, extensions are classified as either **UI** or **Workspace** extensions. UI Extensions run in a **local extension host**, can contribute UI or personalization features (for example themes), and have access to local files or APIs. Workspace extensions run in a **remote extension host** with the workspace and have full access to the source code, remote filesystem, and remote APIs. While Workspace extensions do not focus on UI customization, they can contribute explorers, views, and other UI elements as well.

When a user installs an extension, VS Code attempts to infer the correct location and install it based on its type. Extensions that do not need to run remotely like themes and other UI customizations are automatically installed on the UI side. All others are treated as Workspace extensions since they are the most full-featured. However, extension authors can also override this location with an `extensionKind` property in `package.json`.

If your extension is not functioning as expected, [there are steps to check](/api/advanced-topics/remote-extensions#incorrect-execution-location) if it is running in the correct location or should perhaps have a different `extensionKind`. Also see [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for additional details on what extension authors need to know about Remote Development and Codespaces.

## License and privacy

### Location

You can find the licenses for the VS Code Remote Development extensions here:

* [Remote-SSH License](https://marketplace.visualstudio.com/items/ms-vscode-remote.remote-ssh/license)
* [WSL License](https://marketplace.visualstudio.com/items/ms-vscode-remote.remote-wsl/license)
* [Dev Containers License](https://marketplace.visualstudio.com/items/ms-vscode-remote.remote-containers/license)

### Why aren't the Remote Development extensions or their components open source?

The Visual Studio Code Remote Development extensions and their related components use an [open planning, issue, and feature request process](https://aka.ms/vscode-remote/feedback), but are not currently open source. The extensions share source code which is also used in fully managed remote development services like [GitHub Codespaces](https://github.com/features/codespaces) and their related extensions.

See the [Visual Studio Code and 'Code - OSS' Differences](https://github.com/microsoft/vscode/wiki/Differences-between-the-repository-and-Visual-Studio-Code) and [Microsoft Extension Licenses](/docs/supporting/oss-extensions.md) articles for more information.

### Are there any restrictions on where the Remote Development extensions can connect?

You are free to use the extensions for both personal or corporate use to connect to your own physical machines, virtual machines, or containers. These can be on-premise, in your own private cloud or datacenter, in Azure, or other cloud/non-cloud hosting providers. You cannot build public products or services on top of the extensions or their related components (see next question).

### Can I use the VS Code Remote Development extensions to build my own product or service?

You can use the extensions with your own internal or private services. You cannot build a public or commercial service on top of the VS Code Remote Development extensions or their related components (for example VS Code Server). You cannot create other extensions that extend or manipulate the Remote Development extensions. While the license states you may not "provide the software as a stand-alone or integrated offering or combine it with any of your applications for others to use", you can document how to use the extensions in conjunction with your service.

### Can I repackage or reuse VS Code Server in my own public service offering?

No. The license states that you may not "provide the software as a stand-alone or integrated offering or combine it with any of your applications for others to use" which means you may not build public products or services on top of the VS Code Server.

### I have a question about whether I can use the extensions for X, who can I ask?

Please file an [issue](https://github.com/microsoft/vscode-remote-release/issues).

### GDPR and VS Code Remote Development

The VS Code Remote Development extensions follow the GDPR policies as Visual Studio Code itself. See the [general FAQ](/docs/supporting/faq.md#gdpr-and-vs-code) for more details.

## Questions or feedback

Have a question or feedback?

* See [Tips and Tricks](/docs/remote/troubleshooting.md).
* Search on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode-remote).
* Add a [feature request](https://aka.ms/vscode-remote/feature-requests) or [report a problem](https://aka.ms/vscode-remote/issues/new).
