---
Order: 1
Area: containers
TOCTitle: Getting started
PageTitle: Getting started with Dev Containers
MetaDescription: Getting started with Dev Containers
DateApproved: 7/9/2020
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

> NOTE! - You'll have to signup for Docker Hub, verify your email address, and get a DockerID in order to get the installer.

### Start Docker

Run the Docker Desktop application to start Docker.
You will know it's running if you look in the activity tray and see the Docker whale icon.

Docker might take a few minutes to start.
If the whale icon is animated, it is probably still in the process of starting.
You can click on the icon to see the status.

![Docker status](images/containers/docker-status.png)

## Check

Once Docker is running, you can confirm that everything is working by opening a **new** terminal window and typing the comand:

```bash
docker --version
# Docker version 18.09.2, build 6247962
```

----

<a class="tutorial-next-btn" href="/remote-tutorials/containers/install-extension">Docker is running!</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-containers', 'getting-started')" href="javascript:void(0)">I ran into an issue</a>
