---
Order: 4
Area: advancedcontainers
TOCTitle: Add local file mount
PageTitle: Add local file mount to a container
ContentId: 1a14ff36-13ea-40ec-acc9-16bd0d6725f6
MetaDescription: Add local file mount to a container
DateApproved: 12/7/2023
---
# Add another local file mount

> **Note:** Mounting the local file system is not supported in GitHub Codespaces. See [developing inside a container on a remote Docker host](/remote/advancedcontainers/develop-remote-host.md) for information on mounting remote folders in this scenario.

You can add a volume bound to any local folder by using the following appropriate steps, based on what you reference in `devcontainer.json`:

* **Dockerfile or image**: Add the following to the `mounts` property (VS Code 1.41+) in this same file:

    ```json
    "mounts": [
      "source=/local/source/path/goes/here,target=/target/path/in/container/goes/here,type=bind,consistency=cached"
    ]
    ```

    You can also reference local environment variables or the local path of the workspace. For example, this will bind mount `~` (`$HOME`) on macOS/Linux and the user's folder (`%USERPROFILE%`) on Windows and a sub-folder in the workspace to a different location:

    ```json
    "mounts": [
        "source=${localEnv:HOME}${localEnv:USERPROFILE},target=/host-home-folder,type=bind,consistency=cached",
        "source=${localWorkspaceFolder}/app-data,target=/data,type=bind,consistency=cached"
    ]
    ```

### Video: Add additional folders from your local machine to a dev container

<iframe width="560" height="315" src="https://www.youtube.com/embed/L1-dx-ZD0Ao" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br><br>

* **Docker Compose:** Update (or [extend](/docs/devcontainers/create-dev-container.md#extend-your-docker-compose-file-for-development)) your `compose.yaml` with the following for the appropriate service:

    ```yaml
    version: '3'
    services:
      your-service-name-here:
        volumes:
          - /local/source/path/goes/here:/target/path/in/container/goes/here:cached
          - ~:/host-home-folder:cached
          - ./data-subfolder:/data:cached
         # ...
    ```

If you've already built the container and connected to it, run **Dev Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Dev Containers: Open Folder in Container...** to connect to the container.
