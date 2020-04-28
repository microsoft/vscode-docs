---
Order: 5
Area: containers
TOCTitle: How it works
PageTitle: How remote dev containers work in Visual Studio Code
MetaDescription: How remote dev containers work in Visual Studio Code
DateApproved: 4/8/2020
---
# How it works

The remote container extension uses the files in the `.devcontainer` folder, namely `devcontainer.json` and an optional `Dockerfile` or `docker-compose.yml`, to create your dev containers.

First your image is built from the supplied Docker file or image name. Then a container is created and started using some of the settings in the `devcontainer.json`. Finally your Visual Studio Code environment is installed and configured again according to settings in the `devcontainer.json`.

Once all of this is done, your local copy of Visual Studio Code connects to the Visual Studio Code Server running inside of your new dev container.

## `devcontainer.json`

The `devcontainer.json` is basically a config file that determines how your dev container gets built and started.

```json
//devcontainer.json
{
    "name": "Node.js Sample",
    "dockerFile": "Dockerfile",
    "appPort": 3000,
    "extensions": [
        "dbaeumer.vscode-eslint"
    ],
    "settings": {
        "terminal.integrated.shell.linux": "/bin/bash"
    },
    "postCreateCommand": "yarn install",
    // Comment out the next line to run as root instead. Linux users, update
    // Dockerfile with your user's UID/GID if not 1000.
    "runArgs": [ "-u", "node" ]
}
```

The above example is taken from the `vscode-remote-try-node` repo we used in the tutorial.

| Option | Description |
|---|---|
| `dockerfile` | Relative path to a `Dockerfile` that you wish to use as your image. |
| `appPort`  | A port or array of ports that should be made available locally when the container is running  |
| `extensions`  | An array of extension IDs that specify the extensions that should be installed inside the container when it is created.   |
| `settings`  | Adds default `settings.json` values into a container/machine specific settings file. |
| `postCreateCommand`  | A command string or list of command arguments to run after the container is created. |
| `runArgs`  | An array of [Docker CLI](https://docs.docker.com/engine/reference/commandline/run/) arguments that should be used when running the container. |

[Full list](https://code.visualstudio.com/docs/remote/containers#_devcontainerjson-reference) of `devcontainer.json` options.

## Next steps

This has been a brief overview of what is possible using dev containers. To learn about other scenarios or learn more about containerized development, checkout the [Developing inside Containers](/docs/remote/containers.md) documentation.

----

<a class="tutorial-next-btn" href="/docs/remote/remote-tutorials">I'm Done!</a>
