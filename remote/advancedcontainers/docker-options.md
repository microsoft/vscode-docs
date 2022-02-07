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

You may harness Docker in the Remote - Containers extension in a few ways:
* Docker installed locally
* Docker installed on another machine or remote environment
* Other Docker compliant CLIs, installed locally or in a remote environment
     * Remote - Containers interacts with CLIs; it makes no assumptions about how a container engine works and does not interact with container engines or daemon directly.
     * Please note that other Docker compliant CLIs are not officially supported.

Continue reading to learn alternate ways you may install and leverage Docker or a Docker compliant CLI.

## Podman

[Podman](https://podman.io/) 1.9+ is mostly compatible with Docker's CLI commands and therefore generally does work if you update the `Docker Path` setting (which may be accessed through **Remote > Containers: Docker Path**) to `podman` on Linux.

![Docker Path setting](images/platform-options/docker-path-setting.png)

However, certain tricks like [Docker-from-Docker do not work](https://github.com/containers/libpod/issues/4056#issuecomment-535511841) due to limitations in Podman. This affects the **Remote-Containers: Try a Development Container Sample...** and **[Remote- Containers: Clone Repository in Container Volume...](/docs/remote/containers.md#quick-start-open-a-git-repository-or-github-pr-in-an-isolated-container-volume)** commands.

Docker Compose is also not supported by Podman.

## Remote hosts

Connecting to a remote host can enable you to connect to a remote environment with Docker or a Docker complaint CLI, rather than needing to install Docker locally.

### Platform options

Docker is available on a variety of Linux platforms, macOS, and Windows. If connecting to a remote Linux machine, you may review how to install Docker [here](https://docs.docker.com/engine/install/), with specific information per distro starting [here](https://docs.docker.com/engine/install/centos/).

### SSH
You may use the [Remote - SSH extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) with Remote - Containers. This enables you just to have Docker installed on your remote machine.

You may use Remote - SSH to connect to a Linux VM with Docker installed. As an example, you can create an Azure VM through the Azure CLI, and set it to use a `cloud-init.txt` file to install Docker automatically.

`cloud-init.txt` file:
``` bash
#cloud-config

apt:
  sources:
    docker.list:
      source: deb [arch=amd64] https://download.docker.com/linux/ubuntu $RELEASE stable
      keyid: 9DC858229FC7DD38854AE2D88D81803C0EBFCD88

packages:
  - docker-ce
  - docker-ce-cli

groups:
  - docker

system_info:
  default_user:
    groups: [docker]
```

Example Azure CLI commands. Be sure to update `<location-here>` to a data center close to you (i.e. `eastus`, `westeurope`):
``` bash
az login

az group create --name dev-server --location <location-here>

az vm create \
  --resource-group dev-server \
  --name dev-server \
  --image Canonical:0001-com-ubuntu-server-impish:21_10-gen2:latest \
  --custom-data cloud-init.txt \
  --generate-ssh-keys
```

You may learn more about using Remote - SSH with Remote - Containers in the doc on how to [develop on a remote Docker host](https://code.visualstudio.com/remote/advancedcontainers/develop-remote-host#_connect-using-docker-contexts).

**Colima**

[Colima](https://github.com/abiosoft/colima) provides container runtimes on macOS. It's recommended to use Colima v0.2.2 or later so that VS Code can properly see containers running through Colima.

You can use the Remote - SSH extension to connect to a Colima VM and clone your repositories on the VM. This will avoid potential issues with the workspace folder on the macOS filesystem being mounted as readonly.

You may add the following entry to your `~/.ssh/config`:

``` bash
Host colima
    HostName localhost
    Port 56384
    IdentityFile ~/.lima/_config/user
    NoHostAuthenticationForLocalhost yes
```

> **Note:** The port may change after restarting the VM.

### Windows Subsystem for Linux (WSL)
On Windows, you can use Docker installed in WSL through the [Remote - WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl). You can reference the [Docker documentation](https://docs.docker.com/engine/install/) for installing Docker on Linux.

One issue is that the dockerd daemon won't start automatically due to the lack of systemd or any other system daemon. You can use [Distrod](https://github.com/nullpo-head/wsl-distrod) to get WSL distros with systemd. You may install a new distro or update your current distros to run systemd.

## Other container engines

You may open or review requests for support for other container engines through the [vscode-remote-release repository](https://github.com/microsoft/vscode-remote-release). There are already several feature requests you may explore:

* [nerdctl](https://github.com/microsoft/vscode-remote-release)
* [critcl](https://github.com/microsoft/vscode-remote-release/issues/6075)
* [Singularity containers](https://github.com/microsoft/vscode-remote-release/issues/3066)