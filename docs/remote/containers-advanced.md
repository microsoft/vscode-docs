---
Order: 7
Area: remote
TOCTitle: Advanced Containers
PageTitle: Advanced Container Configuration
ContentId: f180ac25-1d59-47ec-bad2-3ccbf214bbd8
MetaDescription: Advanced setup for using the VS Code Remote - Containers extension
DateApproved: 10/14/2019
---
# Advanced Container Configuration

This article includes advanced setup scenarios for the [Visual Studio Code Remote - Containers](https://aka.ms/vscode-remote/download/containers) extension. See the [Developing inside a Container](/docs/remote/containers.md) article for additional information.

## Adding environment variables

You can set environment variables in your container without altering the container image by using one of options below.

### Option 1: Add individual variables

Depending on what you reference in `devcontainer.json`:

* **Dockerfile or image**: Add the following to the `runArgs` property in `devcontainer.json`:

     ```json
     "runArgs": [
       "-e", "YOUR_ENV_VAR_NAME=your-value-goes-here",
       "-e", "ANOTHER_VAR=another-value" ]
     ```

* **Docker Compose**: Update (or [extend](/docs/remote/containers.md#extending-your-docker-compose-file-for-development)) your `docker-compose.yml` with the following for the appropriate service:

    ```yaml
    version: '3'
    services:
      your-service-name-here:
        environment:
          - YOUR_ENV_VAR_NAME=your-value-goes-here
          - ANOTHER_VAR=another-value
         # ...
    ```

If you've already built the container and connected to it, run **Remote-Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Remote-Containers: Open Folder in Container...** to connect to the container.

### Option 2: Use an env file

If you have a large number of environment variables you need to set, you can use a `.env` file instead. VS Code will automatically pick up a file called `.env` in your workspace root, but you can also create one in another location.

First, create an environment file somewhere in your source tree. Consider this `.devcontainer/devcontainer.env` file:

```text
YOUR_ENV_VAR_NAME=your-value-goes-here
ANOTHER_ENV_VAR_NAME=your-value-goes-here
```

Next, depending on what you reference in `devcontainer.json`:

* **Dockerfile or image**: Edit `devcontainer.json` and add a path to the `.env` file relative to the location of `devcontainer.json`:

    ```json
    "runArgs": ["--env-file","devcontainer.env"]
    ```

* **Docker Compose:** Edit `docker-compose.yml` and add a path to the `.env` file relative to the Docker Compose file:

    ```yaml
    version: '3'
    services:
      your-service-name-here:
        env-file: devcontainer.env
        # ...
  ```

If you've already built the container and connected to it, run **Remote-Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Remote-Containers: Open Folder in Container...** to connect to the container.

## Adding another local file mount

You can add a volume bound to any local folder using by following the appropriate steps below based on what you reference in `devcontainer.json`:

* **Dockerfile or image**: Add the following to the `runArgs` property in this same file:

    ```json
    "runArgs": ["-v","/local/source/path/goes/here:/target/path/in/container/goes/here"]
    ```

     You can also use local environment variables in the path. For example, this will bind mount `~` (`$HOME`) on macOS/Linux and the user's folder (`%USERPROFILE%`) on Windows:

    ```json
    "runArgs": ["-v", "${env:HOME}${env:USERPROFILE}:/host-home-folder"]
    ```

* **Docker Compose:** Update (or [extend](/docs/remote/containers.md#extending-your-docker-compose-file-for-development)) your `docker-compose.yml` with the following for the appropriate service:

    ```yaml
    version: '3'
    services:
      your-service-name-here:
        volumes:
          - /local/source/path/goes/here:/target/path/in/container/goes/here
         # ...
    ```

If you've already built the container and connected to it, run **Remote-Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Remote-Containers: Open Folder in Container...** to connect to the container.

## Changing the default source code mount

If you add the `image` or `dockerFile` properties to `devcontainer.json`, VS Code will automatically "bind" mount your current workspace folder into the container. While this is convenient, you may want to change [mount settings](https://docs.docker.com/engine/reference/commandline/service_create/#add-bind-mounts-volumes-or-memory-filesystems), alter the type of mount, location, or [run in a remote container](#developing-inside-a-container-on-a-remote-docker-host).

You can use the `workspaceMount` property in `devcontainer.json` to change the automatic mounting behavior. It expects the same value as the [Docker CLI `--mount` flag](https://docs.docker.com/engine/reference/commandline/run/#add-bind-mounts-or-volumes-using-the---mount-flag).

For example:

```json
"workspaceMount": "src=${localWorkspaceFolder}/sub-folder,dst=/workspace,type=bind,consistency=delegated",
"workspaceFolder": "/workspace"
```

This also allows you to do something like a named volume mount instead of a bind mount, which can be useful particularly when [using a remote Docker Host](#developing-inside-a-container-on-a-remote-docker-host) or you [want to store your entire source tree in a volume](#use-a-named-volume-for-your-entire-source-tree).

If you've already built the container and connected to it, run **Remote-Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Remote-Containers: Open Folder in Container...** to connect to the container.

## Improving container disk performance

The Remote - Containers extension uses "bind mounts" to source code in your local filesystem by default. While this is the simplest option, on macOS and Windows, you may encounter slower disk performance when running commands like `yarn install` from inside the container. There are few things you can do to resolve these types of issue.

### Use a targeted named volume

Since macOS and Windows run containers in a VM, "bind" mounts are not as fast as using the container's filesystem directly. Fortunately, Docker has the concept of a local "named volume" that can act like the container's filesystem but survives container rebuilds. This makes it ideal for storing package folders like `node_modules`, data folders, or output folders like `build` where write performance is critical. Follow the appropriate steps below based on what you reference in `devcontainer.json`.

**Dockerfile or image**:

Let's use the [vscode-remote-try-node](https://github.com/Microsoft/vscode-remote-try-node) repository to illustrate how to speed up `yarn install`.

Follow these steps:

1. Use the `workspaceMount` property in `devcontainer.json` to tell VS Code where to bind your source code. Then use `runArgs` to mount the `node_modules` sub-folder into a named local volume instead.

    ```json
    "workspaceMount": "src=${localWorkspaceFolder},dst=/workspace,type=bind,consistency=cached",
    "workspaceFolder": "/workspace"
    "runArgs": [
        "-v", "try-node-node_modules:/workspace/node_modules"
    ]
    ```

2. Since this repository [runs VS Code as non-root "node" user](#adding-a-non-root-user-to-your-dev-container), we need to add a `postCreateCommand` to be sure the user can access the folder.

    ```json
    "workspaceMount": "src=${localWorkspaceFolder},dst=/workspace,type=bind,consistency=cached",
    "workspaceFolder": "/workspace",
    "runArgs": [
        "-u", "node",
        "-v", "try-node-node_modules:/workspace/node_modules"
    ],
    "postCreateCommand": "sudo chown node:node node_modules"
    ```

    This second step is not required if you will be running in the container as `root`.

If you've already built the container and connected to it, run **Remote-Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Remote-Containers: Open Folder in Container...** to connect to the container.

**Docker Compose**:

The steps are identical for Docker Compose, but the volume mount configuration is placed in a different file.

1. In your Docker Compose file (or an [extended one](/docs/remote/containers.md#extending-your-docker-compose-file-for-development)), add a named local volume mount to the `node_modules` sub-folder for the appropriate service(s). For example:

    ```yaml
    version: '3'
    services:
      your-service-name-here:
        volumes:
          # Or wherever you've mounted your source code
          - .:/workspace
          - try-node-node_modules:/workspace/node_modules
        # ...

    volumes:
      try-node-node_modules:
    ```

2. Next, be sure the `workspaceFolder` property in `devcontainer.json` matches the place your actual source code is mounted:

    ```json
    "workspaceFolder": "/workspace"
    ```

3. If you're running in the container with a [user other than root](#adding-a-non-root-user-to-your-dev-container), add a `postCreateCommand` to update the owner of the folder you mount since it may have been mounted as root.

    ```json
    "workspaceFolder": "/workspace",
    "postCreateCommand": "sudo chown your-user-name-here node_modules"
    ```

If you've already built the container and connected to it, run **Remote-Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Remote-Containers: Open Folder in Container...** to connect to the container.

### Update the mount consistency to 'delegated' for macOS

By default, the Remote - Containers extension uses the Docker [cached mount consistency](https://docs.docker.com/docker-for-mac/osxfs-caching/) on macOS since this provides a good mix between performance and write guarantees on the host OS. However, you can opt to use the `delegated` consistency instead if you do not expect to be writing to the same file in both locations very often.

Update the `remote.containers.workspaceMountConsistency` property in settings.json:

```json
"remote.containers.workspaceMountConsistency": "delegated"
```

If you've already built the container and connected to it, run **Remote-Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Remote-Containers: Open Folder in Container...** to connect to the container.

### Use a named volume for your entire source tree

Finally, if none of the above options meet your needs, you can go one step farther and **clone your entire source tree inside of a named volume** rather than locally. You can set up a named volume by taking an existing `devcontainer.json` configuration and modifying it as follows (updating `your-volume-name-here` with whatever you want to call the volume).

Depending on what you reference in `devcontainer.json`:

* **Dockerfile or image**: Use the following properties in `devcontainer.json` to mount a local named volume into the container:

    ```json
    "workspaceMount": "src=your-volume-name-here,dst=/workspace,type=volume,volume-driver=local"
    "workspaceFolder": "/workspace",
    ```

* **Docker Compose**: Update (or [extend](/docs/remote/containers.md#extending-your-docker-compose-file-for-development)) your `docker-compose.yml` with the following for the appropriate service(s):

    ```yaml
    version: '3'
    services:
      your-service-name-here:
        volumes:
            - your-volume-name-here:/workspace
        # ...

    volumes:
      your-volume-name-here:
    ```

    You'll also want to be sure the `workspaceFolder` property in `devcontainer.json` matches the place the volume is mounted (or a sub-folder inside the volume):

    ```json
    "workspaceFolder": "/workspace"
    ```

If you've already built the container and connected to it, run **Remote-Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Remote-Containers: Open Folder in Container...** to connect to the container.

Finally, **start an integrated terminal** `kbstyle(Ctrl+Shift+)` and use the `git clone` command to clone your source code into the `/workspace` folder.

## Avoiding extension reinstalls on container rebuild

By default, VS Code will install extensions and VS Code Server inside the container's filesystem. While this has performance benefits over a locally mounted filesystem, the disadvantage is that VS Code will have to reinstall them on a container rebuild. If you find yourself rebuilding frequently, you can use a local "named volume" mount so that the extensions and VS Code Server survive a container rebuild.

There are a few side effects of doing this you should be aware of:

* Sharing the volume across multiple containers could have unintended consequences, so you should pick a unique name for each.
* When you rebuild the container:
  * New extensions added to `devcontainer.json` will **not** be automatically installed.
  * Any `postCreateCommand` in `devcontainer.json` will **not run**.
* Deleting the container will not automatically delete the named volume.

To create the named local volume, follow these steps:

1. **If you are running as a non-root user**, you'll need to ensure your Dockerfile creates `~/.vscode-server` and/or `~/.vscode-server-insiders` in the container.  If you do not do this, the folder will be owned by root and your connection will fail with a permissions issue. See [Adding a non-root user to your dev container](#adding-a-non-root-user-to-your-dev-container) for full details, but you can use this snippet in your Dockerfile to create the folders. Replace `user-name-goes-here` with the actual user name:

    ```Dockerfile
    USER user-name-goes-here
    RUN mkdir -p ~/.vscode-server ~/.vscode-server-insiders
    # Optional - Switch back to root if needed
    USER root
    ```

2. Next, we'll configure a named volume mount for `~/.vscode-server` and `~/.vscode-server-insiders` in the container. The configuration will depend on whether you specify an image, Dockerfile, or Docker Compose file in your `devcontainer.json` file.

    **Dockerfile or image**:

    Add the following to `devcontainer.json`, replacing `/root` with the home directory in the container if not root (for example `/home/user-name-goes-here`) and `unique-vol-name-here` with a unique name for the volume:

    ```json
    "runArgs": [
        "-v", "unique-vol-name-here:/root/.vscode-server",
        // And/or for VS Code Insiders
        "-v", "unique-vol-name-here-insiders:/.vscode-server-insiders",
    ]
    ```

    **Docker Compose**:

    Update (or [extend](/docs/remote/containers.md#extending-your-docker-compose-file-for-development)) your `docker-compose.yml` with the following for the appropriate service. Replace `unique-vol-name-here` with a unique name for the volume.

    ```yml
    services:
      your-service-name-here:
        volumes:
          - unique-vol-name-here:~/.vscode-server
          # And/or for VS Code Insiders
          - unique-vol-name-here-insiders:~/.vscode-server-insiders
        # ...

    volumes:
      unique-vol-name-here:
      unique-vol-name-here-insiders:
    ```

3. Finally, if you've already built the container and connected to it, you'll need to run **Remote-Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Remote-Containers: Reopen Folder in Container** to connect to the container for the first time.

After the container is up and running, subsequent rebuilds will not reacquire any extensions or the VS Code server. The build will also **not use the latest extensions list** from `devcontainer.json`.

However, if you want to completely reset, you can delete the volume and everything will be reinstalled on restart.

```bash
docker volume rm unique-vol-name-here
```

## Adding a non-root user to your dev container

Many Docker images use root as the default user, but there are cases where you may prefer to use a non-root user instead. If you do so, there are some **quirks with local filesystem (bind) mounts** that you should know about. Specifically:

* **Docker Desktop for Mac**: Inside the container, any mounted files/folders will act as if they are owned by the container user you specify. Locally, all filesystem operations will use the permissions of your local user instead.

* **Docker Desktop for Windows**: Inside the container, any mounted files/folders will appear as if they are owned by `root` but the user you specify will still be able to read/write them and all files will be executable. Locally, all filesystem operations will use the permissions of your local user instead. This is because there is fundamentally no way to directly map Windows-style file permissions to Linux.

* **Docker CE/EE on Linux**: Inside the container, any mounted files/folders will have the exact same permissions as outside the container - including the owner user ID (UID) and group ID (GID). Because of this, your container user will either need to have the same UID or be in a group with the same GID. The actual name of the user / group does not matter. The first user on a machine typically gets a UID of 1000, so most containers use this as the ID of the user to try to avoid this problem.

If the image or Dockerfile you are using **already provides an optional non-root user** (like the `node` image) but still defaults to root, you can opt into using it in one of two ways depending on what you reference in `devcontainer.json`:

* **Dockerfile or image**: Add the following to your `devcontainer.json`:

    ```json
    "runArgs": ["-u", "user-name-or-UID-goes-here"]
    ```

* **Docker Compose**: Update (or [extend](/docs/remote/containers.md#extending-your-docker-compose-file-for-development)) your `docker-compose.yml` with the following for the appropriate service:

    ```yaml
    user: user-name-or-UID-goes-here
    ```

However, many images and Dockerfiles only provide a root user and Docker will not automatically create a user in the container if you specify a user or UID that doesn't exist.

Fortunately, you can update or create a Dockerfile that adds a non-root user into your container. Running your application as a non-root user is recommended even in production (since it is more secure), so this is a good idea even if you're reusing an existing Dockerfile. For example, this snippet for a Debian/Ubuntu container will create a user called `user-name-goes-here`, give it the ability to use `sudo`, and set it as the default:

```Dockerfile
ARG USERNAME=user-name-goes-here
# On Linux, replace with your actual UID, GID if not the default 1000
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && mkdir -p /home/$USERNAME/.vscode-server /home/$USERNAME/.vscode-server-insiders \
    && chown ${USER_UID}:${USER_GID} /home/$USERNAME/.vscode-server* \
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************

# [Optional] Set the default user. Omit if you want to keep the default as root.
USER $USERNAME
```

> **Tip:** If you hit an error when building about the GID or UID already existing, the image you selected likely already has a non-root user you can take advantage of directly.

In either case, if you've already built the container and connected to it, run **Remote-Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Remote-Containers: Open Folder in Container...** to connect to the container.

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
    📁 .git
    📁 container1-src
        📄 .devcontainer.json
        📄 hello.go
    📁 container2-src
        📄 .devcontainer.json
        📄 hello.js
    📄 docker-compose.yml
```

The location of the `.git` folder is important, since we will need to ensure the containers can see this path for source control to work properly.

Next, assume the `docker-compose.yml` in the root is as follows:

```yaml
version: '3'
services:
  container-1:
    image: ubuntu:bionic
    volumes:
      # Mount the root folder that contains .git
      - .:/workspace
      # [Optional] For reusing Git SSH keys.
      - ~/.ssh:/root/.ssh-local:ro
    command: /bin/sh -c "while sleep 1000; do :; done"
    links:
      - container-2
    # ...

  container-2:
    image: ubuntu:bionic
    volumes:
      # Mount the root folder that contains .git
      - .:/workspace
      # [Optional] For reusing Git SSH keys.
      - ~/.ssh:/root/.ssh-local:ro
    command: /bin/sh -c "while sleep 1000; do :; done"
    # ...
```

You can then set up `container1-src/.devcontainer.json` for Go development as follows:

```json
{
    "name": "Container 1",
    "dockerComposeFile": ["../docker-compose.yml"],
    "service": "container-1",
    "shutdownAction": "none",
    "extensions": ["ms-vscode.Go"],
    // Open the sub-folder with the source code
    "workspaceFolder": "/workspace/container1-src",
    // [Optional] Copy the contents to the correct location and set permissions
    "postCreateCommand": "mkdir -p ~/.ssh && cp -r ~/.ssh-localhost/* ~/.ssh && chmod 700 ~/.ssh && chmod 600 ~/.ssh/*"
}
```

Next, you can `container2-src/.devcontainer.json` for Node.js development by changing `workspaceFolder` and installing Node.js extensions:

```json
{
    "name": "Container 2",
    "dockerComposeFile": ["../docker-compose.yml"],
    "service": "container-2",
    "shutdownAction": "none",
    "extensions": ["dbaeumer.vscode-eslint"],
    "workspaceFolder": "/workspace/container2-src",
    "postCreateCommand": "mkdir -p ~/.ssh && cp -r ~/.ssh-localhost/* ~/.ssh && chmod 700 ~/.ssh && chmod 600 ~/.ssh/*"
}
```

The `"shutdownAction":"none"` in the `devcontainer.json` files is optional, but will leave the containers running when VS Code closes -- which prevents you from accidentally shutting down both containers by closing one window.

To connect to both:

1. Run **Remote-Containers: Open Folder in Container...** from the Command Palette (`kbstyle(F1)`) and select the `container1-src` folder.
2. VS Code will then start up both containers, connect this window to service `container-1`, and install the Go extension.
3. Next, start up a new window using **File** > **New Window**.
4. In the new window, run **Remote-Containers: Open Folder in Container...** from the Command Palette (`kbstyle(F1)`) and select the `container2-src` folder.
5. Since the services are already running, VS Code will then connect to `container-2` and install the ESLint extension.

You can now interact with both containers at once from separate windows.

### Extending a Docker Compose file when connecting to two containers

If you want to [extend your Docker Compose file for development](/docs/remote/containers.md#extending-your-docker-compose-file-for-development), you should use a single `docker-compose.yml` that extends **both** services (as needed) and is referenced in **both** `.devcontainer.json` files.

For example, consider this `docker-compose.devcontainer.yml` file:

```yaml
version: '3'
services:
  container-1:
    volumes:
      - ~:~/local-home-folder # Additional bind mount
    # ...

  container-2:
    volumes:
      - ~/some-folder:~/some-folder # Additional bind mount
    # ...
```

Both `.devcontainer.json` files would be updated as follows:

```json
"dockerComposeFile": [
  "../docker-compose.yml",
  "../docker-compose.devcontainer.yml",
]
```

This list of compose files is used when starting the containers, so referencing different files in each `.devcontainer.json` can have unexpected results.

## Developing inside a container on a remote Docker host

Sometimes you may want to use the Remote - Containers extension to develop inside a container that sits on a remote server. Docker does **not** support mounting (binding) your local filesystem into a remote container, so VS Code's default `devcontainer.json` behavior to use your local source code will not work. While this is the default behavior, in this section we will cover connecting to a remote host so that you can either [attach to any running container](/docs/remote/containers.md#attaching-to-running-containers), or use a local `devcontainer.json` file as a way to configure, create, and connect to a remote dev container.

However, note that the **Docker CLI still needs to be installed locally** (along with the Docker Compose CLI if you are using it).

### A basic remote devcontainer.json example

There are two different approaches to use `devcontainer.json` with a remote host. One is to **create your remote dev container first**, and then **clone your source code into a named volume** since this does not require you to have direct access to the filesystem on the remote host.

Here is a basic `devcontainer.json` example of this setup:

```json
{
    "image": "node",
    "workspaceFolder": "/workspace",
    "workspaceMount": "src=remote-workspace,dst=/workspace,type=volume,volume-driver=local"
}
```

The second approach is to **(bind) mount a folder on the remote machine** into your container. This requires you to have access to the remote filesystem, but also allows you to work with **existing source code** on the remote machine.

Update the `workspaceMount` property in the example above to use this model instead:

```json
"workspaceMount": "src=/absolute/path/on/remote/machine,dst=/workspace,type=bind"
```

To try it out, connect to the remote Docker host using either [settings or environment variables](#option-1-use-vs-code-settings-or-local-environment-variables), [Docker Machine](#option-2-connect-using-docker-machine), or [SSH](#option-3-connect-using-an-ssh-tunnel), start VS Code, run **Remote-Containers: Open Folder in Container...**, and select the local folder with the `.devcontainer.json` file in it.

You can learn more about [converting an existing or pre-defined devcontainer.json](#converting-an-existing-or-predefined-devcontainerjson) for remote use later in this section, but first we'll discuss how to connect to your remote Docker host.

### Option 1: Use VS Code settings or local environment variables

If you already have a remote Docker host up and running, you can use the following properties in your workspace or user `settings.json` to specify the host:

```json
"docker.host":"tcp://your-remote-machine-fqdn-or-ip-here:port",
"docker.certPath": "/optional/path/to/folder/with/certificate/files",
"docker.tlsVerify": "1" // or "0"
```

Alternatively, you can set **environment variables** in a terminal. The steps to do so are:

1. Shut down all instances of VS Code.
2. Ensure VS Code is in your operating system `PATH`.
3. Set the environment variables (for example `DOCKER_HOST`) in a terminal / command prompt.
4. Type `code` in this same terminal / command prompt to launch VS Code with the variables set.

### Option 2: Connect using Docker Machine

[Docker Machine](https://docs.docker.com/machine/) is a CLI that allows you to securely set up remote Docker hosts and connect to them. You should also be aware that drivers like the [generic driver](https://docs.docker.com/machine/drivers/generic) shown below will require that any non-root user you specify has [passwordless-sudo](https://serverfault.com/questions/160581/how-to-setup-passwordless-sudo-on-linux) privileges.

Use the following command with the appropriate values to set up Docker on a remote SSH host. Note that you can use alternate [Docker Machine drivers](https://docs.docker.com/machine/drivers/) instead if you prefer.

```bash
docker-machine create --driver generic --generic-ip-address your-ip-address-here --generic-ssh-user your-remote-user-here give-it-a-name-here
```

Once you have a machine set up:

1. Shut down all instances of VS Code.
2. Ensure VS Code is in your operating system `PATH`.
3. Execute one of the following commands for your OS:

    **macOS or Linux**:

    ```bash
    eval $(docker-machine env give-it-a-name-here)
    code
    ```

    **Windows PowerShell**:

    ```powershell
    docker-machine env give-it-a-name-here | Invoke-Expression
    code
    ```

### Option 3: Connect using an SSH tunnel

Docker CE / EE / Desktop will not expose the required Docker daemon TCP port by default since this can leave the machine vulnerable if not secured properly. Fortunately, if you have SSH access, you can use a tunnel to forward the Docker socket from your remote host to your local machine as needed.

Follow these steps:

1. Install an [OpenSSH compatible SSH client](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client).

2. Update the `docker.host` property in your user or workspace `settings.json` as follows:

    ```json
    "docker.host":"tcp://localhost:23750"
    ```

    You can also set a `DOCKER_HOST` environment variable before starting VS Code instead if you prefer.

3. Run the following command from a local terminal / PowerShell (replacing `user@hostname` with the remote user and hostname / IP for your server):

    ```bash
    ssh -NL localhost:23750:/var/run/docker.sock user@hostname
    ```

VS Code will now be able to [attach to any running container](/docs/remote/containers.md#attaching-to-running-containers) on the remote host. You can also [use specialized, local `devcontainer.json` files to create / connect to a remote dev container](#converting-an-existing-or-predefined-devcontainerjson).

Once you are done, press `kbstyle(Ctrl+C)` in the terminal / PowerShell to close the tunnel.

> **Note:** If the `ssh` command fails, you may need to `AllowStreamLocalForwarding` on your SSH host.
>
> 1. Open `/etc/ssh/sshd_config` in an editor  (like vim, nano, or pico) on the **SSH host** (not locally).
> 2. Add the setting  `AllowStreamLocalForwarding yes`.
> 3. Restart the SSH server (on Ubuntu, run `sudo systemctl restart sshd`).
> 4. Retry.

### Converting an existing or pre-defined devcontainer.json

To convert an existing or pre-defined, local `devcontainer.json` into a remote one, follow these steps:

1. Open a **local** folder in VS Code (not a remote one) where you want to convert the file.

2. If you did not select a folder with a `devcontainer.json` in it, you can pick a pre-defined one by running **Remote-Containers: Add Container Configuration File...** from the Command Palette (`kbstyle(F1)`).

3. Follow these steps based on what your `.devcontainer/devcontainer.json` or `.devcontainer.json` references:

    **Dockerfile or image**:

    If you do **not** have login access to the remote host, use a Docker "volume" for your source code. Update `.devcontainer/devcontainer.json` as follows (replacing `remote-workspace` with a unique volume name if desired):

    ```json
    "workspaceMount": "src=remote-workspace,dst=/workspace,type=volume,volume-driver=local"
    "workspaceFolder": "/workspace",
    ```

    If you **do** have login access, you can use a remote filesystem bind mount instead:

    ```json
    "workspaceMount": "src=/absolute/path/on/remote/machine,dst=/workspace,type=bind"
    "workspaceFolder": "/workspace",
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

    Next, add a `docker-compose.remote.yml` file into the `.devcontainer` folder.

    If you do **not** have login access to the remote host, add the following to the file replacing `your-service-name-here` with the value of the `service` property in `devcontainer.json` (replacing `remote-workspace` with a unique volume name if desired):

    ```yaml
    version: '3'
    services:
      your-service-name-here:
        volumes:
            - remote-workspace:/workspace
        # ...

    volumes:
      remote-workspace:
    ```

    If you **do** have login access, you can use a remote filesystem bind mount instead:

    ```yaml
    version: '3'
    services:
      your-service-name-here:
        volumes:
          - /absolute/path/on/remote/machine:/workspace
        # ...
    ```

    See the [Docker Compose documentation on `volumes`](https://docs.docker.com/compose/compose-file/#volumes) if you need to support a different scenario.

4. Run the **Remote-Containers: Reopen Folder in Container** command from the Command Palette (`kbstyle(F1)`) or **Remote-Containers: Rebuild Container**.

5. Use ``kbstyle(Ctrl+Shift+`)`` to open a terminal inside the container. You can run `git clone` from here to pull down your source code. You can then use **File > Open... / Open Folder...** to open the cloned repository.

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

Next time, you only need to mount the remote file system, start the SSH tunnel, and use **Remote-Containers: Open Folder in Container...** to open the same folder (`~/devcontainers/repository-name-here`).

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

If the command fails, you will still be able to see the errors but they won't be in red.

## Questions or feedback

* See [Tips and Tricks](/docs/remote/troubleshooting.md#containers-tips) or the [FAQ](/docs/remote/faq.md).
* Search on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode-remote).
* Add a [feature request](https://aka.ms/vscode-remote/feature-requests) or [report a problem](https://aka.ms/vscode-remote/issues/new).
* Create a [development container definition](https://aka.ms/vscode-dev-containers) for others to use.
* Contribute to [our documentation](https://github.com/Microsoft/vscode-docs) or [VS Code itself](https://github.com/Microsoft/vscode).
* See our [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) guide for details.
