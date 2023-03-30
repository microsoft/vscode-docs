---
Order: 12
Area: advancedcontainers
TOCTitle: Configure separate containers
PageTitle: Configure separate containers for multiple projects
ContentId: d3b13c08-3c78-4891-b80a-5a15784aeb1e
MetaDescription: Configure separate containers for multiple projects
DateApproved: 3/30/2023
---
# Configure separate containers

While development containers often are tied to a single folder, repository, or project, they can also be used with multiple folders as a way to simplify setup or separate your tools. Imagine you had your source code across multiple repositories in a single folder for a given toolset.

For example:

```
📁 Repos
   📁 node
   📁 python
      📁 starter-snake-python
      📁 vscode-remote-try-python
      📁 your-python-project-here
   📁 go
   📁 dotnet
```

Let's set up a container for use with all of the Python projects in the `./Repos/python` folder.

1. Start Visual Studio Code, select **Dev Containers: Open Folder in Container...** from the Command Palette (`kbstyle(F1)`) or quick actions Status bar item, and select the `./Repos/python` folder.

    ![Quick actions Status bar item](images/configure-separate-containers/remote-dev-status-bar.png)

    > **Tip:** If you want to edit the container's contents or settings before opening the folder, you can run **Dev Containers: Add Dev Container Configuration Files...** instead.

2. Now pick a starting point for your dev container. You can either select a base **dev container definition** from a filterable list, or use an existing [Dockerfile](https://docs.docker.com/engine/reference/builder/) or [Docker Compose file](https://docs.docker.com/compose/compose-file/#compose-file-structure-and-examples) if one exists in the folder you selected.

    > **Note:** When using Alpine Linux containers, some extensions may not work due to `glibc` dependencies in native code inside the extension.

    ![Select a python dev container definition](images/configure-separate-containers/select-dev-container-def-python.png)

    The list will be automatically sorted based on the contents of the folder you open. The dev container Templates displayed come from our [first-party and community index](https://containers.dev/templates), which is part of the [Dev Container Specification](https://containers.dev/). We host a set of Templates as part of the spec in the [devcontainers/templates repository](https://github.com/devcontainers/templates). You can browse the `src` folder of that repository to see the contents of each Template.

3. After picking the starting point for your container, VS Code will add the dev container configuration files to the `./Repos/python/.devcontainer` folder.

4. The VS Code window will reload and start building the dev container. A progress notification provides status updates. You only have to build a dev container the first time you open it; opening the folder after the first successful build will be much quicker.

    ![Dev Container Progress Notification](images/configure-separate-containers/dev-container-progress.png)

5. After the build completes, VS Code will automatically connect to the container. Once connected use **File > Open... / Open Folder...** to select one of the folders under `./Repos/python`.

    ![Open python folder in the container](images/configure-separate-containers/open-folder-python.png)

6. In a moment, VS Code will open the folder inside the same container. In the future, you can use the **Remote Explorer** in the Activity Bar to open this sub-folder in the container directly.

    ![Container explorer with multiple folders under python container](images/configure-separate-containers/containers-explorer-python.png)

> **Tip:** Instead of mounting the local filesystem, you can use a similar flow to set up a container with an isolated, more performant volume that you clone your source code into. See the Advanced Containers [Improve disk performance](/remote/advancedcontainers/improve-performance.md#use-a-named-volume-for-your-entire-source-tree) article for details.
