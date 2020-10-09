---
Order: 4
Area: developcloud
TOCTitle: Use the Windows Subsystem for Linux
ContentId: d0cc3d7c-16d3-4595-908d-bc5ee435acf7
PageTitle: Developing in the Windows Subsystem for Linux with Visual Studio Code
DateApproved: 10/8/2020
MetaDescription: Learn to use development in the Windows Subsystem for Linux (WSL) with Visual Studio Code
---
# Use the Windows Subsystem for Linux (WSL)

## What is WSL?
WSL lets you run a Linux environment -- including command-line tools and applications -- directly on Windows, without the overhead of a traditional virtual machine or dualboot setup. WSL especially helps web developers and those working with Bash and Linux-first tools (i.e. Ruby, Python) to use their toolchain on Windows and ensure consistency between development and production environments.

When you install a version of Linux on Windows, you’re getting a full Linux environment. It's isolated from Windows- the UI is the terminal, and you can install tools, languages, and compilers into the Linux environment without modifying or disrupting your Windows installation.

We recommend using WSL 2 as you will benefit from significant [performance advantages](https://docs.microsoft.com/en-us/windows/wsl/compare-versions) over WSL 1.

## Get started with WSL in VS Code

To get started with using WSL in VS Code, you'll need to download the [Remote - WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) from the Extension Marketplace.

We also highly recommend checking out the step-by-step WSL tutorial.

### [Remote - WSL Getting Started Tutorial](https://code.visualstudio.com/docs/remote/wsl-tutorial)