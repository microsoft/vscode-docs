---
Area: containers
ContentId: f9ffec31-9253-4f71-a4eb-79ea7b3a8f55
PageTitle: Configure and troubleshoot debugging of Python apps running in a Docker container
DateApproved: 03/05/2020
MetaDescription: How to configure and troubleshoot debugging of Python apps running in a Docker container, using Visual Studio Code.
---

# Debug Python within a container

When adding Docker files to a Python project, tasks and launch configurations are added to enable debugging the application within a Docker container. To accommodate the various scenarios of Python projects, some apps may require additional configuration.

## Configuring the Docker container entry point

You can configure the entry point of the Docker container by setting properties in `tasks.json`. VS Code automatically configures the container entry point when you first use the **Docker: Add Docker Files to Workspace...** command.

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
        "module": "myapp"
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
        "args": [
          "runserver",
          "0.0.0.0:8000",
          "--nothreading",
          "--noreload"
        ],
        "file": "manage.py"
      }
    }
  ]
}
```

## Automatically launching the browser to the entry page of the application

You can select the **Docker: Python - Django** or **Docker: Python - Flask** launch configurations to automatically launch the browser to the main page of the app. This feature is enabled by default, but you can configure this behavior explicitly by setting the `dockerServerReadyAction` object in `launch.json`.

This feature depends on several aspects of the application:

- The application **must output to the debug console or Docker logs**.
- The application must log a "server ready" message.
- The application must serve a browsable page.

Here is an example of using `dockerServerReadyAction` to launch the browser to open the `about.html` page based on a specific server message pattern:

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

  > **Note**: The regex found in the `pattern` attribute simply attempts to capture a logged message similar to "Starting development server at `http://localhost:8000`". It accommodates variations in the url for http or https, any host name, and any port.

### Important dockerServerReadyAction object properties

- `action`: The action to take when the pattern is found. Can be `debugWithChrome` or `openExternally`.

- `pattern`: If the application logs a different message than shown above, set the `pattern` property of the [dockerServerReadyAction](/docs/containers/debug-common.md#dockerServerReadyAction-object-properties) object to a [JavaScript regular expression](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions) that matches that message. The regular expression should include a capture group that corresponds to the port on which the application is listening.

- `uriFormat`: By default, the Docker extension will open the main page of the browser (however that is determined by the application). If you want the browser to open a specific page like the example above, the `uriFormat` property of the [dockerServerReadyAction](debug-common.md#dockerServerReadyAction-object-properties) object should be set to a format string with two string tokens to indicate the protocol and port substitution.

### How to debug your app with Gunicorn

 The **Docker: Python - Django** and **Docker: Python - Flask** launch configurations automatically override the Gunicorn entry point of the container with the Python debugger. More information about Python debugger import usage can be found [here](https://github.com/microsoft/ptvsd#ptvsd-import-usage).

To debug your app running with Gunicorn (or any other web server):

1. Add ptvsd to your `requirements.txt` file:

    ```python
    ptvsd==4.3.2
    ```

1. Add the following code snippet to the file that you wish to debug:

    ```python
    import ptvsd
    ptvsd.enable_attach(address=('0.0.0.0', 5678))
    ptvsd.wait_for_attach()
    ```

1. Add a **Python: Remote Attach** configuration to `launch.json` in the `.vscode` folder:

    ```json
    {
      "name":"Python: Remote Attach",
      "type":"python",
      "request":"attach",
      "port":5678,
      "host":"localhost",
      "pathMappings":[{
          "localRoot":"${workspaceFolder}",
          "remoteRoot":"/app"}
      ]
    }
    ```

1. Save the `launch.json` file.
1. Modify the `docker-compose.yml` file to expose the debugger port by adding `5678:5678` to the [ports section](https://docs.docker.com/compose/). If you are using `docker run` to run your container from the terminal, you must append `-p 5678:5678`.
1. Start the container by right-clicking on a `docker-compose.yml` file and selecting **Compose Up** or doing `docker run` from the command line.
1. Set a breakpoint in the chosen file.
1. Navigate to **Run and Debug** and select the **Python: Remote Attach** launch configuration.
1. Hit `kb(workbench.action.debug.start)` to attach the debugger.

## Next steps

Learn more about:

- [Configuring a non-root user in your container](/docs/containers/python-user-rights.md)