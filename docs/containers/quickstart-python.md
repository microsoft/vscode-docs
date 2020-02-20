---
Order: 4
Area: containers
TOCTitle: Python
ContentId: 4e45a3f6-b72d-4647-82a5-22f7ee593d47
PageTitle: Build and run a Python app in a container
DateApproved: 2/18/2020
MetaDescription: Develop, build, and debug a Python app in a Docker container, using Visual Studio Code.
---
# Python in a container

In this guide you will learn how to:

- Create a `Dockerfile` file describing a simple Python container.
- Build, run, and verify the functionality of a [Django](https://www.djangoproject.com/), [Flask](http://flask.pocoo.org/), or General Python app.
- Debug the app running as a container.

## Prerequisites

- Docker and the VS Code Docker extension must be installed as described on the [overview](overview.md#installation).
- For Python development, complete all [Getting started with Python](/docs/python/python-tutorial.md) steps
- A runnable Python application

### Create a Python project

1. Create a folder for the project.
1. Create a new file named `hello.py` and paste

```python
print("Hello World")
```

If you want to containerize a Django or Flask web app, you can use one of the following samples:

- [python-sample-vscode-django-tutorial](https://github.com/Microsoft/python-sample-vscode-django-tutorial), which is the result of following the [Django Tutorial](/docs/python/tutorial-django.md)

- [python-sample-vscode-flask-tutorial](https://github.com/Microsoft/python-sample-vscode-flask-tutorial), which is the result of following the [Flask Tutorial](/docs/python/tutorial-flask.md)

After verifying your app runs properly, you can now Dockerize your application.

## Add Docker files to the project

1. Open the project folder in VS Code.
1. Open the Command Palette (`kb(workbench.action.showCommands)`) and use **Docker: Add Docker Files to Workspace...** command:

  ![Add Dockerfile to a Python project](images/quickstarts/python-add-python.png)

3. When the prompt appears, select **Python: Django**, **Python: Flask**, or **Python: General** as the app type. For this tutorial, we will select **Python: General**.
1. Select either **Yes** or **No** when prompted to include [Docker Compose](https://docs.docker.com/compose/) files.

1. Enter the relative path to the app’s entry point. This excludes the workspace folder you start from. [For Django](https://docs.djangoproject.com/en/3.0/intro/tutorial01/#creating-a-project), this path is commonly `manage.py` (root folder) or `subfolder_name/manage.py`. [For Flask](https://flask.palletsprojects.com/en/1.1.x/api/), this is the path to where you created your Flask instance.
1. If **Python: Django** or **Python: Flask** was selected, specify app port for local development. Django defaults to port 8000 while Flask defaults to port 5000, however, any unrestricted port will work.

1. With all this information, the Docker extension creates the following files:

    - A `Dockerfile`. By default, the name of the image is the name of the workspace folder in VS Code. To learn more about Intellisense in this file, read [Working with Docker](/docs/azure/docker.md).

    - A `.dockerignore` file to reduce the image size by excluding files and folders that aren't needed such as `.git`, `.vscode`, and `__pycache__`.

    - If Docker Compose was selected, `docker-compose.yml` and `docker-compose.debug.yml` files.

    - If one does not exist, a `requirements.txt` file for capturing all app dependencies
    > **Tip**: If virtual environment/host machine is meant to be identical to container, ensure app dependencies are ported over by running `pip freeze > requirements.txt` in the terminal to overwrite this file.

### File modifications for Django/Flask apps

To give Python Web Developers a great starting point, we chose to use [Gunicorn](https://gunicorn.org/#docs) as the default web server. Since it is referenced in the default Dockerfile, it is included as a dependency in the `requirements.txt` file.

> **Note**: To use Gunicorn as your web server, it must be included in the `requirements.txt` file as an app dependency. It does not need to be installed in your virtual environment/host machine.

#### Django Apps

To use Gunicorn, it must bind to an application callable as an entry point. This callable is declared in the `wsgi.py` file of a Django application. To accomplish this binding, the final line in the Dockerfile says:

```docker
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "{workspace_folder_name}.wsgi"]`
```

This assumption is based off Django's default project structure. If your project does not follow `django_project_name (workspace folder) -> django_project_name (subfolder) -> wsgi.py`, you must overwrite the Gunicorn entry point in the Dockerfile to locate the correct `wsgi.py` file.

> **Tip**: If your `wsgi.py` file is in the root folder, the final argument in the command above will be "wsgi". Within subfolders, the argument would be "subfolder1_name.subfolder2_name.wsgi".

#### Flask Apps

To use Gunicorn, it must bind to an application callable as an entry point. This callable corresponds with the **file location** and **variable name** of your created Flask instance. According to [official Flask Documentation](https://flask.palletsprojects.com/en/1.1.x/api/), users generally create a Flask instance in the main module or in the `__init__.py` file of their package in this manner:

```python
from flask import Flask
app = Flask(__name__)
```

To accomplish this binding, the final line in the Dockerfile says:

```docker
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "{subfolder}.{module_file}:app"]
```

You have already given the path to the Flask instance, but the Docker extension assumes your Flask instance variable is named `app`. If this is not the case, the variable name must be overwritten in the Dockerfile.

> **Tip**: If your main module was located in the root folder, named `main.py`, and the Flask instance variable was named `myapp`, the final argument in the command above will be "main:myapp". Within subfolders, the argument would be "subfolder1_name.subfolder2_name.main:myapp".

## Build, run, and debug the container

The **Docker: Add Docker Files to Workspace...** command automatically creates a Docker task configuration to build and run your container in debug mode. To debug your Python app container:

1. Edit the `hello.py` file to the text shown below:

```python
print("Hello World")
print("I'm in a container!")
```

2. Set a breakpoint on the first line.
2. Select the **Docker: Python - {Framework}** debugger configuration.

  ![Selected Docker debug configuration](images/quickstarts/python-debug-configuration.png)

2. Start debugging using the `kb(workbench.action.debug.start)` key.
    - The Docker image builds.
    - The Docker container for the app runs.
    - If you are using Django or Flask, the browser will open to a random port mapped to the app container.
    - The debugger hits the breakpoint in `hello.py`.

>**Tip**: Modify your Docker build settings (e.g. changing the image tag) from `.vscode -> tasks.json`  under the `dockerBuild` attribute in the `docker-build` task. Use IntelliSense within the file (`kb(editor.action.triggerSuggest)`) to display all other valid directives.

## Next steps

- [Set up Compose Debugging for Python Application](/docs/notcreated/yet)

Once your container is ready, you may want to:

- [Push Django Images to a Registry](https://docs.microsoft.com/azure/python/tutorial-django-push-to-registry)
- [Create a container registry using the Azure portal](https://docs.microsoft.com/azure/container-registry/container-registry-get-started-portal)
- [Deploy a containerized app to Azure App Service](/docs/containers/app-service.md)