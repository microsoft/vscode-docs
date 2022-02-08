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
     * You'll just need Docker installed on the remote host, rather than needing to install Docker locally.
* Other Docker compliant CLIs, installed locally or in a remote environment
     * Remote - Containers interacts with CLIs; it makes no assumptions about how a container engine works and does not interact with container engines or daemon directly.
     * Please note that other Docker compliant CLIs are not officially supported.

Continue reading to learn alternate ways you may install and leverage Docker or a Docker compliant CLI.

## Windows: Windows Subsystem for Linux (WSL)
On Windows, you can use Docker installed in WSL through the [Remote - WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl). You can reference the [Docker documentation](https://docs.docker.com/engine/install/) for installing Docker on Linux, with specific information per distro starting [here](https://docs.docker.com/engine/install/centos/).

One issue is that the dockerd daemon won't start automatically due to the lack of systemd or any other system daemon. You can use [Distrod](https://github.com/nullpo-head/wsl-distrod) to get WSL distros with systemd. You may install a new distro or update your current distros to run systemd.

## MacOS: Colima

[Colima](https://github.com/abiosoft/colima) provides container runtimes on macOS. It's recommended to use Colima v0.2.2 or later so that VS Code can properly see containers running through Colima.

Colima automatically sets up a `colima` [context](https://docs.docker.com/engine/context/working-with-contexts/) in Docker and makes it the active context. You may also want to install the `docker` and `docker-compose` CLIs before running `colima start` for this setup to work properly.

> Note: Colima uses Alpine Linux, which isn't supported by Remote - SSH.

## Linux

### Cloud-Init VM
You may use the [Remote - SSH extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) with Remote - Containers. This enables you just to have Docker installed on your remote machine.

You may use Remote - SSH to connect to a Linux VM with Docker installed. You may use a [Cloud-Init](https://cloud-init.io/) file (which is an industry standard) to install Docker on the VM automatically. As an example, you can create an Azure VM through the Azure CLI, and set it to use a `cloud-init.txt` during creation.

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

### Podman

[Podman](https://podman.io/) 1.9+ is mostly compatible with Docker's CLI commands and therefore generally does work if you update the `Docker Path` setting (which may be accessed through **Remote > Containers: Docker Path**) to `podman` on Linux.

![Docker Path setting](images/platform-options/docker-path-setting.png)

However, certain tricks like [Docker-from-Docker do not work](https://github.com/containers/libpod/issues/4056#issuecomment-535511841) due to limitations in Podman. This affects the **Remote-Containers: Try a Development Container Sample...** and **[Remote- Containers: Clone Repository in Container Volume...](/docs/remote/containers.md#quick-start-open-a-git-repository-or-github-pr-in-an-isolated-container-volume)** commands.

To work around issues with rootless Podman (i.e. not respecting a non-root `"remoteUser"` and trying to install the server in `root`), you may set the following:

```bash
"runArgs": [
  "--userns=keep-id"
],
"containerEnv": {
  "HOME": "/home/node"
}
```

`"remoteUser"` can be used when `"HOME"` is set because Remote - Containers gives that precedence over the home folder it finds in `/etc/passwd`.

Podman also has its own implementation of the Compose Spec with [Podman Compose](https://github.com/containers/podman-compose).

# Other container engines

You may open or review requests for support for other container engines through the [vscode-remote-release repository](https://github.com/microsoft/vscode-remote-release). There are already several feature requests you may explore:

* [nerdctl](https://github.com/microsoft/vscode-remote-release)
* [critcl](https://github.com/microsoft/vscode-remote-release/issues/6075)
* [Singularity containers](https://github.com/microsoft/vscode-remote-release/issues/3066)