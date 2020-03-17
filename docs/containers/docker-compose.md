---
Area: containers
ContentId: 
PageTitle: Use Docker Compose to work with multiple containers
DateApproved: 03/16/2020
MetaDescription: Develop a multi-container app running in a Docker containers using Docker Compose and Visual Studio Code.
---
# Develop multi-container apps using Docker Compose

Docker Compose provides a way to orchestrate multiple containers in a single app. Examples include a service that processes requests and a front-end web site, or a service that uses a supporting function such as a Redis cache. If you are using the microservices model for your app development, you can use Docker Compose to factor the app code into several independently running services that communicate using web requests. This article helps you enable Docker Compose for your apps, whether they are Node.js, Python, or .NET Core, and also helps you configure debugging in VS Code for these scenarios.

To use Docker Compose in VS Code using the Docker extension, you should already be familiar with the basics of [Docker Compose](https://docs.docker.com/compose/).

## Adding Docker Compose support to your project

You can add Docker Compose files to your workspace at the same time you add a Dockerfile by opening the Command Palette (`kb(workbench.action.showCommands)`) and using **Docker: Add Docker Files to Workspace** command. If you already have a Dockerfile, .... VS Code adds the following files to your project:

- *docker-compose.yml* – Brings up the containers as expected in production.
- *docker-compose.debug.yml* – Provides a simplified mode for starting that enables the debugger.

The VS Code Docker extension generate the files, but you also need to understand them and configure them for your scenario. Configuration includes setting up volume mounts (your own folders shared with the container that your app needs), and any setup or configuration that's needed for the container that hosts your app. You can then use the `docker compose up` command from the command prompt or terminal window in VS Code to start the containers. Refer to the [Docker Compose docs](https://docs.docker.com/compose/) about how to configure the Docker Compose behavior.

You specify the ports that your app uses in the config files. To view or change the port mappings in the config file, inspect the container in the Docker tab to open the json configuration file, and look for `Ports` (which is the port in the container) with the child item `HostPort`(port this maps to on the host machine).

## Add new containers to your projects

If you want to add a second app or service, modify the `docker-compose.yml` file to add the new app. Typically, you can cut and paste the existing section and change the names as appropriate for the new app.

Most platforms, run the **Add Docker Files to Workspace** command again to generate the `Dockerfile` for a new app. There's one `docker-compose.yml` and one `docker-compose.debug.yml` file for project for .NET Core and Python, or one per package.json for Node.js.

### Node.js

In Node.js packages, you have the `Dockerfile`, `.dockerignore`, `docker-compose*.yml` files all in the root folder of the workspace. When you add another app or service, move the Dockerfile into the app's folder. 

- Add another folder for the second service or app.
- Open the second app as workspace in VS Code and run **Add Docker Files to Workspace** there to generate a second `Dockerfile`. When prompted, say no to `.dockerignore` and Docker Compose (you already have these).
- Move the Dockerfile into the second folder.
- Modify `docker-compose.yml` to copy the app section to paste in a section for the second app, and change references as appropriate for the second app.

### Python

### .NET

For .NET, it’s already multi-project aware; `.dockerignore` and `docker-compose*.yml` are scaffolded at the workspace root (for example, if the project is in `src/project1`, then the files are in `src`).

## Debug

If you want to debug in Docker Compose, run `docker compose up` using one of the two docker compose files.

Create an attach launch configuration. This is a section in `launch.json`.

- Pick the appropriate platform 
- Configure the debugging port in docker-compose.debug.yml
- Point to the right debugging port in the launch.json

Connect using F5 / Attach as needed (standard VS Code mechanism for attaching to a launch config using Debug tab and dropdown for configs)
Scaffolding gets close but needs to be reviewed/checked to make sure it works on F5
Exposed port typically maps to the same port locally (works if you are only debugging one app at a time)
If you have both App1 and App2, map the debug ports to different ports on the host
Process is the same per platform
The extension contributes attach scaffolding for .NET Core

Debug tab prompts/action for adding a configuration, list of available configs, VS code has built-in choices, we provide one for attaching with compose for .NET Core- adds a section of json in the launch.json file
By default, the Docker extension does not do any volume mounting. There's no need for it in .NET Core or Node.js, since it’s built-into the runtime.

If you try to attach to a .NET Core app running in a container, you'll see a prompt asking if you want to install the debugger (`.vsdbg` bits into the container).

[ TODO: For Python, I can talk to Uche]

## See also

- [Overview of Docker Compose in the Docker documentation](https://docs.docker.com/compose/)