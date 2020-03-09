---
Area: containers
TOCTitle: Push Django Images to a Registry
ContentId: 4eb2543d-84a7-4e11-b835-0d238ce7ed7a
PageTitle: Push Django Images to a Registry in Visual Studio Code
DateApproved: 02/18/2020
MetaDescription: How to push a Django image to a container registry using the VS Code docker extension
MetaSocialImage: images/tutorial/social.png
---

# Push Django Images to a Registry

## Create a container registry

Container registries are a secure online repository of images. With proper authentication, they enable cloud services such as Azure App Service to download the image and instantiate any number of running containers. This [cloud-native](https://azure.microsoft.com/overview/cloudnative/) best practice makes it possible to scale out a web app to handle increased loads.

Registry options include the following:

- The [Azure Container Registry (ACR)](https://azure.microsoft.com/services/container-registry/), a private, secure, hosted registry for your images.
- [Docker Hub](https://hub.docker.com/), Docker's own hosted registry that provides a free way to share images.
- A private registry running on your own server, as described on [Docker registry](https://docs.docker.com/registry/) in the Docker documentation.

To create an Azure Container Registry:

1. Follow [Quickstart: Create a container registry using the Azure portal](https://docs.microsoft.com/azure/container-registry/container-registry-get-started-portal), but stop before "Push image to ACR". Django deployments must include the following settings to work properly.

1. Make sure that the registry endpoint you created is visible under **Registries** in the **Docker Explorer** of VS Code:

    ![Docker Explorer in VS Code showing registries](images/quickstarts/python-django-registries.png)

## Settings for Django apps

1. In your Django project's `settings.py` file, modify the `ALLOWED_HOSTS` list to include the root URL to which you intend to deploy the app. For example, the following code assumes deployment to an Azure App Service (azurewebsites.net) named "vsdocs-django-sample-container":

    ```python
    ALLOWED_HOSTS = [
        # Example host name only; customize to your specific host
        "vsdocs-django-sample-container.azurewebsites.net"
    ]
    ```

    Without this entry, you'll see a "DisallowedHost" message after deployment that instructs to you add the website domain to `ALLOWED_HOSTS`. This will require you to rebuild, push, and redeploy the image once again.

2. On the **Command Palette** (`kb(workbench.action.showCommands)`), select **Docker: Build Image** to rebuild image with new settings.

>**Tip**: If you want to test your image in production on multiple hosting services, you can simply input `"*"` in ALLOWED_HOSTS.

## Push the image to a registry

Once `ALLOWED_HOSTS` have been declared, the next step is to push your Django image to a container registry:

1. Ensure your image is tagged with the correct path registry path (for example, `username.azurecr.io/django-tutorial:latest`).

1. Open the **Command Palette** (`kb(workbench.action.showCommands)`) and select **Docker: Push**.

1. Choose the image you just built to push into the registry. Upload progress will appear in the Terminal.

1. Once completed, expand the **Registries** > **Azure** (or **DockerHub**) node in the **Docker Explorer**, then expand the registry and image name to see the exact image. (You may need to refresh the **Docker Explorer**.)

    ![The built app image in the Azure Container Registry](images/quickstarts/python-django-image-in-acr.png)

> **Tip**: The first time you push an image, you will see that VS Code uploads each layer the image is comprised of. Subsequent push operations, however, will only update layers starting from the first that has been changed. Since you app code is usually what changes most often, this is typically why app code is copied in the final lines of a Dockerfile. To see this inner loop in action, make a small change to your code, rebuild the image, and then push again to the registry.

Now that you've pushed your image to a registry, you're ready to deploy it to any container-ready cloud service. For details on deploying to Azure App Service, see [Deploy a container](https://docs.microsoft.com/azure/python/tutorial-deploy-containers-01).
