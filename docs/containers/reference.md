---
Order: 10
Area: containers
TOCTitle: Customize
ContentId: 6784FBBE-9EE4-44A8-AC48-A52617EB1968
PageTitle: Reference for Visual Studio Code Docker extension properties and tasks.
DateApproved: 4/18/2022
MetaDescription: Reference for Docker build and Docker run tasks and properties in the Visual Studio Code Docker extension.
---
# Customize the Docker extension

The Docker extension includes several Visual Studio Code tasks to control the behavior of Docker [build](#docker-build-task) and [run](#docker-run-task), and form the basis of container startup for debugging.

The tasks allow for a great deal of control and customization. The final configuration is a combination of general defaults, platform-specific defaults (such as Node.js, Python, or .NET), and user input. User input takes precedence when it conflicts with defaults.

All common features of Visual Studio Code tasks (for example, grouping tasks into compound tasks) are supported by Docker extension tasks. For more information on common task features and properties, see the Visual Studio Code [custom task](/docs/editor/tasks.md#custom-tasks) documentation.

## Docker build task

The `docker-build` task builds Docker images using the Docker command line (CLI). The task can be used by itself, or as part of a chain of tasks to run and/or debug an application within a Docker container.

The most important configuration settings for the `docker-build` task are `dockerBuild` and `platform`:

- The `dockerBuild` object specifies parameters for the Docker build command. Values specified by this object are applied directly to Docker build CLI invocation.
- The `platform` property is a hint that changes how the `docker-build` task determines Docker build defaults.

See [property reference](#build-task-reference) for full list of all task properties.

### Platform support

While the `docker-build` task in `tasks.json` can be used to build any Docker image, the extension has explicit support (and simplified configuration) for Node.js, Python, and .NET Core.

### Node.js (docker-build)

**Minimal configuration using defaults**

A Node.js based Docker image with no specific platform options can just set the `platform` property to `node`:

```json
{
  "version": "2.0.0",
  "tasks": [
      {
          "label": "Build Node Image",
          "type": "docker-build",
          "platform": "node"
      }
  ]
}
```

**Platform defaults**

For Node.js Docker images, the `docker-build` task infers the following options:

| Property | Inferred Value |
| --- | --- |
| `dockerBuild.context` | The same directory in which the `package.json` resides. |
| `dockerBuild.dockerfile` | The file `Dockerfile` in the same directory as the `package.json` resides. |
| `dockerBuild.tag` | The application's `name` property in `package.json` (if defined), else the base name of the folder in which `package.json` resides. |

### Python (docker-build)

**Minimal configuration using defaults**

A Python based Docker image with no specific platform options can just set the `platform` property to `python`:

```json
{
  "tasks": [
      {
      "type": "docker-build",
      "label": "docker-build",
      "platform": "python"
    }
  ]
}
```

**Platform defaults**

For Python Docker images, the `docker-build` task infers the following options:

| Property | Inferred Value |
| --- | --- |
| `dockerBuild.context` | The default context is the workspace folder. |
| `dockerBuild.dockerfile` | The default `Dockerfile` path will be in the root of the workspace folder. |
| `dockerBuild.tag` | The base name of the root workspace folder. |
| `dockerBuild.pull` | Defaults to true in order to pull new base images before building. |

### .NET (docker-build)

**Minimal configuration using defaults**

When you build a .NET-based Docker image, you can omit the `platform` property and just set the `netCore` object (`platform` is implicitly set to `netcore` when `netCore` object is present). Note that `appProject` is a required property:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Build Node Image",
            "type": "docker-build",
            "netCore": {
                "appProject": "${workspaceFolder}/project.csproj"
            }
        }
    ]
}
```

**Platform defaults**

For .NET-based images, the `docker-build` task infers the following options:

| Property | Inferred Value |
| --- | --- |
| `dockerBuild.context` | The root workspace folder. |
| `dockerBuild.dockerfile` | The file `Dockerfile` in the root workspace folder. |
| `dockerBuild.tag` | The base name of the root workspace folder. |

## Build task reference

Here are all properties available for configuring `docker-build` task. All properties are optional unless indicated otherwise.

| Property | Description |
| --- | --- |
| `dockerBuild` | Options for controlling the `docker build` command executed ([see below](#dockerbuild-object-properties)). <br/> Required unless `platform` is set. |
| `platform` | Determines the platform: .NET (`netcore`) or Node.js (`node`) and default settings for `docker build` command. |
| `node` | Determines options specific for Node.js projects ([see below](#node-object-properties-dockerbuild-task)). |
| `python` | There are no object properties for Python in the `docker-build` task. |
| `netCore` | Determines options specific for .NET projects ([see below](#netcore-object-properties-dockerbuild-task)). |

### dockerBuild object properties

| Property | Description | `docker build` CLI Equivalent |
| --- | --- | --- |
| `context` | The path to the Docker build context. <br/> Required, unless inferred from the platform. | `PATH` |
| `dockerfile` | The path to the Dockerfile. <br/> Required, unless inferred from the platform. | `-f` or `--file` |
| `tag` | The tag applied to the Docker image. <br/> Required, unless inferred from the platform. | `-t` or `--tag` |
| `buildArgs` | Build arguments applied to the command line. This is a list of key-value pairs. | `--build-arg` |
| `labels` | Labels added to the Docker image. This is a list of key-value pairs (a JSON object). <br/> In addition to labels specified here, a label `com.microsoft.created-by`, set to `visual-studio-code` is added to the image. This behavior can be turned off by setting `includeDefaults` property of the `labels` object to false. | `--label` |
| `target` | The target in the Dockerfile to build to. | `--target` |
| `pull` | Whether or not to pull new base images before building. | `--pull` |
| `customOptions` | Any extra parameters to add before the context argument. No attempt is made to resolve conflicts with other options or validate this option. | (any) |

### node object properties (`docker-build` task)

| Property | Description | Default |
| --- | --- | --- |
| `package` | The path to the `package.json` file associated with the Dockerfile and `docker-build` task. | The file `package.json` in the root workspace folder. |

### netCore object properties (`docker-build` task)

| Property | Description |
| --- | --- |
| `appProject` | The .NET project file (`.csproj`, `.fsproj`, etc.) associated with the Dockerfile and `docker-build` task. <br/> Required always.  |

## Docker run task

The `docker-run` task in `tasks.json` creates and starts a Docker container using the Docker command line (CLI). The task can be used by itself, or as part of a chain of tasks to debug an application within a Docker container.

The most important configuration settings for the `docker-run` task are `dockerRun` and `platform`:

- The `dockerRun` object specifies parameters for the Docker run command. Values specified by this object are applied directly to Docker run CLI invocation.
- The `platform` property is a hint that changes how the `docker-run` task determines Docker run defaults.

See [property reference](#run-task-reference) for full list of all task properties.

### Docker run platform support

While the `docker-run` task can be used to run any Docker image, the extension has explicit support (and simplified configuration) for Node.js, Python, and .NET.

### Node.js (docker-run)

**Minimal configuration using defaults**

A Node.js based Docker image with no specific platform options can just set the `platform` property to `node`.

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Run Node Image",
            "node": "docker-run",
            "platform": "node"
        }
    ]
}
```

