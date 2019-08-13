---
Order: 1
Area: containers
TOCTitle: Getting started
PageTitle: Getting started with Dev Containers
MetaDescription: Getting started with Dev Containers
DateApproved: 7/26/2019
---
# Remote development in Containers

This tutorial walks you through running Visual Studio Code in a Docker container using the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension. You need no prior knowledge of Docker to complete this tutorial.

Running VS Code **inside** a Docker container can be useful for many reasons, but in this walkthrough we'll focus on using a Docker container to set up a development environment that is isolated from your local environment.

## Prerequisites

You need [Visual Studio Code](https://code.visualstudio.com/) installed.

You need [Docker](https://www.docker.com/get-started#nav-developer) installed and **running**.

## Install the extension

The Remote - Containers extension lets you run VS Code inside a Docker container.

> <a class="tutorial-install-extension-btn" href="vscode:extension/ms-vscode-remote.remote-containers">Install the Remote - Containers extension</a>

## Check

With the Remote - Containers extension installed, you will see a new Status bar item at the far left.

![Remote Status bar item](images/containers/remote-status-bar.png)

The Remote Status bar item can quickly show you in which context VS Code is running (local or remote) and clicking on the item will bring up the Remote - Containers commands.

![Remote - Containers commands](images/containers/remote-containers-commands.png)

----

<a class="tutorial-next-btn" href="/remote-tutorials/containers/get-the-sample">I've installed the extension</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-containers', 'getting-started')" href="javascript:void(0)">I ran into an issue</a>
