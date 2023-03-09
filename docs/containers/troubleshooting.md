---
Order: 12
Area: containers
TOCTitle: Tips and Tricks
PageTitle: Visual Studio Code Docker development troubleshooting Tips and Tricks
ContentId: 79bb60fd-5248-43d2-8801-34b9fc2ec543
MetaDescription: Visual Studio Code Docker development troubleshooting tips and tricks
DateApproved: 12/21/2022
---
# Docker Tools Tips and Tricks

This article covers troubleshooting tips and tricks for the Visual Studio Code [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) extension. See the [Overview](/docs/containers/overview.md) and quickstart articles for [Node.js](/docs/containers/quickstart-node.md), [Python](/docs/containers/quickstart-python.md), or [ASP.NET](/docs/containers/quickstart-aspnet-core.md) for details on setting up and working with Docker.

## Running as a non-root user

For security reasons, we recommend selecting the default ports when executing the **Add Dockerfiles to Workspace** command, or otherwise opting for a port **greater than** 1023 whenever possible. This will allow VS Code to configure the Dockerfile with non-root access and prevent a malicious user from elevating permissions in the container. In some cases, there is no port selection, so the Docker extension configures non-root access by default. In all cases, you must ensure each resource (such as ports and files) modified or used by your application can be accessed by a non-root user in your container.

If you select a port less than 1024 when adding Dockerfiles to the workspace, the Docker extension **cannot** create a Dockerfile that runs the container as a non-root user. This is because ports in this range are called **well-known** or **system** ports and must execute with root privileges in order to bind a network socket to an IP address.

The **Add Dockerfiles to Workspace** command sets up non-root privileges if you choose a non-system port. If your current Dockerfile and `tasks.json` is not set up for non-root usage, try running the command **Add Dockerfiles to Workspace**, and select a port **greater than** 1023. This command overwrites your current Dockerfile and `tasks.json`. For some project types, such as **Python: General**, you might still need to modify your Dockerfile and `tasks.json`. Within the Dockerfile, you must expose a **non-system port**, create a working directory for your app code, and then add a non-root user with access to the app directory. Ensure that your exposed port is updated wherever it is referenced. In the example below, the Gunicorn port had to be updated to match the exposed port:

```docker
# 1024 or higher
EXPOSE 1024

# ... other directives such as installing requirements.txt file

# Creates /app in container if it does not already exist
# Ports code into /app
WORKDIR /app
ADD . /app

# Creates a non-root user and adds permission to access the /app folder
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

CMD ["gunicorn", "--bind", "0.0.0.0:1024", "pythonPath.to.wsgi"]
```

Next, ensure the `docker run` task in `tasks.json` also expects the same port. You can usually search for any occurrences of the old port number in `tasks.json` and replace it with the new port number.  The following example shows the required changes in the case of a Python Django app:

``` json
{
  "type": "docker-run",
  "label": "docker-run: debug",
  "dependsOn": [
    "docker-build"
  ],
  "python": {
    "args": [
      "runserver",
      "0.0.0.0:1024", //<- Change the number after the colon
      "--nothreading",
      "--noreload"
    ],
    "file": "manage.py"
  }
}
```

## Error "connect EACCES /var/run/docker.sock" on Linux

Since VS Code runs as a non-root user, you will need to follow the steps in "Manage Docker as a non-root user" from [Post-installation steps for Linux](https://aka.ms/AA37yk6) to access Docker from the extension.

## Docker containers and images have disappeared from Docker view

This is most likely caused by a conflict with another extension called `Docker Explorer` (not authored by Microsoft).  To resolve this issue, use a workaround described [vscode-docker issue #1609](https://github.com/microsoft/vscode-docker/issues/1609#issuecomment-586331394).

## The extension does not find Docker on a remote machine

Error message "Failed to connect. Is Docker installed and running?"

1. Make sure Docker engine **is installed** on the remote machine and that Docker CLI works (run `docker ps` from the terminal and ensure it does not return any errors).
2. If you are using a remote development environment (remote machine via SSH, WSL subsystem, GitHub Codespace), make sure the Docker extension is installed remotely as well as locally.

## Invalid URL errors

If you have a need to connect to a remote Docker daemon, we recommend using Docker contexts instead of a `docker.environment` attribute in the settings. Check out this guide to learn how to [create and use a context](https://docs.docker.com/engine/context/working-with-contexts/) to communicate with a remote Docker daemon.

If you still need to override the Docker context you are currently using, make sure your `DOCKER_HOST` environment variable or `docker.environment.DOCKER_HOST` attribute includes a protocol in the URL (for example, `ssh://myuser@mymachine` or `tcp://1.2.3.4`).

> **Note:** Keep in mind that your `docker.environment.DOCKER_HOST` attribute will override your Docker context and the `DOCKER_HOST` environment variable will override both the `docker.environment.DOCKER_HOST` attribute and your Docker context.

> **Tip**: In Powershell you can change your Docker environment variable with `$ENV:DOCKER_HOST = 'ssh://username@1.2.3.4'`

## Questions and feedback

We love your feedback! If you have any ideas or suggestions, [report an issue](https://github.com/microsoft/vscode-docker/issues/new).
