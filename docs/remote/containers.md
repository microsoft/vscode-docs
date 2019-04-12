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

The **Visual Studio Code Remote - Containers extension** can adapt to a variety of different container-based workflows. It allows you to open any folder inside (or mounted into) a container and take advantage of VS Code's full feature set. A `devcontainer.json` file in your project tells VS Code how to access (or create) a "development container" with a set of extensions installed inside of it to optimize the experience.

These **development containers** typically come with a basic tool stack (Python, node, Go, etc.) and its prerequisites (e.g. `pylint` for Python). This container may be used to actually run an application or be focused exclusively on sandboxing tools, libraries, runtimes, or other utilities that need to be run against a codebase. However, the Containers extension also supports **attaching** to existing running containers to cover triage scenarios or for cases where you may be using other container orchestrators.

With the exception of personalization extensions (e.g. themes), most extensions you install once connected will be tied to the container, which means that you can **seamlessly switch** your entire development environment by just connecting to a different container.

![Container Architecture](images/containers/architecture-containers.png)

The result is that VS Code can provide a **local-quality development experience** including full IntelliSense, debugging, and more **regardless of where your code is hosted**.

## Getting started

### Installation

To get started you can:

1. Install [Docker Desktop for Mac/Windows](https://www.docker.com/products/docker-desktop) or [Docker CE/EE for Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

    > **Linux Note:** Follow the **official** Docker install instructions such as using the [convenience script](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-convenience-script). Do **not** use the unofficial Ubuntu snap package.
    >
    > You will also need to add your user to the `docker` group after installation as follows: `sudo usermod -aG docker $USER`.

2. Install [Visual Studio Code - Insiders](https://code.visualstudio.com/insiders/)

    > **Dogfooding Note (UPDATED)**: Code - WSL is deprecated. Use VS Code - Insiders now.

3. Install the [Remote Development](https://aka.ms/vscode-remote/download/extension) extension pack

    > **Dogfooding Note (UPDATED):** Set up the dogfooding version of the Remote Development extensions as follows:
    > 1. Sign into a Microsoft GitHub org associated GitHub account from a browser.
    > 2. Download and manually install the latest VSIX of the [Selfhost Remote Extensions Updater](https://aka.ms/vscode-remote/download/extension) in VS Code – Insiders.
    > 3. The first time the Selfhost Remote Extensions starts, you may be prompted to paste in a GitHub access token so that it can download and auto-update private versions of the extensions. You only need to give "Repo" scope to this token.
    > 4. Reload / restart VS Code - Insiders.

The extension supports two primary operating models. One is to use a container as your [full-time development environment](#creating-configuration-files-for-existing-projects) while the other is to [attach to a running container](#attaching-to-running-containers) for targeted use. We will cover how to use a container as your full-time development environment first.

### Quick start: Open a folder in a container

For this quick start, we'll set up one of your existing project folders to work in a container. Just follow these steps:

1. Start VS Code, run the **Remote-Containers: Open Folder in Container...** command from the command pallette, and select a folder you'd like to use.

2. You'll be asked to pick a **dev container definition** to use as a starting point for your container. All of these come from the from the **[vscode-dev-containers repository](http://aka.ms/vscode-dev-containers)** if you'd like to take a look at their contents before picking one. If you have a [`Dockerfile`](https://docs.docker.com/engine/reference/builder/) in your project, you also have the option to use it instead.

    > **Note:** VS Code Remote - Containers does not currently support Alpine or Windows based containers.

3. The window will then reload, but since the container does not exist yet, VS Code will provision one. This can take some time, so a progress notification will provide status updates. If you want to get a more detailed view of progress, take a look at the "Dev Containers" terminal window.

    ![Dev Container Progress Notification](images/containers/dev-container-progress.png)

4. After it's done, VS Code will automatically connect to the container. The local filesystem will be automatically mapped into the container so you can interact with it just as you would if it was running locally.

## Creating configuration files for existing projects

The key to configuring VS Code to adapt to a wide variety of container-based scenarios is `devcontainer.json`. The intent of `devcontainer.json` is conceptually similar to VS Code's `launch.json` for debugging, but focused on launching (or attaching to) your development container instead. The file is either located at `.devcontainer/devcontainer.json` with other files related to your dev container or as a stand alone dot-prefixed `.devcontainer.json` file. In the quick start above, one of these files added to your project with the appropriate settings after you selected a definition.

The **Remote-Docker: Create Container Configuration File...** command from the command pallette adds a `devcontainer.json` file among others that you can then adapt to your needs. For example, you can:

- Spin up a [stand-alone "sandbox" container](#working-with-a-stand-alone-dev-sandbox).
- Work inside a dev container defined by an [image](#using-an-existing-container-image), [Dockerfile](#using-a-dockerfile) or [docker-compose.yml](#using-docker-compose).
- [Use Docker or Kubernetes](#working-with-docker-or-kubernetes-from-inside-a-container) from inside a dev container to build and deploy your app.
- [Attach to an already running container](#attaching-to-running-containers).

The [vscode-dev-containers repository](http://aka.ms/vscode-dev-containers) is a good starting resource for examples of adapting `devcontainer.json` to different scenarios. From here, you can [alter your configuration](#in-depth-setting-up-a-folder-to-run-in-a-container) to install additional tools like Git in the container, automatically install extensions, expose additional ports, set runtime arguments, reuse or [extend your existing Docker Compose setup](https://aka.ms/vscode-remote/containers/docker-compose/extend), and more.

Finally, if nothing here meets your needs, you can also spin up containers in any way you see fit and [attach to a running container](#attaching-to-running-containers).

### Adding configuration files to public or private repos

You can easily share a customized dev container definition for your project by simply adding files like `.devcontainer/devcontainer.json` to source control. By including these files in your repository, anyone that opens a local copy of your repo in VS Code will be automatically asked if they want reopen the folder in a container instead if the [Remote Development](https://aka.ms/vscode-remote/download/extension) extension installed.

![Dev config file reopen notification](images/containers/dev-container-reopen-prompt.png)

Beyond the advantages of having your team use a consistent environment and tool-chain, doing this can make it easier for new contributors or team members to get productive quickly. First-time contributors will require less guidance and are less likely to either submit issues or contribute code with issues that are related to environment setup.

## Attaching to running containers

VS Code supports two models for interacting with containers. One is to configure a folder you open to always run inside of a container. While this can be useful in many situations, in other situations you may have your own workflow and simply "attach" VS Code to an already running containers.

Once you have a container up and running, you can connect to it by running the **Remote-Containers: Attach to running Container...** command or using the **Docker Explorer** from the VS Code [Docker extension](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker). If you expand "Containers" in the Docker Explorer, you can right click on any container and select **Attach Visual Studio Code...**

> **Note:**  Alpine and Windows based containers are not currently supported.

![Docker Explorer screenshot](images/containers/attach-vs-code.png)

After a brief moment, a new window will appear and you'll be connected to the running container!

## Managing extensions

While "personalization" extensions (along with a few others) install locally, most installed extensions will reside inside a particular container. This allows you to install only the extensions you need for a given task in a container and seamlessly switch your entire tool-chain just by connecting to another one.

You can install additional extensions in the container at any time by using the extensions panel. VS Code automatically infers whether the extension should be run locally or in the container based on a set of extension characteristics. If you are an extension author and are finding that your extension is not working properly, see [Adding Remote Support to Extensions](/api/advanced-topics/remote-extensions.md) for details on resolving these issues.

### "Always installed" extensions

If there are extensions that you would like to always have installed in any container, you can update the `remote.containers.defaultExtensions` property in `settings.json`. For example, if you wanted to install the [GitLens](https://marketplace.visualstudio.com/itemdetails?itemName=eamodio.gitlens) and [Resource Monitor](https://marketplace.visualstudio.com/itemdetails?itemName=mutantdino.resourcemonitor) extensions, you would specify their extension IDs as follows:

```json
"remote.containers.defaultExtensions": [
    "eamodio.gitlens",
    "mutantdino.resourcemonitor"
]
```

## Opening a terminal in a container

If you've already connected to a container, **any terminal window** you open in VS Code will automatically run in the. You can also **use the `code` CLI this terminal window** to perform a number of operations such as opening a new file or folder on the remote host! Type `code --help` to what is available from the command line.

![Using the code CLI](images/containers/code-command-in-terminal.png)

## Debugging in a container

Once a folder has been opened in a container, you can use VS Code's debugger in the same way you would when running the application locally. For example, the `launch` action will start the application up inside the container and attach the debugger to it.

See the [debugging](/docs/editor/debugging.md) documentation for details on configuring VS Code's debugging features in `.vscode/launch.json`.

## In-depth: Setting up a folder to run in a container

There are a few different ways VS Code Remote - Containers can be used to develop an application inside a fully containerized environment. In general, there are two primary scenarios that drive interest in this development style:

- **[Stand-Alone Dev Sandboxes](#working-with-a-stand-alone-dev-sandbox)**: Even if you are not deploying your application into a containerized environment, you may still want to isolate your build and runtime environment from your local OS or to edit, run, and debug code in an environment that is more representative of production. A single, stand-alone "dev sandbox" container can be used to achieve these goals even if you are not familiar with containers and/or do not deploy into a container in production. For example, today you may be running an some code on your local macOS or Windows machine that is ultimately deployed to a Linux VM or server in production.

- **Container Deployed Applications**: In this case, you plan to deploy the application into one or more containers but would like to take advantage of the same benefits that stand-alone dev sandboxes provide. VS Code currently supports working with container based applications defined in a number of ways:

  - [**Dockerfile**](#using-a-dockerfile): You are working on a single container / service is described using a single `Dockerfile`

  - [**Docker Compose**](#using-docker-compose): You are working with multiple orchestrated services that are described using a `docker-compose.yml` file.

  - [**Attach**](#attaching-to-running-containers): You can use an alternate workflow and simply attach to an already running container.

  - In each case, you may also need to **[build container images and deploy to Docker or Kubernetes](#working-with-docker-or-kubernetes-from-inside-a-container)** from inside your container.

This section will walk you through how to configure your project for each of these situations. The **[vscode-dev-containers GitHub repository](https://aka.ms/vscode-dev-containers)** also contains a number of dev container definitions you may find useful to get you up and running quickly.

### `devcontainer.json`

As mentioned above, `.devcontainer/devcontainer.json` tells VS Code where to look for the containers it should provision and or connect to. The intent of `devcontainer.json` is conceptually similar to VS Code's `launch.json` for debugging, but focused on launching (or attaching to) your development container instead. We'll cover the different properties of the file in the sections below.

### Working with a Stand-Alone Dev Sandbox

In its most basic form, you can create a dev sandbox by simply selecting a base container image from a source like [DockerHub](https://hub.docker.com) and then manually install any additional software like Git that may be missing.

You can use the **Remote-Containers: Create Container Configuration File...** command in the command palette (Cmd/Ctrl+Shift+P) to select from a few base image to get you started and customize from there.

> **Note:**  Alpine and Windows based containers are not currently supported.

Note that, if you are not able to find an image that meets your needs or just want to automate the installation of additional software, you can also **[create a custom image using a `Dockerfile`](#using-a-dockerfile)**. See [below](#using-a-dockerfile) for details.

### Using an existing container image

You can use the following properties in a `.devcontainer/devcontainer.json` in your project root to configure VS Code for use with an existing container image:

| Property | Type | Description |
|----------|------|-------------|
| `image` | string | Required. The name of an image in a container registry (e.g. [DockerHub](https://hub.docker.com), [Azure Container Registry](https://azure.microsoft.com/en-us/services/container-registry/)) that VS Code should use to provision the dev container. |
| `name` | string | [Optional] A display name for the container. |
| `extensions` | array | [Optional] Defaults to `[]`. An array of extension IDs that specify the extensions that should be installed inside the container when it is created. |
| `appPort` | integer, string, or array | [Optional] Defaults to `[]`. A port or array of ports that should be made available locally when the container is running (beyond those already exposed by the container image). |
| `runArgs` | array | [Optional] Defaults to `[]`. An array of [Docker CLI arguments](https://docs.docker.com/engine/reference/commandline/run/) that should be used when running the container. |
| `overrideCommand` | boolean | [Optional] Defaults to `true`. Tells VS Code whether it should run `sleep infinity` when starting the container instead of the default command to prevent the container from immediatley shutting down if the default command fails. |
| `shutdownAction` | enum: `none`, `stopContainer` | [Optional] Defaults to `stopContainer`. Indicates whether VS Code should stop the container when the VS Code window is closed / shut down. |
| `devPort` | integer | [Optional] Defaults to a random, available port. Allows you to force a specific port that the VS Code Remote server should use in the container. |

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

To open the folder in the container, simply run the **Remote-Containers: Open Folder in Container...** or **Remote: Reopen Folder in Container** command from the command palette (Cmd/Ctrl+Shift+P). Once the container has been created, the **local filesystem will be automatically mapped** into the container and you can start working with it from VS Code.

### Installing additional software in the sandbox

Once VS Code is connected to the container, you can open a VS Code terminal and execute any command against the OS inside the container. This allows you to install new command line utilities, spin up databases or other application services, and more inside the Linux container.

Most container images are based on Debian or Ubuntu where the `apt-get` command is used to install new packages. For example:

```bash
apt-get update # Critical step - you won't be able to install software before you do this
apt-get install <package>
```

> **Note:** GUI based tools do not typically work inside of containers.

Documentation for the software you want to install will provide you specific instructions, but note that you typically do **not need to prefix commands with `sudo`** given you are likely running as root in the container. If you are not already root, read the directions for the image you've selected for how to install additional software.

Finally, you can also use a `Dockerfile` to create a custom image with all the needed software pre-installed if you would prefer. See [below](#using-a-dockerfile) for details.

### Using a Dockerfile

When the application you looking for a customized sandbox or are working with an application in a single container, you can use (or reuse) a `Dockerfile` to define your dev container. If you have an existing `Dockerfile` you want to use, you can use the **Remote-Docker: Create Container Configuration File...** command in the command palette (Cmd/Ctrl+Shift+P) where you'll be asked to pick which Dockerfile you want to use. You can then customize from there.

> **Note:**  Alpine and Windows based containers are not currently supported.

You may want to install other tools like `git` inside the container, which you can easily [do manually](#installing-additional-software-in-the-sandbox). However, you can also create a custom `Dockerfile` specifically for development that includes these dependencies. The **[vscode-dev-containers repository](https://github.com/Microsoft/vscode-dev-containers)** contains a number of examples you can use as a starting point.

You can use the following properties in `.devcontainer/devcontainer.json` configure VS Code for use with your `Dockerfile`:

| Property | Type | Description |
|----------|------|-------------|
| `dockerFile` | string | Required. The location of the [Dockerfile](https://docs.docker.com/engine/reference/builder/) that defines the contents of the container. The path is relative to the `devcontainer.json` file. You can find a number of sample Dockerfiles for different runtimes [in this repository](https://github.com/Microsoft/vscode-dev-containers/tree/master/dev-containers). |
| `name` | string | [Optional] A display name for the container. |
| `extensions` | array | [Optional] An array of extension IDs that specify the extensions that should be installed inside the container when it is created. |
| `appPort` | integer, string, or array | [Optional] Defaults to `[]`. A port or array of ports that should be made available locally when the container is running (beyond those already exposed by the container image). |
| `runArgs` | array | [Optional] Defaults to `[]`. An array of [Docker CLI arguments](https://docs.docker.com/engine/reference/commandline/run/) that should be used when running the container. |
| `overrideCommand` | boolean | [Optional] Defaults to `true`. Tells VS Code whether it should run `sleep infinity` when starting the container instead of the default command to prevent the container from immediatley shutting down if the default command fails. |
| `shutdownAction` | enum: `none`, `stopContainer` | [Optional] Defaults to `stopContainer`. Indicates whether VS Code should stop the container when the VS Code window is closed / shut down. |
| `devPort` | integer | [Optional] Defaults to a random, available port. Allows you to force a specific port that the VS Code Remote server should use in the container. |

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

After making edits, you can run the **Remote-Containers: Reopen Folder in Container** or **Remote-Containers: Rebuild Container** commands to try things out. Once the container has been created, the local filesystem will be automatically mapped into the container and you can start working with it from VS Code.

### Using Docker Compose

In some cases, a single container environment simply doesn't cut it. Fortunately, VS Code Remote also works with multi-container configurations that are managed by  `docker-compose.yml`. You can either:

1. Reuse an existing `docker-compose.yml` unmodified.
2. [Extend your existing Docker Compose configuration](#extending-your-docker-compose-file-for-development) for development.
3. Use the command line (e.g. `docker-compose up`) and [attach to an already running container](#attaching-to-running-containers).

> **Note:**  Alpine and Windows based containers are not currently supported.

VS Code can be configured to **automatically start any needed containers** for a particular service in a Docker Compose file (if they are not already running). This gives your multi-container workflow the same quick setup advantages described for the Docker image and Dockerfile flows above. However, since you may want to use some of the containers after you shut down VS Code, VS Code does not attempt to shut them down automatically.

To reuse `docker-compose.yml` unmodified, just create a `.devcontainer/devcontainer.json` with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `dockerComposeFile` | string  or array | Required. Path or an ordered list of paths to Docker Compose files relative to the `devcontainer.json` file. |
| `service` | string | Required. The name of the service you want to work on. |
| `workspaceFolder` | string | [Optional] Defaults to `"/"`. Sets the default path that VS Code should open when connecting to the container (which is often the path to a volume mount where the source code can be found in the container.)  |
| `name` | string | [Optional] A display name for the container. |
| `extensions` | array | [Optional] Defaults to `[]`. An array of extension IDs that specify the extensions that should be installed inside the container when it is created. |
| `shutdownAction` | enum: `none`, `stopCompose` | [Optional] Defaults to `none`. Indicates whether VS Code should execute `docker-compose stop` when the VS Code window is closed / shut down. |
| `devPort` | integer | [Optional] Defaults to a random, available port. Allows you to force a specific port that the VS Code Remote server should use in the container. |

Foe example:

```json
{
    "name": "[Optional] Your project name here",
    "dockerComposeFile": "../docker-compose.yml",
    "service": "the-name-of-the-service-you-want-to-work-with-in-vscode",
    "workspaceFolder": "/default/workspace/path/in/container/to/open",
    "shutdownAction": "stopCompose"
}
```

After making edits, you can run the **Remote-Containers: Reopen Folder in Container** or **Remote-Containers: Rebuild Container** commands to try things out. Once the container has been created, the local filesystem will be automatically mapped into the container and you can start working with it from VS Code.

### Extending your Docker Compose file for development

Referencing an existing deployment / non-development focused `docker-compose.yml` has some potential downsides. For example:

- Docker Compose will shut down a container if its entry point shuts down. This is problematic for situations where you are debugging and need to restart your app on a repeated basis.
- You also may not be mapping the local filesystem into the container or exposing ports to other resources like databases you want to access.
- You may be using an Alpine based image in your production configuration. (VS Code Remote - Containers does not currently support Alpine Linux).

You can solve these and other issues like them by extending your entire Docker Compose configuration with [multiple `docker-compose.yml` files](https://docs.docker.com/compose/extends/#multiple-compose-files) that override or supplement your primary one.

For example, consider this additional `.devcontainer/docker-compose.yml` file:

```yaml
version: '3'
  services:
    your-service-name-here:
      # Mounts the project folder to '/workspace'. The target path inside the container
      # should match should match what your application expects. In this case, the
      # compose file is in a sub-folder, so we will mount '..'. We'll then reference this
      # as the workspaceFolder in '.devcontainer/devcontainer.json' so VS Code starts here.
      volumes:
        - ..:/workspace

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

You may want to install other tools like `git` inside the container for the service you've specified. You can easily [do this manually](#installing-additional-software-in-the-sandbox). However, you can also create a custom `Dockerfile` specifically for development that includes these dependencies. The **[vscode-dev-containers repository](https://github.com/Microsoft/vscode-dev-containers)** contains a number of examples you can use to augment a copy of a Dockerfile or when creating a new one.

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

### Stopping containers with Docker Compose

Since you may want to use some of the containers after you shut down VS Code, VS Code does **not** attempt to shut them down automatically by default. You can change this behavior by adding `"shutdownAction": "stopCompose` to `devcontainer.json`.  Otherwise, you can use `docker-compose stop` to stop any running containers after you've shut down VS Code.

> **Note:** The VS Code Remote Server and any specified extensions will be injected whenever a container is created. Therefore, you can save yourself time by using `docker-compose stop` instead of `down` to stop (but not destroy) the containers.

### Docker Compose samples

The following are some examples to get you started:

- [Existing Docker Compose](https://aka.ms/vscode-remote/samples/existing-docker-compose) - Inlcudes a set of files that you can drop into an existing project that will reuse a `docker-compose.yml` file in the root of your project.

- [Node.js & MongoDB](https://aka.ms/vscode-remote/samples/node-mongo) -  A simple Node.js web server that connects to a Mongo DB in a different container.

- [Python & Redis](https://aka.ms/vscode-remote/samples/python-redis) - A simple Flask web app that connects to Redis in another container.

- [Docker-in-Docker Compose](https://aka.ms/vscode-remote/samples/docker-in-docker-compose) - Includes the Docker CLI and illustrates how you can use it to access your local Docker install from inside the a dev container by simply volume mounting the Docker unix socket.

## Working with Docker or Kubernetes from inside a container

While you can build, deploy, and debug your application right inside a dev container, you may also need to test it by running it inside a set of production-like containers. Fortunately, by installing the needed Docker or Kubernetes CLIs, you can build and deploy your app's container images from inside your dev container. Once the needed CLIs are in place, you can also work with the appropriate container cluster using the [Docker](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker) or [Kubernetes](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) extensions.

See the following examples dev containers for additional information:

- **[Docker-in-Docker](https://aka.ms/vscode-remote/samples/docker-in-docker)** - Includes the Docker CLI and illustrates how you can use it to access your local Docker install from inside the a dev container by simply volume mounting the Docker unix socket.

- **[Docker-in-Docker Compose](https://aka.ms/vscode-remote/samples/docker-in-docker-compose)** - Variation of Docker-in-Docker for situations where you are using Docker Compose instead of a single Dockerfile.

- **[Kubernetes-Helm](https://aka.ms/vscode-remote/samples/kubernetes-helm)** - Includes the Docker CLI, kubectl, and Helm and illustrates how you can use them from inside a dev container to access a local Minikube or Docker provided Kubernetes cluster.

## Known limitations

- Alpine Linux or Windows container images are not yet supported. Most images come with a Debian or Ubuntu based flavor you can use instead. (Typically Alpine variations end in `-alpine`).
- All roots/folders in a multi-root workspace will be opened in the same container, regardless of whether there are configuration files at lower levels.
- The unofficial Ubuntu Docker **snap** package for Linux is **not** supported. Follow the official Docker install instructions such as using the [convenience script](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-convenience-script).
- Local proxy settings are not reused inside the container which can prevent extensions from working unless the appropriate proxy information is configured (e.g. global `HTTP_PROXY` or `HTTPS_PROXY` environment variables with the appropriate proxy information).
- See [here for a list of active issues](https://aka.ms/vscode-remote/containers/issues) on GitHub that are tagged with Containers.

## Questions, Feedback, Contributing

### Common questions

#### I am seeing errors when trying to mount the local filesystem into a container, how do I fix this?

Right-click on the Docker task bar item and select Settings.  On Windows, go to the Shared Drives tab and check the drive(s) where your source code is located. On macOS, go the File Sharing tab and be sure the folder containing your source code is under a file path specified in the list.

#### I'm seeing an error about a missing library or dependency, how do I fix this?

Some extensions rely on libraries not found in the certain Docker images. See [above](#installing-additional-software-in-the-sandbox) for a few options to resolve the problem.

#### How can I connect to multiple containers?

Currently you can only connect to one container per VS Code window. However, you can spin up multiple containers and [attach to them](#attaching-to-running-containers) from different VS Code windows to work around this limitation.

#### The Docker / Kubernetes extension does not work when I am connected to a container. I also cannot build container images or deploy from my container. How can I fix this?

You can resolve these issue by forwarding the Docker socket and installing the Docker CLI (and kubectl for Kubernetes)in the container. See the [Docker-in-Docker](https://aka.ms/vscode-remote/samples/docker-in-docker), [Docker-in-Docker Compose](https://aka.ms/vscode-remote/samples/docker-in-docker-compose), and [Kubernetes-Helm](https://aka.ms/vscode-remote/samples/kubernetes-helm) dev container definitions for details.

#### Can I access remote containers?

If you are remotely running your containers in Docker, you can configure your local `docker` command to connect to the remote machine. However, you'll want to take care in ensuring you're authenticating your connection. This approach is also generally not recommended outside of development environments. You can [read this article](https://www.kevinkuszyk.com/2016/11/28/connect-your-docker-client-to-a-remote-docker-host/) for information on setting this up.

#### What are the connectivity requirements for the VS Code Remote Server when it is running in a container?

The VS Code Remote Server requires outbound HTTPS (port 443) connectivity to `update.code.visualstudio.com` and `marketplace.visualstudio.com`. All other communication between the server and the VS Code client is accomplished through an authenticated, random port automatically exposed via the Docker CLI.

#### As an extension author what do I need to do?

The VS Code extension API abstracts many extensions away from any changes so they work without modification. However, given extensions can use any node module or runtime they want, there are situations where adjustments may need to be made. We recommend you should test your extension to be sure that no update are required. See [Adding Remote Development Support to Extensions](/api/advanced-topics/remote-extensions.md) for details.

### More Questions, Feedback, Contributing

> **Dogfooding Note:**  When reporting issues, please file them against the https://github.com/Microsoft/vscode-remote/issues repository.

Have a question or feedback? There are many ways to interact with us.

- See the [FAQ](/docs/remote/faq.md) or the [troubleshooting guide](/docs/remote/troubleshooting.md#ssh-tips).
- Search for answers on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode).
- [Up-vote a feature or request a new one](https://aka.ms/vscode-remote/feature-requests), search [existing issues](https://aka.ms/vscode-remote/issues), or [report a problem](https://aka.ms/vscode-remote/issues/new)
- Contribute a [development container definition](https://aka.ms/vscode-dev-containers) for others to use.
- Contribute to [our documentation](https://github.com/Microsoft/vscode-docs) or [VS Code itself](https://github.com/Microsoft/vscode).
- ...and more. See our [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) guide for details.
