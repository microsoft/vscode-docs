---
Order: 15
Area: advancedcontainers
TOCTitle: Docker options
PageTitle: Dev Containers Docker options
ContentId: 5098c2a8-5aba-4a48-9e9b-5dabf1db93ca
MetaDescription: Dev Containers Docker options
DateApproved: 08/01/2024
---

# Alternate ways to install Docker

You can use Docker with the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension in a few ways:

* Docker installed locally.
* Docker installed on another machine or remote environment.
  * You only need Docker installed on the remote host, rather than Docker installed locally.
* Other Docker compliant CLIs, installed locally or in a remote environment.
  * For instance, [Rancher Desktop](https://docs.rancherdesktop.io/) is another way to install Docker, providing container management and Kubernetes on Windows, macOS, and Linux.
    * Since Rancher Desktop supports Docker CLI via [Moby](https://mobyproject.org/), you can use Dev Containers extension with it. You may learn how to get started in Rancher Desktop's [guide](https://docs.rancherdesktop.io/how-to-guides/vs-code-remote-containers/).
  * Dev Containers interacts with CLIs; it makes no assumptions about how a container engine works and does not interact with container engines or daemons directly.
  * Note that other Docker compliant CLIs are not officially supported.

Continue reading to learn alternate ways you can install and use Docker or a Docker compliant CLI.

## Windows: Windows Subsystem for Linux (WSL)

On Windows, you can use Docker installed in WSL through the [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) extension. You can reference the [Docker documentation](https://docs.docker.com/engine/install/) for installing Docker on Linux, with [specific information per distribution](https://docs.docker.com/engine/install/centos/).

One issue is that the `dockerd` daemon won't start automatically due to the lack of `systemd` or any other system daemon. In WSL version 0.67.6 and later (`wsl --version`), you can enable [support for `systemd`](https://devblogs.microsoft.com/commandline/systemd-support-is-now-available-in-wsl/). With older WSL versions, you can use [Distrod](https://github.com/nullpo-head/wsl-distrod) to create or update existing WSL distros with `systemd`.

## macOS: Colima

[Colima](https://github.com/abiosoft/colima) provides container runtimes on macOS. It's recommended to use Colima v0.2.2 or later so that VS Code can properly see containers running through Colima.

Colima automatically sets up a `colima` [Docker context](https://docs.docker.com/engine/context/working-with-contexts/) and makes it the active context. You may also want to install the `docker` and `docker-compose` CLIs before running `colima start` for this setup to work properly.

> Note: Colima uses Alpine Linux, which isn't supported by Remote - SSH.

## Linux

If you're using Linux on your local machine, or already have a remote Linux machine with SSH access, you can reference the [Docker documentation](https://docs.docker.com/engine/install/) for installing Docker on Linux, with [specific information per distribution](https://docs.docker.com/engine/install/centos/).

### Cloud-Init VM

You can use the [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extension with Dev Containers. This enables you to have Docker installed on your remote machine, such as a Linux VM.

You may use a [Cloud-Init](https://cloud-init.io/) file (which is an industry standard) to install Docker on the VM automatically. As an example, you can create an Azure VM through the Azure CLI, and set it to use a `cloud-init.txt` during creation.

`cloud-init.txt` file:

```yaml
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

Here is an example of the Azure CLI commands. Be sure to update `<location-here>` to a data center close to you (for example, `eastus`, `westeurope`):

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

You can learn more about using Remote - SSH with Dev Containers in the [develop on a remote Docker host](https://code.visualstudio.com/remote/advancedcontainers/develop-remote-host#_connect-using-docker-contexts) documentation.

### Podman

[Podman](https://podman.io/) 1.9+ is mostly compatible with Docker's CLI commands and therefore does work if you update the **Docker Path** setting (via **Dev > Containers: Docker Path** in the Settings editor) to `podman` on Linux.

![Docker Path setting](images/platform-options/docker-path-setting.png)

However, certain tricks like [Docker-from-Docker do not work](https://github.com/containers/libpod/issues/4056#issuecomment-535511841) due to limitations in Podman. This affects the **Dev Containers: Try a Dev Container Sample...** and [Dev Containers: Clone Repository in Container Volume...](/docs/devcontainers/containers.md#quick-start-open-a-git-repository-or-github-pr-in-an-isolated-container-volume) commands.

To work around issues with rootless Podman (for example, not respecting a non-root `"remoteUser"` and trying to install the server in `root`), you can set the following:

```json
"runArgs": [
  "--userns=keep-id"
],
"containerEnv": {
  "HOME": "/home/node"
}
```

`"remoteUser"` can be used when `"HOME"` is set because Dev Containers gives that setting precedence over the home folder it finds in `/etc/passwd`.

Podman also has its own implementation of the Compose Spec with [Podman Compose](https://github.com/containers/podman-compose).

## Other container engines

You can open or review requests for support for other container engines through the [vscode-remote-release repository](https://github.com/microsoft/vscode-remote-release). There are already several feature requests you can explore:

* [nerdctl](https://github.com/microsoft/vscode-remote-release/issues/6014)
* [critcl](https://github.com/microsoft/vscode-remote-release/issues/6075)
* [Singularity containers](https://github.com/microsoft/vscode-remote-release/issues/3066)
