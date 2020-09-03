---
Order: 5
Area: containers
TOCTitle: Debug
ContentId: A1371726-5310-4923-B43B-240F36C6264E
PageTitle: Debug an app running in a Docker container
DateApproved: 01/29/2020
MetaDescription: Debug an app running in a Docker container, using Visual Studio Code.
---
# Debug containerized apps

With version 0.9.0 and later, the Docker extension provides more support for debugging applications within Docker containers, such as scaffolding `launch.json` configurations for attaching a debugger to applications running within a container.

The Docker extension provides a `docker` debug configuration provider that manages how VS Code will launch an application and/or attach a debugger to the application in a running Docker container. This provider is configured via entries within `launch.json`, with configuration being specific to each application platform supported by the provider.

The Docker extension currently supports debugging [Node.js](#node-js), [Python](#python), and [.NET Core](#net-core) applications within Docker containers.

## Requirements

Scaffolding or pasting a launch configuration into `launch.json` is **not sufficient** to build and debug a Docker container. To successfully run a Docker launch configuration, you must have:

- A Dockerfile.
- `docker-build` and `docker-run` tasks in `tasks.json`.
- A launch configuration that invokes these tasks.

We recommend using the **Docker: Add Docker Files to Workspace...** command to create these items, if none of these assets already exist. If you already have a functional Dockerfile, we recommend using the **Docker: Initialize for Docker debugging** command to scaffold a launch configuration and Docker-related tasks.

## Node.js

More information about debugging Node.js applications within Docker containers can be found at [Debug Node.js within a container](/docs/containers/debug-node.md).

Example `launch.json` configuration for debugging a Node.js application:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Node.js in Docker",
            "type": "docker",
            "request": "launch",
            "preLaunchTask": "Run Docker Container",
            "platform": "node"
        }
    ]
}
```

## Python

More information about debugging Python applications within Docker containers can be found at [Debug Python within a container](/docs/containers/debug-python.md).

Example `launch.json` configuration for debugging a Python application:

```json
{
  "configurations": [
    {
      "name": "Docker: Python - Django",
      "type": "docker",
      "request": "launch",
      "preLaunchTask": "docker-run: debug",
      "python": {
        "pathMappings": [
          {
            "localRoot": "${workspaceFolder}",
            "remoteRoot": "/app"
          }
        ],
        "projectType": "django"
      }
    }
  ]
}
```

## .NET Core

More information about debugging .NET Core applications within Docker containers can be found in [Debug .NET Core within Docker containers](/docs/containers/debug-netcore.md).

> The previous (Preview) .NET Core Docker debugging support (utilizing `"type": "docker-coreclr"` instead of the current preview's `"type": "docker"`) is being deprecated. You can still find documentation on that support at [Debug .NET Core - Deprecated](https://github.com/microsoft/vscode-docker/wiki/Debug-NetCore-Deprecated).

Example `launch.json` configuration for debugging a .NET Core application:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch .NET Core in Docker",
            "type": "docker",
            "request": "launch",
            "preLaunchTask": "Run Docker Container",
            "netCore": {
                "appProject": "${workspaceFolder}/project.csproj"
            }
        }
    ]
}
```

## Configuration reference

| Property | Description |
| --- | --- |
| `containerName` | Name of the container used for debugging. |
| `dockerServerReadyAction` | Options for launching a browser to the Docker container. Similar to serverReadyAction, but replaces container ports with host ports. |
| `removeContainerAfterDebug` | Whether to remove the debug container after debugging. |
| `platform` | The target platform for the application. Can be `netCore` or `node`. |
| `netCore` | Options for debugging .NET Core projects in Docker. |
| `node` | Options for debugging Node.js projects in Docker. |
| `python` | Options for debugging Python projects in Docker. |

### dockerServerReadyAction object properties

| Property | Description |
| --- | --- |
| `action` | The action to take when the pattern is found. Can be `debugWithChrome` or `openExternally`. |
| `containerName` | The container name to match the host port. |
| `pattern` | The regex pattern to look for in Debug console output. |
| `uriFormat` | The URI format to launch. |
| `webRoot` | The root folder from which web pages are served. Used only when `action` is set to `debugWithChrome`. |

### node object properties

> These properties are the same as those described in the [VS Code documentation](/docs/nodejs/nodejs-debugging.md#launch-configuration-attributes) for attaching a debugger to Node.js applications. All properties passed in the `node` object will be passed on to the Node.js debug adaptor, even if not specifically listed below.

| Property | Description | Default |
| --- | --- | --- |
| `port` | Optional. The debug port to use. | `9229` |
| `address` | Optional. TCP/IP address of the debug port. |
| `sourceMaps` | Optional. Enable source maps by setting this to `true`. |
| `outFiles` | Optional. Array of glob patterns for locating generated JavaScript files. |
| `autoAttachChildProcesses` | Optional. Track all subprocesses of debuggee and automatically attach to those that are launched in debug mode. |
| `timeout` | Optional. When restarting a session, give up after this number of milliseconds. |
| `stopOnEntry` | Optional. Break immediately when the program launches. |
| `localRoot` | Optional. VS Code's root directory. | The root workspace folder. |
| `remoteRoot` | Optional. Node's root directory within the Docker container. | `/usr/src/app` |
| `smartStep` | Optional. Try to automatically step over code that doesn't map to source files. |
| `skipFiles` | Optional. Automatically skip files covered by these glob patterns. |
| `trace` | Optional. Enable diagnostic output. |

### python object properties

| Property | Description | Default |
| --- | --- | --- |
| `host` | The host for remote debugging. | |
| `port` | The port for remote debugging. | `5678` |
| `pathMappings` | Maps the project path between local machine and remote host.  | |
| `projectType` | Type of Python app. | |
| `justMyCode` | Debug only user-written code. | |
| `django` | Django debugging. | `false` |
| `jinja` | Jinja template debugging (such as Flask). | `false` |

### netCore object properties

> Properties passed in the `netCore` object are generally passed on to the .NET Core debug adaptor, even if not specifically listed below. The complete list of debugger properties is in the [OmniSharp VS Code extension documentation](https://github.com/OmniSharp/omnisharp-vscode/blob/master/debugger-launchjson.md).

| Property | Description |
| --- | --- |
| `appProject` | The .NET Core project (.csproj, .fsproj, etc.) to debug. |

## Next steps

Read on to learn more about:

- [Debugging Node.js within Docker containers](/docs/containers/debug-node.md)
- [Debugging Python within Docker containers](/docs/containers/debug-python.md)
- [Debugging .NET Core within Docker containers](/docs/containers/debug-netcore.md)
- [Debugging with Docker Compose](/docs/containers/docker-compose.md#debug)
