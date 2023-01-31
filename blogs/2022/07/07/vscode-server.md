---
Order: 74
TOCTitle: The VS Code Server
PageTitle: The VS Code Server
MetaDescription: Securely connect to and develop on any remote machine with the VS Code Server private preview.
Date: 2022-07-07
Author: Brigit Murtaugh
---

# The Visual Studio Code Server

July 7, 2022 by Brigit Murtaugh, [@BrigitMurtaugh](https://twitter.com/BrigitMurtaugh)

## A remote present and future

In 2019, we released the [Remote Development](https://code.visualstudio.com/docs/remote/remote-overview) extensions, which let you use VS Code locally to develop applications "remotely" on the Windows Subsystem for Linux (WSL), in Docker containers, and on remote physical or virtual machines you manage over SSH. In 2020, we took another step forward with remote development with [GitHub Codespaces](https://code.visualstudio.com/docs/remote/codespaces), which let you use VS Code locally or in a browser to develop applications on a remote virtual machine that is hosted and managed in the cloud for you.

We can do this because VS Code is, by design, a multi-process application. Conceptually, the front end (where you type your code) runs in one process and a backend service (which hosts extensions, the terminal, debugging, etc.) runs in a separate process.

Today we are releasing a private preview of the backend service that makes this all possible, the "VS Code Server," along with a CLI that makes it easy to install, update, manage, and connect to the service. You can install the server wherever you like (a local development machine, a VM in the cloud, etc.) and access it securely through the browser using VS Code for the Web (also known as [vscode.dev](http://vscode.dev/)), without the hassle of setting up SSH or https (although you can do that if you want as well 😊).

![Terminal starting the VS Code Server, and vscode.dev connected to it](help-and-start.png)

## Getting started

As the service that you use to securely connect to the VS Code Server is in private preview, you'll need to request access through a [signup form](https://aka.ms/vscode-server-signup). You'll receive an email, hopefully only within a few weeks, once you can start using the service.

At that point, here are step-by-step instructions to quickly get up and running:

1. Install the VS Code Server on your remote machine (or wherever you want to develop against).

    **Note:** There are different install commands for different remote architectures, which you can review in the [server documentation](https://aka.ms/vscode-server-arch). This post will set up the VS Code Server in a [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/) (WSL) instance, which provides a true, isolated Linux environment on Windows and can serve as our "remote", isolated machine.

    Run the following command in a WSL terminal:

    ``` bash
    wget -O- https://aka.ms/install-vscode-server/setup.sh | sh
    ```

2. Start the VS Code Server by running the following command in your WSL terminal:

    ```bash
    code-server
    ```

    > **Tip:** Run `code-server -h` to see all the available commands to launch and manage the server.

3. Your WSL distro will communicate with vscode.dev through a secure tunnel, which allows you to connect to your computer from vscode.dev, no matter what network you're on.

    You'll be provided a device code and URL to authenticate your GitHub account into the VS Code Server's secure tunneling service.

    ```bash
    Please enter the code 7644-1186 on https://github.com/login/device
    ```

    Authenticate into the tunneling service by entering the device code at the provided auth URL.

4. If this is your first time launching the VS Code Server from this WSL instance, you'll be prompted to enter a name for your connection. The CLI will suggest a fun default "adjective-noun" name (examples shown below), which you can choose to accept too.

    ```bash
    ? What would you like to call this machine? (elegant-pitta) >
    ```

5. After authenticating and providing a machine name, the CLI spins up a server instance and generates a vscode.dev URL. To connect to your WSL instance, you can open this URL on any device.

    > **Note:** You can also connect to your WSL instance directly from vscode.dev: Open the Command Palette (`F1`) in vscode.dev and run the command **Remote Tunnels: Connect to Remote**.

Congratulations, you've successfully installed and run the VS Code Server! The connection is fully established once you visit the generated vscode.dev link. Your WSL distro's files should be present in the VS Code Explorer, and you can start coding against it from vscode.dev.

## A preview of a larger journey

The VS Code Server is currently a private preview. In this early preview, the `code-server` CLI is distinct from the `code` CLI [you use today](https://code.visualstudio.com/docs/editor/command-line#_launching-from-command-line) to launch the desktop VS Code, to install extensions, and more (run `code -h` from the terminal 😊). This is just the first step along the path towards a fully unified `code` CLI that lets you manage both the desktop and the server.

We're excited for you to try out the VS Code Server. You can learn more about it, including the architecture, other commands, implementation details, and scenarios, in its [documentation](https://aka.ms/vscode-server-doc) and [intro video](https://aka.ms/vscode-server-video). If you have any issues or feedback, please file an issue in the [VS Code Remote Development GitHub repo](https://github.com/microsoft/vscode-remote-release/issues), and you can Tweet us your thoughts [@code](https://twitter.com/code).

Happy Coding!

Brigit Murtaugh, [@BrigitMurtaugh](https://twitter.com/BrigitMurtaugh)
