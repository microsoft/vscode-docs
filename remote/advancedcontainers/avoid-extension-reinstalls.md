---
Order: 8
Area: advancedcontainers
TOCTitle: Avoid extension reinstalls
PageTitle: Avoid Visual Studio Code extension reinstalls in containers
ContentId: bddbdddd-917a-42d0-a32a-0503716656d5
MetaDescription: Avoid Visual Studio Code extension reinstalls in containers
DateApproved: 9/20/2021
---
# Avoiding VS Code extension reinstalls

By default, Visual Studio Code will install extensions and VS Code Server inside the container's filesystem. While this has performance benefits over a locally mounted filesystem, the disadvantage is that VS Code will have to reinstall them on a container rebuild. If you find yourself rebuilding frequently, you can use a local "named volume" mount so that the extensions and VS Code Server survive a container rebuild.

There are a two side effects of doing this you should be aware of:

* Deleting the container will not automatically delete the named volume.
* Sharing the volume across multiple containers can have unintended consequences, so to be safe we will pick a unique name for each.

To create the named local volume, follow these steps:

1. **If you are running as a non-root user**, you'll need to ensure your Dockerfile creates `~/.vscode-server/extensions` and/or `~/.vscode-server-insiders/extensions` in the container with this non-root user as the owner. If you do not do this, the folder will be owned by root and your connection will fail with a permissions issue. See [Adding a non-root user to your dev container](#adding-a-nonroot-user-to-your-dev-container) for full details, but you can use this snippet in your Dockerfile to create the folders. Replace `user-name-goes-here` with the actual user name:

    ```Dockerfile
    ARG USERNAME=user-name-goes-here

    RUN mkdir -p /home/$USERNAME/.vscode-server/extensions \
            /home/$USERNAME/.vscode-server-insiders/extensions \
        && chown -R $USERNAME \
            /home/$USERNAME/.vscode-server \
            /home/$USERNAME/.vscode-server-insiders
    ```

2. Next, we'll configure a named volume mount for `~/.vscode-server/extensions` and `~/.vscode-server-insiders/extensions` in the container. The configuration will depend on whether you specify an image, Dockerfile, or Docker Compose file in your `devcontainer.json` file.

    **Dockerfile or image**:

    Add the following to `devcontainer.json`, replacing `/root` with the home directory in the container if not root (for example `/home/user-name-goes-here`) and `unique-vol-name-here` with a unique name for the volume:

    ```json
    "mounts": [
        "source=unique-vol-name-here,target=/root/.vscode-server/extensions,type=volume",
        // And/or for VS Code Insiders
        "source=unique-vol-name-here-insiders,target=/root/.vscode-server-insiders/extensions,type=volume",
    ]
    ```

    **Docker Compose**:

    Update (or [extend](/docs/remote/create-dev-container.md#extend-your-docker-compose-file-for-development)) your `docker-compose.yml` with the following for the appropriate service. Replacing `/root` with the home directory in the container if not root (for example `/home/user-name-goes-here`) and `unique-vol-name-here` with a unique name for the volume.

    ```yml
    services:
      your-service-name-here:
        volumes:
          - unique-vol-name-here:/root/.vscode-server/extensions
          # And/or for VS Code Insiders
          - unique-vol-name-here-insiders:/root/.vscode-server-insiders/extensions
        # ...

    volumes:
      unique-vol-name-here:
      unique-vol-name-here-insiders:
    ```

3. Finally, if you've already built the container and connected to it, you'll need to run **Remote-Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Remote-Containers: Reopen Folder in Container** to connect to the container for the first time.

After the container is up and running, subsequent rebuilds will not reacquire any extensions or the VS Code server. The build will also **not use the latest extensions list** from `devcontainer.json`.

However, if you want to completely reset, you can delete the volume and everything will be reinstalled on restart.

```bash
docker volume rm unique-vol-name-here
```
