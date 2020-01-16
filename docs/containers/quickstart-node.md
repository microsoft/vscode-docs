---
Order: 7
Area: containers
TOCTitle: Node.js
ContentId: A963901F-BF3F-455F-AD75-AB54EAE72BEF
PageTitle: Build and run a Node.js app in a container
DateApproved:
MetaDescription: Develop, build, and debug a Node.js app in a Docker container, using Visual Studio Code.
---
# Build and run a Node.js app in a container

In this guide you will learn how to:

- Create a `Dockerfile` file for a simple Node.js service container
- Build, run, and verify the functionality of the service
- Debug the service running within a container

## Prerequisites

- Docker and the VS Code Docker extension must be installed as described on the [[Home page|Home#installation]]
- [Node.js](https://nodejs.org/) version 10 or later

## Create a Node.js application

1. Open the project folder in VS Code
1. Open a development command prompt in the project folder and create the project:

   ```bash
   npx express-generator
   npm install
   ```

## Add Docker file to the project

1. Open the Command Palette (`kb(workbench.action.showCommands)`) and use `Docker: Add Docker Files to Workspace...` command:

   // TODO: Add image

1. Select `Node.js` when prompted for the application platform
1. Select `Yes` or `No` when prompted to include Docker Compose files

   > The Docker Compose files are optional and not used for debugging the application within a container.
1. Enter `3000` when prompted for the application port

The extension will create the `Dockerfile` and `.dockerignore` files. If Docker Compose files are included, they will be generated as well. Finally, the extension will create a set of **VS Code tasks** for building and running the container (in both debug- and release-configurations), and a **debugging configuration** for launching the container in debug mode.

## Start the application

1. Open a terminal (`kb(workbench.action.terminal.toggleTerminal)`)
1. Enter `npm run start` to start the application:

   ```output
   > express-app@0.0.0 start /Users/user/code/scratch/express-app
   > node ./bin/www
   ```

## Build the image

1. Open the Command Palette (`kb(workbench.action.showCommands)`) and select the `Docker Images: Build Image...` command
1. Open the Docker view and verify that the new image is visible in the Images tree:

   // TODO: Add image

## Test the service container

1. Right-click on the image built in the previous step and select `Run` or `Run Interactive`. The container should start and you should be able to see it in the Containers tree:

   // TODO: Add image

1. Open the web browser and navigate to [http://localhost:3000](http://localhost:3000). You should see a page similar to the following:

   // TODO: Add image

1. When done testing, right-click the container in the Containers tree and select `Stop`

## Debug in the service container

When Docker files were added to the application, the Docker extension also added a **VS Code debugger configuration** for debugging the service when it is running inside a container. The extension will automatically detect the protocol and port that the service is using and point the browser to the service, but the application needs to ensure that its output is written to the debug console:

1. Open the `.bin/www` file in the editor
1. After the `require()` statements shown below, add:

   ```javascript
   var app = require('../app');
   var debug = require('debug')('express-guide-2:server');
   var http = require('http');

   // Add the following line to force the debug logger to write to the debug console.
   debug.log = console.debug.bind(console);
   ```

1. Make sure the `Docker Node.js Launch and Attach` is selected

   // TODO: Add image

1. Start debugging (use the `F5` key)
    - The Docker container for the service is built
    - The browser opens to the (random) port mapped to the service container

## Next steps

[Learn more about debugging Node.js](/docs/containers/debug-node.md)
