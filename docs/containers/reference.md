---
Order: 9
Area: containers
TOCTitle: Customize
ContentId: 6784FBBE-9EE4-44A8-AC48-A52617EB1968
PageTitle: Reference for Visual Studio Code Docker extension properties and tasks.
DateApproved:
MetaDescription: Reference for Docker build and Docker run tasks and properties in the Visual Studio Code Docker extension.
---
# Customize the Docker extension

The Docker extension includes several Visual Studio Code tasks to control the behavior of Docker [build](#docker-build-task) and [run](#docker-run-task), and form the basis of container startup for debugging.

The tasks allow for a great deal of control and customization. The final configuration is a combination of general defaults, platform-specific defaults (such as .NET Core and Node.js), and user input. User input takes precedence when it conflicts with defaults.

## Docker build task

The `docker-build` task builds Docker images using the Docker command line (CLI). The task can be used by itself, or as part of a chain of tasks to run and/or debug an application within a Docker container.

The most important configuration settings for the `docker-build` task are `dockerBuild` and `platform`:

- The `dockerBuild` object specifies parameters for the Docker build command. Values specified by this object are applied directly to Docker build CLI invocation.
- The `platform` property is a hint that changes how the `docker-build` task determines Docker build defaults.

See [property reference](#build-task-reference) for full list of all task properties.

### Platform support

While the `docker-build` task can be used to build any Docker image, the extension has explicit support (and simplified configuration) for .NET Core and Node.js.

### .NET Core

**Minimal configuration using defaults**

When building .NET Core-based Docker image, one can omit the `platform` property and just set the `netCore` object (`platform` is implicitly set to `netcore` when `netCore` object is present). Note that `appProject` is a required property:

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

For .NET Core-based images, the `docker-build` task infers the following options:

| Property | Inferred Value |
| --- | --- |
| `dockerBuild.context` | The root workspace folder. |
| `dockerBuild.dockerfile` | The file `Dockerfile` in the root workspace folder. |
| `dockerBuild.tag` | The base name of the root workspace folder. |

### Node.js

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

## Build task reference

Here are all properties available for configuring `docker-build` task. All properties are optional unless indicated otherwise.

| Property | Description |
| --- | --- |
| `dockerBuild` | Options for controlling the `docker build` command executed ([see below](#dockerBuild-object-properties)). <br/> Required unless `platform` is set. |
| `platform` | Determines the platform: .NET Core (`netcore`) or Node.js (`node`) and default settings for `docker build` command. |
| `netCore` | Determines options specific for .NET Core projects ([see below](#netCore-object-properties-docker-build-task)). |
| `node` | Determines options specific for Node.js projects ([see below](#node-object-properties-docker-run-task)). |

### `dockerBuild` object properties:

| Property | Description | `docker build` CLI Equivalent |
| --- | --- | --- |
| `context` | The path to the Docker build context. <br/> Required, unless inferred from the platform. | `PATH` |
| `dockerfile` | The path to the Dockerfile. <br/> Required, unless inferred from the platform. | `-f` or `--file` |
| `tag` | The tag applied to the Docker image. <br/> Required, unless inferred from the platform. | `-t` or `--tag` |
| `buildArgs` | Build arguments applied to the command line. This is a list of key-value pairs. | `--build-arg` |
| `labels` | Labels added to the Docker image. This is a list of key-value pairs. <br/> In addition to labels specified here, a label `com.microsoft.created-by`, set to `visual-studio-code` is added to the image. This behavior can be turned off by setting `includeDefaults` extension property to false. | `--label` |
| `target` | The target in the Dockerfile to build to. | `--target` |
| `pull` | Whether or not to pull new base images before building. | `--pull` |

### `netCore` object properties (`docker-build` task)

| Property | Description |
| --- | --- |
| `appProject` | The .NET Core project file (`.csproj`, `.fsproj`, etc.) associated with the Dockerfile and `docker-build` task. <br/> Required always.  |

### `node` object properties (`docker-build` task)

| Property | Description | Default |
| --- | --- | --- |
| `package` | The path to the `package.json` file associated with the Dockerfile and `docker-build` task. | The file `package.json` in the root workspace folder. |

## Docker run task

The `docker-run` task runs (creates/starts) a Docker container using the Docker command line (CLI). The task can be used by itself, or as part of a chain of tasks to debug an application within a Docker container.

The most important configuration settings for the `docker-run` task are `dockerRun` and `platform`:

- The `dockerRun` object specifies parameters for the Docker run command. Values specified by this object are applied directly to Docker run CLI invocation.
- The `platform` property is a hint that changes how the `docker-run` task determines Docker run defaults.

See [property reference](#run-task-reference) for full list of all task properties.

### Platform support

While the `docker-run` task can be used to run any Docker image, the extension has explicit support (and simplified configuration) for .NET Core and Node.js.

### .NET Core

**Minimal configuration using defaults**

When building .NET Core-based Docker image, one can omit the `platform` property and just set the `netCore` object (`platform` is implicitly set to `netcore` when `netCore` object is present). Note that `appProject` is a required property:

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

For .NET Core-based images, the `docker-run` task infers the following options:

| Property | Inferred Value |
| --- | --- |
| `dockerRun.containerName` | Derived from the base name of the root workspace folder. |
| `dockerRun.env` | Adds the following environment variables as required: `ASPNETCORE_ENVIRONMENT`, `ASPNETCORE_URLS`, and `DOTNET_USE_POLLING_FILE_WATCHER`. |
| `dockerRun.image` | The tag from a dependent `docker-build` task (if one exists) or derived from the base name of the root workspace folder. |
| `dockerRun.os` | `Linux` |
| `dockerRun.volumes` | Adds the following volumes as required: the local application folder, the source folder, the debugger folder, the NuGet package folder, and NuGet fallback folder. |

### Node.js

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

## Run task reference

Here are all properties available for configuring `docker-run` task. All properties are optional unless indicated otherwise.

| Property | Description |
| --- | --- |
| `dockerRun` | Options for controlling the `docker run` command executed ([see below](#dockerRun-object-properties)). <br/> Required unless `platform` is set. |
| `platform` |  Determines the platform: .NET Core (`netcore`) or Node.js (`node`) and default settings for `docker run` command. |
| `netCore` | For .NET Core projects, this controls various options ([see below](#netCore-object-properties-docker-run-task)). |
| `node` | For Node.js projects, this controls various options ([see below](#node-object-properties-docker-run-task)). |

### dockerRun object properties

| Property | Description | CLI Equivalent |
| --- | --- | --- |
| `image` | The name (tag) of the image to run. <br/> Required unless inferred from the platform. | `IMAGE` |
| `command` | The command to run upon starting the container. <br/> Required, unless inferred from the platform. | `COMMAND [ARG...]` |
| `containerName` | The name given to the started container. <br/> Required, unless inferred from the platform. | `--name` |
| `env` | Environment variables set in the container. This is a list of key-value pairs. | `-e` or `--env` |
| `envFiles` | This is a list of `.env` files. | `--env-file` |
| `labels` |  Labels given to the started container. This is a list of key-value pairs. | `--label` |
| `network` |  The name of the network to which the container will be connected. | `--network` |
| `networkAlias` |  The network-scoped alias for the started container. | `--network-alias` |
| `os` |  Default is `Linux`, the other option is `Windows`. The container operating system used. | N/A |
| `ports` |  The ports to publish (map) from container to host. This is a list of objects ([see below](#ports-object-properties)). | `-p` or `--publish` |
| `portsPublishAll` |  Whether to publish all ports exposed by the Docker image.  Defaults to `true` if no ports are explicitly published. | `-P ` |
| `extraHosts` |  The hosts to add to the container for DNS resolution. This is a list of objects ([see below](#extraHosts-object-properties)). | `--add-host` |
| `volumes` |  The volumes to map into the started container. This is a list of objects ([see below](#volumes-object-properties)). | `-v` or `--volume` |

### ports object properties

| Property | Description | Default |
| --- | --- | --- |
| `containerPort` | The port number bound on the container. <br/> Required. |
| `hostPort` |  The port number bound on the host. | (randomly selected by Docker) |
| `protocol` |  The protocol for the binding (`tcp` or `udp`). | `tcp` |

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
| `permissions` |  Permissions the container has on the mapped path. Can be `ro` (read-only) or `rw` (read-write). | Container dependent.|

### netCore object properties (`docker-run` task)

| Property | Description |
| --- | --- |
| `appProject` | The .NET Core project file (`.csproj`, `.fsproj`, etc.) associated with `docker-run` task. <br/> Required. |
| `configureSsl` |  Whether to configure ASP.NET Core SSL certificates and other settings to enable SSL on the service in the container. |
| `enableDebugging` |  Whether to enable the started container for debugging. This will infer additional volume mappings and other options necessary for debugging. |

### node object properties (`docker-run` task)

| Property | Description | Default |
| --- | --- | --- |
| `package` | The path to the `package.json` file associated with the `docker-run` task. | The file `package.json` in the root workspace folder. |
| `enableDebugging` |  Whether or not to enable debugging within the container. | `false` |
| `inspectMode` |  Defines the initial interaction between the application and the debugger (`default` or `break`). <br/> The value `default` allows the application to run until the debugger attaches. <br/> The value `break` prevents the application from running until the debugger attaches. | `default` |
| `inspectPort` |  The port on which debugging should occur. | `9229` |
