---
Order: 11
Area: python
TOCTitle: Create containers
ContentId: 4e45a3f6-b72d-4647-82a5-22f7ee593d47
PageTitle: Create Docker containers for Python web apps in Visual Studio Code
DateApproved: 08/12/2019
MetaDescription: How to create and run Docker containers for Python web apps using the VS Code docker extension
MetaSocialImage: images/tutorial/social.png
---
# Create and Run Docker Containers for Python

This tutorial walks you through the full process of containerizing an existing Python application using [Docker](https://www.docker.com/) within Visual Studio Code. We demonstrate how to use base container images that include production-ready web servers (uwsgi and nginx) for both [Django](https://www.djangoproject.com/) and [Flask](http://flask.pocoo.org/) web apps.

If you have any problems during this tutorial, please file an issue to the [VS Code documentation repository](https://github.com/Microsoft/vscode-docs/issues).

## Introduction to containers

A container allows you to run your application in a lightweight runtime environment pre-installed with only app-specific dependencies while leveraging the resources of the host operating system. They give you the freedom to build and test your application in this environment locally before deploying to the cloud to run anywhere.

For additional background on containers and helpful diagrams, refer to the [Docker documentation](https://docs.docker.com/get-started/).

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- Complete all [Getting started with Python](/docs/python/python-tutorial.md) steps
- [Docker Desktop](https://www.docker.com/products/docker-desktop). Verify your installation by running the command `docker --version`
- The [Docker extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
- A runnable Python application

### Example applications

If you don't already have a working Python app, use one of the following samples. After verifying your app runs properly, follow this guide to build and run a containerized application.

- [python-sample-vscode-django-tutorial](https://github.com/Microsoft/python-sample-vscode-django-tutorial), which is the result of following the [Django Tutorial](/docs/python/tutorial-django.md)

- [python-sample-vscode-flask-tutorial](https://github.com/Microsoft/python-sample-vscode-flask-tutorial), which is the result of following the [Flask Tutorial](/docs/python/tutorial-flask.md)

## Create a container image

A container image bundles your app code and its dependencies. To accomplish this, the `Dockerfile` serves as an image template and contains all commands a user would have specified in the terminal to build an image. The `docker build` command uses the `Dockerfile` to create an automated build process that executes each command-line instruction in succession.

## Create the Docker files

1. In VS Code, open the **Command Palette** (`kb(workbench.action.showCommands)`) and select the **Docker: Add Docker files to workspace** command.

2. When the prompt appears, select **Python** as the app type.
3. For the purposes of this tutorial, select **No** to including Docker Compose. Refer to the [Docker Compose](https://docs.docker.com/compose/) guide if you plan to containerize multiple applications.
4. Select between **Django, Flask, or Other** for the framework.
5. Specify the port on which your app listens. Django apps typically use port 8000 for local development while Flask users typically use port 5000, however, any unrestricted port will work. This simply maps which port your container will open locally in its host environment.

6. With all this information, the Docker extension creates the following files:

    - A `Dockerfile`. By default, the name of the image is the name of the workspace folder in VS Code. To learn more about Intellisense in this file, read [Working with Docker](/docs/azure/docker.md).

    - A `.dockerignore` file to reduce the image size by excluding files and folders that aren't needed in the image, such as `.git`, `.vscode`, and `__pycache__`.

    - If Docker Compose was selected, `docker-compose.yml` and `docker-compose.debug.yml` files.

    - A `requirements.txt` file created using `pip freeze > requirements.txt` in the terminal to capture all project dependencies required for installation on the container. (Django and Flask only)
    - A `uwsgi.ini` file to configure uWSGI server (Django and Flask only)

## Dockerfile for Django/Flask apps

The Docker extension selects a default image based on your framework selection.

The `tiangolo` base image provides production-ready web servers using uWSGI and nginx. The **Docker: Add Docker files to workspace** command creates a pre-formed `uwsgi.ini` and `requirements.txt` file to greatly simplify deploying your app to hosts such as Azure App Service.

### Dockerfile for Django apps

The default base image for Django is `tiangolo/uwsgi-nginx:python3.6-alpine3.7`. Other versions of Python are available in the [tiangolo/uwsgi-nginx repository](https://github.com/tiangolo/uwsgi-nginx-docker) on GitHub.

The following steps are minor modifications you may want to make before building your image.

1. Make sure the `requirements.txt` file in your project contains Django and its dependencies. If it's missing, you can install Django using the `python -m pip install django` command and then regenerate the `requirements.txt` file using `pip freeze > requirements.txt` in the terminal.

2. To maintain the efficiency of your website as it scales, you may want to use nginx to serve static files. If so, copy the `nginx.conf` file from the [django-react-devcontainer repo](https://github.com/qubitron/django-react-devcontainer/blob/master/nginx.conf) into the root of your main Django project folder. This nginx configuration follows the convention `main_django_project_folder/static/app_name/staticfiles`. Modify the config file or the location of your static files accordingly.

### Dockerfile for Flask apps

The default base image for Flask is `tiangolo/uwsgi-nginx-flask:python3.6-alpine3.7`. Other versions of Python are available in the [tiangolo/uwsgi-nginx-flask repository](https://github.com/tiangolo/uwsgi-nginx-flask-docker) on GitHub.

The following steps are minor modifications you may want to make before building your image.

1. Make sure the `requirements.txt` file in your project contains Flask and its dependencies. If it's missing, you can install Flask using the `python -m pip install flask` command and then regenerate the `requirements.txt` file using the command `pip freeze > requirements.txt`.

  > **Note:** For nginx to serve static files, the location of the static files folder must be declared in the `Dockerfile`. This location is assumed to be the `/static` folder under your `app_name` folder. Modify your `Dockerfile` if this is not the case.

## Build and test the image

With the necessary `Dockerfile` in place, you're ready to build the Docker image and run it locally:

1. Make sure that Docker is running on your computer.

1. On the VS Code **Command Palette** (`kb(workbench.action.showCommands)`), select **Docker: Build Image**.

1. The image will be tagged with the project folder name by default. To tag the image, right-click on the image and select **Tag**.

    ![Docker Image](images/create-containers/image-tag.png)

1. When prompted for a tag to give the image, use a name that follows the conventional form of `<registry or username>/<image name>:<tag>`, where `<tag>` is typically `latest`. Here are some examples (when using the Azure Container Registry):

    ```sh
    # Example for Azure Container Registry, prefixed with the registry name
    vsdocsregistry.azurecr.io/python-sample-vscode-django-tutorial:latest

    # Example for Docker hub, prefixed with your username
    vsdocs-team/python-sample-vscode-flask-tutorial:latest
    ```

1. Each step of Docker's build process appears in the VS Code Terminal panel, including any errors that occur running the steps in the `Dockerfile`.

    > **Note**: Every time you run the **Docker: Build image** command, the Docker extension opens another Terminal in VS Code in which to run the command. You can close each terminal once the build is complete. Alternately, you can reuse the same terminal to build the image by scrolling up in the command history using the up arrow.

1. When the build is complete, the image appears in the **Docker** explorer under **Images**:

    ![Docker Image](images/create-containers/image-list.png)

1. Run and test your container locally by right-clicking the image and selecting **Run** or **Run Interactive** (to execute commands at the time of running the container).

    ![Docker Image](images/create-containers/image-run.png)

1. Open your browser to `localhost:<container_port>` and watch your Web App in action!

## Next steps

Now that you've created a container with your app, you're ready to push the image to a container registry before deploying it to any container-ready cloud service.

- For Django apps, see [Push Django images to a registry](https://docs.microsoft.com/azure/python/tutorial-django-push-to-registry).
- For Flask and other apps, see [Quickstart: Create a container registry using the Azure portal](https://docs.microsoft.com/azure/container-registry/container-registry-get-started-portal) and then [Deploy a container to Azure App Service](https://docs.microsoft.com/azure/python/tutorial-deploy-containers-01).

You can also learn more about the Docker extension for VS Code by visiting the [vscode-docker](https://github.com/Microsoft/vscode-docker) repository on GitHub. Issues and contributions are welcome.

Once more, if you have any problems during this tutorial, please file an issue to the [VS Code documentation repository](https://github.com/Microsoft/vscode-docs/issues).