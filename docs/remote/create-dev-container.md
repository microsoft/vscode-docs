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

The **Visual Studio Code Remote - Containers** extension lets you use a [Docker container](https://docker.com) as a full-featured development environment. It allows you to open any folder or repository inside a container and take advantage of Visual Studio Code's full feature set. A `devcontainer.json` file in your project tells VS Code how to access (or create) a **development container** with a well-defined tool and runtime stack. This container can be used to run an application or to sandbox tools, libraries, or runtimes needed for working with a codebase.

## Path to creating a dev container

In this document, we'll take a look at the steps for creating a development container in VS Code:

1. Create a `devcontainer.json`, which describes how VS Code should start the container and what to do after it connects.
2. Make and persist changes to the dev container, such as installation of new software, through use of a Dockerfile.
3. Configure multiple containers through Docker Compose.
4. Throughout the configuration process, build your dev container to ensure changes are persisted.

After any of the above steps, you'll have a fully functioning dev container and can either continue to the next step of the doc to add more features, or stop there to work in the dev environment you currently have.

## Create a devcontainer.json file

VS Code's container configuration is stored in a [devcontainer.json](/docs/remote/devcontainerjson-reference.md) file. This file is similar to the `launch.json` file for debugging configurations, but is used for launching (or attaching to) your development container instead. The dev container configuration is either located under `.devcontainer/devcontainer.json` or stored as a `.devcontainer.json` file (note the dot-prefix) in the root of your project.

You can use an image as a starting point for your `devcontainer.json`. An image is like a mini-disk drive with various tools and an operating system pre-installed. Here is a simple example that uses a pre-built TypeScript and Node.js [VS Code Development Container image](https://hub.docker.com/_/microsoft-vscode-devcontainers):

```json
{
    "image": "mcr.microsoft.com/vscode/devcontainers/typescript-node:0-12"
}
```

Let's say you'd like to install the [eslint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) automatically into your container, and you'd also like to forward port 3000:

```json
{
    "image": "mcr.microsoft.com/vscode/devcontainers/typescript-node:0-12",
    "extensions": [
        "dbaeumer.vscode-eslint"
    ],
    "forwardPorts": [ 3000 ]
}
```

With this `devcontainer.json`, your dev container is functional, and you can connect to and start developing within it. Try it out with the **Remote-Containers: Reopen Folder in Container** command (or **Remote-Containers: Reopen in Container** if you're just working with a single app file).

![Quick pick with list of Remote-Containers commands](images\containers\Remote-Containers-Commands-Reopen.png)

With this command, you're now developing within a Node.js and TypeScript dev container with port 3000 forwarded and the eslint extension installed. Notice the green remote indicator updates to show you are connected to your dev container:

![VS Code instance connected to dev container](images\containers\connected-to-dev-container.png)

###  Install additional software

You may want to install additional software in your dev container. Once VS Code is connected to the container, you can open a VS Code terminal and execute any command against the OS inside the container. This allows you to install new command-line utilities and spin up databases or application services from inside the Linux container.

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

Let's say you want to install Git in our dev container:

```bash
# If sudo is installed and configured
sudo apt-get update
# Install Git
sudo apt-get install git
```

### Rebuilding

When editing the contents of the `.devcontainer` folder, you'll need to rebuild for them to take effect. Use the **Remote-Containers: Rebuild Container** command for your container to update.

However, if you **rebuild** the container, you will have to **reinstall** anything you've installed manually. To avoid this problem, you can use a series of commands in the `postCreateCommand` property in `devcontainer.json`:

```json
{
    "image": "mcr.microsoft.com/vscode/devcontainers/typescript-node:0-12",
    "extensions": [
        "dbaeumer.vscode-eslint"
    ],
    "forwardPorts": [ 3000 ],
    "postCreateCommand": "sudo apt-get update && sudo apt-get install git",
}
```

The `postCreateCommand` is run once the container is running, so you can also use the property to run commands like `npm install` or to execute a shell script in your source tree (if you have mounted it).

```json
"postCreateCommand": "bash scripts/install-dev-tools.sh"
```

Rather than referencing an image directly in `devcontainer.json` or installing software via the `postCreateCommand`, an even more robust practice to to use a Dockerfile.

## Dockerfile

Rather than referencing an image directly in `devcontainer.json`, you can reference a Dockerfile, which will also live in the `.devcontainer` folder. You can replace the `image` property in `devcontainer.json` with `dockerFile`:

```json
{
    "dockerFile": "Dockerfile",
    "extensions": [
        "dbaeumer.vscode-eslint"
    ],
    "forwardPorts": [ 3000 ]
}
```

When you make changes like installing new software, changes made in the Dockerfile will persist even upon a rebuild of the dev container.

Use `FROM` to designate the image, and the `RUN` [instruction](#using-an-image-or-dockerfile) to install any software. You can use `&&` to string together multiple commands.

```Dockerfile
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-12
RUN apt-get update && apt-get install git
```

Now that you have a `devcontainer.json` and Dockerfile, let's see the general process for editing container configuration files.

### Configuration edit loop

Editing your container configuration is easy. Since rebuilding a container will "reset" the container to its starting contents (with the exception of your local source code), VS Code does not automatically rebuild if you edit a container configuration file (`devcontainer.json`, `Dockerfile`, and `docker-compose.yml`, which we'll get to next). Instead, there are several commands that can be used to make editing your configuration easier.

Here is the typical edit loop using these commands:

![Container edit loop illustration](images/containers/container-edit-loop.png)

1. Start with **Remote-Containers: Add Development Container Configuration Files...** in the Command Palette (`kbstyle(F1)`).
2. Edit the contents of the `.devcontainer` folder as required.
3. Try it with **Remote-Containers: Reopen Folder in Container**.
4. If you see an error, click on **Open Folder Locally** in the dialog that appears.
5. After the window reloads, a copy of the **build log will appear** in the console so you can investigate the problem. Edit the contents of the `.devcontainer` folder as required. (You can also use the **Remote-Containers: Open Log File...** command to see the log again if you close it.)
6. Run **Remote-Containers: Rebuild and Reopen Folder in Container** and jump to step 4 if needed.

If you already have a successful build, you can still edit the contents of the `.devcontainer` folder as required when connected to the container and then select **Remote-Containers: Rebuild Container** in the Command Palette (`kbstyle(F1)`) so the changes take effect.

You can also iterate on your container when using the **Remote-Containers: Open Repository in Container** command.

1. Start with **Remote-Containers: Open Repository in Container** in the Command Palette (`kbstyle(F1)`). If the repository you enter does not have a `devcontainer.json` in it, you'll be asked to select a starting point.
2. Edit the contents of the `.devcontainer` folder as required.
3. Try it with **Remote-Containers: Rebuild Container**.
4. If you see an error, click on **Open in Recovery Container** in the dialog that appears.
5. Edit the contents of the `.devcontainer` folder as required in this "recovery container."
6. Use **Remote-Containers: Reopen in Container** and jump to step 4 if you still hit problems.

## Docker Compose

In some cases, a single container environment isn't sufficient. Let's say you'd like to add another complex component to your configuration, like a database. You could attempt to add it to the Dockerfile directly, or you could add it through an additional container using a [Docker Compose](https://docs.docker.com/compose/) multi-container configuration.

You'll update your `devcontainer.json` to reference a `docker-compose.yml`, along with the name of the `service` in your Docker Compose that VS Code should connect to once running.

You have several options for adding a Docker Compose file:

1. You can use the **Remote-Containers: Add Development Container Configuration Files...** command in the Command Palette (`kbstyle(F1)`).

![Select Docker Compose File](images/containers/select-docker-compose.png)

You'll be asked to either select an existing Docker Compose file (if one exists), or pick a pre-defined container configuration from the [vscode-dev-containers repository](https://github.com/microsoft/vscode-dev-containers) in a filterable list sorted based on your folder's contents. Many of these "dev container definitions" use a Dockerfile, so select one of these definitions for a starting point for Docker Compose: [Existing Docker Compose](https://aka.ms/vscode-remote/samples/existing-docker-compose), [Node.js & MongoDB](https://aka.ms/vscode-remote/samples/node-mongo), [Python & PostgreSQL](https://aka.ms/vscode-remote/samples/python-postgres), or [Docker-from-Docker Compose](https://aka.ms/vscode-remote/samples/docker-from-docker-compose). After you make your selection, VS Code will add the appropriate `.devcontainer/devcontainer.json` (or `.devcontainer.json`) file to the folder.

2. You can also create your configuration manually. To reuse a Docker Compose file unmodified, you can use the `dockerComposeFile` and `service` properties in `.devcontainer/devcontainer.json`.

Let's take a look at an example JavaScript and Node.js `devcontainer.json` and its accompanying Dockerfile and Docker-Compose:

```json
{
"name": "Node.js & PostgreSQL",
	"dockerComposeFile": "docker-compose.yml",
	"service": "web",
	"workspaceFolder": "/workspace",

	// Set *default* container specific settings.json values on container create.
	"settings": {
		"terminal.integrated.shell.linux": "/bin/bash",
		"sqltools.connections": [{
			"name": "Container database",
			"driver": "PostgreSQL",
			"previewLimit": 50,
			"server": "db",
			"port": 5432,
			"database": "postgres",
			"username": "postgres",
			"password": "LocalPassword",
		}]
	},

	// Add the IDs of extensions you want installed when the container is created.
	"extensions": [
		"dbaeumer.vscode-eslint",
		"mtxr.sqltools",
		"mtxr.sqltools-driver-pg"
	]
}
```

```Dockerfile
# Update the VARIANT arg in docker-compose.yml to pick a Node version: 10, 12, 14
ARG VARIANT=12
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}

# Update args in docker-compose.yaml to set the UID/GID of the "node" user.
ARG USER_UID=1000
ARG USER_GID=$USER_UID
RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then \
        groupmod --gid $USER_GID node \
        && usermod --uid $USER_UID --gid $USER_GID node \
        && chmod -R $USER_UID:$USER_GID /home/node \
        && chmod -R $USER_UID:root /usr/local/share/nvm /usr/local/share/npm-global; \
    fi
```

```yml
version: '3'
services:
  web:
    # Uncomment the next line to use a non-root user for all processes.
    # See https://aka.ms/vscode-remote/containers/non-root for details.
    # user: node

    build:
      context: .
      dockerfile: Dockerfile
      args:
        # Update VARIANT to pick a node version: 10, 12, 14
        VARIANT: 12
        # On Linux, you may need to update USER_UID and USER_GID below if not your local UID is not 1000.
        USER_UID: 1000
        USER_GID: 1000

    # Use "ports" to publish your web port locally. Consider "forwardPorts" in
    # devcontainer.json instead if your app only allows connections from localhost.
    # ports:
    #   - 3000:3000

    volumes:
      - ..:/workspace:cached

    # Overrides default command so things don't shut down after the process ends.
    command: sleep infinity

    links:
      - db

  # Note: The PostgreSQL host name is "db", not "localhost"
  db:
    image: postgres
    restart: unless-stopped
    environment:
      POSTGRES_PASSWORD: LocalPassword
      POSTGRES_USER: postgres
      POSTGRES_DB: postgres

    # Uncomment to allow access to PostgreSQL from external tools
    # ports:
    #  - 5432:5432
```

See the [devcontainer.json reference](/docs/remote/devcontainerjson-reference.md) for information other available properties when working with Docker Compose, such as the `workspaceFolder` and `shutdownAction`.

The `service` property indicates which service in your Docker Compose file VS Code should connect to, not which service should be started. If you started them by hand, VS Code will attach to the service you specified.

To avoid having the container shut down if the default container command fails or exits, you can modify your Docker Compose file for the service you have specified in `devcontainer.json` as follows:

```yaml
# Overrides default command so things don't shut down after the process ends.
command: /bin/sh -c "while sleep 1000; do :; done"
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

### Docker Compose dev container definitions

The following are dev container definitions that use Docker Compose:

* [Existing Docker Compose](https://aka.ms/vscode-remote/samples/existing-docker-compose) - Includes a set of files that you can drop into an existing project that will reuse a `docker-compose.yml` file in the root of your project.
* [Node.js & MongoDB](https://aka.ms/vscode-remote/samples/node-mongo) -  A Node.js container that connects to a Mongo DB in a different container.
* [Python & PostgreSQL](https://aka.ms/vscode-remote/samples/python-postgres) -  A Python container that connects to PostGreSQL in a different container.
* [Docker-from-Docker Compose](https://aka.ms/vscode-remote/samples/docker-from-docker-compose) - Includes the Docker CLI and illustrates how you can use it to access your local Docker install from inside a dev container by volume mounting the Docker Unix socket.

Congratulations! You've now configured a dev container in Visual Studio Code. Continue reading to learn how to share container configurations among teammates and various projects.

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

### Preconfigured `devcontainer.json`

Selecting the **Remote-Containers: Add Development Container Configuration Files...** command from the Command Palette (`kbstyle(F1)`) will add the needed files to your project as a starting point, which you can further customize for your needs.

The command lets you pick a pre-defined container configuration from a list based on your folder's contents:

![Add a dev container definition](images/containers/select-dev-container-def-all.png)

All of the predefined container configurations you can pick from come from the [vscode-dev-containers repository](https://aka.ms/vscode-dev-containers), which has examples of `devcontainer.json` for different scenarios.

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

## Next steps

* [Attach to a Running Container](/docs/remote/attach-container.md) - Attach to an already running Docker container.
* [Advanced Containers](/docs/remote/containers-advanced.md) - Find solutions to advanced container scenarios.
* [devcontainer.json reference](/docs/remote/devcontainerjson-reference.md) - Review the `devcontainer.json` schema.