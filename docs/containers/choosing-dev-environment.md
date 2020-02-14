---
Order: 8
Area: containers
TOCTitle: Choose a dev environment
ContentId: AF3D8F58-8F73-44CD-962C-B7F029E50478
PageTitle: Choosing an environment for container development
DateApproved: 01/29/2020
MetaDescription: Guidance on choosing remote or local environments for developing and debugging containerized apps, using Visual Studio Code.
---
# Your development environment

You can choose whether to develop a container-based service in the **local environment**, or in a **remote environment**. The local environment is the operating system of your developer workstation; using the local environment means you build and run your service container(s) using Docker installed on your workstation.

[A remote development environment](/docs/remote/remote-overview.md) is different from your developer workstation. It can be a remote machine accessible via SSH, a virtual machine running on your developer workstation, or a development container. A remote environment can have advantages over the local environment, the main one being the ability to use the same operating system during development, and when your service is running in production. To use a remote environment, you need to ensure that `docker` command (Docker CLI) [is available and functional within that environment](#enabling-docker-cli-inside-a-remote-development-environment).

The second important choice is whether to debug your service running as an ordinary process, or debug your service running in a container.

## Guidelines for choosing a development environment

1. Use the local environment when you are not concerned about:

   - Using the same OS for development and inside the service container.
   - Installing necessary tools and dependencies on top of your local environment.

1. Consider using a [development container](/docs/remote/containers.md) first, if you need a remote environment.

    - On Windows, using [Windows Subsystem for Linux (WSL)](#windows-subsystem-for-linux) is good option.

1. Debugging your service running in a container is possible, but brings additional complexity. Use normal debugging by default, and debugging in the container when you need it.

> The Docker extension natively supports container debugging for .NET- and Node.js-based services only.

## Enabling Docker CLI inside a remote development environment

The way to enable Docker CLI inside a remote development environment varies depending on the type of remote environment you choose.

### Development container

For a development container, you should redirect the Docker CLI inside the container to the Docker daemon running on the local machine.

First, make sure Docker CLI is installed into your development container. The exact steps [depend on the Linux distribution the container is using](https://docs.docker.com/install/).

Here is an example for Ubuntu-based distros (from a `.devcontainer/Dockerfile`):

```cli
    ...
    && apt-get -y install software-properties-common \
    && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - 2>/dev/null \
    && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable" \
    && apt-get update -y \
    && apt-get install -y docker-ce-cli \
    && apt-get install -y python python-pip \
    && pip install docker-compose \
    ...
```

Next, ensure that Docker socket is mapped into the development container (in `.devcontainer/devcontainer.json`):

```json
    ...
    "runArgs": [ "-v", "/var/run/docker.sock:/var/run/docker.sock"]
    ...
```

### Windows Subsystem for Linux

Windows Subsystem for Linux represents a great choice for container-based service development on Windows. [Windows Subsystem for Linux version 2 (WSL 2)](https://docs.microsoft.com/windows/wsl/wsl2-index) is strongly recommended. Docker Desktop for Windows has been updated to work with WSL 2 and has a graphical setting to enable Docker CLI inside WSL 2 distribution(s):

![Enable Docker inside WSL 2 distribution](images/devenv/devenv-enable-docker-wsl2.png)

> As of November 2019, WSL 2 is part of Windows Insider builds. To try out the new Docker engine you will need Windows Insider build 19018 or newer, and the [Docker Desktop for Windows Edge release 2.1.6.1 or newer](https://docs.docker.com/docker-for-windows/edge-release-notes/)
>
> The old version of WSL (WSL 1) does not provide an easy way to connect to the Docker daemon on the host.

### Remote machine or virtual machine

**Docker in Docker**

The simplest way to enable container development with a remote machine is to do [a full Docker installation](https://docs.docker.com/install/) on the machine, including Docker daemon. For a local VM, you need to enable **nested virtualization** option in your virtualization software. Nested virtualization is supported by all mainstream virtualization technologies such as Hyper-V, Parallels, or Oracle VirtualBox.

**Reusing the host Docker daemon**

Alternatively, you can install just the Docker CLI inside development environment and point the CLI to the Docker host (daemon) running on the developer workstation using [Docker context mechanism](https://docs.docker.com/engine/context/working-with-contexts/). The main concern with this approach is to ensure network connectivity from the VM to the Docker daemon on the host, and to do so in a secure way. One option is to use [SSH tunneling](/docs/containers/ssh.md) to developer workstation. Another option is to [make Docker daemon listen on HTTPS port](https://docs.docker.com/engine/security/https/). Both options are considered advanced and outside the scope of this document.

## Debugging in a container

The Docker extension supports debugging .NET Core-based and Node.js-based services running inside a container. Other programming languages are not supported at this time.

Debugging in a container may be harder to set up than regular debugging because a container is a stronger isolation mechanism than a process. In particular:

- The debug engine running inside VS Code process needs to communicate with the service process being debugged. In case of a service running inside a container this implies network communication via a common network (typically Docker host network). The container needs to have appropriate ports exposed via the Docker host network for the debug engine to connect to the service process (Node.js), or debugger proxy running inside the container (.NET Core).
- Source file information generated during build time is valid in the context of the build environment (where VS Code is running). The container filesystem is different from the build environment filesystem, and paths to source files need to be re-mapped in order for the debugger to display correct source file when a breakpoint is hit.

Because of the concerns above, it is generally recommended to use regular debugging, and employ debugging in a container when necessary.

For more information about how to set up debugging inside a container see [ASP.NET Core quickstart](/docs/containers/quickstart-aspnet-core.md), [Node.js quickstart](/docs/containers/quickstart-node.md), and [Docker extension task properties](/docs/containers/reference.md) (`docker-build` and `docker-run` tasks).

## Next steps

Read on to learn more about

- [Build and run a Node.js app in a container](/docs/containers/quickstart-node.md)
- [Build and run a .NET Core app in a container](/docs/containers/quickstart-aspnet-core.md)