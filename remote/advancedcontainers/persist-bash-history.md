---
Order: 5
Area: advancedcontainers
TOCTitle: Persist bash history
PageTitle: Persist bash history in containers
ContentId: 68111a8d-530c-4909-916d-3e68758e5e33
MetaDescription: Persist bash history in containers
DateApproved: 08/01/2024
---
# Persist bash history

You can also use a mount to persist your `bash` command history across sessions / container rebuilds.

First, update your `Dockerfile` so that each time a command is used in `bash`, the history is updated and stored in a location we will persist.

If you have a root user, update your `Dockerfile` with the following:

```docker
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && echo "$SNIPPET" >> "/root/.bashrc"
```

If you have a non-root user, update your `Dockerfile` with the following. Replace `user-name-goes-here` with the name of a [non-root user](/remote/advancedcontainers/add-nonroot-user.md) in the container.

```docker
ARG USERNAME=user-name-goes-here

RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && mkdir /commandhistory \
    && touch /commandhistory/.bash_history \
    && chown -R $USERNAME /commandhistory \
    && echo "$SNIPPET" >> "/home/$USERNAME/.bashrc"
```

Next, add a local volume to store the command history. This step varies depending on whether or not you are using Docker Compose.

* **Dockerfile or image**:  Use the `mounts` property (VS Code 1.41+) in your `devcontainer.json` file.

    ```json
      "mounts": [
          "source=projectname-bashhistory,target=/commandhistory,type=volume"
      ]
    ```

* **Docker Compose:** Update (or [extend](/docs/devcontainers/create-dev-container.md#extend-your-docker-compose-file-for-development)) your `docker-compose.yml` with the following for the appropriate service.

    ```yaml
    version: '3'
    services:
      your-service-name-here:
        volumes:
          - projectname-bashhistory:/commandhistory
         # ...
    volumes:
      projectname-bashhistory:
    ```

Finally, if you've already built the container and connected to it, run **Dev Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Dev Containers: Open Folder in Container...** to connect to the container.

### Video: How to make your bash history persist in a dev container

<iframe width="560" height="315" src="https://www.youtube.com/embed/12nZz-TjoZg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
