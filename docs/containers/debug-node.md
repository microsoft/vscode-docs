---
Area: containers
ContentId: F0C800DD-C477-492D-9545-745F570FE042
PageTitle: Configure and troubleshoot debugging of Node.js apps running in a Docker container
DateApproved: 01/29/2020
MetaDescription: How to configure and troubleshoot debugging of Node.js apps running in a Docker container, using Visual Studio Code.
---

# Debug Node.js within a container

When adding Docker files to a Node.js project, tasks and launch configurations are added to enable debugging that application within a Docker container. However, due to the large ecosystem surrounding Node.js, those tasks cannot accommodate every application framework or library, which means that some applications will require additional configuration.

## Configuring the Docker container entry point

The Docker extension infers the entry point of the Docker container--that is, the command line for starting the application in a debug mode within the Docker container--via properties of `package.json`.  The extension first looks for the `start` script in the `scripts` object; if found and, if it starts with a `node` or `nodejs` command, it uses that to build the command line for starting the application in debug mode.  If not found or, if not a recognized `node` command, the `main` property in the `package.json` is used.  If neither is found or recognized, then you need to explicitly set the `dockerRun.command` property of the `docker-run` task used to start the Docker container.

Some Node.js application frameworks include CLIs for managing the application and are used to start the application in the `start` script, which obscure the underlying `node` commands. In these cases, the Docker extension cannot infer the start command and you must  explicitly configure the start command.

### Example: Configuring the entry point for a [Nest.js](https://nestjs.com/) application

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

### Example: Configuring the entry point for a [Meteor](https://www.meteor.com/) application

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

## Automatically launching the browser to the entry page of the application

The Docker extension can automatically launch the browser to the entry point of the application after it has started in the debugger. This feature is enabled by default and configured via the `dockerServerReadyAction` object of the debug configuration in `launch.json`.

This feature depends on several aspects of the application:

 - The application must output logs to the debug console.
 - The application must log a "server ready" message.
 - The application must serve a browsable page.

While the default settings may work for an Express.js based application, other Node.js frameworks may require explicit configuration of one or more of those aspects.

### Ensuring application logs are written to the debug console

This feature depends on the application writing its logs to the debug console of the attached debugger.  However, not all logging frameworks write to the debug console, even when configured to use a console-based logger (as some "console" loggers actually bypass the console and write directly to `stdout`).

The solution varies depending on the logging framework, but it generally requires creating/adding a logger that *actually* writes to the console.

### Example: Configuring Express applications to write to the debug console

By default, [Express.js](https://expressjs.com/) uses the [debug](https://github.com/visionmedia/debug) logging module, which can bypass the console.  This can be resolved by explicitly binding the log function to the console's `debug()` method.

```js
var app = require('../app');
var debug = require('debug')('my-express-app:server');
var http = require('http');

// Force logging to the debug console.
debug.log = console.debug.bind(console);
```

Also note that the `debug` logger writes logs only when enabled via the `DEBUG` environment variable, which can be set in the `docker-run` task. (This environment variable is set to `*` by default when Docker files are added to the application.)

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

### Configuring when the application is "ready"

The extension determines the application is "ready" to receive HTTP connections when it writes a message of the form `Listening on port <number>` to the debug console, as Express.js does by default.  If the application logs a different
message, then you should set the `pattern` property of the [dockerServerReadyAction](/docs/containers/debug-common.md#dockerserverreadyaction-object-properties) object of the debug launch configuration to a [JavaScript regular expression](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions) that matches that message. The regular expression should include a capture group that corresponds to the port on which the application is listening.

For example, suppose the application logs the following message:

```js
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Application has started on ' + bind);
}
```

The corresponding `pattern` in the debug launch configuration (in `launch.json`) is:

```json
{
    "configurations": [
        {
            "name": "Docker Node.js Launch",
            "type": "docker",
            "request": "launch",
            "preLaunchTask": "docker-run: debug",
            "platform": "node",
            "dockerServerReadyAction": {
                "pattern": "Application has started on port (\\d+)"
            }
        }
    ]
}
```

> Note the `(\\d+)` capture group for the port number, and the use of `\` as a JSON escape character for the backslash in the `\d` character class.

### Configuring the application entry page

By default, the Docker extension will open the "main" page of the browser (however that is determined by the application).  If the browser should be opened to a specific page, the `uriFormat` property of the [dockerServerReadyAction](/docs/containers/debug-common.md#dockerserverreadyaction-object-properties) object of the debug launch configuration should be set to a Node.js format string, with one string token that indicates where the port should be substituted.

The corresponding `uriFormat` in the debug launch configuration (in `launch.json`) to open the `about.html` page instead of the main page would be:

```json
{
    "configurations": [
        {
            "name": "Docker Node.js Launch",
            "type": "docker",
            "request": "launch",
            "preLaunchTask": "docker-run: debug",
            "platform": "node",
            "dockerServerReadyAction": {
                "uriFormat": "http://localhost:%s/about.html"
            }
        }
    ]
}
```

## Mapping Docker container source files to the local workspace

By default, the Docker extension assumes the application source files in the running Docker container are located in an `/usr/src/app` folder, and the debugger then maps those files back to the root of the opened workspace, in order to translate breakpoints from the container back to Visual Studio Code.

If the application source files are in a different location (for example, different Node.js frameworks have different conventions), either within the Docker container or within the opened workspace, then one or both of the `localRoot` and `remoteRoot` properties of the [node](/docs/containers/debug-node.md#node-object-properties) object of the debug launch configuration should be set the root source locations within the workspace and the Docker container, respectively.

For example, if the application instead resides in `/usr/my-custom-location`, the corresponding `remoteRoot` property would be:

```json
{
    "configurations": [
        {
            "name": "Docker Node.js Launch",
            "type": "docker",
            "request": "launch",
            "preLaunchTask": "docker-run: debug",
            "platform": "node",
            "node": {
                "remoteRoot": "/usr/my-custom-location"
            }
        }
    ]
}
```

# Troubleshooting

## Docker image fails to build or start due to missing node_modules

Dockerfiles are often arranged in such a way as to optimize either image build time, image size, or both.  However, not every Node.js application framework supports all of the typical Node.js Dockerfile optimizations. In particular, for some frameworks, the `node_modules` folder must be an immediate subfolder of the application root folder, whereas, the Docker extension scaffolds a Dockerfile where the `node_modules` folder exists at a parent or ancestor level (which is generally allowed by Node.js).

The solution is to remove that optimization from the `Dockerfile`:

```dockerfile
FROM node:10.13-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# Remove the `&& mv node_modules ../` from the RUN command:
# RUN npm install --production --silent && mv node_modules ../
RUN npm install --production --silent
COPY . .
EXPOSE 3000
CMD npm start
```