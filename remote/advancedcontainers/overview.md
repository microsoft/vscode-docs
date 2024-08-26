---
Order: 1
Area: advancedcontainers
TOCTitle: Overview
PageTitle: Working with containers in Visual Studio Code
ContentId: fbc9ef0d-7448-4289-aedb-278af37f15c2
MetaDescription: Working inside a development container with Visual Studio Code
DateApproved: 08/01/2024
---
# Advanced container configuration

The articles in this section cover advanced container configuration when working with the Visual Studio Code [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension.

## Working with containers

The **Visual Studio Code Dev Containers** extension lets you use a [Docker container](https://docker.com) as a full-featured development environment. It allows you to open any folder inside (or mounted into) a container and take advantage of Visual Studio Code's full feature set. A [devcontainer.json file](/docs/devcontainers/containers.md#create-a-devcontainerjson-file) in your project tells VS Code how to access (or create) a **development container** with a well-defined tool and runtime stack. This container can be used to run an application or to separate tools, libraries, or runtimes needed for working with a codebase.

Workspace files are mounted from the local file system or copied or cloned into the container. Extensions are installed and run inside the container, where they have full access to the tools, platform, and file system. This means that you can seamlessly switch your entire development environment just by connecting to a different container.

This lets VS Code provide a **local-quality development experience** — including full IntelliSense (completions), code navigation, and debugging — **regardless of where your tools (or code) are located**.

## Getting Started

If you are new to Docker containers and using the VS Code [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension, we recommend starting with the introductory [Containers](/docs/devcontainers/containers.md) article. There you will find:

* [System requirements](/docs/devcontainers/containers.md#system-requirements) - What's needed to run on Windows, macOS, and Linux.
* [Installation](/docs/devcontainers/containers.md#installation) - How to install Docker, VS Code, and the Remote Development Extension Pack.
* [Quick starts](/docs/devcontainers/containers.md#quick-start-try-a-development-container) - Step-by-step instructions for common container scenarios.

Once you have your machine configured, try the [Containers tutorial](/docs/devcontainers/tutorial.md) for an in-depth tour of working with containers.

## Advanced Containers topics

The articles listed in the table of contents below, describe advanced container usage and cover specific configurations in detail. You may not need to apply these for your development workflow but it is good to quickly review the articles, in case you might need them in the future.

You can learn how to:

* [Set environment variables](/remote/advancedcontainers/environment-variables.md)
* [Mount local disk drives](/remote/advancedcontainers/add-local-file-mount.md)
* [Add a non-root user](/remote/advancedcontainers/add-nonroot-user.md)
* [Work with multiple containers](/remote/advancedcontainers/connect-multiple-containers.md)
* And more...

## Feedback and questions

You can also provide [feedback](/remote/advancedcontainers/questions-feedback.md#feedback) on the Remote Development experience or reach out with [questions](/remote/advancedcontainers/questions-feedback.md#resources).
