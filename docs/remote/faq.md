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

The Visual Studio Code Remote Development extension pack allows you to open any folder in a container, on a remote machine (via SSH), or in the Windows Subsystem for Linux and take advantage of VS Code's full feature set. Given no source code needs to be on your local machine to use the capability, the result is that VS Code can provide a local-quality development experience including full IntelliSense, debugging, and more regardless of where your code is located or hosted.

### What advantages does VS Code Remote Development provide over local editing?

While many developers edit, build, deploy, and debug on their local machines, there are an increasing number of situations where you may need to interact with a codebase or runtime on the other side of an OS boundary. For example, you may want to edit, build or debug on the same OS you are deploying to, use larger or specialized hardware than your local machine, edit code sitting in another location like the cloud or a customer site, sandbox your developer tools to avoid conflicts, improve security, or speed up on-boarding, and more. When using the capability, VS Code selectively runs certain extensions on the remote machine to optimize your experience and given no source code needs to be on your local machine to use the capability, the approach provides dramatic performance and fidelity benefits over using network shares or synchronizing files.

### How do the Remote Development extensions work?

Visual Studio Code Remote Development allows your local VS Code installation and any extension provided features to transparently interact with code and runtime environments sitting on other machines (whether virtual or physical) through selective execution of certain commands on a "remote server". This "VS Code Remote Server" is quickly installed by VS Code when you connect to a remote endpoint. When in use, the server automatically installs certain extensions on the remote machine to optimize your experience.

![Architecture summary](images/troubleshooting/architecture.png)

### How do the Remote Development extensions secure access to a remote machine / VM / container?

Visual Studio Code Remote Development uses existing, well known transports like secure shell to authenticate and secure traffic. No ports need to be publicly opened beyond those used by these well-known, secure transports for the capability to function. The VS Code Remote Server that is injected runs as the same user you used to sign into the machine which ensures VS Code and its extensions are not given improper elevated access without permission. The server is started and stopped by VS Code and is not wired into any user / global login or startup scripts. VS Code manages its lifecycle so you do not need to worry about whether or not it is running.

### Can the VS Code Remote Server be installed or used on its own?

No. The VS Code Remote Server is a component of the Remote Development extensions and is managed by a VS Code client. It is installed and updated automatically by VS Code when it connects to an endpoint and is not intended or licensed for use by other clients.

### What are the connectivity requirements for VS Code Remote Server?

The VS Code Remote Server requires outbound HTTPS (port 443) connectivity to `update.code.visualstudio.com` and `marketplace.visualstudio.com`. All other communication between the server and the VS Code client is accomplished through...

- SSH: An authenticated, secure SSH tunnel.
- Containers: An authenticated, random port automatically exposed via the Docker CLI.
- WSL: An authenticated, random local TCP port.

### What Linux packages / libraries need to be installed on host to use Remote Development?

Most Linux distributions will not require additional dependency installation steps. For SSH, Linux hosts need to have Bash (`/bin/bash`), `tar`, and either `curl` or `wget` installed which could be missing from certain stripped down distributions. However, Alpine Linux is currently not supported.

## Dev Containers

### Are "dev container definitions" supposed to define how an application is deployed?

No. A development container is an environment that you can use to develop your application even before you are ready to build or deploy. While deployment and development containers may resemble one another, you often will not include tools in a deployment image that you will want during development. The set of "dev container definitions" found in the [vscode-dev-containers repo](https://aka.ms/vscode-dev-containers) are intended to help jump start the process of creating a development container by including a set of well-known container build or deployment files and a `devcontainer.json` file. This file provides a home for tooling and edit-time related settings and a pointer to the image (or files that define the image) that should be used for the development container. However, their use is entirely optional, and you can [attach to a running container](#attaching-to-running-containers) in other container-based workflows and scenarios.

### Are "dev containers definitions" intended to define how an application is built? Like Buildpacks?

No. The [Buildpack](https://buildpacks.io/) concept focuses on taking source code and generating deployable container images through a series of defined steps. A dev container is an environment you can use to develop your application even before you are ready to build. They are therefore complementary concepts. The `devcontainer.json` file is not intended to define how your application should be built, but rather provides a home for tooling and edit-time related settings and a pointer to an image or image definition files. Today it supports pointing to an existing image (which could be generated by a Buildpack), a Dockerfile, or one or more `docker-compose.yml` files, but more will be added as the community has interest. In all cases, you can also opt to [attach to a running container](#attaching-to-running-containers) if you prefer to use an alternate container build or deployment workflow.

Similarly, the "dev container definitions" found in the [vscode-dev-containers repo](https://aka.ms/vscode-dev-containers) can help jump start the process of creating a dev container when you do not have an existing image, `Dockerfile`, or `docker-compose.yml`. These can also act as samples if you do have existing container files. However, they are not intended to define how an application should be built.

## Extensions Authors

### As an extension author what do I need to do?

The VS Code extension API abstracts many extensions away from any changes so they work without modification. However, given extensions can use any node module or runtime they want, there are situations where adjustments may need to be made. We recommend you should test your extension (particularly in a container) to be sure that no updates are required. See [Adding Remote Development Support to Extensions](/api/advanced-topics/remote-extensions.md) for details.

## License and Privacy

### Are any of the Visual Studio Code Remote Development extensions or their components open source?

The Visual Studio Code Remote Development extensions and their related components are free to use with an [open roadmap](https://aka.ms/vscode-remote/feedback), but are not currently open source. See the [license](https://go.microsoft.com/fwlink/?linkid=2077057) for additional details.

### GDPR and VS Code Remote Development

The VS Code Remote Development extensions follow the GDPR policies as Visual Studio Code itself. See the [general FAQ](/docs/supporting/faq.md#gdpr-and-vs-code) for more details.

## Questions, Feedback, Contributing

> **Dogfooding Note:**  When reporting issues, please file them against the https://github.com/Microsoft/vscode-remote/issues repository.

Have a question or feedback? There are many ways to interact with us.

- Search for answers on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode).
- [Up-vote a feature or request a new one](https://aka.ms/vscode-remote/feature-requests), search [existing issues](https://aka.ms/vscode-remote/issues), or [report a problem](https://aka.ms/vscode-remote/issues/new)
- Contribute a [development container definition](https://aka.ms/vscode-dev-containers) for others to use.
- Contribute to [our documentation](https://github.com/Microsoft/vscode-docs) or [VS Code itself](https://github.com/Microsoft/vscode).
- ...and more. See our [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) guide for details.
