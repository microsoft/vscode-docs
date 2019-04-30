---
Order: 6
Area: remote
TOCTitle: FAQ
PageTitle: Visual Studio Code Remote Development Frequently Asked Questions
ContentId: 66bc3337-5fe1-4dac-bde1-a9302ff4c0cb
MetaDescription: Visual Studio Code Remote Development Frequently Asked Questions (FAQ) for SSH, Containers, and WSL
DateApproved: 4/11/2019
---
# Remote Development FAQ

This article covers frequently asked questions for each of the Visual Studio Code Remote Development extensions. See the [SSH](/docs/remote/ssh.md), [Containers](/docs/remote/containers.md), and [WSL](/docs/remote/wsl.md) articles for more details on setting up and working with each of their respective capabilities.

## General

### What is Visual Studio Code Remote Development?

The Visual Studio Code Remote Development extension pack allows you to open any folder in a container, on a remote machine (via SSH), or in the Windows Subsystem for Linux and take advantage of VS Code's full feature set. This means that VS Code can provide a local-quality development experience — including full IntelliSense, debugging, and more — regardless of where your code is located or hosted.

### What advantages does VS Code Remote Development provide over local editing?

Some benefits of remote development include:

* Being able to edit, build, or debug on a different OS than you are running locally.
* Being able to develop in an environment that matches the target deployment environment.
* Using larger or more specialized hardware than your local machine for development.
* The ability to edit code stored in another location, such as in the cloud or at a customer site.
* Sandboxing of developer environments to avoid conflicts, improve security, and speed up on-boarding.

Compared to using a network share or synchronizing files, VS Code Remote Development provides dramatically better performance along with better control over your development environment and tools.

### How do the Remote Development extensions work?

Visual Studio Code Remote Development allows your local VS Code installation to transparently interact with code and runtime environments sitting on other machines (whether virtual or physical) by moving the execution of certain commands to a "remote server". This "VS Code Server" is quickly installed by VS Code when you connect to a remote endpoint.

![Architecture summary](images/troubleshooting/architecture.png)

### How do the Remote Development extensions secure access to a remote machine / VM / container?

Visual Studio Code Remote Development uses existing, well known transports like [secure shell](https://en.wikipedia.org/wiki/Secure_Shell) to authenticate and secure traffic. No ports need to be publicly opened beyond those used by these well-known, secure transports.

The VS Code Server that is injected runs as the same user you used to sign into the machine, ensuring that VS Code and its extensions are not given improper elevated access without permission. The server is started and stopped by VS Code and is not wired into any user / global login or startup scripts. VS Code manages its lifecycle so you do not need to worry about whether or not it is running.

### Can the VS Code Server be installed or used on its own?

No. The VS Code Server is a component of the Remote Development extensions and is managed by a VS Code client. It is installed and updated automatically by VS Code when it connects to an endpoint and is not intended or licensed for use by other clients.

### What are the connectivity requirements for VS Code Server?

The VS Code Server requires outbound HTTPS (port 443) connectivity to `update.code.visualstudio.com` and `marketplace.visualstudio.com`. All other communication between the server and the VS Code client is accomplished through...

- SSH: An authenticated, secure SSH tunnel.
- Containers: An authenticated, random port automatically exposed via the Docker CLI.
- WSL: An authenticated, random local TCP port.

### What Linux packages / libraries need to be installed on host to use Remote Development?

Most Linux distributions will not require additional dependency installation steps. For SSH, Linux hosts need to have Bash (`/bin/bash`), `tar`, and either `curl` or `wget` installed which could be missing from certain stripped down distributions. However, [Alpine Linux](https://alpinelinux.org) is currently not supported.

## Dev containers

### Are "dev container definitions" supposed to define how an application is deployed?

No. A development container defines an environment in which you develop your application even before you are ready to build or deploy. While deployment and development containers may resemble one another, you often will not include tools in a deployment image that you will want during development.

The [vscode-dev-containers repo](https://aka.ms/vscode-dev-containers) includes a set of dev container definitions for some common development environments. You can also  [attach to a running container](/docs/remote/containers.md#attaching-to-running-containers) without setting up a dev container definition if you prefer to use an alternate container build or deployment workflow.

### Are "dev containers definitions" intended to define how an application is built? Like Buildpacks?

No. The [Buildpack](https://buildpacks.io/) concept focuses on taking source code and generating deployable container images through a series of defined steps. A dev container is an environment you can use to develop your application even before you are ready to build. They are therefore complementary concepts.

### Why do some commands invoked from the Docker Extension fail?

Using the Docker extension from a VS Code window opened on a container has some limitations. Most containers do not have the Docker command line installed. Therefore commands invoked from the Docker extenson that rely on the Docker command line, e.g., `Docker: Show Logs` fail. If you need to execute some of these commands then open a new local window and use the Docker extension from this VS Code window.

## Extensions authors

### As an extension author, what do I need to do?

The VS Code extension API abstracts many extensions away from any changes so they work without modification. However, given extensions can use any node module or runtime they want, there are situations where adjustments may need to be made. We recommend you should test your extension (particularly in a container) to be sure that no updates are required. See the article on [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

## License and privacy

### Are any of the Visual Studio Code Remote Development extensions or their components open-source?

The Visual Studio Code Remote Development extensions and their related components are free to use with an [open roadmap](https://aka.ms/vscode-remote/feedback), but are not currently open-source. See the [license](https://go.microsoft.com/fwlink/?linkid=2077057) for additional details.

### GDPR and VS Code Remote Development

The VS Code Remote Development extensions follow the GDPR policies as Visual Studio Code itself. See the [general FAQ](/docs/supporting/faq.md#gdpr-and-vs-code) for more details.

## Questions or feedback

Have a question or feedback?

- See [Tips and Tricks](/docs/remote/troubleshooting.md).
- Search on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode).
- Add a [feature request](https://aka.ms/vscode-remote/feature-requests) or [report a problem](https://aka.ms/vscode-remote/issues/new).
