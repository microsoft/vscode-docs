---
ContentId: A1371726-5310-4923-B43B-240F36C6264E
DateApproved: 12/14/2023
MetaDescription: Debug an app running in a container, using Visual Studio Code.
---
# Debug containerized apps

The Container Tools extension provides more support for debugging applications within containers, such as scaffolding `launch.json` configurations for attaching a debugger to applications running within a container.

The Container Tools extension provides a `docker` debug configuration provider that manages how VS Code will launch an application and/or attach a debugger to the application in a running container. This provider is configured via entries within `launch.json`, with configuration being specific to each application platform supported by the provider.

The Container Tools extension currently supports debugging [Node.js](#nodejs), [Python](#python), and [.NET](#net) applications within containers.

## Requirements

Scaffolding or pasting a launch configuration into `launch.json` is **not sufficient** to build and debug a container. To successfully run a container launch configuration, you must have:

- A Dockerfile.
- `docker-build` and `docker-run` tasks in `tasks.json`.
- A launch configuration that invokes these tasks.

We recommend using the **Containers: Add Docker Files to Workspace...** command to create these items, if none of these assets already exist. If you already have a functional Dockerfile, we recommend using the **Containers: Initialize for container debugging** command to scaffold a launch configuration and container-related tasks.

## Node.js

More information about debugging Node.js applications within containers can be found at [Debug Node.js within a container](/docs/containers/debug-node.md).

Example `launch.json` configuration for debugging a Node.js application:

```json
{
    "configurations": [
        {
            "name": "Containers: Node.js Launch",
            "type": "docker",
            "request": "launch",
            "preLaunchTask": "docker-run: debug",
            "platform": "node"
        }
    ]
}
```

## Python

More information about debugging Python applications within containers can be found at [Debug Python within a container](/docs/containers/debug-python.md).

Example `launch.json` configuration for debugging a Python application:

```json
{
  "configurations": [
    {
      "name": "Containers: Python - Django",
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

## .NET

You can choose between two ways of building and debugging your project within containers:

- **With .NET SDK**: If you are familiar with `MSBuild` or want to containerize your project without a Dockerfile, this is the recommended choice.
  >**Note**: This option is only available for .NET SDK 7 and above and uses the `dotnet publish` command to build the image.

- **With a Dockerfile**: If you prefer customizing your project with a `Dockerfile`, choose this option.

For more details about these two options, refer to [Debug .NET within containers](/docs/containers/debug-netcore.md).

Example `launch.json` configuration for debugging a .NET application using `Dockerfile`:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Containers: .NET Launch",
            "type": "docker",
            "request": "launch",
            "preLaunchTask": "Run Container",
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
| `dockerServerReadyAction` | Options for launching a browser to the container. Similar to serverReadyAction, but replaces container ports with host ports. |
| `removeContainerAfterDebug` | Whether to remove the debug container after debugging. |
| `platform` | The target platform for the application. Can be `netCore` or `node`. |
| `netCore` | Options for debugging .NET projects in containers. |
| `node` | Options for debugging Node.js projects in containers. |
| `python` | Options for debugging Python projects in containers. |

### dockerServerReadyAction object properties

| Property | Description |
| --- | --- |
| `action` | The action to take when the pattern is found. Can be `debugWithChrome` or `openExternally`. |
| `containerName` | The container name to match the host port. |
| `pattern` | The regex pattern to look for in Debug console output. |
| `uriFormat` | The URI format to launch. |
| `webRoot` | The root folder from which web pages are served. Used only when `action` is set to `debugWithChrome`. |

### node object properties

> These properties are the same as those described in the [VS Code documentation](/docs/nodejs/nodejs-debugging-configuration.md#launch-configuration-attributes) for attaching a debugger to Node.js applications. All properties passed in the `node` object will be passed on to the Node.js debug adaptor, even if not specifically listed below.

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
| `remoteRoot` | Optional. Node's root directory within the container. | `/usr/src/app` |
| `smartStep` | Optional. Try to automatically step over code that doesn't map to source files. |
| `skipFiles` | Optional. Automatically skip files covered by these glob patterns. |
| `trace` | Optional. Enable diagnostic output. |

### python object properties

| Property | Description | Default |
| --- | --- | --- |
| `host` | The host for remote debugging. | |
| `port` | The port for remote debugging. | `5678` |
| `pathMappings` | Maps the project path between local machine and remote host.  | |
| `projectType` | The type of your Python project, `flask` for Flask projects, `django` for Django, `fastapi` for FastAPI, and general for others. The project type will be used to set the port and commands used for debugging. |
| `justMyCode` | Debug only user-written code. | |
| `django` | Django debugging. | `false` |
| `jinja` | Jinja template debugging (such as Flask). | `false` |

### netCore object properties

> Properties passed in the `netCore` object are generally passed on to the .NET debug adaptor, even if not specifically listed below. The complete list of debugger properties is in the [OmniSharp VS Code extension documentation](https://github.com/OmniSharp/omnisharp-vscode/blob/master/debugger-launchjson.md).

| Property | Description |
| --- | --- |
| `appProject` | The .NET project (.csproj, .fsproj, etc.) to debug. |

## Next steps

Read on to learn more about:

- [Debugging Node.js within containers](/docs/containers/debug-node.md)
- [Debugging Python within containers](/docs/containers/debug-python.md)
- [Debugging .NET within containers](/docs/containers/debug-netcore.md)
- [Debugging with Docker Compose](/docs/containers/docker-compose.md#debug)
- [Troubleshooting](/docs/containers/troubleshooting.md)
