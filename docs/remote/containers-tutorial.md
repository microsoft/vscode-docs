---
Order: 7
Area: remote
TOCTitle: Containers Tutorial
PageTitle: Getting started with Dev Containers
ContentId: 8e1fb9e0-1a67-4e0c-a21b-c5ab9a6d979c
MetaDescription: Getting started with Dev Containers
DateApproved: 6/10/2020
---
# Remote development in Containers

This tutorial walks you through running Visual Studio Code in a [Docker](https://www.docker.com/) container using the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension. You need no prior knowledge of Docker to complete this tutorial.

Running VS Code **inside** a Docker container can be useful for many reasons, but in this walkthrough we'll focus on using a Docker container to set up a development environment that is isolated from your local environment.

## Prerequisites

You need [Visual Studio Code](https://code.visualstudio.com/) installed.

## Install Docker

Docker is needed to create and manage your containers.

### Docker Desktop

Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop).

### Start Docker

Run the Docker Desktop application to start Docker. You will know it's running if you look in the activity tray and see the Docker whale icon.

Docker might take a few minutes to start. If the whale icon is animated, it is probably still in the process of starting. You can click on the icon to see the status.

![Docker status](images/containers-tutorial/docker-status.png)

### Check Docker

Once Docker is running, you can confirm that everything is working by opening a **new** terminal window and typing the command:

```bash
docker --version
# Docker version 18.09.2, build 6247962
```

## Install the extension

The Remote - Containers extension lets you run Visual Studio Code inside a Docker container.

> <a class="tutorial-install-extension-btn" href="vscode:extension/ms-vscode-remote.remote-containers">Install the Remote - Containers extension</a>

<!-- TBD add extension image? -->

### Check installation

With the Remote - Containers extension installed, you will see a new Status bar item at the far left.

![Remote Status bar item](images/containers-tutorial/remote-status-bar.png)

The Remote Status bar item can quickly show you in which context VS Code is running (local or remote) and clicking on the item will bring up the Remote - Containers commands.

![Remote - Containers commands](images/containers-tutorial/remote-containers-commands.png)

## Get the sample

To create a Docker container, we are going to clone a GitHub repository with a Node.js project.

Run the git clone command in a terminal or command prompt.

```bash
git clone https://github.com/Microsoft/vscode-remote-try-node
```

<!-- TBD switch to Try Sample flow -->

**Note**: There are other remote container samples such as `vscode-remote-try-python` or `vscode-remote-try-java`, but this tutorial will use `vscode-remote-try-node`.

### Open the repo in Visual Studio Code

Upon opening one of the sample projects listed above, you should see the following notification prompting you to reopen the workspace inside a dev container. Select **Reopen in Container**.

![Dev container notification](images/containers-tutorial/dev-container-toast.png)

### Wait for the container to build

If this is your first time connecting, a Docker image will be downloaded, built, and starts a container with a copy of VS Code Server running. This might take a few minutes the first time, but future connections will only take seconds.

![Building image](images/containers-tutorial/building-image.png)

### Check the container

Once the container is running and you're connected, you should see your remote context change in the bottom left of the Status bar:

![Building image](images/containers-tutorial/connected.png)
<!-- TBD old settings icon -->

## Check your environment

One of the useful things about developing in a container is that you can use specific versions of dependencies that your application needs without impacting your local development environment.

The specific container for this tutorial has Node.js v10 installed, which you can check by opening a new terminal **Terminal** > **New Terminal** (`kb(workbench.action.terminal.new)`) and entering:

```bash
node --version; npm --version
```

This should show the following versions:

![Node.js version check](images/containers-tutorial/version-check.png)

### Run the application

We can now hit `kb(workbench.action.debug.start)`, which will run the application inside the container. Once the process starts, navigate to http://localhost:3000 and you should see the simple Node.js server running!

![Running the application](images/containers-tutorial/hello-remote-world.png)

### Ending your container connection

You can end your session in the container and go back to running VS Code locally with **File** > **Close Remote Connection**.

## How it works

This next section describes in more detail how the Remote - Containers extension sets up and configures your containers.

The remote container extension uses the files in the `.devcontainer` folder, namely `devcontainer.json`, and an optional `Dockerfile` or `docker-compose.yml`, to create your dev containers.

First your image is built from the supplied Docker file or image name. Then a container is created and started using some of the settings in the `devcontainer.json`. Finally your Visual Studio Code environment is installed and configured again according to settings in the `devcontainer.json`.

Once all of this is done, your local copy of Visual Studio Code connects to the Visual Studio Code Server running inside of your new dev container.

### devcontainer.json

The `devcontainer.json` is basically a config file that determines how your dev container gets built and started.

```json
//devcontainer.json
{
    "name": "Node.js Sample",
    "dockerFile": "Dockerfile",
    "appPort": 3000,
    "extensions": [
        "dbaeumer.vscode-eslint"
    ],
    "settings": {
        "terminal.integrated.shell.linux": "/bin/bash"
    },
    "postCreateCommand": "yarn install",
    // Comment out the next line to run as root instead. Linux users, update
    // Dockerfile with your user's UID/GID if not 1000.
    "runArgs": [ "-u", "node" ]
}
```

The above example is taken from the `vscode-remote-try-node` repo we used in the tutorial.

| Option | Description |
|---|---|
| `dockerfile` | Relative path to a `Dockerfile` that you wish to use as your image. |
| `appPort`  | A port or array of ports that should be made available locally when the container is running  |
| `extensions`  | An array of extension IDs that specify the extensions that should be installed inside the container when it is created.   |
| `settings`  | Adds default `settings.json` values into a container/machine specific settings file. |
| `postCreateCommand`  | A command string or list of command arguments to run after the container is created. |
| `runArgs`  | An array of [Docker CLI](https://docs.docker.com/engine/reference/commandline/run/) arguments that should be used when running the container. |

[Full list](/docs/remote/containers.md#devcontainerjson-reference) of `devcontainer.json` options.

## Congratulation!

Congratulations, you've successfully completed this tutorial!

This has been a brief overview of what is possible using dev containers. To learn about other scenarios or learn more about containerized development, checkout the [Developing inside Containers](/docs/remote/containers.md) documentation.

Check out the other Remote Development extensions.

* [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)
* [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)

Or get them all by installing the
[Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) Extension Pack.
