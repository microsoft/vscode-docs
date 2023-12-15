---
Order: 8
Area: devcontainers
TOCTitle: Tutorial
PageTitle: Get started with development Containers in Visual Studio Code
ContentId: 8e1fb9e0-1a67-4e0c-a21b-c5ab9a6d979c
MetaDescription: Get started with development Containers in Visual Studio Code
DateApproved: 12/7/2023
---
# Dev Containers tutorial

This tutorial walks you through running Visual Studio Code in a [Docker](https://www.docker.com/) container using the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension. You need no prior knowledge of Docker to complete this tutorial.

Running VS Code **inside** a Docker container can be useful for many reasons, but in this walkthrough we'll focus on using a Docker container to set up a development environment that is separate from your local environment.

## Prerequisites

You need [Visual Studio Code](https://code.visualstudio.com/) installed.

## Install Docker

Docker is needed to create and manage your containers.

### Docker Desktop

Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop), or an [alternative Docker option](/remote/advancedcontainers/docker-options.md), like Docker on a remote host or Docker compliant CLI.

### Start Docker

Run the Docker Desktop application to start Docker. You will know it's running if you look in the activity tray and see the Docker whale icon.

Docker might take a few minutes to start. If the whale icon is animated, it is probably still in the process of starting. You can click on the icon to see the status.

![Docker status](images/tutorial/docker-status.png)

### Check Docker

Once Docker is running, you can confirm that everything is working by opening a **new** terminal window and typing the command:

```bash
docker --version
# Docker version 18.09.2, build 6247962
```

## Install the extension

The Dev Containers extension lets you run Visual Studio Code inside a Docker container.

> <a class="install-extension-btn" href="vscode:extension/ms-vscode-remote.remote-containers">Install the Dev Containers extension</a>

![Dev Containers extension](images/tutorial/dev-containers-extension.png)

### Check installation

With the Dev Containers extension installed, you will see a new Status bar item at the far left.

![Remote Status bar item](images/tutorial/remote-status-bar.png)

The Remote Status bar item can quickly show you in which context VS Code is running (local or remote) and clicking on the item will bring up the Dev Containers commands.

![Dev Containers commands](images/tutorial/dev-containers-commands-simple.png)

## Get the sample

To create a Docker container, we are going to open a GitHub repository with a Node.js project.

Open the Command Palette (`F1`) to run the command **Dev Containers: Try a Dev Container Sample...** and select the Node sample from the list.

![Select a sample from the list](images/containers/select-a-sample.png)

**Note**: There are other dev container samples such as `vscode-remote-try-python` or `vscode-remote-try-java`, but this tutorial will use `vscode-remote-try-node`.

### Wait for the container to build

The window will then reload, but since the container does not exist yet, VS Code will create one and clone the sample repository into an isolated [container volume](https://docs.docker.com/storage/volumes/). This may take some time, and a progress notification will provide status updates. Fortunately, this step isn't necessary the next time you open the folder since the container will already exist.

![Dev Container Progress Notification](images/containers/dev-container-progress.png)

After the container is built, VS Code automatically connects to it and maps the project folder from your local file system into the container.

### Check the container

Once the container is running and you're connected, you should see your remote context change in the bottom left of the Status bar:

![Building image](images/tutorial/connected.png)

## Check your environment

One of the useful things about developing in a container is that you can use specific versions of dependencies that your application needs without impacting your local development environment.

The specific container for this tutorial has Node.js v18 installed, which you can check by opening a new terminal **Terminal** > **New Terminal** (`kb(workbench.action.terminal.new)`) and entering:

```bash
node --version; npm --version
```

This should show the following versions:

![Node.js version check](images/tutorial/version-check-updated.png)

### Run the application

We can now hit `kb(workbench.action.debug.start)`, which will run the application inside the container. Once the process starts, navigate to [http://localhost:3000](http://localhost:3000) and you should see the simple Node.js server running!

![Running the application](images/tutorial/hello-remote-world.png)

### Ending your container connection

You can end your session in the container and go back to running VS Code locally with **File** > **Close Remote Connection**.

## How it works

This next section describes in more detail how the Dev Containers extension sets up and configures your containers.

The Dev Containers extension uses the files in the `.devcontainer` folder, namely `devcontainer.json`, and an optional `Dockerfile` or `compose.yaml`, to create your dev containers.

In the example we just explored, the project has a `.devcontainer` folder with a `devcontainer.json` inside. The `devcontainer.json` uses the image `mcr.microsoft.com/devcontainers/javascript-node:0-18`. You can explore this image in greater detail in the [devcontainers/images](https://github.com/devcontainers/images/tree/main/src/javascript-node) repo.

First, your image is built from the supplied Dockerfile or image name, which would be `mcr.microsoft.com/devcontainers/javascript-node:0-18` in this example. Then a container is created and started using some of the settings in the `devcontainer.json`. Finally your Visual Studio Code environment is installed and configured again according to settings in the `devcontainer.json`. For example, the dev container in this example installs the `streetsidesoftware.code-spell-checker` extension.

> **Note:** Additional configuration will already be added to the container based on what's in the base image. For example, we see the `streetsidesoftware.code-spell-checker` extension above, and the container will also include `"dbaeumer.vscode-eslint"` as [that's part of `mcr.microsoft.com/devcontainers/typescript-node`](https://github.com/devcontainers/images/blob/main/src/javascript-node/.devcontainer/devcontainer.json#L27). This happens automatically when pre-building using devcontainer.json, which you may read more about in the [pre-build section](/docs/devcontainers/containers.md#prebuilding-dev-container-images).

Once all of this is done, your local copy of Visual Studio Code connects to the Visual Studio Code Server running inside of your new dev container.

![Architecture](../remote/images/remote-overview/architecture.png)

### devcontainer.json

The `devcontainer.json` is basically a config file that determines how your dev container gets built and started.

```json
//devcontainer.json
{
    "name": "Node.js",

    // Or use a Dockerfile or Docker Compose file. More info: https://containers.dev/guide/dockerfile
    "image": "mcr.microsoft.com/devcontainers/javascript-node:0-18",

    // Features to add to the dev container. More info: https://containers.dev/features.
    // "features": {},

    "customizations": {
        "vscode": {
            "settings": {},
            "extensions": [
                "streetsidesoftware.code-spell-checker"
            ]
        }
    },

    // "forwardPorts": [3000],

    "portsAttributes": {
        "3000": {
            "label": "Hello Remote World",
            "onAutoForward": "notify"
        }
    },

    "postCreateCommand": "yarn install",

    // "remoteUser": "root"
}
```

The above example is extracted from the `vscode-remote-try-node` repo we used in the tutorial.

| Option | Description |
|---|---|
| `image` | The name of an image in a container registry ([Docker Hub](https://hub.docker.com/), [GitHub Container Registry](https://docs.github.com/packages/guides/about-github-container-registry), [Azure Container Registry](https://azure.microsoft.com/services/container-registry/)) VS Code should use to create the dev container. <br> |
| `dockerfile` | Rather than referencing an `image`, you may instead use the `dockerfile` property, which is the relative path to a `Dockerfile` that you want to use as your image. |
| `features` | An object of [Dev Container Feature](/docs/devcontainers/containers.md#dev-container-features) IDs and related options to be added. |
| `customizations` | Configure tool-specific properties, like `settings` and `extensions` properties for VS Code. |
| `settings`  | Adds default `settings.json` values into a container/machine specific settings file, such as `"terminal.integrated.defaultProfile.linux": "bash"`. |
| `extensions`  | An array of extension IDs that specify the extensions that should be installed inside the container when it is created. |
| `forwardPorts`  | Make a list of ports inside the container available locally. |
| `portsAttributes` | Set default properties for specific forwarded ports. |
| `postCreateCommand`  | A command string or list of command arguments to run after the container is created. |
| `remoteUser`  | Overrides the user that VS Code runs as in the container (along with sub-processes). Defaults to the `containerUser`. |

You can review the [full list](https://containers.dev/implementors/json_reference) of `devcontainer.json` options.

### Congratulations

Congratulations, you've successfully completed this tutorial!

This has been a brief overview of what is possible using dev containers. As a next step, we recommend checking out how you can [open an existing folder from your machine in a container](/docs/devcontainers/containers.md#quick-start-open-an-existing-folder-in-a-container) or [opening a GitHub repository or PR in a container](/docs/devcontainers/containers.md#quick-start-open-a-git-repository-or-github-pr-in-an-isolated-container-volume).

Check out the other Remote Development extensions.

* [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)
* [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)

Or get them all by installing the
[Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) Extension Pack.

## Troubleshooting

### Verify Docker context

If you are not using a fresh Docker install and the **Dev Containers: Try a Dev Container Sample...** sample encounters issues with the current context, you should check your Docker context. Fresh installs will have a 'default' context and you can set it back as the current context.

```bash
# Displays the list of contexts, '*' denotes the current context
docker context list

# Switches the list to the 'default' context
docker context use default
```
