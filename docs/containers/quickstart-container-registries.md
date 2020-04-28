---
Order: 7
Area: containers
TOCTitle: Registries
ContentId: 318A4299-AF24-4ADA-863D-E73B314FC440
PageTitle: Quickstart - Using container registries
DateApproved: 01/29/2020
MetaDescription: Work with Docker container registries in Visual Studio Code
---
# Using container registries

A container registry is a storage and content delivery system, holding named Docker images, available in different tagged versions.

Users can connect to Docker registries from the following sources:

- [Azure Container Registry](https://docs.microsoft.com/azure/container-registry/)
- [Docker Hub](https://hub.docker.com/)
- [GitLab](https://gitlab.com/) container registry
- Any generic private registry that supports the [Docker V2 api](https://docs.docker.com/registry/spec/api/)

## Azure Container Registry

This option requires the [Azure Account](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account) extension to be able to connect to your Azure account and display all of the different subscriptions and registries.
Once authenticated, the node **Azure** will display the subscriptions along with registries each have:

![Azure Container Registry](images/registries/azure-registries.png)

For each registry, users have different actions that can be performed using the context menu:

![Azure registry context menu](images/registries/azure-registry-context-menu.png)

- **Delete registry**: deletes the registry permanently
- **Open in portal**: opens the browser and navigates to the registry in Azure Portal
- **View properties**: opens the registry properties in a json format
- **Refresh**: refreshes the registry to reflect changes

For each repository in a given registry, here are the actions that can be performed:

![Azure repository context menu](images/registries/azure-repository-context-menu.png)

- **Pull repository**: copies all of the images in a given repository locally
- **Delete repository**: deletes the repository permanently
- **Refresh**: refreshes the repository to reflect changes

For each tagged image in a repository, here are the actions that can be performed:

![Azure image context menu](images/registries/azure-image-context-menu.png)

- **Pull image**: copies the latest version of the image locally
- **Copy image digest**: copies the image digest, which is a SHA256 hash identifier that Docker uses, to the clipboard. See [Docker Docs](https://docs.docker.com/engine/reference/commandline/images/#list-image-digests) for more info on image digests
- **Deploy image to Azure App Service**: deploys the image to Azure App Service, see [Deploy images to Azure App Service](/docs/containers/app-service.md) page
- **Untag image**: untags the image
- **Delete image**: deletes the image permanently

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
- **Open in browser**: opens the browser and navigates to the given image on Docker Hub

## GitLab

This connects to Docker registries in your [GitLab](https://gitlab.com/) account.
Once you select this option, you will be required to type in your GitLab account credentials.

![GitLab](images/registries/gitlab.png)

For each repository in the GitLab registry, here are the actions that can be performed:

- **Pull repository**: copies all of the images in a given repository locally
- **Refresh**: refreshes the repository to reflect changes

For each tagged image in a repository, here are the actions that can be performed:

- **Pull image**: copies the latest version of the image locally