---
Order: 59
TOCTitle: Dev Containers in WSL 2
PageTitle: Using Dev Containers in WSL 2
MetaDescription: Using Dev Containers in WSL 2
Date: 2020-07-01
Author: Brigit Murtaugh
---
# Using Dev Containers in WSL 2

July 1, 2020 by Brigit Murtaugh, [@BrigitMurtaugh](https://twitter.com/BrigitMurtaugh)

Leveraging the power of Docker containers and the Windows Subsystem for Linux 2 (WSL 2), you can preserve your Windows environment by developing your applications in the sandboxed familiarity of a container in a deeply integrated Linux kernel.

May brought us a couple of exciting announcements in the world of virtualization: the Windows 10 May 2020 update added WSL 2 as a feature out-of-the-box, and [Docker Desktop Stable 2.3.0.2](https://docs.docker.com/docker-for-windows/release-notes/#docker-desktop-community-2302) went GA with WSL 2 backend support.

In [earlier blog posts](https://code.visualstudio.com/blogs/2020/03/02/docker-in-wsl2), we've explored how to use Docker in WSL 2. The first requirement was to install Windows Insiders, as WSL 2 support was not yet part of stable Windows releases, and the next was to install a Tech Preview of Docker WSL 2. Now, both Windows WSL 2 and Docker support are in stable GA releases!

In this post, we'll take a look at how both of these tools work, and how you can leverage them in Visual Studio Code to productively use dev containers in WSL 2.

## New era of virtualization

Both WSL 2 and the latest version of Docker Desktop change how virtualization works.

### WSL 2

As discussed in a [prior post](https://code.visualstudio.com/blogs/2019/09/03/wsl2), WSL 2 takes a new approach on the [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/wsl2-about) by using a real Linux kernel inside a lightweight virtual machine (VM). It has been optimized to feel seamless and deeply integrated into your Windows environment so that you have fast boot times, a small resource footprint, and no VM configuration or management requirements whatsoever.

System calls allow you to perform functions such as accessing files, requesting memory, and creating processes. Since WSL 2 includes a complete Linux kernel, it has full system call capacity, meaning your favorite apps such as Docker will work fully and reliably.

### Docker

In WSL 1, due to fundamental differences between Windows and Linux, the Docker Engine couldn't run directly inside WSL, and [the Docker team](https://www.docker.com/blog/docker-hearts-wsl-2/) developed an alternative solution using Hyper-V VMs and LinuxKit. However, since WSL 2 now has full system call capacity, Docker can fully run in WSL 2, which prompted more investment from the Docker team.

The new May 2020 version of Docker Desktop can build containers much faster and consume fewer resources as it leverages WSL 2's dynamic memory allocation. It can take less than 10 seconds to cold start, as opposed to almost a minute in the previous version. Additionally, Hyper-V isn't a requirement anymore, so the steps detailed in this post work on Windows 10 Home.

Since WSL 2 in Windows and Docker Desktop is now GA, you can feel even more confident using your dev containers in WSL 2.

## Getting started

Prerequisites:

* Install Windows 10, version 2004.
    * To find out which version of Windows your device is running, press the **Windows logo** key + **R**, type **winver** in the **Open** box, and then select **OK**.
* Install [Visual Studio Code](https://code.visualstudio.com/download).
* Enable WSL 2 by following the [WSL 2 installation guide](https://learn.microsoft.com/windows/wsl/install).
* Install Ubuntu (or your preferred Linux distribution) from the [Microsoft store](https://www.microsoft.com/p/ubuntu/9nblggh4msv6).
* Install [Docker Desktop Stable 2.3.0.2](https://docs.docker.com/docker-for-windows/wsl-tech-preview/#download).

Once installed, Docker will recognize that you have WSL installed and prompt you to enable WSL integration. Select **Enable WSL integration** from the pop-up window.

![Docker Desktop WSL integration dialog](1-docker-desktop-wsl-integration.png)

Optional: Install the new [Windows Terminal](https://learn.microsoft.com/windows/terminal/) for the best experience, including the ability to open new PowerShell and Ubuntu terminals in the same interface.

## Open VS Code in WSL 2

Let's connect VS Code to our WSL 2 engine. Open an Ubuntu terminal, navigate to the source code folder of your choice, and type `code .`. This will launch an instance of VS Code that lets you use WSL as your full-time development environment. You can also connect to WSL from the Command Palette. I'm going to open a simple [HelloNode](https://github.com/bamurtaugh/HelloNode) application:

![Launch code . from Ubuntu terminal](2-ubuntu-launch.png)

Once VS Code opens, it recognizes that we have WSL installed, and recommends we install the [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) extension. I'll select **Install**:

![WSL extension recommended](3-wsl-extension-recommended.png)

After installing the extension, we can reload VS Code to connect to WSL 2:

![Reload VS Code after installing extension](4-reload-vscode.png)

Once we've reloaded, we can confirm that we're connected to Ubuntu by checking the WSL indicator in the bottom-left corner of the window:

![WSL: Ubuntu bottom left indicator](5-wsl-left-indicator.png)

Installing the WSL extension added the Remote Explorer to VS Code. When we look inside the Explorer, we can see information about our Linux distros:

![Remote Explorer with WSL Targets](6-remote-explorer-wsl-targets.png)

## Working with containers

We can leverage the [Dev Containers](/docs/devcontainers/containers.md) extension to view and attach to containers, in addition to a variety of other scenarios, such as:

* [Developing within a set of sample containers](/docs/devcontainers/tutorial.md)
* [Opening existing source code in a container](/docs/devcontainers/containers.md#quick-start-open-an-existing-folder-in-a-container)
* [Working with a GitHub repository](/docs/devcontainers/containers.md#quick-start-open-a-git-repository-or-github-pr-in-an-isolated-container-volume) in an isolated container volume.

These configurations allow you to easily recreate the same development environment across machines, install tools and extensions specific to a project into a DevContainer, and develop in a setup similar to the environment for deployment, leaving the local machine unchanged. We can also view and attach to containers using the [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) extension.

While you can access source code from both Windows and the WSL 2 filesystem when using the WSL 2 engine, we recommend using the WSL 2 file system because [performance is much better](https://www.docker.com/blog/docker-desktop-wsl-2-best-practices/). Since the performance is better when using the filesystem inside WSL 2, let's walk through how to use it.

We need to select the folder we want to open in a container. First, make sure you've installed the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension. We can then call the **Dev Containers: Reopen in Container** command from a folder already opened using the WSL extension.

I have an existing HelloNode folder on my WSL 2 filesystem with my Node project in it. I'll select: **Dev Containers: Reopen in Container**:

![Command Palette: Dev Containers: Reopen in Container](7-reopen-container.png)

A list of container definitions will appear, since there is no DevContainer configuration in the repository yet. The list of container configuration definitions that appears is filtered based on my project type. I'll select **Node.js 14**:

![Command Palette: Node.js 14](8-node-14.png)

A new instance of VS Code opens. VS Code starts building the image, and then starts our container:

![VS Code instance starting with Dev Container](9-vscode-starting-with-container.png)

Our application now has a .devcontainer folder in which the container configuration information is stored. To double-check we're connected to both WSL and within a container, let's open the integrated terminal and check for the `uname` and version of Node:

![Check uname and node -v](10-uname-node.png)

As we can see, our `uname` came back as Linux, so we are still connected to the WSL 2 engine, and `node -v` returned v14.4.0, so we have successfully configured our Node 14 container.

Let's try running our app with **F5**:

![Local host running Hello World app](11-localhost-hello-world.png)

Success!

## Feedback & further reading

To help set up VS Code with WSL and containers, we have detailed articles on the VS Code [Remote Development documentation](https://code.visualstudio.com/docs/remote/remote-overview). If you have any questions or feedback for our team, please feel free to open an issue on the VS Code [Remote Development GitHub Repository](https://github.com/microsoft/vscode-remote-release/issues) or Tweet us [@code](https://twitter.com/code).

Happy Coding!

Brigit Murtaugh, VS Code Program Manager
[@BrigitMurtaugh](https://twitter.com/BrigitMurtaugh)
