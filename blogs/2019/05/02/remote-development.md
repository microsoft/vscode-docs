---
Order: 47
TOCTitle: Remote Development
PageTitle: Remote Development with Visual Studio Code
MetaDescription: Remote Development with Visual Studio Code for SSH, WSL, and Containers
Date: 2019-05-02
ShortDescription: Remote Development with Visual Studio Code
Author: Chris Dias
---
# Remote Development with VS Code

May 2, 2019 by The VS Code Team, [@code](https://twitter.com/code)

Today we're excited to announce three new extensions for Visual Studio Code that enable seamless remote development in [Containers](https://www.docker.com/resources/what-container), physical or virtual machines, and the [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl). You can get started right away by installing the [Remote Development Extension Pack](https://aka.ms/VSCodeRemoteExtensionPack).

**Note**: You'll need to use the [Insiders Build](https://code.visualstudio.com/insiders/) for now, but remote support will eventually be available in Stable.

Read on to learn how we got here.

## Remote development

As the popularity of Visual Studio Code has grown, we've had the opportunity to talk to a broad set of users with different development environments, many vastly different than our own. And what you were are telling us is that more and more development is happening not only on the local machine, but also on remote environments.

Thousands of engineers at large enterprises such as [Facebook](https://nuclide.io/docs/features/remote/) work remotely against secure and powerful "developer VMs" and cloud-based services that scale beyond what even the best laptop can handle.

We see Python developers who want to switch to VS Code but need to use development environments configured for a specific Python stack using [containers and virtual machines]( https://matttrent.com/remote-development/).

![Vagrant Box testimonial](vagrant-box-testimonial.png)

Data scientists often need massive storage and compute services to analyze large datasets that can't be stored or processed even on a robust desktop.

[WSL](https://docs.microsoft.com/en-us/windows/wsl/about) is a great way to use your Windows based tools to build applications that deploy to and run on Linux. In fact, [the third most commented issue in the VS Code repository](https://github.com/Microsoft/vscode/issues/13138) is to support running `code` from a Bash terminal running a in Linux distro on Windows. Doing development in WSL then is really just remote development from a Windows machine to a Linux environment, it just happens to be running on the same machine.

![VS Code Ubuntu on Windows testimonial](vscode-ubuntu-windows-testimonial.png)

## Challenges

In these conversations, we also keep hearing the same challenges developers face with remote development.

For example:

* Remote Desktop can work, but it is difficult or impossible to set up on some Linux distributions, and the development experience can be "laggy".
* SSH and Vim (or local tools with file synchronization) work, but they can be slow, error prone, and generally [lack the productivity of modern development tools](https://stackoverflow.blog/2017/05/23/stack-overflow-helping-one-million-developers-exit-vim/).
* It's hard, and sometimes impossible, to replicate different development environments locally (for example the right framework and tools environment, or a massive source base) to get rich tooling experiences like IntelliSense or linters. It becomes even more challenging when having to switch between different project contexts.
* Browser tools are interesting in a variety of scenarios, but developers don't want to give up the richness and feel that desktop tools provide (especially their key bindings).

## A different approach

On the VS Code team, we've been looking at the problem slightly differently. We think that a better solution is to run the developer tools locally, connecting to a set of development services running remotely in the context of a physical or virtual machine (for example a container or VM).

![Remote environment](remote-environment.png)

This gives you a rich local development experience in the context of what is on the remote machine.

VS Code and customization extensions (such as [Themes](https://marketplace.visualstudio.com/search?target=VSCode&category=Themes&sortBy=Downloads) or [Keymaps](https://marketplace.visualstudio.com/search?target=VSCode&category=Keymaps&sortBy=Downloads)) are installed and run as usual, locally on your development machine. You don't want the Vim extension to round-trip on every keystroke, you want a fast, local experience when editing code.

However, [Language Service extensions](https://marketplace.visualstudio.com/search?target=VSCode&category=Programming%20Languages&sortBy=Downloads), [Linters](https://marketplace.visualstudio.com/search?target=VSCode&category=Linters&sortBy=Downloads), and [Debuggers](https://marketplace.visualstudio.com/search?target=VSCode&category=Debuggers&sortBy=Downloads) (and more) are installed on the remote machine. Why? Because you want these extensions to run in the context of the source code, frameworks, and tools, so they can provide proper IntelliSense (completions), linting, and more. And, you can install only the extensions you need in each remote host, allowing you to fine tune each development environment.

## Introducing the Remote Extensions

Over the past few months, we've been working hard reestablishing proper boundaries between our code layers and eliminating assumptions about the local development environment. We've built three new extensions for working with remote workspaces running in WSL, Containers, or in physical and Virtual Machines over SSH.

![Remote extensions](remote-extensions.png)

The **Remote - WSL** extension lets you use the [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl) as a full development environment, right from VS Code. This new, optimized support lets you:

* Use Windows to develop in a Linux based environment, using platform specific toolchains and utilities.
* Edit files located in WSL or the mounted Windows filesystem (for example `/mnt/c`).
* Run and debug your Linux based applications on Windows.

Commands and extensions are run directly in the Linux distro, so you don't have to worry about pathing issues, binary compatibility, or other cross-OS challenges. You're able to use VS Code in WSL just as you would from Windows.

Check out this quick, 2-minute video to see how easy it is to develop in WSL.

<!-- TODO WSL video Kenneth -->

For more information, please see the [Developing in WSL documentation](https://aka.ms/vscode-remote/wsl).

---

The **Remote – SSH** extension lets you open folders or workspaces hosted on any remote machine, VM, or container with a running SSH server. Development over SSH lets you:

* Develop on larger, faster, or more specialized hardware than your local machine.
* Quickly swap between different, remote development environments and safely make updates without worrying about impacting your local machine.
* Debug an application running somewhere else, such as a customer site or in the cloud.

For example, let's assume you are working on a deep learning project. You typically need a GPU heavy virtual machine (such as an Azure [Data Science Virtual Machine](http://aka.ms/dsvm)), configured with all of the tools and frameworks you need to train your models with large scale data sets.

You could use Vim over SSH or Jupyter Notebooks to edit your remote code, but you give up the richness of your local development tools. Instead, with the Remote – SSH extension, you simply connect to the VM, install the necessary extensions like [Python](https://marketplace.visualstudio.com/itemdetails?itemName=ms-python.python), and then you can leverage all of the great features of VS Code such as IntelliSense (completions), linting, and debugging, as if you were working locally.

Check out this quick, 2-minute video to see how easy it is to develop on a virtual machine over SSH.

<!-- TODO SSH video Sana -->

For more information, please see the [Developing in SSH documentation](https://aka.ms/vscode-remote/ssh).

---

The **Remote - Containers** extension lets you use a [Docker container](https://docker.com) as your [development container](https://aka.ms/vscode-remote/containers/folder-setup). Containers make a great development environment because:

* You can develop with a consistent and easily reproducible tool chain, on the same operating system you are deploying to.
* Containers are isolated, meaning you can quickly swap between different development environments without impacting your local machine.
* It easy for others to contribute to your project as they can easily develop, build, and test in a consistent development environment.

A `devcontainer.json` file can be used to tell VS Code how to configure the development container, including the Dockerfile to use, ports to open, and extensions to install in the container. When VS Code finds a `devcontainer.json` in the workspace, it automatically builds (if necessary) the image, starts the container, and connects to it. Your files are mounted into the container so you can open files and start editing with full IntelliSense (completions), linting, debugging, and more.

Check out this quick, 2-minute video to see Development Containers in action.

<!-- TODO Containers video Bowden -->

For more information on development containers, please see the [documentation](https://aka.ms/vscode-remote/containers) as well as the [vscode-remote-try-* repositories](https://github.com/search?q=org%3AMicrosoft+vscode-remote-try-&unscoped_q=vscode-remote-try-) that contain samples you can use today.

## How it all started

The Talking Heads may have asked the question first, but [how did we get here](https://www.youtube.com/watch?v=5IsSpAOD6K8)? It started with WSL and it looked simple enough. Install VS Code and ([carefully at the time!](https://devblogs.microsoft.com/commandline/do-not-change-linux-files-using-windows-apps-and-tools/)) edit the Windows file system as normal. We did work to [enable remote debugging for Node.js](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_remote-debugging), and we figured we could simply install a small script to enable launching `code` from the bash shell.

But, it just wasn't right. It didn't make sense to do special work for every runtime, as we did for Node.js debugging. If you have Python 2.7 and Flask installed on Windows (or none at all!) and Python 3.7 and Django installed in the Linux distro, you wouldn't get proper completions or linting because VS Code was looking at the Windows versions of everything. Having to duplicate the development environment on both Windows and Linux defeated the purpose of having WSL at all.

## Architectural enablement

VS Code has always been a multi-process application. The UI you normally interact with (the editor, file explorer, dialogs, etc.) run in the Electron renderer process. Extensions and debuggers run in their own process, and they often spawn additional processes to do their work.

For example, the TypeScript extension runs in the extension host process and spawns the TypeScript server executable to compile and type check your code.

![VS Code worker processes](worker-processes.png)

This model, while sometimes more memory intensive, provides isolation and stability, allowing the operating system to manage resources, which it is generally good at.

It also provides portability. Processes (or services) don't need to run on the same machine or even on the same operating system. As long as we have access, we can run the processes pretty much anywhere we want:  WSL, a container, or on another machine. VS Code doesn't care where the extensions are running, it just cares about the communication between the processes.

![VS Code remote worker processes](remote-worker-processes.png)

Which, it turns out, is pretty fast, even with low powered machines, low bandwidth, or poor connections. Your development experience remains smooth as editing happens locally and doesn't block on computationally intensive work happening remotely.

## Managing extensions

VS Code will attempt to infer where to install an extension, locally or remotely, based on the functionality it exposes, falling into one of two groups:

* UI Extensions make contributions to the UI only, do not access files in a workspace, and consequently can run entirely on the local machine. Examples of UI extensions are themes, snippets, language grammars, and keymaps.

* Workspace Extensions access files inside a workspace either for editing or to perform some other operation such as providing IntelliSense. A Workspace Extension can provide rich, multi-file language services, add a debugger, or perform an operation on multiple files in workspace.

![Remote and local extensions](remote-local-extensions.png)

### Extension authors

If you are creating VS Code extensions, we've implemented new extension APIs that are remote aware. For example, instead of using the `open` package to load a browser window, an extension author should use the `vscode.env.openExternal` API, which will open the browser locally. Similarly, there is a new `clipboard` class which will place contents on the local clipboard, as expected.

Many more details can be found in the updated [API Documentation](https://aka.ms/vscode-remote/developing-extensions), including how to run, test, and debug your extension in a remote environment. Most  extensions have already been updated and work properly, but you may encounter some that do not yet work in a remote environment. If so, please do submit an issue on the extension.

## Get started

Thanks for reading this far!

Here are 3 quick steps to get started doing Visual Studio Code Remote Development:

1. Install the [Insiders Build](https://code.visualstudio.com/insiders/). You'll need this for remote development until it is available in Stable. Insiders ships daily with the latest features and bug fixes. If you are concerned about stability, don't be! We use the Insiders builds to develop VS Code and it can be installed side by side with Stable in case something does break ([let us know](https://github.com/Microsoft/vscode/issues/new)!).

2. Get the [Remote Extension Pack](https://aka.ms/VSCodeRemoteExtensionPack) which installs support for WSL, SSH, and Containers and is the easiest way to get started. If you don't need them all, you can uninstall the individual extensions.

3. Read the [Docs](https://aka.ms/vscode-remote).  Try some [Dev Container samples](https://github.com/search?q=org%3AMicrosoft+vscode-remote-try-&unscoped_q=vscode-remote-try-). If you develop with Python (a lot of you do!), check out Dan Taylor's [blog post on remote Python development](http://devblogs.microsoft.com/python/remote-python-development-in-vs-code-with-docker-and-ssh?utm_campaign_id=vscblog).

Let us know what you think!

Happy Coding,

The [@code](https://twitter.com/code) team