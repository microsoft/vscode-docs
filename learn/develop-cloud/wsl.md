---
Order: 4
Area: developcloud
TOCTitle: Use the Windows Subsystem for Linux
ContentId: d0cc3d7c-16d3-4595-908d-bc5ee435acf7
PageTitle: Developing in the Windows Subsystem for Linux with Visual Studio Code
DateApproved: 10/22/2020
MetaDescription: Learn to use development in the Windows Subsystem for Linux (WSL) with Visual Studio Code
---
# Use the Windows Subsystem for Linux (WSL)

## What is WSL?

The [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/about) (WSL) lets you run a Linux environment, including command-line tools and applications, directly on Windows, without the overhead of a traditional virtual machine or dual boot setup.

WSL especially helps web developers and those working with Bash and Linux-first tools (for example, Ruby and Python) to use their tools on Windows and ensure consistency between development and production environments.

## Get started with WSL in VS Code

To get started with using WSL in VS Code, you'll need to download the [WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) from the Extension Marketplace.

![WSL extension](images/wsl/wsl-extension.png)

You'll also need WSL and a Linux distribution installed. We recommend using WSL 2, which is the newest version of WSL, as you will benefit from significant [performance advantages](https://learn.microsoft.com/windows/wsl/compare-versions) over WSL 1.

Check out the WSL extension in action:

<img src="https://github.com/microsoft/vscode-remote-release/blob/main/docs/images/remote-wsl-open-code.gif?raw=true" alt="Using the WSL extension with an Ubuntu distro on WSL" aria-hidden="true" class="thumb"/>

The typical flow is you'll open a Linux command prompt, navigate to a folder of your choosing, and type `code .` to launch a new instance of VS Code connected to WSL. From there, you get the full experience of using VS Code as if you were developing on Linux, except you're on a Windows machine!

<iframe src="https://youtube.com/embed/mIHprjsSO9o?rel=0&amp;disablekb=0&amp;modestbranding=1&amp;showinfo=0" frameborder="0" allowfullscreen title="Visual Studio Code WSL"></iframe>

## Next steps

We highly recommend checking out the step-by-step [WSL tutorial](/docs/remote/wsl-tutorial.md) to learn more.
