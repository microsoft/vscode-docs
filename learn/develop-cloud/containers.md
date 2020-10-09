---
Order: 2
Area: developcloud
TOCTitle: Develop in Containers
ContentId: bd6b0ab2-a115-4ac6-b3aa-674bbf2f687c
PageTitle: Develop in containers with Visual Studio Code
DateApproved: 10/8/2020
MetaDescription: Learn to use development containers with Visual Studio Code
---
# Develop with containers

## What are development containers?

Containers are pieces of software that package code and all of the dependencies that code needs to run, including the runtime, tools, libraries, and settings. Dev containers specifically let you code within this piece of software, providing a separate coding environment from your computer.

A Python dev container would include your Python app along with all the Python runtimes and dependencies already set up for you, no extra downloads necessary:

<img src="images/python-container.png" alt="Python Container Diagram" aria-hidden="true" class="thumb"/>

In your class, you could have a specific container for an assignment. Each student in your class will get the same exact same version of dependencies, such as the same version of Python or a C++ compiler, regardless of their operating system or any other files already installed on their computer.

In the diagram below, you'll see an example of 3 dev containers: one for Python, one for Java, and one for C++. Each of these dev containers would include the app and the dependencies that app needs to run. The dependencies are separate from the rest of your computer (which are represented by the Infrastructure and Host Operating System).

<img src="images/container-architecture.png" alt="Container Architecture Diagram" aria-hidden="true" class="thumb"/>

## Get started with dev containers in VS Code

To get started with using dev containers in VS Code, you'll need to download the [Remote - Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) from the Extension Marketplace.

You'll also need to download [Docker](https://docs.docker.com/docker-for-windows/install-windows-home/), which is the industry standard for building and sharing containers.

To learn how to get started with the Remote - Containers extension, check out this 5-minute introductory video:

<iframe src="https://youtube.com/embed/Uvf2FVS1F8k?rel=0&amp;disablekb=0&amp;modestbranding=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

You can also read more in our [development containers in education blog post](https://code.visualstudio.com/blogs/2020/07/27/containers-edu).

We also highly recommend checking out the step-by-step containers tutorial.

### [Remote - Containers Getting Started Tutorial](https://code.visualstudio.com/docs/remote/containers-tutorial)