**Platform defaults**

For Node.js-based Docker images, the `docker-run` task infers the following options:

| Property | Inferred Value |
| --- | --- |
| `dockerRun.command` | Generated from the npm `start` script in the `package.json` (if it exists), else generated from the `main` property in the `package.json`. |
| `dockerRun.containerName` | Derived from the application package name. |
| `dockerRun.image` | The tag from a dependent `docker-build` task (if one exists) or derived from the application package name, itself derived from the `name` property within `package.json` or the base name of the folder in which it resides. |

### Python (docker-run)

When building a Python-based Docker image, you can omit the `platform` property and just set the `python` object (`platform` is implicitly set to `python` when `python` object is present)

**Minimal configuration for Django Apps**

```json
{
    "type": "docker-run",
    "label": "docker-run: debug",
    "dependsOn": [
      "docker-build"
    ],
    "python": {
      "args": [
        "runserver",
        "0.0.0.0:8000",
        "--nothreading",
        "--noreload"
      ],
      "file": "path_to/manage.py"
    }
}
```

**Minimal configuration for Flask Apps**

```json
{
    "type": "docker-run",
    "label": "docker-run: debug",
    "dependsOn": [
      "docker-build"
    ],
    "dockerRun": {
      "env": {
        "FLASK_APP": "path_to/flask_entry_point.py"
      }
    },
    "python": {
      "args": [
        "run",
        "--no-debugger",
        "--no-reload",
        "--host", "0.0.0.0",
        "--port", "5000"
      ],
      "module": "flask"
    }
}
```

