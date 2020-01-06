---
Area: containers
ContentId: F0C800DD-C477-492D-9545-745F570FE042
PageTitle: Debug a Node.js app running in a Docker container
DateApproved: 12/12/2019
MetaDescription: Debug a Node.js app running in a Docker container, using Visual Studio Code.
---
# Debugging Node.js within Docker containers

## Walkthrough

Start with an existing Node.js application or create a new one

```bash
> express my-express-app
> cd my-express-app
> npm install
> code .
```

Add Docker files to the application

Press `kb(workbench.action.showCommands)` to open the command palette and select the `Docker: Add Docker Files to Workspace` command

Select `Node.js`

Select either `Yes` or `No` to include Docker Compose files. (Neither option affects whether you can debug the application in VS Code.)

Enter the port on which the application listens (e.g. typically `3000`)

The Docker extension will add, at minimum, a `.dockerignore` and `Dockerfile` files. It will also add tasks for building and running the application within a Docker container, as well as a launch configuration for debugging the application.

## Common Node.js Debugging Configuration Tasks

### Configuring the Docker container entry point

The Docker extension infers the entry point of the Docker container--that is, the command line for starting the application in a debug mode within the Docker container--via properties of `package.json`.  The extension will first look for the `start` script in the `scripts` object; if found and, if it starts with a `node` or `nodejs` command, it will be used to build the command line for starting the application in debug mode.  If not found or, if not a recognized `node` command, the `main` property in the `package.json` will be used.  If neither is found or recognized, then the user will need to set the `dockerRun.command` property of the `docker-run` task used to start the Docker container.

Some Node.js application frameworks include CLIs for managing the application and used to start the application in the `start` script, which obscure the underlying `node` commands. In these cases, the Docker extension cannot infer the start command and the user must configure it manually.

#### Example: Configuring the entry point for a [Nest.js](https://nestjs.com/) application

```json
{
    "tasks": [
        {
            "type": "docker-run",
            "label": "docker-run: debug",
            "dependsOn": [
                "docker-build"
            ],
            "dockerRun": {
                "command": "nest start --debug 0.0.0.0:9229",
            },
            "node": {
                "enableDebugging": true
            }
        }
    ]
}
```

#### Example: Configuring the entry point for a [Meteor](https://www.meteor.com/) application

```json
{
    "tasks": [
        {
            "type": "docker-run",
            "label": "docker-run: debug",
            "dependsOn": [
                "docker-build"
            ],
            "dockerRun": {
                "command": "node --inspect=0.0.0.0:9229 main.js",
            },
            "node": {
                "enableDebugging": true
            }
        }
    ]
}
```

### Ensuring application logs are written to the debug console

The Docker extension can automatically launch the browser to the entry point of the application after it has started in the debugger. (This feature is enabled by default and configured via the `dockerServerReadyAction` object of the debug configuration in `launch.json`.) This feature depends on the application writing its logs to the debug console of the attached debugger.  However, not all logging frameworks will write to the debug console, even when configured to use a console-based logger (as some "console" loggers will actually bypass the console and write directly to `stdout`).

The solution varies depending on the logging framework, but it generally requires creating/adding a logger that *actually* writes to the console.

#### Example: Configuring Express.js applications to write to the debug console

By default, Express.js uses the [`debug`](https://github.com/visionmedia/debug) logging module, which can bypass the console.  This can be resolved by explicitly binding the log function to the console's `debug()` method.

```js
var app = require('../app');
var debug = require('debug')('my-express-app:server');
var http = require('http');

debug.log = console.debug.bind(console);
```

Also note that the `debug` logger will not write logs unless enabled via the `DEBUG` environment variable, which can be set in the `docker-run` task. (This environment variable is set to `*` by default when Docker files are added to the application.)

```json
{
    "tasks": [
        {
            "type": "docker-run",
            "label": "docker-run: debug",
            "dependsOn": [
                "docker-build"
            ],
            "dockerRun": {
                "env": {
                    "DEBUG": "*"
                }
            },
            "node": {
                "enableDebugging": true
            }
        }
    ]
}
```

### Automatically launching the browser to the entry page of the application

### Mapping Docker container source files to the local workspace

## Troubleshooting

### Docker image fails to build or start due to missing `node_modules` folder
