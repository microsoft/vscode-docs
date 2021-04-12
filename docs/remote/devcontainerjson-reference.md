---
Order: 12
Area: remote
TOCTitle: devcontainer.json
PageTitle: devcontainer.json reference
ContentId: 52eaec33-21c6-410c-8e10-1ee3658a854f
MetaDescription: devcontainer.json reference
DateApproved: 3/31/2021
---
# devcontainer.json reference

A `devcontainer.json` file in your project tells Visual Studio Code how to access (or create) a **development container** with a well-defined tool and runtime stack. This container can be used to run an application or to sandbox tools, libraries, or runtimes needed for working with a codebase. It can be used with the [Remote - Containers](https://aka.ms/vscode-remote/download/containers) extension or [GitHub Codespaces](https://github.com/features/codespaces).

See [Set up a folder to run in a container](/docs/remote/create-dev-container.md#set-up-a-folder-to-run-in-a-container) for more information on configuring a dev container or use the **Remote-Containers: Add Development Container Configuration Files...** or **Codespaces: Add DevelopmentContainer Configuration Files...** commands from the Command Pallette (`kbstyle(F1)`) to add a wide variety of base configurations from the [vscode-dev-containers repository](https://github.com/microsoft/vscode-dev-containers/tree/master/containers).

## devcontainer.json properties

While some devcontainer.json properties apply generally, others are only used in specific scenarios. The following table will outline the properties that apply in each situation.

| Property | Type | Description |
|----------|------|-------------|
|**Dockerfile or image**|||
| `image` | string | **Required** when [using an image](/docs/remote/create-dev-container.md#using-an-image-or-dockerfile). The name of an image in a container registry ([DockerHub](https://hub.docker.com), [Github Container Registry](https://docs.github.com/en/packages/guides/about-github-container-registry), [Azure Container Registry](https://azure.microsoft.com/services/container-registry/)) that VS Code should use to create the dev container. |
| `build.dockerfile` / `dockerFile`  | string |**Required** when [using a Dockerfile](/docs/remote/create-dev-container.md#using-an-image-or-dockerfile). The location of a [Dockerfile](https://docs.docker.com/engine/reference/builder/) that defines the contents of the container. The path is relative to the `devcontainer.json` file. You can find a number of sample Dockerfiles for different runtimes in the [vscode-dev-containers repository](https://github.com/microsoft/vscode-dev-containers/tree/master/containers). |
| `build.context` / `context` | string | Path that the Docker build should be run from relative to `devcontainer.json`. For example, a value of `".."` would allow you to reference content in sibling directories. Defaults to `"."`. |
| `build.args` | Object | A set of name-value pairs containing [Docker image build arguments](https://docs.docker.com/engine/reference/commandline/build/#set-build-time-variables---build-arg) that should be passed when building a Dockerfile.  Environment and [pre-defined variables](#variables-in-devcontainerjson) may be referenced in the values. Defaults to not set. For example: `"build": { "args": { "MYARG": "MYVALUE", "MYARGFROMENVVAR": "${localEnv:VARIABLE_NAME}" } }` |
| `build.target` | string | A string that specifies a [Docker image build target](https://docs.docker.com/engine/reference/commandline/build/#specifying-target-build-stage---target) that should be passed when building a Dockerfile. Defaults to not set. For example: `"build": { "target": "development" }` |
| `appPort` | integer,<br>string,<br>array |  In most cases, we recommend using the new [forwardPorts property](/docs/remote/containers.md#always-forwarding-a-port). This property accepts a port or array of ports that should be [published](/docs/remote/containers.md#publishing-a-port) locally when the container is running. Unlike `forwardPorts`, your application may need to listen on all interfaces (`0.0.0.0`) not just `localhost` for it to be available externally. Defaults to `[]`. |
| `containerEnv` | object | A set of name-value pairs that sets or overrides environment variables for the container. Environment and [pre-defined variables](#variables-in-devcontainerjson) may be referenced in the values. For example:<br/> `"containerEnv": { "MY_VARIABLE": "${localEnv:MY_VARIABLE}" }`<br /> Requires the container be recreated / rebuilt to change. |
| `remoteEnv` | object | A set of name-value pairs that sets or overrides environment variables for VS Code (or sub-processes like terminals) but not the container as a whole. Environment and [pre-defined variables](#variables-in-devcontainerjson) may be referenced in the values. Be sure **Terminal > Integrated: Inherit Env** is is checked in settings or the variables will not appear in the terminal. For example: <br />`"remoteEnv": { "PATH": "${containerEnv:PATH}:/some/other/path", "MY_VARIABLE": "${localEnv:MY_VARIABLE}" }`<br />Updates are applied when VS Code is restarted (or the window is reloaded). |
| `containerUser` | string | Overrides the user all operations run as inside the container. Defaults to either `root` or the last `USER` instruction in the related Dockerfile used to create the image.<br>On Linux, the specified container user's UID/GID will be updated to match the local user's UID/GID to avoid permission problems with bind mounts (unless disabled using `updateRemoteUserUID`).<br>Requires the container be recreated / rebuilt for updates to take effect. |
| `remoteUser` | string | Overrides the user that VS Code runs as in the container (along with sub-processes like terminals, tasks, or debugging). Defaults to the `containerUser`.<br>On Linux, the specified container user's UID/GID will be updated to match the local user's UID/GID to avoid permission problems with bind mounts (unless disabled using `updateRemoteUserUID`).<br>Updates are applied when VS Code is restarted (or the window is reloaded), but UID/GID updates are only applied when the container is created and requires a rebuild to change. |
| `updateRemoteUserUID` | boolean | On Linux, if `containerUser` or `remoteUser` is specified, the container user's UID/GID will be updated to match the local user's UID/GID to avoid permission problems with bind mounts. Defaults to `true`.<br>Requires the container be recreated / rebuilt for updates to take effect. |
| `mounts` | array | An array of additional mount points to add to the container when created. Each value is a string that accepts the same values as the [Docker CLI `--mount` flag](https://docs.docker.com/engine/reference/commandline/run/#add-bind-mounts-or-volumes-using-the---mount-flag). Environment and [pre-defined variables](#variables-in-devcontainerjson) may be referenced in the value. For example:<br />`"mounts": ["source=${localWorkspaceFolder}/app-scripts,target=/usr/local/share/app-scripts,type=bind,consistency=cached"]` <br /><br />⚠️ Codespaces ignores "bind" mounts with the exception of the Docker socket. |
| `workspaceMount` | string | Overrides the default local mount point for the workspace when the container is created. Supports the same values as the [Docker CLI `--mount` flag](https://docs.docker.com/engine/reference/commandline/run/#add-bind-mounts-or-volumes-using-the---mount-flag). Primarily useful for [configuring remote containers](/docs/remote/containers-advanced.md#developing-inside-a-container-on-a-remote-docker-host) or [improving disk performance](/docs/remote/containers-advanced.md#improving-container-disk-performance). Environment and [pre-defined variables](#variables-in-devcontainerjson) may be referenced in the value. For example: <br />`"workspaceMount": "source=${localWorkspaceFolder}/sub-folder,target=/workspace,type=bind,consistency=cached"`<br /><br />⚠️ Not yet supported in Codespaces or when using Clone Repository in Container Volume. |
| `workspaceFolder` | string | Sets the default path that VS Code should open when connecting to the container. Typically used in conjunction with `workspaceMount`. Defaults to the automatic source code mount location.<br /><br />⚠️ Only supported for Docker Compose in Codespaces and when using Clone Repository in Container Volume.  |
| `runArgs` | array | An array of [Docker CLI arguments](https://docs.docker.com/engine/reference/commandline/run/) that should be used when running the container. Defaults to `[]`. For example, this allows ptrace based debuggers like C++ to work in the container:<br /> `"runArgs": [ "--cap-add=SYS_PTRACE", "--security-opt", "seccomp=unconfined" ]` . |
| `overrideCommand` | boolean | Tells VS Code whether it should run `/bin/sh -c "while sleep 1000; do :; done"` when starting the container instead of the container's default command. Defaults to `true` since the container can shut down if the default command fails. Set to `false` if the default command must run for the container to function properly. |
| `shutdownAction` | enum | Indicates whether VS Code should stop the container when the VS Code window is closed / shut down.<br>Values are `none` and `stopContainer` (default). <br /><br /> ⚠️ Does not apply to Codespaces. |
|**Docker Compose**|||
| `dockerComposeFile` | string,<br>array | **Required.** Path or an ordered list of paths to Docker Compose files relative to the `devcontainer.json` file. Using an array is useful [when extending your Docker Compose configuration](/docs/remote/create-dev-container.md#extend-your-docker-compose-file-for-development). The order of the array matters since the contents of later files can override values set in previous ones.<br>The default `.env` file is picked up from the root of the project, but you can use `env_file` in your Docker Compose file to specify an alternate location. |
| `service` | string | **Required.** The name of the service VS Code should connect to once running.  |
| `runServices` | array | An array of services in your Docker Compose configuration that should be started by VS Code. These will also be stopped when you disconnect unless `"shutdownAction"` is `"none"`. Defaults to all services. |
| `workspaceFolder` | string | Sets the default path that VS Code should open when connecting to the container (which is often the path to a volume mount where the source code can be found in the container). Defaults to `"/"`. |
| `remoteEnv` | object | A set of name-value pairs that sets or overrides environment variables for VS Code (or sub-processes like terminals) but not the container as a whole. Environment and [pre-defined variables](#variables-in-devcontainerjson) may be referenced in the values. Be sure **Terminal > Integrated: Inherit Env** is is checked in settings or the variables will not appear in the terminal. For example: <br />`"remoteEnv": { "PATH": "${containerEnv:PATH}:/some/other/path", "MY_VARIABLE": "${localEnv:MY_VARIABLE}" }`<br />Updates are applied when VS Code is restarted (or the window is reloaded) |
| `remoteUser` | string | Overrides the user that VS Code runs as in the container (along with sub-processes like terminals, tasks, or debugging). Does not change the user the container as a whole runs as (which can be [set in your Docker Compose file](https://docs.docker.com/compose/compose-file/#domainname-hostname-ipc-mac_address-privileged-read_only-shm_size-stdin_open-tty-user-working_dir)). Defaults to the user the container as a whole is running as (often `root`).<br>Updates are applied when VS Code is restarted (or the window is reloaded). |
| `shutdownAction` | enum | Indicates whether VS Code should stop the containers when the VS Code window is closed / shut down.<br>Values are  `none` and `stopCompose` (default).<br /><br /> ⚠️ Does not apply to Codespaces. |
|**General**|||
| `name` | string | A display name for the container. |
| `extensions` | array | An array of extension IDs that specify the extensions that should be installed inside the container when it is created. Defaults to `[]`. |
| `settings` | object | Adds default `settings.json` values into a container/machine specific settings file.  |
| `forwardPorts` | array | An array of ports that should be forwarded from inside the container to the local machine. |
| `portsAttributes` | object | Sets default properties for specific forwarded ports. Can use a port number, range, or a regular expression. |
| `otherPortsAttributes` | object | Configure the behavior of any ports that aren't configured using `portsAttributes`. |
| `postCreateCommand` | string,<br>array | A command string or list of command arguments to run **inside** the container after is created. The commands execute from the `workspaceFolder` in the container. Use `&&` in a string to execute multiple commands. For example, `"yarn install"` or `"apt-get update && apt-get install -y curl"`. The array syntax `["yarn", "install"]` will invoke the command (in this case `yarn`) directly without using a shell. <br />It fires after your source code has been mounted, so you can also run shell scripts from your source tree. For example: `bash scripts/install-dev-tools.sh`. Not set by default. |
| `postStartCommand` | string,<br>array | A command string or list of command arguments to run when the container starts (in all cases). The parameters behave exactly like `postCreateCommand`, but the commands execute on start rather than create. Not set by default.|
| `postAttachCommand` | string,<br>array | A command string or list of command arguments to run after VS Code has attached to a running container (in all cases). The parameters behave exactly like `postCreateCommand`, but the commands execute on attach rather than create. Not set by default. |
| `initializeCommand` | string,<br>array | A command string or list of command arguments to run on the **host machine** before the container is created. The command executes from the `workspaceFolder` locally. The array syntax `["yarn", "install"]` will invoke the command (in this case `yarn`) directly without using a shell, but **supports Windows/macOS/Linux path translation**. The string syntax (`"yarn install"`) is better for simple commands.<br /><br /> ⚠️ The command is run wherever the source code is located on the host. For Codespaces, this is in the cloud. |
| `userEnvProbe` | enum | Indicates the type of shell VS Code should use to "probe" for user environment variables to use by default while debugging or running a task: `none` (default), `interactiveShell`, `loginShell`, or `loginInteractiveShell`. Interactive shells will typically include variables set in `/etc/bash.bashrc` and `.bashrc` while login shells usually include variables from these "rc" files, `/etc/profile`, and `.profile`. The default is `none`, since the other modes can slow startup. |
| `devPort` | integer | Allows you to force a specific port that the VS Code Server should use in the container. Defaults to a random, available port. |

If you've already built the container and connected to it, be sure to run **Remote-Containers: Rebuild Container** or **Codespaces: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up the change.

### Formatting string vs. array properties

The format of certain properties will vary depending on the involvement of a shell.

`postCreateCommand`, `postStartCommand`, `postAttachCommand`, and `initializeCommand` all have an array and a string type, while `runArgs` only has the array type. An array is passed to the OS for execution without going through a shell, whereas a string goes through a shell (it needs to be parsed into command and arguments).

Using `runArgs` via a typical command line, you'll need single quotes if the shell runs into parameters with spaces. However, these single quotes aren't passed on to the executable. Thus, in your `devcontainer.json`, you'd follow the array format and leave out the single quotes:

```json
"runArgs": ["--device-cgroup-rule=my rule here"]
```

Rather than:

```json
"runArgs": ["--device-cgroup-rule='my rule here'"]
```

We can compare the string and the array versions of `postAttachCommand` as well. You can use the following string format, which will remove the single quotes as part of the shell's parsing:

```json
"postAttachCommand": "echo foo='bar'"
```

By contrast, the array format will keep the single quotes and write them to standard out (you can see the output in the dev container log):

```json
"postAttachCommand": ["echo", "foo='bar'"]
```

## Variables in devcontainer.json

Variables can be referenced in certain string values in `devcontainer.json` in the following format: **${variableName}**. The following is a list of available variables you can use.

| Variable | Properties | Description |
|----------|---------|----------------------|
| `${localEnv:VARIABLE_NAME}` | Any | Value of an environment variable on the **host machine** (in this case, called `VARIABLE_NAME`). Unset variables are left blank. To for example, this would set a variable to your local home folder on Linux / macOS or the user folder on Windows:<br/> `"remoteEnv": { "LOCAL_USER_PATH": "${localEnv:HOME}${localEnv:USERPROFILE}" }` <br /><br /> ⚠️ For Codespaces, the host is in the cloud rather than your local machine.|
| `${containerEnv:VARIABLE_NAME}` | `remoteEnv` | Value of an existing environment variable inside the container once it is up and running (in this case, called `VARIABLE_NAME`). For example:<br /> `"remoteEnv": { "PATH": "${containerEnv:PATH}:/some/other/path" }` |
| `${localWorkspaceFolder}`  | Any | Path of the local folder that was opened in VS Code (that contains `.devcontainer/devcontainer.json`).<br /><br />⚠️ Not yet supported when using Clone Repository in Container Volume. |
| `${containerWorkspaceFolder}` | Any | The path that the workspaces files can be found in the container. |
| `${localWorkspaceFolderBasename}` | Any | Name of the local folder that was opened in VS Code (that contains `.devcontainer/devcontainer.json`).<br /><br />⚠️ Not yet supported when using Clone Repository in Container Volume. |
| `${containerWorkspaceFolderBasename}` | Any | Name of the folder where the workspace files can be found in the container. |

## Attached container configuration reference

[Attached container configuration files](/docs/remote/attach-container.md#attached-container-configuration-files) are similar to `devcontainer.json` and supports a subset of its properties.

| Property | Type | Description |
|----------|------|-------------|
| `workspaceFolder` | string | Sets the default path that VS Code should open when connecting to the container (which is often the path to a volume mount where the source code can be found in the container). Not set by default (an empty window is opened). |
| `extensions` | array | An array of extension IDs that specify the extensions that should be installed inside the container when it is created. Defaults to `[]`. |
| `settings` | object | Adds default `settings.json` values into a container/machine specific settings file.  |
| `forwardPorts` | array | A list of ports that should be forwarded from inside the container to the local machine. |
| `remoteEnv` | object | A set of name-value pairs that sets or overrides environment variables for VS Code (or sub-processes like terminals) but not the container as a whole. Environment and [pre-defined variables](#variables-in-attached-container-configuration-files) may be referenced in the values.<br>For example: `"remoteEnv": { "PATH": "${containerEnv:PATH}:/some/other/path" }` |
| `remoteUser` | string | Overrides the user that VS Code runs as in the container (along with sub-processes like terminals, tasks, or debugging). Defaults to the user the container as a whole is running as (often `root`). |
| `postAttachCommand` | string,<br>array | A command string or list of command arguments to run after VS Code attaches to the container. Use `&&` in a string to execute multiple commands. For example, `"yarn install"` or `"apt-get update && apt-get install -y curl"`. The array syntax `["yarn", "install"]` will invoke the command (in this case `yarn`) directly without using a shell. Not set by default. |

## Variables in attached container configuration files

Variables can be referenced in certain string values in attached configuration files in the following format: **${variableName}**. The following is a list of available variables you can use.

| Variable | Properties | Description |
|----------|---------|----------------------|
| `${containerEnv:VAR_NAME}` | `remoteEnv` | Value of an existing environment variable inside the container (in this case, `VAR_NAME`) once it is up and running. For example: `"remoteEnv": { "PATH": "${containerEnv:PATH}:/some/other/path" }` |
