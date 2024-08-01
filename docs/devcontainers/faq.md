---
Order: 16
Area: devcontainers
TOCTitle: FAQ
PageTitle: Visual Studio Code Dev Containers Frequently Asked Questions
ContentId: c4784db6-ab00-4ac7-bca8-88edb638c593
MetaDescription: Visual Studio Code troubleshooting tips and tricks for Dev Containers
DateApproved: 08/01/2024
---
# Dev Containers FAQ

This article includes some of the common questions for getting the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension up and running in different environments.

## Do "dev container definitions" define how an application is deployed?

No. A development container defines an environment in which you develop your application before you are ready to deploy. While deployment and development containers may resemble one another, you may not want to include tools in a deployment image that you use during development.

The [devcontainers/templates repository](https://github.com/devcontainers/templates) includes a set of dev container definitions for some common development environments. You can also [attach to a running container](/docs/devcontainers/attach-container.md) without setting up a dev container definition, if you prefer to use an alternate container build or deployment workflow.

## Do "dev containers definitions" define how an application is built? Like Buildpacks?

No. The [Buildpacks](https://buildpacks.io/) concept focuses on taking source code and generating deployable container images through a series of defined steps. A dev container is an environment in which you can develop your application before you are ready to build. They are therefore complementary concepts.

## I am seeing errors when trying to mount the local filesystem into a container

Right-click on the Docker task bar item. On Windows, select the **Settings** menu item then **Resources > File Sharing** and check the drive(s) where your source code is located. On macOS, select the **Preferences** menu item then **Resources > File Sharing** and make sure the folder containing your source code is under a file path specified in the list.

See [Docker Desktop for Windows tips](/docs/devcontainers/tips-and-tricks.md#docker-desktop-for-windows-tips) for information on workarounds to common Docker for Windows issues.

## I'm seeing an error about a missing library or dependency

Some extensions rely on libraries not found in specific Docker images. For example, [Visual Studio Live Share](https://visualstudio.microsoft.com/services/live-share/) requires the installation of system-level dependencies, which are [listed in their documentation](https://learn.microsoft.com/visualstudio/liveshare/reference/linux#install-prerequisites-manually). The need for these dependencies may depend on the operating system (for example, specific Linux distribution) used by your Docker image. You may need to install these dependencies during the Docker build process, by adding required commands to your Dockerfile. Search the specific extension's documentation to check for dependencies and see [Installing additional software](/docs/devcontainers/create-dev-container.md#install-additional-software) for help with resolving the problem.

## Can I connect to multiple containers at once?

A VS Code window can only connect to one window currently, but you can open a new window and [attach](/docs/devcontainers/attach-container.md) to an already running container or [use a common Docker Compose file with multiple `devcontainer.json` files](/remote/advancedcontainers/connect-multiple-containers.md) to automate the process a bit more.

## Can I work with containers on a remote host?

Yes, see the sections on [opening a folder on a remote SSH host](/docs/remote/ssh.md#open-a-folder-on-a-remote-ssh-host-in-a-container) or [Remote Tunnels host in a container](/docs/remote/tunnels.md#open-a-folder-on-a-remote-tunnels-host-in-a-container) for information.

## How can I build or deploy container images into my local Docker / Kubernetes install when working inside a container?

You can build images and deploy containers by forwarding the Docker socket and installing the Docker CLI (and kubectl for Kubernetes) in the container. See the [Docker-from-Docker](https://aka.ms/vscode-remote/samples/docker-from-docker), [Docker-from-Docker Compose](https://aka.ms/vscode-remote/samples/docker-from-docker-compose), and [Kubernetes-Helm](https://aka.ms/vscode-remote/samples/kubernetes-helm) dev container definitions for details.

## What are the connectivity requirements for the VS Code Server when it is running in a container?

Installation of VS Code Server requires that your local machine have outbound HTTPS (port 443) connectivity to:

* `update.code.visualstudio.com`
* `vscode.blob.core.windows.net`
* `*.vo.msecnd.net` (Azure CDN)

The Dev Containers extensions will download VS Code Server locally and copy it to the container once connected.

You can install extensions manually without an internet connection using the **Extensions: Install from VSIX...** command, but if you use the extension panel or `devcontainer.json` to install extensions, your local machine and VS Code Server will need outbound HTTPS (port 443) access  to:

* `marketplace.visualstudio.com`
* `*.vo.msecnd.net` (Azure CDN)
* `*.gallerycdn.vsassets.io` (Azure CDN)

Finally, some extensions (like C#) download secondary dependencies from `download.microsoft.com` or `download.visualstudio.microsoft.com`. Others (like [Visual Studio Live Share](https://learn.microsoft.com/visualstudio/liveshare/reference/connectivity#requirements-for-connection-modes)) may have additional connectivity requirements. Consult the extension's documentation for details if you run into trouble.

VS Code Server runs on a random port inside the container and VS Code itself uses `docker exec` to communicate with it over Docker's configured communication channel.

## As an extension author, what do I need to do to make sure my extension works?

The VS Code extension API hides most of the implementation details of running remotely so many extensions will just work inside dev containers without any modification. However, we recommend that you test your extension in a dev container to be sure that all of its functionality works as expected. See the article on [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

## What other resources are there that may be able to answer my question?

The following articles may help answer your question:

* [Advanced container configuration](/remote/advancedcontainers/overview.md) or [Tips and Tricks](/docs/devcontainers/tips-and-tricks.md)
* [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
* [Docker Compose file reference](https://docs.docker.com/compose/compose-file/)
* [Docker Desktop for Windows troubleshooting guide](https://docs.docker.com/docker-for-windows/troubleshoot) and [FAQ](https://docs.docker.com/docker-for-windows/faqs/)
* [Docker Desktop for Mac troubleshooting guide](https://docs.docker.com/docker-for-mac/troubleshoot) and [FAQ](https://docs.docker.com/docker-for-mac/faqs/)
* [Docker Support Resources](https://success.docker.com/article/best-support-resources)

## Can I use dev containers outside of VS Code?

As containerizing production workloads becomes commonplace, dev containers have become useful for scenarios beyond VS Code. We're creating the [Development Container Specification](https://containers.dev/implementors/spec) to empower anyone in any tool to configure a consistent development environment. It seeks to find ways to enrich existing formats with common development specific settings, tools, and configurations while still providing a simplified, un-orchestrated single container option – so that they can be used as coding environments or for continuous integration and testing.

You can learn more and review the specification at [containers.dev](https://containers.dev), and you can review active proposals and contribute to the specification in the [devcontainers/spec](https://github.com/devcontainers/spec) repository on GitHub.
