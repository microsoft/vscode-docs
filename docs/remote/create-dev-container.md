---
Order: 10
Area: remote
TOCTitle: Create a Dev Container
PageTitle: Create a development container using Visual Studio Code Remote Development
ContentId: bae55561-1032-40d4-b6a6-47054da96098
MetaDescription: Create a development container using Visual Studio Code Remote Development
DateApproved: 8/13/2020
---
# Create a development container

The **Visual Studio Code Remote - Containers** extension lets you use a [Docker container](https://docker.com) as a full-featured development environment. It allows you to open any folder inside (or mounted into) a container and take advantage of Visual Studio Code's full feature set. A `devcontainer.json` file in your project tells VS Code how to access (or create) a **development container** with a well-defined tool and runtime stack. This container can be used to run an application or to sandbox tools, libraries, or runtimes needed for working with a codebase.

## Create a devcontainer.json file

VS Code's container configuration is stored in a [devcontainer.json](/docs/remote/devcontainerjson-reference.md) file. This file is similar to the `launch.json` file for debugging configurations, but is used for launching (or attaching to) your development container instead. You can also specify any extensions to install once the container is running or post-create commands to prepare the environment. The dev container configuration is either located under `.devcontainer/devcontainer.json` or stored as a `.devcontainer.json` file (note the dot-prefix) in the root of your project.

You can use any image, Dockerfile, or set of Docker Compose files as a starting point. Here is a simple example that uses one of the pre-built [VS Code Development Container images](https://hub.docker.com/_/microsoft-vscode-devcontainers):

```json
{
    "image": "mcr.microsoft.com/vscode/devcontainers/typescript-node:0-12",
    "forwardPorts": [ 3000 ],
    "extensions": [
        "dbaeumer.vscode-eslint"
    ]
}
```

Selecting the **Remote-Containers: Add Development Container Configuration Files...** command from the Command Palette (`kbstyle(F1)`) will add the needed files to your project as a starting point, which you can further customize for your needs.

The command lets you pick a pre-defined container configuration from a list based on your folder's contents:

![Add a dev container definition](images/containers/select-dev-container-def-all.png)

Or reuse an existing Dockerfile:

![Add a dev container definition](images/containers/select-dockerfile.png)

Or reuse an existing Docker Compose file:

![Add a dev container definition](images/containers/select-docker-compose.png)

For example, through a `devcontainer.json` file, you can:

* Spin up a [stand-alone "sandbox" container](#set-up-a-folder-to-run-in-a-container) to isolate your toolchain or speed up setup.
* Work with a container deployed application defined by an [image, Dockerfile](#using-an-image-or-dockerfile), or [Docker Compose](#using-docker-compose).
* [Use Docker or Kubernetes](/docs/remote/containers-advanced.md#using-docker-or-kubernetes-from-a-container) from inside a dev container to build and deploy your app.

All of the predefined container configurations you can pick from come from the [vscode-dev-containers repository](https://aka.ms/vscode-dev-containers), which has examples of `devcontainer.json` for different scenarios. You can [alter your configuration](#set-up-a-folder-to-run-in-a-container) to:

* Install additional tools such as Git in the container.
* Automatically install extensions.
* Forward or publish additional ports.
* Set runtime arguments.
* Reuse or [extend your existing Docker Compose setup](https://aka.ms/vscode-remote/containers/docker-compose/extend).
* And more [advanced container configurations](/docs/remote/containers-advanced.md).

If `devcontainer.json`'s supported workflows do not meet your needs, you can also [attach to an already running container instead](/docs/remote/attach-container.md).

> **Tip:** Want to use a remote Docker host? See the [Advanced Containers article](/docs/remote/containers-advanced.md#developing-inside-a-container-on-a-remote-docker-host) for details on setup.

### Configuration edit loop

Editing your container configuration is easy. Since rebuilding a container will "reset" the container to its starting contents (with the exception of your local source code), VS Code does not automatically rebuild if you edit a container configuration file (`devcontainer.json`, `Dockerfile`, `docker-compose.yml`). Instead, there are several commands that can be used to make editing your configuration easier.

Here is the typical edit loop using these commands:

![Container edit loop illustration](images/containers/container-edit-loop.png)

1. Start with **Remote-Containers: Add Development Container Configuration Files...** in the Command Palette (`kbstyle(F1)`).
2. Edit the contents of the `.devcontainer` folder as required.
3. Try it with **Remote-Containers: Reopen Folder in Container**.
4. If you see an error, click on **Open Folder Locally** in the dialog that appears.
5. After the window reloads, a copy of the **build log will appear** in the so you can investigate the problem. Edit the contents of the `.devcontainer` folder as required. (You can also use the **Remote-Containers: Open Log File...** command to see the log again if you close it.)
6. Run **Remote-Containers: Rebuild and Reopen Folder in Container** and jump to step 4 if needed.

If you already have a successful build, you can still edit the contents of the `.devcontainer` folder as required when connected to the container and then select **Remote-Containers: Rebuild Container** in the Command Palette (`kbstyle(F1)`) so the changes take effect.

You can also iterate on your container when using the **Remote-Containers: Open Repository in Container** command.

1. Start with **Remote-Containers: Open Repository in Container** in the Command Palette (`kbstyle(F1)`). If the repository you enter does not have a `devcontainer.json` in it, you'll be asked to select a starting point.
2. Edit the contents of the `.devcontainer` folder as required.
3. Try it with **Remote-Containers: Rebuild Container**.
4. If you see an error, click on **Open in Recovery Container** in the dialog that appears.
5. Edit the contents of the `.devcontainer` folder as required in this "recovery container."
6. Use **Remote-Containers: Reopen in Container** and jump to step 4 if you still hit problems.

## Add configuration files to public or private repositories

You can easily share a customized dev container definition for your project by adding `devcontainer.json` files to source control. By including these files in your repository, anyone that opens a local copy of your repo in VS Code will be automatically prompted to reopen the folder in a container, provided they have the Remote - Containers extension installed.

![Dev config file reopen notification](images/containers/dev-container-reopen-prompt.png)

Beyond the advantages of having your team use a consistent environment and tool-chain, this also makes it easier for new contributors or team members to be productive quickly. First-time contributors will require less guidance and hit fewer issues related to environment setup.

**Alternative: Repository configuration folders**

In some cases, you may want to create a configuration for a repository that you do not control or that you would prefer didn't have a configuration included in the repository itself. To handle this situation, you can configure a location on your local filesystem to store configuration files that will be picked up automatically based on the repository.

First, update the **Remote > Containers: Repository Configuration Paths** [User setting](/docs/getstarted/settings.md) with the local folder you want to use to store your repository container configuration files.

In the Settings editor:

![Repository container folders setting](images/containers/repo-container-folder-setting.png)

Next, place your `.devcontainer/devcontainer.json` (and related files) in a sub folder that mirrors the remote location of the repository. For example, if we wanted to create a configuration for `github.com/microsoft/vscode-dev-containers`, we would create the following:

```text
📁 github.com
    📁 microsoft
        📁 vscode-dev-containers
           📁 .devcontainer
```

Once in place, the configuration will be automatically picked up when using any of the remote containers commands. Once in the container, you can also select **Remote-Containers: Open Container Configuration File** from the Command Palette (`kbstyle(F1)`) to open the related `devcontainer.json` file and make further edits.

## Set up a folder to run in a container

There are a few different ways VS Code Remote - Containers can be used to develop an application inside a fully containerized environment. In general, there are two primary scenarios that drive interest in this development style:

* **Stand-Alone Dev Sandboxes:** You may not be deploying your application into a containerized environment but still want to isolate your build and runtime environment from your local OS, speed up setup, or develop in an environment that is more representative of production. For example, you may be running code on your local macOS or Windows machine that will ultimately be deployed to a Linux VM or server, have different toolchain requirements for multiple projects, or want to be able to use tools/packages that could impact your local machine in an unexpected or undesired way. You can reference a container [image or a Dockerfile](#using-an-image-or-dockerfile) for this purpose.

* **Container Deployed Applications**: You deploy your application into one or more containers and would like to work locally in the containerized environment. VS Code currently supports working with container-based applications defined in a number of ways:

  * [Dockerfile](#using-an-image-or-dockerfile): You are working on a single container / service that is described using a single Dockerfile.

  * [Docker Compose](#using-docker-compose): You are working with multiple orchestrated services that are described using a `docker-compose.yml` file.

  * In each case, you may also need to [build container images and deploy to Docker or Kubernetes](/docs/remote/containers-advanced.md#using-docker-or-kubernetes-from-a-container) from inside your container.

  * [Attach only](/docs/remote/attach-container.md): While not backed by `devcontainer.json`, you can attach to an already running container if none of the workflows described in this section meet your needs.

This section will walk you through configuring your project for each of these situations. The [vscode-dev-containers GitHub repository](https://aka.ms/vscode-dev-containers) also contains dev container definitions to get you up and running quickly.

### Using an image or Dockerfile

You can configure VS Code to reuse an existing image from a source like [DockerHub](https://hub.docker.com) or [Azure Container Registry](https://azure.microsoft.com/services/container-registry/) for your dev container by adding a `.devcontainer/devcontainer.json` (or `.devcontainer.json`) config file to your project. In addition, if you are not able to find an image that meets your needs, have a single container-based project, or just want to automate the installation of several additional dependencies, you can use a [Dockerfile](https://docs.docker.com/engine/reference/builder/) to generate the image instead.

To get started quickly, **open the folder** you want to work with in VS Code and run the **Remote-Containers: Add Development Container Configuration Files...** command in the Command Palette (`kbstyle(F1)`).

![Select Dockerfile](images/containers/select-dockerfile.png)

You'll be asked to either select an existing Dockerfile (if one exists), or pick a pre-defined container configuration from the [vscode-dev-containers repository](https://github.com/microsoft/vscode-dev-containers) in a filterable list automatically sorted based on your folder's contents. VS Code will then add `devcontainer.json` and any other required files to the folder. While most of these pre-defined "dev container definitions" include a Dockerfile, you can use them as a starting point for an image instead if you prefer.

> **Note:** When using Alpine Linux containers, some extensions may not work due to `glibc` dependencies in native code inside the extension.

You can also create your configuration manually. The difference between configuring VS Code to build a container image using a Dockerfile or just reuse an exiting image is a single property in `devcontainer.json`:

* **To use an image:**  Set the `image` property. For example, this will use the JavaScript and Node.js 12 pre-built [VS Code Development Container image](https://hub.docker.com/_/microsoft-vscode-devcontainers), forward port 3000, install the ES Lint extension, and run `npm install` when done:

    ```json
    {
        "name": "My Project",
        "image": "mcr.microsoft.com/vscode/devcontainers/javascript-node:0-12",
        "forwardPorts": [3000],
        "extensions": [
            "dbaeumer.vscode-eslint"
        ],
        "postCreateCommand": "npm install"
    }
    ```

* **To use a Dockerfile:** Set the `dockerFile` property. For example, this will cause VS Code to build the dev container image using the specified `Dockerfile`, forward port 5000, install the C# extension in the container:

    ```json
    {
        "name": "My Node.js App",
        "dockerFile": "Dockerfile",
        "forwardPorts": [5000],
        "extensions": [
            "ms-dotnettools.csharp"
        ]
    }
    ```

See the [devcontainer.json reference](/docs/remote/devcontainerjson-reference.md) for information on other available properties such as `forwardPorts`, `postCreateCommand`, and the `extensions` list.

Once you have added a `.devcontainer/devcontainer.json` file to your folder, run the **Remote-Containers: Reopen Folder in Container** command (or **Remote-Containers: Open Folder in Container...** if you are not yet in VS Code)  from the Command Palette (`kbstyle(F1)`). After the container is created, the **local filesystem is automatically "bind" mount into the container**, unless you [change this behavior](/docs/remote/containers-advanced.md#changing-the-default-source-code-mount), and you can start working with it from VS Code.

However, on Linux, you may need to set up and **specify a non-root user** when using a bind mount or any files you create will be root.  All of the configuration files and images the extension ships with include a non-root user you can specify. See [Adding a non-root user to your dev container](/docs/remote/containers-advanced.md#adding-a-nonroot-user-to-your-dev-container) for details.

```yaml
# Change user for VS Code and sub-processes (terminals, tasks, debugging)
"remoteUser": "your-user-name-here",
# Or change the user for all container processes
"containerUser": "your-user-name-here"
```

You can also add **additional local mount points** to give your container access to other locations using the `mounts` property.

For example, you can mount your home / user profile folder:

```json
"mounts": [
    "source=${localEnv:HOME}${localEnv:USERPROFILE},target=/host-home-folder,type=bind,consistency=cached"
]
```

You can also reference `"${localWorkspaceFolder}` if you need to mount something from the local filesystem into the container.

The `runArgs` property supports the same list of arguments as the [docker run](https://docs.docker.com/engine/reference/commandline/run/) command and can be useful for a wide variety of scenarios including [setting environment variables](/docs/remote/containers-advanced.md#adding-environment-variables).

If your application was built using C++, Go, or Rust, or another language that uses a **ptrace-based debugger**, the `runArgs` property can also be used to configure needed runtime security and capability settings.

For example:

```json
{
    "name": "My Go App",
    "dockerFile": "Dockerfile",
    "extensions": [
        "golang.go"
    ],
    "runArgs": [
        "--cap-add=SYS_PTRACE",
        "--security-opt",
        "seccomp=unconfined"
    ]
}
```

While less efficient than a custom Dockerfile, you can also use the `postCreateCommand` property to **install additional software** that **may not be in your base image** or for cases where you would prefer **not to modify a deployment Dockerfile** you are reusing.

For example, here is a `devcontainer.json` that adds compiler tools and the [C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) extension to the base Ubuntu 18.04 container image:

```json
{
    "image": "ubuntu:18.04",
    "extensions": [
        "ms-vscode.cpptools"
    ],
    "postCreateCommand": "apt-get update && apt-get install -y build-essential cmake cppcheck valgrind"
}
```

See [installing additional software](#install-additional-software) for more information on using `apt-get` to install software.

This command is run once your source code is mounted, so you can also use the property to run commands like `npm install` or to execute a shell script in your source tree.

```json
"postCreateCommand": "bash scripts/install-dev-tools.sh"
```

By default, when VS Code starts a container, it will **override the container's default command** to be `/bin/sh -c "while sleep 1000; do :; done"`. This is done because the container will stop if the default command fails or exits. However, this may not work for certain images. If the image you are using requires the default command be run to work properly, add the following to your `devcontainer.json` file.

```json
"overrideCommand": false
```

After you create your container for the first time, you will need to run the **Remote-Containers: Rebuild Container** command for updates to `devcontainer.json` or your Dockerfile to take effect.

## Install additional software

Once VS Code is connected to the container, you can open a VS Code terminal and execute any command against the OS inside the container. This allows you to install new command-line utilities and spin up databases or application services from inside the Linux container.

Most container images are based on Debian or Ubuntu, where the `apt` or `apt-get` command is used to install new packages. You can learn more about the command [in Ubuntu's documentation](https://help.ubuntu.com/lts/serverguide/apt.html). Alpine images include a [similar `apk` command](https://wiki.alpinelinux.org/wiki/Alpine_Linux_package_management) while CentOS / RHEL / Oracle SE / Fedora images [use `yum`](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/deployment_guide/ch-yum) or [more recently `dnf`](https://fedoraproject.org/wiki/DNF?rd=Dnf).

Documentation for the software you want to install will usually provide specific instructions, but you may not need to prefix commands with `sudo` if you are running as root in the container.

For example:

```bash
# If running as root
apt-get update
apt-get install <package>
```

If you are running as root, you can install software as long as `sudo` is configured in your container. All predefined containers have `sudo` set up, but the [Advanced Container Configuration](/docs/remote/containers-advanced.md#adding-a-nonroot-user-to-your-dev-container) article can help you set this up for your own containers. Regardless, if you install and configure `sudo` you'll be able to use it when running as any user including root.

```bash
# If sudo is installed and configured
sudo apt-get update
sudo apt-get install <package>
```

However, if you **rebuild** the container, you will have to **reinstall** anything you've installed manually. To avoid this problem, you can either use a series of commands in the `postCreateCommand` property in `devcontainer.json` or the `RUN` instruction [in a custom Dockerfile](#using-an-image-or-dockerfile). You can use `&&` to string together multiple commands.

Using a Dockerfile:

```Dockerfile
RUN apt-get update && apt-get install <packaging>
```

Using `devcontainer.json`:

```json
"postCreateCommand": "apt-get update && apt-get install <package>"
```

Or if running as a [non-root user](/docs/remote/containers-advanced.md#adding-a-nonroot-user-to-your-dev-container):

```json
"postCreateCommand": "sudo apt-get update && sudo apt-get install <package>"
```

The `postCreateCommand` is run once the container is running, so you can also use the property to run commands like `npm install` or to execute a shell script in your source tree (if you have mounted it).

```json
"postCreateCommand": "bash scripts/install-dev-tools.sh"
```

## Using Docker Compose

In some cases, a single container environment isn't sufficient. Fortunately, Remote - Containers supports [Docker Compose](https://docs.docker.com/compose/) managed multi-container configurations.

You can either:

1. Work with a service defined in an existing, unmodified `docker-compose.yml`.
2. Create a new `docker-compose.yml` (or make a copy of an existing one) that you use to develop a service.
3. [Extend your existing Docker Compose configuration](#extend-your-docker-compose-file-for-development) to develop the service.
4. Use separate VS Code windows to [work with multiple Docker Compose-defined services](/docs/remote/containers-advanced.md#connecting-to-multiple-containers-at-once) at once.

> **Note:** When using Alpine Linux containers, some extensions may not work due to `glibc` dependencies in native code inside the extension.

VS Code can be configured to **automatically start any needed containers** for a particular service in a Docker Compose file. If you've already started the configured containers using the command line, VS Code will **attach to the running service** you've specified instead. This gives your multi-container workflow the same quick setup advantages described for the Docker image and Dockerfile flows above while still allowing you to use the command line if you prefer.

To get started quickly, **open the folder** you want to work with in VS Code and run the **Remote-Containers: Add Development Container Configuration Files...** command in the Command Palette (`kbstyle(F1)`).

![Select Docker Compose File](images/containers/select-docker-compose.png)

You'll be asked to either select an existing Docker Compose file (if one exists), or pick a pre-defined container configuration from the [vscode-dev-containers repository](https://github.com/microsoft/vscode-dev-containers) in a filterable list sorted based on your folder's contents. Many of these "dev container definitions" use a Dockerfile, so select one of these definitions for a starting point for Docker Compose: [Existing Docker Compose](https://aka.ms/vscode-remote/samples/existing-docker-compose), [Node.js & MongoDB](https://aka.ms/vscode-remote/samples/node-mongo), [Python & PostgreSQL](https://aka.ms/vscode-remote/samples/python-postgres), or [Docker-from-Docker Compose](https://aka.ms/vscode-remote/samples/docker-from-docker-compose). After you make your selection, VS Code will add the appropriate `.devcontainer/devcontainer.json` (or `.devcontainer.json`) file to the folder.

You can also create your configuration manually. To reuse a Docker Compose file unmodified, you can use the `dockerComposeFile` and `service` properties in `.devcontainer/devcontainer.json`.

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

See the [devcontainer.json reference](/docs/remote/devcontainerjson-reference.md) for information other available properties such as the `workspaceFolder` and `shutdownAction`.

Once you have added a `.devcontainer/devcontainer.json` file to your folder, run the **Remote-Containers: Reopen Folder in Container** command (or **Remote-Containers: Open Folder in Container...** if you are not yet in VS Code) from the Command Palette (`kbstyle(F1)`).

If the containers are not already running, VS Code will call `docker-compose -f ../docker-compose.yml up` in this example. The `service` property indicates which service in your Docker Compose file VS Code should connect to, not which service should be started. If you started them by hand, VS Code will attach to the service you specified.

You can also create a development copy of your Docker Compose file. For example, if you had `.devcontainer/docker-compose.devcontainer.yml`, you would just change the following line in `devcontainer.json`:

```json
"dockerComposeFile": "docker-compose.devcontainer.yml"
```

However, a better approach is often to avoid making a copy of your Docker Compose file by **extending it with another one**. We'll cover [extend a Docker Compose file](#extend-your-docker-compose-file-for-development) in the next section.

To avoid having the container shut down if the default container command fails or exits, you can modify your Docker Compose file for the service you have specified in `devcontainer.json` as follows:

```yaml
# Overrides default command so things don't shut down after the process ends.
command: /bin/sh -c "while sleep 1000; do :; done"
```

If you have not done so already, you can **"bind" mount your local source code** into the container using the [volumes list in your Docker Compose file](https://docs.docker.com/compose/compose-file/#volumes).

For example:

```yaml
volumes:
  # Mounts the project folder to '/workspace'. The target path inside the container
  # should match what your application expects. In this case, the compose file is
  # in a sub-folder, so we will mount '..'. You would then reference this path as the
  # 'workspaceFolder' in '.devcontainer/devcontainer.json' so VS Code starts here.
  - ..:/workspace:cached
```

However, on Linux you may need to set up and **specify a non-root user** when using a bind mount or any files you create will be root. See [Adding a non-root user to your dev container](/docs/remote/containers-advanced.md#adding-a-nonroot-user-to-your-dev-container) for details. To have VS Code run as a different user, add this to `devcontainer.json`:

```json
"remoteUser": "your-user-name-here"
```

If you want all processes to run as a different user, add this to the appropriate service in your Docker Compose file:

```yaml
user: your-user-name-here
```

If you aren't creating a custom Dockerfile for development, you may want to install additional developer tools such as `curl` inside the service's container. While less efficient than adding these tools to the container image, you can also use the `postCreateCommand` property for this purpose.

```json
"postCreateCommand": "apt-get update && apt-get install -y curl"
```

Or if running as a non-root user and `sudo` is installed in the container:

```json
"postCreateCommand": "sudo apt-get update && sudo apt-get install -y curl"
```

See [installing additional software](#install-additional-software) for more information on using `apt-get` to install software.

If your application was built using C++, Go, or Rust, or another language that uses a ptrace-based debugger, you will also need to add the following settings to your Docker Compose file:

```yaml
# Required for ptrace-based debuggers like C++, Go, and Rust
cap_add:
- SYS_PTRACE
security_opt:
- seccomp:unconfined
```

After you create your container for the first time, you will need to run the **Remote-Containers: Rebuild Container** command for updates to `devcontainer.json`, your Docker Compose files, or related Dockerfiles to take effect.

### Extend your Docker Compose file for development

Referencing an existing deployment / non-development focused `docker-compose.yml` has some potential downsides.

For example:

* Docker Compose will shut down a container if its entry point shuts down. This is problematic for situations where you are debugging and need to restart your app on a repeated basis.
* You also may not be mapping the local filesystem into the container or exposing ports to other resources like databases you want to access.
* You may want to copy the contents of your local `.ssh` folder into the container or set the ptrace options described above in [Using Docker Compose](#using-docker-compose).

You can solve these and other issues like them by extending your entire Docker Compose configuration with [multiple `docker-compose.yml` files](https://docs.docker.com/compose/extends/#multiple-compose-files) that override or supplement your primary one.

For example, consider this additional `.devcontainer/docker-compose.extend.yml` file:

```yaml
version: '3'
services:
  your-service-name-here:
    volumes:
      # Mounts the project folder to '/workspace'. While this file is in .devcontainer,
      # mounts are relative to the first file in the list, which is a level up.
      - .:/workspace:cached

    # [Optional] Required for ptrace-based debuggers like C++, Go, and Rust
    cap_add:
      - SYS_PTRACE
    security_opt:
      - seccomp:unconfined

    # Overrides default command so things don't shut down after the process ends.
    command: /bin/sh -c "while sleep 1000; do :; done"
```

This same file can provide additional settings, such as port mappings, as needed. To use it, reference your original `docker-compose.yml` file in addition to `.devcontainer/devcontainer.extend.yml` in a specific order:

```json
{
    "name": "[Optional] Your project name here",

    // The order of the files is important since later files override previous ones
    "dockerComposeFile": [
        "../docker-compose.yml",
        "docker-compose.extend.yml"
    ],

    "service": "your-service-name-here",
    "workspaceFolder": "/workspace",
    "shutdownAction": "stopCompose"

}
```

VS Code will then **automatically use both files** when starting up any containers. You can also start them yourself from the command line as follows:

```bash
docker-compose -f docker-compose.yml -f .devcontainer/docker-compose.extend.yml up
```

While the `postCreateCommand` property allows you to install additional tools inside your container, in some cases you may want to have a specific Dockerfile for development. You can also use this same approach to reference a custom `Dockerfile` specifically for development without modifying your existing Docker Compose file.  For example, you can update `.devcontainer/devcontainer.extend.yml` as follows:

```yaml
version: '3'
services:
  your-service-name-here:
      # Note that the path of the Dockerfile and context is relative to the *primary*
      # docker-compose.yml file (the first in the devcontainer.json "dockerComposeFile"
      # array). The sample below assumes your primary file is in the root of your project.
      build:
        context: .
        dockerfile: .devcontainer/Dockerfile
      volumes:
        - .:/workspace:cached
      command: /bin/sh -c "while sleep 1000; do :; done"
```

### Docker Compose dev container definitions

The following are dev container definitions that use Docker Compose:

* [Existing Docker Compose](https://aka.ms/vscode-remote/samples/existing-docker-compose) - Includes a set of files that you can drop into an existing project that will reuse a `docker-compose.yml` file in the root of your project.
* [Node.js & MongoDB](https://aka.ms/vscode-remote/samples/node-mongo) -  A Node.js container that connects to a Mongo DB in a different container.
* [Python & PostgreSQL](https://aka.ms/vscode-remote/samples/python-postgres) -  A Python container that connects to PostGreSQL in a different container.
* [Docker-from-Docker Compose](https://aka.ms/vscode-remote/samples/docker-from-docker-compose) - Includes the Docker CLI and illustrates how you can use it to access your local Docker install from inside a dev container by volume mounting the Docker Unix socket.

## Next steps

* [Attach to a Running Container](/docs/remote/attach-container.md) - Attach to an already running Docker container.
* [Advanced Containers](/docs/remote/containers-advanced.md) - Find solutions to advanced container scenarios.
* [devcontainer.json reference](/docs/remote/devcontainerjson-reference.md) - Review the `devcontainer.json` schema.
