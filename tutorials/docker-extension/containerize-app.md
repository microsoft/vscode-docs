---
Order: 3
Area: docker
TOCTitle: Create the image
PageTitle: Create the Docker image
MetaDescription: Create the Docker image to deploy to Azure App Services with Visual Studio Code
DateApproved: 06/19/2018
---
# Create your app image

The Docker extension makes it easy to create your image and push it to the registry. (A container is specifically an instance of image; an image can be used to start many identical containers.)

If you don't already have an app to deploy, you can use one of the following:

- Python: use the [python-sample-vscode-flask-tutorial](https://github.com/Microsoft/python-sample-vscode-flask-tutorial) sample, which is the result of following the [Flask Tutorial](../python/tutorial-flask.md).
- Node.js: follow the [Node.js tutorial](/docs/nodejs/nodejs-tutorial.md).

## Add Docker files

Defining an image means with creating the necessary Docker files as described in the following steps. **Note**: The Python tutorial sample already contains these files.

1. On the **Command Palette** (`kb(workbench.action.showCommands)`), select the **Docker: Add Docker files to workspace** command.
1. Select your app type, such as **Python** or **Node.js**.
1. Select the port on which your app listens. For Python, the Flask app from the tutorial uses port 5000. For Node.js, the app created in the tutorial using the Express generator uses port 3000.
1. With this information, the Docker extension adds the following files that describe the environment for your app including the location of the source files and the command to start the app within a container.

    - A `.dockerignore` file that excludes specific files and folders from the image, such as `.git`, `.vsdocde`, and `node_modules`. **Note**: for Python, add "__pycache__" to this file.
    - `docker-compose.yml` and `docker-compose.debug.yml` files, which describe the image name and your selected port.
    - The `Dockerfile` file that describes the contents of the image. By default, the name of the image is the name of the workspace folder in VS Code.

1. Make any necessary modification to the Docker files before proceeding.

    **Python**
    Open `Dockerfile` and change the `WORKDIR` and `ADD` entries to refer to your app folder. If you're using the sample, for instance, these entires should appear as follows:

    ```dockerfile
    WORKDIR /HelloFlask
    ADD . /HelloFlask
    ```

    Then replace the `CMD` line with the following to run Flask when the container starts up:

    ```dockerfile
    ENV FLASK_APP=HelloFlask/app.py
    CMD ["flask", "run"]
    ```

> **Tip**: VS Code provides great support for Docker files. See the [Working with Docker](/docs/azure/docker.md) topic to learn about rich language features like smart suggestions, completions, and error detection.

## Build a Docker image

1. On the **Command Palette** (`kb(workbench.action.showCommands)`), select **Docker: Build Image** to build the image.
1. When prompted for the Docker file, choose the `Dockerfile` that was just created.
1. When prompted for the image name, it's a best practice to include your registry. For example, if you're using the Azure Container Registry, the name would be similar to the following:

    `vsdocsregistry.azurecr.io/flask-tutorial:latest`, or `vsdocsregistry.azurecr.io/myexpressapp:latest`

    If you're using Docker hub, you use your Docker hub username, such as:

    `vsdocsteam/flask-tutorial:latest`, or `vsdocsteam/myexpressapp:latest`

    The general form is `[registry or username]/[image name]:[tag]`.

1. As Docker builds the image, output appears in the Terminal panel. The output shows each step, or layer, that makes up the app environment.
1. When the build is complete, the image appears in the **Docker** explorer under **Images**:

![Docker Image](images/docker-extension/image-list.png)

## Push the image to a registry

1. On the **Command Palette** (`kb(workbench.action.showCommands)`), select **Docker: Push**.
1. Choose the image you just built to push the image to the registry.
1. Progress is shown in the Terminal.
1. Once completed, expand the **Registries** > **Azure** (or **DockerHub**) node in the **Docker** explorer, then expand the registry and image name to see the exact image. (You may need to refresh the **Docker** explorer.)

![Image in ACR](images/docker-extension/image-in-acr.png)

Next, you deploy the app image to Azure App Service.

----

<a class="tutorial-next-btn" href="/tutorials/docker-extension/deploy-container">I've created an image for my application</a> <a class="tutorial-feedback-btn" onclick="reportIssue('docker-extension', 'containerize-app')" href="javascript:void(0)">I ran into an issue</a>
