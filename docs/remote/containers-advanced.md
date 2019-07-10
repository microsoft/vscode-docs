---
Order: 6
Area: remote
TOCTitle: Advanced Containers
PageTitle: Advanced Container Configuration
ContentId: f180ac25-1d59-47ec-bad2-3ccbf214bbd8
MetaDescription: Advanced setup for using the VS Code Remote - Containers extension
DateApproved: 6/26/2019
---
# Advanced Container Configuration

This article includes advanced setup scenarios for the [Visual Studio Code Remote - Containers](https://aka.ms/vscode-remote/download/containers) extension. See the [Developing inside a Container](/docs/remote/containers.md) article for additional information.

## Adding environment variables

You can update environment variables in your container without altering the container image by following these steps:

1. Configure the environment variables:

   - When an **image** or **Dockerfile** is referenced in `devcontainer.json`, add the following to the `runArgs` property in this same file:

        ```json
        "runArgs": ["-e","YOUR_ENV_VAR_NAME=your-value-goes-here"]
        ```

   - When a **Docker Compose** file is referenced, update ([or extend](/docs/remote/containers/containers.md#extending-your-docker-compose-file-for-development)) your `docker-compose.yml` with the following for the appropriate service:

        ```yml
        version: '3'
        services:
          your-service-name-here:
            # ...
            environment:
              - YOUR_ENV_VAR_NAME=your-value-goes-here
        ```

2. If you've already built the container and connected to it, run **Remote-Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change.

## Adding another volume mount

You can add a volume bound to any local folder using these steps:

1. Configure the volume mount:

   - When an **image** or **Dockerfile** is referenced in `devcontainer.json`, add the following to the `runArgs` property in this same file:

        ```json
        "runArgs": ["-v","/local/source/path/goes/here:/target/path/in/container/goes/here"]
        ```

        You can also use local environment variables in the path. For example, this will bind mount `~` (`$HOME`) on macOS/Linux and the user's folder (`%USERPROFILE%`) on Windows:

        ```json
        "runArgs": ["-v", "${env:HOME}${env:USERPROFILE}:/host-home-folder"]
        ```

   - When a **Docker Compose** file is referenced, update ([or extend](/docs/remote/containers/containers.md#extending-your-docker-compose-file-for-development)) your `docker-compose.yml` with the following for the appropriate service:

        ```yml
        version: '3'
        services:
          your-service-name-here:
            # ...
            volumes:
              - /local/source/path/goes/here:/target/path/in/container/goes/here
        ```

2. If you've already built the container and connected to it, run **Remote-Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change.

## Changing the default source code mount

If you add the `image` or `dockerFile` properties to `devcontainer.json`, VS Code will automatically "bind" mount your current workspace folder into the container. While this is convenient, you may want to change [mount settings](https://docs.docker.com/engine/reference/commandline/service_create/#add-bind-mounts-volumes-or-memory-filesystems), alter the type of mount, or [run in a remote container](#using-devcontainerjson-to-work-with-a-remote-dev-container).

You can use the `workspaceMount` property in `devcontainer.json` to change the automatic mounting behavior. It expects the same value as the [Docker CLI `--mount` flag](https://docs.docker.com/engine/reference/commandline/run/#add-bind-mounts-or-volumes-using-the---mount-flag).

For example:

```json
"workspaceMount": "src=/absolute/path/to/source/code,dst=/workspace,type=bind,consistency=cached",
"workspaceFolder": "/workspace"
```

This also allows you to do something like a volume mount instead, which can be useful particularly when [using a remote Docker Host](#developing-inside-a-container-on-a-remote-docker-host).

## Avoiding extension reinstalls on container rebuild

By default, VS Code will install extensions and VS Code Server inside the container's filesystem. While this has performance benefits over a locally mounted filesystem, the disadvantage is that VS Code will have to reinstall them on a container rebuild.

If you find yourself rebuilding frequently, you can use a local "volume" mount so that the extensions and VS Code Server survive a container rebuild. The volume should be unique to the container since sharing the volume across multiple containers is not currently supported. To create a container volume, follow these steps:

1. Configure a volume mount for `~/.vscode-server` (and/or `~/.vscode-server-insiders` for VS Code Insiders). How you do this will depend on whether you specify an image, Dockerfile, or Docker Compose file in your `devcontainer.json` file.

    **Dockerfile or image**:

    Replace `your-volume-name-goes-here` with a unique volume name for the container in `devcontainer.json` as follows:

    ```json
    "runArgs": ["-v","your-volume-name-goes-here:/root/.vscode-server"]
    ```

    ...or for VS Code Insiders...

    ```json
    "runArgs": ["-v","your-volume-name-goes-here:/root/.vscode-server-insiders"]
    ```

    **Docker Compose**:

    Update ([or extend](/docs/remote/containers/containers.md#extending-your-docker-compose-file-for-development)) your `docker-compose.yml` with the following. Replace `your-volume-name-goes-here` with a unique volume name for the container.

      ```yml
      services:
        your-service-name-here:
          # ...
          volumes:
            - your-volume-name-goes-here:~/.vscode-server
            # or - your-volume-name-goes-here:~/.vscode-server-insiders
          # ...
      volumes:
        your-volume-name-goes-here:
      ```

2. If you've already built the container and connected to it, run **Remote-Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change.

After the container is up and running, subsequent rebuilds will not reacquire any extensions or the VS Code server. The build will not use the latest extensions list from `devcontainer.json` or run `postCreateCommand` if configured but you can delete the volume and those steps will happen the next time you rebuild.

```bash
docker volume rm your-volume-name-goes-here
```

## Adding a non-root user to your dev container

Many images run as a root user by default. However, some provide one or more non-root users, that you can optionally use instead. If your image or Dockerfile provides a non-root user (but still defaults to root), you can opt into using it in one of two ways:

- When referencing an **image** or **Dockerfile**, add the following to your `devcontainer.json`:

    ```json
    "runArgs": ["-u", "user-name-goes-here"]
    ```

- If you are using **Docker Compose**, add the following to your service in `docker-compose.yml`:

    ```yaml
    user: user-name-goes-here
    ```

For images that only provide a root user, you can automatically create a non-root user by using a Dockerfile. For example, this snippet will create a user called `user-name-goes-here`, give it the ability to use `sudo`, and set it as the default:

```Dockerfile
ARG USERNAME=user-name-goes-here
RUN useradd -m $USERNAME
ENV HOME /home/$USERNAME

# [Optional] Add sudo support
RUN apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# ** Anything else you want to do like clean up goes here **

# Set the default user
USER $USERNAME
```

## Using Docker or Kubernetes from a container

While you can build, deploy, and debug your application inside a dev container, you may also need to test it by running it inside a set of production-like containers. Fortunately, by installing the needed Docker or Kubernetes CLIs and mounting your local Docker socket, you can build and deploy your app's container images from inside your dev container.

Once the needed CLIs are in place, you can also work with the appropriate container cluster using the [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) extension if you force it to run as a Workspace extension or the [Kubernetes](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) extension.

See the following example dev containers definitions for additional information on a specific scenario:

* [Docker-in-Docker](https://aka.ms/vscode-remote/samples/docker-in-docker) - Includes the Docker CLI and illustrates how you can use it to access your local Docker install from inside a dev container by volume mounting the Docker Unix socket.

* [Docker-in-Docker Compose](https://aka.ms/vscode-remote/samples/docker-in-docker-compose) - Variation of Docker-in-Docker for situations where you are using Docker Compose instead of a single Dockerfile.

* [Kubernetes-Helm](https://aka.ms/vscode-remote/samples/kubernetes-helm) - Includes the Docker CLI, kubectl, and Helm and illustrates how you can use them from inside a dev container to access a local Minikube or Docker provided Kubernetes cluster.

## Connecting to multiple containers at once

Currently you can only connect to one container per VS Code window. However, you can spin up multiple VS Code windows to [attach to them](/docs/remote/containers.md#attaching-to-running-containers).

If you'd prefer to use `devcontainer.json` instead and are using Docker Compose, you can create separate  `devcontainer.json` files for each service in your source tree that point to a common `docker-compose.yml`.

To see how this works, consider this example source tree:

```text
📁 project-root
    📁 container1-src
        📄 .devcontainer.json
        📄 hello.go
    📁 container2-src
        📄 .devcontainer.json
        📄 hello.js
    📄 docker-compose.yml
```

Next, assume the `docker-compose.yml` in the root is as follows:

```yml
version: '3'
services:
  container-1:
    image: ubuntu:bionic
    volumes:
      - ./container-1-src:/workspace
      - ~/.ssh:/root/.ssh # [Optional] For reusing Git SSH keys.
    command: sleep infinity
    links:
      - container-2

  container-2:
    image: ubuntu:bionic
    volumes:
      - ./container-2-src:/workspace
      - ~/.ssh:/root/.ssh # [Optional] For reusing Git SSH keys.
    command: sleep infinity
```

You can then set up `container1-src/.devcontainer.json` for Go development as follows:

```json
{
    "name": "Container 1",
    "dockerComposeFile": ["../docker-compose.yml"],
    "service": "container-1",
    "workspaceFolder": "/workspace",
    "extensions": ["ms-vscode.Go"],
    "shutdownAction": "none"
}
```

Next, you can `container2-src/.devcontainer.json` for Node.js development as follows:

```json
{
    "name": "Container 2",
    "dockerComposeFile": ["../docker-compose.yml"],
    "service": "container-2",
    "workspaceFolder": "/workspace",
    "extensions": ["dbaeumer.vscode-eslint"],
    "shutdownAction": "none"
}
```

The `"shutdownAction":"none"` in the `devcontainer.json` files is optional, but will leave the containers running when VS Code closes -- which prevents you from accidentally shutting down both containers by closing one window.

To connect to both:

1. `kbstyle(F1)` > **Remote-Containers: Open Folder in Container...** and select the `container1-src` folder.
2. VS Code will then start up both containers, connect this window to service `container-1`, and install the Go extension.
3. Next, start up a new window using **File > New Window**.
4. In the new window, `kbstyle(F1)` > **Remote-Containers: Open Folder in Container...** and select the `container2-src` folder.
5. Since the services are already running, VS Code will then connect to `container-2` and install the ESLint extension.

You can now interact with both containers at once from separate windows.

## Developing inside a container on a remote Docker host

Sometimes you may want to use the Remote - Containers extension to develop inside a container that sits on remote server. This section outlines how you can achieve this by using `devcontainer.json` or attaching to an existing remote container.

You can use the Docker CLI locally with a remote Docker host by setting [local environment variables like `DOCKER_HOST`, `DOCKER_CERT_PATH`, `DOCKER_TLS_VERIFY`](https://docs.docker.com/machine/reference/env/). Since VS Code uses the Docker CLI under the hood, you can use these same environment variables to connect the Remote - Containers extension to the same remote host. You can either use [Docker Machine](https://docs.docker.com/machine/) to set this up, manually set the needed environment variables, or use SSH to tunnel the remote Docker socket.

Once set, you can use VS Code to [attach to any running container](/docs/remote/containers.md#attaching-to-running-containers) on the remote host or [use specialized, local `devcontainer.json` files to create / connect to a remote dev container](#using-devcontainerjson-to-work-with-a-remote-dev-container).

### Option 1: Connect using Docker Machine or by setting local environment variables

**Using Docker Machine**:

Assuming you have `code` in your path, the following snippet will allow you to connect to your remote Docker host using the `docker-machine` command. Note that you will need to replace the appropriate values below based on the [Docker Machine driver](https://docs.docker.com/machine/drivers/) you pick. You should also be aware that drivers like the [generic driver](https://docs.docker.com/machine/drivers/generic) shown below will require that any non-root user you specify has [passwordless-sudo](https://serverfault.com/questions/160581/how-to-setup-passwordless-sudo-on-linux) privileges.

On **macOS or Linux**, run the following commands in a local terminal (replacing values as appropriate):

```bash
docker-machine create --driver generic \
    --generic-ip-address your-ip-address-here \
    --generic-ssh-user your-remote-user-here \
    give-it-a-name-here
eval $(docker-machine env give-it-a-name-here)
code
```

On **Windows**, run the following commands in a local command prompt  (replacing values as appropriate):

```bat
docker-machine create --driver generic ^
    --generic-ip-address your-ip-address-here ^
    --generic-ssh-user your-remote-user-here ^
    give-it-a-name-here
@FOR /f "tokens=*" %i IN ('docker-machine env --shell cmd give-it-a-name-here') DO @%i
code
```

You will run the second and third commands each time you want to connect to the host.

**Using local environment variables**:

If you already have a remote Docker host up and running, you do not technically need to use `docker-machine` to connect it. Depending on your setup, you may be able to just set the required environment variables directly in a terminal and launch `code` from this same window.  If you only need to specify `DOCKER_HOST` you can also specify the `docker.host` property in your workspace or user `settings.json` as follows:

```json
"docker.host":"tcp://your-remote-machine-fqdn-or-ip-here"
```

### Option 2: Connect using an SSH tunnel

Docker CE / EE / Desktop will not expose the required Docker daemon TCP port by default since this can leave the machine vulnerable if not secured properly. Fortunately, if you have SSH access, you can use a tunnel to forward the Docker socket from your remote host to your local machine as needed.

Just follow these steps:

1. Install an [OpenSSH compatible SSH client](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client).

2. Update the `docker.host` property in your user or workspace `settings.json` as follows:

    ```json
    "docker.host":"tcp://localhost:23750"
    ```

    You can also set a `DOCKER_HOST` environment variable before starting VS Code instead if you prefer.

3. Run the following command from a local terminal / command prompt (replacing `user@hostname` with the remote user and hostname / IP for your server):

    ```bash
    ssh -NL localhost:23750:/var/run/docker.sock user@hostname
    ```

VS Code will now be able to [attach to any running container](/docs/remote/containers.md#attaching-to-running-containers) on the remote host. You can also [use specialized, local `devcontainer.json` files to create / connect to a remote dev container](#using-devcontainerjson-to-work-with-a-remote-dev-container).

Once you are done, press `kbstyle(Ctrl+C)` in the terminal / command prompt to close the tunnel.

> **Note:** If the `ssh` command fails, you may need to `AllowStreamLocalForwarding` on your SSH host.
>
> 1. Open `/etc/ssh/sshd_config` in an editor  (like vim, nano, or pico) on the **SSH host** (not locally).
> 2. Add the setting  `AllowStreamLocalForwarding yes`.
> 3. Restart the SSH server (on Ubuntu, run `sudo systemctl restart sshd`).
> 4. Retry.

### Using devcontainer.json to work with a remote dev container

Docker does **not** support mounting (binding) your local filesystem into a remote container, so VS Code's default `devcontainer.json` files need to be modified when working remotely. In this section, we'll walk you through how to convert a pre-defined, local dev container definition into a remote one.

There are a few different ways to do this, but the simplest is to **create your remote dev container first**, and then **clone your source code into it** since this does not require that your user have direct access to the remote host. You can **bind to a folder on the remote machine** instead, which also allows you to work with **existing source code** on the remote machine (assuming you have access).

Just follow these steps:

1. Start up VS Code pointing to the right Docker host using [Docker Machine](#option-1-connect-using-docker-machine-or-by-setting-local-environment-variables) or [SSH](#option-2-connect-using-an-ssh-tunnel).

2. Create and open a **local** empty folder in VS Code.

3. Run **Remote-Containers: Add Container Configuration File...** from the Command Palette (`kbstyle(F1)`).

4. Pick a starting point for your remote container from the list that appears.

5. What you do next will depend on whether you picked a definition that specifies an image, Dockerfile, or Docker Compose file in `.devcontainer/devcontainer.json`.

    **Dockerfile or image**:

    If you do **not** have login access to the remote host, use a Docker "volume" for your source code. Update `.devcontainer/devcontainer.json` as follows (replacing `remote-workspace` with a unique volume name if desired):

    ```json
    "workspaceFolder": "/workspace",
    "workspaceMount": "src=remote-workspace,dst=/workspace,type=volume,volume-driver=local"
    ```

    If you **do** have login access, you can use a remote filesystem bind mount instead:

    ```json
    "workspaceFolder": "/workspace",
    "workspaceMount": "src=/absolute/path/on/remote/machine,dst=/workspace,type=bind"
    ```

    The `workspaceMount` property supports the same values as the [Docker CLI `--mount` flag](https://docs.docker.com/engine/reference/commandline/run/#add-bind-mounts-or-volumes-using-the---mount-flag) if you have a different scenario in mind.

    **Docker Compose**:

    First, alter two properties in `.devcontainer/devcontainer.json` as follows:

    ```json
    "dockerComposeFile": [
        "docker-compose.yml",
        "docker-compose.remote.yml"
    ],
    "workspaceFolder": "/workspace"
    ```

    Next, add a `docker-compose.remote.yml` file into the `.devcontainer` folder. If you do **not** have login access to the remote host, use a Docker "volume" for your source code. Add the following to the file replacing `your-service-name-here` with the value of the `service` property in `devcontainer.json` (replacing `remote-workspace` with a unique volume name if desired):

    ```yml
    version: '3'
    services:
      your-service-name-here:
        volumes:
            - remote-workspace:/workspace

    volumes:
      remote-workspace:
    ```

    If you **do** have login access, you can use a remote filesystem bind mount instead:

    ```yml
    version: '3'
    services:
      your-service-name-here:
          volumes:
            - /absolute/path/on/remote/machine:/workspace
    ```

    See the [Docker Compose documentation on `volumes`](https://docs.docker.com/compose/compose-file/#volumes) if you need to support a different scenario.

6. Run the **Remote-Containers: Reopen Folder in Container** command from the Command Palette (`kbstyle(F1)`).

7. Use ``kbstyle(Ctrl+Shift+`)`` to open a terminal inside the container. You can run `git clone` from here to pull down your source code. You can then use **File > Open... / Open Folder...** to open the cloned repository.

Next time you want to connect to this same container, run **Remote-Containers: Open Folder in Container...** and select the same local folder in a VS Code window with `DOCKER_HOST` set.

### [Optional] Making the remote source code available locally

If you store your source code on the remote host's filesystem instead of inside a Docker volume, there are several ways you can access the files locally:

1. [Use the mount command](https://docs.docker.com/machine/reference/mount/) if you are using [Docker Machine](https://docs.docker.com/machine/).
2. [Mount the remote filesystem using SSHFS](/docs/remote/troubleshooting.md#using-sshfs-to-access-files-on-your-remote-host).
3. [Sync files from the remote host to your local machine using `rsync`](/docs/remote/troubleshooting.md#using-rsync-to-maintain-a-local-copy-of-your-source-code).

Using Docker Machine's mount command or SSHFS are the more convenient options and do not require any file sync'ing. However, performance will be significantly slower than working through VS Code, so they are best used for single file edits and uploading/downloading content. If you need to use an application that bulk reads/write to many files at once (like a local source control tool), rsync is a better choice.

### [Optional] Storing your remote devcontainer.json files on the server

Both [SSHFS](/docs/remote/troubleshooting.md#using-sshfs-to-access-files-on-your-remote-host) and [rsync](/docs/remote/troubleshooting.md#using-rsync-to-maintain-a-local-copy-of-your-source-code) can allow you to store your remote `devcontainer.json` on your remote host. This makes it easier to connect to your remote containers from multiple machines.

For example, if you cloned a repository to `~/repos/your-repository-name` on the remote machine that contains a `devcontainer.json`, you can create a remote focused `devcontainer.json` that reuses the same Dockerfile (or Docker Compose file) but connects remotely instead of locally. Let's walk through setting this up with a folder structure like this:

```text
📁 /home/your-user-name
    📁 devcontainers
        📁 your-repository-name
            📁 .vscode
                📄 settings.json
            📄 .devcontainer.json  <= Remote devcontainer.json
    📁 repos
        📁 your-repository-name
            📁 .devcontainer
                📄 devcontainer.json  <= Local devcontainer.json
                📄 Dockerfile
```

Follow these steps:

1. [Set up SSHFS on your system](/docs/remote/troubleshooting.md#using-sshfs-to-access-files-on-your-remote-host) and mount the remote filesystem.

2. Let's assume we're using a [SSH tunnel](#option-2-connect-using-an-ssh-tunnel) to connect to the remote host. Start it as follows (replacing `user@hostname` with the appropriate values):

    ```bash
    ssh -NL localhost:23750:/var/run/docker.sock user@hostname
    ```

3. Next, use the **local** SSHFS mount to open `~/devcontainers/repository-name-here` in VS Code.

4. Update `docker.host` to the appropriate value in workspace settings (`.vscode/settings.json`) to point to the SSH tunnel we started.

    ```json
    "docker.host":"tcp://localhost:23750"
    ```

5. Next, use the file mount to copy `~/repos/your-repository-name/.devcontainer/devcontainer.json` to `.devcontainer.json` (dot-prefixed) in `~/devcontainers/repository-name-here` and update the default workspace mount in the file to point to the source code on the remote machine. In this example, we are using a Dockerfile, so the changes would be as follows:

    ```json
    "dockerFile":"../../repos/your-repository-name/.devcontainer/Dockerfile"
    "workspaceFolder": "/workspace",
    "workspaceMount": "src=/home/your-user-name/repos/your-repository-name,dst=/workspace,type=bind"
    ```

6. Finally, run **Remote-Containers: Reopen Folder in Container** from the Command Palette (`kbstyle(F1)`).

Next time, you can just mount the remote file system, start the SSH tunnel, and use **Remote-Containers: Open Folder in Container...** to open the same folder (`~/devcontainers/repository-name-here`).

## Reducing Dockerfile build warnings

The following are some tips for eliminating warnings that may be appearing in your Dockerfile builds.

### debconf: delaying package configuration, since apt-utils is not installed

This error can typically be safely ignored and is tricky to get rid of completely. However, you can reduce it to one message in stdout when installing the needed package by adding the following to your Dockerfile:

```Dockerfile
# Configure apt
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get -y install --no-install-recommends apt-utils 2>&1

## YOUR DOCKERFILE CONTENT GOES HERE

ENV DEBIAN_FRONTEND=dialog
```

### Warning: apt-key output should not be parsed (stdout is not a terminal)

This non-critical warning tells you not to parse the output of `apt-key`, so as long as your script doesn't, there's no problem. You can safely ignore it.

This occurs in Dockerfiles because the `apt-key` command is not running from a terminal. Unfortunately, this error cannot be eliminated completely, but can be hidden unless the `apt-key` command returns a non-zero exit code (indicating a failure).

For example:

```Dockerfile
# (OUT=$(apt-key add - 2>&1) || echo $OUT) will only print the output with non-zero exit code is hit
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | (OUT=$(apt-key add - 2>&1) || echo $OUT)
```

You can also set the `APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE` environment variable to suppress the warning, but it looks a bit scary so be sure to add comments in your Dockerfile if you use it:

```Dockerfile
# Suppress an apt-key warning about standard out not being a terminal. Use in this script is safe.
ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=DontWarn
```

### Information messages appearing in red

Some CLIs output certain information (like debug details) to standard error instead of standard out. These will appear in red in VS Code's terminal and output logs.

If the messages are harmless, you can pipe the output of the command from standard error to standard out instead by appending `2>&1` to the end of the command.

For example:

```Dockerfile
RUN apt-get -y install --no-install-recommends apt-utils 2>&1
```

If the command fails, you will still be able to see the errors, they just won't be in red.

## Questions or feedback

* See [Tips and Tricks](/docs/remote/troubleshooting.md#containers-tips) or the [FAQ](/docs/remote/faq.md).
* Search on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode-remote).
* Add a [feature request](https://aka.ms/vscode-remote/feature-requests) or [report a problem](https://aka.ms/vscode-remote/issues/new).
* Create a [development container definition](https://aka.ms/vscode-dev-containers) for others to use.
* Contribute to [our documentation](https://github.com/Microsoft/vscode-docs) or [VS Code itself](https://github.com/Microsoft/vscode).
* See our [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) guide for details.
