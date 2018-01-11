---
Order: 2
Area: docker
TOCTitle: Containerize the Application
PageTitle: Containerize the Application
MetaDescription: Node.js Deployment to Azure App Services with Visual Studio Code
DateApproved: 12/18/2017
---

# Containerize your Node.js Application

Next, use the Docker extension to add the necessary files to containerize your
app, build the image, and push it to a registry.

> **Tip:** If you don't already have an app to containerize, follow this [Node.js tutorial](/docs/nodejs/nodejs-tutorial.md).

### Add the Docker files to workspace

Open the command pallet and type "add docker files to workspace" to bring up
create the necessary Docker files. Choose your application type - Node.js in
this tutorial - along with the port that your application listens on.

> **Tip:** Be sure that the port you select matches the port your app listens on. If you used the express generator, set this to 8080.

This will add a `Dockerfile` along with some configuration files for Docker
compose and a `.dockerignore`.

## Build a Docker image

The files you just added, specifically, `Dockerfile`, describe the environment
for your app including the location of the source fiiles and the command to
start the app within a container.

> **Tip:** Container vs. image: a container is an instance of an image.

Open the command pallet and type "docker build image" to build the image. Choose
the `Dockerfile` that was jsut created then give the image a name. It's
important that you specify a couple of things here, the format is as follows

`[registry or username]/[image name]:[tag]`

This tutorial uses Azure Container Registry so for my example

`fiveisprime.azurecr.io/myExpressApp:latest`

If using Docker Hub, use your Docker Hub username (e.g.
`fiveisprime/myExpressApp:latest`).

Once complete, the output terminal will open and the Docker command will be
executed. This is a good way to get an understanding of the commands required to
do the same steps directly from the terminal. You'll also see each step, or
layer, that makes up the app environment.

Once built, the image will show up in the Docker extension explorer under
"images."

![Docker Image](images/docker-extension/image-list.png)

## Push the image to a registry

Open the command pallet again and type "docker push" and choose the image you
just built to push the image to the registry. This will also execute the Docker
command in the output window to show the satus of the operation. Once complete,
expand the "Images" node in the Docker extension explorer to see your image.

![Image in ACR](images/docker-extension/image-in-acr.png)

Next, you'll deploy your image to Azure.

----

<a class="tutorial-next-btn" href="/tutorials/docker-extension/deploy-container">I containerized my Node.js application</a> <a class="tutorial-feedback-btn" onclick="reportIssue('docker-extension', 'containerize-app')" href="javascript:void(0)">I ran into an issue</a>
