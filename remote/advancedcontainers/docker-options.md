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

## Docker Contexts

[Docker Contexts](https://docs.docker.com/engine/context/working-with-contexts/) allow you to interact with different hosts - you can set up contexts for each host and switch between them.

You create new contexts with `docker context create`. The current context can be changed using `docker context use <context>`.

The [Docker extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) comes with `docker.host` (same as `DOCKER_HOST` env variable) and `docker.context` (same as `DOCKER_CONTEXT` env variable) user settings that are also honored by the Remote-Containers extension.

> **Note**: The above settings are only visible when the Docker extension is installed. Without the Docker extension, Remote-Containers will use the current context.

### Colima

[Colima](https://github.com/abiosoft/colima) provides container runtimes on macOS and Linux. It's recommended to use Colima v0.2.2 or later so that VS Code can properly see containers running through Colima.

Update settings in the Docker extension to use Colima:
* `"docker.host": "unix:///Users/<username>/.colima/docker.sock",`
* `"docker.context": "colima"`

## Remote hosts

Connecting to a remote host can enable you to connect to a remote environment with Docker or another supported engine, rather than needing to install the engine locally.

### SSH
You may use the [Remote - SSH extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) with Remote - Containers. This enables you just to have Docker or an alternate supported engine on your remote machine - Docker is not needed locally.

You may learn more about this and other remote connection options in the [Develop on a remote Docker host doc](https://code.visualstudio.com/remote/advancedcontainers/develop-remote-host#_connect-using-docker-contexts).

### Windows Subsystem for Linux (WSL)
On Windows, you can use Docker installed in WSL when using the [Remote - WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl).

You can also use [Distrod](https://github.com/nullpo-head/wsl-distrod) to install a WSL distro with systemd.

## Other container engines

You may open or review requests for support for other container engines through the [vscode-remote-release repository](https://github.com/microsoft/vscode-remote-release). There are already feature requests for several engines:

* [nerdctl](https://github.com/microsoft/vscode-remote-release)
* [critcl](https://github.com/microsoft/vscode-remote-release/issues/6075)
* [Singularity containers](https://github.com/microsoft/vscode-remote-release/issues/3066)