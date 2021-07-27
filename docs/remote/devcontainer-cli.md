---
Order: 12
Area: remote
TOCTitle: devcontainer CLI
PageTitle: Installing and working with the devcontainer CLI
ContentId: 8946213d-716e-41ca-955f-944a41c70353
MetaDescription: Documentation on using the devcontainer CLI with the Visual Studio Code Remote - Containers extension
---
# `devcontainer` Command Line Interface

Remote-Containers has a `devcontainer` Command Line Interface (CLI) which allows you to interact with a dev container from your terminal.

## Installing the devcontainer CLI

To install the `devcontainer` CLI:

1. Ensure you have the latest version of the [Remote-Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) installed (must be at least `v0.188.0`)
2. Launch Visual Studio Code and select  **Remote-Containers: Install devcontainer CLI** from the Command Palette (`kbstyle(F1)`)

    ![The "Install `devcontainer` CLI" command](images/devcontainer-cli/install.png)

    * **Windows**: You will be prompted to automatically add the `devcontainer` CLI to your `PATH` or to copy the `devcontainer` CLI path to your clipboard for you to add to your `PATH`.
    * **macOS/Linux**: If the extension detects a `bin` folder ( or `.local/bin` folder) in your user home folder and in your `PATH` then you will have the option of adding a symlink to the `devcontainer` CLI to this location. You will also have the option to copy the `devcontainer` CLI path to your clipboard for you to add to your `PATH`.

3. From a system shell (one not inside Visual Studio Code), run `devcontainer --help` to test the installation and see the CLI's built-in help. Note that you may need to restart your shell for `PATH` changes to take effect.


## Opening a folder directly as a dev container

Visual Studio Code has a number of [command line options](/docs/getstarted/tips-and-tricks#_command-line), including `code .` which opens Visual Studio Code with the current folder. When you do this with a folder containing a dev container, Visual Studio Code will prompt you to reopen the folder as a dev container.

![Prompt to reopen folder as a dev container](images/devcontainer-cli/reopen-in-container.png)

With the `devcontainer` CLI, you can use the `devcontainer open` command to open the current folder straight into dev container mode, skipping the prompt.

You can optionally specify the path to the folder to open, for example `devcontainer open ~/source/my-folder` to open the `~/source/my-folder` folder as a dev container.

## Building a dev container image

The `devcontainer build` command allows you to build the dev container image for a folder. As with the `open` command, `build` accepts a path to the folder to build the image for and defaults to the current working folder in your shell. For example, `devcontainer build` will build the dev container image for the current folder and `devcontainer build ~/source/my-folder` will build the container image for the `~/source/my-folder` folder.

### `devcontainer build` options

The following options can be used with the `build` command:

| Option         | Description                                                                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--no-cache`   | By default, building a Docker container image re-uses layers from previous image builds. The `--no-cache` option prevents the cache being used and forces the image to be rebuilt |
| `--image-name` | The Remote-Containers extension typically determine its own name for the images it builds. You can specify the name to use for the built image using the `--image-name` option    |

## Visual Studio Code Insiders

 You can install the CLI for the stable and insiders builds of Visual Studio Code side-by-side. When running Visual Studio Code  the insiders CLI will be `devcontainer-insiders`, so use this in place of `devcontainer` in the steps above.
