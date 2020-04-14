---
Area: containers
ContentId: c63d86a0-48f8-4724-ba24-fa5ce4199632
PageTitle: Use Docker Compose to work with multiple containers
DateApproved: 03/16/2020
MetaDescription: Develop a multi-container app running in a Docker containers using Docker Compose and Visual Studio Code.
---
# Develop multi-container apps using Docker Compose

Docker Compose provides a way to orchestrate multiple containers in a single app. Examples include a service that processes requests and a front-end web site, or a service that uses a supporting function such as a Redis cache. If you are using the microservices model for your app development, you can use Docker Compose to factor the app code into several independently running services that communicate using web requests. This article helps you enable Docker Compose for your apps, whether they are Node.js, Python, or .NET Core, and also helps you configure debugging in VS Code for these scenarios.

For single container usage, using Docker Compose provides tool-independent configuration. Configuration settings such as volume mounts for the container, port mappings, and environment variables can be declared in the docker-compose YML files.

To use Docker Compose in VS Code using the Docker extension, you should already be familiar with the basics of [Docker Compose](https://docs.docker.com/compose/).

## Adding Docker Compose support to your project

You can add Docker Compose files to your workspace at the same time you add a Dockerfile by opening the Command Palette (`kb(workbench.action.showCommands)`) and using **Docker: Add Docker Files to Workspace** command. If you want to keep your existing Dockerfile, choose **No** when prompted to overwrite the Dockerfile.

The Docker extension adds the following files to your workspace:

- *docker-compose.yml* – Brings up the containers as expected in production.
- *docker-compose.debug.yml* – Provides a simplified mode for starting that enables the debugger. This is not available with Python. For Python, see [How to debug your app with Gunicorn](/docs/containers/debug-python.md#how-to-debug-your-app-with-gunicorn).

![Screenshot of project with docker-compose files](./images/compose/docker-compose-files.png)

The VS Code Docker extension generate the files, but you also need to understand them and configure them for your scenario. Configuration includes setting up volume mounts (your own folders shared with the container that your app needs), and any setup or configuration that's needed for the container that hosts your app. You can then use the **Docker Compose Up** command (right-click on the *docker-compose.yml* file to find the menu item for this, or find the command in the Command Palette). You can also use the `docker-compose up` command from the command prompt or terminal window in VS Code to start the containers. Refer to the [Docker Compose docs](https://docs.docker.com/compose/up) about how to configure the Docker Compose behavior and what command-line options are available.

![Screenshot of Docker Compose Up command](images/compose/compose-up.png)

You specify the ports that your app uses in the json configuration files in the `.vscode` folder, `launch.json` and `tasks.json`. To view or change the port mappings in the config file, inspect the container in the Docker tab to open the json configuration file, and look for `Ports` (which is the port in the container) with the child item `HostPort`(port this maps to on the host machine).

```json
    "NetworkSettings": {
        "Bridge": "",
        "SandboxID": "7d1ea3e06002a76bf13cb58bf59a99fc5b8e6a3b9db82af86b0e078e600b51ce",
        "HairpinMode": false,
        "LinkLocalIPv6Address": "",
        "LinkLocalIPv6PrefixLen": 0,
        "Ports": {
            "443/tcp": null,
            "80/tcp": [
                {
                    "HostIp": "0.0.0.0",
                    "HostPort": "32768"
                }
            ]
        },
        //...
    }
```

>[!TIP] When using Docker Compose, don't specify a host port. Instead, let the Docker pick a random available port to automatically avoid port conflict issues.

## Add new containers to your projects

If you want to add a second app or service, modify the `docker-compose.yml` file to add the new service. Typically, you can cut and paste the existing service section and change the names as appropriate for the new service.

You can run the **Add Docker Files to Workspace** command again to generate the `Dockerfile` for a new app. There's one `docker-compose.yml` and one `docker-compose.debug.yml` file for project for .NET Core and Python, or one per package.json for Node.js.

In Node.js packages and Python projects, you have the `Dockerfile`, `.dockerignore`, `docker-compose*.yml` files all in the root folder of the workspace. When you add another app or service, move the Dockerfile into the app's folder.

- Add another folder for the second service or app.
- Open the second app as workspace in VS Code and run **Add Docker Files to Workspace** there to generate a second `Dockerfile`. When prompted, say no to `.dockerignore` and Docker Compose (you already have these).
- Move the Dockerfile into the second folder.
- Modify `docker-compose.yml` to copy the app section to paste in a section for the second app, and change references as appropriate for the second app.

For Python, the situation is similar to Node.js, but there is no docker-compose.debug.yml file.

For .NET, the folder structure is already set up to handle multiple projects you create the Docker Compose files, `.dockerignore` and `docker-compose*.yml` are placed in the workspace root (for example, if the project is in `src/project1`, then the files are in `src`), so when you add another service, you create another project in a folder, say `project2`, and modify the docker-compose files as described previously.

## Debug

First, refer to the debugging docs for your target platform,  to understand the basics on debugging in containers with VS Code:

- [Node.js debugging docs](/docs/containers/debug-node.md)
- [Python Docker debugging docs](/docs/containers/debug-python.md)
- [.NET Core debugging docs](/docs/containers/debug-netcore.md)

If you want to debug in Docker Compose, run the command **Docker Command Up** using one of the two docker compose files as described in the previous section, and then attach using the appropriate **Attach** launch configuration. Launching directly using the normal launch configuration does not use Docker Compose.

When you choose attach, VS Code asks to choose a container. You can also specify the container name so you don't get asked. VS code tries to install `vsdbg` on target container using a default path, but you can also provide a path to a previously installed instance of `vsdbg`.

![Screenshot of attach choose container](./images/compose/select-container-group.png)

Create an attach [launch configuration](/docs/editor/debugging.md#launch-configurations). This is a section in `launch.json`. The process is mostly manual, but in some cases, the Docker extension can help by adding a pre-configured launch configuration that you can use as a template and customize. The basic process is as follows:

- On the **Debug** tab, choose the **Configuration** dropdown, choose **New Configuration** and select the `Docker Attach` configuration template for appropriate platform.  For example, **.NET Core Docker Attach (Preview)**.
- Configure the debugging port in `docker-compose.debug.yml`. This is set when you create the file, so you might not need to change it. In the example below for a Node.js app, port 9229 is used for debugging on both the host and the container.

   ```yml
    version: '3.4'

    services:
      node-hello:
        image: node-hello
        build: .
        environment:
          NODE_ENV: development
        ports:
          - 3000
          - 9229:9229
        command: node --inspect=0.0.0.0:9229 ./bin/www
    ```

    Python apps do not include the *docker-compose.debug.yml* file.

- If you have multiple apps, you need to change the port for one of them, so that each app has a unique port. You can point to the right debugging port in the `launch.json`, and save the file. If you omit this, the port will be chosen automatically. 

    ```json
        "configurations": [
            {
                "type": "node",
                "request": "attach",
                "name": "Docker: Attach to Node",
                "remoteRoot": "/usr/src/app",
                "port": 9229
            },
            // ...
        ]
    ```

- On the **Debug** tab in the **Configuration** dropdown, select the configuration you just created.

Once `launch.json` is configured, select your new launch configuration as the active configuration. In the **Debug** tab, find the new configuration in the **Configuration** dropdown.  

![Screenshot of Configuration dropdown](./images/compose/docker-compose-configuration.png)

The extension generates the launch configuration in the `launch.json` file, but you need to review it and make any appropriate changes for your scenario. For example, the exposed port typically maps to the same port locally if you're only debugging one app at a time, but if you have multiple apps and multiple containers, you'll need to map the debug ports to different ports on the host.

To start debugging a running app or service, first make sure the **Attach** configuration you created is selected in the **Debug** tab configuration dropdown, then launch the debugger in the usual way. From the **Debug** tab, choose the green arrow (**Start** button) or use `kb(workbench.action.debug.start)`.

![Screenshot of starting debugging](images/compose/docker-compose-attach.png)

When you attach, the web browser doesn't open automatically, so you need to start the browser on the host and navigate to the app at `http://localhost:{port}`, where the `port` is found by inspecting the .json configuration for the running container as described previously.  

![Screenshot of debug session](./images/compose/docker-compose-debugging.png)

The process for configuring debugging is the same for each platform. For .NET Core, the extension generates the launch configuration for attaching to your service. For Python and Node.js, you can copy and modify the following examples. Copy the code into `launch.json` and modify the settings as needed.

### Node.js

Here's an example that shows the Node.js launch configuration - Attach:

```json
    "configurations": [
        {
            "type": "node",
            "request": "attach",
            "name": "Docker: Attach to Node",
            "remoteRoot": "/usr/src/app",
            "port": 9229 // This is optional. It will be inferred from the docker-compose.debug.yml file.
        },
        // ...
    ]
```

### Python

Python doesn't have a *docker-compose.debug.yml*. Here's an example showing the Python launch configuration - Django Attach:

```json
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
            // ...
        }
    ]
```

### .NET

An example launch configuration for an ASP.NET web app in a Docker container is shown in the following code:

```json
        {
            "name": "Docker .NET Core Attach (Preview)",
            "type": "docker",
            "request": "attach",
            "platform": "netCore",
            "sourceFileMap": {
                "/src": "${workspaceFolder}"
        }
```

If you try to attach to a .NET Core app running in a container, you'll see a prompt asking if you want to install the debugger (`.vsdbg` bits into the container).

![Screenshot of debugger install prompt](./images/compose/docker-compose-netcore-debugger-prompt.png)

Select your app's container group.

![Screenshot of container group selection](./images/compose/select-container-group.png)

### Volume mounts

By default, the Docker extension does not do any volume mounting for debugging components. There's no need for it in .NET Core or Node.js, since the required components are built into the runtime. If your app requires volume mounts, specify them by using the `volumes` tag in the docker-compose.yml files.

```yml
volumes:
    - /host-folder-path:/container-folder-path
```

## See also

- [Overview of Docker Compose in the Docker documentation](https://docs.docker.com/compose/)
