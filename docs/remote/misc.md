****** Extra

Or reuse an existing Dockerfile:

![Add a dev container definition](images/containers/select-dockerfile.png)

Or reuse an existing Docker Compose file:

![Add a dev container definition](images/containers/select-docker-compose.png)

For example, through a `devcontainer.json` file, you can:

* Spin up a [stand-alone "sandbox" container](#set-up-a-folder-to-run-in-a-container) to isolate your toolchain or speed up setup.
* Work with a container deployed application defined by an [image, Dockerfile](#using-an-image-or-dockerfile), or [Docker Compose](#using-docker-compose).
* [Use Docker or Kubernetes](/docs/remote/containers-advanced.md#using-docker-or-kubernetes-from-a-container) from inside a dev container to build and deploy your app.

If `devcontainer.json`'s supported workflows do not meet your needs, you can also [attach to an already running container instead](/docs/remote/attach-container.md).

> **Tip:** Want to use a remote Docker host? See the [Advanced Containers article](/docs/remote/containers-advanced.md#developing-inside-a-container-on-a-remote-docker-host) for details on setup.

You can [alter your configuration](#set-up-a-folder-to-run-in-a-container) to:

* Install additional tools such as Git in the container.
* Automatically install extensions.
* Forward or publish additional ports.
* Set runtime arguments.
* Reuse or [extend your existing Docker Compose setup](https://aka.ms/vscode-remote/containers/docker-compose/extend).
* And more [advanced container configurations](/docs/remote/containers-advanced.md).

You can also use post-create commands to prepare the environment.

Using `devcontainer.json`:

```json
"postCreateCommand": "apt-get update && apt-get install <package>"
```

Or if running as a [non-root user](/docs/remote/containers-advanced.md#adding-a-nonroot-user-to-your-dev-container):

```json
"postCreateCommand": "sudo apt-get update && sudo apt-get install <package>"
```

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

Once you have added a `.devcontainer/devcontainer.json` file to your folder, run the **Remote-Containers: Reopen Folder in Container** command (or **Remote-Containers: Open Folder in Container...** if you are not yet in VS Code) from the Command Palette (`kbstyle(F1)`).