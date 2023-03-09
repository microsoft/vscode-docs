---
Area: containers
ContentId: f9ffec31-9253-4f71-a4eb-79ea7b3a8f55
PageTitle: Configure and troubleshoot debugging of Python apps running in a Docker container
DateApproved: 12/21/2021
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

- `pattern`: If the application logs a different message than shown above, set the `pattern` property of the [dockerServerReadyAction](/docs/containers/debug-common.md#dockerserverreadyaction-object-properties) object to a [JavaScript regular expression](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions) that matches that message. The regular expression should include a capture group that corresponds to the port on which the application is listening.
- `uriFormat`: By default, the Docker extension will open the main page of the browser (however that is determined by the application). If you want the browser to open a specific page like the example above, the `uriFormat` property of the [dockerServerReadyAction](/docs/containers/debug-common.md#dockerserverreadyaction-object-properties) object should be set to a format string with two string tokens to indicate the protocol and port substitution.

## How to enable hot reloading in Django or Flask apps

When you select **Docker: Add Docker Files to Workspace** for Django or Flask, we provide you a Dockerfile and `tasks.json` configured for static deployment. Each time you make changes to your app code, you need to rebuild and re-run your container. Hot reloading allows you to visualize changes in your app code as your container continues to run. Enable hot reloading with these steps:

### For Django Apps

1. In the Dockerfile, comment out the line that adds app code to the container.

    ```docker
    #ADD . /app
    ```

1. Within the `docker-run` task in the `tasks.json` file, create a new `dockerRun` attribute with a `volumes` property. This setting creates a mapping from the current workspace folder (app code) to the `/app` folder in the container.

    ``` json
    {
      "type": "docker-run",
      "label": "docker-run: debug",
      "dependsOn": [
        "docker-build"
      ],
      "dockerRun": {
        "volumes": [
          {
            "containerPath": "/app", "localPath": "${workspaceFolder}"
          }
        ]
      },
      ...
    }
    ```

1. Edit the python attribute by **removing** `--noreload` and `--nothreading`.

    ``` json
    {
      ...
      "dockerRun": {
        "volumes": [
          {
            "containerPath": "/app", "localPath": "${workspaceFolder}"
          }
        ]
      },
      "python": {
        "args": [
          "runserver",
          "0.0.0.0:8000",
        ],
        "file": "manage.py"
      }
    }
    ```

1. Select the **Docker: Python – Django** launch configuration and hit `kb(workbench.action.debug.start)` to build and run your container.
1. Modify and save any file.
1. Refresh the browser and validate changes have been made.

### For Flask Apps

1. In the Dockerfile, comment out the line that adds app code to the container.

    ```docker
    #ADD . /app
    ```

1. Within the `docker-run` task in the `tasks.json` file, edit the existing dockerRun attribute by adding a `FLASK_ENV` in the `env` property as well as a `volumes` property. This setting creates a mapping from the current workspace folder (app code) to the `/app` folder in the container.

    ``` json
    {
      "type": "docker-run",
      "label": "docker-run: debug",
      "dependsOn": [
        "docker-build"
      ],
      "dockerRun": {
        "env": {
          "FLASK_APP": "path_to/flask_entry_point.py",
          "FLASK_ENV": "development"
        },
        "volumes": [
          {
            "containerPath": "/app", "localPath": "${workspaceFolder}"
          }
        ]
      },
      ...
    }
    ```

1. Edit the python attribute by **removing** `--no-reload` and `--no-debugger`.

    ``` json
    {
      ...
      "dockerRun": {
        "env": {
          "FLASK_APP": "path_to/flask_entry_point.py",
          "FLASK_ENV": "development"
        },
        "volumes": [
          {
            "containerPath": "/app", "localPath": "${workspaceFolder}"
          }
        ]
      },
      "python": {
        "args": [
          "run",
          "--host", "0.0.0.0",
          "--port", "5000"
        ],
        "module": "flask"
      }
    }
    ```

1. Select the **Docker: Python – Flask** launch configuration and hit `kb(workbench.action.debug.start)` to build and run your container.
1. Modify and save any file.
1. Refresh the browser and validate changes have been made.

## How to build and run a container together

1. In the previously mentioned `tasks.json` file, there is a dependency on the `docker-build` task. The task is part of the `tasks` array in `tasks.json`. For example:

```json
"tasks":
[
  {
    ...
  },
  {
    "label": "docker-build",
    "type": "docker-build",
    "dockerBuild": {
        "context": "${workspaceFolder}",
        "dockerfile": "${workspaceFolder}/Dockerfile",
        "tag": "YOUR_IMAGE_NAME:YOUR_IMAGE_TAG"
    }
  }
]
```

**Tip:** As the dependency clearly states `docker-build` as its dependency, the name has to match this task. You can change the name, if desired.

1. The `dockerBuild` object in the JSON allows for the following parameters:

    - context: The docker build context, from which your Dockerfile is called
    - dockerfile: The path to the Dockerfile to execute
    - tag: The name of the image to be built, with its version tag

1. Overall, a VS Code setup for building and debugging your Flask application can be:

    - `launch.json`

      ```json
      {
          "version": "0.2.0",
          "configurations": [
            {
              "name": "Debug Flask App",
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
                "projectType": "flask"
              },
              "dockerServerReadyAction": {
                "action": "openExternally",
                "pattern": "Running on (http?://\\S+|[0-9]+)",
                "uriFormat": "%s://localhost:%s/"
              }
            }
          ]
      }
      ```

    - `tasks.json`

      ```json
      {
        "version": "2.0.0",
        "tasks": [
          {
            "type": "docker-run",
            "label": "docker-run: debug",
            "dependsOn": [
                "docker-build"
            ],
            "dockerRun": {
                "containerName": "YOUR_IMAGE_NAME",
                "image": "YOUR_IMAGE_NAME:YOUR_IMAGE_TAG",
                "env": {
                    "FLASK_APP": "path_to/flask_entry_point.py",
                    "FLASK_ENV": "development"
                },
                "volumes": [
                    {
                        "containerPath": "/app",
                        "localPath": "${workspaceFolder}"
                    }
                ],
                "ports": [
                    {
                        "containerPort": 5000,
                        "hostPort": 5000
                    }
                ]
            },
            "python": {
                "args": [
                    "run",
                    "--host",
                    "0.0.0.0",
                    "--port",
                    "5000"
                ],
                "module": "flask"
            }
        },
        {
            "label": "docker-build",
            "type": "docker-build",
            "dockerBuild": {
                "context": "${workspaceFolder}",
                "dockerfile": "${workspaceFolder}/Dockerfile",
                "tag": "YOUR_IMAGE_NAME:YOUR_IMAGE_TAG"
            }
          }
        ]
      }
      ```

## Next steps

Learn more about:

- [Configuring a non-root user in your container](/docs/containers/troubleshooting.md#running-as-a-non-root-user)
