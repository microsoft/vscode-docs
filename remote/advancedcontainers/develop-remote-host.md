---
Order: 13
Area: advancedcontainers
TOCTitle: Develop on a remote Docker host
PageTitle: Develop a container on a remote Docker host
ContentId: 661004c9-d96c-4898-8b33-91eefb893466
MetaDescription: Develop a container on a remote Docker host
DateApproved: 12/7/2023
---
# Develop on a remote Docker host

Sometimes you may want to use the Dev Containers extension to develop inside a container that sits on a remote server. Docker does **not** support mounting (binding) your local filesystem into a remote dev container, so Visual Studio Code's default `devcontainer.json` behavior to use your local source code will not work. While this is the default behavior, in this section we will cover connecting to a remote host so that you can either [use the Remote - SSH extension](/docs/remote/ssh.md) to open a folder on a remote host in a container, [attach to any running container](/docs/devcontainers/attach-container.md), or use a **local** `devcontainer.json` file as a way to configure, create, and connect to a remote dev container using a socket.

## Connect using the Remote - SSH extension

If you are using a Linux or macOS SSH host, you can use the [Remote - SSH](/docs/remote/ssh.md) and Dev Containers extensions together. You do not even need to have a Docker client installed locally. To do so:

1. Follow the [installation](/docs/remote/ssh.md#installation) and SSH [host setup](/docs/remote/ssh.md#ssh-host-setup) steps for the Remote - SSH extension.
1. **Optional:** Set up SSH [key based authentication](/docs/remote/troubleshooting.md#configuring-key-based-authentication) to the server so you do not need to enter your password multiple times.
1. [Install Docker](/docs/devcontainers/containers#installation) on your SSH host. You do not need to install Docker locally.
1. Follow the [quick start](/docs/remote/ssh.md#connect-to-a-remote-host) for the Remote - SSH extension to connect to a host and open a folder there.
1. Use the **Dev Containers: Reopen in Container** command from the Command Palette (`kbstyle(F1)`, `kb(workbench.action.showCommands)`).

The rest of the Dev Containers quick start applies as-is. You can learn more about the [Remote - SSH extension in its documentation](/docs/remote/ssh.md).

## Connect using the Remote - Tunnels extension

You can use the [Remote - Tunnels](/docs/remote/tunnels.md) and Dev Containers extensions together to open a folder on your remote host inside of a container. You do not even need to have a Docker client installed locally. This is similar to the SSH host scenario above, but uses Remote - Tunnels instead. To do so:

1. Follow the [Getting Started](/docs/remote/tunnels.md#getting-started) instructions for the Remote - Tunnels extension.
1. [Install Docker](/docs/devcontainers/containers#installation) on your tunnel host. You do not need to install Docker locally.
1. Follow the [steps](/docs/remote/tunnels.md#remote-tunnels-extension) for the Remote - Tunnels extension to connect to a tunnel host and open a folder there.
1. Use the **Dev Containers: Reopen in Container** command from the Command Palette (`kbstyle(F1)`, `kb(workbench.action.showCommands)`).

The rest of the Dev Containers quick start applies as-is. You can learn more about the [Remote - Tunnels extension in its documentation](/docs/remote/tunnels.md).

## Connect using the Docker CLI

This model only requires that a Docker Engine be running on a remote host that your local Docker CLI can connect to. While using the Remote - SSH and Remote - Tunnels extensions is easier and doesn't require the Docker CLI to even be installed locally, this model can be useful for situations where you already have a host you are connecting to from the command line. This approach is also useful if you are looking to attach to already running containers on this remote server.

### A basic remote example

Setting up VS Code to attach to a container on a remote Docker host can be as easy as setting the [Docker extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) `docker.environment` property in `settings.json` and restarting VS Code (or reloading the window).

For example:

```json
"docker.environment": {
    "DOCKER_HOST": "ssh://your-remote-user@your-remote-machine-fqdn-or-ip-here"
}
```

Using SSH requires a [supported SSH client](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client), that you have [key based authentication](/docs/remote/troubleshooting.md#configuring-key-based-authentication) configured for the remote host, and that the **key is imported into your local SSH agent**. See the article on [using SSH Keys with Git](/docs/devcontainers/containers.md#using-ssh-keys) for details on configuring the agent and adding your key.

At this point, you can [attach](/docs/devcontainers/attach-container.md) to containers on the remote host. We'll cover more on information on how you can connect using [settings and environment variables](#connect-using-vs-code-settings-or-local-environment-variables) or [Docker contexts](#connect-using-docker-contexts) later in this section.

For `devcontainer.json`, there is one additional step: You'll need to update any configured (or auto-configured) bind mounts so they no longer point to the local filesystem.

There's two variations of this setup. The first is to **create your remote dev container first**, and then **clone your source code into a named volume** since this does not require you to have direct access to the filesystem on the remote host.

Here is a basic `devcontainer.json` example of this setup:

```json
{
    "image": "node", // Or "dockerFile"
    "workspaceFolder": "/workspace",
    "workspaceMount": "source=remote-workspace,target=/workspace,type=volume"
}
```

In fact, the **Dev Containers: Clone Repository in Container Volume...** command in the Command Palette (`kbstyle(F1)`) uses this same technique. If you already have a `devcontainer.json` file in a GitHub repository that references an image or Dockerfile, the command will automatically use a named volume instead of a bind mount - which also works with remote hosts.

The second approach is to **bind mount a folder on the remote machine** into your container. This requires you to have access to the remote filesystem, but also allows you to work with **existing source code** on the remote machine.

Update the `workspaceMount` property in the example above to use this model instead:

```json
"workspaceMount": "source=/absolute/path/on/remote/machine,target=/workspace,type=bind,consistency=cached"
```

In either case, to try it out, run **Dev Containers: Open Folder in Container...**, and select the local folder with the `.devcontainer.json` file in it.

See [Converting an existing or pre-defined devcontainer.json](#converting-an-existing-or-predefined-devcontainerjson) for information on other scenarios like Docker Compose.

## Connect using VS Code settings or local environment variables

If you already have a remote Docker host up and running, you can use the following properties in your workspace or user `settings.json` to specify the host.

### SSH protocol

Recent versions of Docker (18.06+) have added support for the SSH protocol to connect to remote Docker Host. This is easy to configure as you only need to set one property in `settings.json` to use it.

First, install a [supported SSH client](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client), configure [key based authentication](/docs/remote/troubleshooting.md#configuring-key-based-authentication)), and then **import your key into your local SSH agent** (which often is not running by default on Windows and Linux). See the article on [using SSH Keys with Git](/docs/devcontainers/containers.md#using-ssh-keys) for details on configuring the agent and adding the key.

Then, add the following [Docker extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) `docker.environment` property to `settings.json` (replacing values as appropriate):

```json
"docker.environment": {
    "DOCKER_HOST": "ssh://your-remote-user@your-remote-machine-fqdn-or-ip-here"
}
```

After restarting VS Code (or reloading the window), you will now be able to [attach to any running container](/docs/devcontainers/attach-container.md) on the remote host. You can also [use specialized, local `devcontainer.json` files to create / connect to a remote dev container](#converting-an-existing-or-predefined-devcontainerjson).

> **Tip:** If this is not working for you but you are able to connect to the host using SSH from the command line, be sure you have the [SSH agent running with your authentication key](/docs/devcontainers/containers.md#using-ssh-keys). If all else fails, you can use [an SSH tunnel as a fallback](/docs/devcontainers/tips-and-tricks.md#using-an-ssh-tunnel-to-connect-to-a-remote-docker-host) instead.

### Using the TCP protocol

While the SSH protocol has its own built-in authorization mechanism, using the TCP protocol often requires setting other [Docker extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) properties in your `settings.json`. These are:

```json
"docker.environment": {
    "DOCKER_HOST": "tcp://your-remote-machine-fqdn-or-ip-here:port",
    "DOCKER_CERT_PATH": "/optional/path/to/folder/with/certificate/files",
    "DOCKER_TLS_VERIFY": "1" // or "0"
}
```

As with SSH, restart VS Code (or reload the window) for the settings to take effect.

### Using environment variables instead of settings.json

If you'd prefer not to use `settings.json`, you can set **environment variables** in a terminal instead. The steps to do so are:

1. Shut down **all instances** of VS Code.
2. Ensure VS Code is in your operating system `PATH`.
3. Set the environment variables (for example `DOCKER_HOST`) in a terminal / command prompt.
4. Type `code` in this same terminal / command prompt to launch VS Code with the variables set.

## Connect using Docker Contexts

[Docker Contexts](https://docs.docker.com/engine/context/working-with-contexts/) allow you to interact with different hosts - you can set up contexts for each host and switch between them.

You create new contexts with `docker context create`. The current context can be changed using `docker context use <context>`.

The [Docker extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) comes with the `docker.environment` setting where environment variables like `DOCKER_HOST` or `DOCKER_CONTEXT` can be set that are also honored by the Dev Containers extension.

> **Note:** The above settings are only visible when the Docker extension is installed. Without the Docker extension, Dev Containers will use the current context.

## Converting an existing or pre-defined devcontainer.json

To convert an existing or pre-defined, local `devcontainer.json` into a remote one, follow these steps:

1. Open a **local** folder in VS Code (not a remote one) where you want to convert the file.

2. If you did not select a folder with a `devcontainer.json` in it, you can pick a pre-defined one by running **Dev Containers: Add Container Configuration File...** from the Command Palette (`kbstyle(F1)`).

3. Follow these steps based on what your `.devcontainer/devcontainer.json` or `.devcontainer.json` references to alter the source code mount:

    **Dockerfile or image**:

    If you do **not** have login access to the remote host, use a Docker "volume" for your source code. Update `.devcontainer/devcontainer.json` as follows (replacing `remote-workspace` with a unique volume name if desired):

    ```json
    "workspaceMount": "source=remote-workspace,target=/workspace,type=volume"
    "workspaceFolder": "/workspace",
    ```

    If you **do** have login access, you can use a remote filesystem bind mount instead:

    ```json
    "workspaceMount": "source=/absolute/path/on/remote/machine,target=/workspace,type=bind,consistency=cached"
    "workspaceFolder": "/workspace",
    ```

    The `workspaceMount` property supports the same values as the [Docker CLI `--mount` flag](https://docs.docker.com/engine/reference/commandline/run/#add-bind-mounts-or-volumes-using-the---mount-flag) if you have a different scenario in mind.

    **Docker Compose**:

    If you do **not** have login access to the remote host, update (or [extend](/docs/devcontainers/create-dev-container.md#extend-your-docker-compose-file-for-development)) your `compose.yaml`. Replace  `your-service-name-here` with the value specified for the `"service"` property in `devcontainer.json` and appropriate and `remote-workspace` with a unique volume name:

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
          - /absolute/path/on/remote/machine:/workspace:cached
        # ...
    ```

    See the [Docker Compose documentation on `volumes`](https://docs.docker.com/compose/compose-file/#volumes) if you need to support a different scenario.

4. Run the **Dev Containers: Reopen in Container** command from the Command Palette (`kbstyle(F1)`) or **Dev Containers: Rebuild Container**.

5. If you used a volume instead of a bind mount, use `kb(workbench.action.terminal.new)` to open a terminal inside the container. You can run `git clone` from here to pull down your source code and use **File > Open... / Open Folder...** to open the cloned repository.

Next time you want to connect to this same container, run **Dev Containers: Open Folder in Container...** and select the same local folder in a VS Code window.

## Optional: Making the remote source code available locally

If you store your source code on the remote host's filesystem instead of inside a Docker volume, there are several ways you can access the files locally:

1. [Mount the remote filesystem using SSHFS](/docs/remote/troubleshooting.md#using-sshfs-to-access-files-on-your-remote-host).
2. [Sync files from the remote host to your local machine using `rsync`](/docs/remote/troubleshooting.md#using-rsync-to-maintain-a-local-copy-of-your-source-code).
3. [Use the mount command](https://docs.docker.com/machine/reference/mount/) if you are using [Docker Machine](https://docs.docker.com/machine/).

Using SSHFS or Docker Machine's mount command are the more convenient options and do not require any file sync'ing. However, performance will be significantly slower than working through VS Code, so they are best used for single file edits and uploading/downloading content. If you need to use an application that bulk reads/write to many files at once (like a local source control tool), rsync is a better choice.
