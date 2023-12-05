---
Order: 7
Area: containers
TOCTitle: Registries
ContentId: 318A4299-AF24-4ADA-863D-E73B314FC440
PageTitle: Quickstart - Using container registries
DateApproved: 12/1/2023
MetaDescription: Work with Docker container registries in Visual Studio Code
---
# Using container registries

A container registry is a storage and content delivery system, holding named Docker images, available in different tagged versions.

Users can connect to Docker registries from the following sources:

- [Azure Container Registry](https://learn.microsoft.com/azure/container-registry)
- [Docker Hub](https://hub.docker.com/)
- [GitHub](https://github.com) container registry
- Any generic private registry that supports the [Docker V2 api](https://docs.docker.com/registry/spec/api/)

## Push an image to a container registry

Before you can deploy a Docker image, the image must be uploaded to a container registry. The image can be uploaded to [Docker Hub](https://hub.docker.com/), [Azure Container Registry (ACR)](https://learn.microsoft.com/azure/container-registry/container-registry-get-started-portal) or another registry. You can follow the same steps to push the image regardless of whether you're pushing to Docker Hub, Azure Container Registries, or any other registry. If you don't already have an Azure Container Registry, you can create one during the **Push** step.

1. Open the Docker Explorer, select **Connect Registry...** icon under the **Registries** group, and follow the prompt. Choose the provider (for example, Azure or Docker Hub) and provide the credential to connect to the registry. If prompted, install the [Azure Resources](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureresourcegroups) extension.

    ![Connect to Registry](images/registries/connect-registry-2.png)

2. Now the registry will be visible under **Registries**.

   ![Registries](images/registries/explorer-registries.png)

3. Optionally, tag the image. In order to upload an image to a registry, the image needs to be tagged with registry name so that the docker push will upload it to the right registry. If the image isn't tagged when you try to push it, VS Code asks you what registry you want to associate with the image.
    - Images you previously built appear in the Docker Explorer under the **Images** tab. Right-click and choose **Tag...**.

        ![Tag image](images/registries/explorer-tag-image.png)
    - Specify the new name `<your registry or username>/<image name>:<tag>` and complete the
    tag action. For example, new image name for ACR would be `mainacr.azurecr.io/webapp6:latest` and for Docker Hub it would be `myusername/webapp6:latest`.

4. The image shows up in the Docker Explorer in the **Images** tab under the registry that the image tag points to. Select this image and choose **Push**. If the image has not yet been tagged, you're prompted to choose a registry to push to, or create a new registry, and the image is tagged based on the selection.

    ![Push image](images/registries/explorer-push-image.png)

5. Once the push command is completed, refresh the registry node where the image is pushed to and the uploaded image will show up.

    ![Refresh registry](images/registries/explorer-refresh-registry.png)

## Docker Hub

This connects to [Docker Hub](https://hub.docker.com/) and lists all of the repositories and images under the given account.
Once you select this option, you will be required to type in your Docker Hub credentials.

![Docker Hub](images/registries/docker-hub.png)

For each repository in the Docker Hub registry, here are the actions that can be performed:

- **Pull repository**: copies all of the images in a given repository locally
- **Open in browser**: opens the browser and navigates to the given repository on Docker Hub
- **Refresh**: refreshes the repository to reflect changes

For each tagged image in a repository, here are the actions that can be performed:

- **Pull image**: copies the latest version of the image locally
- **Copy Full Tag**: copies the full tag to the clipboard
- **Deploy Image to Azure App Service**: deploys the image to Azure App Service, see [Deploy images to Azure](/docs/containers/app-service.md) page
- **Deploy Image to Azure Container Apps**: deploys the image to Azure Container Apps, see [Deploy images to Azure](/docs/containers/app-service.md) page
- **Open in browser**: opens the browser and navigates to the given image on Docker Hub

## Azure Container Registry

This option requires the [Azure Resources](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureresourcegroups) extension to be able to connect to your Azure account and display all of the different subscriptions and registries.
Once authenticated, the node **Azure** will display the subscriptions along with registries each have:

![Azure Container Registry](images/registries/azure-registries.png)

For each registry, users have different actions that can be performed using the context menu:

![Azure registry context menu](images/registries/azure-registry-context-menu.png)

- **Delete Registry**: deletes the registry permanently
- **Open in Portal**: opens the browser and navigates to the registry in Azure Portal
- **View Properties**: opens the registry properties in a json format
- **Refresh**: refreshes the registry to reflect changes

For each repository in a given registry, here are the actions that can be performed:

![Azure repository context menu](images/registries/azure-repository-context-menu.png)

- **Pull Repository**: copies all of the images in a given repository locally
- **Delete Repository**: deletes the repository permanently
- **Refresh**: refreshes the repository to reflect changes

For each tagged image in a repository, here are the actions that can be performed:

![Azure image context menu](images/registries/azure-image-context-menu.png)

- **Pull Image**: copies the latest version of the image locally
- **Copy Full Tag**: copies the full tag to the clipboard
- **Copy Image Digest**: copies the image digest, which is a SHA256 hash identifier that Docker uses, to the clipboard. See [Docker Docs](https://docs.docker.com/engine/reference/commandline/images/#list-image-digests) for more info on image digests
- **Inspect Image Manifest**: inspects the image's registry manifest. This is not the same as inspecting the image when it is pulled locally.
- **Deploy Image to Azure App Service**: deploys the image to Azure App Service, see [Deploy images to Azure](/docs/containers/app-service.md) page
- **Deploy Image to Azure Container Apps**: deploys the image to Azure Container Apps, see [Deploy images to Azure](/docs/containers/app-service.md) page
- **Untag Image**: untags the image
- **Delete Image**: deletes the image permanently

## GitHub

This connects to Docker registries in your [GitHub](https://github.com/) account. Once you select this option, you are asked to type in your GitHub account credentials.

![GitHub](images/registries/github.png)

For each repository in the GitHub registry, here are the actions that can be performed:

- **Pull Repository**: copies all of the images in a given repository locally
- **Refresh**: refreshes the repository to reflect changes

For each tagged image in a repository, here are the actions that can be performed:

- **Pull Image**: copies the latest version of the image locally
- **Copy Full Tag**: copies the full tag to the clipboard
- **Copy Image Digest**: copies the image digest, which is a SHA256 hash identifier that Docker uses, to the clipboard. See [Docker Docs](https://docs.docker.com/engine/reference/commandline/images/#list-image-digests) for more info on image digests
- **Inspect Image Manifest**: inspects the image's registry manifest. This is not the same as inspecting the image when it is pulled locally.
- **Deploy Image to Azure App Service**: deploys the image to Azure App Service, see [Deploy images to Azure](/docs/containers/app-service.md) page
- **Deploy Image to Azure Container Apps**: deploys the image to Azure Container Apps, see [Deploy images to Azure](/docs/containers/app-service.md) page

## Next steps

- [Deploy to Azure](/docs/containers/app-service.md)