**Minimal configuration for General Apps**

```json
{
    "type": "docker-run",
    "label": "docker-run: debug",
    "dependsOn": [
      "docker-build"
    ],
    "python": {
      "file": "path_to/app_entry_point.py"
    }
}
```

**Platform defaults**

For Python-based Docker images, the `docker-run` task infers the following options:

| Property | Inferred Value |
| --- | --- |
| `dockerRun.command` | Generated by the Python object and is called by the Python Debugger. |
| `dockerRun.containerName` | Derived from the base name of the root workspace folder. |
| `dockerRun.image` | The tag from a dependent docker-build task (if one exists) or derived from the base name of the root workspace folder. |

### .NET (docker-run)

**Minimal configuration using defaults**

When building a .NET-based Docker image, you can omit the `platform` property and just set the `netCore` object (`platform` is implicitly set to `netcore` when `netCore` object is present). Note that `appProject` is a required property:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Run .NET Core Image",
            "type": "docker-run",
            "netCore": {
                "appProject": "${workspaceFolder}/project.csproj"
            }
        }
    ]
}
```

**Platform defaults**

For .NET-based images, the `docker-run` task infers the following options:

| Property | Inferred Value |
| --- | --- |
| `dockerRun.containerName` | Derived from the base name of the root workspace folder. |
| `dockerRun.env` | Adds the following environment variables as required: `ASPNETCORE_ENVIRONMENT`, `ASPNETCORE_URLS`, and `DOTNET_USE_POLLING_FILE_WATCHER`. |
| `dockerRun.image` | The tag from a dependent `docker-build` task (if one exists) or derived from the base name of the root workspace folder. |
| `dockerRun.os` | `Linux` |
| `dockerRun.volumes` | Adds the following volumes as required: the local application folder, the source folder, the debugger folder, the NuGet package folder, and NuGet fallback folder. |

## Run task reference

Here are all properties available for configuring `docker-run` task. All properties are optional unless indicated otherwise.

| Property | Description |
| --- | --- |
| `dockerRun` | Options for controlling the `docker run` command executed ([see below](#dockerrun-object-properties)). <br/> Required unless `platform` is set. |
| `platform` | Determines the platform: .NET (`netcore`) or Node.js (`node`) and default settings for `docker run` command. |
| `node` | For Node.js projects, this controls various options ([see below](#node-object-properties-dockerrun-task)). |
| `python` | For Python projects, this controls various options ([see below](#python-object-properties-dockerrun-task)). |
| `netCore` | For .NET projects, this controls various options ([see below](#netcore-object-properties-dockerrun-task)). |

### dockerRun object properties

| Property | Description | CLI Equivalent |
| --- | --- | --- |
| `image` | The name (tag) of the image to run. <br/> Required unless inferred from the platform. | `IMAGE` |
| `command` | The command to run upon starting the container. <br/> Required, unless inferred from the platform. | `COMMAND [ARG...]` |
| `containerName` | The name given to the started container. <br/> Required, unless inferred from the platform. | `--name` |
| `env` | Environment variables set in the container. This is a list of key-value pairs. | `-e` or `--env` |
| `envFiles` | This is a list of `.env` files. | `--env-file` |
| `labels` | Labels given to the started container. This is a list of key-value pairs. | `--label` |
| `network` | The name of the network to which the container will be connected. | `--network` |
| `networkAlias` | The network-scoped alias for the started container. | `--network-alias` |
| `os` | Default is `Linux`, the other option is `Windows`. The container operating system used. | N/A |
| `ports` | The ports to publish (map) from container to host. This is a list of objects ([see below](#ports-object-properties)). | `-p` or `--publish` |
| `portsPublishAll` | Whether to publish all ports exposed by the Docker image.  Defaults to `true` if no ports are explicitly published. | `-P` |
| `extraHosts` | The hosts to add to the container for DNS resolution. This is a list of objects ([see below](#extrahosts-object-properties)). | `--add-host` |
| `volumes` | The volumes to map into the started container. This is a list of objects ([see below](#volumes-object-properties)). | `-v` or `--volume` |
| `remove` | Whether or not to remove the container after it stops. | `--rm` |
| `customOptions` | Any extra parameters to add before the image argument. No attempt is made to resolve conflicts with other options or validate this option. | (any) |

### ports object properties

| Property | Description | Default |
| --- | --- | --- |
| `containerPort` | The port number bound on the container. <br/> Required. |
| `hostPort` | The port number bound on the host. | (randomly selected by Docker) |
| `protocol` | The protocol for the binding (`tcp` or `udp`). | `tcp` |

### extraHosts object properties

| Property | Description |
| --- | --- |
| `hostname` | The hostname for DNS resolution. <br/> Required. |
| `ip` | The IP address associated with the above hostname. <br/> Required. |

### volumes object properties

| Property | Description | Default |
| --- | --- | --- |
| `localPath` | The path on the local machine that will be mapped. <br/> Required. |
| `containerPath` | The path in the container to which the local path will be mapped. <br/> Required. |
| `permissions` | Permissions the container has on the mapped path. Can be `ro` (read-only) or `rw` (read-write). | Container dependent.|

### node object properties (`docker-run` task)

| Property | Description | Default |
| --- | --- | --- |
| `package` | The path to the `package.json` file associated with the `docker-run` task. | The file `package.json` in the root workspace folder. |
| `enableDebugging` | Whether or not to enable debugging within the container. | `false` |
| `inspectMode` | Defines the initial interaction between the application and the debugger (`default` or `break`). <br/> The value `default` allows the application to run until the debugger attaches. <br/> The value `break` prevents the application from running until the debugger attaches. | `default` |
| `inspectPort` | The port on which debugging should occur. | `9229` |

### python object properties (`docker-run` task)

| Property | Description | Default |
| --- | --- | --- |
| `args` | Arguments passed to the Python app. | Platform dependent. Defaults of scaffolding shown [above](#python-docker-run) |
| `debugPort` | The port that the debugger will listen on. | `5678` |
| `wait` | Whether to wait for debugger to attach. | `true` |
| `module` | The Python module to run (only module **or** file should be chosen). | |
| `file` | The Python file to run (only module **or** file should be chosen). | |

### netCore object properties (`docker-run` task)

| Property | Description |
| --- | --- |
| `appProject` | The .NET project file (`.csproj`, `.fsproj`, etc.) associated with `docker-run` task. <br/> Required. |
| `configureSsl` | Whether to configure ASP.NET Core SSL certificates and other settings to enable SSL on the service in the container. |
| `enableDebugging` | Whether to enable the started container for debugging. This will infer additional volume mappings and other options necessary for debugging. |

## Docker Compose task

The `docker-compose` task in `tasks.json` creates and starts Docker containers using the Docker Compose command line (CLI). The task can be used by itself, or as part of a chain of tasks to debug an application within a Docker container.

The most important configuration setting for the `docker-compose` task is `dockerCompose`:

- The `dockerCompose` object specifies parameters for the Docker Compose command. Values specified by this object are applied directly to Docker Compose CLI invocation.

See [property reference](#compose-task-reference) for full list of all task properties.

**Example configuration**

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Run docker-compose up",
            "type": "docker-compose",
            "dockerCompose": {
                "up": {
                    "detached": true,
                    "build": true,
                    "services": [
                      "myservice"
                    ]
                },
                "files": [
                    "${workspaceFolder}/compose.yaml",
                    "${workspaceFolder}/docker-compose.debug.yml"
                ]
            }
        }
    ]
}
```

