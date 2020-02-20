---
Order: 12
Area: python
TOCTitle: Push Django Images to a Registry
ContentId: 4e45a3f6-b72d-4647-82a5-22f7ee593d47
PageTitle: Push Django Images to a Registry in Visual Studio Code
DateApproved: 08/12/2019
MetaDescription: How to push a Django image to a container registry using the VS Code docker extension
MetaSocialImage: images/tutorial/social.png
---

# Push Django Images to a Registry

## Create a container registry

Container registries are a secure online repository of images. With proper authentication, they enable cloud services such as Azure App Service to download the image and instantiate any number of running containers. This [cloud-native](https://azure.microsoft.com/en-us/overview/cloudnative/) best practice makes it possible to scale out a web app to handle increased loads.

Registry options include the following:

- The [Azure Container Registry (ACR)](https://azure.microsoft.com/services/container-registry/), a private, secure, hosted registry for your images.
- [Docker Hub](https://hub.docker.com/), Docker's own hosted registry that provides a free way to share images.
- A private registry running on your own server, as described on [Docker registry](https://docs.docker.com/registry/) in the Docker documentation.

To create an Azure Container Registry:

1. Follow [Quickstart: Create a container registry using the Azure portal](https://docs.microsoft.com/azure/container-registry/container-registry-get-started-portal), but stop before "Push image to ACR". Django deployments must include the settings described below to work properly.

2. Make sure that the registry endpoint you created is visible under **Registries** in the **Docker** explorer of VS Code:

    ![Docker explorer in VS Code showing registries](images/create-containers/registries.png)

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

>**Tip**: If you want to test your image in production on multiple App Services, you can simple input `"*"` in ALLOWED_HOSTS.

## Push the image to a registry

Once `ALLOWED_HOSTS` have been declared, the next step is to push your Django image to a container registry:

1. On the **Command Palette** (`kb(workbench.action.showCommands)`), select **Docker: Push**.

2. Choose the image you just built to push into the registry. Upload progress will appear in the Terminal.

3. Once completed, expand the **Registries** > **Azure** (or **DockerHub**) node in the **Docker** explorer, then expand the registry and image name to see the exact image. (You may need to refresh the **Docker** explorer.)

    ![The built app image in the Azure Container Registry](images/create-containers/image-in-acr.png)

> **Tip:** The first time you push an image, you see that VS Code uploads all of the different layers that make up the image. Subsequent push operations, however, upload only those layers that have changed. Because it's typically only your app code that's changes, those uploads happen much more quickly, making for a tight edit-build-deploy-test loop. To see this, make a small change to your code, rebuild the image, and then push again to the registry. The whole process typically completes in a matter of seconds.

Now that you've pushed your image to a registry, you're ready to deploy it to any container-ready cloud service. For details on deploying to Azure App Service, see [Deploy a container](https://docs.microsoft.com/azure/python/tutorial-deploy-containers-01).