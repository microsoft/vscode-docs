---
Order: 8
Area: advancedcontainers
TOCTitle: Add non-root user
PageTitle: Add non-root user to a container
ContentId: 59f77c6b-0800-41e6-b7c8-a2d8e749ea17
MetaDescription: Add non-root user to a container
DateApproved: 12/7/2023
---
# Add a non-root user to a container

Many Docker images use root as the default user, but there are cases where you may prefer to use a non-root user instead. If you do so, there are some **quirks with local filesystem (bind) mounts** that you should know about. Specifically:

* **Docker Desktop for Mac**: Inside the container, any mounted files/folders will act as if they are owned by the container user you specify. Locally, all filesystem operations will use the permissions of your local user instead.

* **Docker Desktop for Windows**: Inside the container, any mounted files/folders will appear as if they are owned by `root` but the user you specify will still be able to read/write them and all files will be executable. Locally, all filesystem operations will use the permissions of your local user instead. This is because there is fundamentally no way to directly map Windows-style file permissions to Linux.

* **Docker CE/EE on Linux**: Inside the container, any mounted files/folders will have the exact same permissions as outside the container - including the owner user ID (UID) and group ID (GID). Because of this, your container user will either need to have the same UID or be in a group with the same GID. The actual name of the user / group does not matter. The first user on a machine typically gets a UID of 1000, so most containers use this as the ID of the user to try to avoid this problem.

## Specifying a user for VS Code

If the image or Dockerfile you are using **already provides an optional non-root user** (like the `node` image) but still defaults to root, you can opt into having Visual Studio Code (server) and any sub-processes (terminals, tasks, debugging) use it by specifying the `remoteUser` property in `devcontainer.json`:

```json
"remoteUser": "user-name-goes-here"
```

On Linux, if you are referencing a **Dockerfile, image, or Docker Compose** in `devcontainer.json`, this will also automatically update the container user's UID/GID to match your local user to avoid the bind mount permissions problem that exists in this environment (unless you set `"updateRemoteUserUID": false`).

Since this setting only affects VS Code and related sub-processes, VS Code needs to be restarted (or the window reloaded) for it to take effect. However, UID/GID updates are only applied when the container is created and requires a rebuild to change.

## Specifying the default container user

In some cases, you may need all processes in the container to run as a different user (for example, due to startup requirements) rather than just VS Code. How you do this varies slightly depending on whether or not you are using Docker Compose.

* **Dockerfile and image**: Add the `containerUser` property to this same file.

    ```json
    "containerUser": "user-name-goes-here"
    ```

    On Linux, like `remoteUser`, this will also automatically update the container user's UID/GID to match your local user to avoid the bind mount permissions problem that exists in this environment (unless you set `"updateRemoteUserUID": false`).

* **Docker Compose**: Update (or [extend](/docs/devcontainers/create-dev-container.md#extend-your-docker-compose-file-for-development)) your `compose.yaml` with the following for the appropriate service:

    ```yaml
    user: user-name-or-UID-goes-here
    ```

## Creating a non-root user

While any images or Dockerfiles that come from the Dev Containers extension will include a non-root user with a UID/GID of 1000 (typically either called `vscode` or `node`), many base images and Dockerfiles do not.  Fortunately, you can update or create a Dockerfile that adds a non-root user into your container.

Running your application as a non-root user is recommended even in production (since it is more secure), so this is a good idea even if you're reusing an existing Dockerfile. For example, this snippet for a Debian/Ubuntu container will create a user called `user-name-goes-here`, give it the ability to use `sudo`, and set it as the default:

```docker
ARG USERNAME=user-name-goes-here
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************

# [Optional] Set the default user. Omit if you want to keep the default as root.
USER $USERNAME
```

> **Tip:** If you hit an error when building about the GID or UID already existing, the image you selected likely already has a non-root user you can take advantage of directly.

In either case, if you've already built the container and connected to it, run **Dev Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Dev Containers: Open Folder in Container...** to connect to the container.

## Change the UID/GID of an existing container user

While the `remoteUser` property tries to automatically update the UID/GID as appropriate on Linux when using a **Dockerfile or image**, you can use this snippet in your Dockerfile to manually change the UID/GID of a user instead. Update the `ARG` values as appropriate.

```docker
ARG USERNAME=user-name-goes-here
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupmod --gid $USER_GID $USERNAME \
    && usermod --uid $USER_UID --gid $USER_GID $USERNAME \
    && chown -R $USER_UID:$USER_GID /home/$USERNAME
```

Note that on Alpine Linux, you'll need to install the `shadow` package first.

```docker
RUN apk add --no-cache shadow
```