## Compose task reference

Here are all properties available for configuring `docker-compose` task. All properties are optional unless indicated otherwise.

| Property | Description |
| --- | --- |
| `dockerCompose` | Options for controlling the `docker-compose` command executed ([see below](#dockercompose-object-properties)). <br/> Required. |

### dockerCompose object properties

| Property | Description | CLI Equivalent |
| --- | --- | --- |
| `up` | Run a `docker-compose up` command. <br/> Either this or `down` must be specified, but not both. | `docker-compose up` |
| `down` | Run a `docker-compose down` command. <br/> Either this or `up` must be specified, but not both. | `docker-compose down` |
| `files` | The list of Docker Compose YAML files to use in the `docker-compose` command. If not specified, the Docker Compose CLI looks for `compose.yaml` and `docker-compose.override.yml`. | `-f <file>` |
| `envFile` | File of environment variables read in and applied to the containers. | `--env-file <file>` |
| `projectName` | Alternate project name to use when naming and labeling Docker objects. If using an alternate project name when composing up, the same project name must be specified when composing down. | `--project-name <name>` |

### up object properties

| Property | Description | CLI Equivalent | Default |
| --- | --- | --- | --- |
| `detached` | Whether or not to run detached. | `-d` | `true` |
| `build` | Whether or not to build before running. | `--build` | `true` |
| `scale` | Number of instances of each service to run. This is a list of key-value pairs. | `--scale SERVICE=NUM` |
| `services` | A subset of the services to start. Cannot be combined with `profiles`. | `[SERVICE...]` | (all) |
| `profiles` | A subset of the profiles to start. Cannot be combined with `services`. | `--profile <profile>` | (all) |
| `customOptions` | Any extra parameters to add after the `up` argument. No attempt is made to resolve conflicts with other options or validate this option. | (any) |

### down object properties

| Property | Description | CLI Equivalent | Default |
| --- | --- | --- | --- |
| `removeImages` | Whether to remove images, and which. `all` will remove all images used by any service, `local` will remove only images without a custom tag. Leaving this unset will remove no images. | `--rmi` |
| `removeVolumes` | Whether or not to remove named volumes. | `-v` | `false` |
| `customOptions` | Any extra parameters to add after the `down` argument. No attempt is made to resolve conflicts with other options or validate this option. | (any) |

## Command customization

The Docker extension executes a number of Docker CLI commands when you perform various operations, such as to build images, run containers, attach to containers, and view container logs. Some of these commands have a large number of optional arguments, often used in very specific scenarios. As an alternative to the above Visual Studio Code tasks, several commands can be customized when tasks are not in use.

For example, the tokens `${serviceList}` and `${profileList}` in the [Compose Up](#docker-compose-up) command allows for easily starting a subset of the services within your Docker Compose YAML file(s).

For each of these customizable Docker commands, a configuration setting is available to set the template of what to execute. Alternatively, you can define multiple templates, optionally with a regular expression, which when matched, hints the context in which a template should be used. The templates support some tokens similar to `launch.json` and `tasks.json`, for example, `${workspaceFolder}`.

### Settings JSON schema

You have two options for configuring each of the templates (listed below). The first option is a single template that overrides the default behavior:

```json
{
    "docker.commands.build": "docker build --rm -f \"${dockerfile}\" -t ${tag} \"${context}\""
}
```

The second option is multiple templates that will be chosen based on the `match` regular expression, as well as user input.

For example, three templates are shown in the following example:

```json
{
    "docker.commands.build": [
        {
            "label": "Default build command",
            "template": "docker build --rm -f \"${dockerfile}\" -t ${tag} \"${context}\""
        },
        {
            "label": "Alpine-specific build command",
            "template": "docker build -p 1234:1234 -f \"${dockerfile}\" -t ${tag} \"${context}\"",
            "match": "alpine"
        }
    ]
}
```

### Selection behavior

The command template chosen to execute is selected based on the following rules:

1. If no setting is configured, the default command template is chosen.
1. If only a single template is configured (the first example above), that template is chosen.
1. If multiple templates are configured:
    1. Constrained templates are checked. A constrained template has `match`. The `match` regular expression is compared against contextual hints--for example, image name, container name, etc.
    1. If multiple constrained templates apply, the user will be prompted to choose. If only one applies, the user will not be prompted.
    1. If there no applicable constrained templates, unconstrained templates are checked. An unconstrained template does not have `match`, and is therefore always applicable.
    1. If multiple unconstrained templates apply, the user will be prompted to choose. If only one applies, the user will not be prompted.

### Docker Build

| Configuration Setting | Default Value |
|--|--|
| `docker.commands.build` | `${containerCommand} build --rm -f "${dockerfile}" -t ${tag} "${context}"` |

Supported tokens:

| Token | Description |
| -- | -- |
| `${containerCommand}` | The CLI command / executable used to execute container commands. |
| `${dockerfile}` | The workspace-relative path of the selected `Dockerfile`. |
| `${tag}` | The value entered/confirmed by the user upon invoking the build command. If previously built, defaults to the previously entered value for that `Dockerfile`. |
| `${context}` | If set, the value of the `docker.imageBuildContextPath` configuration setting. Otherwise, the workspace-relative folder in which the `Dockerfile` resides. |

> **Note**: If the `docker.commands.build` setting does not contain the `${tag}` token, the user will **not** be prompted to enter/confirm a tag.

> **Note**: The `match` regular expression will be compared against the selected Dockerfile name and the workspace folder name.

### Docker Run

| Configuration Setting | Default Value |
|--|--|
| `docker.commands.run` | `${containerCommand} run --rm -d ${exposedPorts} ${tag}` |
| `docker.commands.runInteractive` | `${containerCommand} run --rm -it ${exposedPorts} ${tag}` |

Supported tokens:

| Token | Description |
| -- | -- |
| `${containerCommand}` | The CLI command / executable used to execute container commands. |
| `${exposedPorts}` | Generated from the list of exposed ports in the image (ultimately from the `Dockerfile`), where each exposed port is mapped to the same port on the local machine.  For example, `"EXPOSE 5000 5001"` would generate `"-p 5000:5000 -p 5001:5001"`. |
| `${tag}` | The full tag of the selected image. |

> **Note**: The `match` regular expression will be compared against the full tag of the selected image.

### Docker Attach

| Configuration Setting | Default Value |
|--|--|
| `docker.commands.attach` | `${containerCommand} exec -it ${containerId} ${shellCommand}`

Supported tokens:

| Token | Description |
| -- | -- |
| `${containerCommand}` | The CLI command / executable used to execute container commands. |
| `${containerId}` | The ID of the container to attach to. |
| `${shellCommand}` | If `bash` is present in the container, it is substituted here, otherwise `sh`. In Windows containers, `cmd` is always used. |

> **Note**: The `match` regular expression will be compared against the container name and full tag of the container image.

### Docker Logs

| Configuration Setting | Default Value |
|--|--|
| `docker.commands.logs` | `${containerCommand} logs -f ${containerId}`

Supported tokens:

| Token | Description |
| -- | -- |
| `${containerCommand}` | The CLI command / executable used to execute container commands. |
| `${containerId}` | The ID of the container to view the logs for. |

> **Note**: The `match` regular expression will be compared against the container name and full tag of the container image.

### Docker Compose Up

| Configuration Setting | Default Value |
|--|--|
| `docker.commands.composeUp` | `${composeCommand} ${configurationFile} up ${detached} ${build}` |

Supported tokens:

| Token | Description |
| -- | -- |
| `${configurationFile}` | Set to `-f` plus the workspace-relative path to the selected Docker Compose YAML file. |
| `${detached}` | Set to `-d` if the configuration setting `docker.dockerComposeDetached` is set to `true`. Otherwise, set to `""`. |
| `${build}` | Set to `--build` if the configuration setting `docker.dockerComposeBuild` is set to `true`. Otherwise, set to `""`. |
| `${serviceList}` | If specified, prompts for a subset of the services to start when the command is run. |
| `${profileList}` | If specified and the Docker Compose YAML file contains profiles, prompts for a subset of the profiles to start when the command is run. |
| `${composeCommand}` | Set to the value of the `docker.composeCommand` setting if set, otherwise the extension will try to automatically determine the command to use (`docker compose` or `docker-compose`). |

### Docker Compose Down

| Configuration Setting | Default Value |
|--|--|
| `docker.commands.composeDown` | `${composeCommand} ${configurationFile} down` |

Supported tokens:

| Token | Description |
| -- | -- |
| `${configurationFile}` | Set to `-f` plus the workspace-relative path to the selected Docker Compose YAML file. |
| `${composeCommand}` | Set to the value of the `docker.composeCommand` setting if set, otherwise the extension will try to automatically determine the command to use (`docker compose` or `docker-compose`). |

### Additional supported tokens

In addition to the command-specific supported tokens, the following tokens are supported in all command templates:

| Token | Description |
| -- | -- |
| `${workspaceFolder}` | The selected workspace folder path. |
| `${config:some.setting.identifier}` | The value of any configuration setting, as long as it is a string, number, or boolean. These setting identifiers can be arbitrarily defined and do not need to belong to Visual Studio Code or to any extension. |
| `${env:Name}` | The value of an environment variable. |
| `${command:commandID}` | The string return value of a command. |
