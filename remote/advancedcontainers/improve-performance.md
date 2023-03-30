---
Order: 7
Area: advancedcontainers
TOCTitle: Improve performance
PageTitle: Improve container performance
ContentId: 0956602e-d7a7-4071-8345-86075fd81374
MetaDescription: Improve container performance
DateApproved: 3/30/2023
---
# Improve disk performance

The Dev Containers extension uses "bind mounts" to source code in your local filesystem by default. While this is the simplest option, on macOS and Windows, you may encounter slower disk performance when running commands like `yarn install` from inside the container. There are few things you can do to resolve these type of issues.

## Store your source code in the WSL 2 filesystem on Windows

Windows 10 2004 and up includes an improved version of the Windows Subsystem for Linux (WSL 2) that provides a full Linux kernel and has significantly improved performance over WSL 1. Docker Desktop 2.3+ includes a new WSL 2 Engine that runs Docker in WSL rather than in a VM. Therefore, if you store your source code in the WSL 2 filesystem, you will see improved performance along with better compatibility for things like setting permissions.

See [Open a WSL 2 folder in a container on Windows](/docs/devcontainers/containers.md#open-a-wsl-2-folder-in-a-container-on-windows) for details on using this new engine from VS Code.

### Video: Speed up Dev Containers on Windows

<iframe width="560" height="315" src="https://www.youtube.com/embed/MUsROtVmPJM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Use Clone Repository in Container Volume

The **Dev Containers: Clone Repository in Container Volume...** command uses an isolated, local Docker named volume instead of binding to the local filesystem. In addition to not polluting your file tree, local volumes have the added benefit of improved performance on Windows and macOS.

See [Open a Git repository or GitHub PR in an isolated container volume](/docs/devcontainers/containers.md#quick-start-open-a-git-repository-or-github-pr-in-an-isolated-container-volume) for details on using this approach.

The next two sections will outline how to use a named volume in other scenarios.

## Use a targeted named volume

Since macOS and Windows run containers in a VM, "bind" mounts are not as fast as using the container's filesystem directly. Fortunately, Docker has the concept of a local "named volume" that can act like the container's filesystem but survives container rebuilds. This makes it ideal for storing package folders like `node_modules`, data folders, or output folders like `build` where write performance is critical. Follow the appropriate steps below based on what you reference in `devcontainer.json`.

**Dockerfile or image**:

Let's use the [vscode-remote-try-node](https://github.com/microsoft/vscode-remote-try-node) repository to illustrate how to speed up `yarn install`.

Follow these steps:

1. Use the `workspaceMount` property in `devcontainer.json` to tell VS Code where to bind your source code. Then use the `mounts` property (VS Code 1.41+) to mount the `node_modules` sub-folder into a named local volume instead.

    ```json
    "mounts": [
        "source=${localWorkspaceFolderBasename}-node_modules,target=${containerWorkspaceFolder}/node_modules,type=volume"
    ]
    ```

    > **Note**: You may use `${localWorkspaceFolderBasename}`, `${devcontainerId}`, or a hardcoded name in the `source`.

2. Since this repository [runs VS Code as the non-root "node" user](/remote/advancedcontainers/add-nonroot-user.md), we need to add a `postCreateCommand` to be sure the user can access the folder.

    ```json
    "remoteUser": "node",
    "mounts": [
        "source=${localWorkspaceFolderBasename}-node_modules,target=${containerWorkspaceFolder}/node_modules,type=volume"
    ],
    "postCreateCommand": "sudo chown node node_modules"
    ```

    This second step is not required if you will be running in the container as `root`.

If you've already built the container and connected to it, run **Dev Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Dev Containers: Open Folder in Container...** to connect to the container.

Two notes on this approach:

1. If you delete the `node_modules` folder in the container, it may lose the connection to the volume. Delete the contents of the `node_modules` folder instead when needed (`rm -rf node_modules/* node_modules/.*`).

2. You'll find that an empty `node_modules` folder gets created locally with this method. This is because the volume mount point in the container is inside the local filesystem bind mount. This is expected and harmless.

**Docker Compose**:

While vscode-remote-try-node does not use Docker Compose, the steps are similar, but the volume mount configuration is placed in a different file.

1. In your Docker Compose file (or an [extended one](/docs/devcontainers/create-dev-container.md#extend-your-docker-compose-file-for-development)), add a named local volume mount to the `node_modules` sub-folder for the appropriate service(s). For example:

    ```yaml
    version: '3'
    services:
      your-service-name-here:
        volumes:
          # Or wherever you've mounted your source code
          - .:/workspace:cached
          - try-node-node_modules:/workspace/node_modules
        # ...

    volumes:
      try-node-node_modules:
    ```

2. Next, be sure the `workspaceFolder` property in `devcontainer.json` matches the place your actual source code is mounted:

    ```json
    "workspaceFolder": "/workspace"
    ```

3. If you're running in the container with a [user other than root](/remote/advancedcontainers/add-nonroot-user.md), add a `postCreateCommand` to update the owner of the folder you mount since it may have been mounted as root. Replace `user-name-goes-here` with the appropriate user.

    ```json
    "remoteUser": "node",
    "workspaceFolder": "/workspace",
    "postCreateCommand": "sudo chown user-name-goes-here node_modules"
    ```

If you've already built the container and connected to it, run **Dev Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Dev Containers: Open Folder in Container...** to connect to the container.

### Video: Speed up npm install in a dev container

<iframe width="560" height="315" src="https://www.youtube.com/embed/iDdJWIPRUx4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Use a named volume for your entire source tree

Finally, if none of the above options meet your needs, you can go one step further and **clone your entire source tree inside of a named volume** rather than locally. You can set up a named volume by taking an existing `devcontainer.json` configuration and modifying it as follows (updating `your-volume-name-here` with whatever you want to call the volume).

Depending on what you reference in `devcontainer.json`:

* **Dockerfile or image**: Use the following properties in `devcontainer.json` to mount a local named volume into the container:

    ```json
    "workspaceMount": "source=your-volume-name-here,target=/workspace,type=volume"
    "workspaceFolder": "/workspace",
    ```

* **Docker Compose**: Update (or [extend](/docs/devcontainers/create-dev-container.md#extend-your-docker-compose-file-for-development)) your `docker-compose.yml` with the following for the appropriate service(s):

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

If you've already built the container and connected to it, run **Dev Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Dev Containers: Open Folder in Container...** to connect to the container.

Next, either use the **Git: Clone** command from the Command Palette or **start an integrated terminal** (`kb(workbench.action.terminal.new)`) and use the `git clone` command to clone your source code into the `/workspace` folder.

Finally, use the **File > Open... / Open Folder...** command to open the cloned repository in the container.
