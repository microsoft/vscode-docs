---
Order: 12
Area: remote
TOCTitle: devcontainer CLI
PageTitle: Installing and working with the devcontainer CLI
ContentId: 8946213d-716e-41ca-955f-944a41c70353
MetaDescription: Documentation on using the VS Code development container (devcontainer) command line interface with the Visual Studio Code Remote - Containers extension
DateApproved: 6/9/2022
---
# Development container CLI

When we refer to a command line interface (CLI) for development containers, there are two varieties:

* "dev container CLI" - A reference implementation for the open dev container specification. The [current proposal](https://github.com/microsoft/dev-container-spec/issues/9) is to make a CLI available that can take a `devcontainer.json` and create and configure a development container from it. It could be available in any IDE or editor.
* "Visual Studio Code `devcontainer` CLI" - A CLI that can be installed and used via the [Remote - Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) or through an external terminal.

The former is in-progress. The latter, VS Code `devcontainer` CLI, is available today and the focus of this document.

## Visual Studio Code devcontainer CLI

Given the growing number of use cases for dev containers, there is a companion `devcontainer` CLI that can be used independent of the [Remote - Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) or GitHub Codespaces. This article will walk you through its installation and how to use it in different scenarios.

## System requirements

To use the VS Code `devcontainer` CLI, you'll need the following on your system or CI/DevOps environment:

1. [Node.js 14+](https://nodejs.org).
1. [The `docker` CLI](/docs/remote/containers#installation).

## Installation

### Install using VS Code

1. Ensure you have the latest version of the [Remote - Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) installed (must be at least `v0.188.0`).

2. Launch Visual Studio Code and select  **Remote-Containers: Install devcontainer CLI** from the Command Palette (`kbstyle(F1)`).

    ![The "Install devcontainer CLI" command](images/devcontainer-cli/install.png)

* **Windows**: You will be prompted to automatically add the devcontainer CLI to your `PATH` or to copy the devcontainer CLI path to your clipboard for you to add to your `PATH`.
* **macOS/Linux**: If the extension detects a `bin` folder (or `.local/bin` folder) in your user home folder and in your `PATH`, then you will have the option of adding a symlink to the devcontainer CLI to this location. You will also have the option to copy the devcontainer CLI path to your clipboard for you to add to your `PATH`.

3. From an external terminal (one not inside Visual Studio Code), run `devcontainer --help` to test the installation and see the CLI's built-in help. Note that you may need to restart your shell for `PATH` changes to take effect.

    ```bash
    $ devcontainer --help
    devcontainer <command>

    Commands:
      devcontainer open [path]   Open a dev container in VS Code
      devcontainer build [path]  Build a dev container image

    Options:
      -h, --help               Show help  [boolean]
          --disable-telemetry  Disable telemetry  [boolean] [default: false]
    ```

### Install from the command line

You may also install the CLI from the command line. Currently this doesn't support the command `devcontainer open [path]`.

Global install:

```bash
npm install -g @vscode/dev-container-cli
devcontainer --help
```

Local install:

```bash
npm install @vscode/dev-container-cli
npx @vscode/dev-container-cli --help
```

## Opening a folder directly within a dev container

Visual Studio Code has many [command line options](/docs/editor/command-line.md), including `code .` that opens Visual Studio Code with the current folder. When you do this with a folder containing a dev container, Visual Studio Code will prompt you to reopen the folder within a dev container.

![Prompt to reopen folder within a dev container](images/devcontainer-cli/reopen-in-container.png)

With the VS Code `devcontainer` CLI, you can use the `devcontainer open` command to open the current folder straight into dev container mode, skipping the prompt.

You can optionally specify the path to the folder to open, for example `devcontainer open /source/my-folder` to open the `/source/my-folder` folder within a dev container.

## Building a dev container image

The `devcontainer build` command allows you to quickly build dev container images following the same steps as the Remote - Containers extension or GitHub Codespaces. This is useful when you want to pre-build a dev container image using a CI or DevOps product like GitHub Actions.

As with the `open` command, `build` accepts a path to the folder containing a `.devcontainer` folder or `.devcontainer.json` file. If omitted, the current working folder is used. For example, `devcontainer build` will build the dev container image for the current folder and `devcontainer build /source/my-folder` will build the container image for the `/source/my-folder` folder.

### Example of building and publishing an image

For example, you may want to pre-build several images that you then reuse across multiple projects or repositories. To do so, follow these steps:

1. [Create](/docs/editor/versioncontrol.md#initialize-a-repository) a source code repository.

1. Create a dev container configuration for each image you want to pre-build, customizing as you wish (including [dev container features](/docs/remote/containers.md#dev-container-features-preview)). For example, consider this `devcontainer.json` file:

    ```json
    {
        "build": {
            "dockerfile": "Dockerfile"
        },
        "features": {
            "docker-in-docker": "latest"
        }
    }
    ```

1. Use the `devcontainer build` command to build the image. See documentation for your image registry (like the [Azure Container Registry](https://docs.microsoft.com/azure/container-registry/container-registry-get-started-docker-cli?tabs=azure-cli), [GitHub Container Registry](https://docs.github.com/packages/working-with-a-github-packages-registry/working-with-the-container-registry#pushing-container-images), or [Docker Hub](https://docs.docker.com/engine/reference/commandline/push)) for information on image naming and additional steps like authentication.

    ```bash
    devcontainer build \
        --image-name ghcr.io/your-org/your-repo/your-image-name \
        change-me-to-repository-folder-with-dot-devcontainer
    ```

1. Next [push](https://docs.docker.com/engine/reference/commandline/push/) the image to your registry.

    ```bash
    docker push ghcr.io/your-org/your-image-name
    ```

1. Finally, for each project or repository that will use your image, craft a simplified `devcontainer.json` file that either uses the `image` property or references it in a Docker Compose file. Include any dev container features you added in your pre-build configuration in step 2. For example:

    ```json
    {
        "image": "ghcr.io/your-org/your-image-name",
        "features": {
            "docker-in-docker": "latest"
        }
    }
    ```

That's it!

### Adding automation

Steps to automate pre-building your image will vary by CI/DevOps system, but here's an example GitHub Actions workflow that will automate the process for a subfolder called `change-me` and push it to GitHub Container Registry once a month and whenever the dev container folder is modified in the `main` branch:

```yaml
name: Generate Dev Container Image
on:
  schedule:
    - cron: '0 0 1 * *'
  push:
    branches:
      - 'main'
    paths:
      - 'change-me/.devcontainer/**/*'
permissions:
  contents: read
  packages: write
jobs:
  devcontainer:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: |
          set -e

          # Update this based on your image name and the path of the .devcontainer folder in your repository
          FOLDER_WITH_DOT_DEVCONTAINER="change-me"
          IMAGE_NAME="your-image-name"
          IMAGE_REPOSITORY="$(echo "ghcr.io/$\{{ github.repository_owner }}/${IMAGE_NAME}" | tr '[:upper:]' '[:lower:]')"

          # [Optional] Enable buildkit, set output to plain text for logging
          export DOCKER_BUILDKIT=1
          export BUILDKIT_PROGRESS=plain

          # Do the build - update
          npm install -g "@vscode/dev-container-cli"
          devcontainer build --no-cache --image-name "${IMAGE_REPOSITORY}" "${FOLDER_WITH_DOT_DEVCONTAINER}"

          # Push image to GitHub Container Registry
          echo "$\{{ github.token }}" | docker login ghcr.io -u "$\{{ github.actor }}" --password-stdin
          docker push "${IMAGE_REPOSITORY}"
```

### CLI build options

The following options can be used with the `build` command:

* `--no-cache` : By default, building a Docker container image reuses layers from previous image builds. The `--no-cache` option prevents the cache being used and forces the image to be rebuilt.
* `--image-name` : The Remote - Containers extension typically determines its own name for the images it builds. You can specify the name to use for the built image using the `--image-name` option.

You can also type `devcontainer build --help` to see a full list of available options.

### **Optional:** Avoiding problems with images built using Docker

Given Dockerfiles and Docker Compose files can be used without VS Code or the VS Code `devcontainer` CLI, you may want to let users know that they should not try to build the image directly if it will not work as expected. To solve this problem, you can add a build argument that needs to be specified for things to work.

For example, you could add the following to your Dockerfile:

```Dockerfile
ARG vscode
RUN if [[ -z "$vscode" ]] ; then printf "\nERROR: This Dockerfile needs to be built with VS Code !" && exit 1; else printf "VS Code is detected: $vscode"; fi
```

And the following in your `devcontainer.json`:

```json
 "build": {
      "dockerfile": "Dockerfile",
      "args": {
          // set vscode arg for Dockerfile
          "vscode": "true"
      },
    }
```

In the Docker Compose case, you can add this argument to a separate [override file to extend your configuration](/docs/remote/create-dev-container.md#extend-your-docker-compose-file-for-development) that is located in a different place in your source tree than the primary Docker Compose file.

## Next steps

* [Create a Development Container](/docs/remote/create-dev-container.md) - Create a custom container for your work environment.
* [Advanced Containers](/remote/advancedcontainers/overview.md) - Find solutions to advanced container scenarios.
* [devcontainer.json reference](/docs/remote/devcontainerjson-reference.md) - Review the `devcontainer.json` schema.
* [Dev container specification repository](https://github.com/microsoft/dev-container-spec) - File and review issues to shape the direction of development containers and the dev container CLI.
