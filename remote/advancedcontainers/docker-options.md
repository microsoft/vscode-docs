---
Order: 16
Area: advancedcontainers
TOCTitle: Docker Options
PageTitle: Remote - Containers Docker options
ContentId:
MetaDescription: Remote - Containers Docker options
DateApproved: 2/4/2022
---

# Alternate ways to install Docker

Remote - Containers interacts with CLIs; it makes no assumptions about how a container engine works and does not interact with container engines or daemon directly. You may use other Docker compliant CLIs with Remote - Containers, several of which are described below. Please note they are not officially supported.

## Podman

[Podman](https://podman.io/) 1.9+ is mostly compatible with Docker's CLI commands and therefore generally does work if you update the `Docker Path` setting (which may be accessed through **Remote > Containers: Docker Path**) to `podman` on Linux.

![Docker Path setting](images/platform-options/docker-path-setting.png)

However, certain tricks like [Docker-from-Docker do not work](https://github.com/containers/libpod/issues/4056#issuecomment-535511841) due to limitations in Podman. This affects the **Remote-Containers: Try a Development Container Sample...** and **[Remote- Containers: Clone Repository in Container Volume...](/docs/remote/containers.md#quick-start-open-a-git-repository-or-github-pr-in-an-isolated-container-volume)** commands.

Docker Compose is also not supported by Podman.

## Remote hosts

Connecting to a remote host can enable you to connect to a remote environment with Docker or another supported engine, rather than needing to install the engine locally.

### Platform options

Docker is available on a variety of Linux platforms, macOS, and Windows. If connecting to a remote Linux machine, you may review how to install Docker [here](https://docs.docker.com/engine/install/), with specific information per distro starting [here](https://docs.docker.com/engine/install/centos/).

### SSH
You may use the [Remote - SSH extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) with Remote - Containers. This enables you just to have Docker or an alternate supported engine on your remote machine; Docker is not needed locally.

You may learn more about this and other remote connection options in the [Develop on a remote Docker host doc](https://code.visualstudio.com/remote/advancedcontainers/develop-remote-host#_connect-using-docker-contexts).

**Colima**

[Colima](https://github.com/abiosoft/colima) provides container runtimes on macOS. It's recommended to use Colima v0.2.2 or later so that VS Code can properly see containers running through Colima.

You can use the Remote - SSH extension to connect to a Colima virtual machine and clone your repositories on the VM. This will avoid potential issues with the workspace folder on the macOS filesystem being mounted readonly. You may add the following entry to your `~/.ssh/config`:

```
Host colima
    HostName localhost
    Port 56384
    IdentityFile ~/.lima/_config/user
    NoHostAuthenticationForLocalhost yes
```

> **Note:** The port may change after restarting the VM.

### Windows Subsystem for Linux (WSL)
On Windows, you can use Docker installed in WSL when using the [Remote - WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl). You can use the documentation [here](https://docs.docker.com/engine/install/) for installing Docker on Linux.

One issue is that the dockerd daemon won't start automatically due to the lack of systemd or any other system daemon. You can use [Distrod](https://github.com/nullpo-head/wsl-distrod) to get WSL distros with systemd. You may install a new distro or update your current distros to run systemd.

## Other container engines

You may open or review requests for support for other container engines through the [vscode-remote-release repository](https://github.com/microsoft/vscode-remote-release). There are already feature requests for several engines:

* [nerdctl](https://github.com/microsoft/vscode-remote-release)
* [critcl](https://github.com/microsoft/vscode-remote-release/issues/6075)
* [Singularity containers](https://github.com/microsoft/vscode-remote-release/issues/3066)