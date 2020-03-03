---
Area: containers
ContentId: f9ffec31-9253-4f71-a4eb-79ea7b3a8f55
PageTitle: Configure and troubleshoot debugging of Python apps running in a Docker container
DateApproved: 01/29/2020
MetaDescription: How to configure and troubleshoot debugging of Python apps running in a Docker container, using Visual Studio Code.
---

# Debug Python within a container

When adding Docker files to a Python project, tasks and launch configurations are added to enable debugging the application within a Docker container. To accommodate the various scenarios of Python projects, some apps may require additional configuration.

## Configuring the Docker container entry point

The Docker extension infers the entry point of the Docker container via properties of `tasks.json`. This container entry point is automatically configured when using the **Docker: Add Docker Files to Workspace...** command.

### Example: Configuring the entry point for a Python module

```json
{
  "tasks": [
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
        "module": "manage"
      }
    }
  ]
}
```

### Example: Configuring the entry point for a Python file

```json
{
  "tasks": [
    {
      "type": "docker-run",
      "label": "docker-run: debug",
      "dependsOn": [
        "docker-build"
      ],
      "python": {
        "file": "hello_app/webapp.py"
      }
    }
  ]
}
```

## Automatically launching the browser to the entry page of the application

The Docker extension can automatically launch the browser to the entry point of the application after it has started in the debugger. This feature is enabled by default and configured via the `dockerServerReadyAction` object of the debug configuration in the`launch.json`.

This feature depends on several aspects of the application:

 - The application **must output to the debug console or Docker logs**.
 - The application must log a "server ready" message.
 - The application must serve a browsable page.

Here is an example of using the `dockerServerReadyAction` to launch the browser to open the `about.html` page based on a specific server message pattern:

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
      },
      "dockerServerReadyAction": {
        "action": "openExternally",
        "pattern": "Starting development server at (https?://\\S+|[0-9]+)",
        "uriFormat": "%s://localhost:%s/about.html"
      }
    }
  ]
}
```

### Important dockerServerReadyAction attributes

- `action`: The action to take when the pattern is found. Can be debugWithChrome or openExternally.

- `pattern`: If the application logs a different message than shown above, then you should set the `pattern` property of the [dockerServerReadyAction](/docs/containers/debug-common.md#dockerServerReadyAction-object-properties) object to a [JavaScript regular expression](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions) that matches that message. The regular expression should include a capture group that corresponds to the port on which the application is listening.

- `uriFormat`: By default, the Docker extension will open the "main" page of the browser (however that is determined by the application).  If you want the browser to open a specific page like the example above, the `uriFormat` property of the [dockerServerReadyAction](debug-common.md#dockerServerReadyAction-object-properties) object should be set to a format string, with two string tokens to indicate the protocol and port substitution.

### How to debug your application with Gunicorn

This should work with anything if you attach the debugger.
Import debugger and wait for it to attach.
Could work with any web server

Launch configuration
```json

```