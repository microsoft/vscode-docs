---
Order: 1
Area: containers
TOCTitle: Overview
ContentId: 4B462667-8915-4BE0-B8D0-EDE51CB2D273
PageTitle: Docker extension for Visual Studio Code
DateApproved: 12/1/2023
MetaDescription: Tools for developing and debugging with Docker containers, using Visual Studio Code.
---
# Docker in Visual Studio Code

The [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) extension makes it easy to build, manage, and deploy containerized applications in Visual Studio Code.

This page provides an overview of the Docker extension capabilities; use the side menu to learn more about topics of interest. If you are just getting started with Docker development, try the [Docker tutorial](https://learn.microsoft.com/visualstudio/docker/tutorials/docker-tutorial) first to understand key Docker concepts.

## Installation

[Install Docker](https://docs.docker.com/install/) on your machine and add it to the system path.

On Linux, you should also [enable Docker CLI for the non-root user account](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user) that will be used to run VS Code.

To install the extension, open the Extensions view (`kb(workbench.view.extensions)`), search for `docker` to filter results and select Docker extension authored by Microsoft.

![Select Docker extension](images/overview/installation-extension-search.png)

## Editing Docker files

You can get [IntelliSense](/docs/editor/intellisense.md) by clicking `kb(editor.action.triggerSuggest)` when editing your `Dockerfile` and `docker-compose.yml` files, with completions and syntax help for common commands.

![IntelliSense for Dockerfiles](images/overview/dockerfile-intellisense.png)

In addition, you can use the Problems panel (`kb(workbench.actions.view.problems)`) to view common errors for `Dockerfile` and `docker-compose.yml` files.

## Generating Docker files

You can add Docker files to your workspace by opening the Command Palette (`kb(workbench.action.showCommands)`) and using **Docker: Add Docker Files to Workspace** command. The command will generate `Dockerfile` and `.dockerignore` files and add them to your workspace. The command will also ask you if you want to add Docker Compose files as well, but this is optional.

The extension can scaffold Docker files for most popular development languages (C#, Node.js, Python, Ruby, Go, and Java) and customizes the generated Docker files accordingly. When these files are created, we also create the necessary artifacts to provide debugging support for Node.js, Python, and .NET (C#).

## Docker Explorer

The Docker extension contributes a Docker Explorer view to VS Code. The Docker Explorer lets you examine and manage Docker assets: containers, images, volumes, networks, and container registries. If you are signed in to your Microsoft account and it has access to Azure subscriptions, you can browse your Azure Container Registries as well.

The right-click menu provides access to commonly used commands for each type of asset.

![Docker Explorer context menu](images/overview/docker-view-context-menu.gif)

You can rearrange the Docker Explorer panes by dragging them up or down with a mouse and use the context menu to hide or show them.

![Customize Docker Explorer](images/overview/docker-view-rearrange.gif)

## Docker commands

Many of the most common Docker commands are built right into the Command Palette:

![Docker commands](images/overview/command-palette.png)

You can run Docker commands to manage [images](https://docs.docker.com/engine/reference/commandline/image/), [networks](https://docs.docker.com/engine/reference/commandline/network/), [volumes](https://docs.docker.com/engine/reference/commandline/volume/), [image registries](https://docs.docker.com/engine/reference/commandline/push/), and [Docker Compose](https://docs.docker.com/compose/reference/overview/). In addition, the **Docker: Prune System** command will remove stopped containers, dangling images, and unused networks and volumes.

## Docker Compose

[Docker Compose](https://docs.docker.com/compose/) lets you define and run multi-container applications with Docker. Our [Compose Language Service](https://github.com/microsoft/compose-language-service) in the Docker extension gives you IntelliSense and tab completions when authoring `docker-compose.yml` files. Press `kb(editor.action.triggerSuggest)` to see a list of valid Compose directives.

 ![Docker Compose IntelliSense](images/overview/tab-completions.gif)

We also provide tooltips when you hover over a Docker Compose YAML attribute.

 ![Docker Compose Tooltips](images/overview/hover-support.png)

While `Compose Up` allows you to run all of your services at once, our new feature `Compose Up - Select Services` lets you select any combination of the services you want to run.

  ![Docker Compose Up - Select Subset](images/overview/select-subset.gif)

Once your `Compose Up` command completes, navigate to the Docker Explorer to view your services as a Compose Group. This allows you to start, stop, and view the logs of each service as a group.

![Docker Compose Groups](images/overview/compose-group.png)

## Using image registries

You can display the content and push, pull, or delete images from [Azure Container Registry](https://learn.microsoft.com/azure/container-registry), [Docker Hub](https://hub.docker.com/), [GitHub](https://github.com/), and more:

![Azure Container Registry content](images/overview/container-registry.png)

An image in an Azure Container Registry can be deployed to Azure App Service or Azure Container Apps directly from VS Code. See [Deploy to Azure](/docs/containers/app-service.md) to get started. For more information about how to authenticate to and work with registries, see [Using container registries](/docs/containers/quickstart-container-registries.md).

## Debugging services running inside a container

You can debug services built using .NET (C#) and Node.js that are running inside a container. The extension offers custom tasks that help with launching a service under the debugger and with attaching the debugger to a running service instance. For more information, see [Debug containerized apps](/docs/containers/debug-common.md) and [Customize the Docker extension](/docs/containers/reference.md).

## Azure CLI integration

You can start Azure CLI (command-line interface) in a standalone, Linux-based container with **Docker Images: Run Azure CLI** command. This gives you access to the full Azure CLI command set in an isolated environment. For more information on available commands, see [Get started with Azure CLI](https://learn.microsoft.com/cli/azure/get-started-with-azure-cli).

## Next steps

Read on to learn more about

- [Choosing your development environment](/docs/containers/choosing-dev-environment.md)
- [Build and run a Node.js app in a container](/docs/containers/quickstart-node.md)
- [Build and run a .NET app in a container](/docs/containers/quickstart-aspnet-core.md)
- [Debug apps within Docker containers](/docs/containers/debug-common.md)
- [Docker application development](https://docs.docker.com/develop)
- [Troubleshooting](/docs/containers/troubleshooting.md)
