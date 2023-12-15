---
Order: 11
Area: advancedcontainers
TOCTitle: Connect to multiple containers
PageTitle: Connect to multiple containers
ContentId: d3b8e250-a03e-4c67-b2f9-391cc106f3b5
MetaDescription: Connect to multiple containers
DateApproved: 12/7/2023
---
# Connect to multiple containers

Currently you can only connect to one container per Visual Studio Code window. However, you can spin up multiple VS Code windows to [attach to them](/docs/devcontainers/attach-container.md).

If you'd prefer to use `devcontainer.json` instead and are using Docker Compose, you can create separate  `devcontainer.json` files for each service in your source tree, each pointing to a common `compose.yaml`.

To see how this works, consider this example source tree:

```
📁 project-root
    📁 .git
    📁 .devcontainer
      📁 python-container
        📄 devcontainer.json
      📁 node-container
        📄 devcontainer.json
    📁 python-src
        📄 hello.py
    📁 node-src
        📄 hello.js
    📄 compose.yaml
```

The location of the `.git` folder is important, since we will need to ensure the containers can see this path for source control to work properly.

Next, assume the `compose.yaml` in the root is as follows:

```yaml
version: '3'
services:
  python-api:
    image: mcr.microsoft.com/devcontainers/python:1-3.12-bookworm
    volumes:
      # Mount the root folder that contains .git
      - .:/workspace:cached
    command: sleep infinity
    links:
      - node-app
    # ...

  node-app:
    image: mcr.microsoft.com/devcontainers/typescript-node:1-20-bookworm
    volumes:
      # Mount the root folder that contains .git
      - .:/workspace:cached
    command: sleep infinity
    # ...
```

You can then set up `./devcontainer/python-container/devcontainer.json` for Python development as follows:

```json
{
    "name": "Python Container",
    "dockerComposeFile": ["../../compose.yaml"],
    "service": "python-api",
    "shutdownAction": "none",
    "workspaceFolder": "/workspace/python-src"
}
```

Next, you can set up `./devcontainer/node-container/devcontainer.json` for Node.js development by changing `workspaceFolder`.

```json
{
    "name": "Node Container",
    "dockerComposeFile": ["../../compose.yaml"],
    "service": "node-app",
    "shutdownAction": "none",
    "workspaceFolder": "/workspace/node-src"
}
```

The `"shutdownAction":"none"` in the `devcontainer.json` files is optional, but will leave the containers running when VS Code closes -- which prevents you from accidentally shutting down both containers by closing one window.

## Connect to multiple containers in multiple VS Code windows

1. Open a VS Code window at the root level of the project.
2. Run **Dev Containers: Reopen in Container** from the Command Palette (`kbstyle(F1)`) and select `Python Container`.
3. VS Code will then start up both containers, reload the current window and connect to the selected container.
4. Next, open a new window using **File** > **New Window**.
5. Open your project at root level in the current window.
6. Run **Dev Containers: Reopen in Container** from the Command Palette (`kbstyle(F1)`) and select `Node Container`.
7. The current VS Code window will reload and connect to the selected container.

You can now interact with both containers from separate windows.

## Connect to multiple containers in a single VS Code window

1. Open a VS Code window at the root level of the project.
2. Run **Dev Containers: Reopen in Container** from the Command Palette (`kbstyle(F1)`) and select `Python Container`.
3. VS Code will then start up both containers, reload the current window and connect to the selected container.
4. Run **Dev Containers: Switch Container** from the Command Palette (`kbstyle(F1)`) and select `Node Container`.
5. The current VS Code window will reload and connect to the selected container.
6. You can switch back with the same command.

## Extending a Docker Compose file when connecting to two containers

If you want to [extend your Docker Compose file for development](/docs/devcontainers/create-dev-container.md#extend-your-docker-compose-file-for-development), you should use a single `compose.yaml` that extends **both** services (as needed) and is referenced in **both** `devcontainer.json` files.

For example, consider this `docker-compose.devcontainer.yml` file:

```yaml
version: '3'
services:
  python-api:
    volumes:
      - ~:~/local-home-folder:cached # Additional bind mount
    # ...

  node-app:
    volumes:
      - ~/some-folder:~/some-folder:cached # Additional bind mount
    # ...
```

Both `.devcontainer.json` files would be updated as follows:

```json
"dockerComposeFile": [
  "../../compose.yaml",
  "../../docker-compose.devcontainer.yml",
]
```

This list of compose files is used when starting the containers, so referencing different files in each `devcontainer.json` can have unexpected results.
