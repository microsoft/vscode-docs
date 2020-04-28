---
Area: containers
TOCTitle: User Privileges in Python Containers
ContentId: 1ebbceb6-ae61-4b98-953d-0b18323becc4
PageTitle: User Privileges in Python Containers
DateApproved: 04/20/2020
MetaDescription: How to setup a non-root user for VS Code Docker Extension
---

# User privileges in Python containers

When containerizing an application for production, your goal should be to port existing code into a separate runtime environment without introducing unforeseen security concerns. For this reason, you should select the default port for **Python: Django** (8000) and **Python: Flask** (5000) during execution of the **Add Dockerfiles to Workspace** command, or opt for a port **greater than** 1023. This will allow VS Code to configure the Dockerfile with non-root access and prevent a malicious user from elevating permissions in the container, ultimately [obtaining host machine root access](https://nvd.nist.gov/vuln/detail/CVE-2019-5736). When you choose **Python: General**, the Docker extension configures non-root access by default, since no port is chosen. However, in all cases, to use a non-root user within a container, you must ensure each resource your application needs to read or modify [can be accessed](#invalid-file-permissions).

If a user selects ports less than 1024 when adding Dockerfiles to workspace, by default, **we cannot** scaffold a Dockerfile that will run the container as a non-root user. This is because ports in this range are called **well-known** or **system** ports and must execute with root privileges in order to bind a network socket to an IP address.

This guide will help you to:

- Configure a non-root user in your application by modifying your Dockerfile and `tasks.json`.
- Fix potential errors due to running as a non-root user.

## Running your containerized app as a non-root user

The **Add Dockerfiles to Workspace** command for Django and Flask automatically sets up non-root privileges if you choose a non-system port. If your current Dockerfile and `tasks.json` is not setup for non-root usage, follow these steps:

- Run **Add Dockerfiles to Workspace**.
- Choose **Python: Django** or **Python: Flask**.
- Select a port **greater than** 1023.
- Overwrite your current Dockerfile and `tasks.json`.

If you chose **Python: General**, non-root privileges will be set up by default, but you may want to modify your Dockerfile and `tasks.json` as described below to add port access.

### Docker file changes

Within the Dockerfile, you must expose a non-system port, create a working directory for your app code, and then add a non-root user with access to the app directory. Lastly, ensure your exposed port **matches** the port binding of the Gunicorn command. The `CMD` command below configures Gunicorn for a Django container. For more information on configuring Gunicorn, refer to the documentation on [Gunicorn configuration for Django/Flask apps](/docs/containers/quickstart-python.md#file-modifications-for-djangoflask-apps).

``` dockerfile
# 1024 or higher
EXPOSE 1024

# ... other directives such as installing requirements.txt file

# Creates /app in container if it does not already exist
# Ports code into /app
WORKDIR /app
ADD . /app

# Switches to a non-root user and changes the ownership of the /app folder"
RUN useradd appuser && chown -R appuser /app
USER appuser

CMD ["gunicorn", "--bind", "0.0.0.0:1024", "pythonPath.to.wsgi"]
```

### Modifications to `tasks.json` for Django\Flask apps

After choosing a non-system port and setting up the container to run as a non-root user, we must ensure the `docker run` task within `tasks.json` also expects the same port.

#### Django Apps

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
      "0.0.0.0:1024", //Change the number after the colon
      "--nothreading",
      "--noreload"
    ],
    "file": "manage.py"
  }
}
```

#### Flask Apps

``` json
{
  "type": "docker-run",
  "label": "docker-run: debug",
  "dependsOn": [
    "docker-build"
  ],
  "dockerRun": {
    "env": {
      "FLASK_APP": "flask_folder/flask_project.py"
    }
  },
  "python": {
    "args": [
      "run",
      "--no-debugger",
      "--no-reload",
      "--host 0.0.0.0",
      "--port 1024" //Change this port number
    ],
    "module": "flask"
  }
}
```

## Potential errors when running as a non-root user

Following the guide up to this point should eliminate most configuration issues caused by running as a non-root user. However, we have compiled a list (non-exhaustive) of common errors you may run into.

If you encounter any other problems due to running as a non-root user, **please** report the issue in the [Docker Extension repository](https://github.com/microsoft/vscode-docker/issues/new). We love your feedback!

### Invalid file permissions

If you are reading, writing, or creating a file within your container, a non-root user might not have access to folders or files in specific directories unless directly given.

For example, if you added to your Dockerfile:

```dockerfile
RUN mkdir /extra
```

The `/extra` folder will be created in the root directory of your container **outside** of the `/app` folder. Therefore, if you tried to create and write to a file named `file.txt` with:

```python
f = open("/extra/file.txt", "a")
f.write("We wrote some text")
f.close()
```

You will see the error:

```python
Exception has occurred: PermissionError
[Errno 13] Permission denied: '/extra/file.txt'
```

To solve this issue, we need to correctly add permissions to the non-root user to gain access to this specific file or directory in the container. Within your Dockerfile, add:

```dockerfile
RUN useradd appuser && chown -R appuser /app

# Adds permission to appuser (non-root) for access to the /extra folder
RUN chown -R appuser /extra
```

> **Note**: This is just one example of how to add permissions. There are many ways to do so and it is your responsibility give the least permission possible to specific files and folders.

### Binding to an inaccessible port

If your container starts and stops immediately after `kb(workbench.action.debug.start)` without producing logs in the **Debug Console**, we can try to diagnose the issue through these steps:

1. Open and modify your `launch.json` file:

    ```json
    {
      "name": "Docker: Python - Django",
      "type": "docker",
      "request": "launch",
      "preLaunchTask": "docker-run: debug",
      "removeContainerAfterDebug": false, //add this line
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
    ```

1. Hit `kb(workbench.action.debug.start)` to run your container again.
1. After the container exits once more, navigate to the Docker Extension, right-click the container, and select **View Logs**.

  ![User clicking view logs on their container](images/quickstarts/python-user-rights-view-logs.png)

In a Django app, you may see the error:

  > Error: You don't have permission to access that port.

In a Flask app, you may see the error:

  > self.socket.bind(self.server_address)
  > PermissionError: [Errno 13] Permission denied

This likely means you are exposing a system-port (ports less than 1024) while attempting to run as a non-root user. This incompatible configuration is demonstrated in the image above.

To solve this issue, modify your Dockerfile and `tasks.json` file in the manner shown [above](#running-your-containerized-app-as-a-nonroot-user).
