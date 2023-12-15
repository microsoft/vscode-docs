---
Order: 2
Area: advancedcontainers
TOCTitle: Environment variables
PageTitle: Container environment variables
ContentId: 031424a7-ab0e-42e0-ab7d-30a5371b9a50
MetaDescription: Use environment variables in containers
DateApproved: 12/7/2023
---
# Environment variables

You can set environment variables in your container without altering the container image by using one of the options below.

> You should verify **Terminal > Integrated: Inherit Env** is checked in settings or the variables you set may not appear in the Integrated Terminal. This setting is checked by default.

## Option 1: Add individual variables

Depending on what you reference in `devcontainer.json`:

* **Dockerfile or image**: Add the `containerEnv` property to `devcontainer.json` to set variables that should apply to the entire container or `remoteEnv` to set variables for VS Code and related sub-processes (terminals, tasks, debugging, etc.):

    ```json
    "containerEnv": {
        "MY_CONTAINER_VAR": "some-value-here",
        "MY_CONTAINER_VAR2": "${localEnv:SOME_LOCAL_VAR}"
    },
    "remoteEnv": {
        "PATH": "${containerEnv:PATH}:/some/other/path",
        "MY_REMOTE_VARIABLE": "some-other-value-here",
        "MY_REMOTE_VARIABLE2": "${localEnv:SOME_LOCAL_VAR}"
    }
    ```

    As this example illustrates, `containerEnv` can reference local variables and `remoteEnv` can reference both local and existing container variables.

### Video: Modify PATH in a dev container

<iframe width="560" height="315" src="https://www.youtube.com/embed/vEb7hKlagAU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>

<br><br>

* **Docker Compose**: Since Docker Compose has built-in support for updating container-wide variables, only `remoteEnv` is supported in `devcontainer.json`:

    ```json
    "remoteEnv": {
        "PATH": "${containerEnv:PATH}:/some/other/path",
        "MY_REMOTE_VARIABLE": "some-other-value-here",
        "MY_REMOTE_VARIABLE2": "${localEnv:SOME_LOCAL_VAR}"
    }
    ```

    As this example illustrates, `remoteEnv` can reference both local and existing container variables.

    To update variables that apply to the entire container, update (or [extend](/docs/devcontainers/create-dev-container.md#extend-your-docker-compose-file-for-development)) your `compose.yaml` with the following for the appropriate service:

    ```yaml
    version: '3'
    services:
      your-service-name-here:
        environment:
          - YOUR_ENV_VAR_NAME=your-value-goes-here
          - ANOTHER_VAR=another-value
         # ...
    ```

If you've already built the container and connected to it, run **Dev Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Dev Containers: Open Folder in Container...** to connect to the container.

## Option 2: Use an env file

If you have a large number of environment variables that you need to set, you can use a `.env` file instead.

First, create an environment file somewhere in your source tree. Consider this `.devcontainer/devcontainer.env` file:

```
YOUR_ENV_VAR_NAME=your-value-goes-here
ANOTHER_ENV_VAR_NAME=your-value-goes-here
```

Next, depending on what you reference in `devcontainer.json`:

* **Dockerfile or image**: Edit `devcontainer.json` and add a path to the `devcontainer.env` :

    ```json
    "runArgs": ["--env-file",".devcontainer/devcontainer.env"]
    ```

* **Docker Compose:** Edit `compose.yaml` and add a path to the `devcontainer.env` file relative to the Docker Compose file:

    ```yaml
    version: '3'
    services:
      your-service-name-here:
        env_file: devcontainer.env
        # ...
  ```

`docker compose` will automatically pick up a file called `.env` in the folder containing the `compose.yaml`, but you can also create one in another location.

If you've already built the container and connected to it, run **Dev Containers: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change. Otherwise run **Dev Containers: Open Folder in Container...** to connect to the container.

### Video: Load variables from an .env file

<iframe width="560" height="315" src="https://www.youtube.com/embed/qTU7w3bWrOk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
