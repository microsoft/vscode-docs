---
Order: 14
Area: devcontainers
TOCTitle: Dev Container CLI
PageTitle: Installing and working with the devcontainer CLI
ContentId: 8946213d-716e-41ca-955f-944a41c70353
MetaDescription: Documentation on using the development container (dev container) command-line interface
DateApproved: 3/30/2023
---
# Dev Container CLI

This topic covers the development container command-line interface (dev container CLI), which allows you to build and manage development containers, and is a companion to the [Development Containers Specification](https://containers.dev).

## Development containers

A consistent, predictable environment is key to a productive and enjoyable software development experience.

Containers (for example [Docker](https://www.docker.com) containers) have historically been used to standardize apps when they're deployed, but there's a great opportunity to support additional scenarios, including continuous integration (CI), test automation, and full-featured coding environments. A **development container** provides this working environment and ensures your project has the tools and software it needs, whether it's complex and distributed or just has a few requirements.

![Diagram comparing dev versus production containers](images/devcontainer-cli/dev-container-stages.png)

Development containers are supported in Visual Studio Code via the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension and in [GitHub Codespaces](https://docs.github.com/codespaces/setting-up-your-project-for-codespaces/introduction-to-dev-containers). This support is backed by [devcontainer.json](https://containers.dev/implementors/json_reference), a structured JSON with Comments (jsonc) metadata format to configure a containerized environment.

As containerizing production workloads becomes commonplace, dev containers have become broadly useful for scenarios beyond VS Code. To promote dev containers in any environment, work has started on the [Development Containers Specification](https://github.com/devcontainers/spec), which empowers anyone in any tool to configure a consistent dev environment. The open-source **dev container CLI** serves as the reference implementation of the specification.

## The dev container CLI

When tools like VS Code and Codespaces detect a `devcontainer.json` file in a user's project, they use a CLI to configure a dev container. The dev container CLI is a reference implementation so that individual users and other tools can read in `devcontainer.json` metadata and create dev containers from it.

This CLI can either be used directly or integrated into product experiences, similar to how it's integrated with Dev Containers and Codespaces today. It currently supports both a simple single container option and integrates with [Docker Compose](https://docs.docker.com/compose/) for multi-container scenarios.

The CLI is available in the [devcontainers/cli](https://github.com/devcontainers/cli) repository.

## Installation

You can quickly try out the CLI through the Dev Containers extension. Select the **Dev Containers: Install devcontainer CLI** command from the Command Palette (`kbstyle(F1)`).

## Alternate installation

There are additional options for using the CLI elsewhere:
- Install its npm package
- Use the GitHub Action or Azure DevOps Task
     - You may find these in [devcontainers/ci](https://github.com/devcontainers/ci)
- Build the CLI repo from sources
     - You may learn more about building from sources in the [CLI repo's README](https://github.com/devcontainers/cli#try-it-out)

On this page, we'll focus on using the npm package.

### npm install

To install the npm package, you will need Python, Node.js (version 14 or greater), and C/C++ installed to build one of the dependencies. The VS Code [How to Contribute](https://github.com/microsoft/vscode/wiki/How-to-Contribute) wiki has details about the recommended toolsets.

```bash
npm install -g @devcontainers/cli
```

Verify you can run the CLI and see its help text:

```bash
devcontainer <command>

Commands:
  devcontainer up                   Create and run dev container
  devcontainer build [path]         Build a dev container image
  devcontainer run-user-commands    Run user commands
  devcontainer read-configuration   Read configuration
  devcontainer features             Features commands
  devcontainer templates            Templates commands
  devcontainer exec <cmd> [args..]  Execute a command on a running dev container

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

> **Note:** The `open` command to open your dev container will be listed if you installed the CLI via VS Code.

## Running the CLI

Once you have the CLI, you can try it out with a sample project, like this [Rust sample](https://github.com/microsoft/vscode-remote-try-rust).

Clone the Rust sample to your machine, and start a dev container with the CLI's `up` command:

```bash
git clone https://github.com/microsoft/vscode-remote-try-rust
devcontainer up --workspace-folder <path-to-vscode-remote-try-rust>
```

This will download the container image from a container registry and start the container. Your Rust container should now be running:

```bash
[88 ms] dev-containers-cli 0.1.0.
[165 ms] Start: Run: docker build -f /home/node/vscode-remote-try-rust/.devcontainer/Dockerfile -t vsc-vscode-remote-try-rust-89420ad7399ba74f55921e49cc3ecfd2 --build-arg VARIANT=bullseye /home/node/vscode-remote-try-rust/.devcontainer
[+] Building 0.5s (5/5) FINISHED
 => [internal] load build definition from Dockerfile                       0.0s
 => => transferring dockerfile: 38B                                        0.0s
 => [internal] load .dockerignore                                          0.0s
 => => transferring context: 2B                                            0.0s
 => [internal] load metadata for mcr.microsoft.com/vscode/devcontainers/r  0.4s
 => CACHED [1/1] FROM mcr.microsoft.com/vscode/devcontainers/rust:1-bulls  0.0s
 => exporting to image                                                     0.0s
 => => exporting layers                                                    0.0s
 => => writing image sha256:39873ccb81e6fb613975e11e37438eee1d49c963a436d  0.0s
 => => naming to docker.io/library/vsc-vscode-remote-try-rust-89420ad7399  0.0s
[1640 ms] Start: Run: docker run --sig-proxy=false -a STDOUT -a STDERR --mount type=bind,source=/home/node/vscode-remote-try-rust,target=/workspaces/vscode-remote-try-rust -l devcontainer.local_folder=/home/node/vscode-remote-try-rust --cap-add=SYS_PTRACE --security-opt seccomp=unconfined --entrypoint /bin/sh vsc-vscode-remote-try-rust-89420ad7399ba74f55921e49cc3ecfd2-uid -c echo Container started
Container started
{"outcome":"success","containerId":"f0a055ff056c1c1bb99cc09930efbf3a0437c54d9b4644695aa23c1d57b4bd11","remoteUser":"vscode","remoteWorkspaceFolder":"/workspaces/vscode-remote-try-rust"}
```

You can then run commands in this dev container:

```bash
devcontainer exec --workspace-folder <path-to-vscode-remote-try-rust> cargo run
```

This will compile and run the Rust sample, outputting:

```bash
[33 ms] dev-containers-cli 0.1.0.
   Compiling hello_remote_world v0.1.0 (/workspaces/vscode-remote-try-rust)
    Finished dev [unoptimized + debuginfo] target(s) in 1.06s
     Running `target/debug/hello_remote_world`
Hello, VS Code Dev Containers!
{"outcome":"success"}
```

These steps above are also provided in the CLI repo's [README](https://github.com/devcontainers/cli/blob/main/README.md).

## Automation

If you'd like to use the dev container CLI in your CI/CD builds or test automation, you can find examples of GitHub Actions and Azure DevOps Tasks in the [devcontainers/ci](https://github.com/devcontainers/ci) repository.

## Pre-building

The `devcontainer build` command allows you to quickly build a dev container image following the same steps as used by the Dev Containers extension or GitHub Codespaces. This is particularly useful when you want to pre-build a dev container image using a CI or DevOps product like GitHub Actions.

`build` accepts a path to the folder containing a `.devcontainer` folder or `.devcontainer.json` file. For example, `devcontainer build --workspace-folder <my_repo>` will build the container image for `my_repo`.

### Example of building and publishing an image

For example, you may want to pre-build a number of images that you then reuse across multiple projects or repositories. To do so, follow these steps:

1. [Create](/docs/sourcecontrol/overview.md#initialize-a-repository) a source code repository.

1. Create dev container configuration for each image you want to pre-build, customizing as you wish (including [dev container Features](/docs/devcontainers/containers.md#dev-container-features)). For example, consider this `devcontainer.json` file:

    ```json
    {
        "build": {
            "dockerfile": "Dockerfile"
        },
        "features": {
            "ghcr.io/devcontainers/features/docker-in-docker:1": {
                 "version": "latest"
            }
        }
    }
    ```

1. Use the `devcontainer build` command to build the image and [push](https://docs.docker.com/engine/reference/commandline/push/) it to your image registry. See documentation for your image registry (such as [Azure Container Registry](https://learn.microsoft.com/azure/container-registry/container-registry-get-started-docker-cli?tabs=azure-cli), [GitHub Container Registry](https://docs.github.com/packages/working-with-a-github-packages-registry/working-with-the-container-registry#pushing-container-images), or [Docker Hub](https://docs.docker.com/engine/reference/commandline/push)) for information on image naming and additional steps like authentication.

    ```bash
    devcontainer build --workspace-folder <my_repo> --push true --image-name <my_image_name>:<optional_image_version>
    ```

## Avoiding problems with images built using Docker

Given Dockerfiles and Docker Compose files can be used without VS Code or the `devcontainer` CLI, you may want to let users know that they should not try to build the image directly. You may learn more in the [advanced dev container documentation](/remote/advancedcontainers/reduce-docker-warnings.md#avoiding-problems-with-images-built-using-docker).

## Templates and Features

You can work with dev container [Templates](https://containers.dev/implementors/templates/) and [Features](https://containers.dev/implementors/features/) using the dev container CLI. As you create and use Templates, you may want to publish them for others, which you may learn more about in the [dev container spec](https://containers.dev/implementors/templates-distribution/).

## Feedback

The dev container CLI and specification are under active development and we welcome your feedback, which you can provide in [this issue](https://github.com/devcontainers/cli/issues/7), or through new issues and pull requests in the [devcontainers/cli](https://github.com/devcontainers/cli) repository.

## Next steps

* [Dev container specification repository](https://github.com/devcontainers/spec) - Read and contribute to the open specification.
* [devcontainer.json reference](https://containers.dev/implementors/json_reference) - Review the `devcontainer.json` schema.
* [Create a Development Container](/docs/devcontainers/create-dev-container.md) - Create a custom container for your work environment.
* [Advanced Containers](/remote/advancedcontainers/overview.md) - Find solutions to advanced container scenarios.
