---
Order: 11
Area: advancedcontainers
TOCTitle: Connect to multiple containers
PageTitle: Connect to multiple containers
ContentId: d3b8e250-a03e-4c67-b2f9-391cc106f3b5
MetaDescription: Connect to multiple containers
DateApproved: 3/30/2023
---
# Connect to multiple containers

Currently you can only connect to one container per Visual Studio Code window. However, you can spin up multiple VS Code windows to [attach to them](/docs/devcontainers/attach-container.md).

If you'd prefer to use `devcontainer.json` instead and are using Docker Compose, you can create separate  `devcontainer.json` files for each service in your source tree that point to a common `docker-compose.yml`.

To see how this works, consider this example source tree:

```
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
      - .:/workspace:cached
    command: /bin/sh -c "while sleep 1000; do :; done"
    links:
      - container-2
    # ...

  container-2:
    image: ubuntu:bionic
    volumes:
      # Mount the root folder that contains .git
      - .:/workspace:cached
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
    "extensions": ["golang.go"],
    // Open the sub-folder with the source code
    "workspaceFolder": "/workspace/container1-src",
}
```

Next, you can set up `container2-src/.devcontainer.json` for Node.js development by changing `workspaceFolder` and installing Node.js extensions:

```json
{
    "name": "Container 2",
    "dockerComposeFile": ["../docker-compose.yml"],
    "service": "container-2",
    "shutdownAction": "none",
    "extensions": ["dbaeumer.vscode-eslint"],
    "workspaceFolder": "/workspace/container2-src"
}
```

The `"shutdownAction":"none"` in the `devcontainer.json` files is optional, but will leave the containers running when VS Code closes -- which prevents you from accidentally shutting down both containers by closing one window.

To connect to both:

1. Run **Dev Containers: Open Folder in Container...** from the Command Palette (`kbstyle(F1)`) and select the `container1-src` folder.
2. VS Code will then start up both containers, connect this window to service `container-1`, and install the Go extension.
3. Next, start up a new window using **File** > **New Window**.
4. In the new window, run **Dev Containers: Open Folder in Container...** from the Command Palette (`kbstyle(F1)`) and select the `container2-src` folder.
5. Since the services are already running, VS Code will then connect to `container-2` and install the ESLint extension.

You can now interact with both containers at once from separate windows.

## Extending a Docker Compose file when connecting to two containers

If you want to [extend your Docker Compose file for development](/docs/devcontainers/create-dev-container.md#extend-your-docker-compose-file-for-development), you should use a single `docker-compose.yml` that extends **both** services (as needed) and is referenced in **both** `.devcontainer.json` files.

For example, consider this `docker-compose.devcontainer.yml` file:

```yaml
version: '3'
services:
  container-1:
    volumes:
      - ~:~/local-home-folder:cached # Additional bind mount
    # ...

  container-2:
    volumes:
      - ~/some-folder:~/some-folder:cached # Additional bind mount
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
