---
Order: 3
Area: remote
TOCTitle: Containers
PageTitle: Developing inside a Container using Visual Studio Code Remote Development
ContentId: 7ec8a02b-2eb7-45c1-bb16-ddeaac694ff6
MetaDescription: Developing inside a Container using Visual Studio Code Remote Development
DateApproved: 4/11/2019
---
# Developing inside a Container

The **Visual Studio Code Remote - Containers** extension lets you use a [Docker container](https://docker.com) as a full-featured development environment. It allows you to open any folder inside (or mounted into) a container and take advantage of VS Code's full feature set. A [`devcontainer.json` file](#devcontainerjson) in your project tells VS Code how to access (or create) a **development container** with a well defined tool and runtime stack. This container may be used to actually run an application or be focused exclusively on sandboxing tools, libraries, runtimes, or other utilities that need to be run against a codebase.

Workspace files are mounted from the local file system or copied or cloned into the container. Extensions are installed and run inside the container where they have full access to the tools, platform, and file system. This means that you can seamlessly switch your entire development environment by just connecting to a different container.

![Container Architecture](images/containers/architecture-containers.png)

This lets VS Code provide a **local-quality development experience** — including full IntelliSense (completions), code navigation, and debugging — **regardless of where your code is hosted**.

## Getting started

### Installation

To get started, follow these steps:

1. Install and configure [Docker](https://www.docker.com/get-started) for your operating system.

    **Windows / macOS**:

    1. Install [Docker Desktop for Windows/Mac](https://www.docker.com/products/docker-desktop).

    2. Right-click on the Docker taskbar item and update **Settings / Preferences > Shared Drives / File Sharing** with any source code locations you want to open in a container. If you run into trouble, see [here](/docs/remote/troubleshooting.md#docker-desktop-for-windows-tips) for tips on avoiding common problems with sharing.

    3. **Windows**: Disable automatic line ending conversion for Git by using a Windows command prompt to run: `git config --global core.autocrlf false` (If left enabled, this setting can cause files that you have not edited to appear modified due to line ending differences.)

    **Linux**:

    1. Follow the [install instructions for your Linux distribution](https://docs.docker.com/install/#supported-platforms). **Note**: The Ubuntu Snap package is not supported.

    2. Add your user to the `docker` group by using a terminal to run: `sudo usermod -aG docker $USER`

    3. Sign out and back in again so your changes take effect.

2. Install [Visual Studio Code Insiders](https://code.visualstudio.com/insiders/).

    > **Dogfooding Note (UPDATED)**: Code - WSL is deprecated. Use VS Code Insiders now.

3. Install the [Remote Development](https://aka.ms/vscode-remote/download/extension) extension pack

    > **Dogfooding Note (UPDATED):** Set up the dogfooding version of the Remote Development extensions as follows:
    > 1. Sign into a Microsoft GitHub org associated GitHub account from a browser.
    > 2. Download and manually install the latest VSIX of the [Selfhost Remote Extensions Updater](https://aka.ms/vscode-remote/download/extension) in VS Code Insiders.
    > 3. The first time the Selfhost Remote Extensions starts, you may be prompted to paste in a GitHub access token so that it can download and auto-update private versions of the extensions. You only need to give "Repo" scope to this token.
    > 4. Reload / restart VS Code Insiders.

The Remote - Containers extension supports two primary operating models:

* You can use a container as your [full-time development environment](#creating-a-devcontainerjson-file-for-existing-projects).
* You can [attach to a running container](#attaching-to-running-containers) for targeted use.

We will cover how to use a container as your full-time development environment first.

### Quick start: Try a dev container

Let's start out by using a sample project to try things out.

1. Clone one of the sample repositories below.

    ```bash
    git clone https://github.com/Microsoft/vscode-remote-try-node
    git clone https://github.com/Microsoft/vscode-remote-try-python
    git clone https://github.com/Microsoft/vscode-remote-try-go
    git clone https://github.com/Microsoft/vscode-remote-try-java
    git clone https://github.com/Microsoft/vscode-remote-try-dotnetcore
    ```

2. Start VS Code and click on the quick actions Status Bar item in the lower left corner of the window.

    ![Quick actions status bar item](images/common/remote-dev-status-bar.png)

3. Select **Remote-Containers: Open Folder in Container...** from the command list that appears, and open the root folder of the project you just cloned.

4. The window will then reload, but since the container does not exist yet, VS Code will create one. This may take some time, and a progress notification will provide status updates. Fortunately, this step will be skipped entirely the next time you open this same folder since the container will already exist.

    ![Dev Container Progress Notification](images/containers/dev-container-progress.png)

5. After the container is built, VS Code automatically connects to it and maps the project folder from your local file system into the container. Check out the `README.md` for the repository you cloned to see what to do next.

### Quick start: Open a folder in a container

Next, we will cover how to set up an existing project folder to use a container as your full-time development environment. The steps are very similar to those above.

1. Start VS Code, run the **Remote-Containers: Open Folder in Container...** command from the Command Palette and select the folder you'd like to open in a container.

2. Next, pick a starting point for your dev container. You can select a **dev container definition** from a filterable list or an existing [Dockerfile](https://docs.docker.com/engine/reference/builder/) or [Docker Compose file](https://docs.docker.com/compose/compose-file/#compose-file-structure-and-examples) if one is in the folder you selected.

    > **Note:** Alpine Linux and Windows based containers are not currently supported.

    ![Dev Container Progress Notification](images/containers/select-dev-container-def.png)

    Note that each dev container definition in the pick list comes from  the [vscode-dev-containers repository](https://aka.ms/vscode-dev-containers). You can browse the `containers` folder in the repository to see the contents of each definition before selecting one. 

3. After you pick a starting point for your container, VS Code adds any needed configuration files like `.devcontainer/devcontainer.json` to your folder and the window reloads. VS Code then begins creating your dev container and a progress notification provides you status updates. Note that this step will be skipped entirely the next time you open this same folder since the container will already exist.

    ![Dev Container Progress Notification](images/containers/dev-container-progress.png)

4. After it's done, VS Code automatically connects to the container and you can interact with the folder just as you did when open locally. Next time you open the same folder, the configuration you chose will be reused.

## Creating a devcontainer.json file for existing projects

VS Code's container configuration is stored in a `devcontainer.json` file. The file is similar to `launch.json` for debugging, but is used for launching (or attaching to) your development container instead. The file is located either at `.devcontainer/devcontainer.json`  or `.devcontainer.json` (dot-prefixed).

The **Remote-Containers: Create Container Configuration File...** command adds this file to your project, where you can further customize for your needs.

For example, through a `devcontainer.json` file, you can:

- Spin up a [stand-alone "sandbox" container](#working-with-a-developer-sandbox).
- Work inside a dev container defined by an [image](#using-an-existing-container-image), [Dockerfile](#using-a-dockerfile) or [docker-compose.yml](#using-docker-compose).
- [Use Docker or Kubernetes](#using-docker-or-kubernetes-from-a-container) from inside a dev container to build and deploy your app.
- [Attach to an already running container](#attaching-to-running-containers).

The [vscode-dev-containers repository](https://aka.ms/vscode-dev-containers) has examples of `devcontainer.json` for different scenarios. You can [alter your configuration](#indepth-setting-up-a-folder-to-run-in-a-container) to install additional tools such as Git in the container, automatically install extensions, expose additional ports, set runtime arguments, and reuse or [extend your existing Docker Compose setup](https://aka.ms/vscode-remote/containers/docker-compose/extend).

### Configuration edit loop

Editing your container configuration is easy. Since rebuilding a container will "reset" the container to its starting contents (with the exception of your local source code), VS Code does not automatically rebuild if you edit a container configuration file (`devcontainer.json`, `Dockerfile`, `docker-compose.yml`). Instead, there are some commands that can be used to make editing your config easier.

Here is the typical edit loop using these commands:

1. Start with `kbstyle(F1)` > **Remote-Containers: Create Container Configuration File...**
2. Edit the contents of the `.devcontainer` folder as required.
3. Try it with `kbstyle(F1)` > **Remote-Containers: Reopen folder in Container**.
4. On failure:
   1. `kbstyle(F1)` > **Remote-Containers: Reopen Folder Locally** which will open a new local window.
   2. In this local window: Edit the contents of the `.devcontainer` folder as required.
   3. Try it again: Go back to the container window, `kbstyle(F1)` > **Remote-Containers: Reload Window**.
   4. Repeat as needed.
5. If the build was successful, but you want to make more changes:
      1. Edit the contents of the `.devcontainer` folder as required when connected to the container.
      2. `kbstyle(F1)` > **Remote-Containers: Rebuild Container**.
      3. On failure: Follow the same workflow above.

### Adding configuration files to public or private repositories

You can easily share a customized dev container definition for your project by adding `devcontainer.json` files to source control. By including these files in your repository, anyone that opens a local copy of your repo in VS Code will be automatically prompted to reopen the folder in a container, provided they have the Remote - Containers extension installed.

![Dev config file reopen notification](images/containers/dev-container-reopen-prompt.png)

Beyond the advantages of having your team use a consistent environment and tool-chain, this also makes it easier for new contributors or team members to get productive quickly. First-time contributors will require less guidance and hit fewer issues related to environment setup.

## Attaching to running containers

VS Code supports two ways for interacting with containers. One is to configure a folder you open to always run inside of a container. While this can be useful in many situations, it may not match your workflow and you may prefer to "attach" VS Code to an already running container.

> **Note:** Alpine Linux and Windows based containers are not currently supported.

Once you have a container up and running, you can connect by either:

### Option 1: Use the Attach to Running Container command

Run **Remote-Containers: Attach to Running Container...** command from the Command Palette (`kbstyle(F1)`) and selecting a container.

### Option 2: Use the Docker extension

1. Install the [Docker extension](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker) from the Extensions view (search for "docker") if it is not already installed.

2. Go to the Docker view and expand the **Containers** node in the explorer.

3. Right click and select **Attach Visual Studio Code**.

    ![Docker Explorer screenshot](images/containers/docker-attach.png)

After a brief moment, a new window will appear and you'll be connected to the running container.

## Managing containers

By default, the Remote - Containers extension automatically starts the containers mentioned in the `devcontainer.json` when you open a folder in a container. When you close VS Code, the extension automatically shuts down the containers you've connected to. You can change this behavior by adding `"shutdownAction": "none"` to the `devcontainer.json`.

You can also manually manage your containers using one of the following options:

### Option 1: Use the Docker extension

1. Install the [Docker extension](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker) from the Extensions view, if not already installed.

2. You can then go to the Docker view and expand the **Containers** node to see what containers are running. Right click and select **Stop Container** to shut one down.

    ![Docker Explorer screenshot](images/containers/docker-stop.png)

### Option 2: Use the Docker CLI

1. Open a terminal.
2. Type `docker ps` to see running containers. Use `docker ps -a` to also see any stopped containers.
3. Type `docker stop <Container ID>` from this list to stop a container.
4. If you would like to delete a container, type `docker rm <Container ID>` to remove it.

### Option 3: Use Docker Compose

1. Open a terminal.
2. Go to the directory with your `docker-compose.yml` file.
3. Type `docker-compose top` to see running processes.
4. Type `docker-compose stop` to stop the containers. If you have more than one Docker Compose file, you can specify additional Docker Compose files with the `-f` argument.
5. If you would like to delete the containers, type `docker-compose down` to both stop and delete them.

If you want to clean out images or mass-delete containers, [see here](/docs/remote/troubleshooting.md#cleaning-out-unused-containers-and-images) for different options.

## Managing extensions

VS Code runs extensions in one of two places: locally on the UI / client side, or in the container. While extensions that affect the VS Code UI, like themes and snippets, are installed locally, most extensions will reside inside a particular container. This allows you to install only the extensions you need for a given task in a container and seamlessly switch your entire tool-chain just by connecting to a new container.

If you search and install an extension from the Extensions view, it will automatically be installed in the correct location. You can tell where an extension is installed based on the category or group it is in. There will be a **Local - Installed** category and also one for your container.

![Workspace Extension Category](images/containers/containers-installed-remote-indicator.png)

![Local Extension Category](images/common/local-installed-extensions.png)

> **Note:** If you are an extension author and are finding that your extension is not working properly or installs in the wrong place, see the article on [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

Local extensions that actually need to run remotely will appear **Disabled** in the **Local - Installed** category. You can click the **Install** button if you want to install them on your remote host.

![Disabled Extensions w/Install Button](images/containers/containers-disabled-extensions.png)

### "Always installed" extensions

If there are extensions that you would like always installed in any container, you can update the `remote.containers.defaultExtensions` User [setting](/docs/getstarted/settings.md). For example, if you wanted to install the [GitLens](https://marketplace.visualstudio.com/itemdetails?itemName=eamodio.gitlens) and [Resource Monitor](https://marketplace.visualstudio.com/itemdetails?itemName=mutantdino.resourcemonitor) extensions, you would specify their extension IDs as follows:

```json
"remote.containers.defaultExtensions": [
    "eamodio.gitlens",
    "mutantdino.resourcemonitor"
]
```

### Advanced: Forcing an extension to run locally / remotely

VS Code runs extensions in one of two places: locally on the **UI** / client side, or remotely on the **Workspace** / container side. Extensions typically are designed and tested for use in one side or the other, not both. However, you can force an extension to run in a particular location in your User [settings](/docs/getstarted/settings.md). For example, the `remote.extensionKind` setting below will force the Azure Cosmos DB extension on the UI side (instead of its Workspace default) and the Debugger for Chrome on the Workspace side (instead of its UI default):

````json
"remote.extensionKind": {
    "ms-azuretools.vscode-cosmosdb": "ui",
    "msjsdiag.debugger-for-chrome": "workspace"
}
````

Typically, this should only be used for testing unless otherwise noted in the extension's documentation since it **can break extensions**. See the article on [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

## Forwarding a port

Containers are isolated environments, so if you want to access a server, service, or other resource inside your container, you will need to "forward" the port to your host. You can either configure your container to always expose these ports or just forward them temporarily.

### Temporarily forwarding a port

Sometimes when developing you may need to access a port in your container that you didn't add to `devcontainer.json`, your `Dockerfile`, or Docker Compose file. If you want to **temporarily forward** a new port for the duration of the session, run the **Remote-Containers: Forward Port from Container...** command from the Command Palette (`kbstyle(F1)`).

After selecting a port, a notification will tell you the localhost port you should use to access the port in the container. For example, if you forwarded an HTTP server listening on port 3000, the notification may tell you that it was mapped to port 4123 on localhost. You can then connect to this remote HTTP server using http\://localhost:4123.

### Always forwarding / exposing / publishing a port

If you have ports you always want use from your host, you can set them up so they are always available. Specifically you can:

1. **Use the appPort property:** If you reference an `image` or `Dockerfile` in `devcontainer.json`, you can use the  `appPort` property to publish ports to the host.

    ```json
    "appPort": [3000, "8921:5000"]
    ```

2. **Use the Dockerfile EXPOSE instruction:** You can add the port to your `Dockerfile` using the [`EXPOSE` instruction](https://docs.docker.com/engine/reference/builder/#expose).

    ```Dockerfile
    EXPOSE 3000
    ```

3. **Use the Docker Compose ports mapping:** The [`ports` mapping](https://docs.docker.com/compose/compose-file#ports) can easily be added your `docker-compose.yml` file to expose additional ports.

    ```yaml
    ports:
    - "3000"
    - "8921:5000"
    ```

In each case, you'll need to rebuild your container for the setting to take effect. You can do this by running the **Remote-Containers: Rebuild Container** command in the Command Palette (`kbstyle(F1)`) when you are connected to the container.

## Opening a terminal in a container

Opening a terminal in a container from VS Code is simple. Once you've opened a folder in a container, **any terminal window** you open in VS Code (**Terminal > New Terminal**) will automatically run in the container rather than locally.

You can also **use the `code-insiders` CLI** from this same terminal window to perform a number of operations such as opening a new file or folder in the container. Type `code-insiders --help` to learn what is available from the command line.

![Using the code CLI](images/containers/code-command-in-terminal.png)

## Debugging in a container

Once you've opened a folder in a container, you can use VS Code's debugger in the same way you would when running the application locally. For example, if you select a launch configuration in `launch.json` and start debugging (`kbstyle(F5)`), the application will start on the remote host and attach the debugger to it.

See the [debugging](/docs/editor/debugging.md) documentation for details on configuring VS Code's debugging features in `.vscode/launch.json`.

## Container specific settings

VS Code's user settings will apply to both folders opened locally and in a dev container. For most settings, this is really useful, but some settings are absolute paths that may vary between your local machine and each container. You may also want to alter settings like the active theme based on whether you are connected to a container or not.

Fortunately, you can add container specific user settings to `~/.vscode-remote/data/Machine/settings.json` in the container that will override any local settings you have in place. You can quickly access them by running the **Preferences: Open Remote Settings** command from the command palette (`kbstyle(F1)`) or by clicking on the "Remote" tab in the settings editor.

### Default container specific settings

You can add default settings into your dev container by including the needed settings file when the container is built. For example, consider this `.devcontainer/settings.vscode.json` file that sets the Java home path:

```json
{
    "java.home": "/docker-java-home"
}
```

Now, just add a `COPY` statement into your `.devcontainer/Dockerfile` to add this file into the container when it is built:

```Dockerfile
# Copy endpoint specific user settings into container to specify Java path
COPY settings.vscode.json /root/.vscode-remote/data/Machine/settings.json
```


## In-depth: Setting up a folder to run in a container

There are a few different ways VS Code Remote - Containers can be used to develop an application inside a fully containerized environment. In general, there are two primary scenarios that drive interest in this development style:

- **[Stand-Alone Dev Sandboxes](#working-with-a-developer-sandbox)**: Even if you are not deploying your application into a containerized environment, you may still want to isolate your build and runtime environment from your local OS or to edit, run, and debug code in an environment that is more representative of production. A single, stand-alone "dev sandbox" container can be used to achieve these goals even if you are not familiar with containers and/or do not deploy into a container in production. For example, today you may be running an some code on your local macOS or Windows machine that is ultimately deployed to a Linux VM or server in production.

- **Container Deployed Applications**: In this case, you plan to deploy the application into one or more containers but would like to take advantage of the same benefits that stand-alone dev sandboxes provide. VS Code currently supports working with container based applications defined in a number of ways:

  - [Dockerfile](#using-a-dockerfile): You are working on a single container / service is described using a single `Dockerfile`.

  - [Docker Compose](#using-docker-compose): You are working with multiple orchestrated services that are described using a `docker-compose.yml` file.

  - [Attach](#attaching-to-running-containers): You can use an alternate workflow and attach to an already running container.

  - In each case, you may also need to [build container images and deploy to Docker or Kubernetes](#using-docker-or-kubernetes-from-a-container)from inside your container.

This section will walk you through how to configure your project for each of these situations. The [vscode-dev-containers GitHub repository](https://aka.ms/vscode-dev-containers) also contains a number of dev container definitions you may find useful to get you up and running quickly.

### devcontainer.json

As mentioned above, `.devcontainer/devcontainer.json` or `.devcontainer.json` file tells VS Code where to look for the containers it should create or connect to. The intent of `devcontainer.json` is conceptually similar to VS Code's `launch.json` for debugging, but focused on launching (or attaching to) your development container instead. We'll cover the different properties of the file in the sections below.

### Working with a developer sandbox

You can create a dev sandbox by selecting a base container image from a source like [DockerHub](https://hub.docker.com) and then manually installing additional software, such as Git, which may be missing.

You can use the **Remote-Containers: Create Container Configuration File** command in the Command Palette (`kbstyle(F1)`) to select from a base image to get you started and customize from there.

> **Note:**  Alpine Linux and Windows based containers are not currently supported.

If you are not able to find an image that meets your needs or just want to automate the installation of additional software, you can also [create a custom image using a `Dockerfile`](#using-a-dockerfile). See [Using a Dockerfile](#using-a-dockerfile) for details.

### Using an existing container image

You can use the following properties in a `.devcontainer/devcontainer.json` in your project root to configure VS Code for use with an existing container image:

| Property | Type | Description |
|----------|------|-------------|
| `image` | string | Required. The name of an image in a container registry ([DockerHub](https://hub.docker.com), [Azure Container Registry](https://azure.microsoft.com/services/container-registry/)) that VS Code should use to create the dev container. |
| `name` | string | [Optional] A display name for the container. |
| `extensions` | array | [Optional] Defaults to `[]`. An array of extension IDs that specify the extensions that should be installed inside the container when it is created. |
| `postCreateCommand` | string or array | [Optional] Defaults to none. A command or list of commands to run after the container hs created. (e.g. `yarn install`) |
| `context` | string | [Optional] Defaults to `"."`. Path that the Docker build should be run from relative to `devcontainer.json`. For example, a value of `".."` would allow you to reference content in sibling directories. |
| `appPort` | integer, string, or array | [Optional] Defaults to `[]`. A port or array of ports that should be made available locally when the container is running (beyond those already exposed by the container image). |
| `runArgs` | array | [Optional] Defaults to `[]`. An array of [Docker CLI arguments](https://docs.docker.com/engine/reference/commandline/run/) that should be used when running the container. |
| `overrideCommand` | boolean | [Optional] Defaults to `true`. Tells VS Code whether it should run `sleep infinity` when starting the container instead of the default command to prevent the container from immediately shutting down if the default command fails. |
| `shutdownAction` | enum: `none`, `stopContainer` | [Optional] Defaults to `stopContainer`. Indicates whether VS Code should stop the container when the VS Code window is closed / shut down. |
| `devPort` | integer | [Optional] Defaults to a random, available port. Allows you to force a specific port that the VS Code Server should use in the container. |

For example:

```json
{
    "name": "My Project",
    "image": "microsoft/dotnet:sdk",
    "appPort": 8090,
    "extensions": [
        "ms-vscode.csharp"
    ]
}
```

To open the folder in the container, run the **Remote-Containers: Open Folder in Container** or **Remote: Reopen Folder in Container** command from the Command Palette (`kbstyle(F1)`). Once the container has been created, the **local filesystem will be automatically mapped** into the container and you can start working with it from VS Code.

### Installing additional software in the sandbox

Once VS Code is connected to the container, you can open a VS Code terminal and execute any command against the OS inside the container. This allows you to install new command line utilities and spin up databases or application services from inside the Linux container.

Most container images are based on Debian or Ubuntu, where the `apt-get` command is used to install new packages.

For example:

```bash
apt-get update # Critical step - you won't be able to install software before you do this
apt-get install <package>
```

> **Note:** GUI based tools do not typically work inside of containers.

Documentation for the software you want to install will usually provide specific instructions, but note that you typically do **not need to prefix commands with `sudo`** given you are likely running as root in the container. If you are not already root, read the directions for the image you've selected to learn how to install additional software.

You can also use a `Dockerfile` to create a custom image with all needed software pre-installed. See [Using a Dockerfile](#using-a-dockerfile) for details.

### Using a Dockerfile

To create a customized sandbox or application in a single container, you can use (or reuse) a `Dockerfile` to define your dev container. If you have an existing `Dockerfile` you want to use, you can use the **Remote-Containers: Create Container Configuration File** command in the Command Palette (`kbstyle(F1)`) where you'll be asked to pick which Dockerfile you want to use. You can then customize from there.

> **Note:** Alpine Linux and Windows based containers are not currently supported.

You may want to install other tools such as Git inside the container, which you can easily [do manually](#installing-additional-software-in-the-sandbox). However, you can also create a custom `Dockerfile` specifically for development that includes these dependencies. The [vscode-dev-containers repository](https://github.com/Microsoft/vscode-dev-containers) contains examples you can use as a starting point.

You can use the following properties in `.devcontainer/devcontainer.json` to configure VS Code for use with your `Dockerfile`:

| Property | Type | Description |
|----------|------|-------------|
| `dockerFile` | string | Required. The location of the [Dockerfile](https://docs.docker.com/engine/reference/builder/) that defines the contents of the container. The path is relative to the `devcontainer.json` file. You can find a number of sample Dockerfiles for different runtimes [in this repository](https://github.com/Microsoft/vscode-dev-containers/tree/master/dev-containers). |
| `name` | string | [Optional] A display name for the container. |
| `extensions` | array | [Optional] An array of extension IDs that specify the extensions that should be installed inside the container when it is created. |
| `postCreateCommand` | string or array | [Optional] Defaults to none. A command or list of commands to run after the container hs created. (e.g. `yarn install`) |
| `appPort` | integer, string, or array | [Optional] Defaults to `[]`. A port or array of ports that should be made available locally when the container is running (beyond those already exposed by the container image). |
| `runArgs` | array | [Optional] Defaults to `[]`. An array of [Docker CLI arguments](https://docs.docker.com/engine/reference/commandline/run/) that should be used when running the container. |
| `overrideCommand` | boolean | [Optional] Defaults to `true`. Tells VS Code whether it should run `sleep infinity` when starting the container instead of the default command to prevent the container from immediately shutting down if the default command fails. |
| `shutdownAction` | enum: `none`, `stopContainer` | [Optional] Defaults to `stopContainer`. Indicates whether VS Code should stop the container when the VS Code window is closed / shut down. |
| `devPort` | integer | [Optional] Defaults to a random, available port. Allows you to force a specific port that the VS Code Server should use in the container. |

For example:

```json
{
    "name": "My Container App",
    "dockerFile": "Dockerfile",
    "appPort": 3000,
    "extensions": [
        "dbaeumer.vscode-eslint"
    ]
}
```

The example below uses `runArgs` to change the security policy to enable the ptrace system call for Go development container:

```json
{
    "name": "My Container App",
    "dockerFile": "Dockerfile",
    "extensions": [
        "ms-vscode.go"
    ],
    "runArgs": [
        "--cap-add=SYS_PTRACE",
        "--security-opt",
        "seccomp=unconfined" ]
}
```

After making edits, you can run the **Remote-Containers: Reopen Folder in Container** or **Remote-Containers: Rebuild Container** commands to try things out. Once the container is created, the local filesystem is automatically mapped into the container and you can start working with it from VS Code.

### Using Docker Compose

In some cases, a single container environment isn't sufficient. Fortunately, VS Code Remote also works with multi-container configurations that are managed by `docker-compose.yml`.

You can either:

1. Reuse an existing `docker-compose.yml` unmodified.
2. [Extend your existing Docker Compose configuration](#extending-your-docker-compose-file-for-development) for development.
3. Use the command line (for example `docker-compose up`) and [attach to an already running container](#attaching-to-running-containers).

> **Note:**  Alpine Linux and Windows based containers are not currently supported.

VS Code can be configured to **automatically start any needed containers** for a particular service in a Docker Compose file (if they are not already running). This gives your multi-container workflow the same quick setup advantages described for the Docker image and Dockerfile flows above.

To reuse `docker-compose.yml` unmodified, just create a `.devcontainer/devcontainer.json` with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `dockerComposeFile` | string  or array | Required. Path or an ordered list of paths to Docker Compose files relative to the `devcontainer.json` file. |
| `service` | string | Required. The name of the service you want to work on. |
| `workspaceFolder` | string | [Optional] Defaults to `"/"`. Sets the default path that VS Code should open when connecting to the container (which is often the path to a volume mount where the source code can be found in the container.)  |
| `name` | string | [Optional] A display name for the container. |
| `extensions` | array | [Optional] Defaults to `[]`. An array of extension IDs that specify the extensions that should be installed inside the container when it is created. |
| `postCreateCommand` | string or array | [Optional] Defaults to none. A command or list of commands to run after the container hs created. (e.g. `yarn install`) |
| `shutdownAction` | enum: `none`, `stopCompose` | [Optional] Defaults to `stopCompose`. Indicates whether VS Code should execute `docker-compose stop` when the VS Code window is closed / shut down. |
| `devPort` | integer | [Optional] Defaults to a random, available port. Allows you to force a specific port that the VS Code Server should use in the container. |

For example:

```json
{
    "name": "[Optional] Your project name here",
    "dockerComposeFile": "../docker-compose.yml",
    "service": "the-name-of-the-service-you-want-to-work-with-in-vscode",
    "workspaceFolder": "/default/workspace/path/in/container/to/open",
    "shutdownAction": "stopCompose"
}
```

Note that you may want to alter your existing Docker Compose file to mount your local `.gitconfig` folder so you don't have to set up Git inside of the container if you install it. (See [below](#extending-your-docker-compose-file-for-development) if you'd prefer not to alter your existing files.)

```yaml
volumes:
  # This lets you avoid setting up Git again in the container
  - ~/.gitconfig:/root/.gitconfig
```

After making edits, you can test by running the **Remote-Containers: Reopen Folder in Container** or **Remote-Containers: Rebuild Container** commands. Once the container is been created, the local filesystem is automatically mapped into the container and you can start working with it from VS Code.

### Extending your Docker Compose file for development

Referencing an existing deployment / non-development focused `docker-compose.yml` has some potential downsides.

For example:

- Docker Compose will shut down a container if its entry point shuts down. This is problematic for situations where you are debugging and need to restart your app on a repeated basis.
- You also may not be mapping the local filesystem into the container or exposing ports to other resources like databases you want to access.
- You may be using an [Alpine Linux](https://alpinelinux.org) based image in your production configuration. (VS Code Remote - Containers does not currently support Alpine Linux).

You can solve these and other issues like them by extending your entire Docker Compose configuration with [multiple `docker-compose.yml` files](https://docs.docker.com/compose/extends/#multiple-compose-files) that override or supplement your primary one.

For example, consider this additional `.devcontainer/docker-compose.yml` file:

```yaml
version: '3'
  services:
    your-service-name-here:
      volumes:
        # Mounts the project folder to '/workspace'. The target path inside the container
        # should match should match what your application expects. In this case, the
        # compose file is in a sub-folder, so we will mount '..'. We'll then reference this
        # as the workspaceFolder in '.devcontainer/devcontainer.json' so VS Code starts here.
        - ..:/workspace

        # This lets you avoid setting up Git again in the container
        - ~/.gitconfig:/root/.gitconfig

      # Overrides default command so things don't shut down after the process ends.
      command: sleep infinity
```

This same file can provide additional port mappings, etc as needed. All you need to do to use it, is reference your original `docker-compose.yml` file in addition to this one in `.devcontainer/devcontainer.json` as follows:

```json
{
    "name": "[Optional] Your project name here",
    "dockerComposeFile": [
        "../docker-compose.yml",
        "docker-compose.yml"
    ],
    "service": "your-service-name-here",
    "workspaceFolder": "/workspace",
    "shutdownAction": "stopCompose"
}
```

VS Code will then **automatically use both files** when starting up any containers or you can start them yourself from the command line as follows:

```bash
docker-compose up -f docker-compose.yml -f .devcontainer/docker-compose.yml
```

#### Using an updated Dockerfile to automatically install more tools

You may want to install other tools such as Git inside the container for the service you've specified. You can easily [do this manually](#installing-additional-software-in-the-sandbox). However, you can also create a custom `Dockerfile` specifically for development that includes these dependencies. The [vscode-dev-containers repository](https://github.com/Microsoft/vscode-dev-containers) contains a number of examples you can use to augment a copy of a Dockerfile or when creating a new one.

Assuming you put this file under `.devcontainer/Dockerfile`, the `.devcontainer/docker-compose.yml` above would just be tweaked as follows:

```yaml
version: '3'
  services:
    your-service-name-here:
    build:
      context: .
      # Location is relative to folder containing this compose file
      dockerfile: Dockerfile
    ports:
      - 3000:3000
    volumes:
      - ..:/workspace
    command: sleep infinity
```

### Docker Compose dev container definitions

The following are some dev container definitions that use Docker Compose that you can use to get a more complete picture of the setup:

- [Existing Docker Compose](https://aka.ms/vscode-remote/samples/existing-docker-compose) - Includes a set of files that you can drop into an existing project that will reuse a `docker-compose.yml` file in the root of your project.

- [Node.js & MongoDB](https://aka.ms/vscode-remote/samples/node-mongo) -  A Node.js container that connects to a Mongo DB in a different container.

- [Python & PostGreSQL](https://aka.ms/vscode-remote/samples/python-postgresl) -  A Python container that connects to PostGreSQL in a different container.

- [Docker-in-Docker Compose](https://aka.ms/vscode-remote/samples/docker-in-docker-compose) - Includes the Docker CLI and illustrates how you can use it to access your local Docker install from inside a dev container by volume mounting the Docker Unix socket.

## Using Docker or Kubernetes from a container

While you can build, deploy, and debug your application right inside a dev container, you may also need to test it by running it inside a set of production-like containers. Fortunately, by installing the needed Docker or Kubernetes CLIs, you can build and deploy your app's container images from inside your dev container.

Once the needed CLIs are in place, you can also work with the appropriate container cluster using the [Docker](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker) if you force it to run as a Workspace extension or [Kubernetes](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) extensions.

See the following examples dev containers for additional information:

- [Docker-in-Docker](https://aka.ms/vscode-remote/samples/docker-in-docker) - Includes the Docker CLI and illustrates how you can use it to access your local Docker install from inside a dev container by volume mounting the Docker Unix socket.

- [Docker-in-Docker Compose](https://aka.ms/vscode-remote/samples/docker-in-docker-compose) - Variation of Docker-in-Docker for situations where you are using Docker Compose instead of a single Dockerfile.

- [Kubernetes-Helm](https://aka.ms/vscode-remote/samples/kubernetes-helm) - Includes the Docker CLI, kubectl, and Helm and illustrates how you can use them from inside a dev container to access a local Minikube or Docker provided Kubernetes cluster.

## Known limitations

### Remote - Containers limitations

- Alpine Linux or Windows container images are not yet supported. Most images come with a Debian or Ubuntu based flavor you can use instead. (Typically Alpine variations end in `-alpine`).
- All roots/folders in a multi-root workspace will be opened in the same container, regardless of whether there are configuration files at lower levels.
- The unofficial Ubuntu Docker **snap** package for Linux is **not** supported. Follow the [official Docker install instructions for your distribution](https://docs.docker.com/install/#supported-platforms).
- Local proxy settings are not reused inside the container which can prevent extensions from working unless the appropriate proxy information is configured (for example global `HTTP_PROXY` or `HTTPS_PROXY` environment variables with the appropriate proxy information).

See [here for a list of active issues](https://aka.ms/vscode-remote/containers/issues) on GitHub that are tagged with Containers.

### Docker limitations

- First time installs of Docker Desktop for Windows will require an additional "sharing" step to give your container access to local source code. However, step may not work with certain AAD (email based) identities. See [here](/docs/remote/troubleshooting.md#docker-desktop-for-windows-tips) and [here](/docs/remote/troubleshooting.md#enabling-file-sharing-in-docker-desktop) for details and workarounds.
- If you see high CPU spikes for `com.docker.hyperkit` on Mac, this may be due to a [known issue with Docker for Mac](https://github.com/docker/for-mac/issues/1759). See the Docker issue for details.
- If you see either of these messages building a Dockerfile, you may be hitting a known Docker issue with Debian 8 (Jessie):
    ```text
    W: Failed to fetch http://deb.debian.org/debian/dists/jessie-updates/InRelease
    E: Some index files failed to download. They have been ignored, or old ones used instead
    ```
    See [here for a workaround](/docs/remote/troubleshooting.md#other-common-docker-related-errors-and-issues).

See [here for other notable Docker-related issues](/docs/remote/troubleshooting.md#other-common-docker-related-errors-and-issues).

### Extension limitations

Many extensions will work inside dev containers without modification. However, in some cases, certain features may require changes. If you run into an extension issue, [see here for a summary of common problems and solutions](/docs/remote/troubleshooting.md#extensiont-tips) that you can mention to the extension author when reporting the issue.
## Common questions

### I am seeing errors when trying to mount the local filesystem into a container, how do I fix this?

Right-click on the Docker task bar item and select **Settings**. On Windows, go to the **Shared Drives** tab and check the drive(s) where your source code is located. On macOS, go the **File Sharing** tab and make sure the folder containing your source code is under a file path specified in the list.

See [here](/docs/remote/troubleshooting.md#docker-desktop-for-windows-tips) for information on workarounds to common Docker for Windows issues.

### I am seeing "W: Failed to fetch http://deb.debian.org/debian/dists/jessie-updates/InRelease" when building a Dockerfile, how do I fix this?

You may be hitting known Docker issue with Debian 8 (Jessie). See [here for a workaround](/docs/remote/troubleshooting.md#other-common-docker-related-errors-and-issues).

### I'm seeing an error about a missing library or dependency, how do I fix this?

Some extensions rely on libraries not found in the certain Docker images. See [above](#installing-additional-software-in-the-sandbox) for help resolving the problem.

### How can I connect to multiple containers?

Currently you can only connect to one container per VS Code window. However, you can spin up multiple containers and [attach to them](#attaching-to-running-containers) from different VS Code windows to work around this limitation.

### How can I build or deploy container images into my local Docker / Kubernetes install when working inside a container?

You can build images and deploy containers by forwarding the Docker socket and installing the Docker CLI (and kubectl for Kubernetes) in the container. See the [Docker-in-Docker](https://aka.ms/vscode-remote/samples/docker-in-docker), [Docker-in-Docker Compose](https://aka.ms/vscode-remote/samples/docker-in-docker-compose), and [Kubernetes-Helm](https://aka.ms/vscode-remote/samples/kubernetes-helm) dev container definitions for details.

### What are the connectivity requirements for the VS Code Server when it is running in a container?

The VS Code Server requires outbound HTTPS (port 443) connectivity to `update.code.visualstudio.com` and `marketplace.visualstudio.com`. All other communication between the server and the VS Code client is accomplished through an authenticated, random, TCP port automatically exposed via the Docker CLI.

### As an extension author, what do I need to do to make sure my extension works in dev containers?

The VS Code extension API hides most of the implementation details of running remotely so many extensions will just work inside dev containers without any modification. However, we recommend that you test your extension in a dev container to be sure that all of its functionality works as expected. See the article on [Supporting Remote Development](/api/advanced-topics/remote-extensions.md) for details.

## Questions or feedback

> **Dogfooding Note:**  When reporting issues, please file them against the [vscode-remote](https://github.com/Microsoft/vscode-remote/issues) repository.

- See [Tips and Tricks](/docs/remote/troubleshooting.md#containers-tips) or the [FAQ](/docs/remote/faq.md).
- Search on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode).
- Add a [feature request](https://aka.ms/vscode-remote/feature-requests) or [report a problem](https://aka.ms/vscode-remote/issues/new).
- Create a [development container definition](https://aka.ms/vscode-dev-containers) for others to use.
- Contribute to [our documentation](https://github.com/Microsoft/vscode-docs) or [VS Code itself](https://github.com/Microsoft/vscode).
- See our [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) guide for details.
