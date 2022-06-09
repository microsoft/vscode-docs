---
Order: 13
Area: remote
TOCTitle: devcontainer.json
PageTitle: devcontainer.json reference
ContentId: 52eaec33-21c6-410c-8e10-1ee3658a854f
MetaDescription: devcontainer.json reference
DateApproved: 6/9/2022
---
# devcontainer.json reference

A `devcontainer.json` file in your project tells Visual Studio Code (and other services and tools that support the format) how to access (or create) a **development container** with a well-defined tool and runtime stack. It's currently supported by the [Remote - Containers](https://aka.ms/vscode-remote/download/containers) extension and [GitHub Codespaces](https://github.com/features/codespaces).

[Create a development container](/docs/remote/create-dev-container.md) has more information on configuring a dev container or you can use the **Remote-Containers: Add Development Container Configuration Files...** or **Codespaces: Add Development Container Configuration Files...** commands from the Command Palette (`kbstyle(F1)`) to add a wide variety of base configurations from the [vscode-dev-containers repository](https://github.com/microsoft/vscode-dev-containers/tree/main/containers).

> **Tip:** If you've already built a container and connected to it, be sure to run **Remote-Containers: Rebuild Container** or **Codespaces: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up any changes you make.

## Scenario specific properties

The focus of `devcontainer.json` is to describe how to enrich a container for the purposes of development rather than acting as a multi-container orchestrator format. Instead, container orchestrator formats can be referenced when needed to manage multiple containers and their lifecycles. Today, `devcontainer.json` includes scenario specific properties for working without a container orchestrator (by directly referencing an image or Dockerfile) and for using Docker Compose as a simple multi-container orchestrator.

### Image or Dockerfile specific properties

| Property | Type | Description |
|----------|------|-------------|
| `image` | string | **Required** when [using an image](/docs/remote/create-dev-container.md#dockerfile). The name of an image in a container registry ([DockerHub](https://hub.docker.com), [GitHub Container Registry](https://docs.github.com/packages/guides/about-github-container-registry), [Azure Container Registry](https://azure.microsoft.com/services/container-registry/)) that VS Code and other `devcontainer.json` supporting services / tools should use to create the dev container. |
| `build.dockerfile` / `dockerFile`  | string |**Required** when [using a Dockerfile](/docs/remote/create-dev-container.md#dockerfile). The location of a [Dockerfile](https://docs.docker.com/engine/reference/builder/) that defines the contents of the container. The path is relative to the `devcontainer.json` file. You can find Dockerfiles for different runtimes in the [vscode-dev-containers repository](https://github.com/microsoft/vscode-dev-containers/tree/main/containers). |
| `build.context` / `context` | string | Path that the Docker build should be run from relative to `devcontainer.json`. For example, a value of `".."` would allow you to reference content in sibling directories. Defaults to `"."`. |
| `build.args` | Object | A set of name-value pairs containing [Docker image build arguments](https://docs.docker.com/engine/reference/commandline/build/#set-build-time-variables---build-arg) that should be passed when building a Dockerfile.  Environment and [pre-defined variables](#variables-in-devcontainerjson) may be referenced in the values. Defaults to not set. For example: `"build": { "args": { "MYARG": "MYVALUE", "MYARGFROMENVVAR": "${localEnv:VARIABLE_NAME}" } }` |
| `build.target` | string | A string that specifies a [Docker image build target](https://docs.docker.com/engine/reference/commandline/build/#specifying-target-build-stage---target) that should be passed when building a Dockerfile. Defaults to not set. For example: `"build": { "target": "development" }` |
| `build.cacheFrom` | string,<br>array | A string or array of strings that specify one or more images to use as caches when building the image. Cached image identifiers are passed to the `docker build` command with `--cache-from`.<br>Note that the array syntax will execute the command without a shell. You can [learn more](#formatting-string-vs-array-properties) about formatting string vs array properties. |
| `appPort` | integer,<br>string,<br>array |  In most cases, we recommend using the new [forwardPorts property](/docs/remote/containers.md#always-forwarding-a-port). This property accepts a port or array of ports that should be [published](/docs/remote/containers.md#publishing-a-port) locally when the container is running. Unlike `forwardPorts`, your application may need to listen on all interfaces (`0.0.0.0`) not just `localhost` for it to be available externally. Defaults to `[]`. <br>Note that the array syntax will execute the command without a shell. You can [learn more](#formatting-string-vs-array-properties) about formatting string vs array properties. |
| `containerEnv` | object | A set of name-value pairs that sets or overrides environment variables for the container. Environment and [pre-defined variables](#variables-in-devcontainerjson) may be referenced in the values. For example:<br/> `"containerEnv": { "MY_VARIABLE": "${localEnv:MY_VARIABLE}" }`<br /> Requires the container be recreated / rebuilt to change. If you want to reference an existing container variable while setting this one (like updating the `PATH`), use `remoteEnv` instead. |
| `containerUser` | string | Overrides the user for all operations run as inside the container. Defaults to either `root` or the last `USER` instruction in the related Dockerfile used to create the image.<br>On Linux, the specified container user's UID/GID will be updated to match the local user's UID/GID to avoid permission problems with bind mounts (unless disabled using `updateRemoteUserUID`).<br>Requires the container be recreated / rebuilt for updates to take effect. If you want any connected tools or related processes to use a different user than the one for the container, see `remoteUser`. |
| `mounts` | array | An array of additional mount points to add to the container when created. Each value is a string that accepts the same values as the [Docker CLI `--mount` flag](https://docs.docker.com/engine/reference/commandline/run/#add-bind-mounts-or-volumes-using-the---mount-flag). Environment and [pre-defined variables](#variables-in-devcontainerjson) may be referenced in the value. For example:<br />`"mounts": ["source=${localWorkspaceFolder}/app-scripts,target=/usr/local/share/app-scripts,type=bind,consistency=cached"]` <br /><br />⚠️ Codespaces ignores "bind" mounts with the exception of the Docker socket. Volume mounts are still allowed.|
| `workspaceMount` | string | Requires `workspaceFolder` be set as well. Overrides the default local mount point for the workspace when the container is created. Supports the same values as the [Docker CLI `--mount` flag](https://docs.docker.com/engine/reference/commandline/run/#add-bind-mounts-or-volumes-using-the---mount-flag). Primarily useful for [configuring remote containers](/remote/advancedcontainers/develop-remote-host.md) or [improving disk performance](/remote/advancedcontainers/improve-performance.md). Environment and [pre-defined variables](#variables-in-devcontainerjson) may be referenced in the value. For example: <br />`"workspaceMount": "source=${localWorkspaceFolder}/sub-folder,target=/workspace,type=bind,consistency=cached", "workspaceFolder": "/workspace"`<br /><br />⚠️ Not yet supported in Codespaces or when using Clone Repository in Container Volume. |
| `workspaceFolder` | string | Requires `workspaceMount` be set. Sets the default path that VS Code and other `devcontainer.json` supporting services / tools should open when connecting to the container. Defaults to the automatic source code mount location. <br /><br />⚠️ Not yet supported in Codespaces or when using Clone Repository in Container Volume. |
| `runArgs` | array | An array of [Docker CLI arguments](https://docs.docker.com/engine/reference/commandline/run/) that should be used when running the container. Defaults to `[]`. For example, this allows ptrace based debuggers like C++ to work in the container:<br /> `"runArgs": [ "--cap-add=SYS_PTRACE", "--security-opt", "seccomp=unconfined" ]` . |

### Docker Compose specific properties

| Property | Type | Description |
|----------|------|-------------|
| `dockerComposeFile` | string,<br>array | **Required** when [use Docker Compose](/docs/remote/create-dev-container.md#use-docker-compose). Path or an ordered list of paths to Docker Compose files relative to the `devcontainer.json` file. Using an array is useful [when extending your Docker Compose configuration](/docs/remote/create-dev-container.md#extend-your-docker-compose-file-for-development). The order of the array matters since the contents of later files can override values set in previous ones.<br>The default `.env` file is picked up from the root of the project, but you can use `env_file` in your Docker Compose file to specify an alternate location.<br>Note that the array syntax will execute the command without a shell. You can [learn more](#formatting-string-vs-array-properties) about formatting string vs array properties. |
| `service` | string | **Required** when [use Docker Compose](/docs/remote/create-dev-container.md#use-docker-compose). The name of the service VS Code and other `devcontainer.json` supporting services / tools should connect to once running.  |
| `runServices` | array | An array of services in your Docker Compose configuration that should be started by VS Code and other `devcontainer.json` supporting services / tools. These will also be stopped when you disconnect unless `"shutdownAction"` is `"none"`. Defaults to all services. |
| `workspaceFolder` | string | Sets the default path that VS Code and other `devcontainer.json` supporting services / tools should open when connecting to the container (which is often the path to a volume mount where the source code can be found in the container). Defaults to `"/"`. |

## General devcontainer.json properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | A name for the dev container displayed in the UI. |
| `forwardPorts` | array | An array of port numbers or `"host:port"` values  (e.g. `[3000, "db:5432"]`) that should always be forwarded from inside the primary container to the local machine (including on the web for Codespaces). The property is most useful for forwarding ports that cannot be auto-forwarded because the related process that starts before VS Code connects or for forwarding a service not in the primary container in Docker Compose scenarios (e.g. `"db:5432"`). Defaults to `[]`. <br /><br /> ⚠️ Codespaces does not yet support the `"host:port"` variation of this property. |
| `portsAttributes` | object | Object that maps a port number, `"host:port"` value, range, or regular expression to a set of default options. See [port attributes](#port-attributes) for available options. For example: <br />`"portsAttributes": {"3000": {"label": "Application port"}}` <br /><br /> ⚠️ Codespaces does not yet support the `"host:port"` variation of this property.|
| `otherPortsAttributes` | object | Default options for ports, port ranges, and hosts that aren't configured using `portsAttributes`. See [port attributes](#port-attributes) for available options. For example: <br /> `"otherPortsAttributes": {"onAutoForward": "silent"}` |
| `remoteEnv` | object | A set of name-value pairs that sets or overrides environment variables for VS Code (or sub-processes like terminals) but not the container as a whole. Environment and [pre-defined variables](#variables-in-devcontainerjson) may be referenced in the values. Be sure **Terminal > Integrated: Inherit Env** is checked in settings or the variables will not appear in the terminal. For example: <br />`"remoteEnv": { "PATH": "${containerEnv:PATH}:/some/other/path", "MY_VARIABLE": "${localEnv:MY_VARIABLE}" }`<br />Updates are applied when VS Code is restarted (or the window is reloaded) |
| `remoteUser` | string | Overrides the user that VS Code and other `devcontainer.json` supporting services tools / runs as in the container (along with sub-processes like terminals, tasks, or debugging). Does not change the user the container as a whole runs as which can be set using `containerUser` for images and Dockerfiles or [in your Docker Compose file](https://docs.docker.com/compose/compose-file/#domainname-hostname-ipc-mac_address-privileged-read_only-shm_size-stdin_open-tty-user-working_dir) instead. Defaults to the user the container as a whole is running as (often `root`).<br>Updates are applied when VS Code is restarted (or the window is reloaded). |
| `updateRemoteUserUID` | boolean | On Linux, if `containerUser` or `remoteUser` is specified, the container user's UID/GID will be updated to match the local user's UID/GID to avoid permission problems with bind mounts. Defaults to `true`.<br>Requires the container be recreated / rebuilt for updates to take effect. |
| `userEnvProbe` | enum | Indicates the type of shell to use to "probe" for user environment variables to include in VS Code or other connected tool's processes: `none`, `interactiveShell`, `loginShell`, or `loginInteractiveShell` (default). The specific shell used is based on the default shell for the user (typically bash). For example, bash interactive shells will typically include variables set in `/etc/bash.bashrc` and `~/.bashrc` while login shells usually include variables from `/etc/profile` and `~/.profile`. Setting this property to `loginInteractiveShell` will get variables from all four files. |
| `overrideCommand` | boolean | Tells VS Code and other `devcontainer.json` supporting services / tools whether they should run `/bin/sh -c "while sleep 1000; do :; done"` when starting the container instead of the container's default command (since the container can shut down if the default command fails). Set to `false` if the default command must run for the container to function properly. Defaults to `true` for when using an image Dockerfile and `false` when referencing a Docker Compose file. |
| `features` | object | An object of [dev container features](/docs/remote/containers.md#dev-container-features-preview) and related options to be added into your primary container. The specific options  that are available varies by feature, so see its documentation for additional details. For example: <br />`"features": {"github-cli": "latest"}` <br /><br /> ⚠️ Currently in preview. |
| `shutdownAction` | enum | Indicates whether VS Code and other `devcontainer.json` supporting tools should stop the containers when the related tool window is closed / shut down.<br>Values are  `none`, `stopContainer` (default for image or Dockerfile), and `stopCompose` (default for Docker Compose).<br /><br /> ⚠️ Does not apply to Codespaces. |

## VS Code specific properties

While most properties apply to any `devcontainer.json` supporting tool or service, a few are specific to VS Code. To configure them, you may use the `customizations.vscode` property. Below is an example:

```json
// Configure tool-specific properties.
"customizations": {
    // Configure properties specific to VS Code.
    "vscode": {
        "settings": {},
        "extensions": [],
        "devPort": {}
        }
    },
```

| Property | Type | Description |
|----------|------|-------------|
| `extensions` | array | An array of extension IDs that specify the extensions that should be installed inside the container when it is created. Defaults to `[]`. |
| `settings` | object | Adds default `settings.json` values into a container/machine specific settings file. Defaults to `{}`. |
| `devPort` | integer | Allows you to force a specific port that VS Code Server should use in the container. Defaults to a random, available port. |

## Lifecycle scripts

When creating or working with a dev container, you may need different commands to be run at different points in the container's lifecycle. The table below lists a set of command properties you can use to update what the container's contents in the order in which they are run (for example, `onCreateCommand` will run after `initializeCommand`). Each command property is an string or list of command arguments that should execute from the `workspaceFolder`.

| Property | Type | Description |
|----------|------|-------------|
| `initializeCommand` | string,<br>array | A command string or list of command arguments to run on the **host machine** before the container is created. .<br /><br /> ⚠️ The command is run wherever the source code is located on the host. For Codespaces, this is in the cloud.<br>Note that the array syntax will execute the command without a shell. You can [learn more](#formatting-string-vs-array-properties) about formatting string vs array properties. |
| `onCreateCommand` | string,<br>array | This command is the first of three (along with `updateContentCommand` and `postCreateCommand`) that finalizes container setup when a dev container is created. It and subsequent commands execute **inside** the container immediately after it has started for the first time.<br /><br> GitHub Codespaces also use this command when generating prebuilt codespaces, but it executes before the container has been assigned to a specific user. It therefore can only take advantage of repository and org scoped secrets or permissions.<br><br>Note that the array syntax will execute the command without a shell. You can [learn more](#formatting-string-vs-array-properties) about formatting string vs array properties. |
| `updateContentCommand` | string,<br>array  | This command is the second of three that finalizes container setup when a dev container is created. It executes inside the container after `onCreateCommand` whenever new content is available in the source tree during the creation process.<br><br />It will execute at least once, but GitHub Codespaces will also periodically execute the command to refresh available prebuilt codespaces. Like `onCreateCommand` in GitHub Codespaces, it can only take advantage of repository and org scoped secrets or permissions. <br><br> Note that the array syntax will execute the command without a shell. You can [learn more](#formatting-string-vs-array-properties) about formatting string vs array properties. |
| `postCreateCommand` | string,<br>array | This command is the last of three that finalizes container setup when a dev container is created. It happens after `updateContentCommand` and once the dev container has been assigned to a user for the first time.<br><br />In GitHub Codespaces, this command can always take advantage of user specific secrets and permissions. <br><br>Note that the array syntax will execute the command without a shell. You can [learn more](#formatting-string-vs-array-properties) about formatting string vs array properties. |
| `postStartCommand` | string,<br>array | A command to run each time the container is successfully started. <br><br>Note that the array syntax will execute the command without a shell. You can [learn more](#formatting-string-vs-array-properties) about formatting string vs array properties. |
| `postAttachCommand` | string,<br>array | A command to run each time a tool has successfully attached to the container. <br><br>Note that the array syntax will execute the command without a shell. You can [learn more](#formatting-string-vs-array-properties) about formatting string vs array properties. |
| `waitFor` | enum | An enum that specifies the command any tool should wait for before connecting. Defaults to `updateContentCommand`. This allows you to use `onCreateCommand` or `updateContentCommand` for steps that must happen before VS Code or other `devcontainer.json` supporting tools connect while still using `postCreateCommand` for steps that can happen behind the scenes afterwards. <br /><br />⚠️ Codespaces does not yet support `waitFor`.|

For each command property, if the value is a single string, it will be run in `/bin/sh`. Use `&&` in a string to execute multiple commands. For example, `"yarn install"` or `"apt-get update && apt-get install -y curl"`. The array syntax `["yarn", "install"]` will invoke the command (in this case `yarn`) directly without using a shell. Each fires after your source code has been mounted, so you can also run shell scripts from your source tree. For example: `bash scripts/install-dev-tools.sh`

If one of the lifecycle scripts fails, any subsequent scripts will not be executed. For instance, if `postCreateCommand` fails, `postStartCommand` and any following scripts will be skipped.

## Minimum host requirements

While `devcontainer.json` does not focus on hardware or VM provisioning, it can be useful to know your container's minimum RAM, CPU, and storage requirements. This is what the `hostRequirements` properties allow you to do. Cloud services like GitHub Codespaces use these properties to automatically default to the best compute option available, while in other cases, you will be presented with a warning if the requirements are not met.

| Property | Type | Description |
|----------|------|-------------|
| `hostRequirements.cpus` | integer | Indicates the minimum required number of CPUs / virtual CPUs / cores. For example: `"hostRequirements": {"cpus": 2}` |
| `hostRequirements.memory` | string |  A string indicating minimum memory requirements with a `tb`, `gb`, `mb`, or `kb` suffix. For example, `"hostRequirements": {"memory": "4gb"}` |
| `hostRequirements.storage` | string | A string indicating minimum storage requirements with a `tb`, `gb`, `mb`, or `kb` suffix. For example, `"hostRequirements": {"storage": "32gb"}` |

## Port attributes

The `portsAttributes` and `otherPortsAttributes` properties allow you to map default port options for one or more manually or automatically forwarded ports. The following is a list of options that can be set in the configuration object assigned to the property.

| Property | Type | Description |
|----------|------|-------------|
| `label` | string | Display name for the port in the ports view. Defaults to not set. |
| `protocol` | enum | Controls protocol handling for forwarded ports. When not set, the port is assumed to be a raw TCP stream which, if forwarded to `localhost`, supports any number of protocols. However, if the port is forwarded to a web URL (e.g. from Codespaces on the web), only HTTP ports in the container are supported. Setting this property to `https` alters handling by ignoring any SSL/TLS certificates present when communicating on the port and using the correct certificate for the forwarded URL instead (e.g `https://*.githubpreview.dev`). If set to `http`, processing is the same as if the protocol is not set. Defaults to not set. |
| `onAutoForward` | enum | Controls what should happen when a port is auto-forwarded once you've connected to the container. `notify` is the default, and a notification will appear when the port is auto-forwarded. If set to `openBrowser`, the port will be opened in the system's default browser. `openPreview` will open the URL in VS Code's embedded preview browser. A value of `silent` will forward the port, but take no further action. A value of `ignore` means that this port should not be auto-forwarded at all. |
| `requireLocalPort` | boolean | Dictates when port forwarding is required to map the port in the container to the same port locally or not. If set to `false`, VS Code and other `devcontainer.json` supporting services /  tools will attempt to use the specified port forward to `localhost`, and silently map to a different one if it is unavailable. If set to `true`, you will be notified if it is not possible to use the same port. Defaults to `false`. |
| `elevateIfNeeded` | boolean | Forwarding low ports like 22, 80, or 443 to `localhost` on the same port from VS Code (client) may require elevated permissions on certain operating systems. Setting this property to `true` will automatically try to elevate VS Code's or another `devcontainer.json` supporting tool's permissions in this situation. Defaults to `false`. |

## Formatting string vs. array properties

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
| `portsAttributes` | object | Object that maps a port number, `"host:port"` value, range, or regular expression to a set of default options. See [port attributes](#port-attributes) for available options. For example: <br />`"portsAttributes": {"3000": {"label": "Application port"}}` |
| `otherPortsAttributes` | object | Default options for ports, port ranges, and hosts that aren't configured using `portsAttributes`. See [port attributes](#port-attributes) for available options. For example: <br /> `"otherPortsAttributes": {"onAutoForward": "silent"}` |
| `remoteEnv` | object | A set of name-value pairs that sets or overrides environment variables for VS Code (or sub-processes like terminals) but not the container as a whole. Environment and [pre-defined variables](#variables-in-attached-container-configuration-files) may be referenced in the values.<br>For example: `"remoteEnv": { "PATH": "${containerEnv:PATH}:/some/other/path" }` |
| `remoteUser` | string | Overrides the user that VS Code runs as in the container (along with sub-processes like terminals, tasks, or debugging). Defaults to the user the container as a whole is running as (often `root`). |
| `userEnvProbe` | enum | Indicates the type of shell to use to "probe" for user environment variables to include in VS Code or other connected tool's processes: `none`, `interactiveShell`, `loginShell`, or `loginInteractiveShell` (default). The specific shell used is based on the default shell for the user (typically bash). For example, bash interactive shells will typically include variables set in `/etc/bash.bashrc` and `~/.bashrc` while login shells usually include variables from `/etc/profile` and `~/.profile`. Setting this property to `loginInteractiveShell` will get variables from all four files. |
| `postAttachCommand` | string,<br>array | A command string or list of command arguments to run after VS Code attaches to the container. Use `&&` in a string to execute multiple commands. For example, `"yarn install"` or `"apt-get update && apt-get install -y curl"`. The array syntax `["yarn", "install"]` will invoke the command (in this case `yarn`) directly without using a shell. Not set by default. <br>Note that the array syntax will execute the command without a shell. You can [learn more](#formatting-string-vs-array-properties) about formatting string vs array properties. |

### Variables in attached container configuration files

Variables can be referenced in certain string values in attached configuration files in the following format: **${variableName}**. The following table is a list of available variables you can use.

| Variable | Properties | Description |
|----------|---------|----------------------|
| `${containerEnv:VAR_NAME}` | `remoteEnv` | Value of an existing environment variable inside the container (in this case, `VAR_NAME`) once it is up and running. For example: `"remoteEnv": { "PATH": "${containerEnv:PATH}:/some/other/path" }` |
