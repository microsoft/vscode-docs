****** Extra

You can either:

1. Work with a service defined in an existing, unmodified `docker-compose.yml`.
2. Create a new `docker-compose.yml` (or make a copy of an existing one) that you use to develop a service.
3. [Extend your existing Docker Compose configuration](#extend-your-docker-compose-file-for-development) to develop the service.
4. Use separate VS Code windows to [work with multiple Docker Compose-defined services](/docs/remote/containers-advanced.md#connecting-to-multiple-containers-at-once) at once.

> **Note:** When using Alpine Linux containers, some extensions may not work due to `glibc` dependencies in native code inside the extension.

VS Code can be configured to **automatically start any needed containers** for a particular service in a Docker Compose file. If you've already started the configured containers using the command line, VS Code will **attach to the running service** you've specified instead. This gives your multi-container workflow the same quick setup advantages described for the Docker image and Dockerfile flows above while still allowing you to use the command line if you prefer.

If the containers are not already running, VS Code will call `docker-compose -f ../docker-compose.yml up` in this example.

You can also create a development copy of your Docker Compose file. For example, if you had `.devcontainer/docker-compose.devcontainer.yml`, you would just change the following line in `devcontainer.json`:

```json
"dockerComposeFile": "docker-compose.devcontainer.yml"
```

However, a better approach is often to avoid making a copy of your Docker Compose file by **extending it with another one**. We'll cover [extend a Docker Compose file](#extend-your-docker-compose-file-for-development) in the next section.

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

You can configure VS Code to reuse an existing image from a source like [DockerHub](https://hub.docker.com) or [Azure Container Registry](https://azure.microsoft.com/services/container-registry/) for your dev container by adding a `.devcontainer/devcontainer.json` (or `.devcontainer.json`) config file to your project. In addition, if you are not able to find an image that meets your needs, have a single container-based project, or just want to automate the installation of several additional dependencies, you can use a [Dockerfile](https://docs.docker.com/engine/reference/builder/) to generate the image instead.

To get started quickly, **open the folder** you want to work with in VS Code and run the **Remote-Containers: Add Development Container Configuration Files...** command in the Command Palette (`kbstyle(F1)`).

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