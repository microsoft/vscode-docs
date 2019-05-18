---
Order: 6
Area: remote
TOCTitle: Advanced Containers
PageTitle: Advanced Container Configuration
ContentId: f180ac25-1d59-47ec-bad2-3ccbf214bbd8
MetaDescription: Advanced setup for using the VS Code Remote - Containers extension
DateApproved: 5/15/2019
---
# Advanced Container Configuration

❗ **Note:** The **[Remote Development extensions](https://aka.ms/vscode-remote/download)** require **[Visual Studio Code Insiders](https://code.visualstudio.com/insiders)**.

---

This article includes advanced setup scenarios for the [Visual Studio Code Remote - Containers](https://aka.ms/vscode-remote/download/containers) extension. See the [Developing inside a Container](/docs/remote/containers.md) article for additional information.

## Adding another volume mount

You can add a volume mount to any local folder using these steps:

1. Configure the volume mount:

   - When an **image** or **Dockerfile** is referenced in `devcontainer.json`, add the following to the `runArgs` property in this same file:

        ```json
        "runArgs": ["-v","/local/source/path/goes/here:/target/path/in/container/goes/here"]
        ```

   - When a **Docker Compose** file is referenced, add the following to your `docker-compose.yml` for the appropriate service:

        ```yml
        version: '3'
        services:
          your-service-name-here:
            # ...
            volumes:
              - /local/source/path/goes/here:/target/path/in/container/goes/here
        ```

2. If you've already built the container and connected to it, run **Remote-Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change.

## Avoiding extension reinstalls on container rebuild

By default, VS Code will install extensions and VS Code Server inside the container's filesystem. While this has performance benefits over a locally mounted filesystem, the disadvantage is that VS Code will have to re-install them on a container rebuild.

If you find yourself rebuilding frequently, you can use a local "volume" mount so that the extensions and VS Code Server survive a container rebuild. Follow these steps:

1. Configure a volume mount for `~/.vscode-remote`:

   - When an **image** or **Dockerfile** is referenced in `devcontainer.json`, add the following to the `runArgs` property in this same file. Replace `your-volume-name-goes-here` with a unique volume name for the container:

        ```json
        "runArgs": ["-v","your-volume-name-goes-here:/root/.vscode-remote"]
        ```

   - When a **Docker Compose** file is referenced, add the following to your `docker-compose.yml` for the appropriate service. Replace `your-volume-name-goes-here` with a unique volume name for the container:

        ```yml
        services:
          your-service-name-here:
            # ...
            volumes:
              - your-volume-name-goes-here:~/.vscode-remote
            # ...
        volumes:
          your-volume-name-goes-here:
        ```

2. If you've already built the container and connected to it, run **Remote-Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change.

After the container is up and running, subsequent rebuilds will not reacquire any extensions or the VS Code server. It will also not grab the latest extensions list from `devcontainer.json` or run the `postCreateCommand` if configured. However, you can simply delete the volume to reset everything so they happen the next time you rebuild.

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

Once the needed CLIs are in place, you can also work with the appropriate container cluster using the [Docker](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker) extension if you force it to run as a Workspace extension or the [Kubernetes](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) extension.

See the following example dev containers definitions for additional information on a specific scenario:

* [Docker-in-Docker](https://aka.ms/vscode-remote/samples/docker-in-docker) - Includes the Docker CLI and illustrates how you can use it to access your local Docker install from inside a dev container by volume mounting the Docker Unix socket.

* [Docker-in-Docker Compose](https://aka.ms/vscode-remote/samples/docker-in-docker-compose) - Variation of Docker-in-Docker for situations where you are using Docker Compose instead of a single Dockerfile.

* [Kubernetes-Helm](https://aka.ms/vscode-remote/samples/kubernetes-helm) - Includes the Docker CLI, kubectl, and Helm and illustrates how you can use them from inside a dev container to access a local Minikube or Docker provided Kubernetes cluster.

## Connecting to multiple containers at once

Currently you can only connect to one container per VS Code window. However, you can spin up multiple VS Code windows to [attach to them](#attaching-to-running-containers).

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
      - ~/.gitconfig:/root/.gitconfig
    command: sleep infinity
    links:
      - container-2

  container-2:
    image: ubuntu:bionic
    volumes:
      - ./container-2-src:/workspace
      - ~/.gitconfig:/root/.gitconfig
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

Occasionally you may want to use the Remote - Containers extension to develop inside a container that sits on remote server. While we are looking at ways to optimize this experience, this section will outline how you can achieve this today by attaching to a remote container from VS Code or using Docker Compose and `devcontainer.json`.

### Using SSH to connect to remote Docker host

You can use the Docker CLI locally with a remote [Docker Machine](https://docs.docker.com/machine/overview/) by setting [local environment variables like `DOCKER_HOST`, `DOCKER_CERT_PATH`, `DOCKER_TLS_VERIFY`](https://docs.docker.com/machine/reference/env/). Since VS Code uses the Docker CLI under the hood, you can use these same environment variables to connect the Remote - Containers extension to this same remote host.

```bash
export DOCKER_HOST=your-remote-machine-fqdn-or-ip-here:2375
# Or on Windows: SET DOCKER_HOST=your-remote-machine-fqdn-or-ip-here:2375
code-insiders
```

Once set, you can use VS Code to [attach to any running container](/docs/remote/containers.md#attaching-to-running-containers) on the remote host or [use specialized, local `devcontainer.json` files to create / connect to a remote dev container](#using-devcontainerjson-to-work-with-a-remote-dev-container).

However, Docker CE / Desktop will not expose the required Docker daemon TCP port by default since it can leave the machine vulnerable if not secured properly. The Docker CLI uses a local Unix socket (or named pipe on Windows) to communicate instead.

Fortunately, you can use a SSH tunnel to forward a local socket to your local machine on an needed basis. If you have an [OpenSSH compatible SSH client](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client) installed and `code-insiders` in your path, you can run the following commands in a local terminal / command prompt to connect VS Code to the remote Docker Machine.

On **macOS or Linux**, run the following replacing `user@hostname` with the remote user and hostname / IP for your server:

```bash
export DOCKER_HOST=localhost:23750
code-insiders
ssh -NL localhost:23750:/var/run/docker.sock user@hostname
```

On **Windows**, run the following replacing `user@hostname` with the remote user and hostname / IP for your server:

```bat
SET DOCKER_HOST=localhost:23750
code-insiders
ssh -NL localhost:23750:/var/run/docker.sock user@hostname
```

Once you are done, press `kbstyle(Ctrl+C)` in the terminal / command prompt to close the tunnel. The environment variables that were set are not global, so you can just bounce VS Code to start working with your local Docker install again.

Note that you may need to `AllowStreamLocalForwarding` in your [SSH server's sshd config](hhttps://www.ssh.com/ssh/sshd_config/) for this to work.

1. Open `/etc/ssh/sshd_config` in an editor  (like vim, nano, or pico) on the **SSH host** (not locally).
2. Add the setting  `AllowStreamLocalForwarding yes`.
3. Restart the SSH server (on Ubuntu, run `sudo systemctl restart sshd`).
4. Retry.

### Using devcontainer.json to work with a remote dev container

Docker does **not** support mounting (binding) your local filesystem into a remote container. Even if it did, this would result in very poor performance. As a result, the best practice is to store your source code on the remote machine. There are a few different ways to do this, but the simplest is to **create your remote dev container first**, and then **clone your source code into it**.

In this section, we'll walk you through how to convert a pre-defined, local dev container definition into a remote one. Just follow these steps:

1. Follow the steps above to start up VS Code pointing to the right Docker host.
2. Create and open an empty folder in VS Code.
3. Run **Remote-Containers: Add Container Configuration File...** from the Command Palette (`kbstyle(F1)`).
4. Pick a starting point for your remote container from the list that appears.
5. What you do next will depend on whether you picked a definition that uses a Dockerfile or Docker Compose.

    **Dockerfile**

    Add a `docker-compose.remote.yml` file into the `.devcontainer` folder with the following contents:

    ```yml
    version: '3'
    services:
      dev-container:
        build:
          context: .
          dockerfile: Dockerfile

        volumes:
            - ssh-workspace:/ssh-workspace

        command: sleep infinity

      # [Optional] Required for ptrace-based debuggers like C++, Go, and Rust
      cap_add:
        - SYS_PTRACE
      security_opt:
        - seccomp:unconfined

    volumes:
      ssh-workspace:
    ```

    Note that you can change the volume name (`ssh-workspace`) if you'd like a unique volume per container.

    Then alter `.devcontainer/devcontainer.json` as follows:

    ```json
    {
        "name": "Your name goes here",
        "dockerComposeFile": "docker-compose.remote.yml",
        "service": "dev-container",
        "workspaceFolder": "/ssh-workspace",
    }
    ```

    **Docker Compose**

    Add a `docker-compose.remote.yml` file into the `.devcontainer` folder with the following contents. Replace `your-service-name-here` with the value of the `service` property in `devcontainer.json`.

    ```yml
    version: '3'
    services:
      your-service-name-here:
        volumes:
            - ssh-workspace:/ssh-workspace

    volumes:
      ssh-workspace:
    ```

    Note that you can change the volume name (`ssh-workspace`) if you'd like a unique volume per container.

    Then alter two properties in `.devcontainer/devcontainer.json` as follows:

    ```json
    "dockerComposeFile": [
        "docker-compose.yml",
        "docker-compose.remote.yml"
    ],
    "workspaceFolder": "/ssh-workspace"
    ```

6. Run **Remote-Containers: Reopen Folder in Container** command from the Command Palette (`kbstyle(F1)`).

7. Use ``kbstyle(Ctrl+Shift+`)`` to open a terminal inside the container. You can run `git clone` from here to pull down your source code. You can then use **File > Open... / Open Folder...** to open the cloned repository.

Next time you want to connect to this same container, run **Remote-Containers: Open Folder in Container...** and select the same local folder in a VS Code window with `DOCKER_HOST` set.

### [Optional] Using the remote filesystem (bind mount) instead of a volume

The model above uses a Docker volume to persist the source code. While this will prevent the source code from being deleted when you rebuild, you can also use the remote filesystem instead (assuming you have access). The advantage of this model is that you can clone or interact with the source code from **another terminal window** using SSH. This can also be useful if you've **already got source code on-disk** that you want to open in a container.

Just change the `volumes` section to point to the absolute file path on the remote filesystem where the source code should be kept.

```yml
version: '3'
services:
    dev-container:
      # ...
      volumes:
        - /absolute/path/on/remote/machine/for/source/code:/ssh-workspace
```

### [Optional] Making the remote source code available locally

If you store your code on the remote host's filesystem instead of inside a Docker volume, there are two ways you can the files locally:

1. [Mount the remote filesystem using SSHFS](/docs/remote/troubleshooting.md#using-sshfs-to-access-files-on-your-remote-host).
2. [Sync files from the remote host to your local machine using `rsync`](/docs/remote/troubleshooting.md#using-rsync-to-maintain-a-local-copy-of-your-source-code).

SSHFS is the more convenient option and does not require any sync'ing. However performance will be significantly slower than working through VS Code and it is best used for small edits and uploading content. Using something like a local source control tool in this way will be very slow and can cause unforeseen problems. Rsync is a better option if you need to use these types of tools since it will copy the entire contents of a folder on the remote host to your local machine.

### [Optional] Storing your remote devcontainer.json files on the server

Finally, you can combine the techniques above to store your `devcontainer.json` files on the remote server. This allows you to connect to it from any machine and spin up a remote dev container without having any files locally. Imagine you had the following folder tree on the remote machine:

```text
📁 /home/your-user-name
    📁 repos
        📁 your-repository-here
            📁 .devcontainer
            📁 .remote
                📁 .devcontainer
```

If you put your remote focused dev container settings described above in `~/repos/your-repository-here/.remote` you can open the remote dev container from this folder using an SSHFS mount. Just follow these steps:

1. [Set up SSHFS on your system](/docs/remote/troubleshooting.md#using-sshfs-to-access-files-on-your-remote-host).

2. Run the following commands replacing `user@hostname` with your remote user and hostname / IP and `repos/your-repository-here/.remote` with the actual path (relative to your home folder) of your remote dev container definition on the host.

    On **macOS or Linux**, run the following commands in a local terminal:

    ```bash
    export USER_AT_HOST=user@hostname
    export REMOTE_CFG_PATH="repos/your-repository-here/.remote"

    # Mount the remote filesystem
    mkdir -p "$HOME/sshfs/$USER_AT_HOST"
    sshfs "$USER_AT_HOST:" "$HOME/sshfs/$USER_AT_HOST" -ovolname="$USER_AT_HOST" -p 22  -o workaround=nonodelay -o transform_symlinks -o idmap=user  -C

    # Start VS Code and forward the docker port.
    export DOCKER_HOST=localhost:23750
    code-insiders "$HOME/sshfs/$USER_AT_HOST/$REMOTE_CFG_PATH"
    ssh -NL localhost:23750:/var/run/docker.sock $USER_AT_HOST
    ```

    On **Windows**, run the following commands in a command prompt:

    ```bat
    SET USER_AT_HOST=user@hostname
    SET REMOTE_CFG_PATH="repos/your-repository-here/.remote"

    REM Mount the remote filesystem
    net use /PERSISTENT:NO X: \\sshfs\%USER_AT_HOST%

    REM Start VS Code and forward the docker port
    SET DOCKER_HOST=localhost:23750
    code-insiders "X:\%REMOTE_CFG_PATH%"
    ssh -NL localhost:23750:/var/run/docker.sock %USER_AT_HOST%
    ```

3. Once the VS Code window opens, run **Remote-Containers: Reopen Folder in Container** from the Command Palette (`kbstyle(F1)`).

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
# Suppress an apt-key warning about standard out not being a terminal. Its use in this script is safe.
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
