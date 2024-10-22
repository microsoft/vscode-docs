---
Order: 55
TOCTitle: Docker in WSL 2
PageTitle: Using Docker in Windows for Linux Subsystem (WSL) 2
MetaDescription: Using Docker in Windows for Linux Subsystem (WSL) 2
Date: 2020-03-02
Author: Matt Hernandez
MetaSocialImage:
---
# Using Docker in WSL 2

March 2, 2020 by Matt Hernandez, [@fiveisprime](https://twitter.com/fiveisprime)

Last June, the Docker team [announced](https://engineering.docker.com/2019/06/docker-hearts-wsl-2/) that they will be investing in getting Docker running with the Windows Subsystem for Linux (WSL). All of this is made possible with the recent changes to the architecture of WSL to run within a lightweight virtual machine (VM), which we talked about in an earlier [blog post about WSL 2](https://code.visualstudio.com/blogs/2019/09/03/wsl2). Since this announcement, the Docker team has released a [Technical Preview](https://docs.docker.com/docker-for-windows/wsl-tech-preview/) of Docker that includes support for running with WSL 2.

This article explains how the Docker Desktop technical preview works as well as how to use the Docker extension with the technical preview.

## How it works

This new Docker architecture works a lot like Visual Studio Code's [WSL remote development](/docs/remote/wsl.md) support in that the Docker CLI running on the host machine executes commands within the Docker Integration Package, which runs on the remote WSL VM.

![Docker in WSL 2](docker-in-wsl2.png)

*Image credit: Docker Engineering*

DockerD runs directly within WSL so there's no need for the Hyper-V VM and all Linux containers run within the Linux userspace on Windows for improved performance and compatibility.

## Getting set up

First some prerequisites:

* Install Windows 10 Insider Preview build 18975 (Slow) or later for WSL 2.
* Install Ubuntu from the [Microsoft store](https://www.microsoft.com/p/ubuntu/9nblggh4msv6).
* Enable WSL 2 by following this [guide](https://learn.microsoft.com/windows/wsl/install).
* Install the [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) extension for VS Code.
* Install the [Docker WSL 2 Technical Preview](https://docs.docker.com/docker-for-windows/wsl-tech-preview/#download).

Once installed, Docker will recognize that you have WSL installed and prompt to enable WSL integration. You want to **Enable WSL integration** for this tutorial.

![Docker Desktop WSL integration dialog](docker-desktop-wsl-integration.png)

This option will allow you to access Docker Desktop via the Docker CLI directly from within your Linux distro.

If you have multiple Linux distros, make sure you only have WSL integration turned on for the correct one in your Docker settings:

![Docker settings dialog](docker-resources-wsl-integration.png)

With that configured, all commands will execute in the Linux context - this includes Docker commands run from PowerShell so running something like `docker run mongo…` will start a Linux container within the WSL VM.

![docker run mongo command](docker-run-mongo.png)

Running the `docker ps` command over in WSL, you'll see the container as expected. Notice that the container ID matches.

![docker ps command in WSL](docker-ps-in-wsl.png)

## Using VS Code

With this set up and running, you can install the VS Code [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) extension and access your containers. If you're already running WSL 2 and the [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) extension, this will help you get Docker integrated into your WSL workflow rather than switching contexts when you need containers. And because the Docker CLI's context is set to use DockerD in WSL, the extension will work with your containers regardless of whether you opened VS Code using the WSL extension.

Notice how in the screenshot below, I'm connected and working in WSL and still building/running containers without changing from my preferred environment (zsh in Ubuntu).

![VS Code working with containers in WSL](vscode-containers-in-wsl.png)

*Theme: Noctis Sereno*

I've personally noticed a vast improvement in container execution times using this configuration and each part of my typical development workflow remains the same. I'm also using the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension within WSL for testing specific environments without setting things up directly on my machine.

## We want your feedback

Keep in mind that you're using prerelease software and, while the Windows Insiders Slow ring is very stable, you may run into some issues. If you do find something that isn't working as expected, please open an issue via the Feedback tool in Windows. Any direct Docker issues or feedback can be logged in the [Docker for Windows](https://github.com/docker/for-win/issues) repo.

Happy Coding!

Matt Hernandez, VS Code Program Manager
[@fiveisprime](https://twitter.com/fiveisprime)
